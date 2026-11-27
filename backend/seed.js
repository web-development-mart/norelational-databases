const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");

// Load seed data from the JSON files in data/
const usersData = require("./data/users.json");
const postsData = require("./data/posts.json");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blog_db";

async function main() {
  await mongoose.connect(URI);

  // Delete all existing documents from users
  await User.deleteMany({});

  // Delete all existing documents from posts
  await Post.deleteMany({});

  // Insert all users
  await User.insertMany(usersData);

  // Insert all posts
  await Post.insertMany(postsData);

  // Count inserted documents
  const usersCount = await User.countDocuments();
  const postsCount = await Post.countDocuments();

  // Log the results
  console.log(`Inserted ${usersCount} users`);
  console.log(`Inserted ${postsCount} posts`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});