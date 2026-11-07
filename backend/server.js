const http = require("http");
const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const PORT = process.env.PORT || 3000;

async function main() {
  const client = new MongoClient(URI);
  await client.connect();
  const users = client.db("blog_db").collection("users");

  const server = http.createServer(async (req, res) => {
    if (req.method !== "GET") {
      res.writeHead(405);
      res.end("Method not allowed");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      if (req.url === "/users") {
        // Return all users - no filter
        const data = await users.find().toArray();
        res.writeHead(200, headers);
        res.end(JSON.stringify(data));

      } else if (req.url === "/users/from-france") {
        // Return only users whose address.country is "France"
        // Notice: to filter by a different country we would need a new hardcoded route.
        const data = await users.find({ "address.country": "France" }).toArray();
        res.writeHead(200, headers);
        res.end(JSON.stringify(data));

      } else if (req.url === "/users/skilled") {
        // Return only users who have a skills array
        const data = await users.find({ skills: { $exists: true } }).toArray();
        res.writeHead(200, headers);
        res.end(JSON.stringify(data));

      } else {
        res.writeHead(404);
        res.end("Not found");
      }
    } catch (err) {
      res.writeHead(500);
      res.end("Server error");
    }
  });

  server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`  GET /users            - all users`);
    console.log(`  GET /users/from-france - users whose country is France`);
    console.log(`  GET /users/skilled    - users who have a skills array`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
