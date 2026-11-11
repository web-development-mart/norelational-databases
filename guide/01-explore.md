# Step 01 - Explore the Codebase

## What you will do

Read the existing code before writing a single line. The goal is to understand the architecture, know what is already working, and know exactly what you need to implement.

---

## The architecture

This project follows a three-layer pattern:

```
routes/ -> controllers/ -> services/
```

- **routes** - define which URL paths and HTTP verbs exist, and map them to controller functions
- **controllers** - read from `req`, call a service function, write the HTTP response
- **services** - all interaction with the database; the only layer that talks to Mongoose

The controllers and routes are already complete. You will only write code in `services/` and `models/`.

---

## What is already working

The service files currently return hardcoded fake data for `findAll()`, and `null` for everything else. This is enough for the frontend to display users and posts.

Verify this:
- `GET /users` returns a list - but it comes from a hardcoded array in `services/users.js`, not MongoDB
- `GET /users/:id` always returns 404 - because `findById` returns `null`
- `POST /users` returns 201 with `null` as the body - because `create` returns `null`

---

## What you need to implement

Open each service file and find the `TODO` comments. There are 4 functions to implement in `services/users.js` and 4 in `services/posts.js`.

Each TODO tells you exactly which Mongoose method to call. Your job is to:

1. Uncomment the `require` line at the top of each service file to load the model
2. Replace each `return null` with the correct Mongoose call

---

## Read these files now

Work through them in this order and make sure you understand each one before moving on:

| File | What to look for |
|------|-----------------|
| `server.js` | How the app starts, which routers are mounted |
| `routes/users.js` | Which HTTP verbs map to which controller functions |
| `controllers/users.js` | How it reads `req`, calls the service, and sends a response |
| `services/users.js` | The TODO comments - what Mongoose method does each one need? |
| `models/post.js` | The complete Post schema - use this as a reference for your User schema |
| `models/user.js` | The empty User schema you will define |

---

## Answer the questions

Before writing any code, work through `questions/QUESTIONS.md`. Every answer is in the source files you just read.

---

## Next

Go to [02-user-model.md](./02-user-model.md).
