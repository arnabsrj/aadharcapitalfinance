import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import EmiCalculator from '../pages/EmiCalculator';
import EligibilityChecker from '../pages/EligibilityChecker';
import Documents from '../pages/Documents';
import LoanApplicationForm from '../pages/LoanApplicationForm';
import TrackApplication from '../pages/TrackApplication';
import Contact from '../pages/Contact';

const UserRoutes = () => {
  return (
    <Routes>
      {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/emi-calculator" element={<EmiCalculator />} />
        <Route path="/eligibility-checker" element={<EligibilityChecker />} />
        <Route path="/documents-eligibility" element={<Documents />} />
        <Route path="/apply" element={<LoanApplicationForm />} />
        <Route path="/track" element={<TrackApplication />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected pages */}
          {/* <Route path="/documents" element={<DocumentsEligibility />} />
          <Route path="/emi-calculator" element={<EmiCalculator />} />
    
          <Route path="/contact" element={<Contact />} /> */}

    </Routes>
  );
};

export default UserRoutes;
