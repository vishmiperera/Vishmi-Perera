// Color Conversion Helpers
function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return '#' + f(0) + f(8) + f(4);
}

// Generates a complete harmonic 60-30-10 UI palette from any custom base hex
export function generateHarmonicPalette(hex) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hover = hslToHex(hsl.h, Math.min(hsl.s + 6, 100), Math.max(hsl.l - 8, 15));
  const light = hslToHex(hsl.h, 85, 92);
  const bgPrimary = hslToHex(hsl.h, 35, 98.6);
  const bgSecondary = hslToHex(hsl.h, 30, 95.5);
  const bgTertiary = hslToHex(hsl.h, 25, 91);
  const borderLight = hslToHex(hsl.h, 20, 87);
  const darkPrimary = hslToHex(hsl.h, 55, 7.5);
  const darkSecondary = hslToHex(hsl.h, 45, 11);
  const darkSurface = hslToHex(hsl.h, 38, 15);
  const textMain = hslToHex(hsl.h, 50, 8);
  const textMuted = hslToHex(hsl.h, 22, 38);
  const glow = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.28)`;

  return {
    accent: hex,
    hover,
    light,
    glow,
    bgPrimary,
    bgSecondary,
    bgTertiary,
    bgSurface: '#FFFFFF',
    borderLight,
    darkPrimary,
    darkSecondary,
    darkSurface,
    textMain,
    textMuted,
    darkBgPrimary: hslToHex(hsl.h, 50, 5),
    darkBgSecondary: hslToHex(hsl.h, 45, 9),
    darkBgSurface: hslToHex(hsl.h, 38, 13),
    darkTextMain: hslToHex(hsl.h, 15, 96),
    darkTextMuted: hslToHex(hsl.h, 25, 70),
    darkBorder: 'rgba(255, 255, 255, 0.08)'
  };
}

export const themePresets = [
  {
    id: 'warm-orange',
    name: 'Signature Warm Orange',
    description: 'The iconic Jenny Scott creative palette: energetic warm orange with warm ivory cream surfaces and obsidian espresso.',
    colors: {
      accent: '#F57C00',
      hover: '#E65100',
      light: '#FFE8D6',
      glow: 'rgba(245, 124, 0, 0.28)',
      bgPrimary: '#FAF7F2',
      bgSecondary: '#F4EFE6',
      bgTertiary: '#ECE5D8',
      bgSurface: '#FFFFFF',
      borderLight: '#E8E1D5',
      darkPrimary: '#151311',
      darkSecondary: '#1F1B18',
      darkSurface: '#26221E',
      textMain: '#191614',
      textMuted: '#6B655F',
      darkBgPrimary: '#12100E',
      darkBgSecondary: '#191614',
      darkBgSurface: '#1E1B18',
      darkTextMain: '#F5F2EB',
      darkTextMuted: '#A8A096',
      darkBorder: 'rgba(255, 255, 255, 0.08)'
    }
  },
  {
    id: 'royal-blue',
    name: 'Executive Sapphire Blue',
    description: 'High-trust enterprise corporate tone: vibrant royal blue with crisp ice-white surfaces and deep midnight navy.',
    colors: {
      accent: '#2563EB',
      hover: '#1D4ED8',
      light: '#DBEAFE',
      glow: 'rgba(37, 99, 235, 0.28)',
      bgPrimary: '#F8FAFC',
      bgSecondary: '#F0F4FA',
      bgTertiary: '#E2EAF5',
      bgSurface: '#FFFFFF',
      borderLight: '#D5E0F0',
      darkPrimary: '#0B132B',
      darkSecondary: '#121C3B',
      darkSurface: '#1B274B',
      textMain: '#0A1128',
      textMuted: '#4F617E',
      darkBgPrimary: '#070C1A',
      darkBgSecondary: '#0F162A',
      darkBgSurface: '#16203A',
      darkTextMain: '#F1F5F9',
      darkTextMuted: '#94A3B8',
      darkBorder: 'rgba(255, 255, 255, 0.08)'
    }
  },
  {
    id: 'emerald-green',
    name: 'Emerald Growth',
    description: 'SaaS venture capital aesthetic: vivid emerald green with fresh mint-white surfaces and deep pine graphite.',
    colors: {
      accent: '#059669',
      hover: '#047857',
      light: '#D1FAE5',
      glow: 'rgba(5, 150, 105, 0.28)',
      bgPrimary: '#F7FBF9',
      bgSecondary: '#EDF6F1',
      bgTertiary: '#E0EFE6',
      bgSurface: '#FFFFFF',
      borderLight: '#D0E5D9',
      darkPrimary: '#08170F',
      darkSecondary: '#10241A',
      darkSurface: '#173324',
      textMain: '#08170F',
      textMuted: '#4A6556',
      darkBgPrimary: '#06120C',
      darkBgSecondary: '#0C1E14',
      darkBgSurface: '#142C1E',
      darkTextMain: '#F0FDF4',
      darkTextMuted: '#86EFAC',
      darkBorder: 'rgba(255, 255, 255, 0.08)'
    }
  },
  {
    id: 'violet-tech',
    name: 'Electric Violet & AI',
    description: 'Cutting-edge AI automation & innovation: electric violet with soft lilac-white surfaces and deep cosmic obsidian.',
    colors: {
      accent: '#7C3AED',
      hover: '#6D28D9',
      light: '#EDE9FE',
      glow: 'rgba(124, 58, 237, 0.28)',
      bgPrimary: '#FAF8FD',
      bgSecondary: '#F3EEFB',
      bgTertiary: '#EAE1F8',
      bgSurface: '#FFFFFF',
      borderLight: '#DFD3F4',
      darkPrimary: '#110B22',
      darkSecondary: '#1B1233',
      darkSurface: '#261B46',
      textMain: '#110B22',
      textMuted: '#584B70',
      darkBgPrimary: '#0C0719',
      darkBgSecondary: '#140C29',
      darkBgSurface: '#1E133C',
      darkTextMain: '#FAF5FF',
      darkTextMuted: '#C4B5FD',
      darkBorder: 'rgba(255, 255, 255, 0.08)'
    }
  },
  {
    id: 'rose-crimson',
    name: 'Rose Gold & Crimson',
    description: 'High-end executive luxury branding: rich crimson rose with delicate porcelain-white surfaces and deep velvet obsidian.',
    colors: {
      accent: '#E11D48',
      hover: '#BE123C',
      light: '#FFE4E6',
      glow: 'rgba(225, 29, 72, 0.28)',
      bgPrimary: '#FDF8F9',
      bgSecondary: '#FAEEF1',
      bgTertiary: '#F5E2E6',
      bgSurface: '#FFFFFF',
      borderLight: '#ECD0D7',
      darkPrimary: '#1A090E',
      darkSecondary: '#261016',
      darkSurface: '#361720',
      textMain: '#1A090E',
      textMuted: '#6B4751',
      darkBgPrimary: '#13060A',
      darkBgSecondary: '#1E0A10',
      darkBgSurface: '#2B0F17',
      darkTextMain: '#FFF1F2',
      darkTextMuted: '#FDA4AF',
      darkBorder: 'rgba(255, 255, 255, 0.08)'
    }
  },
  {
    id: 'amber-gold',
    name: 'Prestige Amber Gold',
    description: 'Celebratory commercial leadership: rich amber gold with warm honey-cream surfaces and deep bronze obsidian.',
    colors: {
      accent: '#D97706',
      hover: '#B45309',
      light: '#FEF3C7',
      glow: 'rgba(217, 119, 6, 0.28)',
      bgPrimary: '#FDFBF7',
      bgSecondary: '#F8F3E8',
      bgTertiary: '#F0E7D3',
      bgSurface: '#FFFFFF',
      borderLight: '#E6D9BE',
      darkPrimary: '#161108',
      darkSecondary: '#221B0F',
      darkSurface: '#2F2617',
      textMain: '#161108',
      textMuted: '#66553B',
      darkBgPrimary: '#110D06',
      darkBgSecondary: '#1B150A',
      darkBgSurface: '#261E0F',
      darkTextMain: '#FFFBEB',
      darkTextMuted: '#FCD34D',
      darkBorder: 'rgba(255, 255, 255, 0.08)'
    }
  },
  {
    id: 'slate-teal',
    name: 'Nordic Teal',
    description: 'Refined maritime & global tech consulting: nordic teal with crisp seafoam-white surfaces and deep marine charcoal.',
    colors: {
      accent: '#0D9488',
      hover: '#0F766E',
      light: '#CCFBF1',
      glow: 'rgba(13, 148, 136, 0.28)',
      bgPrimary: '#F6FBFA',
      bgSecondary: '#EDF6F5',
      bgTertiary: '#DEEFEF',
      bgSurface: '#FFFFFF',
      borderLight: '#CEE5E4',
      darkPrimary: '#071515',
      darkSecondary: '#0E2121',
      darkSurface: '#152E2E',
      textMain: '#071515',
      textMuted: '#446160',
      darkBgPrimary: '#051010',
      darkBgSecondary: '#0B1B1B',
      darkBgSurface: '#112727',
      darkTextMain: '#F0FDFA',
      darkTextMuted: '#5EEAD4',
      darkBorder: 'rgba(255, 255, 255, 0.08)'
    }
  }
];

export function applyThemeColors(themeData) {
  if (!themeData) return;
  const colors = themeData.colors || (typeof themeData === 'string' ? generateHarmonicPalette(themeData) : themeData);
  if (!colors || !colors.accent) return;

  const root = document.documentElement;

  // Immediate CSS variables
  root.style.setProperty('--accent-orange', colors.accent);
  root.style.setProperty('--accent-orange-hover', colors.hover);
  root.style.setProperty('--accent-orange-light', colors.light);
  root.style.setProperty('--accent-orange-glow', colors.glow);
  root.style.setProperty('--shadow-orange', `0 12px 30px ${colors.glow}`);
  root.style.setProperty('--border-focus', colors.accent);

  if (colors.bgPrimary) root.style.setProperty('--bg-primary', colors.bgPrimary);
  if (colors.bgSecondary) root.style.setProperty('--bg-secondary', colors.bgSecondary);
  if (colors.bgTertiary) root.style.setProperty('--bg-tertiary', colors.bgTertiary);
  if (colors.borderLight) root.style.setProperty('--border-light', colors.borderLight);
  if (colors.darkPrimary) root.style.setProperty('--dark-primary', colors.darkPrimary);
  if (colors.darkSecondary) root.style.setProperty('--dark-secondary', colors.darkSecondary);
  if (colors.darkSurface) root.style.setProperty('--dark-surface', colors.darkSurface);
  if (colors.textMain) root.style.setProperty('--text-main', colors.textMain);
  if (colors.textMuted) root.style.setProperty('--text-muted', colors.textMuted);

  // Dynamic stylesheet for scoped dark mode and glowing ambient backdrops
  let styleEl = document.getElementById('dynamic-theme-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'dynamic-theme-style';
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    :root {
      --accent-orange: ${colors.accent};
      --accent-orange-hover: ${colors.hover};
      --accent-orange-light: ${colors.light};
      --accent-orange-glow: ${colors.glow};
      --shadow-orange: 0 12px 30px ${colors.glow};
      --bg-primary: ${colors.bgPrimary || '#FAF7F2'};
      --bg-secondary: ${colors.bgSecondary || '#F4EFE6'};
      --bg-tertiary: ${colors.bgTertiary || '#ECE5D8'};
      --border-light: ${colors.borderLight || '#E8E1D5'};
      --dark-primary: ${colors.darkPrimary || '#151311'};
      --dark-secondary: ${colors.darkSecondary || '#1F1B18'};
      --dark-surface: ${colors.darkSurface || '#26221E'};
      --text-main: ${colors.textMain || '#191614'};
      --text-muted: ${colors.textMuted || '#6B655F'};
    }

    [data-theme="dark"] {
      --bg-primary: ${colors.darkBgPrimary || '#12100E'};
      --bg-secondary: ${colors.darkBgSecondary || '#191614'};
      --bg-tertiary: ${colors.darkBgTertiary || '#221E1B'};
      --bg-surface: ${colors.darkBgSurface || '#1E1B18'};
      --border-light: ${colors.darkBorder || 'rgba(255, 255, 255, 0.08)'};
      --text-main: ${colors.darkTextMain || '#F5F2EB'};
      --text-muted: ${colors.darkTextMuted || '#A8A096'};
      --accent-orange-light: ${colors.accent}25;
    }

    .hero-backdrop-glow {
      background: radial-gradient(circle, ${colors.glow} 0%, transparent 70%) !important;
    }
  `;
}
