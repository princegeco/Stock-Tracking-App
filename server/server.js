require('dotenv').config({ path: "./config.env" });
const express = require('express');
const cors = require('cors');
const { connectToServer } = require('./db/conn');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB when the server starts
connectToServer(function (err) {
  if (err) console.error(err);
});

// Signup route
app.post('/signup', async (req, res) => {
  const { email, firstName, lastName, username, password } = req.body;
  console.log(email, firstName, lastName, username, password);
  try {
    // Check if the email already exists
    const existingUser = await User.findOneByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new user
    const newUser = new User(firstName, lastName, username, email, password);
    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/', async (req, res) => {
  console.log('Req.body:' + req.body);
  const { username, password } = req.body; 

  try {
    const user = await User.findOneByUsername(username);

    if (user && user.password === password) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
