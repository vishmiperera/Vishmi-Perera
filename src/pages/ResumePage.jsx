import React from 'react';
import { Link } from 'react-router-dom';
import {
  Printer,
  Download,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Award,
  Briefcase,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ResumePage() {
  const { portfolioData } = usePortfolio();
  const {
    personalInfo,
    coreExpertise,
    commercialResults,
    awardsList,
    workExperience,
    additionalExperience,
    toolsList,
    educationList,
    internationalExposure
  } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-page-container">
      {/* Top Floating Control Bar (Hidden on print) */}
      <div className="resume-action-bar no-print">
        <div className="resume-action-content">
          <Link to="/" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={handlePrint}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.88rem' }}
              title="Print directly or save as PDF"
            >
              <Printer size={16} />
              <span>Print / Save as PDF</span>
            </button>

            <a
              href={personalInfo.cvUrl || '/cv/Vishmi_Perera_CV.pdf'}
              download={personalInfo.cvFileName || 'Vishmi_Perera_CV.pdf'}
              className="btn-primary"
              style={{ padding: '8px 20px', fontSize: '0.88rem' }}
            >
              <Download size={16} />
              <span>Download File ({personalInfo.cvFileSize || 'PDF'})</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <div className="resume-sheet">
        {/* Top Header Banner */}
        <header className="resume-header">
          <div className="resume-name-block">
            <h1 className="resume-title">{personalInfo.name}</h1>
            <div className="resume-role-badge">{personalInfo.role}</div>
            <p className="resume-headline">{personalInfo.headline}</p>
          </div>

          <div className="resume-contact-block">
            <div className="resume-contact-row">
              <MapPin size={14} color="var(--accent-orange)" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="resume-contact-row">
              <Mail size={14} color="var(--accent-orange)" />
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </div>
            <div className="resume-contact-row">
              <Phone size={14} color="var(--accent-orange)" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="resume-contact-row">
              <Linkedin size={14} color="var(--accent-orange)" />
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                linkedin.com/in/vishmi-perera
              </a>
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="resume-section">
          <h2 className="resume-section-title">
            <span>Executive Summary</span>
          </h2>
          <p className="resume-paragraph">
            {personalInfo.mainIntro}
          </p>
          <p className="resume-paragraph" style={{ marginTop: '6px' }}>
            {personalInfo.detailedIntro}
          </p>
        </section>

        {/* Commercial Milestones */}
        <section className="resume-section">
          <h2 className="resume-section-title">
            <span>Highlighted Commercial Results (MillionSpaces, Q1–Q4 2025)</span>
          </h2>
          <div className="resume-metrics-grid">
            <div className="resume-metric-card">
              <div className="metric-val">{commercialResults.revenueMultiplier || '3.1x'}</div>
              <div className="metric-label">Quarterly Revenue Growth</div>
              <div className="metric-sub">{commercialResults.revenueText}</div>
            </div>
            <div className="resume-metric-card">
              <div className="metric-val">{commercialResults.bookingsEnd || '14,285'}</div>
              <div className="metric-label">Quarterly Completed Bookings</div>
              <div className="metric-sub">Increased from 6,636 to 14,285 (+115% surge)</div>
            </div>
            <div className="resume-metric-card">
              <div className="metric-val">10+ Staff</div>
              <div className="metric-label">Leadership & Team Scope</div>
              <div className="metric-sub">{personalInfo.leadershipScope}</div>
            </div>
          </div>
        </section>

        {/* Core Expertise Grid */}
        <section className="resume-section">
          <h2 className="resume-section-title">
            <span>Core Competencies & Functional Expertise</span>
          </h2>
          <div className="resume-skills-grid">
            {coreExpertise.map((item) => (
              <div key={item.id} className="resume-skill-item">
                <strong>{item.title}:</strong> {item.shortDesc}
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="resume-section">
          <h2 className="resume-section-title">
            <span>Professional Experience</span>
          </h2>
          <div className="resume-timeline">
            {workExperience.map((exp, idx) => (
              <div key={idx} className="resume-job-entry">
                <div className="job-header">
                  <div>
                    <span className="job-title">{exp.role}</span>
                    <span className="job-company"> — {exp.company}</span>
                  </div>
                  <div className="job-meta">
                    <span className="job-period">{exp.period}</span>
                    <span className="job-location"> | {exp.location}</span>
                  </div>
                </div>
                <ul className="job-bullets">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Additional International Experience */}
        <section className="resume-section">
          <h2 className="resume-section-title">
            <span>Additional International Engagements</span>
          </h2>
          <ul className="resume-bullet-list">
            {additionalExperience.map((item, idx) => (
              <li key={idx}>
                <strong>{item.title}:</strong> {item.desc}
              </li>
            ))}
          </ul>
        </section>

        {/* Awards & Recognition */}
        <section className="resume-section">
          <h2 className="resume-section-title">
            <span>Honours, Awards & Industry Recognition</span>
          </h2>
          <div className="resume-awards-grid">
            {awardsList.map((aw, idx) => (
              <div key={idx} className="resume-award-pill">
                <span className="award-badge-type">{aw.type}</span>
                <span className="award-name">{aw.award}</span>
                <span className="award-year">({aw.year})</span>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Academic Credentials */}
        <section className="resume-section">
          <h2 className="resume-section-title">
            <span>Education & Academic Credentials</span>
          </h2>
          <div className="resume-education-list">
            {educationList.map((edu, idx) => (
              <div key={idx} className="resume-edu-entry">
                <div className="edu-degree">
                  <strong>{edu.degree}</strong> — <span className="edu-grade">{edu.grade}</span>
                </div>
                <div className="edu-inst">
                  {edu.institution} ({edu.country}) • Graduated {edu.year}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Tools */}
        <section className="resume-section" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <h2 className="resume-section-title">
            <span>Commercial Software & Platforms</span>
          </h2>
          <div className="resume-tools-row">
            {toolsList.map((t, idx) => (
              <span key={idx} className="tool-chip">
                {t.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

