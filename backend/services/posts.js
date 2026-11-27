// TODO: uncomment this line once your Post model is ready
const Post = require("../models/post");

// The service layer handles all interaction with the database.
// Each function receives the data it needs and returns a result.
// Controllers call these functions and decide what HTTP response to send.

// ----------------------------------------------------------
// Return all posts as an array.
// ----------------------------------------------------------
async function findAll() {
  // This is hardcoded example data so the frontend works straight away.
  // TODO: replace with Post.find().populate("author", "name email avatar")
  return Post.find().populate("author", "name email avatar");
}

// ----------------------------------------------------------
// Return a single post by its id.
// Returns null if no post is found.
// ----------------------------------------------------------
async function findById(id) {
  // TODO: return Post.findById(id).populate("author", "name email avatar")
  return Post.findById(id).populate("author", "name email avatar");
}

// ----------------------------------------------------------
// Insert a new post from body.
// Returns the created document.
// ----------------------------------------------------------
async function create(body) {
  // TODO: const post = await Post.create(body)
  const post = await Post.create(body);

  // TODO: return post.populate("author", "name email avatar")
  return post.populate("author", "name email avatar");
}

// ----------------------------------------------------------
// Update a post by id with the fields in body.
// Returns the updated document, or null if not found.
// ----------------------------------------------------------
async function update(id, body) {
  // TODO: return Post.findByIdAndUpdate(id, body, { new: true }).populate("author", "name email avatar")
  return Post.findByIdAndUpdate(id, body, { new: true }).populate("author", "name email avatar");
}

// ----------------------------------------------------------
// Delete a post by id.
// Returns the deleted document, or null if not found.
// ----------------------------------------------------------
async function remove(id) {
  // TODO: return Post.findByIdAndDelete(id)
  return Post.findByIdAndDelete(id);
}

module.exports = { findAll, findById, create, update, remove };