import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowUp, Linkedin, Mail, Phone, Lock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer() {
  const { portfolioData, isAdminAuthenticated } = usePortfolio();
  const { personalInfo } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link to="/" className="nav-brand" style={{ color: 'var(--text-main)' }}>
            <div className="brand-icon">
              <Zap size={18} fill="#FFFFFF" color="#FFFFFF" />
            </div>
            <span className="brand-text">
              Vishmi<span>.</span>
            </span>
          </Link>

          <div className="footer-nav-links">
            <Link to="/" className="footer-nav-link">Home</Link>
            <Link to="/services" className="footer-nav-link">Services</Link>
            <Link to="/experience" className="footer-nav-link">Experience</Link>
            <Link to="/about" className="footer-nav-link">About Me</Link>
            <Link to="/awards" className="footer-nav-link">Awards</Link>
            <Link to="/contact" className="footer-nav-link">Contact</Link>
            <Link to="/admin" className="footer-nav-link" style={{ color: 'var(--accent-orange)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Lock size={12} />
              <span>Admin Portal</span>
            </Link>
          </div>

          <div className="social-icons-row">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="social-icon-btn"
              title="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href={`tel:${personalInfo.phone}`}
              className="social-icon-btn"
              title="Phone"
            >
              <Phone size={18} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 {personalInfo.name}. All rights reserved. • Sales Leadership & Marketing Expertise.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link to="/admin" style={{ color: 'var(--text-light)', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Lock size={12} />
              <span>{isAdminAuthenticated ? 'Owner Portal Active' : 'Owner Access'}</span>
            </Link>

            <button onClick={scrollToTop} className="back-to-top-btn">
              <span>Back to top</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
