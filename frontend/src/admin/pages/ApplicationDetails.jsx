// src/admin/pages/ApplicationDetail.jsx → FULLY EDITABLE VERSION (Client Approved)

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Download, X, CheckCircle, User, Phone, FileText, Eye, Clipboard, Edit2, Save, AlertCircle } from 'lucide-react';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import { Download } from 'lucide-react';
import toast from 'react-hot-toast';
import '../styles/ApplicationDetails.css';

const docLabels = { /* same as before */ };

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const pdfRef = useRef();

  useEffect(() => {
    loadApplication();
  }, [id]);

  const loadApplication = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`http://localhost:5000/api/admin/loans/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
      setEditedData(res.data);           // ← for editing
      setStatus(res.data.status || 'Pending');
      setNotes(res.data.adminNotes || '');
    } catch (err) {
      toast.error('Application not found');
    } finally {
      setLoading(false);
    }
  };

  const handleUserDocUpload = async (e, type) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('userDoc', file);
  formData.append('type', type);

  try {
    const token = localStorage.getItem('adminToken');
    await axios.post(`http://localhost:5000/api/admin/loans/${id}/upload-user-doc`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.success(`${type.replace('_', ' ')} uploaded!`);
    loadApplication();
  } catch (err) {
    toast.error('Upload failed');
  }
};


  const saveAllChanges = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5000/api/admin/loans/${id}`, 
        { 
          ...editedData, 
          status, 
          adminNotes: notes 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success('All changes saved successfully!', { icon: 'Rocket', duration: 5000 });
      setEditMode(false);
      loadApplication(); // refresh
    } catch (err) {
      toast.error('Save failed. Try again.');
    }
  };

 const generatePDF = () => {
  if (!data) {
    toast.error("Data not loaded yet!");
    return;
  }

  const input = pdfRef.current;
  toast.loading("Generating PDF... Please wait a moment", { duration: 10000 });

  // Thoda delay de images load hone ke liye
  setTimeout(() => {
    html2canvas(input, {
      scale: 2,
      useCORS: true,
      allowTaint: true,  // ← YE ADD KAR DE (important for external images)
      backgroundColor: '#ffffff',
      logging: false,
      width: input.scrollWidth,
      height: input.scrollHeight + 500, // extra space
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const shortId = id.slice(-8).toUpperCase();
      pdf.save(`AadharCapital_Application_${shortId}.pdf`);
      toast.dismiss();
      toast.success("PDF downloaded successfully with all details!");
    }).catch((err) => {
      console.error("PDF Error:", err);
      toast.dismiss();
      toast.error("Failed to generate PDF. Try again!");
    });
  }, 500); // 500ms delay for images to load
};
  

  if (loading) return <div className="loading">Loading...</div>;
  if (!data) return <div>Application not found</div>;

  return (
    <div className="application-detail-container">

      {/* Header with Edit Button */}
      <div className="header-bar">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} /> Back
        </button>

        <div className="app-header">
          <h1>
            Application ID: <span style={{ color: '#A3E635' }}>{id}</span>
            <button onClick={() => copyToClipboard(id)} className="copy-btn admin-copy">
              Copy Full ID
            </button>
          </h1>
          <p style={{ color: '#A3E635' }}>
            Submitted: {new Date(data.createdAt).toLocaleString('en-IN')}
          </p>
        </div>

        {/* Edit Toggle Button */}
       <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={generatePDF}
            className="save-button"
            style={{ background: '#40513B', color: 'white', padding: '12px 24px', borderRadius: '8px' }}
          >
            <Download size={20} /> Download PDF
          </button>

          <button 
            onClick={() => setEditMode(!editMode)} 
            className={`save-button ${editMode ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
            style={{ padding: '12px 24px' }}
          >
            {editMode ? <><X size={20} /> Cancel</> : <><Edit2 size={20} /> Edit Details</>}
          </button>
        </div>
    {/* </div> */}
      </div>


      

      

      {/* Personal Info - Editable */}
      <div className="info-section">
        <h2><User size={24} /> Personal Details {editMode && <Edit2 size={18} className="inline ml-2 text-blue-600" />}</h2>
        <div className="info-grid">
          {[
            ['Full Name', 'fullName'],
            ['Father\'s Name', 'fatherName'],
            ['Phone', 'phone'],
            ['Email', 'email'],
            ['Gender', 'gender'],
            ['DOB', 'dob'],
            ['Marital Status', 'maritalStatus'],
            ['Permanent Address', 'permanentAddress'],
          ].map(([label, key]) => (
            <div key={key} className={key.includes('Address') ? 'full' : ''}>
              <strong>{label}:</strong>{' '}
              {editMode ? (
                <input
                  type={key === 'dob' ? 'date' : 'text'}
                  value={editedData[key] || ''}
                  onChange={(e) => setEditedData({...editedData, [key]: e.target.value})}
                  className="edit-input"
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '2px solid #3b82f6', marginTop: '6px' }}
                />
              ) : (
                <span>
                  {key === 'dob' && editedData[key] ? new Date(editedData[key]).toLocaleDateString('en-IN') : editedData[key] || '—'}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Loan & Bank Details - Editable */}
      <div className="info-section">
        <h2>Loan & Bank Details {editMode && <Edit2 size={18} className="inline ml-2 text-blue-600" />}</h2>
        <div className="info-grid">
          {[
            ['Loan Type', 'loanType'],
            ['Loan Amount', 'loanAmount'],
            ['Tenure (months)', 'tenure'],
            ['Monthly Income', 'monthlyIncome'],
            ['Aadhaar Number', 'aadhaarNumber'],
            ['PAN Number', 'panNumber'],
            ['Bank Name', 'bankName'],
            ['Account Number', 'accountNumber'],
            ['IFSC Code', 'ifscCode'],
          ].map(([label, key]) => (
            <div key={key}>
              <strong>{label}:</strong>{' '}
              {editMode ? (
                <input
                  type="text"
                  value={editedData[key] || ''}
                  onChange={(e) => setEditedData({...editedData, [key]: e.target.value})}
                  className="edit-input"
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '2px solid #3b82f6', marginTop: '6px' }}
                />
              ) : (
                <span>
                  {key.includes('Amount') || key.includes('Income') ? `₹${Number(editedData[key]).toLocaleString('en-IN')}` : editedData[key] || '—'}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Documents Section - Same as before */}
      {/* ... tera documents wala code same rahega ... */}

      {/* DOCUMENTS SECTION – NOW 100% WORKING */}
<div className="documents-section">
<h2><FileText size={24} /> Uploaded Documents</h2>
<div className="documents-grid">
{Object.entries(data.documents || {}).map(([key, url]) => {
if (!url) return null;
const isPdf = url.toLowerCase().includes('.pdf');
const label = docLabels[key] || key;

return (
<div key={key} className="document-card">
<div className="doc-preview" onClick={() => setSelectedImage({ url, name: label })}>
{isPdf ? (
<div className="pdf-icon">
<FileText size={60} />
<span>PDF</span>
</div>
) : (
<img
src={url}
alt={label}
onError={(e) => {
e.target.src = "https://via.placeholder.com/300x400/eee/999?text=Image+Not+Found";
}}
/>
)}
</div>
<div className="doc-label">
<p>{label}</p>
<div className="doc-actions">
<a href={url} target="_blank" rel="noopener noreferrer" className="view-link">
<Eye size={18} /> View
</a>
<a href={url} download className="download-link">
<Download size={18} /> Download
</a>
</div>
</div>
</div>
);
})}
</div>
</div>


      {/* Admin Actions - Status + Notes + Save All */}
      <div className="admin-section">
        <h2>Admin Actions</h2>
        <div className="admin-controls">
          <div>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Pending</option>
              <option>Under Review</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="full">
            <label>Admin Notes / Rejection Reason</label>
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              placeholder="Write notes..."
            />
          </div>

          {editMode && (
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button onClick={saveAllChanges} className="save-button">
                <Save size={20} /> Save All Changes
              </button>
              <button onClick={() => { setEditMode(false); loadApplication(); }} className="btn-danger">
                <X size={20} /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Documents to Show User - No Upload, Just Toggle */}
<div className="info-section">
  <h2><FileText size={24} /> Documents for User (Auto Generated)</h2>
  <div className="info-grid">
    {[
      { key: 'noc', label: 'No Objection Certificate (NOC)' },
      { key: 'sanctionLetter', label: 'Sanction Letter' },
      { key: 'agreement', label: 'Loan Agreement' },
      { key: 'repaymentSchedule', label: 'Repayment Schedule' },
    ].map(({ key, label }) => (
      <div key={key} className="full" style={{ marginBottom: '15px' }}>
        <strong>{label}</strong>
        <button
          onClick={async () => {
            const token = localStorage.getItem('adminToken');
            await axios.put(`http://localhost:5000/api/admin/loans/${id}/toggle-doc`, 
              { docType: key, visible: !data.userVisibleDocs?.[key] },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`${label} visibility updated`);
            loadApplication();
          }}
          className={`save-button ml-4 ${data.userVisibleDocs?.[key] ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {data.userVisibleDocs?.[key] ? 'Hide from User' : 'Show to User'}
        </button>
        {data.userVisibleDocs?.[key] && <span style={{ color: '#22c55e', marginLeft: '10px' }}>✓ Visible to User</span>}
      </div>
    ))}
  </div>
</div>



      {/* YE HIDDEN PREMIUM PDF TEMPLATE — SIRF DOWNLOAD KE LIYE */}
      <div style={{ 
  position: 'fixed', 
  top: 0, 
  left: 0, 
  width: '210mm', 
  opacity: 0, 
  pointerEvents: 'none', 
  zIndex: -1,
  overflow: 'hidden'
}}>
        <div
          ref={pdfRef}
          style={{
            padding: '50px 40px',
            background: 'white',
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            color: '#333',
            lineHeight: '1.7',
            border: '14px solid #40513B',
            borderTop: '24px solid #40513B',
            position: 'relative',
            minHeight: '297mm',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          }}
        >
          {/* Top Gradient */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '14px', background: 'linear-gradient(90deg, #40513B, #609966, #9DC08B)' }} />

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '35px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#40513B', margin: '0 0 10px', letterSpacing: '2px' }}>
              AADHAR CAPITAL FINANCE
            </h1>
            <p style={{ fontSize: '16px', color: '#555', margin: '8px 0' }}>
              RBI Registered NBFC • Instant Personal & Business Loans
            </p>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #f0f8f0, #e8f5e8)',
              padding: '18px 40px',
              borderRadius: '50px',
              border: '4px solid #9DC08B',
              margin: '25px 0',
              fontSize: '20px',
              fontWeight: '900',
              color: '#40513B',
              boxShadow: '0 12px 35px rgba(157,192,139,0.4)',
            }}>
              Application ID: <span style={{ fontSize: '32px', color: '#40513B' }}>{id}</span>
            </div>
            <p style={{ color: '#666', fontSize: '16px', marginTop: '10px' }}>
              Submitted on: {data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Loading...'}
            </p>
          </div>

          <hr style={{ border: '3px solid #9DC08B', margin: '40px 0', borderRadius: '5px' }} />

          <h2 style={{ textAlign: 'center', color: '#40513B', fontSize: '30px', fontWeight: '900', marginBottom: '35px' }}>
            Loan Application Details
          </h2>

          {/* Premium Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8fbf6', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(64,81,59,0.15)', marginBottom: '40px' }}>
            <tbody>
              {[
                ['Full Name', data.fullName || '—'],
                ['Father\'s Name', data.fatherName || 'Not Provided'],
                ['Phone Number', data.phone || '—'],
                ['Email', data.email || 'Not Provided'],
                ['Gender', data.gender ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : '—'],
                ['Date of Birth', data.dob ? new Date(data.dob).toLocaleDateString('en-IN') : '—'],
                ['Marital Status', data.maritalStatus ? data.maritalStatus.charAt(0).toUpperCase() + data.maritalStatus.slice(1) : '—'],
                ['Permanent Address', data.permanentAddress || '—'],
                ['Aadhaar Number', data.aadhaarNumber || '—'],
                ['PAN Number', data.panNumber || '—'],
                ['Loan Type', data.loanType ? (data.loanType.charAt(0).toUpperCase() + data.loanType.slice(1) + ' Loan') : '—'],
                ['Loan Amount', data.loanAmount ? `₹${Number(data.loanAmount).toLocaleString('en-IN')}` : '—'],
                ['Tenure', data.tenure ? `${data.tenure} months` : '—'],
                ['Monthly Income', data.monthlyIncome ? `₹${Number(data.monthlyIncome).toLocaleString('en-IN')}` : '—'],
                ['Bank Name', data.bankName || '—'],
                ['Account Number', data.accountNumber || '—'],
                ['IFSC Code', data.ifscCode || '—'],
              ].map(([label, value], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fbf6' }}>
                  <td style={{ padding: '18px 25px', fontWeight: '700', color: '#40513B', width: '45%', fontSize: '16px', borderBottom: '1px solid #e2e8d8' }}>
                    {label}
                  </td>
                  <td style={{ padding: '18px 25px', fontWeight: '600', color: '#222', fontSize: '16px', borderBottom: '1px solid #e2e8d8' }}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Uploaded Documents Thumbnails */}
          <div style={{ margin: '50px 0' }}>
            <h3 style={{ color: '#40513B', fontSize: '26px', fontWeight: '900', marginBottom: '20px', paddingBottom: '12px', borderBottom: '5px solid #9DC08B', display: 'inline-block' }}>
              Uploaded Documents
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', padding: '25px', background: '#f0f8f0', borderRadius: '20px', border: '3px dashed #9DC08B' }}>
              {Object.entries(data.documents || {}).map(([key, url]) => {
                if (!url) return null;
                const labels = {
                  aadhaarFront: 'Aadhaar Front', aadhaarBack: 'Aadhaar Back', panCard: 'PAN Card',
                  photo: 'Photograph', signature: 'Signature', passbook: 'Bank Passbook',
                  salarySlip: 'Salary Slip', itr: 'ITR', addressProof: 'Address Proof'
                };
                const label = labels[key] || key;
                const isPdf = url.toLowerCase().includes('.pdf');

                return (
                  <div key={key} style={{ background: 'white', padding: '18px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 8px 25px rgba(64,81,59,0.12)', border: '2px solid #9DC08B' }}>
                    <div style={{ marginBottom: '12px', fontSize: '28px', color: '#9DC08B' }}>Check</div>
                    <p style={{ fontWeight: '700', color: '#40513B', margin: '8px 0' }}>{label}</p>
                    {isPdf ? (
                      <div style={{ width: '100%', height: '120px', background: '#fee', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', color: '#c33', fontWeight: 'bold' }}>
                        PDF Document
                      </div>
                    ) : (
                      <img src={url} alt={label} style={{ width: '100%', maxWidth: '200px', height: '120px', objectFit: 'cover', borderRadius: '12px', marginTop: '10px', border: '2px solid #9DC08B' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: '70px', padding: '35px', background: 'linear-gradient(135deg, #40513B 0%, #609966 100%)', color: 'white', borderRadius: '24px', textAlign: 'center', boxShadow: '0 15px 40px rgba(64,81,59,0.3)' }}>
            <h3 style={{ margin: '0 0 15px', fontSize: '28px', fontWeight: '900' }}>Thank You for Choosing Aadhar Capital</h3>
            <p style={{ margin: '12px 0', fontSize: '20px', fontWeight: '700' }}>Your application is under review.</p>
            <p style={{ margin: '15px 0', fontSize: '18px' }}>Call: <strong>1800-123-4567</strong></p>
            <p style={{ margin: '10px 0 0', fontSize: '14px', opacity: '0.9' }}>This is a system-generated document • No signature required</p>
          </div>
        </div>
      </div>

    </div> 

  );
};

export default ApplicationDetails;