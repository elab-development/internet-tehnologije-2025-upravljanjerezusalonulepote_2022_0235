
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../src/middleware/auth');
const { User } = require('../models');

router.get('/', authenticateToken, authorizeRoles('ADMIN'), async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = router;