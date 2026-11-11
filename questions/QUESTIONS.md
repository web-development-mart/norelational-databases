# Lab 01 - Before You Write Any Code

Read the codebase carefully before answering these questions. Every answer can be found by reading the source files. Do not modify any code yet.

---

## Part 1 - Project Structure

**Q1.** List every folder inside `backend/`. What is the responsibility of each one?

**Q2.** Open `server.js`. What two routes are mounted, and at what base paths?

**Q3.** Pick the route `GET /posts/:id`. Trace it through the codebase step by step - list every file it passes through, in order, from the incoming HTTP request to the final response.

---

## Part 2 - Current Behaviour

**Q4.** Start the server with `npm start`, then open `http://localhost:3000/users` in your browser. You get a list of users. Now open `services/users.js`. Where does that data actually come from? Is it coming from MongoDB?

**Q5.** Still without changing any code, send a `GET /users/6aef672b31677b579035f3ea` request (use your browser or Bruno). What do you get back, and why? Find the exact line in `services/users.js` that explains it.

**Q6.** Send a `POST /users` request with a JSON body `{ "name": "Test", "email": "test@test.com" }`. What HTTP status code do you get? What does the response body contain? What does `services/users.js` tell you about why?

---

## Part 3 - Mongoose Models

**Q7.** Open `models/user.js`. The schema is currently empty. What fields does it need to define? Where in the codebase can you find the full list?

**Q8.** Open `models/post.js`. The `author` field is not a plain `String` - what is its type, and what does the `ref: "User"` property do?

**Q9.** Look at the `TODO` comment in `services/posts.js` for `findById`:
```js
// TODO: return Post.findById(id).populate("author", "name email avatar")
```
What does `.populate("author", "name email avatar")` do? What would the `author` field look like in the response without it?

**Q10.** The `createdAt` field in the Post schema has `default: Date.now`. What does this mean - do you need to send `createdAt` when creating a post?

---

## Part 4 - Controllers and HTTP

**Q11.** Open `controllers/users.js`. For each of the five functions, write down the HTTP status code it returns on success:

| Function | Success status code |
|----------|-------------------|
| `getAll` | |
| `getOne` | |
| `create` | |
| `update` | |
| `remove` | |

**Q12.** The `remove` function calls `res.sendStatus(204)` on success instead of `res.json(...)`. Why? What does a 204 response body contain?

**Q13.** Both `getOne` and `update` return a 404 when the service returns `null`. Open `services/users.js` - when does `findById` currently return `null`? What will need to change to make 404s work correctly?

---

## Part 5 - Tests and Seed Data

**Q14.** Open `tests/api.spec.js`. The two test suites use `test.describe.serial`. Why does the order of execution matter here? What would break if the tests ran in a random order?

**Q15.** The test `POST /users returns 201 with an _id` stores the created user's `_id` in a variable called `userId`. Which other tests in the same suite depend on that variable, and what would happen if the POST test failed?

**Q16.** Open `seed.js`. The users are inserted with hardcoded `_id` values (e.g. `"6aef672b31677b579035f3ea"`). Why is this useful? Where else in the project do you see these same IDs?

**Q17.** What command do you run to seed the database? After seeding, how many user documents and how many post documents should be in `blog_db`?

---

## Summary

Before writing any code, make sure you can answer:

- What are the 8 TODO comments across the service files, and what Mongoose method does each one require?
- Which model file do you need to complete, and which is already provided as an example?
- What does a fully working `GET /posts` response look like - specifically, what shape is the `author` field?
