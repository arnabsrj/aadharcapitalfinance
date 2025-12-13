// src/App.jsx
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './user/components/Navbar';
import Footer from './user/components/Footer';
import UserRoutes from './user/routes/UserRoutes';
import AdminRoutes from './admin/routes/AdminRoutes';

function App() {
  const location = useLocation();

  // Hide Navbar & Footer on admin pages
  const isAdminRoute = location.pathname.startsWith('/admin');

  // 🔹 Scroll to top on route change (SEO + UX)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {/* 🔥 GLOBAL ORGANIZATION SCHEMA (ONLY FOR USER SIDE) */}
      {!isAdminRoute && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "Aadhar Capital Finance Ltd",
            "url": "https://www.aadharcapitalfinance.com",
            "logo": "https://www.aadharcapitalfinance.com/logo.png",
            "description":
              "Aadhar Capital Finance is an RBI registered NBFC providing online personal loans, business loans, and instant finance solutions across India.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "76, Defence Colony",
              "addressLocality": "Hisar",
              "addressRegion": "Haryana",
              "postalCode": "125001",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-7992008145",
              "contactType": "customer support",
              "areaServed": "IN",
              "availableLanguage": ["English", "Hindi"]
            },
            "sameAs": [
              "https://www.facebook.com/aadharcapitalfinance",
              "https://www.linkedin.com/company/aadharcapitalfinance",
              "https://www.youtube.com/@aadharcapitalfinance"
            ]
          })}
        </script>
      )}

      {/* 🔹 LAYOUT */}
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <UserRoutes />}
      {isAdminRoute && <AdminRoutes />}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
