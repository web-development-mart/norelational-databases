const User = require("../models/user");

// The service layer handles all interaction with the database.
// Each function receives the data it needs and returns a result.
// Controllers call these functions and decide what HTTP response to send.

// ----------------------------------------------------------
// Return all users as an array.
// ----------------------------------------------------------
async function findAll() {
  // TODO: return all User documents
  // Hint: User.find()
}

// ----------------------------------------------------------
// Return a single user by their id.
// Returns null if no user is found.
// ----------------------------------------------------------
async function findById(id) {
  // TODO: return the User with the given id
  // Hint: User.findById(id)
}

// ----------------------------------------------------------
// Insert a new user from body.
// Returns the created document.
// ----------------------------------------------------------
async function create(body) {
  // TODO: create and save a new User from body
  // Hint: User.create(body)
}

// ----------------------------------------------------------
// Update a user by id with the fields in body.
// Returns the updated document, or null if not found.
// ----------------------------------------------------------
async function update(id, body) {
  // TODO: find the user by id, apply the update, return the new document
  // Hint: User.findByIdAndUpdate(id, body, { new: true })
}

// ----------------------------------------------------------
// Delete a user by id.
// Returns the deleted document, or null if not found.
// ----------------------------------------------------------
async function remove(id) {
  // TODO: delete the user with the given id
  // Hint: User.findByIdAndDelete(id)
}

module.exports = { findAll, findById, create, update, remove };
