require('dotenv').config({ path: "./config.env" });
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
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
  const { firstName, lastName, username, password, email } = req.body;

  try {
    // Check if the email already exists
    const existingEmail = await User.validateEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Check for existing username
    const existingUsername = await User.findOneByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User(firstName, lastName, username, hashedPassword, email);
    await newUser.save();

    res.status(201).json({ user: newUser, message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error', error);

    if (error.message === 'Error hashing password') {
      return res.status(500).json({ message: 'Error during password hashing' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/', async (req, res) => {
  console.log('Req.body:' + req.body);
  const { username, password } = req.body; 

  try {
    const user = await User.findOneByUsername(username);
    
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        res.json({ message: 'Login successful', user });
        return;
      }
    } 
    
    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
