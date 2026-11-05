import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ServicesPage() {
  const { portfolioData } = usePortfolio();
  const { coreExpertise } = portfolioData;
  const [activeService, setActiveService] = useState('01');

  return (
    <div className="services-page">
      {/* Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span className="active">Services</span>
          </div>
          <h1 className="page-hero-title" style={{ marginTop: '16px' }}>
            High-Impact <span className="highlight">Capabilities & Services</span>
          </h1>
          <p className="page-hero-subtitle">
            Comprehensive commercial solutions bridging outbound prospecting, inbound digital performance, CRM architecture, and cross-functional leadership.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-tag"><span className="dot" /> Service Directory</div>
              <h2 className="section-title">Core Expertise In Action <span className="sparkle">✦</span></h2>
              <p className="section-description">
                Click any service card below to inspect scope of deliverables, methodology, and tools applied.
              </p>
            </div>
          </div>

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
                      <div>
                        <h3 className="service-title">{service.title}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {service.shortDesc}
                        </p>
                      </div>
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

                        {service.deliverables && service.deliverables.length > 0 && (
                          <div style={{ marginTop: '18px' }}>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--accent-orange)', marginBottom: '10px' }}>
                              Key Deliverables & Outputs:
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                              {service.deliverables.map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)' }}>
                                  <CheckCircle2 size={16} color="var(--accent-orange)" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Phase Delivery Framework */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div className="section-tag"><span className="dot" /> Structured Execution</div>
            <h2 className="section-title">The Commercial Delivery Framework <span className="sparkle">✦</span></h2>
            <p className="section-description" style={{ textAlign: 'center' }}>
              A tested 4-stage methodology to evaluate, build, execute, and scale commercial revenue engines.
            </p>
          </div>

          <div className="results-grid">
            <div className="result-card">
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-orange)', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>PHASE 01</div>
              <h3 className="result-card-title">Discovery & Pipeline Audit</h3>
              <p className="result-card-desc">
                Auditing existing CRM data, sales collateral, historic outbound metrics, and market segmentation to identify bottlenecks, leakage points, and immediate revenue opportunities.
              </p>
            </div>

            <div className="result-card">
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-orange)', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>PHASE 02</div>
              <h3 className="result-card-title">ICP & Messaging Architecture</h3>
              <p className="result-card-desc">
                Defining precision Ideal Customer Profiles (ICPs), mapping decision-maker personas, and developing objection-proof messaging cadences tailored by region and industry.
              </p>
            </div>

            <div className="result-card">
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-orange)', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>PHASE 03</div>
              <h3 className="result-card-title">Omnichannel Launch & Outbound</h3>
              <p className="result-card-desc">
                Executing multi-touch outreach cadences, targeted paid campaigns, sales enablement collateral, and weekly feedback loops between SDRs and marketing.
              </p>
            </div>

            <div className="result-card">
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-orange)', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>PHASE 04</div>
              <h3 className="result-card-title">CRM Analytics & Scale</h3>
              <p className="result-card-desc">
                Measuring conversion velocity across funnel stages in Salesforce/HubSpot, doubling down on top-performing channels, and systematizing playbooks for team expansion.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/contact" className="btn-primary">
              <span>Schedule an Engagement Call</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
