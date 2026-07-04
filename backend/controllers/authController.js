const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key_123456';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

const sanitizeUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  created_at: user.created_at,
  updated_at: user.updated_at
});

const createToken = (user) => jwt.sign(
  {
    id: user.id,
    email: user.email,
    username: user.username
  },
  JWT_SECRET,
  { expiresIn: JWT_EXPIRE }
);

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body || {};

    if (!username || !String(username).trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
        error: 'VALIDATION_ERROR'
      });
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(String(email).trim())) {
      return res.status(400).json({
        success: false,
        message: 'Valid email is required',
        error: 'VALIDATION_ERROR'
      });
    }

    if (!password || String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
        error: 'VALIDATION_ERROR'
      });
    }

    const normalizedUsername = String(username).trim();
    const normalizedEmail = String(email).trim().toLowerCase();

    const existingByEmail = await User.findByEmail(normalizedEmail);
    if (existingByEmail) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists',
        error: 'CONFLICT'
      });
    }

    const existingByUsername = await User.findByUsername(normalizedUsername);
    if (existingByUsername) {
      return res.status(409).json({
        success: false,
        message: 'Username already exists',
        error: 'CONFLICT'
      });
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);
    const createdUser = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword
    });
    const token = createToken(createdUser);

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: sanitizeUser(createdUser),
      token
    });
  } catch (error) {
    console.error('Register failed:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Registration failed',
      error: 'REGISTER_FAILED'
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        error: 'VALIDATION_ERROR'
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        error: 'INVALID_CREDENTIALS'
      });
    }

    const isPasswordValid = await bcrypt.compare(String(password), user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        error: 'INVALID_CREDENTIALS'
      });
    }

    const token = createToken(user);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: sanitizeUser(user),
      token
    });
  } catch (error) {
    console.error('Login failed:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Login failed',
      error: 'LOGIN_FAILED'
    });
  }
};

const profile = async (req, res) => {
  try {
    const userId = Number(req.user?.id);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        error: 'UNAUTHORIZED'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      });
    }

    return res.status(200).json({
      success: true,
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error('Profile fetch failed:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: 'PROFILE_FAILED'
    });
  }
};

module.exports = {
  register,
  login,
  profile
};