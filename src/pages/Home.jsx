import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Award,
  ArrowRight,
  ArrowUpRight,
  Quote,
  Star,
  CheckCircle2,
  CalendarCheck,
  Send,
  Linkedin,
  Mail,
  Phone,
  MessageSquare,
  FileDown
} from 'lucide-react';
import MarqueeStrip from '../components/MarqueeStrip';
import { usePortfolio } from '../context/PortfolioContext';

export default function Home() {
  const { portfolioData } = usePortfolio();
  const {
    personalInfo,
    contactSection,
    coreExpertise,
    commercialResults,
    awardsList,
    toolsList,
    internationalExposure,
    heroImage
  } = portfolioData;

  const [activeService, setActiveService] = useState('01');
  const [toolFilter, setToolFilter] = useState('all');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'B2B Outbound & Cold Calling',
    message: ''
  });

  const filteredTools = toolFilter === 'all'
    ? toolsList
    : toolsList.filter(t => t.category === toolFilter);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(`[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.open(mailto, '_blank');

    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: 'B2B Outbound & Cold Calling', message: '' });
  };

  return (
    <div className="home-page">
      {/* Toast Alert */}
      <AnimatePresence>
        {formSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="toast-notice"
          >
            <CheckCircle2 color="var(--accent-orange)" size={24} />
            <div>
              <strong>Inquiry Prepared!</strong>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
                Your email client has opened with pre-filled details.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section (Jenny Scott Reference Aesthetic) */}
      <section className="hero-section">
        <div className="hero-backdrop-glow" />

        <div className="container hero-content">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-pill-badge"
          >
            <span className="dot" />
            <span>{personalInfo.role}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-title"
          >
            I'm <span className="highlight">{personalInfo.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-subtitle"
          >
            {personalInfo.headline}
          </motion.p>

          {/* Hero Stage: Left Stats, Center Portrait, Right Badges */}
          <div className="hero-stage">
            
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hero-side-left"
            >
              <div className="social-connect-box">
                <p>Connect with me</p>
                <div className="social-icons-row">
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                  <a href={`mailto:${personalInfo.email}`} className="social-icon-btn" title="Email">
                    <Mail size={18} />
                  </a>
                  <a href={`tel:${personalInfo.phone}`} className="social-icon-btn" title="Phone">
                    <Phone size={18} />
                  </a>
                  <a href={`https://wa.me/${personalInfo.whatsapp ? personalInfo.whatsapp.replace(/[^0-9]/g, '') : '94774602795'}`} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="WhatsApp">
                    <MessageSquare size={18} />
                  </a>
                </div>
              </div>

              <div className="hero-trust-card">
                <div className="avatar-stack">
                  <div className="avatar-stack-item" title="United Kingdom">🇬🇧</div>
                  <div className="avatar-stack-item" title="Netherlands">🇳🇱</div>
                  <div className="avatar-stack-item" title="Dubai UAE">🇦🇪</div>
                  <div className="avatar-stack-item" title="Sri Lanka">🇱🇰</div>
                  <div className="avatar-stack-item" title="APAC">+2</div>
                </div>
                <div className="trust-rating">
                  8+ Years
                  <span className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#FFB300" stroke="#FFB300" />
                    ))}
                  </span>
                </div>
                <div className="trust-label">Cross-Border Commercial Leadership</div>
              </div>
            </motion.div>

            {/* Center Portrait & Rotating Stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hero-portrait-wrapper"
            >
              {/* Rotating Circular Stamp Badge */}
              <Link to="/about" className="stamp-badge" title="Get to know me">
                <svg viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    fill="none"
                    stroke="none"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                  <text fontSize="8.6" fontWeight="700" letterSpacing="1.7" fill="var(--text-main)">
                    <textPath href="#circlePath">
                      • GET TO KNOW ME • GET TO KNOW ME 
                    </textPath>
                  </text>
                </svg>
                <div className="stamp-badge-center">
                  <TrendingUp size={20} />
                </div>
              </Link>

              {/* Portrait Frame with Custom Dynamic Image */}
              <div className="portrait-frame">
                <img
                  src={heroImage}
                  alt={personalInfo.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Badges */}
              <div className="floating-badge badge-left">
                <span className="dot" />
                <span>3.1x Revenue Surge</span>
              </div>

              <div className="floating-badge badge-right">
                <Award size={16} color="var(--accent-orange)" />
                <span>Award-Winning Leader</span>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hero-side-right"
            >
              <div className="quote-highlight-box">
                <div className="quote-icon">
                  <Quote size={24} />
                </div>
                <p>
                  Combining strategic GTM planning with hands-on cold outreach & pipeline execution across global tech hubs.
                </p>
              </div>

              <div className="tags-cloud">
                {(personalInfo.heroTags && personalInfo.heroTags.length > 0 ? personalInfo.heroTags : [
                  "Sales & Marketing",
                  "B2B Business Development",
                  "SaaS & Tech Sales",
                  "Digital Marketing"
                ]).map((tag, idx) => {
                  const label = typeof tag === 'string' ? tag : tag.label;
                  const styles = ['tag-dark', 'tag-orange', 'tag-outline', 'tag-orange'];
                  const style = typeof tag === 'object' && tag.style ? tag.style : styles[idx % styles.length];
                  return (
                    <span key={idx} className={`tag-pill ${style}`}>
                      {label}
                    </span>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hero-cta-group"
          >
            <Link to="/services" className="btn-primary">
              <span>Explore Services</span>
              <div className="btn-circle-arrow">
                <ArrowRight size={14} />
              </div>
            </Link>

            <a
              href={personalInfo.cvUrl || '/cv/Vishmi_Perera_CV.pdf'}
              download={personalInfo.cvFileName || 'Vishmi_Perera_CV.pdf'}
              className="btn-secondary"
              title="Download Vishmi's CV (PDF)"
            >
              <FileDown size={18} color="var(--accent-orange)" />
              <span>Download CV</span>
            </a>

            <Link to="/contact" className="btn-secondary">
              <CalendarCheck size={18} color="var(--accent-orange)" />
              <span>Let's Talk</span>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Infinite Marquee Ticker Strip */}
      <MarqueeStrip />

      {/* Services Section */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-tag"><span className="dot" /> Core Expertise</div>
              <h2 className="section-title">How I Drive Revenue & Growth</h2>
              <p className="section-description">
                High-impact B2B sales development, customer acquisition strategies, and commercial execution tailored for high-growth tech companies.
              </p>
            </div>
            <div>
              <Link to="/services" className="btn-secondary">
                <span>View All Services</span>
                <ArrowRight size={16} color="var(--accent-orange)" />
              </Link>
            </div>
          </div>

          {/* Accordion Container */}
          <div className="services-list">
            {coreExpertise.map((service) => {
              const isActive = activeService === service.id;
              return (
                <div
                  key={service.id}
                  className={`service-card ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveService(isActive ? '' : service.id)}
                >
                  <div className="service-card-header">
                    <div className="service-card-left">
                      <span className="service-number">{service.id}.</span>
                      <h3 className="service-title">{service.title}</h3>
                    </div>
                    <div className="service-arrow-btn">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="service-card-body"
                      >
                        <div className="service-tags-row">
                          {service.tags.map((tag, idx) => (
                            <span key={idx} className="service-tag-pill">{tag}</span>
                          ))}
                        </div>
                        <p className="service-desc-text">{service.fullDesc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Vishmi Perera Preview Section */}
      <section className="section" id="about" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="about-card-container">
            {/* Left: Portrait Frame with Dynamic Image */}
            <div className="about-photo-wrapper">
              <img
                src={heroImage}
                alt={personalInfo.name}
              />
              <div className="about-photo-badge">
                <div>
                  <div className="about-badge-title">{personalInfo.name}</div>
                  <div className="about-badge-sub">B2B Sales & Marketing Specialist</div>
                </div>
                <CheckCircle2 color="#10B981" size={22} />
              </div>
            </div>

            {/* Right: Story */}
            <div className="about-info-col">
              <div className="section-tag" style={{ marginBottom: 0 }}>
                <span className="dot" /> About Me
              </div>
              <h2 className="section-title" style={{ color: '#FFFFFF' }}>
                Who is <span style={{ color: 'var(--accent-orange)' }}>{personalInfo.name}?</span>
              </h2>

              <p className="about-bio-text">
                {personalInfo.mainIntro}
              </p>

              <p className="about-bio-text">
                {personalInfo.detailedIntro}
              </p>

              {/* International Footprint Badges */}
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-orange)', marginBottom: '8px' }}>
                  On-Site & Global Campaign Experience
                </div>
                <div className="international-badges-container">
                  {internationalExposure.map((exp, idx) => (
                    <span key={idx} className="country-pill">
                      {exp.flag} {exp.country}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education Preview */}
              <div className="education-preview-grid">
                <div className="education-pill-card">
                  <div className="edu-degree">🎓 BSc (Hons) Business Management</div>
                  <div className="edu-school">Canterbury Christ Church University, UK • First-Class Honours</div>
                </div>
                <div className="education-pill-card">
                  <div className="edu-degree">📜 Higher National Diploma in Business</div>
                  <div className="edu-school">Saegis Campus, Sri Lanka • Grade A</div>
                </div>
              </div>

              <div style={{ marginTop: '14px' }}>
                <Link to="/about" className="btn-primary" style={{ background: '#FFFFFF', color: 'var(--dark-primary)' }}>
                  <span>Read Full Biography & Journey</span>
                  <ArrowRight size={16} color="var(--accent-orange)" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Commercial Results (MillionSpaces Q1-Q4 2025 Impact) */}
      <section className="section results-section" id="results">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-tag"><span className="dot" /> Commercial Track Record</div>
              <h2 className="section-title">Measurable Commercial Results</h2>
              <p className="section-description">
                Proven revenue and pipeline acceleration delivered at {commercialResults.company} across <strong>{commercialResults.period}</strong>.
              </p>
            </div>
            <div>
              <Link to="/experience" className="btn-secondary">
                <span>View Full Career Timeline</span>
                <ArrowRight size={16} color="var(--accent-orange)" />
              </Link>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="results-grid">
            {commercialResults.metrics.map((metric, idx) => (
              <div key={idx} className="result-card">
                <div>
                  <div className="result-card-badge">
                    <CalendarCheck size={16} />
                    <span>{commercialResults.period}</span>
                  </div>
                  <div className="result-card-metric">
                    {metric.isMultiplier && <span>~</span>}
                    <span>{metric.display}</span>
                  </div>
                  <h3 className="result-card-title">{metric.label}</h3>
                  <p className="result-card-desc">{metric.detail}</p>
                </div>
                <div style={{ marginTop: '24px', paddingTop: '14px', borderTop: '1px solid var(--border-light)', fontSize: '0.82rem', color: 'var(--accent-orange)', fontWeight: 700 }}>
                  {metric.change}
                </div>
              </div>
            ))}
          </div>

          {/* Clear Attribution Box */}
          <div className="result-attribution-box">
            <div className="attribution-icon">
              <TrendingUp size={24} />
            </div>
            <div className="attribution-text">
              <h4>Collaborative Leadership & Contribution Notice</h4>
              <p>{commercialResults.attribution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="section" id="awards" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-tag"><span className="dot" /> Honors & Accolades</div>
              <h2 className="section-title">Awards & Industry Recognition</h2>
              <p className="section-description">
                Prestigious industry honors celebrating product innovation, disruptive market presence, and rapid venture growth.
              </p>
            </div>
            <div>
              <Link to="/awards" className="btn-secondary">
                <span>Explore Awards Details</span>
                <ArrowRight size={16} color="var(--accent-orange)" />
              </Link>
            </div>
          </div>

          <div className="awards-grid">
            {awardsList.map((award, idx) => (
              <div key={award.id || idx} className={`award-card ${award.tier === 'Winner' ? 'winner' : ''}`}>
                <div>
                  <div className="award-top">
                    <div className="award-trophy-badge">
                      <Award size={22} />
                    </div>
                    <span className="award-year">{award.year}</span>
                  </div>
                  <h3 className="award-title">{award.tier} — {award.title}</h3>
                  <p className="award-org">{award.level} • {award.organization}</p>
                </div>
                <div className="award-footer-badge">
                  <Star size={14} fill="var(--accent-orange)" color="var(--accent-orange)" />
                  <span>{award.attribution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Ecosystem Section */}
      <section className="section" id="tools">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div className="section-tag"><span className="dot" /> Technology Stack</div>
            <h2 className="section-title">Tools & Platforms Mastered</h2>
            <p className="section-description" style={{ textAlign: 'center' }}>
              Enterprise CRM suites, paid advertising engines, automated workflows, and agile team management systems.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="tools-filter-bar">
            {[
              { id: 'all', label: 'All Tools' },
              { id: 'crm', label: 'CRM & Sales' },
              { id: 'marketing', label: 'Ads & Marketing' },
              { id: 'analytics', label: 'Analytics & Data' },
              { id: 'collab', label: 'Productivity & PM' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setToolFilter(tab.id)}
                className={`filter-btn ${toolFilter === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="tools-grid">
            {filteredTools.map((tool, idx) => (
              <div key={idx} className="tool-card">
                <div className="tool-icon-wrap">
                  <TrendingUp size={22} />
                </div>
                <div className="tool-name">{tool.name}</div>
                <div className="tool-category">{tool.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Banner & Interactive Form */}
      <section className="section" id="contact" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="contact-banner-card">
            <div className="contact-banner-grid">
              
              {/* Left Column: Direct Info */}
              <div className="contact-info-col">
                <div className="section-tag" style={{ marginBottom: 0 }}>
                  <span className="dot" /> {contactSection?.homeBadge || 'Get In Touch'}
                </div>
                <h2>{contactSection?.homeTitle || "Let's Drive Revenue & Growth Together."}</h2>
                <p>
                  {contactSection?.homeDesc || "Whether you are expanding into international B2B markets, ramping outbound prospecting, or optimizing your commercial marketing engine, let’s connect."}
                </p>

                <div className="contact-channel-list">
                  <a href={`mailto:${personalInfo.email}`} className="contact-channel-item">
                    <div className="contact-channel-icon"><Mail size={18} /></div>
                    <div>
                      <div className="channel-label">Email Address</div>
                      <div className="channel-val">{personalInfo.email}</div>
                    </div>
                  </a>

                  <a href={`tel:${personalInfo.phone}`} className="contact-channel-item">
                    <div className="contact-channel-icon"><Phone size={18} /></div>
                    <div>
                      <div className="channel-label">Phone & WhatsApp</div>
                      <div className="channel-val">{personalInfo.phone}</div>
                    </div>
                  </a>

                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-channel-item">
                    <div className="contact-channel-icon"><Linkedin size={18} /></div>
                    <div>
                      <div className="channel-label">LinkedIn Profile</div>
                      <div className="channel-val">linkedin.com/in/vishmi-perera</div>
                    </div>
                  </a>

                  <div className="contact-channel-item">
                    <div className="contact-channel-icon"><CalendarCheck size={18} /></div>
                    <div>
                      <div className="channel-label">Base Location</div>
                      <div className="channel-val">{personalInfo.location} (Global Mobility)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="contact-form-box">
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                  Send a Direct Message
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                  I typically reply within 24 hours.
                </p>

                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label">Your Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Topic of Interest</label>
                    <select
                      className="form-control"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="B2B Outbound & Cold Calling">B2B Outbound & Cold Calling</option>
                      <option value="Sales & Marketing Leadership Role">Sales & Marketing Leadership Role</option>
                      <option value="International GTM & Partnerships">International GTM & Partnerships</option>
                      <option value="CRM Architecture & Reporting">CRM Architecture & Reporting</option>
                      <option value="Consulting / Strategic Advisory">Consulting / Strategic Advisory</option>
                      <option value="General Inquiries">General Inquiries</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      className="form-control"
                      placeholder="Tell me about your project, target markets, or opportunity..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="form-submit-btn">
                    <span>Send Message</span>
                    <Send size={16} />
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
