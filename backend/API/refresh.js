const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

router.post('/', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ success: false, message: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const newAccessToken = jwt.sign(
      { userId: decoded.userId, username: decoded.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ success: true, message: "Token refreshed" });
  } catch (err) {
    console.error("Refresh error:", err);
    return res.status(403).json({ success: false, message: "Invalid refresh token" });
  }
});

module.exports = router;
