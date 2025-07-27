const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Rate limiting middleware
const loginLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 25, // Limit each IP to 25 login requests per windowMs
  message: "Too many login attempts, please try again later."
});

// Input validation and sanitization
router.post('/', loginLimiter, [
  body('username').isString().trim().escape(),
  body('password').isString().trim().escape(),
], async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: "Invalid input", errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    // Check for missing credentials
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Missing credentials" });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Compare password with hashed password
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Create tokens
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, username: user.username },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    // Set access token in HTTP-only cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      refreshToken, // this goes to localStorage on the client
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
