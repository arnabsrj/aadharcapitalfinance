// src/admin/routes/AdminRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import AdminLogin from '../pages/AdminLogin';
import Dashboard from '../pages/Dashboard';
// import ApplicationDetail from '../pages/ApplicationDetails';
import AdminLoanApplications from '../pages/AdminLoanApplication'; // ← EXACT FILE NAME
import Customers from '../pages/Customers';
import ApplicationDetails from '../pages/ApplicationDetails';
import ContactQueries from '../pages/ContactQueries';

const AdminRoutes = () => {
  const { admin } = useAdmin();

  return (
    <Routes>
      <Route path="/admin/login" element={!admin ? <AdminLogin /> : <Navigate to="/admin/dashboard" />} />
      
      <Route path="/admin/dashboard" element={admin ? <Dashboard /> : <Navigate to="/admin/login" />} />
      
      {/* FIXED PATH */}
      <Route path="/admin/loan-applications" element={admin ? <AdminLoanApplications /> : <Navigate to="/admin/login" />} />
      
      <Route path="/admin/application/:id" element={admin ? <ApplicationDetails /> : <Navigate to="/admin/login" />} />
      
      <Route path="/admin/customers" element={<Customers />} />
      <Route path="/admin/queries" element={<ContactQueries />} />

      <Route path="/admin/*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
};

export default AdminRoutes;