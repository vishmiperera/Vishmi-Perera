import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Mail,
  Phone,
  MessageSquare,
  Linkedin,
  Clock,
  Send,
  CheckCircle2,
  ArrowUpRight,
  FileDown
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ContactPage() {
  const { portfolioData } = usePortfolio();
  const { personalInfo, faqs, contactSection } = portfolioData;

  const [activeFaq, setActiveFaq] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'Executive Sales & Marketing Leadership Role',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(`[Portfolio Inquiry] ${formData.subject} - from ${formData.name} (${formData.company || 'Direct'})`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`)}`;
    window.open(mailto, '_blank');

    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
    setFormData({ name: '', email: '', company: '', subject: 'Executive Sales & Marketing Leadership Role', message: '' });
  };

  return (
    <div className="contact-page">
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

      {/* Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span className="active">Contact & Inquiries</span>
          </div>
          <h1 className="page-hero-title" style={{ marginTop: '16px' }}>
            {contactSection?.title || 'Let’s Start a Conversation'}
          </h1>
          <p className="page-hero-subtitle">
            {contactSection?.subtitle || 'Available for full-time leadership roles, international B2B sales development, go-to-market advisory, and strategic commercial consulting.'}
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="contact-banner-card">
            <div className="contact-banner-grid">
              
              {/* Direct Details */}
              <div className="contact-info-col">
                <div className="section-tag" style={{ marginBottom: 0 }}>
                  <span className="dot" /> {contactSection?.badge || 'Direct Channels'}
                </div>
                <h2>{contactSection?.channelTitle || 'Reach Out Directly'}</h2>
                <p>
                  {contactSection?.channelDesc || 'I respond promptly to inquiries regarding commercial sales leadership, international expansion, and high-velocity outbound programs.'}
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
                      <div className="channel-label">Mobile & Direct Line</div>
                      <div className="channel-val">{personalInfo.phone}</div>
                    </div>
                  </a>

                  <a href={`https://wa.me/${personalInfo.whatsapp ? personalInfo.whatsapp.replace(/[^0-9]/g, '') : '94774602795'}`} target="_blank" rel="noopener noreferrer" className="contact-channel-item">
                    <div className="contact-channel-icon"><MessageSquare size={18} /></div>
                    <div>
                      <div className="channel-label">WhatsApp Quick Chat</div>
                      <div className="channel-val">{personalInfo.phone} (Instant Chat)</div>
                    </div>
                  </a>

                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-channel-item">
                    <div className="contact-channel-icon"><Linkedin size={18} /></div>
                    <div>
                      <div className="channel-label">Professional Network</div>
                      <div className="channel-val">linkedin.com/in/vishmi-perera</div>
                    </div>
                  </a>

                  <div className="contact-channel-item">
                    <div className="contact-channel-icon"><Clock size={18} /></div>
                    <div>
                      <div className="channel-label">Primary Timezone</div>
                      <div className="channel-val">{personalInfo.location} ({contactSection?.timezoneNote || 'GMT+5:30 • Flexible for UK/EU/US Hours'})</div>
                    </div>
                  </div>

                  {/* CV Download Card */}
                  <div style={{ marginTop: '20px', padding: '18px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--accent-orange)', marginBottom: '6px' }}>
                      Official Credentials
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '14px', fontWeight: 500 }}>
                      Download Vishmi's complete executive curriculum vitae ({personalInfo.cvFileSize || 'PDF'}).
                    </div>
                    <a
                      href={personalInfo.cvUrl || '/cv/Vishmi_Perera_CV.pdf'}
                      download={personalInfo.cvFileName || 'Vishmi_Perera_CV.pdf'}
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center', padding: '10px 18px', fontSize: '0.9rem' }}
                    >
                      <FileDown size={16} />
                      <span>Download Full CV</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="contact-form-box">
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                  Send an Inquiry
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Complete the form below to initiate discussion.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Your Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. David Miller"
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
                      placeholder="e.g. david@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Company / Organization</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Acme Tech Solutions"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Inquiry Type</label>
                    <select
                      className="form-control"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      {(contactSection?.inquirySubjects && contactSection.inquirySubjects.length > 0
                        ? contactSection.inquirySubjects
                        : [
                          "Executive Sales & Marketing Leadership Role",
                          "B2B Outbound Sales & Cold Calling Program",
                          "International GTM & Partnership Development",
                          "CRM Architecture, Reporting & AI Automation",
                          "Commercial Advisory / Consulting",
                          "Other / General Inquiries"
                        ]
                      ).map((subj, idx) => (
                        <option key={idx} value={subj}>{subj}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      className="form-control"
                      placeholder="Please describe your requirements, key objectives, or opportunity..."
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

      {/* Recruiter / Founder FAQ */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div className="section-tag"><span className="dot" /> Frequently Asked Questions</div>
            <h2 className="section-title">Common Questions & Answers <span className="sparkle">✦</span></h2>
            <p className="section-description" style={{ textAlign: 'center' }}>
              Clarifications on international mobility, team leadership, and engagement models.
            </p>
          </div>

          <div className="services-list" style={{ maxWidth: '860px', margin: '0 auto' }}>
            {faqs.map((faq, idx) => {
              const isActive = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`service-card ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFaq(isActive ? -1 : idx)}
                >
                  <div className="service-card-header">
                    <div className="service-card-left">
                      <span className="service-number">Q{idx + 1}.</span>
                      <h3 className="service-title">{faq.q}</h3>
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
                        <p className="service-desc-text">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
