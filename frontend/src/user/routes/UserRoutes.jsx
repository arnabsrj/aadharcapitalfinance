// src/user/routes/UserRoutes.jsx
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';  // ← YE IMPORT ADD KAR DE

import Home from '../pages/Home';
import About from '../pages/About';
import EmiCalculator from '../pages/EmiCalculator';
import EligibilityChecker from '../pages/EligibilityChecker';
import Documents from '../pages/Documents';
import LoanApplicationForm from '../pages/LoanApplicationForm';
import TrackApplication from '../pages/TrackApplication';
import Contact from '../pages/Contact';

const UserRoutes = () => {
  const [loading, setLoading] = useState(true);

  // Fixed 2.5 seconds loading animation (tu change kar sakta hai)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Sirf User Routes pe loading dikhega */}
      {loading && <LoadingScreen />}

      {/* Tera normal routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/emi-calculator" element={<EmiCalculator />} />
        <Route path="/eligibility-checker" element={<EligibilityChecker />} />
        <Route path="/documents-eligibility" element={<Documents />} />
        <Route path="/apply" element={<LoanApplicationForm />} />
        <Route path="/track" element={<TrackApplication />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default UserRoutes;