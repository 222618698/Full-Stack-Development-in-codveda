const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

/* 🔹 1. MongoDB connection */
mongoose.connect('mongodb://localhost:27017/userdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

/* 🔹 2. USER MODEL (PUT IT HERE 👇) */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const User = mongoose.model('User', UserSchema);

/* 🔹 3. API ROUTES */
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });

  const user = await User.create({ name });
  res.status(201).json(user);
});

app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

/* 🔹 4. START SERVER */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
