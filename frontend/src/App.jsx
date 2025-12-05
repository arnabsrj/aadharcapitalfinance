// src/App.jsx
import { useLocation } from 'react-router-dom';
import Navbar from './user/components/Navbar';
import Footer from './user/components/Footer';
import UserRoutes from './user/routes/UserRoutes';
import AdminRoutes from './admin/routes/AdminRoutes';  // ← ADD
import { useEffect } from 'react';

function App() {
  const location = useLocation();
   // Hide Navbar & Footer on admin pages
  const isAdminRoute = location.pathname.startsWith('/admin');


  // useEffect(() => {
  //   const handleScroll = () => {
  //     const navbar = document.querySelector('.main-navbar');
  //     if (window.scrollY > 80) {
  //       navbar.classList.add('scrolled');
  //     } else {
  //       navbar.classList.remove('scrolled');
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

 

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <UserRoutes />}
      {isAdminRoute && <AdminRoutes />}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;