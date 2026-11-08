const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

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
    "Make sure seed.js inserts documents before grade.js runs."
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

  // Check 5: at least 7 documents total (proves insertMany was used)
  check(
    "Collection has at least 7 documents (insertMany)",
    total >= 7,
    "Use insertMany to insert at least 5 users (you already have 2 from TODO 1 and 2)."
  );

  // Check 6: at least 2 users from France (from the insertMany batch)
  const frenchCount = await users.countDocuments({ "address.country": "France" });
  check(
    'At least 2 documents have address.country "France"',
    frenchCount >= 2,
    'Include at least 2 users with address.country: "France" in your insertMany call.'
  );

  // Check 7: at least 3 users with a skills array (1 from TODO 2 + 2 from insertMany)
  const skilledCount = await users.countDocuments({ skills: { $exists: true } });
  check(
    "At least 3 documents have a skills array",
    skilledCount >= 3,
    "Include at least 2 users with a skills array in your insertMany call."
  );

  console.log(`\nResult: ${passed} passed, ${failed} failed\n`);

  fs.writeFileSync(
    path.join(__dirname, "result.json"),
    JSON.stringify({ passed, failed, total: passed + failed })
  );

  await client.close();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
