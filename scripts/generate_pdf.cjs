const fs = require('fs');
const path = require('path');

function createPdf(outputPath) {
  const stream1Lines = [];
  const stream2Lines = [];

  function drawText(stream, font, size, x, y, r, g, b, text) {
    const escaped = text
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
    stream.push(`BT ${r} ${g} ${b} rg /${font} ${size} Tf ${x} ${y} Td (${escaped}) Tj ET`);
  }

  function drawLine(stream, x1, y1, x2, y2, r, g, b, lineWidth = 1) {
    stream.push(`${lineWidth} w ${r} ${g} ${b} RG ${x1} ${y1} m ${x2} ${y2} l S`);
  }

  function drawRect(stream, x, y, w, h, r, g, b) {
    stream.push(`${r} ${g} ${b} rg ${x} ${y} ${w} ${h} re f`);
  }

  // --- PAGE 1 ---
  // Top Orange Accent Bar
  drawRect(stream1Lines, 0, 782, 612, 10, 0.96, 0.49, 0.0);

  // Header
  drawText(stream1Lines, 'F1', 22, 50, 745, 0.1, 0.1, 0.1, 'VISHMI PERERA');
  drawText(stream1Lines, 'F1', 11, 50, 728, 0.96, 0.49, 0.0, 'SALES LEADERSHIP  |  MARKETING EXPERTISE  |  INTERNATIONAL EXPERIENCE');
  drawText(stream1Lines, 'F2', 9, 50, 712, 0.35, 0.35, 0.35, 'Colombo, Sri Lanka  |  vishmi.sp@gmail.com  |  +94 77 460 2795  |  linkedin.com/in/vishmi-perera');
  drawLine(stream1Lines, 50, 700, 562, 700, 0.85, 0.85, 0.85, 1);

  // Executive Summary
  drawText(stream1Lines, 'F1', 12, 50, 680, 0.1, 0.1, 0.1, 'EXECUTIVE SUMMARY');
  drawLine(stream1Lines, 50, 674, 562, 674, 0.96, 0.49, 0.0, 1.5);
  drawText(stream1Lines, 'F2', 9.5, 50, 658, 0.2, 0.2, 0.2, 'Cross-border B2B sales and marketing professional with 8+ years of experience across SaaS, technology services,');
  drawText(stream1Lines, 'F2', 9.5, 50, 644, 0.2, 0.2, 0.2, 'digital acquisition, and strategic partnerships. Combining strategic GTM planning with hands-on outbound execution.');
  drawText(stream1Lines, 'F2', 9.5, 50, 630, 0.2, 0.2, 0.2, 'On-site commercial exposure in the United Kingdom, Netherlands, and Dubai (UAE), with cross-regional delivery in');
  drawText(stream1Lines, 'F2', 9.5, 50, 616, 0.2, 0.2, 0.2, 'Singapore, Australia, and the wider EMEA region. Proven ability leading sales, marketing, and software engineering teams.');

  // Core Competencies
  drawText(stream1Lines, 'F1', 12, 50, 592, 0.1, 0.1, 0.1, 'CORE COMPETENCIES');
  drawLine(stream1Lines, 50, 586, 562, 586, 0.96, 0.49, 0.0, 1.5);
  drawText(stream1Lines, 'F2', 9, 50, 570, 0.2, 0.2, 0.2, '- Cold Calling & Outbound Sales: Multi-touch phone/email/LinkedIn cadences, gatekeeper navigation, objection handling.');
  drawText(stream1Lines, 'F2', 9, 50, 556, 0.2, 0.2, 0.2, '- Business Development: Enterprise pipeline structuring, custom proposals, C-level pitches, strategic partnerships.');
  drawText(stream1Lines, 'F2', 9, 50, 542, 0.2, 0.2, 0.2, '- Digital Marketing & Acquisition: Campaign strategy, paid media (LinkedIn, Google, Meta), lead gen & conversion opt.');
  drawText(stream1Lines, 'F2', 9, 50, 528, 0.2, 0.2, 0.2, '- Content & SEO Alignment: B2B SaaS landing-page messaging, sales battlecards, editorial calendars, on-page SEO.');
  drawText(stream1Lines, 'F2', 9, 50, 514, 0.2, 0.2, 0.2, '- CRM Architecture & Analytics: Lead workflows, lifecycle tracking, funnel reporting in Salesforce, HubSpot, Zoho.');
  drawText(stream1Lines, 'F2', 9, 50, 500, 0.2, 0.2, 0.2, '- Cross-Functional Team Leadership: Mentored and led 5 sales & marketing specialists alongside 5 software developers.');

  // Commercial Results
  drawText(stream1Lines, 'F1', 12, 50, 476, 0.1, 0.1, 0.1, 'KEY COMMERCIAL RESULTS (MillionSpaces, Q1-Q4 2025)');
  drawLine(stream1Lines, 50, 470, 562, 470, 0.96, 0.49, 0.0, 1.5);
  drawText(stream1Lines, 'F1', 9.5, 50, 454, 0.96, 0.49, 0.0, '[+] 3.1x Quarterly Revenue Expansion:');
  drawText(stream1Lines, 'F2', 9.5, 235, 454, 0.2, 0.2, 0.2, 'Scaled quarterly revenue from LKR 1,851,190 to LKR 5,650,920.');
  drawText(stream1Lines, 'F1', 9.5, 50, 440, 0.96, 0.49, 0.0, '[+] +115% Booking Volume Growth:');
  drawText(stream1Lines, 'F2', 9.5, 235, 440, 0.2, 0.2, 0.2, 'Increased quarterly completed bookings from 6,636 to 14,285.');
  drawText(stream1Lines, 'F1', 9.5, 50, 426, 0.96, 0.49, 0.0, '[+] Dual-Discipline Leadership:');
  drawText(stream1Lines, 'F2', 9.5, 235, 426, 0.2, 0.2, 0.2, 'Coordinated 5 sales/marketing specialists and 5 software engineers.');

  // Professional Experience
  drawText(stream1Lines, 'F1', 12, 50, 402, 0.1, 0.1, 0.1, 'PROFESSIONAL EXPERIENCE');
  drawLine(stream1Lines, 50, 396, 562, 396, 0.96, 0.49, 0.0, 1.5);

  // Role 1
  drawText(stream1Lines, 'F1', 10, 50, 380, 0.1, 0.1, 0.1, 'Head of Digital Sales and Marketing');
  drawText(stream1Lines, 'F3', 9, 310, 380, 0.4, 0.4, 0.4, '1 Billion Technology  |  Jan 2024 - Present  (Sri Lanka)');
  drawText(stream1Lines, 'F2', 8.8, 50, 366, 0.25, 0.25, 0.25, '- Lead international GTM campaigns for enterprise B2B SaaS and offshore engineering delivery across global hubs.');
  drawText(stream1Lines, 'F2', 8.8, 50, 353, 0.25, 0.25, 0.25, '- Direct high-converting landing pages, sales battlecards, multi-touch email funnels, and paid advertising.');
  drawText(stream1Lines, 'F2', 8.8, 50, 340, 0.25, 0.25, 0.25, '- Bridge commercial targets with software engineering teams to articulate technical value propositions clearly.');

  // Role 2
  drawText(stream1Lines, 'F1', 10, 50, 320, 0.1, 0.1, 0.1, 'Sales Development Analyst');
  drawText(stream1Lines, 'F3', 9, 310, 320, 0.4, 0.4, 0.4, 'Bayzat  |  Jun 2023 - Dec 2023  (Dubai, UAE)');
  drawText(stream1Lines, 'F2', 8.8, 50, 306, 0.25, 0.25, 0.25, '- Executed high-volume cold calling and multichannel outreach across LinkedIn and email for HR & payroll tech.');
  drawText(stream1Lines, 'F2', 8.8, 50, 293, 0.25, 0.25, 0.25, '- Qualified enterprise stakeholders, navigated objections, and maintained rigorous CRM data integrity in Salesforce.');

  // Role 3
  drawText(stream1Lines, 'F1', 10, 50, 273, 0.1, 0.1, 0.1, 'Sales Account Manager');
  drawText(stream1Lines, 'F3', 9, 310, 273, 0.4, 0.4, 0.4, 'Varuna Marine Services  |  Jan 2023 - Jun 2023  (Netherlands)');
  drawText(stream1Lines, 'F2', 8.8, 50, 259, 0.25, 0.25, 0.25, '- Managed strategic European B2B accounts and led commercial proposal creation and C-suite negotiations.');
  drawText(stream1Lines, 'F2', 8.8, 50, 246, 0.25, 0.25, 0.25, '- Represented company at international maritime trade exhibitions; architected European LinkedIn workflows.');

  // Role 4
  drawText(stream1Lines, 'F1', 10, 50, 226, 0.1, 0.1, 0.1, 'Assistant Sales and Marketing Manager');
  drawText(stream1Lines, 'F3', 9, 310, 226, 0.4, 0.4, 0.4, 'Spaceworx.io  |  Jun 2021 - Dec 2022  (Sri Lanka / APAC)');
  drawText(stream1Lines, 'F2', 8.8, 50, 212, 0.25, 0.25, 0.25, '- Orchestrated localized GTM SaaS campaigns for decision-makers in Singapore, Australia, and the UAE.');
  drawText(stream1Lines, 'F2', 8.8, 50, 199, 0.25, 0.25, 0.25, '- Utilized campaign analytics to iterate ad creatives, increasing qualified demo request conversions.');

  // Role 5
  drawText(stream1Lines, 'F1', 10, 50, 179, 0.1, 0.1, 0.1, 'Sales and Marketing Lead');
  drawText(stream1Lines, 'F3', 9, 310, 179, 0.4, 0.4, 0.4, 'MillionSpaces Coworking  |  Nov 2018 - Jun 2021  (Sri Lanka)');
  drawText(stream1Lines, 'F2', 8.8, 50, 165, 0.25, 0.25, 0.25, '- Led end-to-end brand positioning, multi-channel customer acquisition, and cross-functional growth initiatives.');
  drawText(stream1Lines, 'F2', 8.8, 50, 152, 0.25, 0.25, 0.25, '- Spearheaded product innovation resulting in multiple national-level SLASSCOM industry awards.');

  // Page 1 Footer
  drawText(stream1Lines, 'F2', 8.5, 50, 30, 0.5, 0.5, 0.5, 'Vishmi Perera - Executive Sales & Marketing CV  |  Page 1 of 2');

  // --- PAGE 2 ---
  drawRect(stream2Lines, 0, 782, 612, 10, 0.96, 0.49, 0.0);
  drawText(stream2Lines, 'F1', 14, 50, 745, 0.1, 0.1, 0.1, 'VISHMI PERERA  --  ADDITIONAL EXPERIENCE & CREDENTIALS');
  drawLine(stream2Lines, 50, 735, 562, 735, 0.85, 0.85, 0.85, 1);

  // Additional Experience
  drawText(stream2Lines, 'F1', 12, 50, 715, 0.1, 0.1, 0.1, 'ADDITIONAL INTERNATIONAL EXPERIENCE');
  drawLine(stream2Lines, 50, 709, 562, 709, 0.96, 0.49, 0.0, 1.5);
  drawText(stream2Lines, 'F1', 9.5, 50, 692, 0.1, 0.1, 0.1, '- Amazic - GitLab Partner Account Management:');
  drawText(stream2Lines, 'F2', 9, 50, 678, 0.25, 0.25, 0.25, '  Managed enterprise partner relationships across Middle East and Africa (MEA), enabling channel sales growth.');
  drawText(stream2Lines, 'F1', 9.5, 50, 660, 0.1, 0.1, 0.1, '- AIESEC Netherlands Global Outgoing Talent (2023 - 2024):');
  drawText(stream2Lines, 'F2', 9, 50, 646, 0.25, 0.25, 0.25, '  Participated in international exchange leadership programs connecting European commercial enterprises.');
  drawText(stream2Lines, 'F1', 9.5, 50, 628, 0.1, 0.1, 0.1, '- United Kingdom On-Site Commercial Experience:');
  drawText(stream2Lines, 'F2', 9, 50, 614, 0.25, 0.25, 0.25, '  Hands-on commercial immersion, client consultation, and enterprise practices in the UK.');

  // Awards & Recognition
  drawText(stream2Lines, 'F1', 12, 50, 586, 0.1, 0.1, 0.1, 'HONOURS, AWARDS & INDUSTRY RECOGNITION');
  drawLine(stream2Lines, 50, 580, 562, 580, 0.96, 0.49, 0.0, 1.5);
  drawText(stream2Lines, 'F1', 9, 50, 563, 0.96, 0.49, 0.0, 'WINNER');
  drawText(stream2Lines, 'F2', 9, 120, 563, 0.2, 0.2, 0.2, 'Best Product Innovation (National Level) - SLASSCOM National Ingenuity Awards, 2021');
  drawText(stream2Lines, 'F1', 9, 50, 547, 0.96, 0.49, 0.0, 'WINNER');
  drawText(stream2Lines, 'F2', 9, 120, 547, 0.2, 0.2, 0.2, 'Best Product Innovation (Provincial Level) - SLASSCOM National Ingenuity Awards, 2021');
  drawText(stream2Lines, 'F1', 9, 50, 531, 0.2, 0.2, 0.2, 'RUNNER-UP');
  drawText(stream2Lines, 'F2', 9, 120, 531, 0.2, 0.2, 0.2, 'Best Start-Up (National Level) - SLASSCOM National Ingenuity Awards, 2021');
  drawText(stream2Lines, 'F1', 9, 50, 515, 0.2, 0.2, 0.2, 'RUNNER-UP');
  drawText(stream2Lines, 'F2', 9, 120, 515, 0.2, 0.2, 0.2, 'Best Disruptor (National Level) - SLASSCOM National Ingenuity Awards, 2020');
  drawText(stream2Lines, 'F1', 9, 50, 499, 0.2, 0.2, 0.2, 'FINALIST');
  drawText(stream2Lines, 'F2', 9, 120, 499, 0.2, 0.2, 0.2, 'National Finalist - Growth Category, Entrepreneurship World Cup, 2021');

  // Education
  drawText(stream2Lines, 'F1', 12, 50, 470, 0.1, 0.1, 0.1, 'EDUCATION & ACADEMIC CREDENTIALS');
  drawLine(stream2Lines, 50, 464, 562, 464, 0.96, 0.49, 0.0, 1.5);
  drawText(stream2Lines, 'F1', 10, 50, 447, 0.1, 0.1, 0.1, 'BSc (Hons) Business Management  --  First-Class Honours');
  drawText(stream2Lines, 'F3', 9.5, 50, 434, 0.4, 0.4, 0.4, 'Canterbury Christ Church University, United Kingdom  |  Graduated 2021');
  drawText(stream2Lines, 'F1', 10, 50, 412, 0.1, 0.1, 0.1, 'Higher National Diploma in Business  --  Grade A');
  drawText(stream2Lines, 'F3', 9.5, 50, 399, 0.4, 0.4, 0.4, 'Saegis Campus, Sri Lanka  |  Graduated 2020');

  // Technical & Commercial Tools
  drawText(stream2Lines, 'F1', 12, 50, 370, 0.1, 0.1, 0.1, 'TECHNOLOGY STACK & TOOLS');
  drawLine(stream2Lines, 50, 364, 562, 364, 0.96, 0.49, 0.0, 1.5);
  drawText(stream2Lines, 'F2', 9.2, 50, 347, 0.2, 0.2, 0.2, 'CRM & Sales Automation: Salesforce, HubSpot CRM, Zoho CRM, Brevo, LinkedIn Sales Navigator');
  drawText(stream2Lines, 'F2', 9.2, 50, 332, 0.2, 0.2, 0.2, 'Digital Ads & Performance: Google Ads, Meta Ads Manager, LinkedIn Campaign Manager, Google Analytics');
  drawText(stream2Lines, 'F2', 9.2, 50, 317, 0.2, 0.2, 0.2, 'Productivity & Delivery: Jira, Confluence, Asana, Slack, Shopify, Canva, Notion');

  // Contact Footer Box
  drawRect(stream2Lines, 50, 200, 512, 75, 0.97, 0.97, 0.97);
  drawLine(stream2Lines, 50, 275, 562, 275, 0.9, 0.9, 0.9, 1);
  drawLine(stream2Lines, 50, 200, 562, 200, 0.9, 0.9, 0.9, 1);
  drawText(stream2Lines, 'F1', 10.5, 70, 252, 0.1, 0.1, 0.1, 'CONTACT FOR EXECUTIVE CONSULTING & RECRUITMENT');
  drawText(stream2Lines, 'F2', 9, 70, 235, 0.3, 0.3, 0.3, 'Email: vishmi.sp@gmail.com  |  Phone / WhatsApp: +94 77 460 2795  |  Location: Colombo, Sri Lanka');
  drawText(stream2Lines, 'F2', 9, 70, 218, 0.3, 0.3, 0.3, 'LinkedIn: linkedin.com/in/vishmi-perera');

  // Page 2 Footer
  drawText(stream2Lines, 'F2', 8.5, 50, 30, 0.5, 0.5, 0.5, 'Vishmi Perera - Executive Sales & Marketing CV  |  Page 2 of 2');

  const stream1Content = stream1Lines.join('\n');
  const stream2Content = stream2Lines.join('\n');

  // Construct PDF Objects
  const pdfObjs = [
    // 1: Catalog
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj',
    // 2: Pages
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R 7 0 R] /Count 2 >>\nendobj',
    // 3: Page 1
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 8 0 R >>\nendobj',
    // 4: Font F1
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj',
    // 5: Font F2
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj',
    // 6: Font F3
    '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>\nendobj',
    // 7: Page 2
    '7 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 9 0 R >>\nendobj',
    // 8: Stream 1
    `8 0 obj\n<< /Length ${Buffer.byteLength(stream1Content)} >>\nstream\n${stream1Content}\nendstream\nendobj`,
    // 9: Stream 2
    `9 0 obj\n<< /Length ${Buffer.byteLength(stream2Content)} >>\nstream\n${stream2Content}\nendstream\nendobj`
  ];

  let body = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const xrefOffsets = [];

  for (const obj of pdfObjs) {
    xrefOffsets.push(Buffer.byteLength(body, 'latin1'));
    body += obj + '\n';
  }

  const startxref = Buffer.byteLength(body, 'latin1');
  body += `xref\n0 ${pdfObjs.length + 1}\n0000000000 65535 f \n`;
  for (const offset of xrefOffsets) {
    body += String(offset).padStart(10, '0') + ' 00000 n \n';
  }
  body += `trailer\n<< /Size ${pdfObjs.length + 1} /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, body, 'latin1');
  console.log('PDF written successfully to', outputPath, 'size:', fs.statSync(outputPath).size, 'bytes');
}

const targetPath = path.join(__dirname, '..', 'public', 'cv', 'Vishmi_Perera_CV.pdf');
createPdf(targetPath);
