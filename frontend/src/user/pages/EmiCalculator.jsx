// src/user/pages/EmiCalculator.jsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IndianRupee, Percent, Calendar, Calculator, Shield, CheckCircle } from 'lucide-react';
import './EmiCalculator.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const EmiCalculator = () => {
  const [amount, setAmount] = useState(200000);
  const [rate, setRate] = useState(8.99);
  const [months, setMonths] = useState(36);
    const navigate = useNavigate();

  const { emi, interest, total } = useMemo(() => {
    const P = amount;
    const R = rate / 12 / 100;
    const N = months;

    if (!P || !N || R === 0) {
      const emiVal = P / N || 0;
      return { emi: Math.round(emiVal), interest: 0, total: P };
    }

    const emiVal = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalVal = emiVal * N;
    return {
      emi: Math.round(emiVal),
      interest: Math.round(totalVal - P),
      total: Math.round(totalVal)
    };
  }, [amount, rate, months]);

  const format = (n) => n.toLocaleString('en-IN');

  return (
    <>


    <Helmet>
  <title>Personal Loan EMI Calculator - Calculate Your Interest & Repayment</title>
  <meta name="description" content="Use our free Personal Loan EMI Calculator to check your monthly installments. Enter loan amount and tenure to get instant results." />
  <meta name="keywords" content="EMI calculator, personal loan calculator, loan interest calculator India" />
  <link rel="canonical" href="https://www.aadharcapitalfinance.com/emi-calculator" />
</Helmet>

      {/* Hero – Full Width, Bold & Clean */}
      {/* <section className="emi-hero-compact">
        <div className="container">
          <motion.div className="hero-inner" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span className="tag">RBI Registered NBFC</span>
            <h1>EMI Calculator</h1>
            <p>Instant, accurate & 100% free • Personal • Business • Home • Gold Loans</p>
          </motion.div>
        </div>
      </section>
 */}


{/* Hero – Full Width with Image Background */}
<section className="emi-hero-compact">
  {/* Background Image */}
  <div className="hero-bg-image" style={{
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url("https://images.pexels.com/photos/16827970/pexels-photo-16827970.jpeg")',  // ← TERA IMAGE PATH
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
      className="hero-inner" 
      initial={{ y: 30, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}
    >
      <span className="tag">RBI Registered NBFC</span>
      <h1>EMI Calculator</h1>
      <p>Instant, accurate & 100% free • Personal • Business • Home • Gold Loans</p>
    </motion.div>
  </div>
</section>


      {/* Main Calculator – One Clean Card */}
      <section className="emi-main-section">
        <div className="container">
          <motion.div 
            className="emi-card-master"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Top: Inputs */}
            <div className="emi-inputs-grid">
              <div className="input-box">
                <label><IndianRupee size={22} /> Loan Amount</label>
                <input type="range" min="50000" max="10000000" step="10000" value={amount} onChange={e => setAmount(+e.target.value)} />
                <div className="big-value">₹{format(amount)}</div>
              </div>

              <div className="input-box">
                <label><Percent size={22} /> Interest Rate (% p.a.)</label>
                <input type="range" min="7.99" max="24" step="0.01" value={rate} onChange={e => setRate(+e.target.value)} />
                <div className="big-value">{rate}%</div>
              </div>

              <div className="input-box">
                <label><Calendar size={22} /> Tenure</label>
                <input type="range" min="12" max="120" step="6" value={months} onChange={e => setMonths(+e.target.value)} />
                <div className="big-value">{months} months ({Math.floor(months/12)} yrs)</div>
              </div>
            </div>

            {/* Bottom: Results – Super Visible */}
            <div className="emi-results-master">
              <div className="emi-main-result">
                <span>Your Monthly EMI</span>
                <div className="emi-super">₹{format(emi)}</div>
              </div>

              <div className="emi-breakdown">
                <div>
                  <span>Principal</span>
                  <strong>₹{format(amount)}</strong>
                </div>
                <div>
                  <span>Total Interest</span>
                  <strong className="interest">₹{format(interest)}</strong>
                </div>
                <div className="total-row">
                  <span>Total Amount</span>
                  <strong>₹{format(total)}</strong>
                </div>
              </div>

              <button  onClick={() => navigate("/apply")} className="btn-primary full-width">Apply for Loan Now</button>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            className="trust-badges"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div><Shield size={20} /> RBI Registered NBFC</div>
            <div><CheckCircle size={20} /> 100% Secure & Private</div>
            <div><Calculator size={20} /> Used by 50,000+ customers</div>
          </motion.div>
        </div>
      </section>

      {/* --- SEO CONTENT SECTION START --- */}
      <section className="seo-content-section" style={{ padding: '4rem 0', background: '#f9f9f9' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#40513B', marginBottom: '1.5rem' }}>How to Use the Personal Loan EMI Calculator?</h2>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '1.5rem' }}>
            Planning your finances is the first step towards a stress-free loan experience. The 
            <strong> Aadhar Capital Finance EMI Calculator</strong> helps you estimate your monthly installments 
            before you apply. Simply enter your desired loan amount, the interest rate (starting from 11.99% p.a.), 
            and the tenure (1 to 5 years).
          </p>

          <h3 style={{ fontSize: '1.4rem', color: '#40513B', marginTop: '2rem', marginBottom: '1rem' }}>Factors Affecting Your Personal Loan EMI</h3>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: '#555' }}>
            <li><strong>Loan Amount (Principal):</strong> The total amount you borrow. Higher loans mean higher EMIs.</li>
            <li><strong>Interest Rate:</strong> Your rate depends on your CIBIL score and income. We offer rates as low as 11.99% for salaried employees.</li>
            <li><strong>Tenure:</strong> Choosing a longer tenure (e.g., 60 months) reduces your monthly EMI but increases the total interest payout.</li>
          </ul>

          <h3 style={{ fontSize: '1.4rem', color: '#40513B', marginTop: '2rem', marginBottom: '1rem' }}>Why Choose Aadhar Capital for Online Loans?</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            We provide instant personal loans up to ₹5 Lakhs with minimal documentation. Our process is 100% online 
            and requires only your <strong>Aadhar Card</strong> and <strong>PAN Card</strong> for KYC verification. 
            Use our calculator today to find a repayment plan that fits your monthly budget.
          </p>
        </div>
      </section>
      {/* --- SEO CONTENT SECTION END --- */}

    
    </>
  );
};

export default EmiCalculator;