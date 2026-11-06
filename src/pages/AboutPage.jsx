import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, ArrowRight, Mail, CalendarCheck, Target, GitMerge, BarChart2, FileDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function AboutPage() {
  const { portfolioData } = usePortfolio();
  const {
    personalInfo,
    internationalExposure,
    educationList,
    heroImage
  } = portfolioData;

  return (
    <div className="about-page">
      {/* Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span className="active">About Me</span>
          </div>
          <h1 className="page-hero-title" style={{ marginTop: '16px' }}>
            Behind The <span className="highlight">Strategy & Growth</span>
          </h1>
          <p className="page-hero-subtitle">
            Sales leadership. Marketing expertise. International experience spanning Europe, the Middle East, and Asia-Pacific.
          </p>
        </div>
      </section>

      {/* Main Bio Card */}
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="about-card-container">
            {/* Left Photo Wrapper with Dynamic Image */}
            <div className="about-photo-wrapper">
              <img
                src={heroImage}
                alt={personalInfo.name}
              />
              <div className="about-photo-badge">
                <div>
                  <div className="about-badge-title">{personalInfo.name}</div>
                  <div className="about-badge-sub">{personalInfo.location} • Global Mobility</div>
                </div>
                <CheckCircle2 color="#10B981" size={22} />
              </div>
            </div>

            {/* Right Info */}
            <div className="about-info-col">
              <div className="section-tag" style={{ marginBottom: 0 }}>
                <span className="dot" /> Professional Biography
              </div>
              <h2 className="section-title" style={{ color: '#FFFFFF' }}>
                A Bridge Between <span style={{ color: 'var(--accent-orange)' }}>Commercial Strategy</span> & Execution
              </h2>

              <p className="about-bio-text">
                {personalInfo.mainIntro}
              </p>

              <p className="about-bio-text">
                {personalInfo.detailedIntro}
              </p>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '10px' }}>
                <a
                  href={personalInfo.cvUrl || '/cv/Vishmi_Perera_CV.pdf'}
                  download={personalInfo.cvFileName || 'Vishmi_Perera_CV.pdf'}
                  className="btn-primary"
                  style={{ background: 'var(--accent-orange)', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <FileDown size={16} />
                  <span>Download Executive CV</span>
                </a>
                <Link to="/contact" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }}>
                  <span>Schedule an Interview</span>
                  <CalendarCheck size={16} />
                </Link>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="btn-secondary"
                  style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }}
                >
                  <span>Email Vishmi Direct</span>
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Footprint */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-tag"><span className="dot" /> Global Mobility & Reach</div>
              <h2 className="section-title">International Footprint</h2>
              <p className="section-description">
                Proven ability to adapt quickly, navigate diverse business cultures, and communicate seamlessly across multinational markets.
              </p>
            </div>
          </div>

          <div className="results-grid">
            {internationalExposure.map((exp, idx) => (
              <div key={idx} className="result-card">
                <div style={{ fontSize: '2.2rem', marginBottom: '12px' }}>{exp.flag}</div>
                <h3 className="result-card-title">{exp.country}</h3>
                <div className="result-card-badge" style={{ marginBottom: '10px' }}>
                  {exp.type}
                </div>
                <p className="result-card-desc">{exp.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Credentials */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-tag"><span className="dot" /> Qualifications</div>
              <h2 className="section-title">Education & Credentials</h2>
              <p className="section-description">
                A strong foundation in business management, economics, strategic marketing, and organizational leadership.
              </p>
            </div>
          </div>

          <div className="timeline-wrapper">
            {educationList.map((edu, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-top">
                  <div className="timeline-role-info">
                    <h3>{edu.degree}</h3>
                    <div className="timeline-company">{edu.institution}, {edu.location}</div>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-badge-loc">{edu.honors}</span>
                    <span className="timeline-badge-date">{edu.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="section" style={{ background: 'var(--dark-primary)', color: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div className="section-tag" style={{ color: 'var(--accent-orange)' }}><span className="dot" /> Core Philosophy</div>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>How I Approach Commercial Leadership</h2>
            <p className="section-description" style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
              Three foundational pillars that guide my work across tech startups and established enterprises.
            </p>
          </div>

          <div className="results-grid">
            <div className="result-card" style={{ background: 'var(--dark-surface)', borderColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
              <div style={{ fontSize: '1.8rem', color: 'var(--accent-orange)', marginBottom: '12px' }}>
                <Target size={30} />
              </div>
              <h3 className="result-card-title" style={{ color: '#FFFFFF' }}>High-Discipline Outbound</h3>
              <p className="result-card-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Revenue does not happen by accident. Consistent, multi-touch phone, email, and social cadences with sharp value propositions consistently outperform passive inbound hoping.
              </p>
            </div>

            <div className="result-card" style={{ background: 'var(--dark-surface)', borderColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
              <div style={{ fontSize: '1.8rem', color: 'var(--accent-orange)', marginBottom: '12px' }}>
                <GitMerge size={30} />
              </div>
              <h3 className="result-card-title" style={{ color: '#FFFFFF' }}>Commercial & Tech Synergy</h3>
              <p className="result-card-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Having led both 5 sales/marketing specialists and 5 software developers, I ensure commercial messaging and feature development evolve in lockstep with client needs.
              </p>
            </div>

            <div className="result-card" style={{ background: 'var(--dark-surface)', borderColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
              <div style={{ fontSize: '1.8rem', color: 'var(--accent-orange)', marginBottom: '12px' }}>
                <BarChart2 size={30} />
              </div>
              <h3 className="result-card-title" style={{ color: '#FFFFFF' }}>CRM & Metric Rigor</h3>
              <p className="result-card-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
                If it isn't tracked in Salesforce, HubSpot, or Zoho, it cannot be measured or scaled. Clean lifecycle stages, pipeline reporting, and attribution empower sound decision-making.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/contact" className="btn-primary" style={{ background: 'var(--accent-orange)', color: '#FFFFFF' }}>
              <span>Let's Discuss Opportunities</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
