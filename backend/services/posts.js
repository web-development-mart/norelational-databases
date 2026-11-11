// TODO: uncomment this line once your Post model is ready
// const Post = require("../models/post");

// The service layer handles all interaction with the database.
// Each function receives the data it needs and returns a result.
// Controllers call these functions and decide what HTTP response to send.

// ----------------------------------------------------------
// Return all posts as an array.
// ----------------------------------------------------------
async function findAll() {
  // This is hardcoded example data so the frontend works straight away.
  // TODO: replace with Post.find().populate("author", "name email avatar")
  return [
    {
      _id: "7aef672b31677b579035f4ea",
      title: "Getting started with MongoDB",
      content: "MongoDB is a document database that stores data in BSON format.",
      author: {
        _id: "6aef672b31677b579035f3ea",
        name: "Alice",
        email: "alice@example.com",
      },
      tags: ["mongodb", "databases", "nosql"],
      createdAt: "2024-01-15T00:00:00.000Z",
    },
    {
      _id: "7aef672b31677b579035f4eb",
      title: "Why Node.js for backend development",
      content: "Node.js uses an event-driven, non-blocking I/O model.",
      author: {
        _id: "6aef672b31677b579035f3eb",
        name: "Bob",
        email: "bob@example.com",
      },
      tags: ["nodejs", "backend", "javascript"],
      createdAt: "2024-02-03T00:00:00.000Z",
    },
  ];
}

// ----------------------------------------------------------
// Return a single post by its id.
// Returns null if no post is found.
// ----------------------------------------------------------
async function findById(id) {
  // TODO: return Post.findById(id).populate("author", "name email avatar")
  return null;
}

// ----------------------------------------------------------
// Insert a new post from body.
// Returns the created document.
// ----------------------------------------------------------
async function create(body) {
  // TODO: const post = await Post.create(body)
  // TODO: return post.populate("author", "name email avatar")
  return null;
}

// ----------------------------------------------------------
// Update a post by id with the fields in body.
// Returns the updated document, or null if not found.
// ----------------------------------------------------------
async function update(id, body) {
  // TODO: return Post.findByIdAndUpdate(id, body, { new: true }).populate("author", "name email avatar")
  return null;
}

// ----------------------------------------------------------
// Delete a post by id.
// Returns the deleted document, or null if not found.
// ----------------------------------------------------------
async function remove(id) {
  // TODO: return Post.findByIdAndDelete(id)
  return null;
}

module.exports = { findAll, findById, create, update, remove };
