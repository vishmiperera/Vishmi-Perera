import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CalendarCheck, TrendingUp, Building2, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ExperiencePage() {
  const { portfolioData } = usePortfolio();
  const {
    commercialResults,
    workExperience,
    additionalExperience
  } = portfolioData;

  return (
    <div className="experience-page">
      {/* Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span className="active">Experience & Results</span>
          </div>
          <h1 className="page-hero-title" style={{ marginTop: '16px' }}>
            Career Journey & <span className="highlight">Commercial Track Record</span>
          </h1>
          <p className="page-hero-subtitle">
            8+ years driving B2B sales pipelines, cross-border SaaS expansion, and cross-functional teams across Sri Lanka, Dubai, the Netherlands, and the UK.
          </p>
        </div>
      </section>

      {/* Case Study Deep-Dive: Commercial Results */}
      <section className="section results-section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-tag"><span className="dot" /> Case Study Impact</div>
              <h2 className="section-title">{commercialResults.company} Growth Analysis <span className="sparkle">✦</span></h2>
              <p className="section-description">
                Key commercial milestones delivered across <strong>{commercialResults.period}</strong> through collaborative cross-functional execution.
              </p>
            </div>
          </div>

          <div className="results-grid">
            {commercialResults.metrics.map((metric, idx) => (
              <div key={idx} className="result-card">
                <div>
                  <div className="result-card-badge">
                    <CalendarCheck size={16} />
                    <span>{commercialResults.company} ({commercialResults.period})</span>
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

          {/* Attribution Box */}
          <div className="result-attribution-box">
            <div className="attribution-icon">
              <TrendingUp size={24} />
            </div>
            <div className="attribution-text">
              <h4>Collaborative Team Effort & Contribution Attribution</h4>
              <p>{commercialResults.attribution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chronological Work Experience */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-tag"><span className="dot" /> Chronological Timeline</div>
              <h2 className="section-title">Professional Experience <span className="sparkle">✦</span></h2>
              <p className="section-description">
                Chronological history of leadership and B2B sales roles across global technology organizations.
              </p>
            </div>
          </div>

          <div className="timeline-wrapper">
            {workExperience.map((job, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-top">
                  <div className="timeline-role-info">
                    <h3>{job.role}</h3>
                    <div className="timeline-company">
                      <Building2 size={16} />
                      <span>{job.company}</span>
                    </div>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-badge-loc">
                      {job.countryFlag} {job.location}
                    </span>
                    <span className="timeline-badge-date">{job.period}</span>
                  </div>
                </div>

                <ul className="timeline-bullets">
                  {job.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="timeline-bullet-item">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional International Engagements */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-tag"><span className="dot" /> Global Engagements</div>
              <h2 className="section-title">Specialized International Exposure <span className="sparkle">✦</span></h2>
              <p className="section-description">
                Partner management, overseas talent initiatives, and British on-site commercial exposure.
              </p>
            </div>
          </div>

          <div className="results-grid">
            {additionalExperience.map((exp, idx) => (
              <div key={idx} className="result-card">
                <div>
                  <div className="result-card-badge" style={{ marginBottom: '10px' }}>
                    {exp.region}
                  </div>
                  <h3 className="result-card-title">{exp.title}</h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--accent-orange)', fontWeight: 600, marginBottom: '10px' }}>
                    {exp.entity}
                  </div>
                  <p className="result-card-desc">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/contact" className="btn-primary">
              <span>Discuss Commercial Opportunities</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
