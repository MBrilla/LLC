import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Navigation.css';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="logo">
          LLC
        </Link>

        <div className="nav-links">
          <Link to="/business" className="nav-link">Business</Link>
          <Link to="/personal" className="nav-link">Personal</Link>
          <Link to="/attorneys" className="nav-link">Attorneys</Link>
          <Link to="/forms" className="nav-link">Forms</Link>
          <Link to="/support" className="nav-link">Support</Link>
        </div>

        <div className="nav-actions">
          <a href="tel:(855) 787-1221" className="phone-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            (855) 787-1221
          </a>
          <Link to="/signin" className="signin-button">Sign in</Link>
        </div>

        <button className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            <Link to="/" className="logo">LegalZoom Clone</Link>
            <button onClick={toggleMobileMenu} aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="mobile-menu-links">
            <Link to="/business" className="nav-link">Business</Link>
            <Link to="/personal" className="nav-link">Personal</Link>
            <Link to="/attorneys" className="nav-link">Attorneys</Link>
            <Link to="/forms" className="nav-link">Forms</Link>
            <Link to="/support" className="nav-link">Support</Link>
          </div>
          <div className="mobile-menu-actions">
            <a href="tel:(855) 787-1221" className="phone-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              (855) 787-1221
            </a>
            <Link to="/signin" className="signin-button">Sign in</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 