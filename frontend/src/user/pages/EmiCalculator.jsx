// src/user/pages/EmiCalculator.jsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IndianRupee, Percent, Calendar, Calculator, Shield, CheckCircle } from 'lucide-react';
import './EmiCalculator.css';
import { useNavigate } from 'react-router-dom';

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

      {/* Hero – Full Width, Bold & Clean */}
      <section className="emi-hero-compact">
        <div className="container">
          <motion.div className="hero-inner" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
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

    
    </>
  );
};

export default EmiCalculator;