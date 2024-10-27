// routes/auth.js
const express = require('express');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Register new admin
router.post('/register', async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    const token = await admin.generateAuthToken();
    res.status(201).json({ admin, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findByCredentials(email, password);
    const token = await admin.generateAuthToken();
    res.json({ admin, token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid login credentials' });
  }
});

// Logout
router.post('/logout', auth, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter(token => token.token !== req.token);
    await req.admin.save();
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logout all sessions
router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.admin.tokens = [];
    await req.admin.save();
    res.json({ message: 'Logged out from all sessions' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Request password reset
router.post('/forgot-password', async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(404).json({ message: 'No admin found with that email' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    admin.resetPasswordToken = token;
    admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await admin.save();

    // Here you would typically send an email with the reset link
    // For demo purposes, we'll just return the token
    res.json({ message: 'Password reset link sent to email', resetToken: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reset password
router.post('/reset-password/:token', async (req, res) => {
  try {
    const admin = await Admin.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!admin) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    admin.password = req.body.password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    await admin.save();

    res.json({ message: 'Password has been reset' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get admin profile
router.get('/profile', auth, async (req, res) => {
  res.json(req.admin);
});

module.exports = router;