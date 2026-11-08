# Lab 03 - REST API with Express and MongoDB

## What this lab is about

In previous labs you queried MongoDB directly from a script. In a real application, the database is never exposed to the browser - a server sits in between and exposes a controlled interface: a REST API.

In this lab you will build that interface using Express. The frontend is already provided - once your API works, the browser will be able to create, read, update, and delete users and posts.

## Setup

Make sure MongoDB is running locally on port 27017.

```bash
cd backend
npm install
```

Seed the database with sample users and posts:

```bash
npm run seed
```

## Project structure

```
backend/
  server.js              - Express app - provided, do not modify
  routes/
    users.js             - Wires URLs to controllers - provided
    posts.js             - Wires URLs to controllers - provided
  controllers/
    users.js             - Handles req/res, calls service - provided
    posts.js             - Handles req/res, calls service - provided
  services/
    users.js             - MongoDB operations - fill in the TODOs
    posts.js             - MongoDB operations - fill in the TODOs
  models/
    user.js              - User document shape - provided
    post.js              - Post document shape - provided
  seed.js                - Sample data - provided
frontend/
  index.html             - Browser client - provided
```

## Your task

Open `backend/services/users.js` and `backend/services/posts.js`. Each file has 5 functions with TODOs. Fill them in using the MongoDB driver.

| Function | Task |
|----------|------|
| `findAll()` | Return all documents as an array |
| `findById(id)` | Return one document by `_id` |
| `create(body)` | Insert a new document, return the full inserted document |
| `update(id, body)` | Update a document with `$set`, return the updated document |
| `remove(id)` | Delete a document, return `deletedCount` |

Both `users.js` and `posts.js` follow the same pattern. The models (`models/user.js`, `models/post.js`) provide helper functions (`createUserDocument`, `createPostDocument`) to build a clean object from `req.body` before inserting or updating.

## Commands reference

| Command | What it does |
|---------|-------------|
| `Model.find()` | Get all documents |
| `Model.findById(id)` | Get one document by id, returns `null` if not found |
| `Model.create(doc)` | Insert a document, returns the saved document |
| `Model.findByIdAndUpdate(id, update, { new: true })` | Update and return the new document |
| `Model.findByIdAndDelete(id)` | Delete a document, returns the deleted document or `null` |

## Run the server

```bash
npm start
```

Then open `frontend/index.html` in your browser.

## HTTP status codes to use

| Situation | Status code |
|-----------|-------------|
| Successful read | `200` |
| Document created | `201` |
| Successful delete | `204` |
| Document not found | `404` |
| Server error | `500` |
