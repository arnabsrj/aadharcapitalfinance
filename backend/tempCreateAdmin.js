// RUN THIS FILE ONLY ONCE using: node tempCreateAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt); // change password if you want

    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@loan.com',
      password: hashedPassword,
    });

    console.log('Admin created successfully!');
    console.log('Email: admin@loan.com');
    console.log('Password: admin123');
    console.log('Now login using POST /api/admin/login');

    process.exit();
  } catch (error) {
    console.log('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();