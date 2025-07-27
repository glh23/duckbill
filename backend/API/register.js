const express = require('express');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const User = require('../models/user');

const router = express.Router();

// Validation function based on your rules
function validateRegistration({ unsanitizedEmail, unsanitizedUsername, password }) {
  // Null checks
  if (!unsanitizedEmail || !unsanitizedUsername || !password) {
    return "Please fill out all fields.";
  }

  // Sanitize and normalize inputs
  const username = validator.escape(unsanitizedUsername);
  const email = validator.normalizeEmail(unsanitizedEmail);

  // Password validation
  if (password.length < 12) return "Password must be at least 12 characters long.";
  if (password.length > 32) return "Password must be at most 32 characters long.";
  if (password.includes(" ")) return "Password cannot contain spaces.";
  if (password.includes(username)) return "Password cannot contain your username.";
  if (password.includes(email)) return "Password cannot contain your email.";
  if (password.includes("duckbill")) return "Password cannot contain the word 'duckbill'.";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
  if (!/\d/.test(password)) return "Password must contain at least one number.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
  if (/(.)\1{3,}/.test(password)) return "Password cannot have the same character repeated 4 or more times.";

  // Username validation
  if (!/^[a-zA-Z0-9]+$/.test(username)) return "Username can only contain letters and numbers.";
  if (username.length < 3) return "Username must be at least 3 characters long.";
  if (username.length > 20) return "Username must be at most 20 characters long.";
  if (username.includes(" ")) return "Username cannot contain spaces.";

  // Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
  if (email.length < 5) return "Email must be at least 5 characters long.";
  if (email.length > 320) return "Email must be at most 320 characters long.";
  if (email.includes(" ")) return "Email cannot contain spaces.";
  if (!validator.isEmail(email)) return "Please enter a valid email address.";

  return null; // no errors
}

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validate inputs
    const validationError = validateRegistration({ unsanitizedEmail: email, unsanitizedUsername: username, password });
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ 
      $or: [{ username: username }, { email: email }]
    });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or email already taken.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      username,
      passwordHash,
    });

    await newUser.save();

    return res.status(201).json({ success: true, message: 'User registered successfully!' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Server error, please try again later.' });
  }
});

module.exports = router;

