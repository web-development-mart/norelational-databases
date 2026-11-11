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
      _id: "6aef672b31677b579035f3ea",
      name: "Alice",
      email: "alice@example.com",
      address: { city: "Paris", country: "France" },
      skills: [],
    },
    {
      _id: "6aef672b31677b579035f3eb",
      name: "Bob",
      email: "bob@example.com",
      skills: ["JavaScript", "MongoDB", "Node.js"],
    },
    {
      _id: "6aef672b31677b579035f3ec",
      name: "Carol",
      email: "carol@example.com",
      address: { city: "Lyon", country: "France" },
      skills: [],
      avatar: "https://images.pexels.com/photos/17191688/pexels-photo-17191688.jpeg",
    },
    {
      _id: "6aef672b31677b579035f3ed",
      name: "Dave",
      email: "dave@example.com",
      address: { city: "Marseille", country: "France" },
      skills: ["Python", "Docker"],
      avatar: "https://images.pexels.com/photos/29563572/pexels-photo-29563572.jpeg",
    },
    {
      _id: "6aef672b31677b579035f3ee",
      name: "Eve",
      email: "eve@example.com",
      address: { city: "Luxembourg City", country: "Luxembourg" },
      skills: ["Go", "Kubernetes"],
      avatar: "https://images.pexels.com/photos/8278980/pexels-photo-8278980.jpeg",
    },
    {
      _id: "6aef672b31677b579035f3ef",
      name: "Frank",
      email: "frank@example.com",
      skills: ["TypeScript", "React", "Next.js"],
      avatar: "https://images.pexels.com/photos/5439136/pexels-photo-5439136.jpeg",
    },
    {
      _id: "6aef672b31677b579035f3f0",
      name: "Grace",
      email: "grace@example.com",
      address: { city: "Madrid", country: "Spain" },
      skills: ["Musician", "Composer"],
      avatar: "https://images.pexels.com/photos/12333568/pexels-photo-12333568.jpeg",
    },
  ]);

  // --- Posts ---
  await Post.insertMany([
    {
      title: "Getting started with MongoDB",
      content: "MongoDB is a document database that stores data in BSON format. Documents are flexible, schema-less, and map naturally to objects in your code.",
      author: "6aef672b31677b579035f3ea",
      tags: ["mongodb", "databases", "nosql"],
      createdAt: new Date("2024-01-15"),
    },
    {
      title: "Why I switched from SQL to MongoDB",
      content: "After years of relational databases, I tried MongoDB for a side project and never looked back. The flexibility of documents is a game changer.",
      author: "6aef672b31677b579035f3ea",
      tags: ["mongodb", "nosql", "opinion"],
      createdAt: new Date("2024-04-02"),
    },
    {
      title: "Why Node.js for backend development",
      content: "Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for building scalable network applications.",
      author: "6aef672b31677b579035f3eb",
      tags: ["nodejs", "backend", "javascript"],
      createdAt: new Date("2024-02-03"),
    },
    {
      title: "Building REST APIs with Express",
      content: "Express is a minimal web framework for Node.js. Combined with MongoDB, it lets you build a full CRUD API in just a few files.",
      author: "6aef672b31677b579035f3eb",
      tags: ["express", "rest", "api"],
      createdAt: new Date("2024-02-20"),
    },
    {
      title: "My favourite CSS tricks in 2024",
      content: "Flexbox and Grid are the two main layout systems in CSS. Here are the patterns I reach for every single project.",
      author: "6aef672b31677b579035f3ec",
      tags: ["css", "frontend", "design"],
      createdAt: new Date("2024-03-10"),
    },
    {
      title: "Designing for accessibility",
      content: "Good design is inclusive. Colour contrast, keyboard navigation, and semantic HTML are not optional extras - they are fundamentals.",
      author: "6aef672b31677b579035f3ec",
      tags: ["accessibility", "design", "frontend"],
      createdAt: new Date("2024-05-14"),
    },
    {
      title: "Introduction to Docker",
      content: "Docker allows you to package your application into containers that run consistently across any environment, from your laptop to production.",
      author: "6aef672b31677b579035f3ed",
      tags: ["docker", "devops", "containers"],
      createdAt: new Date("2024-03-18"),
    },
    {
      title: "Python for data pipelines",
      content: "Python's ecosystem of libraries makes it the go-to language for building ETL pipelines. Here is a simple example using pandas and SQLAlchemy.",
      author: "6aef672b31677b579035f3ed",
      tags: ["python", "data", "etl"],
      createdAt: new Date("2024-06-01"),
    },
    {
      title: "Scaling services with Kubernetes",
      content: "Kubernetes automates deployment, scaling, and management of containerised applications. This post walks through a basic cluster setup.",
      author: "6aef672b31677b579035f3ee",
      tags: ["kubernetes", "devops", "go"],
      createdAt: new Date("2024-04-22"),
    },
    {
      title: "Writing CLIs in Go",
      content: "Go is an excellent choice for command-line tools. The standard library covers most needs, and the single-binary output makes distribution trivial.",
      author: "6aef672b31677b579035f3ee",
      tags: ["go", "cli", "tooling"],
      createdAt: new Date("2024-07-08"),
    },
    {
      title: "TypeScript tips for large codebases",
      content: "As a codebase grows, TypeScript pays off more and more. Here are the patterns that keep our team's code readable and refactorable.",
      author: "6aef672b31677b579035f3ef",
      tags: ["typescript", "javascript", "best-practices"],
      createdAt: new Date("2024-05-30"),
    },
    {
      title: "Server components in Next.js",
      content: "React Server Components let you fetch data on the server and ship zero JavaScript to the client. Here is how we migrated our dashboard.",
      author: "6aef672b31677b579035f3ef",
      tags: ["nextjs", "react", "frontend"],
      createdAt: new Date("2024-08-11"),
    },
    {
      title: "Music theory for developers",
      content: "Learning music theory changed how I think about structure and patterns. Here is a gentle introduction for people who spend most of their time in a terminal.",
      author: "6aef672b31677b579035f3f0",
      tags: ["music", "creativity", "learning"],
      createdAt: new Date("2024-06-19"),
    },
    {
      title: "Composing with code: generative music",
      content: "Tools like Tone.js let you compose music programmatically. I built a small ambient generator over a weekend and it was surprisingly fun.",
      author: "6aef672b31677b579035f3f0",
      tags: ["music", "javascript", "generative"],
      createdAt: new Date("2024-09-03"),
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
