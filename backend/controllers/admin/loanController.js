// backend/controllers/admin/loanController.js
import LoanApplication from '../../models/LoanApplication.js';
import User from '../../models/User.js';

// @desc    Get all loan applications (with search, filter, pagination)
// @route   GET /api/admin/loans
export const getAllApplications = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status || '';

    let query = {};
    
if (/[0-9a-fA-F]{6,}/.test(search)) {
  const last8 = search.slice(-8);

  searchConditions.push({
    $expr: {
      $regexMatch: {
        input: { $toString: "$_id" },
        regex: last8,
        options: "i"
      }
    }
  });
}


    if (status && status !== 'all') {
      query.status = status;
    }

    const total = await LoanApplication.countDocuments(query);
    const applications = await LoanApplication.find(query)
      .populate('user', 'fullName email phone')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      applications,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single application by ID
// @route   GET /api/admin/loans/:id
// backend/controllers/admin/loanController.js → REPLACE THIS FUNCTION ONLY

export const getApplicationById = async (req, res) => {
  try {
    const application = await LoanApplication.findById(req.params.id)
      .populate('user', 'fullName email phone')
      .lean(); // ← ADD .lean() FOR SAFETY

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // FORCE INCLUDE DOCUMENTS – THIS IS THE KEY FIX
    res.json({
      ...application,
      documents: application.documents || {} // ← This guarantees documents are sent
    });

  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update application status + add notes
// @route   PUT /api/admin/loans/:id
export const updateApplication = async (req, res) => {
  try {
    const updates = req.body;  // ← POORA BODY LE RAHA HAI AB

    const application = await LoanApplication.findByIdAndUpdate(
      req.params.id,
      { $set: updates },      // ← JO BHI BHEJA JAYEGA WO UPDATE HO JAYEGA
      { new: true, runValidators: false }  // new: true → updated document return karega
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      message: 'Application updated successfully',
      application,  // ← updated application bhej raha hai
    });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
// @desc    Export all applications as CSV
// @route   GET /api/admin/loans/export/csv
export const exportApplicationsCSV = async (req, res) => {
  try {
    const applications = await LoanApplication.find()
      .populate('user', 'fullName email phone')
      .sort({ createdAt: -1 });

    let csv = 'ID,Name,Email,Phone,Loan Type,Amount,Status,Date\n';

    applications.forEach(app => {
      const row = [
        app._id,
        app.fullName || 'N/A',
        app.email || 'N/A',
        app.phone || 'N/A',
        app.loanType,
        app.loanAmount,
        app.status,
        new Date(app.createdAt).toLocaleDateString(),
      ];
      csv += row.join(',') + '\n';
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('loan-applications.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get loan stats for dashboard
// @route   GET /api/admin/loans/stats
export const getLoanStats = async (req, res) => {
  try {
    const stats = await LoanApplication.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
          underReview: { $sum: { $cond: [{ $eq: ["$status", "Under Review"] }, 1, 0] } },
          approved: { $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] } },
          rejected: { $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] } }
        }
      }
    ]);

    res.json(stats[0] || { total: 0, pending: 0, underReview: 0, approved: 0, rejected: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Upload user-visible PDF
export const uploadUserDocument = async (req, res) => {
  try {
    const { type } = req.body;
    const file = req.file; // assuming multer or cloudinary middleware
    const url = file.path; // or cloudinary url

    const application = await LoanApplication.findById(req.params.id);
    const existingIndex = application.userVisibleDocuments.findIndex(d => d.type === type);

    if (existingIndex > -1) {
      application.userVisibleDocuments[existingIndex].url = url;
      application.userVisibleDocuments[existingIndex].visibleToUser = true;
    } else {
      application.userVisibleDocuments.push({ type, url, visibleToUser: true });
    }

    await application.save();
    res.json({ message: 'Document uploaded' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Toggle visibility
export const toggleUserDocumentVisibility = async (req, res) => {
  const { type, visible } = req.body;
  await LoanApplication.findByIdAndUpdate(
    req.params.id,
    { $set: { "userVisibleDocuments.$[elem].visibleToUser": visible } },
    { arrayFilters: [{ "elem.type": type }] }
  );
  res.json({ success: true });
};


export const toggleUserDocVisibility = async (req, res) => {
  try {
    const { docType, visible } = req.body;
    const field = `userVisibleDocs.${docType}`;

    const application = await LoanApplication.findByIdAndUpdate(
      req.params.id,
      { $set: { [field]: visible } },
      { new: true }
    );

    if (!application) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'Updated', application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};