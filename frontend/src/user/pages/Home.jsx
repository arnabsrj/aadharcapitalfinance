// src/user/pages/Home.jsx
import React, { useState, useMemo } from 'react';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import {
  User,
  Briefcase,
  Gem,
  Car,
  GraduationCap,
  Home as HomeIcon,
  Phone,
  Check,
  ArrowRight,
  ShieldCheck,
  Shield,
  CheckCircle,
  Calculator,
  Users,
  Clock,
  IndianRupee,
  TrainIcon,
  SearchIcon,
  Percent,
  Calendar,
  FileText,
  AlertCircle,
  Eye,
  Smartphone,
  BadgeCheck
} from 'lucide-react';


import './Home.css';

const Home = () => {
  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(100000);
  const [tenureMonths, setTenureMonths] = useState(24);
  const [interestRate, setInterestRate] = useState(8.99);
  const navigate = useNavigate();  // ← ADD THIS LINE

  // OPTIMIZED EMI CALCULATION WITH useMemo (no lag, 100% accurate)
  const { emi, totalInterest, totalPayback } = useMemo(() => {
    if (!loanAmount || !tenureMonths || interestRate <= 0) {
      return { emi: 0, totalInterest: 0, totalPayback: loanAmount || 0 };
    }

    const P = Number(loanAmount);
    const R = Number(interestRate) / 12 / 100;
    const N = Number(tenureMonths);

    if (R === 0) {
      const emi = P / N;
      return {
        emi: Math.round(emi),
        totalInterest: 0,
        totalPayback: Math.round(P),
      };
    }

    const power = Math.pow(1 + R, N);
    const emi = (P * R * power) / (power - 1);
    const totalPayback = emi * N;
    const totalInterest = totalPayback - P;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayback: Math.round(totalPayback),
    };
  }, [loanAmount, tenureMonths, interestRate]);

  // Indian Number Format (₹1,23,456)
  const formatIndian = (num) => {
    if (!num) return '0';
    return new Intl.NumberFormat('en-IN').format(Math.round(num));
  };

  const services = [
    { title: 'Personal Loans', desc: 'Flexible loans for weddings, travel, medical needs with quick approval.', icon: 'Credit Card' },
    { title: 'Business Loans', desc: 'Power growth with customized financing for every business stage.', icon: 'Building' },
    { title: 'Home Loans', desc: 'Affordable rates and flexible EMIs for your dream home.', icon: 'Home' },
    { title: 'Mortgage Loans', desc: 'Secure loans against property at competitive rates.', icon: 'Bank' },
    { title: 'Education Loans', desc: 'Cover tuition and study abroad with easy options.', icon: 'Graduation Cap' },
    { title: 'Car Loans', desc: 'Easy EMIs for your dream car with fast approvals.', icon: 'Car' },
    { title: 'Two-Wheeler Loans', desc: 'Quick financing for bikes & scooters, minimal docs.', icon: 'Motorcycle' },
    { title: 'Gold Loans', desc: 'Instant cash against gold at low interest rates.', icon: 'Coins' },
    { title: 'Small Business Loans', desc: 'Support for startups & MSMEs with easy repayments.', icon: 'Shopping Cart' },
    { title: 'Emergency Loans', desc: 'Quick aid for medical, travel, or unexpected needs.', icon: 'Ambulance' },
    { title: 'Agricultural Loans', desc: 'Low-interest credit for farmers to boost yields.', icon: 'Wheat' },
    { title: 'Loan Against Property', desc: 'High-value loans with long tenures on property.', icon: 'House' },
  ];



const coreServices = [
  { 
    title: 'Personal Loan', 
    desc: 'For weddings, travel, medical or any personal need', 
    icon: <User size={42} />, 
    rate: '8.99%' 
  },
  { 
    title: 'Business Loan', 
    desc: 'Expand your business with fast & flexible funding', 
    icon: <Briefcase size={42} />, 
    rate: '9.99%' 
  },
  { 
    title: 'Home Loan', 
    desc: 'Buy or construct your dream home at lowest rates', 
    icon: <HomeIcon size={42} />, 
    rate: '8.50%' 
  },
  { 
    title: 'Gold Loan', 
    desc: 'Instant cash against gold jewellery in 30 mins', 
    icon: <Gem size={42} />, 
    rate: '7.99%' 
  },
  { 
    title: 'Car Loan', 
    desc: 'Drive home your dream car with easy EMIs', 
    icon: <Car size={42} />, 
    rate: '8.75%' 
  },
  { 
    title: 'Education Loan', 
    desc: 'Fund your or your child’s higher studies abroad', 
    icon: <GraduationCap size={42} />, 
    rate: '9.50%' 
  },
];

  const stats = [
    { num: '27+', label: 'Years of Expertise' },
    { num: '25,000+', label: 'Loans Approved' },
    { num: '22,400+', label: 'Satisfied Clients' },
  ];

  const steps = [
    { icon: '1', title: 'Application', desc: 'Fill simple online form with basic details.' },
    { icon: '2', title: 'Documentation', desc: 'Upload KYC and income proofs securely.' },
    { icon: '3', title: 'Approval', desc: 'Our team verifies and approves in 24 hours.' },
    { icon: '4', title: 'Disbursal', desc: 'Funds transferred directly to your bank.' },
  ];

  const eligibilityBasic = [
    'Age: 21–60 years',
    'Salaried: Min ₹18,000/month',
    'Self-Employed: Min ₹3 Lakh p.a.',
    'Employment: 1+ year in current role',
    'Valid Indian citizenship',
  ];

  const eligibilityTerms = [
    'Loan Amount: ₹50,000 – ₹50 Lakh',
    'Interest Rate: Starting @ 8.99% p.a.',
    'Tenure: 12 – 84 months',
    'Processing Fee: Up to 3% + GST',
    'Zero Prepayment (after 6 months)',
  ];

  const docs = [
    { category: 'Identity Proof', items: ['Aadhaar Card', 'PAN Card', 'Passport', 'Voter ID'] },
    { category: 'Address Proof', items: ['Aadhaar Card', 'Electricity Bill', 'Rent Agreement', 'Passport'] },
    { category: 'Income Proof', items: ['Salary Slips (3 months)', 'Bank Statement (6 months)', 'ITR (Self-Employed)', 'Form 16'] },
  ];



  return (
    <>
    

      {/* Hero Section */}
      {/* <section className="hero">
        <div className="hero-overlay" />
        <div className="container">
          <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="tagline">An RBI Registered NBFC</div>
            <h1>Aadhar Capital | Apply For Personal Loan Upto ₹10 Lakh</h1>
            <p className="subtitle">
              Reliable Loan Solutions — Personal, Business, Gold, Home & More. Quick Approval • Minimal Documents • Funds in 24 Hours
            </p>
            <div className="hero-cta">
              <button 
  className="btn-primary" 
  onClick={() => navigate('/apply')}
>
  Apply Now <ArrowRight size={20} />
</button>
              <a href="/track" className="btn-secondary"><SearchIcon size={20} />Track Now</a>
            </div>
          </motion.div>
        </div>
      </section> */}


      <section className="hero">
  {/* YE IMAGE BACKGROUND ADD KAR DIYA */}
  <div className="hero-bg-image" style={{
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url("https://images.pexels.com/photos/7731323/pexels-photo-7731323.jpeg")',  // ← YAHAN TERA IMAGE PATH
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0
  }} />

  {/* Dark Green Overlay — Text clear dikhega */}
  <div className="hero-overlay" style={{
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(64,81,59,0.38), rgba(96,153,102,0.38))',
    zIndex: 1
  }} />

  <div className="container">
    <motion.div 
      className="hero-content" 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{ position: 'relative', zIndex: 2 }}  // ← Text sabse upar
    >
      <div className="tagline">An RBI Registered NBFC</div>
      <h1>Aadhar Capital | Apply For Personal Loan Upto ₹10 Lakh</h1>
      <p className="subtitle">
        Reliable Loan Solutions — Personal, Business, Gold, Home & More.<br />
        Quick Approval • Minimal Documents • Funds in 24 Hours
      </p>
      <div className="hero-cta">
        <button 
          className="btn-primary" 
          onClick={() => navigate('/apply')}
        >
          Apply Now <ArrowRight size={20} />
        </button>
        <a href="/track" className="btn-secondary">
          <SearchIcon size={20} /> Track Now
        </a>
      </div>
    </motion.div>
  </div>
</section>




      {/* Services */}
{/* Services – FIXED & BEAUTIFUL */}
<section className="services-clean">
  <div className="container">
    {/* Centered Title */}
    <motion.div 
      className="section-header"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h2>Choose Your Loan</h2>
      <p>Get instant approval • Minimal documents • Funds in 24 hours</p>
    </motion.div>

    {/* Fixed Grid */}
    <div className="services-grid">
      {coreServices.map((service, i) => (
        <motion.div
          key={i}
          className="service-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          whileHover={{ y: -12, scale: 1.03 }}
        >
          <div className="icon-wrapper">
            <div className="icon-circle">
              {service.icon}
            </div>
          </div>

          <h3>{service.title}</h3>
          <p>{service.desc}</p>

          {/* Fixed Footer – No Overflow */}
          <div className="card-footer">
            <span className="rate">From {service.rate}</span>
            <a href="/eligibility-checker" className="apply-btn">
              Apply Now <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Who We Are + Mini EMI */}

      
      <section className="who-we-are">
        <div className="container">
          <div className="who-content">
            <motion.div className="who-text" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2>Aadhar Capital Finance – Your Smart Financial Partner</h2>
              <p>Based in Haryana since 1998, we deliver simple, transparent, and fast loan solutions for every need.</p>
              <ul className="features-list">
                <li><Check size={16} /> Trusted & RBI Registered</li>
                <li><Check size={16} /> 100% Digital Process</li>
                <li><Check size={16} /> No Hidden Charges</li>
                <li><Check size={16} /> Quick Disbursal in 24 Hours</li>
              </ul>
              <button  onClick={() => navigate("/apply")}
               className="btn-primary">Apply Now</button>
            </motion.div>

            <motion.div className="emi-calculator mini" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3>How much do you need?</h3>
              <div className="slider-group">
                <label>Loan Amount</label>
                <div className="value-display">₹{formatIndian(loanAmount)}</div>
                <input type="range" min="50000" max="5000000" step="10000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="slider" />
              </div>
              <div className="slider-group">
                <label>Tenure</label>
                <div className="value-display">{tenureMonths} months</div>
                <input type="range" min="12" max="84" value={tenureMonths} onChange={(e) => setTenureMonths(Number(e.target.value))} className="slider" />
              </div>
              <div className="emi-result">
                <div>EMI: <strong>₹{formatIndian(emi)}</strong></div>
                <div>Total: <strong>₹{formatIndian(totalPayback)}</strong></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* Disclosure + Why Choose Section – 100% As Per Your Images */}
<section className="disclosure-premium-section">
  <div className="container">
    <div className="disclosure-premium-grid">

      {/* Left: Personal Loan Disclosure */}
      <motion.div 
        className="disclosure-premium-card"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Personal Loan Disclosure – <span style={{color: '#609966'}}>Aadhar Capital</span></h2>

        <div className="info-block">
          <span className="icon-wrapper"><Percent size={22} /></span>
          <div>
            <strong>Interest Rate:</strong><br/>
            Annual interest starts at 7.99% p.a. and can go up to 12% p.a. based on credit profile.
          </div>
        </div>

        <div className="info-block">
          <span className="icon-wrapper"><ShieldCheck size={22} /></span>
          <div>
            <strong>Eligibility:</strong><br/>
            Loan approval requires full KYC and income validation.
          </div>
        </div>

        <div className="info-block">
          <span className="icon-wrapper"><Calendar size={22} /></span>
          <div>
            <strong>APR Details:</strong><br/>
            Valid from 01 Jan 2024 – 31 Dec 2025<br/>
            <span style={{marginLeft: '2.8rem', display: 'block', marginTop: '8px'}}>
              Min APR: 7.9%<br/>
              Max APR: 12%
            </span>
            <small style={{marginLeft: '2.8rem', display: 'block', marginTop: '8px'}}>
              Includes interest, processing fee, and standard loan costs.
            </small>
          </div>
        </div>

        <div className="info-block">
          <span className="icon-wrapper"><Clock size={22} /></span>
          <div>
            <strong>Repayment Terms:</strong><br/>
            Tenure: 12 to 120 months<br/>
            <span style={{color: '#e74c3c', fontWeight: 'bold'}}>*T&C Apply</span>
          </div>
        </div>

        <div className="example-block">
          <span className="icon-wrapper example"><Calculator size={24} /></span>
          <div>
            <strong>Representative Example:</strong><br/>
            ₹1,00,000 loan at 7.9% p.a. for 24 months:<br/><br/>
            EMI ≈ ₹4,543/month<br/>
            Interest ≈ ₹8,242<br/>
            <strong>Total Repayment ≈ ₹1,08,242</strong>
          </div>
        </div>
      </motion.div>

      {/* Right: Why Choose Aadhar Capital */}
      <motion.div 
        className="disclosure-premium-card"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Why Choose Aadhar Capital?</h2>

        <ul className="why-list">
          <li>
            <span className="icon-wrap"><IndianRupee size={20} /> </span>
            
          Loan Range: ₹50,000 – ₹20,00,000</li>
          <li>
            <span className="icon-wrap"><Percent size={20} /> </span>
            
             Interest Range: 7.9% – 12% p.a.</li>
          <li>
             <span className="icon-wrap"><Calendar size={20} />  </span>
            
            Tenure: 12 months to 10 years</li>
          <li>
             <span className="icon-wrap"><FileText size={20} />  </span>
            
            Processing Fee: 2% of loan</li>
          <li>
             <span className="icon-wrap"><AlertCircle size={20} /></span>
              EMI Bounce: ₹590 per bounce</li>
          <li>
             <span className="icon-wrap"><CheckCircle size={20} className="highlight" /> </span>
             
             No Pre-Closure Charges</li>
          <li>
             <span className="icon-wrap"> <Eye size={20} className="highlight" /> </span>
             Transparent APR Disclosures</li>
          <li>
             <span className="icon-wrap"><Smartphone size={20} className="highlight" /></span>
              100% Digital & Paperless</li>
          <li>
             <span className="icon-wrap"><BadgeCheck size={22} className="highlight" /> </span>
             Trusted NBFC since 2017 (Navi Mumbai)</li>
        </ul>
      </motion.div>

    </div>
  </div>
</section>



      {/* Final CTA */}
    <section className="final-cta">
  <div className="container">
    <motion.div 
      className="cta-master"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Top Badge */}
      <motion.div 
        className="badge"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <Shield size={22} />
        RBI Registered NBFC • 100% Digital Process
      </motion.div>

      {/* Main Heading */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Ready to Grow with <span className="highlight">Aadhar Capital</span>?
      </motion.h2>

      {/* Subtext */}
      <motion.p 
        className="subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        Get funds in your bank account in just <strong>24 hours</strong><br />
        No paperwork • No branch visit • Starting @ 7.99% p.a.
      </motion.p>

      {/* Action Buttons */}
      <motion.div 
        className="cta-buttons"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
      >
       <button 
  className="btn-primary massive"
  onClick={() => navigate('/apply')}
>
  Apply Now – Get Funds in 24 Hours
</button>

       <a 
  href="https://wa.me/917992008145?text=Hi! I want to apply for a loan"
  target="_blank" 
  rel="noopener noreferrer"
  className="btn-whatsapp"
>
  Apply via WhatsApp
</a>
      </motion.div>

      {/* Trust Line */}
      <motion.div 
        className="trust-line"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        <CheckCircle size={18} /> 50,000+ customers served • 
        <CheckCircle size={18} /> ₹500+ Crore disbursed • 
        <CheckCircle size={18} /> 4.8/5 Customer Rating
      </motion.div>
    </motion.div>
  </div>
</section>

     
    </>
  );
};

export default Home;