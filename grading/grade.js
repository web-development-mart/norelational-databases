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
  const books = client.db("book_db").collection("books");

  console.log("\nGrading lab intro...\n");

  // Check 1: collection is not empty
  const total = await books.countDocuments();
  check(
    "Collection is not empty",
    total > 0,
    "Make sure sample.js inserts documents and runs without errors."
  );

  // Check 2 (TODO 1): at least one book has an embedded publisher object
  const withPublisher = await books.findOne({
    "publisher.name": { $exists: true },
    "publisher.country": { $exists: true },
  });
  check(
    "At least one book has an embedded publisher object with name and country",
    withPublisher !== null,
    "Insert a document like: { publisher: { name: '...', country: '...' } }"
  );

  // Check 3 (TODO 2): at least one book has a tags array with 3+ items
  const withTags = await books.findOne({
    tags: { $exists: true },
    $expr: { $gte: [{ $size: "$tags" }, 3] },
  });
  check(
    "At least one book has a tags array with 3 or more items",
    withTags !== null,
    "Insert a document like: { tags: ['a', 'b', 'c'] }"
  );

  // Check 4 (TODO 3): at least 7 documents total (2 insertOne + 5 insertMany)
  check(
    "Collection has at least 7 documents (insertMany)",
    total >= 7,
    "Use insertMany to insert at least 5 books in a single call."
  );

  // Check 5 (TODO 5): dot notation query returns a result
  const dotResult = withPublisher
    ? await books.findOne({ "publisher.country": withPublisher.publisher.country })
    : null;
  check(
    "Dot notation query on publisher.country returns a document",
    dotResult !== null,
    'Use dot notation like: { "publisher.country": "France" }'
  );

  // Check 6 (TODO 6): find with filter returns at least one result
  const filtered = await books.find({ "publisher.country": { $exists: true } }).toArray();
  check(
    "find() with a filter returns at least one book",
    filtered.length > 0,
    "Make sure at least one book has a publisher.country field."
  );

  // Check 7 (TODO 7): $exists query returns books with tags
  const taggedBooks = await books.find({ tags: { $exists: true } }).toArray();
  check(
    "find() with $exists returns books that have a tags field",
    taggedBooks.length > 0,
    "Make sure at least one book has a tags field."
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
