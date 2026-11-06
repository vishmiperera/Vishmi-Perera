import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Zap, Moon, Sun, ArrowRight, Linkedin, Mail, Phone, Lock, Unlock, FileDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { portfolioData, isAdminAuthenticated } = usePortfolio();
  const { personalInfo } = portfolioData;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Experience', path: '/experience' },
    { label: 'About Me', path: '/about' },
    { label: 'Awards', path: '/awards' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="header-wrapper">
        <nav className="navbar">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand" onClick={closeMobileMenu}>
            <div className="brand-icon">
              <Zap size={18} fill="#FFFFFF" color="#FFFFFF" />
            </div>
            <span className="brand-text">
              Vishmi<span>.</span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                  end={item.path === '/'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Nav Actions */}
          <div className="nav-actions">
            {/* Admin Portal Shortcut Button */}
            <Link
              to="/admin"
              className="theme-toggle-btn"
              style={{
                position: 'relative',
                background: isAdminAuthenticated ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                color: isAdminAuthenticated ? '#10B981' : 'rgba(255, 255, 255, 0.85)'
              }}
              title={isAdminAuthenticated ? 'Admin Portal (Logged In)' : 'Owner Admin Portal Login'}
            >
              {isAdminAuthenticated ? <Unlock size={16} /> : <Lock size={16} />}
              {isAdminAuthenticated && (
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#10B981'
                  }}
                />
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Switch to Cream Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Download CV Action Button */}
            <a
              href={personalInfo.cvUrl || '/cv/Vishmi_Perera_CV.pdf'}
              download={personalInfo.cvFileName || 'Vishmi_Perera_CV.pdf'}
              className="btn-cv-nav"
              title="Download Vishmi's CV (PDF)"
            >
              <FileDown size={14} />
              <span>CV</span>
            </a>

            {/* CTA Button */}
            <Link to="/contact" className="btn-cta-nav">
              <span>Let's Talk</span>
              <ArrowRight size={14} />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={toggleMobileMenu}
              className={`mobile-nav-toggle ${mobileMenuOpen ? 'open' : ''}`}
              aria-label="Toggle Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMobileMenu();
        }}
      >
        <div className="mobile-nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
              }
              end={item.path === '/'}
            >
              {item.label}
            </NavLink>
          ))}

          <NavLink
            to="/admin"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
            }
            style={{ fontSize: '1.2rem', color: isAdminAuthenticated ? '#10B981' : 'var(--accent-orange)' }}
          >
            {isAdminAuthenticated ? 'Admin Portal (Active)' : 'Admin Portal 🔒'}
          </NavLink>

          <a
            href={personalInfo.cvUrl || '/cv/Vishmi_Perera_CV.pdf'}
            download={personalInfo.cvFileName || 'Vishmi_Perera_CV.pdf'}
            onClick={closeMobileMenu}
            className="mobile-nav-link"
            style={{ fontSize: '1.2rem', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FileDown size={20} />
            <span>Download CV (PDF)</span>
          </a>
        </div>

        <div className="mobile-drawer-footer">
          <Link
            to="/contact"
            onClick={closeMobileMenu}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <span>Schedule a Call</span>
            <ArrowRight size={16} />
          </Link>

          <div className="social-icons-row" style={{ marginTop: '16px' }}>
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
      </div>
    </>
  );
}
