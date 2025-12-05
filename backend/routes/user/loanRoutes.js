// backend/routes/user/loanRoutes.js

import express from 'express';
import multer from 'multer';
import { body, validationResult } from 'express-validator';
import LoanApplication from '../../models/LoanApplication.js'; // ← Fixed import
import { applyLoan, getMyApplications } from '../../controllers/user/loanController.js';

const router = express.Router();

// Multer config - memory storage for Cloudinary
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG and PDF files are allowed'));
    }
  }
});

// POST /api/user/loan/apply → NO LOGIN REQUIRED (Guest Mode)
// backend/routes/user/loanRoutes.js → REPLACE THE WHOLE POST /apply ROUTE

router.post(
  '/apply',
  upload.fields([
    { name: 'aadhaarFront', maxCount: 1 },
    { name: 'aadhaarBack', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'passbook', maxCount: 1 },
    { name: 'salarySlip', maxCount: 1 },
    { name: 'itr', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'signature', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 }
  ]),

  // MINIMAL VALIDATION – ONLY WHAT'S REALLY NEEDED
  [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('phone')
      .trim()
      .isLength({ min: 10, max: 10 })
      .isNumeric()
      .withMessage('Phone must be 10 digits'),
    body('loanType').notEmpty().withMessage('Loan type is required'),
    body('loanAmount').isNumeric().withMessage('Valid loan amount required'),
    body('tenure').optional().isNumeric(),
    body('monthlyIncome').optional().isNumeric(),
  ],

  // Validation Result Handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Please check the form',
        errors: errors.array().map(e => e.msg)
      });
    }
    next();
  },

  applyLoan  // Your controller works perfectly
);

// GET user's applications using phone (for guest tracking)
router.get('/my-applications', async (req, res) => {
  try {
    const { phone } = req.query;
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const applications = await LoanApplication.find({ phone })
      .sort({ createdAt: -1 })
      .select('-documents');

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUBLIC TRACK: By Application ID or Phone
router.get('/track/:identifier', async (req, res) => {
  try {
    const identifier = req.params.identifier.trim();

    const application = await LoanApplication.findOne({
      $or: [
        { _id: identifier },
        { phone: identifier }
      ]
    }).select('fullName phone email loanType loanAmount tenure status createdAt applicationId userVisibleDocs adminNotes permanentAddress currentAddress panNumber aadhaarNumber bankName accountNumber ifscCode');

    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



// GET ALL CUSTOMERS - ADMIN ONLY (or public if you want)
router.get('/customers', async (req, res) => {
  try {
    const applications = await LoanApplication.find().sort({ createdAt: -1 });

    // Group by phone to get unique customers
    const customerMap = new Map();

    applications.forEach(app => {
      if (!customerMap.has(app.phone)) {
        customerMap.set(app.phone, {
          _id: app._id,
          fullName: app.fullName || 'Guest',
          fatherName: app.fatherName,
          phone: app.phone,
          email: app.email || '-',
          aadhaarNumber: app.aadhaarNumber ? `XXXX-XXXX-${app.aadhaarNumber.slice(-4)}` : 'Not Provided',
          panNumber: app.panNumber || 'Not Provided',
          permanentAddress: app.permanentAddress,
          bankName: app.bankName,
          accountNumber: app.accountNumber ? `XXXXXX${app.accountNumber.slice(-4)}` : 'Not Provided',
          ifscCode: app.ifscCode,
          monthlyIncome: app.monthlyIncome,
          loanType: app.loanType,
          loanAmount: app.loanAmount,
          status: app.status,
          appliedAt: app.createdAt,
          totalApplications: 0,
          totalLoanApplied: 0
        });
      }

      const cust = customerMap.get(app.phone);
      cust.totalApplications += 1;
      cust.totalLoanApplied += app.loanAmount;

      // Always show latest application as main
      if (new Date(app.createdAt) > new Date(cust.appliedAt)) {
        Object.assign(cust, {
          _id: app._id,
          loanType: app.loanType,
          loanAmount: app.loanAmount,
          status: app.status,
          appliedAt: app.createdAt
        });
      }
    });

    res.json({
      success: true,
      customers: Array.from(customerMap.values())
    });

  } catch (error) {
    console.error('Customers route error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});




export default router;