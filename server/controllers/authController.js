const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// @desc  Login admin
// @route POST /api/auth/login
// @access Public
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password.' });
  }

  try {
    const admin = await Admin.findOne({ username: username.toLowerCase().trim() });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      username: admin.username,
      message: 'Login successful.',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login };
