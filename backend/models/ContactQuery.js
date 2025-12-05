// backend/models/ContactQuery.js
import mongoose from 'mongoose';

const contactQuerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'New', enum: ['New', 'In Progress', 'Resolved'] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ContactQuery', contactQuerySchema);