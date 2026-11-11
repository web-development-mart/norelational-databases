const { defineConfig } = require("@playwright/test");

// Load .env so MONGODB_URI is available when webServer spawns node server.js
try { require("dotenv").config(); } catch {}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blog_db";

module.exports = defineConfig({
  testDir: "./tests",
  reporter: [
    ["list"],
    ["html",  { open: "never", outputFolder: "grading/report" }],
    ["json",  { outputFile: "grading/results.json" }],
  ],
  use: {
    baseURL: "http://localhost:3000",
  },
  // No browser projects - only the request fixture is used
  projects: [{ name: "api" }],
  webServer: {
    command: "node server.js",
    url: "http://localhost:3000/users",
    // Forward MONGODB_URI so the spawned server can reach the database
    env: { MONGODB_URI },
    // Reuse a running server in development; always start fresh in CI
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
  },
});
