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
import { Helmet } from 'react-helmet-async';

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

  // MAX 2MB PER FILE — YE LINE ADD KAR
  if (file.size > 2 * 1024 * 1024) {
    toast.error('File size must be less than 2MB!', { icon: CrossCircle });
    return;
  }

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
      `${import.meta.env.VITE_BACKEND_URL}/api/user/loan/apply`,
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


    // PREPARE CLEAN WHATSAPP MESSAGE
    const message = encodeURIComponent(
      `New Loan Application Received!\n\n` +
      `Application ID: ${appId}\n` +
      `Name: ${formData.fullName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email || 'Not Provided'}\n` +
      `Loan Type: ${(formData.loanType || 'Personal').charAt(0).toUpperCase() + (formData.loanType || '').slice(1)} Loan\n` +
      `Amount: ₹${Number(formData.loanAmount || 0).toLocaleString('en-IN')}\n` +
      `Tenure: ${formData.tenure || 'N/A'} months\n\n` +
      `Please verify and process this application.\n` +
      `Thank you!`
    );

    // DIRECT REDIRECT TO WHATSAPP — SUCCESS PAGE SKIP!
   window.open(`https://wa.me/917992008145?text=${message}`, '_blank');

  // } catch (err) {
  //   console.error("Error:", err.response?.data || err);
  //   const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || "Submission failed!";
  //   toast.error(msg, { duration: 8000 });
  //   setError(msg);
  // } finally {
  //   setLoading(false);
  // }


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




  // ---------- SEO-FRIENDLY HELMET ----------
  const SEO = () => (
    <Helmet>
      <title>Apply Online for Personal & Business Loans | Aadhar Capital Finance</title>
      <meta name="description" content="Fill our online loan application form for personal, business, home, or car loans. Fast approval with minimal documents. Apply now!" />
      <meta name="keywords" content="online loan application, personal loan online, business loan form, instant loan approval, Aadhar Capital Finance" />
      <link rel="canonical" href="https://www.aadharcapitalfinance.com/apply" />
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": "Online Loan Application",
          "description": "Apply online for personal, business, home, or car loans with Aadhar Capital Finance.",
          "url": "https://www.aadharcapitalfinance.com/apply",
          "brand": {
            "@type": "Organization",
            "name": "Aadhar Capital Finance",
            "url": "https://www.aadharcapitalfinance.com"
          },
          "applicationCategory": "Loan",
          "loanType": ["Personal", "Business", "Home", "Car"],
          "provider": {
            "@type": "FinancialService",
            "name": "Aadhar Capital Finance"
          }
        })}
      </script>
    </Helmet>
  );



  const renderStep = () => {
    switch (step) {
      case 1: // Personal Details
        return (
          <div className="form-step">
            <h2>Personal Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label>Father's Name</label>
                <input name="fatherName" value={formData.fatherName} onChange={handleInputChange} placeholder="Father's Name" />
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
                <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="loan@gmail.com" />
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
                <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleInputChange} placeholder="123 Main St, Haryana" />
              </div>
              <div className="form-group full">
                <label>Current Address</label>
                <textarea name="currentAddress" value={formData.currentAddress} onChange={handleInputChange} placeholder="456 Park Ave, Haryana" />
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
   <div className="success-step" style={{
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  background: 'linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%)',
  textAlign: 'center',
  boxSizing: 'border-box'
}}>
  <div style={{
    maxWidth: '100%',
    width: '100%',
    background: 'white',
    padding: '32px 20px',  // Mobile pe kam padding
    borderRadius: '20px',
    boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
    border: '1px solid #e0e7ff',
    boxSizing: 'border-box'
  }}>
    {/* Success Icon */}
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 16px' }} /> {/* Mobile pe chhota icon */}
    </motion.div>

    {/* Title */}
    <h2 style={{
      margin: '0 0 12px',
      color: '#1e40af',
      fontWeight: '900',
      fontSize: '24px',  // Mobile pe chhota
      lineHeight: '1.3'
    }}>
      Application Submitted Successfully!
    </h2>

    {/* Important Message */}
    <div style={{
      background: '#dbeafe',
      border: '2px solid #3b82f6',
      borderRadius: '14px',
      padding: '16px',
      margin: '24px 0',
      color: '#1e40af',
      fontWeight: '600',
      fontSize: '14.5px',  // Mobile pe readable
      lineHeight: '1.5',
      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.1)'
    }}>
      <AlertCircle size={22} style={{ display: 'block', margin: '0 auto 10px' }} />
      <strong>Important:</strong> Please copy and save your Application ID below.<br />
      You will need it to track your loan status. <strong>We recommend saving it now!</strong>
    </div>

    {/* Application ID Section */}
    <div style={{ margin: '28px 0' }}>
      {/* Full ID */}
      <div style={{
        background: '#f0f9ff',
        padding: '18px',
        borderRadius: '14px',
        border: '2px solid #0ea5e9',
        marginBottom: '18px',
        wordBreak: 'break-all'  // Important for long ID
      }}>
        <span style={{ fontWeight: '600', color: '#1e40af', display: 'block', marginBottom: '6px', fontSize: '14px' }}>
          Full Application ID:
        </span>
        <strong style={{ fontSize: '17px', color: '#1e40af', display: 'block', margin: '8px 0', fontFamily: 'monospace' }}>
          {applicationId}
        </strong>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(applicationId);
            toast.success('Full Application ID copied!', {
              icon: <Clipboard size={20} color="#3b82f6" />,
              duration: 4000,
            });
          }}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '10px'
          }}
        >
          <Clipboard size={16} /> Copy Full ID
        </button>
      </div>

      {/* Short ID */}
      <div style={{
        background: '#ecfdf5',
        padding: '18px',
        borderRadius: '14px',
        border: '2px solid #10b981'
      }}>
        <small style={{ color: '#065f46', display: 'block', marginBottom: '6px', fontSize: '13px' }}>
          Quick Reference ID (Last 8 digits):
        </small>
        <strong style={{
          fontSize: '26px',  // Mobile pe bhi clear dikhega
          color: '#10b981',
          display: 'block',
          margin: '10px 0',
          letterSpacing: '2px',
          fontFamily: 'monospace',
          fontWeight: '900'
        }}>
          {applicationId.slice(-8).toUpperCase()}
        </strong>
        <button
          onClick={async () => {
            const shortId = applicationId.slice(-8).toUpperCase();
            await navigator.clipboard.writeText(shortId);
            toast.success(`Short ID ${shortId} copied!`, {
              icon: <CheckCircle size={18} color="#10b981" />,
              duration: 4000,
            });
          }}
          style={{
            background: '#10b981',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '10px'
          }}
        >
          <Clipboard size={16} /> Copy Short ID
        </button>
      </div>
    </div>

    {/* Action Button */}
    <div style={{ marginTop: '35px' }}>
      <button
        onClick={() => navigate('/track')}
        style={{
          background: '#40513B',
          color: 'white',
          border: 'none',
          padding: '16px 40px',
          borderRadius: '50px',
          fontSize: '17px',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(64,81,59,0.3)',
          transition: 'all 0.3s ease',
          width: '100%',
          maxWidth: '320px'
        }}
        onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
      >
        Track Application Status
      </button>
    </div>



{/* WhatsApp Share Button */}
<div style={{ marginTop: '25px' }}>
 <a
  href={`https://wa.me/917992008145?text=${encodeURIComponent(
    `New Loan Application Received!\n\n` +
    `Application ID: ${applicationId}\n` +
    `Name: ${finalFormData?.fullName || formData.fullName}\n` +
    `Phone: ${finalFormData?.phone || formData.phone}\n` +
    `Email: ${finalFormData?.email || formData.email || 'Not Provided'}\n` +
    `Loan Type: ${(finalFormData?.loanType || formData.loanType || 'Personal').charAt(0).toUpperCase() + (finalFormData?.loanType || formData.loanType || '').slice(1)} Loan\n` +
    `Amount: ₹${Number(finalFormData?.loanAmount || formData.loanAmount || 0).toLocaleString('en-IN')}\n` +
    `Tenure: ${finalFormData?.tenure || formData.tenure || 'N/A'} months\n\n` +
    `Please verify and process this application.\n` +
    `Thank you!`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    background: '#25D366',
    color: 'white',
    padding: '18px 50px',
    borderRadius: '50px',
    fontSize: '18px',
    fontWeight: '700',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '14px',
    boxShadow: '0 10px 30px rgba(37,211,102,0.4)',
    transition: 'all 0.3s ease',
    width: '100%',
    maxWidth: '340px',
    justifyContent: 'center',
    margin: '0 auto'
  }}
>
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.488"/>
  </svg>
  Send Details on WhatsApp
</a>
</div>
  </div>
</div>
        );
      default:
        return null;
    }
  };

  return (
    <>


    <SEO />
     
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