# Step 00 - Setup

## What you will do

Get the project running locally so you can see the frontend, hit the API, and confirm everything is wired up before writing any code.

---

## 1. Install dependencies

Navigate to the `backend/` folder and install:

```bash
cd backend
npm install
```

---

## 2. Create your `.env` file

The server reads the MongoDB connection string from an environment variable called `MONGODB_URI`. Create a file called `.env` inside `backend/`:

```
MONGODB_URI=your_atlas_connection_string_here
```

Replace the value with your Atlas connection string. If you are working locally, you can use:

```
MONGODB_URI=mongodb://localhost:27017/blog_db
```

The `.env` file is in `.gitignore` - it will never be pushed to GitHub. Never commit credentials.

---

## 3. Start the server

```bash
npm start
```

You should see:

```
Server listening on http://localhost:3000
  /users  - GET all, GET :id, POST, PUT :id, DELETE :id
  /posts  - GET all, GET :id, POST, PUT :id, DELETE :id
```

If the server fails to start, check that your `MONGODB_URI` is correct and that your Atlas cluster allows connections from your IP address.

---

## 4. Open the frontend

Open `frontend/index.html` directly in your browser (no server needed for the frontend - it uses `fetch` to talk to `localhost:3000`).

You should see a list of users and a list of posts. The data comes from hardcoded arrays in the service files - not from MongoDB yet.

---

## 5. Test the API manually

Use your browser or Bruno to send a few requests:

- `GET http://localhost:3000/users` - should return an array
- `GET http://localhost:3000/users/6aef672b31677b579035f3ea` - what do you get?
- `POST http://localhost:3000/users` with body `{ "name": "Test", "email": "test@test.com" }` - what do you get?

Keep these results in mind - they will make more sense after the next step.

---

## Next

Go to [01-explore.md](./01-explore.md).
