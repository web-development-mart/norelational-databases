const { test, expect } = require("@playwright/test");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FAKE_ID = "000000000000000000000000";

// Known seeded IDs - present after `node seed.js`
const SEEDED_USER_ID  = "6aef672b31677b579035f3ea"; // Alice
const SEEDED_POST_AUTHOR_EMAIL = "alice@example.com";

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

test.describe.serial("Users API", () => {
  let userId;

  // --- GET /users ---

  test("GET /users returns 200 and an array", async ({ request }) => {
    const res = await request.get("/users");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test("GET /users items have name and email fields", async ({ request }) => {
    // Test against a known seeded document rather than all users
    const res = await request.get(`/users/${SEEDED_USER_ID}`);
    expect(res.status()).toBe(200);
    const user = await res.json();
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
  });

  // --- POST /users ---

  test("POST /users returns 201 with an _id", async ({ request }) => {
    const res = await request.post("/users", {
      data: { name: "Playwright User", email: "playwright@test.com", skills: ["testing"] },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body._id).toBeDefined();
    userId = body._id;
  });

  // --- GET /users/:id ---

  test("GET /users/:id returns 200 and the correct document", async ({ request }) => {
    const res = await request.get(`/users/${userId}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body._id).toBe(userId);
  });

  test("GET /users/:id returns 404 for an unknown id", async ({ request }) => {
    const res = await request.get(`/users/${FAKE_ID}`);
    expect(res.status()).toBe(404);
  });

  // --- PUT /users/:id ---

  test("PUT /users/:id returns 200 and the document", async ({ request }) => {
    const res = await request.put(`/users/${userId}`, {
      data: { name: "Playwright User (updated)" },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body._id).toBe(userId);
  });

  test("PUT /users/:id returns 404 for an unknown id", async ({ request }) => {
    const res = await request.put(`/users/${FAKE_ID}`, { data: { name: "Ghost" } });
    expect(res.status()).toBe(404);
  });

  // --- DELETE /users/:id ---

  test("DELETE /users/:id returns 204", async ({ request }) => {
    const res = await request.delete(`/users/${userId}`);
    expect(res.status()).toBe(204);
  });

  test("GET /users/:id returns 404 after deletion", async ({ request }) => {
    const res = await request.get(`/users/${userId}`);
    expect(res.status()).toBe(404);
  });

  test("DELETE /users/:id returns 404 for an unknown id", async ({ request }) => {
    const res = await request.delete(`/users/${FAKE_ID}`);
    expect(res.status()).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

test.describe.serial("Posts API", () => {
  let postId;
  let tempUserId;

  // --- GET /posts ---

  test("GET /posts returns 200 and an array", async ({ request }) => {
    const res = await request.get("/posts");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test("GET /posts items have title, content, tags and a populated author", async ({ request }) => {
    const res = await request.get("/posts");
    const posts = await res.json();
    expect(posts.length).toBeGreaterThan(0);
    // Test against the first seeded post which has a fully populated author
    const seeded = posts.find((p) => p.author?.email === SEEDED_POST_AUTHOR_EMAIL);
    expect(seeded).toBeDefined();
    expect(seeded).toHaveProperty("title");
    expect(seeded).toHaveProperty("content");
    expect(seeded).toHaveProperty("tags");
    expect(typeof seeded.author).toBe("object");
    expect(seeded.author).toHaveProperty("name");
  });

  // --- POST /posts ---

  test("POST /posts returns 201 with a populated author", async ({ request }) => {
    // Create a temporary user to act as author
    const userRes = await request.post("/users", {
      data: { name: "Temp Author", email: "tempauthor@test.com" },
    });
    expect(userRes.status()).toBe(201);
    tempUserId = (await userRes.json())._id;

    const payload = { title: "Playwright Post", content: "Created by tests.", author: tempUserId, tags: ["testing"] };
    const res = await request.post("/posts", { data: payload });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body._id).toBeDefined();
    expect(body.title).toBe(payload.title);
    expect(typeof body.author).toBe("object");
    expect(body.author._id).toBe(tempUserId);
    postId = body._id;
  });

  // --- GET /posts/:id ---

  test("GET /posts/:id returns 200 and the correct document", async ({ request }) => {
    const res = await request.get(`/posts/${postId}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body._id).toBe(postId);
    expect(body.title).toBe("Playwright Post");
  });

  test("GET /posts/:id returns 404 for an unknown id", async ({ request }) => {
    const res = await request.get(`/posts/${FAKE_ID}`);
    expect(res.status()).toBe(404);
  });

  // --- PUT /posts/:id ---

  test("PUT /posts/:id returns 200 and the updated document", async ({ request }) => {
    const res = await request.put(`/posts/${postId}`, {
      data: { title: "Playwright Post (updated)", tags: ["testing", "updated"] },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe("Playwright Post (updated)");
    expect(body.tags).toContain("updated");
  });

  test("PUT /posts/:id returns 404 for an unknown id", async ({ request }) => {
    const res = await request.put(`/posts/${FAKE_ID}`, { data: { title: "Ghost" } });
    expect(res.status()).toBe(404);
  });

  // --- DELETE /posts/:id ---

  test("DELETE /posts/:id returns 204", async ({ request }) => {
    const res = await request.delete(`/posts/${postId}`);
    expect(res.status()).toBe(204);
  });

  test("GET /posts/:id returns 404 after deletion", async ({ request }) => {
    const res = await request.get(`/posts/${postId}`);
    expect(res.status()).toBe(404);
  });

  test("DELETE /posts/:id returns 404 for an unknown id", async ({ request }) => {
    const res = await request.delete(`/posts/${FAKE_ID}`);
    expect(res.status()).toBe(404);
  });

  // Cleanup temp author created in POST test
  test("cleanup temp author", async ({ request }) => {
    if (tempUserId) {
      await request.delete(`/users/${tempUserId}`);
    }
  });
});
