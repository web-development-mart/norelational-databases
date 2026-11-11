# Step 02 - Define the User Schema

## What you will do

Write the Mongoose schema for a User in `models/user.js`.

---

## Before you start

Open `models/post.js` and read it carefully. It is a complete, working Mongoose schema. Your User schema follows the same pattern - a `mongoose.Schema({...})` object passed to `mongoose.model(...)`.

---

## The fields

A User document has the following fields:

| Field | Type | Required |
|-------|------|----------|
| `name` | String | yes |
| `email` | String | yes |
| `skills` | Array of Strings | no |
| `address` | Object with `city` (String) and `country` (String) | no |
| `avatar` | String | no |

The TODO comment in `models/user.js` lists these fields. Your task is to translate them into Mongoose schema syntax.

---

## Hints

**A required string field looks like this:**
```js
fieldName: { type: String, required: true }
```

**An optional string field can be written as just:**
```js
fieldName: String
```

**An array of strings:**
```js
fieldName: [String]
```

**An embedded object (nested document):**
```js
fieldName: {
  nestedField: String,
  anotherField: String,
}
```

---

## Check your work

Restart the server (`npm start`) after saving your changes. If Mongoose rejects your schema it will print an error at startup.

Then test these requests:

1. `POST /users` with body `{ "name": "Alice", "email": "alice@test.com", "skills": ["js"] }`
   - Should return 201 with an `_id` - this means `create` in the service still returns `null`, but once you implement it in the next step it should work
   - For now, confirming the server starts without errors is enough

2. After you implement the service in step 03, come back and verify that the User document stored in MongoDB has all the fields you defined.

---

## Next

Go to [03-users-service.md](./03-users-service.md).
