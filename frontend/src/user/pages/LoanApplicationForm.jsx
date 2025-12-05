// frontend/src/user/pages/LoanApplicationForm.jsx
import React, { useState } from 'react';
import { useRef } from 'react';
import { Download, XCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Upload, AlertCircle, Loader2, Clipboard } from 'lucide-react';
import './LoanApplicationForm.css';
import { copyToClipboard } from '../../utils/copyToClipboard';
import toast from 'react-hot-toast';

const LoanApplicationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [applicationId, setApplicationId] = useState(null);
  const [finalFormData, setFinalFormData] = useState(null);
const [finalApplicationId, setFinalApplicationId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '', fatherName: '', phone: '', email: '', gender: '', dob: '', maritalStatus: '',
    permanentAddress: '', currentAddress: '',
    aadhaarNumber: '', panNumber: '',
    bankName: '', accountNumber: '', ifscCode: '', accountType: '',
    employmentType: '', monthlyIncome: '', companyName: '',
    loanType: 'personal', loanAmount: '', tenure: '', purpose: ''
  });

  const [files, setFiles] = useState({
    aadhaarFront: null, aadhaarBack: null, panCard: null, passbook: null,
    salarySlip: null, itr: null, photo: null, signature: null, addressProof: null
  });

  const [filePreviews, setFilePreviews] = useState({});

  const pdfRef = useRef();



// const generatePDF = () => {
//   const input = pdfRef.current;

//   if (!finalFormData) {
//     toast.error("Data not ready. Please wait...");
//     return;
//   }

//   html2canvas(input, {
//     scale: 2,
//     useCORS: true,
//     height: input.scrollHeight + 1000,
//     windowHeight: input.scrollHeight + 1000,
//     scrollY: 0,
//     scrollX: 0,
//   }).then((canvas) => {
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();
//     const imgHeight = (canvas.height * pdfWidth) / canvas.width;

//     let heightLeft = imgHeight;
//     let position = 0;

//     pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
//     heightLeft -= pdfHeight;

//     while (heightLeft >= 0) {
//       position = heightLeft - imgHeight;
//       pdf.addPage();
//       pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
//       heightLeft -= pdfHeight;
//     }

//     const appId = finalApplicationId || applicationId || 'DRAFT';
//     pdf.save(`AadharCapital_Application_${appId.slice(-8).toUpperCase()}.pdf`);
//   }).catch((err) => {
//     console.error("PDF Error:", err);
//     toast.error("PDF generation failed. Try again!");
//   });
// };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

// const handleFileChange = (e, field) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   if (['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(file.type)) {
//     setFiles(prev => ({ ...prev, [field]: file }));
//     setFilePreviews(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
//   } else {
//     alert('Only JPG, PNG or PDF allowed');
//   }
// };

const handleFileChange = (e, field) => {
  const file = e.target.files[0];
  if (!file) return;

  if (['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(file.type)) {
    setFiles(prev => ({ ...prev, [field]: file }));
    setFilePreviews(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
    toast.success(`${field === 'aadhaarFront' ? 'Aadhaar Front' : field.replace(/([A-Z])/g, ' $1')} uploaded!`, {
      icon: <CheckCircle size={18} />,
      duration: 2000,
    });
  } else {
    toast.error('Only JPG, PNG or PDF allowed!', {
      icon: <XCircle size={20} />,
    });
  }
};



const validateStep = () => {
  const requiredFields = {
    1: ['fullName', 'phone', 'email', 'gender', 'dob', 'maritalStatus', 'permanentAddress'],
    2: ['aadhaarNumber', 'panNumber'],
    3: ['bankName', 'accountNumber', 'ifscCode', 'accountType'],
    4: ['employmentType', 'monthlyIncome', 'loanType', 'loanAmount', 'tenure'],
    5: ['aadhaarFront', 'panCard'] // Required files
  };

  const fields = requiredFields[step];
  if (!fields) return '';

  for (let field of fields) {
    // For file fields in step 5
    if (step === 5) {
      if (!files[field] || !files[field]?.name) {
        return `Please upload ${field === 'aadhaarFront' ? 'Aadhaar Front' : 'PAN Card'}`;
      }
    } 
    // For text fields
    else if (!formData[field] || formData[field].toString().trim() === '') {
      const label = field.replace(/([A-Z])/g, ' $1').toLowerCase();
      return `Please fill ${label}`;
    }
  }
  return '';
};

  const handleNext = () => {
    console.log('Current files state:', files); // ← ADD THIS LINE
    const validationError = validateStep();
    if (validationError) {
      toast.error(validationError, {
      icon: <AlertCircle size={20} />,
      duration: 5000,
    });
      return;
    }
    setError('');
    if (step < 6) setStep(step + 1);
  };

const handleSubmit = async () => {
  setLoading(true);
  setError('');

  // === SABSE PEHLE SAB REQUIRED FIELDS CHECK ===
  const requiredTextFields = {
    fullName: "Full Name",
    phone: "Phone Number",
    email: "Email",
    gender: "Gender",
    dob: "Date of Birth",
    maritalStatus: "Marital Status",
    permanentAddress: "Permanent Address",
    aadhaarNumber: "Aadhaar Number",
    panNumber: "PAN Number",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    ifscCode: "IFSC Code",
    accountType: "Account Type",
    employmentType: "Employment Type",
    monthlyIncome: "Monthly Income",
    loanType: "Loan Type",
    loanAmount: "Loan Amount",
    tenure: "Tenure"
  };

  for (const [key, label] of Object.entries(requiredTextFields)) {
    if (!formData[key] || formData[key].toString().trim() === '') {
      toast.error(`${label} is required!`);
      setLoading(false);
      return;
    }
  }

  // Required Files
  if (!files.aadhaarFront) {
    toast.error("Aadhaar Front Image is required!");
    setLoading(false);
    return;
  }
  if (!files.panCard) {
    toast.error("PAN Card is required!");
    setLoading(false);
    return;
  }

  // === AB DATA BHEJENGE ===
  const formDataToSend = new FormData();

  // Text fields
  Object.keys(formData).forEach(key => {
    formDataToSend.append(key, formData[key]);
  });

  // Files (even if some are null, backend ko pata chalega)
  Object.keys(files).forEach(key => {
    if (files[key]) {
      formDataToSend.append(key, files[key]);
    }
  });

  try {
    const response = await axios.post(
      '${import.meta.env.VITE_BACKEND_URL}/api/user/loan/apply',
      formDataToSend,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000
      }
    );

    // SUCCESS — PDF KE LIYE DATA SAVE
    const appId = response.data.applicationId || response.data._id;
    setFinalApplicationId(appId);
    setFinalFormData({ ...formData });
    setApplicationId(appId);
    setStep(7);

    toast.success("Application Submitted Successfully! ID Copied!", {
      icon: "Success",
      duration: 7000,
    });
    // EMAIL BHEJNE KA CALL
// try {
//   await axios.post('${import.meta.env.VITE_BACKEND_URL}/api/user/send-confirmation-email', {
//     email: formData.email,
//     fullName: formData.fullName,
//     applicationId: appId
//   });
//   console.log("Confirmation email sent!");
// } catch (err) {
//   console.log("Email failed (but application saved)");
//   // Email fail ho bhi jaye toh application saved rahegi
// }


    navigator.clipboard.writeText(appId);

   } catch (err) {
  console.error("Full Error from Server:", err.response?.data);

  // YE SABSE POWERFUL ERROR HANDLER HAI — AB EXACT MESSAGE DIKHEGA
  let errorMessage = "Something went wrong!";

  if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
    // Agar errors array hai → pehla error ka msg ya pura object dikha do
    const firstError = err.response.data.errors[0];
    errorMessage = firstError.msg || firstError.message || JSON.stringify(firstError);
  } else if (err.response?.data?.message) {
    errorMessage = err.response.data.message;
  }

  toast.error(errorMessage, { duration: 10000 });
  setError(errorMessage);
}finally {
    setLoading(false);
  }
};

  const renderStep = () => {
    switch (step) {
      case 1: // Personal Details
        return (
          <div className="form-step">
            <h2>Personal Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Father's Name</label>
                <input name="fatherName" value={formData.fatherName} onChange={handleInputChange} placeholder="Robert Doe" />
              </div>
              <div className="form-group">
                <label>Phone *</label>
              
<input
  name="phone"
  value={formData.phone}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: value });
  }}
  type="tel"
  placeholder="9876543210"
  maxLength="10"
/>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Birth *</label>
                <input name="dob" value={formData.dob} onChange={handleInputChange} type="date" />
              </div>
              <div className="form-group">
                <label>Marital Status *</label>
                <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                </select>
              </div>
              <div className="form-group full">
                <label>Permanent Address *</label>
                <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleInputChange} placeholder="123 Main St, Mumbai" />
              </div>
              <div className="form-group full">
                <label>Current Address</label>
                <textarea name="currentAddress" value={formData.currentAddress} onChange={handleInputChange} placeholder="456 Park Ave, Mumbai" />
              </div>
            </div>
          </div>
        );
      case 2: // Identity Details
        return (
          <div className="form-step">
            <h2>Identity Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Aadhaar Number *</label>
                <input name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleInputChange} placeholder="1234 5678 9012" />
              </div>
              <div className="form-group">
                <label>PAN Number *</label>
                <input name="panNumber" value={formData.panNumber} onChange={handleInputChange} placeholder="ABCDE1234F" />
              </div>
            </div>
          </div>
        );
      case 3: // Bank Details
        return (
          <div className="form-step">
            <h2>Bank Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Bank Name *</label>
                <input name="bankName" value={formData.bankName} onChange={handleInputChange} placeholder="HDFC Bank" />
              </div>
              <div className="form-group">
                <label>Account Number *</label>
                <input name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} placeholder="123456789012" />
              </div>
              <div className="form-group">
                <label>IFSC Code *</label>
                <input name="ifscCode" value={formData.ifscCode} onChange={handleInputChange} placeholder="HDFC0001234" />
              </div>
              <div className="form-group">
                <label>Account Type *</label>
                <select name="accountType" value={formData.accountType} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 4: // Employment Details
      return (
        <div className="form-step">
          <h2>Employment & Loan Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Employment Type *</label>
              <select name="employmentType" value={formData.employmentType} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self-Employed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Monthly Income *</label>
              <input name="monthlyIncome" value={formData.monthlyIncome} onChange={handleInputChange} type="number" placeholder="50000" />
            </div>
            <div className="form-group">
              <label>Company Name</label>
              <input name="companyName" value={formData.companyName} onChange={handleInputChange} />
            </div>

            <div className="form-group">
              <label>Loan Type *</label>
              <select name="loanType" value={formData.loanType} onChange={handleInputChange}>
                <option value="personal">Personal Loan</option>
                <option value="business">Business Loan</option>
                <option value="home">Home Loan</option>
                <option value="car">Car Loan</option>
              </select>
            </div>
            <div className="form-group">
              <label>Loan Amount *</label>
              <input name="loanAmount" value={formData.loanAmount} onChange={handleInputChange} type="number" placeholder="500000" />
            </div>
            <div className="form-group">
              <label>Tenure (months) *</label>
              <input name="tenure" value={formData.tenure} onChange={handleInputChange} type="number" placeholder="36" />
            </div>
            <div className="form-group full">
              <label>Purpose of Loan</label>
              <textarea name="purpose" value={formData.purpose} onChange={handleInputChange} placeholder="Medical, Education, Marriage..." />
            </div>
          </div>
        </div>
      );
case 5: // Documents
  return (
    <div className="form-step">
      <h2>Upload Documents</h2>
      <div className="form-grid">
        {[
          { field: 'aadhaarFront', label: 'Aadhaar Front *' },
          { field: 'aadhaarBack', label: 'Aadhaar Back' },
          { field: 'panCard', label: 'PAN Card *' },
          { field: 'passbook', label: 'Passbook' },
          { field: 'salarySlip', label: 'Salary Slip' },
          { field: 'itr', label: 'ITR' },
          { field: 'photo', label: 'Photo' },
          { field: 'signature', label: 'Signature' },
          { field: 'addressProof', label: 'Address Proof' }
        ].map(({ field, label }) => (
          <div className="form-group file-upload" key={field}>
            <label>{label}</label>

            <label htmlFor={`file-${field}`} className="upload-box-custom">
              <Upload size={28} />
              <span className="upload-text">
                {files[field] ? files[field].name : 'Click to upload JPG, PNG or PDF'}
              </span>
              {files[field] && <CheckCircle size={20} color="#10b981" />}
            </label>

            {/* HIDDEN FILE INPUT — NEVER RE-RENDER */}
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,application/pdf"
              onChange={(e) => handleFileChange(e, field)}
              style={{ display: 'none' }}
              id={`file-${field}`}
            />

            {/* Preview */}
            {filePreviews[field] && (
              <div className="file-preview">
                {files[field]?.type.includes('pdf') ? (
                  <div className="pdf-preview">
                    <embed src={filePreviews[field]} width="120" height="120" />
                    <p>PDF</p>
                  </div>
                ) : (
                  <img src={filePreviews[field]} alt={field} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  case 6: // Review
        return (
          <div className="form-step review-step">
            <h2>Review Your Application</h2>
            <div className="review-grid">
              {Object.entries(formData).map(([key, value]) => (
                value && (
                  <div className="review-item" key={key}>
                    <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <strong>{value}</strong>
                  </div>
                )
              ))}
              {Object.entries(files).map(([key, file]) => (
                file && (
                  <div className="review-item" key={key}>
                    <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <strong>{file.name}</strong>
                  </div>
                )
              ))}
            </div>
            <p className="review-note">Please verify all details before submitting.</p>
          </div>
        );
      case 7: // Success
        return (
      <div className="success-step">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
            <CheckCircle size={80} className="success-icon" />
          </motion.div>
          <h2>Application Submitted Successfully!</h2>
          {/* <p className="app-id">Application ID: <strong>{applicationId}</strong></p> */}

           <div className="app-id-section">
  <div className="app-id-full">
    <span>Application ID:</span>
    <strong>{applicationId}</strong>
    <button
      onClick={async () => {
        // await copyToClipboard(applicationId);
        await navigator.clipboard.writeText(applicationId);
   toast.success('Full Application ID copied!', {
                icon: <Clipboard size={22} />,
                duration: 4000,
              });
      }}
      className="copy-btn"
      title="Copy full ID"
    >
      Copy
    </button>
  </div>
  <div className="app-id-short">
    <small>Quick Reference ID:</small>
    <strong style={{ fontSize: '18px', color: '#1e40af' }}>
      {applicationId.slice(-8).toUpperCase()}
    </strong>
    <button
      onClick={async () => {
        const shortId = applicationId.slice(-8).toUpperCase();
       await navigator.clipboard.writeText(shortId);
              toast.success(`Short ID ${shortId} copied!`, {
                icon: <CheckCircle size={20} color="#10b981" />,
                duration: 4000,
              });
      }}
      className="copy-btn small"
      title="Copy short ID"
    >
      Copy
    </button>
  </div>
</div>

          <div className="success-actions">
            {/* <button onClick={generatePDF} className="btn-primary pdf-btn">
              <Download size={20} /> Download PDF
            </button> */}
            {/* <a href={`https://wa.me/919876543210?text=My Loan App ID: ${applicationId}`} target="_blank" className="btn-whatsapp">
              Share on WhatsApp
            </a> */}
            <button onClick={() => navigate('/track')} className="btn-outline">
              Track Status
            </button>
          </div>

      {/* Hidden PDF Template (not visible on screen) */}
 {/* HIDDEN PDF TEMPLATE — SAB KUCH DIKHEGA + THUMBNAILS BHI */}


    </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
     
      <section className="loan-form-section">
        <div className="container">
          <motion.div
            className="form-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {step < 7 && (
              <>
                <div className="progress-bar">
                  {['Personal', 'Identity', 'Bank', 'Employment', 'Documents', 'Review'].map((label, i) => (
                    <div
                      key={i}
                      className={`progress-step ${step > i + 1 ? 'completed' : step === i + 1 ? 'active' : ''}`}
                    >
                      <span>{i + 1}</span>
                      <p>{label}</p>
                    </div>
                  ))}
                </div>
                {error && (
                  <div className="error-message">
                    <AlertCircle size={20} /> {error}
                  </div>
                )}
              </>
            )}
            {renderStep()}
            {step < 7 && (
              <div className="form-actions">
                {step > 1 && (
                  <button className="btn-secondary" onClick={() => setStep(step - 1)}>
                    Back
                  </button>
                )}
                {step < 6 ? (
                  <button className="btn-primary" onClick={handleNext}>
                    Next <ArrowRight size={20} />
                  </button>
                ) : (
                  <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? <Loader2 size={20} className="spinner" /> : 'Submit Application'}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>
     
    </>
  );
};

export default LoanApplicationForm;