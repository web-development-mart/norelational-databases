const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blog_db";

async function main() {
  await mongoose.connect(URI);

  await User.deleteMany({});
  await Post.deleteMany({});

  // --- Users ---
  await User.insertMany([
    {
      name: "Alice Martin",
      email: "alice@example.com",
      address: { city: "Paris", country: "France" },
      skills: ["JavaScript", "MongoDB", "Node.js"],
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      address: { city: "London", country: "United Kingdom" },
      skills: ["Python", "Docker"],
    },
    {
      name: "Carol Dupont",
      email: "carol@example.com",
      address: { city: "Lyon", country: "France" },
      skills: ["React", "CSS", "Figma"],
    },
    {
      name: "Dave Kim",
      email: "dave@example.com",
      address: { city: "Seoul", country: "South Korea" },
      skills: ["Go", "Kubernetes"],
    },
  ]);

  // --- Posts ---
  await Post.insertMany([
    {
      title: "Getting started with MongoDB",
      content: "MongoDB is a document database that stores data in BSON format...",
      author: "alice@example.com",
      tags: ["mongodb", "databases", "nosql"],
      createdAt: new Date("2024-01-15"),
    },
    {
      title: "Why Node.js for backend development",
      content: "Node.js uses an event-driven, non-blocking I/O model...",
      author: "bob@example.com",
      tags: ["nodejs", "backend", "javascript"],
      createdAt: new Date("2024-02-03"),
    },
    {
      title: "Building REST APIs with Express",
      content: "Express is a minimal web framework for Node.js...",
      author: "alice@example.com",
      tags: ["express", "rest", "api"],
      createdAt: new Date("2024-02-20"),
    },
    {
      title: "CSS tips for modern layouts",
      content: "Flexbox and Grid are the two main layout systems in CSS...",
      author: "carol@example.com",
      tags: ["css", "frontend", "design"],
      createdAt: new Date("2024-03-10"),
    },
    {
      title: "Introduction to Docker",
      content: "Docker allows you to package your application into containers...",
      author: "bob@example.com",
      tags: ["docker", "devops", "containers"],
      createdAt: new Date("2024-03-18"),
    },
  ]);

  const userCount = await User.countDocuments();
  const postCount = await Post.countDocuments();
  console.log(`Seeded ${userCount} users and ${postCount} posts.`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
