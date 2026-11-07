# Lab 01 - Local MongoDB

## Setup

```bash
cd backend
npm install
```

Make sure MongoDB is running locally on port 27017.

## Start with the sample

Before writing any code, run the provided example and read through it:

```bash
node sample.js
```

Open `backend/sample.js` and read every comment. It performs the same seven operations you will need to do in `seed.js`, but on a `books` collection. Use it as your reference - not as something to copy.

## Your task

Open `backend/seed.js` and fill in the seven TODOs. Each one maps directly to an operation demonstrated in `sample.js`.

| TODO | Operation | What to do |
|------|-----------|------------|
| 1 | `insertOne` | Insert a user with an embedded `address` object containing at least `city` and `country` |
| 2 | `insertOne` | Insert a user with a `skills` array containing at least 3 items |
| 3 | `insertMany` | Insert at least 5 users in a single call - at least 2 must have `address.country: "France"`, at least 2 must have a `skills` array |
| 4 | `find` | Retrieve all users and log each name |
| 5 | `findOne` + dot notation | Find the user whose `address.city` is `"Paris"` and log the result |
| 6 | `find` + filter | Find all users whose `address.country` is `"France"` and log their names |
| 7 | `find` + `$exists` | Find all users who have a `skills` field and log their names |

Run your code with:

```bash
node seed.js
```

## Check your work

```bash
node grading/grade.js
```

All 7 checks must pass. The grader also runs automatically on GitHub when you push.

## View the data in the browser

Start the server:

```bash
node server.js
```

Then open `frontend/index.html` in your browser. You will see three sections:

- **All Users** - every document (no filter)
- **Users from France** - `find({ "address.country": "France" })`
- **Users with Skills** - `find({ skills: { $exists: true } })`

`server.js` is provided for you - you do not need to modify it. Notice that each filtered view requires its own hardcoded route. That limitation is exactly what a REST API solves - you will build one in sessions 7 and 8.
