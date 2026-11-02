const http = require("http");
const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const PORT = process.env.PORT || 3000;

async function main() {
  const client = new MongoClient(URI);
  await client.connect();
  const users = client.db("blog_db").collection("users");

  const server = http.createServer(async (req, res) => {
    if (req.method === "GET" && req.url === "/users") {
      try {
        const data = await users.find().toArray();
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        res.end(JSON.stringify(data));
      } catch (err) {
        res.writeHead(500);
        res.end("Server error");
      }
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Users endpoint:  http://localhost:${PORT}/users`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
