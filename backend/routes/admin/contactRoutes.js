// backend/routes/contactRoutes.js
import express from 'express';
import ContactQuery from '../models/ContactQuery.js';

const router = express.Router();

// POST: Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const newQuery = new ContactQuery({
      name, email, phone, subject, message
    });

    await newQuery.save();
    res.status(201).json({ message: 'Query submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET: All queries for admin
router.get('/queries', async (req, res) => {
  try {
    const queries = await ContactQuery.find().sort({ createdAt: -1 });
    res.json({ queries });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch queries' });
  }
});

// PUT: Update status
router.put('/queries/:id', async (req, res) => {
  try {
    const { status } = req.body;
    await ContactQuery.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

export default router;