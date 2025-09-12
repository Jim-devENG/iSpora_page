import React from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { ImpactAreasPage } from './components/ImpactAreasPage';
import { ContactPage } from './components/ContactPage';
import { RegistrationPage } from './components/RegistrationPage';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminAccess } from './components/AdminAccess';
import { Footer } from './components/Footer';

function AppContent() {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = React.useState(false);

  // Check for admin authentication on mount
  React.useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuthenticated');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (adminAuth === 'true' && loginTime) {
      // Check if login is still valid (24 hours)
      const loginDate = new Date(loginTime);
      const now = new Date();
      const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        setIsAdminAuthenticated(true);
      } else {
        // Clear expired session
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminLoginTime');
      }
    }
  }, []);

  // Sync current page with URL path (e.g., /admin, /register)
  React.useEffect(() => {
    const validPages = ['home', 'about', 'services', 'impact', 'contact', 'register', 'admin'];

    const applyPath = () => {
      const path = window.location.pathname.replace('/', '') || 'home';
      if (validPages.includes(path)) {
        setCurrentPage(path);
      } else {
        setCurrentPage('home');
      }
    };

    // Apply on initial load
    applyPath();

    // Listen for path changes
    window.addEventListener('popstate', applyPath);
    return () => window.removeEventListener('popstate', applyPath);
  }, []);

  const handlePageChange = (page: string) => {
    // Update URL path for direct navigation/bookmarks
    if (typeof window !== 'undefined') {
      const newPath = page === 'home' ? '/' : `/${page}`;
      window.history.pushState({}, '', newPath);
    }
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminAccess = () => {
    setIsAdminAuthenticated(true);
    setCurrentPage('admin');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      case 'about':
        return <AboutPage onPageChange={handlePageChange} />;
      case 'services':
        return <ServicesPage onPageChange={handlePageChange} />;
      case 'impact':
        return <ImpactAreasPage onPageChange={handlePageChange} />;
      case 'contact':
        return <ContactPage onPageChange={handlePageChange} />;
      case 'register':
        return <RegistrationPage onPageChange={handlePageChange} />;
      case 'admin':
        return isAdminAuthenticated ? <AdminDashboard /> : <AdminAccess onAccessGranted={handleAdminAccess} />;
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onPageChange={handlePageChange} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
