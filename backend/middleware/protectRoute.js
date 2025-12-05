import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Admin from '../models/Admin.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token belongs to User or Admin
    const user = await User.findById(decoded.id);
    if (user) {
      req.user = user;
      return next();
    }

    const admin = await Admin.findById(decoded.id);
    if (admin) {
      req.user = admin;
      req.user.role = 'admin';
      return next();
    }

    res.status(401).json({ message: 'Not authorized' });
  } catch (error) {
    res.status(401).json({ message: 'Token failed' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Admin access only' });
};