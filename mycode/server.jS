const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());                 // parse JSON bodies
app.use(express.static(__dirname)); // serve index.html and other files from this folder

// simple in-memory users tore
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
let nextId = 3;

// GET /users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST /users
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: 'Name required' });
  const user = { id: nextId++, name: name.trim() };
  users.push(user);
  res.status(201).json(user);
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(u => u.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server listening: http://localhost:${PORT}`);
});