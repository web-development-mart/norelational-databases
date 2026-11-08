const service = require("../services/users");

// The controller layer sits between routes and the service.
// It reads from req, calls the service, and writes the HTTP response.

async function getAll(req, res) {
  try {
    const users = await service.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getOne(req, res) {
  try {
    const user = await service.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const user = await service.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const user = await service.update(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await service.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAll, getOne, create, update, remove };
