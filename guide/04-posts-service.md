# Step 04 - Implement the Posts Service

## What you will do

Replace the four `return null` stubs in `services/posts.js` with Mongoose calls - same pattern as users, with one important addition: the `author` field must be populated.

---

## Before you start

Open `services/posts.js` and uncomment the require line at the top:

```js
// const Post = require("../models/post");
```

---

## Why posts are different from users

Look at `models/post.js`. The `author` field stores an `ObjectId` - a reference to a User document:

```js
author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
```

This means MongoDB stores only a 24-character ID in the `author` field, not the full user object. If you query `Post.find()` without doing anything else, the response looks like this:

```json
{
  "title": "Getting started with MongoDB",
  "author": "6aef672b31677b579035f3ea"
}
```

That is not useful for the frontend, which needs the author's name, email, and avatar. To get the full object, you need to call `.populate()` on the query. After populate, the response looks like this:

```json
{
  "title": "Getting started with MongoDB",
  "author": {
    "_id": "6aef672b31677b579035f3ea",
    "name": "Alice",
    "email": "alice@example.com",
    "avatar": "https://..."
  }
}
```

`.populate("author", "name email avatar")` tells Mongoose: replace the `author` ObjectId with the full User document, but only include the `name`, `email`, and `avatar` fields.

---

## The four functions

---

### `findAll`

Fetch all posts. Add `.populate("author", "name email avatar")` to the query chain.

After implementing, `GET /posts` should return an array where each post's `author` is a full object, not an ID string.

---

### `findById`

Find a post by ID. Chain `.populate("author", "name email avatar")` to the query.

After implementing, `GET /posts/:id` should return the post with a fully populated author.

---

### `create`

Creating a post is slightly different from the other functions because `.create()` does not return a Mongoose query - it returns a document directly. You need to call `.populate()` on the document itself after creating it.

```js
const post = await Post.create(body);
return post.populate("author", "name email avatar");
```

After implementing, `POST /posts` with a body that includes a valid `author` ID should return 201 with the author object populated.

---

### `update`

Find by ID, apply the update, and return the updated document. Chain `.populate("author", "name email avatar")` at the end. Use the same option as in the users service to return the document after the update, not before.

---

### `remove`

Delete by ID and return the deleted document. No populate needed here - the frontend does not need the deleted document's author object.

---

## Test the full Posts API

| Request | Expected result |
|---------|----------------|
| `GET /posts` | Array of posts, each with a populated `author` object |
| `GET /posts/:id` | Single post with populated author |
| `GET /posts/000000000000000000000000` | 404 |
| `POST /posts` `{ "title": "...", "content": "...", "author": "<valid user id>" }` | 201 + post with populated author |
| `PUT /posts/:id` `{ "title": "Updated" }` | 200 + updated post with populated author |
| `DELETE /posts/:id` | 204 no body |
| `DELETE /posts/000000000000000000000000` | 404 |

---

## Next

Go to [05-run-tests.md](./05-run-tests.md).
