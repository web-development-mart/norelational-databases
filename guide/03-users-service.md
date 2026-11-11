# Step 03 - Implement the Users Service

## What you will do

Replace the four `return null` stubs in `services/users.js` with real Mongoose calls, so that the Users API reads from and writes to MongoDB.

---

## Before you start

Open `services/users.js`. At the top you will see:

```js
// TODO: uncomment this line once your User model is ready
// const User = require("../models/user");
```

Uncomment that line now. Without it, the service has no access to the model and nothing will work.

---

## The four functions

Work through them one at a time. After implementing each function, test it manually before moving to the next.

---

### `findAll`

This function currently returns a hardcoded array. Replace the entire hardcoded `return [...]` with a single Mongoose call that fetches all users from the database.

**What to think about:** Which Mongoose method returns all documents from a collection?

After implementing, `GET /users` should return the users you seeded - not the hardcoded ones.

---

### `findById`

This function receives an `id` parameter and should return the matching document, or `null` if none is found.

**What to think about:** Mongoose has a method specifically designed to find a document by its `_id`. What is it called? What does it return when no document matches?

After implementing, `GET /users/6aef672b31677b579035f3ea` should return Alice's document. `GET /users/000000000000000000000000` should return 404.

---

### `create`

This function receives a `body` object (the parsed JSON from the request) and should insert it as a new document and return the created document.

**What to think about:** Which Mongoose method creates a new document from a plain object?

After implementing, `POST /users` with a valid JSON body should return 201 with the created document including its new `_id`.

---

### `update`

This function receives an `id` and a `body`, and should update the matching document with the fields in `body`, then return the updated document.

**What to think about:** Mongoose has a method that finds by `_id` and updates in one call. By default it returns the document as it was before the update - look up the option that makes it return the document after the update instead.

After implementing, `PUT /users/:id` should return the updated document.

---

### `remove`

This function receives an `id` and should delete the matching document, returning the deleted document (or `null` if not found).

**What to think about:** Which Mongoose method finds by `_id` and deletes in one call?

After implementing, `DELETE /users/:id` should return 204 for a known ID and 404 for an unknown one.

---

## Test the full Users API

Once all four functions are implemented, test every route:

| Request | Expected result |
|---------|----------------|
| `GET /users` | Array of seeded users from MongoDB |
| `GET /users/6aef672b31677b579035f3ea` | Alice's document |
| `GET /users/000000000000000000000000` | 404 |
| `POST /users` `{ "name": "Test", "email": "t@t.com" }` | 201 + created document with `_id` |
| `PUT /users/:id` `{ "name": "Updated" }` | 200 + updated document |
| `DELETE /users/:id` | 204 no body |
| `DELETE /users/000000000000000000000000` | 404 |

---

## Next

Go to [04-posts-service.md](./04-posts-service.md).
