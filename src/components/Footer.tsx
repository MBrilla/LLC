import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/press">Contact</Link></li>
            <li><Link to="/blog">Investors</Link></li>
            <li><Link to="/blog">Press</Link></li>
            <li><Link to="/blog">Partner with us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><Link to="/help">Order Status</Link></li>
            <li><Link to="/contact">Customer Care</Link></li>
            <li><Link to="/faq">Speak with an Attorney</Link></li>
            <li><Link to="/feedback">Join our Attorney Network</Link></li>
            <li><Link to="/feedback">Security</Link></li>
          </ul>
        </div>

       {/*  <div className="footer-section">
          <h3>Learn More</h3>
          <ul>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/guides">Guides</Link></li>
            <li><Link to="/webinars">Webinars</Link></li>
            <li><Link to="/glossary">Legal Glossary</Link></li>
          </ul>
        </div> */}

        <div className="footer-section newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest legal updates and tips.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} LegalZoom Clone. All rights reserved.</p>
          <div className="legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 