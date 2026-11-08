const Post = require("../models/post");

// The service layer handles all interaction with the database.
// Each function receives the data it needs and returns a result.
// Controllers call these functions and decide what HTTP response to send.

// ----------------------------------------------------------
// Return all posts as an array.
// ----------------------------------------------------------
async function findAll() {
  // TODO: return all Post documents
  // Hint: Post.find()
}

// ----------------------------------------------------------
// Return a single post by its id.
// Returns null if no post is found.
// ----------------------------------------------------------
async function findById(id) {
  // TODO: return the Post with the given id
  // Hint: Post.findById(id)
}

// ----------------------------------------------------------
// Insert a new post from body.
// Returns the created document.
// ----------------------------------------------------------
async function create(body) {
  // TODO: create and save a new Post from body
  // Hint: Post.create(body)
}

// ----------------------------------------------------------
// Update a post by id with the fields in body.
// Returns the updated document, or null if not found.
// ----------------------------------------------------------
async function update(id, body) {
  // TODO: find the post by id, apply the update, return the new document
  // Hint: Post.findByIdAndUpdate(id, body, { new: true })
}

// ----------------------------------------------------------
// Delete a post by id.
// Returns the deleted document, or null if not found.
// ----------------------------------------------------------
async function remove(id) {
  // TODO: delete the post with the given id
  // Hint: Post.findByIdAndDelete(id)
}

module.exports = { findAll, findById, create, update, remove };
