# Lab 01 - Local MongoDB

## Setup

```bash
cd backend
npm install
```

Make sure MongoDB is running locally on port 27017.

## Your task

Open `backend/seed.js`. The connection boilerplate is already written for you - you will understand it in session 6. Your job is to fill in the two TODOs:

1. Insert a user document with an embedded `address` object containing at least `city` and `country`
2. Insert a user document with a `skills` array containing at least 3 items

Run it with:

```bash
node seed.js
```

## Check your work

```bash
node grading/grade.js
```

All 4 checks must pass. The grader also runs automatically on GitHub when you push.

## View the data in the browser

Start the server:

```bash
node server.js
```

Then open `frontend/index.html` in your browser.

`server.js` is provided for you - you do not need to modify it. Here is what it does:

1. Connects to MongoDB (same as your `solution.js`)
2. Creates an HTTP server using Node's built-in `http` module
3. When the browser requests `GET /users`, the server queries the `users` collection and sends the result back as JSON
4. The browser receives that JSON and renders each user as a card

This is a minimal version of a pattern you will build yourself in a later session using Express. For now, the goal is to see your MongoDB data come alive in the browser - not to understand every line of the server code.

## Example document shapes

```js
// address object
{ name: "Alice", address: { city: "Paris", country: "France" } }

// skills array
{ name: "Bob", skills: ["JavaScript", "MongoDB", "Node.js"] }
```
