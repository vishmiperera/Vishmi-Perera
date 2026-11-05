export const themePresets = [
  {
    id: 'warm-orange',
    name: 'Signature Warm Orange',
    description: 'The iconic Jenny Scott creative palette: energetic, warm, and approachable.',
    colors: {
      accent: '#F57C00',
      hover: '#E65100',
      light: '#FFE8D6',
      glow: 'rgba(245, 124, 0, 0.28)'
    }
  },
  {
    id: 'royal-blue',
    name: 'Executive Sapphire Blue',
    description: 'High-trust enterprise corporate tone for international B2B tech leadership.',
    colors: {
      accent: '#2563EB',
      hover: '#1D4ED8',
      light: '#DBEAFE',
      glow: 'rgba(37, 99, 235, 0.28)'
    }
  },
  {
    id: 'emerald-green',
    name: 'Emerald Growth',
    description: 'SaaS venture capital aesthetic representing high-velocity pipeline scale.',
    colors: {
      accent: '#059669',
      hover: '#047857',
      light: '#D1FAE5',
      glow: 'rgba(5, 150, 105, 0.28)'
    }
  },
  {
    id: 'violet-tech',
    name: 'Electric Violet & AI',
    description: 'Cutting-edge AI automation, modern SaaS product innovation and prestige.',
    colors: {
      accent: '#7C3AED',
      hover: '#6D28D9',
      light: '#EDE9FE',
      glow: 'rgba(124, 58, 237, 0.28)'
    }
  },
  {
    id: 'rose-crimson',
    name: 'Rose Gold & Crimson',
    description: 'High-end executive luxury branding with vivid modern contrast.',
    colors: {
      accent: '#E11D48',
      hover: '#BE123C',
      light: '#FFE4E6',
      glow: 'rgba(225, 29, 72, 0.28)'
    }
  },
  {
    id: 'amber-gold',
    name: 'Prestige Amber Gold',
    description: 'Award-winning distinction, celebratory commercial leadership, and warmth.',
    colors: {
      accent: '#D97706',
      hover: '#B45309',
      light: '#FEF3C7',
      glow: 'rgba(217, 119, 6, 0.28)'
    }
  },
  {
    id: 'slate-teal',
    name: 'Nordic Teal',
    description: 'Refined European maritime & offshore tech consulting palette.',
    colors: {
      accent: '#0D9488',
      hover: '#0F766E',
      light: '#CCFBF1',
      glow: 'rgba(13, 148, 136, 0.28)'
    }
  }
];

export function applyThemeColors(colors) {
  if (!colors) return;
  const root = document.documentElement;
  root.style.setProperty('--accent-orange', colors.accent);
  root.style.setProperty('--accent-orange-hover', colors.hover);
  root.style.setProperty('--accent-orange-light', colors.light);
  root.style.setProperty('--accent-orange-glow', colors.glow);
}

