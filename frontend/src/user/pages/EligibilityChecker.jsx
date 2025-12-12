// src/user/pages/EligibilityChecker.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  IndianRupee, Calendar, Briefcase, Home, Shield, 
  CheckCircle, XCircle, Phone, ArrowRight, Upload, 
  MessageCircle, Download, Smartphone, Info, ChevronDown
} from 'lucide-react';
import './EligibilityChecker.css';
import { Helmet } from 'react-helmet-async';

const EligibilityChecker = () => {
  const [step, setStep] = useState(1);
  const [cibilScore, setCibilScore] = useState(720);
  const [isCheckingCibil, setIsCheckingCibil] = useState(false);
  const [showCibilInfo, setShowCibilInfo] = useState(false);

  const [form, setForm] = useState({
    loanType: 'personal',
    monthlyIncome: 45000,
    age: 32,
    existingEmi: 5000,
  });

  const [documents, setDocuments] = useState({
    pan: null, aadhaar: null, salarySlip: null
  });

  const [result, setResult] = useState(null);

  // Simulate CIBIL check
  useEffect(() => {
    setIsCheckingCibil(true);
    setTimeout(() => {
      setCibilScore(712 + Math.floor(Math.random() * 138));
      setIsCheckingCibil(false);
    }, 2800);
  }, []);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFile = (type, file) => {
    setDocuments(prev => ({ ...prev, [type]: file }));
  };

  const checkEligibility = () => {
    const { monthlyIncome, age, existingEmi } = form;
    let eligible = true;
    let maxAmount = 0;
    let message = '';

    if (age < 21 || age > 58) {
      eligible = false; message = "Age must be 21–58 years";
    } else if (monthlyIncome < 25000) {
      eligible = false; message = "Minimum ₹25,000 monthly income required";
    } else if (cibilScore < 650) {
      eligible = false; message = "CIBIL score below 650";
    } else if (existingEmi > monthlyIncome * 0.5) {
      eligible = false; message = "Existing EMI too high";
    } else {
      const multiplier = cibilScore > 750 ? 28 : cibilScore > 700 ? 22 : 16;
      maxAmount = Math.min(monthlyIncome * multiplier, 7500000);
      message = "Congratulations! You're pre-approved";
    }

    setResult({ eligible, maxAmount, rate: cibilScore > 750 ? "7.99%" : "8.99%-11.5%", message });
    setStep(eligible ? 2 : 4);
  };

  const format = (n) => n.toLocaleString('en-IN');

  const shareViaSMS = () => {
    const text = `I just got pre-approved for ₹${format(result.maxAmount)} at Aadhar Capital! Rate from ${result.rate} p.a.`;
    window.location.href = `sms:?body=${encodeURIComponent(text)}`;
  };




   // ---------- SEO Structured Data ----------
  const SEO = () => (
    <>
      <Helmet>
        <title>Check Loan Eligibility Online - Instant Approval | Aadhar Capital</title>
        <meta name="description" content="Check your personal, business, home, or gold loan eligibility instantly. Get pre-approved in 30 seconds with Aadhar Capital Finance." />
        <link rel="canonical" href="https://www.aadharcapitalfinance.com/eligibility-checker" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialProduct",
            "name": "Loan Eligibility Checker",
            "description": "Check personal, business, home, or gold loan eligibility instantly with Aadhar Capital Finance.",
            "url": "https://www.aadharcapitalfinance.com/eligibility-checker",
            "brand": {
              "@type": "Organization",
              "name": "Aadhar Capital Finance",
              "url": "https://www.aadharcapitalfinance.com"
            },
            "applicationCategory": "Loan",
            "provider": {
              "@type": "FinancialService",
              "name": "Aadhar Capital Finance"
            }
          })}
        </script>
        {/* FAQ Structured Data for SEO Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How is my CIBIL score calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Your CIBIL score is calculated based on payment history (35%), credit utilization (30%), credit history length (15%), credit mix (10%), and new applications (10%)."
                }
              },
              {
                "@type": "Question",
                "name": "What is the minimum salary for loan eligibility?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A minimum monthly income of ₹25,000 is required to check eligibility."
                }
              },
              {
                "@type": "Question",
                "name": "How quickly can I get the approved loan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can get pre-approved instantly and receive funds in your bank within 4 hours after submitting required documents."
                }
              }
            ]
          })}
        </script>
      </Helmet>
    </>
  );

  return (
    <>


   <SEO />
   
      <Navbar />

      {/* Hero */}
      {/* <section className="eligibility-hero">
        <div className="container">
          <motion.div className="hero-content" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span className="tag">30 Seconds • 100% Free</span>
            <h1>Check Loan Eligibility</h1>
            <p>Instant pre-approval • Personal • Business • Home • Gold Loans</p>
          </motion.div>
        </div>
      </section> */}

     <section className="eligibility-hero">
  {/* Background Image */}
  <div className="hero-bg-image" style={{
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url("https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg")',  // ← TERA IMAGE PATH
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0
  }} />

  {/* Light Green Overlay */}
  <div className="hero-overlay" style={{
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(64,81,59,0.38), rgba(96,153,102,0.32))',
    zIndex: 1
  }} />

  <div className="container">
    <motion.div 
      className="hero-content" 
      initial={{ y: 30, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}
    >
      <span className="tag">30 Seconds • 100% Free</span>
      <h1>Check Loan Eligibility</h1>
      <p>Instant pre-approval • Personal • Business • Home • Gold Loans</p>
    </motion.div>
  </div>
</section>


      <section className="eligibility-section">
        <div className="container">
          <motion.div className="eligibility-card">
            {step === 1 && (
              <>
                <h2>Let's check your eligibility</h2>

                {/* CIBIL Score with Learn More */}
                <div className="cibil-box">
                  <div className="cibil-header">
                    <Shield size={24} />
                    <span>Your CIBIL Score</span>
                    <button 
                      className="info-btn"
                      onClick={() => setShowCibilInfo(!showCibilInfo)}
                    >
                      <Info size={18} /> How is CIBIL calculated?
                      <ChevronDown size={18} className={showCibilInfo ? 'rotated' : ''} />
                    </button>
                  </div>

                  {isCheckingCibil ? (
                    <div className="cibil-loading">
                      <div className="spinner" />
                      <p>Fetching your score securely...</p>
                    </div>
                  ) : (
                    <div className="cibil-score">
                      <span className={`score ${cibilScore >= 750 ? 'excellent' : cibilScore >= 700 ? 'good' : 'fair'}`}>
                        {cibilScore}
                      </span>
                      <small>{cibilScore >= 750 ? 'Excellent' : cibilScore >= 700 ? 'Good' : cibilScore >= 650 ? 'Fair' : 'Needs Improvement'}</small>
                    </div>
                  )}

                  {/* CIBIL Education - Collapsible */}
                  {showCibilInfo && (
                    <motion.div 
                      className="cibil-education"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <h4>How CIBIL Score is Calculated</h4>
                      <div className="factors-grid">
                        <div className="factor">
                          <div className="weight">35%</div>
                          <strong>Payment History</strong>
                          <p>Paying EMIs & credit card bills on time</p>
                        </div>
                        <div className="factor">
                          <div className="weight">30%</div>
                          <strong>Credit Utilization</strong>
                          <p>Keep card usage below 30% of limit</p>
                        </div>
                        <div className="factor">
                          <div className="weight">15%</div>
                          <strong>Credit History Length</strong>
                          <p>Longer history = better score</p>
                        </div>
                        <div className="factor">
                          <div className="weight">10%</div>
                          <strong>Credit Mix</strong>
                          <p>Having both secured & unsecured loans</p>
                        </div>
                        <div className="factor">
                          <div className="weight">10%</div>
                          <strong>New Applications</strong>
                          <p>Too many inquiries lower your score</p>
                        </div>
                      </div>
                      <div className="score-ranges">
                        <div><span className="excellent">750+</span> Excellent → Lowest rates</div>
                        <div><span className="good">700–749</span> Good</div>
                        <div><span className="fair">650–699</span> Fair → Higher rates</div>
                        <div><span className="poor">&lt;650</span> Needs improvement</div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Rest of inputs */}
                <div className="input-group">
                  <label>Loan Type</label>
                  <div className="loan-options">
                    {['personal', 'business', 'home', 'gold'].map(type => (
                      <button key={type} className={form.loanType === type ? 'active' : ''} onClick={() => handleChange('loanType', type)}>
                        {type.charAt(0).toUpperCase() + type.slice(1)} Loan
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-group">
                  <label><IndianRupee size={20} /> Monthly Income</label>
                  <input type="range" min="25000" max="500000" step="5000" value={form.monthlyIncome} onChange={e => handleChange('monthlyIncome', +e.target.value)} />
                  <div className="big-value">₹{format(form.monthlyIncome)}</div>
                </div>

                <div className="input-group">
                  <label><Calendar size={20} /> Age</label>
                  <input type="range" min="21" max="58" value={form.age} onChange={e => handleChange('age', +e.target.value)} />
                  <div className="big-value">{form.age} years</div>
                </div>

                <div className="input-group">
                  <label>Current Monthly EMI (if any)</label>
                  <input type="number" placeholder="0" value={form.existingEmi} onChange={e => handleChange('existingEmi', +e.target.value || 0)} />
                </div>

                <button className="btn-primary full-width large" onClick={checkEligibility}>
                  Check Eligibility Now <ArrowRight size={22} />
                </button>
              </>
            )}

            {/* Step 2: Document Upload */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CheckCircle size={70} className="success-icon" />
                <h2>Pre-Approved!</h2>
                <p>Upload documents to get money in 2 hours</p>

                <div className="upload-grid">
                  {['PAN Card', 'Aadhaar Card', '3 Months Salary Slip'].map((label, i) => (
                    <label key={i} className="upload-box">
                      <input type="file" accept="image/*,.pdf" onChange={e => handleFile(label, e.target.files[0])} />
                      <Upload size={32} />
                      <span>{documents[label]?.name || label}</span>
                      {documents[label] && <CheckCircle size={20} className="uploaded" />}
                    </label>
                  ))}
                </div>

                <div className="action-buttons">
                  <button className="btn-primary full-width">Submit Documents</button>
                  <button className="btn-outline full-width" onClick={() => setStep(3)}>Skip & View Offer</button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Final Result */}
            {step === 3 && result?.eligible && (
              <motion.div className="result-screen" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                <CheckCircle size={90} className="success-icon" />
                <h2>₹{format(result.maxAmount)} Pre-Approved!</h2>
                <p>Get money in your bank within 4 hours</p>

                <div className="result-card">
                  <div className="highlight">
                    <span>Approved Amount</span>
                    <div className="huge-amount">₹{format(result.maxAmount)}</div>
                  </div>
                  <div className="details-grid">
                    <div><span>Interest Rate</span><strong>{result.rate} p.a.</strong></div>
                    <div><span>Tenure</span><strong>Upto 84 months</strong></div>
                  </div>
                </div>

                <div className="action-buttons">
                  <a href={`https://wa.me/919876543210?text=Hi! I'm pre-approved for ₹${format(result.maxAmount)}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp full-width">
                    Apply via WhatsApp
                  </a>
                  <button className="btn-primary full-width">Apply Online Now</button>
                  <button onClick={shareViaSMS} className="btn-outline full-width">
                    <Smartphone size={20} /> Share via SMS
                  </button>
                  <button className="btn-download full-width" onClick={() => {
                    const blob = new Blob([`AADHAR CAPITAL PRE-APPROVAL\nAmount: ₹${format(result.maxAmount)}\nRate: ${result.rate} p.a.\nValid 7 days`], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url; a.download = `AadharCapital_Offer_${format(result.maxAmount)}.txt`;
                    a.click();
                  }}>
                    <Download size={20} /> Download Offer
                  </button>
                </div>
              </motion.div>
            )}

            {/* Not Eligible */}
            {step === 4 && !result.eligible && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <XCircle size={80} className="reject-icon" />
                <h2>Not Eligible Right Now</h2>
                <p>{result.message}</p>
                <button className="btn-outline full-width">
                  <Phone size={20} /> Talk to Loan Expert
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Trust Bar */}
          <div className="trust-bar">
            <div><Shield size={20} /> RBI Registered NBFC</div>
            <div><CheckCircle size={20} /> 100% Safe & Secure</div>
            <div><MessageCircle size={20} /> 50,000+ Happy Customers</div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default EligibilityChecker;