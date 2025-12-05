// services/admin/authService.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../../models/Admin.js';  // ← FIXED
import logger from '../../utils/logger.js';

const SALT_ROUNDS = 12;
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

export const registerAdmin = async ({ name, email, password, secret }) => {
  try {
    // 1. Check secret key
    if (secret !== process.env.ADMIN_REGISTER_SECRET) {
      throw new Error('Invalid admin registration secret');
    }

    // 2. Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      throw new Error('Admin with this email already exists');
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 4. Create admin (NO TAMIL TRANSLATION!)
    const admin = await Admin.create({
      name,           // ← Keep original name
      email,
      password: hashedPassword,
    });

    const token = generateToken({ id: admin._id, role: 'admin' });

    logger.info(`New admin registered: ${email}`);
    return {
      admin: { id: admin._id, name: admin.name, email: admin.email, role: 'admin' },
      token,
    };
  } catch (error) {
    logger.error('Admin register error:', error.message);
    throw error;
  }
};

export const loginAdmin = async ({ email, password }) => {
  try {
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = generateToken({ id: admin._id, role: 'admin' });

    logger.info(`Admin logged in: ${email}`);
    return {
      admin: { id: admin._id, name: admin.name, email: admin.email, role: 'admin' },
      token,
    };
  } catch (error) {
    logger.error('Admin login error:', error.message);
    throw error;
  }
};