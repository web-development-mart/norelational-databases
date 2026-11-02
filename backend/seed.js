const { MongoClient } = require("mongodb");

const connectionString = null; // TODO: fill in your connection string here
const client = new MongoClient(connectionString);

// You will understand this boilerplate in session 6.
// For now, your job is to fill in the two TODOs below.

async function main() {
  await client.connect();
  const users = client.db("blog_db").collection("users");

  await users.deleteMany({});

  // TODO 1: insert a user with an embedded address object
  // The address must have at least a city and a country field and an avatar image URL.
  // Example: { name: "Alice", address: { city: "Paris", country: "France", avatar: "https://example.com/avatar.jpg" } }

  // TODO 2: insert a user with a skills array containing at least 3 items
  // Example: { name: "Bob", skills: ["JavaScript", "MongoDB", "Node.js"] }

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
