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

## Check your work - server starts cleanly

Restart the server (`npm start`). If Mongoose rejects your schema it will print an error at startup. No errors means your schema is syntactically valid.

---

## Implement seed.js

Now that the schema is defined, implement the seed script so you can populate the database with consistent test data.

Open `seed.js`. The data is already prepared for you in two JSON files in the `data/` folder:
- `data/users.json` - 7 users (Alice, Bob, Carol, Dave, Eve, Frank, Grace) with fixed `_id` values, names, emails, skills, addresses, and avatar URLs
- `data/posts.json` - 14 posts (2 per user) with titles, content, tags, dates, and an `author` field containing the matching user `_id`

Both files are already loaded at the top of `seed.js` as `usersData` and `postsData`. Open them and read the data - your schema should be able to store every field you see there.

Your job is to fill in the four TODO blocks. Each one is a single `await` call:

1. Delete all existing user documents
2. Delete all existing post documents
3. Insert all users from `usersData`
4. Insert all posts from `postsData`

Then add a log line so you can confirm the counts.

**What to think about:** Which Mongoose methods handle bulk delete and bulk insert? Both take the collection-level shape you used in the User model.

Once implemented, run it:

```bash
npm run seed
```

You should see `Seeded 7 users and 14 posts.`

If you see `Seeded 7 users and 14 posts.` but then open MongoDB Compass and the users have no `name` or `email` fields - your schema is not defined correctly. Fix the schema and re-run seed.

---

## Next

Go to [03-users-service.md](./03-users-service.md).
