// src/user/pages/Documents.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Phone, Shield } from 'lucide-react';
import './Documents.css';
import { useNavigate } from 'react-router-dom';

const Documents = () => {

   const navigate = useNavigate();
  const eligibility = [
    { title: 'Age Criteria', desc: 'Minimum 21 years, Maximum 60 years. Valid ID proof required.' },
    { title: 'Income Criteria', desc: 'Salaried: ₹15,000+ monthly; Self-Employed: ₹2.5L+ annually. Income proof documents.' },
    { title: 'Employment Stability', desc: 'Salaried: 2 years experience, minimum 1 year in current job; Business: 3 years operation.' }
  ];

  const loanTerms = [
    { label: 'Loan Amount', value: '₹50,000 – ₹20 Lakh' },
    { label: 'Interest Rate', value: '7.99% - 12% p.a.' },
    { label: 'Tenure', value: '12 - 120 Months' },
    { label: 'Processing Fee', value: '2% of Loan Amount + GST' }
  ];

  const docs = [
    { category: 'Identity Proof', items: ['Aadhaar Card', 'PAN Card', 'Passport'] },
    { category: 'Address Proof', items: ['Electricity Bill', 'Ration Card', 'Driving License'] },
    { category: 'Additional Documents', items: ['Passport-Size Photographs', 'Age Proof Certificate', 'Educational Certificates'] }
  ];

  return (
    <>
     

      {/* Hero */}
      {/* <section className="docs-hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Documents & Eligibility Criteria</h1>
            <p>Get approved fast with minimal paperwork. Check what you need for Personal, Business, Home & Gold Loans.</p>
          </motion.div>
        </div>
      </section> */}

      <section className="docs-hero">
  {/* Background Image */}
  <div className="hero-bg-image" style={{
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url("https://images.pexels.com/photos/8292883/pexels-photo-8292883.jpeg")',  // ← TERA IMAGE PATH
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0
  }} />

  {/* Light Green Overlay — Image clear dikhega */}
  <div className="hero-overlay" style={{
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(64,81,59,0.38), rgba(96,153,102,0.32))',
    zIndex: 1
  }} />

  <div className="container">
    <motion.div 
      className="hero-content"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}
    >
      <h1>Documents & Eligibility Criteria</h1>
      <p>Get approved fast with minimal paperwork. Check what you need for Personal, Business, Home & Gold Loans.</p>
    </motion.div>
  </div>
</section>


      {/* Eligibility */}
      <section className="eligibility-section">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Eligibility Criteria
          </motion.h2>
          <div className="eligibility-grid">
            {eligibility.map((item, i) => (
              <motion.div 
                key={i}
                className="eligibility-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <CheckCircle size={32} />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Terms */}
      <section className="terms-section">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Loan Terms & Conditions
          </motion.h2>
          <div className="terms-table">
            <div className="table-header">
              <span>Parameter</span>
              <span>Details</span>
            </div>
            {loanTerms.map((term, i) => (
              <motion.div 
                key={i}
                className="table-row"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span>{term.label}</span>
                <strong>{term.value}</strong>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="documents-section">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Required Documents
          </motion.h2>
          <div className="docs-grid">
            {docs.map((doc, i) => (
              <motion.div 
                key={i}
                className="doc-category"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3>{doc.category}</h3>
                <ul>
                  {doc.items.map((item, j) => (
                    <li key={j}><CheckCircle size={16} /> {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="docs-cta">
        <div className="container">
          <motion.div 
            className="cta-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Apply?</h2>
            <p>All documents can be uploaded digitally. Get started in 5 minutes.</p>
            <div className="cta-buttons">
              <button
               onClick={() => navigate("/apply")}
                className="btn-primary">Apply Now</button>
              <button className="btn-outline"><Phone size={20} /> Call Expert</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grievance */}
      <section className="grievance-section">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Grievance Redressal
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Aadhar Capital is a financial services platform operated by AADHAR CAPITAL PRIVATE LIMITED, a Non-Banking Financial Company (NBFC) registered with the Reserve Bank of India (RBI), bearing Corporate Identity Number (CIN): U67190DL1995PTC071817. We strictly follow RBI regulations and uphold ethical lending practices to protect and empower our customers. In accordance with RBI directives, we have established a dedicated Grievance Redressal Mechanism that ensures fair, transparent, and time-bound resolution of complaints. If you have any issues, we encourage you to reach out. Our team is committed to addressing all concerns promptly, typically within 5 working days, as per RBI norms.
          </motion.p>
        </div>
      </section>

      
    </>
  );
};

export default Documents;