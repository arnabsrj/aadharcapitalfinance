import LoanApplication from '../../models/LoanApplication.js';
import { uploadToCloudinary } from '../../utils/cloudinary.js';
import { sendConfirmationEmail } from '../../utils/sendEmail.js';

export const applyLoan = async (req, res) => {
  try {
    const { fullName, phone, email, loanType, loanAmount } = req.body;
    const files = req.files || {};

    // Required fields
    if (!fullName || !phone || !email || !loanType || !loanAmount) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Phone, Email, Loan Type & Amount are required!'
      });
    }

    // Upload files
    const documents = {};
    const fields = ['aadhaarFront','aadhaarBack','panCard','passbook','salarySlip','itr','photo','signature','addressProof'];

    for (const field of fields) {
      if (files[field]?.[0]?.buffer) {
        try {
          const url = await uploadToCloudinary(files[field][0].buffer);
          documents[field] = url;
        } catch (err) {
          console.log(`Upload failed: ${field}`, err.message);
        }
      }
    }

    // Save to DB
  // Prepare new application data with default userVisibleDocs
    const applicationData = {
      ...req.body,
      documents,
      status: 'Pending',
      userVisibleDocs: {
        noc: false,
        sanctionLetter: false,
        agreement: false,
        repaymentSchedule: false
      }
    };

    // Create application in DB
    const application = await LoanApplication.create(applicationData);

    const applicationId = application._id.toString();

    // Send Email
    try {
      await sendConfirmationEmail(email, fullName, applicationId);
      console.log(`Email sent to ${email}`);
    } catch (err) {
      console.log("Email failed but application saved:", err.message);
    }

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      applicationId
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


// Get My Applications (optional – keep if needed)
export const getMyApplications = async (req, res) => {
  try {
    
    const applications = await LoanApplication.find({ phone: req.query.phone }) // Use phone for guest
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const trackApplication = async (req, res) => {
  try {
    const identifier = req.params.identifier;

    const application = await LoanApplication.findOne({
      $or: [
        { _id: identifier },
        { phone: identifier }
      ]
    })
    .select(
      'fullName phone email permanentAddress panNumber aadhaarNumber ' +
      'bankName accountNumber ifscCode loanAmount tenure loanType ' +
      'createdAt status adminNotes userVisibleDocs _id'
    )  // ← YE SAB FIELDS EXPLICITLY INCLUDE KAR DIYA
    .lean();

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Extra safety: agar koi field missing ho to default
    const safeApp = {
      ...application,
      fullName: application.fullName || 'Guest User',
      phone: application.phone || 'N/A',
      email: application.email || 'N/A',
      permanentAddress: application.permanentAddress || 'Not Provided',
      panNumber: application.panNumber || 'N/A',
      aadhaarNumber: application.aadhaarNumber || 'N/A',
      bankName: application.bankName || 'N/A',
      accountNumber: application.accountNumber || 'N/A',
      ifscCode: application.ifscCode || 'N/A',
      loanAmount: application.loanAmount || 0,
      userVisibleDocs: application.userVisibleDocs || {
        noc: false,
        sanctionLetter: false,
        agreement: false,
        repaymentSchedule: false
      }
    };

    res.json({ application: safeApp });
  } catch (err) {
    console.error('Track Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};