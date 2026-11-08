const express = require("express");
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blog_db";
const PORT = process.env.PORT || 3000;

const app = express();

// Parse incoming JSON bodies
app.use(express.json());

// Allow requests from the frontend (opened as a local file)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// Mount routers - provided, do not modify
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));

mongoose.connect(URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`  /users  - GET all, GET :id, POST, PUT :id, DELETE :id`);
    console.log(`  /posts  - GET all, GET :id, POST, PUT :id, DELETE :id`);
  });
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
