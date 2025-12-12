// src/user/pages/Documents.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Download, Phone, Shield } from 'lucide-react';
import './Documents.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Documents = () => {
  const navigate = useNavigate();

  // === Advanced SEO Structured Data ===
 // === Enhanced FAQ Schema (Added 3 more high-search-volume questions) ===
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What documents are required to apply for a personal loan with Aadhaar?",
        "acceptedAnswer": { "@type": "Answer", "text": "Primary ID (Aadhaar/PAN), address proof (utility bill / driving licence), recent passport-size photograph, and income proof (salary slips or bank statements). Actual requirements may vary by lender." }
      },
      {
        "@type": "Question",
        "name": "Can I get a loan with only an Aadhaar card?",
        "acceptedAnswer": { "@type": "Answer", "text": "Some lenders accept Aadhaar for identity verification but most also require PAN and income proof. Aadhar alone is rarely sufficient for disbursal." }
      },
      {
        "@type": "Question",
        "name": "How long does document verification take?",
        "acceptedAnswer": { "@type": "Answer", "text": "Document verification typically takes from a few minutes (for digital KYC) up to 48 hours for manual verification, depending on the lender and completeness of documents." }
      },
      // New high-value FAQs
      {
        "@type": "Question",
        "name": "How to get 10000 loan on Aadhaar card instantly?",
        "acceptedAnswer": { "@type": "Answer", "text": "Apply through our paperless process. Upload Aadhaar, PAN, and bank statement. Eligible applicants can get approval in minutes and funds in 24 hours." }
      },
      {
        "@type": "Question",
        "name": "Is PAN card mandatory for Aadhaar based loan?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, PAN is mandatory for loans above ₹50,000 as per RBI guidelines for KYC and tax reporting." }
      },
      {
        "@type": "Question",
        "name": "What if my Aadhaar is linked to mobile for eKYC?",
        "acceptedAnswer": { "@type": "Answer", "text": "If linked, you can complete paperless digital KYC instantly via OTP without physical documents." }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.aadharcapitalfinance.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Documents",
        "item": "https://www.aadharcapitalfinance.com/documents-required"
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aadhar Capital Finance",
    "url": "https://www.aadharcapitalfinance.com",
    "logo": "https://www.aadharcapitalfinance.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/yourpage",
      "https://www.linkedin.com/company/yourcompany"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX",
        "contactType": "customer support",
        "areaServed": "IN",
        "availableLanguage": ["English","Hindi"]
      }
    ]
  };

  // === Page content arrays (unchanged) ===
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
      <Helmet>
       <title>Documents Required for Loan on Aadhaar Card | Instant Personal Loan Checklist 2025</title>
        <meta name="description" content="Complete list of documents required for instant personal loan on Aadhaar card. Minimal KYC, paperless process. Get ₹10,000 to ₹20 Lakh with quick approval." />
        <meta name="keywords" content="documents required for loan on aadhar card, aadhar card loan documents, instant loan documents, personal loan kyc documents, 10000 loan on aadhar card" />
        <link rel="canonical" href="https://www.aadharcapitalfinance.com/documents-required" />
        <meta name="robots" content="index,follow" />

        {/* Open Graph (Facebook/LinkedIn) */}
        <meta property="og:title" content="Documents Required for Aadhar Card Loan | Instant Approval" />
        <meta property="og:description" content="Complete list of KYC and ID documents required to apply for an instant personal loan using Aadhaar card." />
        <meta property="og:url" content="https://www.aadharcapitalfinance.com/documents-required" />
        <meta property="og:type" content="website" />
        {/* Replace this image URL with your hosted OG image (1200x630 recommended) */}
        <meta property="og:image" content="https://www.aadharcapitalfinance.com/og-documents.jpg" />
        <meta property="og:image:alt" content="Documents required for Aadhaar based loan" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Documents Required for Aadhar Card Loan" />
        <meta name="twitter:description" content="Check the required KYC documents for instant loans. Quick approval with minimal paperwork." />
        <meta name="twitter:image" content="https://www.aadharcapitalfinance.com/og-documents.jpg" />

        {/* Structured Data injected for Google */}
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hidden img tag to provide alt text for background image (SEO + accessibility) */}
      {/* If you prefer not to show, keep display: none; but alt helps indexing */}
      <img
        src="https://images.pexels.com/photos/8292883/pexels-photo-8292883.jpeg"
        alt="Documents required for personal loan - Aadhaar, PAN and income proof"
        style={{ display: 'none' }}
        width="1200"
        height="630"
      />

      {/* Hero */}
      <section className="docs-hero" aria-label="Documents and Eligibility">
        <div className="hero-bg-image" style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.pexels.com/photos/8292883/pexels-photo-8292883.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }} />

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
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Eligibility Criteria
          </motion.h2>
          <div className="eligibility-grid">
            {eligibility.map((item, i) => (
              <motion.div key={i} className="eligibility-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Loan Terms & Conditions
          </motion.h2>
          <div className="terms-table">
            <div className="table-header">
              <span>Parameter</span>
              <span>Details</span>
            </div>
            {loanTerms.map((term, i) => (
              <motion.div key={i} className="table-row" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
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
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Required Documents
          </motion.h2>
          <div className="docs-grid">
            {docs.map((doc, i) => (
              <motion.div key={i} className="doc-category" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
          <motion.div className="cta-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2>Ready to Apply?</h2>
            <p>All documents can be uploaded digitally. Get started in 5 minutes.</p>
            <div className="cta-buttons">
              <button onClick={() => navigate("/apply")} className="btn-primary">Apply Now</button>
              <button className="btn-outline"><Phone size={20} /> Call Expert</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grievance / Regulatory */}
      <section className="grievance-section">
        <div className="container">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <AlertCircle size={24} style={{ flexShrink: 0, marginTop: '2px', marginRight: '3px' }} />
            Important Regulatory Disclosure
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Aadhar Capital Finance adheres to the Fair Practices Code as prescribed by the Reserve Bank of India (RBI). We are a private financial consultancy partnering with RBI-registered NBFCs to facilitate loans. <strong>Note:</strong> We are not affiliated with UIDAI. The term "Aadhar" is used for descriptive purposes regarding identity documentation required for KYC compliance. All loans are disbursed by partner NBFCs/Banks at their sole discretion.
          </motion.p>

          <address style={{ marginTop: '15px', fontStyle: 'normal', color: '#555' }}>
            <strong>Corporate Office:</strong> 76, Defence Colony, Delhi Road, Hisar, Haryana - 125001
          </address>
        </div>
      </section>


      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script> 
    </>
  );
};

export default Documents;
