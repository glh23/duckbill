const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

router.get('/', (req, res) => {
  const token = req.cookies.accessToken;
  if (!token)
    return res.status(401).json({ message: "No access token" });

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    res.json({ message: "Access granted", user: decoded });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired access token" });
  }
});

module.exports = router;
