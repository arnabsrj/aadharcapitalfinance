import mongoose from 'mongoose';

const loanApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },

  // Personal Details
  fullName: String,
  fatherName: String,
  phone: String,
  email: String,
  gender: String,
  dob: Date,
  maritalStatus: String,
  permanentAddress: String,
  currentAddress: String,

  // Identity
  aadhaarNumber: String,
  panNumber: String,

  // Bank
  bankName: String,
  accountNumber: String,
  ifscCode: String,
  accountType: String,

  // Employment & Income
  employmentType: String,
  monthlyIncome: Number,
  companyName: String,

  // Loan Details
  loanType: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  tenure: Number,
  purpose: String,

  // Document URLs from Cloudinary
 documents: {
  aadhaarFront: { type: String },
  aadhaarBack: { type: String },
  panCard: { type: String },
  photo: { type: String },
  signature: { type: String },
  salarySlip: { type: String },
  itr: { type: String },
  passbook: { type: String },
  addressProof: { type: String }
},

userVisibleDocuments: [
  {
    type: { type: String, enum: ['sanction_letter', 'agreement', 'welcome_letter', 'repayment_schedule'] },
    url: { type: String },        // PDF ka URL (Cloudinary ya local)
    visibleToUser: { type: Boolean, default: false },
    uploadedAt: { type: Date, default: Date.now }
  }
],

userVisibleDocs: {
  noc: { type: Boolean, default: false },
  sanctionLetter: { type: Boolean, default: false },
  agreement: { type: Boolean, default: false },
  repaymentSchedule: { type: Boolean, default: false }
},

  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  adminNotes: String,

}, { timestamps: true });

export default mongoose.model('LoanApplication', loanApplicationSchema);