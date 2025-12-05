// backend/routes/admin/loanRoutes.js
import express from 'express';
import {
  getAllApplications,
  getApplicationById,
  updateApplication,
  exportApplicationsCSV,
  getLoanStats,
  uploadUserDocument,
  toggleUserDocumentVisibility,
  toggleUserDocVisibility,
} from '../../controllers/admin/loanController.js';
import { protect, adminOnly } from '../../middleware/protectRoute.js';
import LoanApplication from '../../models/LoanApplication.js';

const router = express.Router();

// All routes are admin-only
router.use(protect, adminOnly);

router.get('/loans', getAllApplications);
router.get('/loans/:id', getApplicationById);
router.put('/loans/:id', updateApplication);
router.get('/loans/export/csv', exportApplicationsCSV);
router.post('/loans/:id/upload-user-doc', uploadUserDocument); // upload
router.put('/loans/:id/toggle-user-doc', toggleUserDocumentVisibility); // toggle
router.put('/loans/:id/toggle-doc', toggleUserDocVisibility);
// router.get('/loans/stats', getLoanStats);

// backend/routes/adminRoutes.js

// YE ROUTE ADD KAR DE
router.get('/stats', async (req, res) => {
  try {
    const stats = await LoanApplication.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] } },
          underReview: { $sum: { $cond: [{ $eq: ['$status', 'Under Review'] }, 1, 0] } },
          approved: { $sum: { $cond: [{ $eq: ['$status', 'Approved'] }, 1, 0] } },
          rejected: { $sum: { $cond: [{ $eq: ['$status', 'Rejected'] }, 1, 0] } }
        }
      }
    ]);

    const result = stats[0] || { total: 0, pending: 0, underReview: 0, approved: 0, rejected: 0 };

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Stats error' });
  }
});



// DELETE APPLICATION ROUTE — YE DAAL DE
router.delete('/loans/:id', async (req, res) => {
  try {
    const application = await LoanApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Delete from DB
    await LoanApplication.findByIdAndDelete(req.params.id);

    // Optional: Agar Cloudinary images hain toh delete kar sakta hai (bonus)
    // const publicIds = Object.values(application.documents).map(url => url.split('/').pop().split('.')[0]);
    // await cloudinary.api.delete_resources(publicIds);

    res.json({ 
      success: true, 
      message: 'Application deleted successfully!' 
    });

  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while deleting', 
      error: error.message 
    });
  }
});





// In loanRoutes.js or create customers route
// GET /api/user/loan/customers - Get all unique customers with full details
router.get('/customers', async (req, res) => {
  try {
    // Get all applications and sort by latest first
    const applications = await LoanApplication.find()
      .sort({ createdAt: -1 })
      .lean();

    // Create unique customers by phone (most reliable identifier)
    const customerMap = new Map();

    applications.forEach(app => {
      const key = app.phone;
      if (!customerMap.has(key)) {
        customerMap.set(key, {
          _id: app._id,
          fullName: app.fullName || 'Guest',
          fatherName: app.fatherName,
          phone: app.phone,
          email: app.email || '-',
          aadhaarNumber: app.aadhaarNumber ? `XXXX-XXXX-${app.aadhaarNumber.slice(-4)}` : '-',
          panNumber: app.panNumber || '-',
          permanentAddress: app.permanentAddress,
          bankName: app.bankName,
          accountNumber: app.accountNumber ? `XXXXXX${app.accountNumber.slice(-4)}` : '-',
          ifscCode: app.ifscCode,
          monthlyIncome: app.monthlyIncome,
          loanAmount: app.loanAmount,
          loanType: app.loanType,
          status: app.status,
          appliedAt: app.createdAt,
          totalApplications: 0,
          totalLoanApplied: 0
        });
      }

      const cust = customerMap.get(key);
      cust.totalApplications += 1;
      cust.totalLoanApplied += app.loanAmount;

      // Update to latest application
      if (new Date(app.createdAt) > new Date(cust.appliedAt)) {
        cust._id = app._id;
        cust.status = app.status;
        cust.loanAmount = app.loanAmount;
        cust.loanType = app.loanType;
        cust.appliedAt = app.createdAt;
      }
    });

    res.json({
      success: true,
      customers: Array.from(customerMap.values())
    });

  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




export default router;