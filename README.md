# Lab 01 - From the Terminal to Node.js

[![Grade Lab Intro](https://github.com/web-development-mart/norelational-databases/actions/workflows/grade-intro.yml/badge.svg)](https://github.com/web-development-mart/norelational-databases/actions/workflows/grade-intro.yml)

## What this lab is about

In session 1 you ran MongoDB commands directly in the shell:

```
db.books.insertOne({ title: "Dune", author: "Frank Herbert" })
db.books.find()
```

In a real application you do not use the shell. You write Node.js code that sends the same operations to MongoDB through a driver. The commands are identical - what changes is the wrapper around them.

This lab walks you through that transition using a books collection.

## Setup

Make sure MongoDB is running locally on port 27017, then install the driver:

```bash
npm install
```

## The Node.js wrapper -

Open `sample.js`. The top of the file sets up the connection - read the comments carefully. You do not need to understand every detail yet (that comes in session 6), but you should understand the shape:

```
require the driver
create a client with the connection string
define an async main function
  connect
  get a reference to a collection
  ... your operations go here ...
  close the connection
call main()
```

## Your task

Fill in the seven TODOs inside `sample.js`. Each one is a MongoDB operation you already know from the shell - your job is to write it in Node.js.

| TODO | Operation | Task |
|------|-----------|------|
| 1 | `insertOne` | Insert a book with an embedded `publisher` object (name, country) |
| 2 | `insertOne` | Insert a book with a `tags` array of at least 3 items |
| 3 | `insertMany` | Insert at least 5 books in one call - mix of with/without publisher, with/without tags |
| 4 | `find` | Retrieve all books and log each title |
| 5 | `findOne` + dot notation | Find the first book whose `publisher.country` is `"France"` and log its title |
| 6 | `find` + filter | Find all books published in France and log how many there are |
| 7 | `find` + `$exists` | Find all books that have a `tags` field and log their titles and tags |

Run your script after each TODO to see the output grow:

```bash
node sample.js
```

## Commands reference

**Boilerplate (provided - read only)**

| Command | What it does |
|---------|-------------|
| `new MongoClient(uri)` | Create a client |
| `client.connect()` | Open the connection |
| `client.db(name).collection(name)` | Select a collection |
| `client.close()` | Close the connection |

**Write**

| Command | What it does |
|---------|-------------|
| `collection.insertOne({ ... })` | Insert a single document |
| `collection.insertMany([ ... ])` | Insert multiple documents at once |
| `collection.deleteMany({})` | Delete all documents |

**Read**

| Command | What it does |
|---------|-------------|
| `collection.find()` | Get all documents |
| `collection.find({ field: value })` | Filter by field value |
| `collection.find({ "field.nested": value })` | Filter using dot notation |
| `collection.find({ field: { $exists: true } })` | Filter by field existence |
| `collection.findOne({ ... })` | Get the first matching document |
| `.toArray()` | Resolve a cursor into a JavaScript array |

## Check your work

```bash
node grading/grade.js
```

All 7 checks must pass. The grader also runs automatically on GitHub when you push.
