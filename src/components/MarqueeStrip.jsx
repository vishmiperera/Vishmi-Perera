import React from 'react';

export default function MarqueeStrip() {
  const items = [
    "B2B Sales",
    "Outbound Prospecting",
    "SaaS Growth",
    "Go-To-Market Strategy",
    "Account Management",
    "Demand Generation",
    "CRM & Automation",
    "International Expansion"
  ];

  return (
    <div className="ticker-strip">
      <div className="ticker-track">
        {items.concat(items).map((text, idx) => (
          <div key={idx} className="ticker-item">
            <span>{text}</span>
            <span className="sparkle">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

