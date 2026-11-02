const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(URI);

let passed = 0;
let failed = 0;

function check(label, condition, hint) {
  if (condition) {
    console.log(`  PASS  ${label}`);
    passed++;
  } else {
    console.log(`  FAIL  ${label}`);
    if (hint) console.log(`        Hint: ${hint}`);
    failed++;
  }
}

async function main() {
  await client.connect();
  const users = client.db("blog_db").collection("users");

  console.log("\nGrading lab-01...\n");

  // Check 1: collection is not empty
  const total = await users.countDocuments();
  check(
    "Collection is not empty",
    total > 0,
    "Make sure solution.js inserts documents before grade.js runs."
  );

  // Check 2: at least one document has address.city and address.country
  const withAddress = await users.findOne({
    "address.city": { $exists: true },
    "address.country": { $exists: true },
  });
  check(
    "At least one document has an embedded address object with city and country",
    withAddress !== null,
    "Insert a document like: { address: { city: '...', country: '...' } }"
  );

  // Check 3: at least one document has a skills array with 3+ items
  const withSkills = await users.findOne({
    skills: { $exists: true },
    $expr: { $gte: [{ $size: "$skills" }, 3] },
  });
  check(
    "At least one document has a skills array with 3 or more items",
    withSkills !== null,
    "Insert a document like: { skills: ['a', 'b', 'c'] }"
  );

  // Check 4: dot notation query returns a result
  if (withAddress) {
    const byCity = await users.findOne({
      "address.city": withAddress.address.city,
    });
    check(
      `Dot notation query { "address.city": "${withAddress.address.city}" } returns a document`,
      byCity !== null,
      "This should work automatically if check 2 passed."
    );
  } else {
    check(
      'Dot notation query { "address.city": "..." } returns a document',
      false,
      "Fix check 2 first."
    );
  }

  console.log(`\nResult: ${passed} passed, ${failed} failed\n`);

  await client.close();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
