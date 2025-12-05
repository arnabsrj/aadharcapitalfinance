// controllers/admin/authController.js
import { registerAdmin, loginAdmin } from '../../services/admin/authService.js';
import logger from '../../utils/logger.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, secret } = req.body;
    if (!name || !email || !password || !secret) {
      return res.status(400).json({
        success: false,
        message: 'All fields including secret are required',
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }
    const result = await registerAdmin({ name, email, password, secret });
    const { token, admin } = result;

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
        token,  // Add token in body for frontend/Postman
      },
    });
  } catch (error) {
    const statusCode = error.message.includes('secret') || error.message.includes('already exists') ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || 'Admin registration failed',
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();  // Normalize
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

    const result = await loginAdmin({ email, password });
    const { token, admin } = result;

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'Admin login successful',
      data: {
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
        token,  // Add token in body
      },
    });
  } catch (error) {
    const statusCode = error.message === 'Invalid credentials' ? 401 : 500;
    res.status(statusCode).json({ success: false, message: error.message || 'Login failed' });
  }
};

export const getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ message: 'Not authorized' });

    const admin = await Admin.findById(req.user.id).select('-password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.json({ success: true, data: admin });
  } catch (err) {
    logger.error('Get admin profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};