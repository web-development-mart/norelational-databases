# Step 05 - Run the Tests

## What you will do

Run the automated test suite and get all tests to pass.

---

## Before you run

Make sure:
- Your `.env` file exists with a valid `MONGODB_URI`
- The server is not already running on port 3000 (the test runner starts its own)
- The database has been seeded **after** you defined the User schema - if you are unsure, run it again now:

```bash
npm run seed
```

---

## Run the tests

```bash
npm test
```

Playwright will start the server automatically, run all tests, then shut it down. You will see output like this for each test:

```
  v  Users API > GET /users returns 200 and an array
  v  Users API > GET /users items have name and email fields
  x  Users API > POST /users returns 201 with an _id
  ...
```

---

## Understanding the test output

There are two test suites - `Users API` and `Posts API` - with a total of 21 tests. The suites run sequentially, and within each suite the tests are ordered and depend on each other.

If an early test fails, later tests in the same suite will likely fail too because they depend on data created by the earlier test. Fix failures from the top down.

---

## Common failure causes

**`GET /users/:id` returns 404 for the seeded user**
- The seeded user ID is `6aef672b31677b579035f3ea`. After seeding, that document should be in your database. If this test fails, check that `seed.js` ran successfully and that `services/users.js` is using the real Mongoose call, not `return null`.

**`POST /users` does not return an `_id`**
- Check that `services/users.js` `create` returns the result of `User.create(body)`, not `null`.

**`GET /posts` items do not have a populated author**
- Check that `services/posts.js` `findAll` chains `.populate("author", "name email avatar")`.

**`POST /posts` returns 201 but `author` is an ID string instead of an object**
- Check that `services/posts.js` `create` calls `.populate()` on the document after creating it, not on the query.

**All tests fail with a connection error**
- The server could not connect to MongoDB. Check your `MONGODB_URI` in `.env`.

---

## View the HTML report

After running tests, an HTML report is generated:

```bash
npm run test:report
```

This opens a detailed report in your browser showing which tests passed, which failed, and the full error for each failure.

---

## Goal

All 21 tests passing. Once you reach that, your REST API is complete.
