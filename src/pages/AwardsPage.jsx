import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, Trophy, Star, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function AwardsPage() {
  const { portfolioData } = usePortfolio();
  const { awardsList } = portfolioData;

  return (
    <div className="awards-page">
      {/* Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span className="active">Awards & Recognition</span>
          </div>
          <h1 className="page-hero-title" style={{ marginTop: '16px' }}>
            Honors, Accolades & <span className="highlight">Industry Recognition</span>
          </h1>
          <p className="page-hero-subtitle">
            Recognized by national innovation councils and international venture forums for pioneering product innovation and market disruption.
          </p>
        </div>
      </section>

      {/* Main Awards Section */}
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          
          {/* Team Attribution Card */}
          <div className="result-attribution-box" style={{ marginBottom: '48px' }}>
            <div className="attribution-icon" style={{ background: 'var(--dark-primary)', color: 'var(--accent-orange)' }}>
              <Trophy size={24} />
            </div>
            <div className="attribution-text">
              <h4>Team Attribution & Innovation Role</h4>
              <p>
                These prestigious achievements celebrate groundbreaking contributions to the flex-space and digital booking industry. Vishmi Perera played a central role in driving customer-facing product innovation, commercial market positioning, inbound digital lead engines, and commercial growth.
              </p>
            </div>
          </div>

          {/* Detailed Awards Timeline / Cards */}
          <div className="timeline-wrapper">
            {awardsList.map((award, index) => {
              const isWinner = award.tier === 'Winner';
              return (
                <div
                  key={award.id || index}
                  className="timeline-item"
                  style={{ borderLeft: isWinner ? '4px solid var(--accent-orange)' : '1px solid var(--border-light)' }}
                >
                  <div className="timeline-top">
                    <div className="timeline-role-info">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: '#FFFFFF',
                            background: isWinner ? 'var(--accent-orange)' : '#2563EB',
                            padding: '3px 10px',
                            borderRadius: 'var(--radius-pill)',
                            textTransform: 'uppercase'
                          }}
                        >
                          {award.tier}
                        </span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          {award.organization}
                        </span>
                      </div>
                      <h3>{award.tier} — {award.title} ({award.level})</h3>
                      <div className="timeline-company">{award.attribution}</div>
                    </div>
                    <div className="timeline-meta">
                      <span className="timeline-badge-loc">{award.level}</span>
                      <span className="timeline-badge-date">{award.year}</span>
                    </div>
                  </div>

                  <ul className="timeline-bullets">
                    <li className="timeline-bullet-item">{award.description}</li>
                    <li className="timeline-bullet-item">
                      <strong>Vishmi's Contribution:</strong> Directed go-to-market strategies, designed the frictionless self-serve customer booking flow, crafted commercial sales collateral, and managed campaigns recognized for excellence across industry judging panels.
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/contact" className="btn-primary">
              <span>Connect with Vishmi</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
