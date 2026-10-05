export const PALETTE = {
  // Editorial Skincare & Wellness Palette
  primary: '#B85C78',          // Deep rose / berry accent
  primaryHover: '#A44E68',
  primarySoft: '#F4DDE5',      // Soft rose pill / badge / active state
  primaryMuted: '#EED0DC',
  primaryShadow: 'rgba(184, 92, 120, 0.16)',

  // Surfaces & Backgrounds
  lightBackground: '#FAF8F6',   // Warm soft off-white
  lightCard: '#FFFFFF',         // Pure clean white surface
  lightCardAlt: '#F5F1EE',      // Subtle alternate surface
  lightBorder: '#EDE5E7',       // Crisp delicate border
  lightBorderSubtle: '#F4ECEE', // Hairline divider

  // Typography
  lightTextPrimary: '#292528',  // Deep charcoal/plum (high legibility)
  lightTextSecondary: '#81777B',// Muted warm slate
  lightTextMuted: '#A59BA0',    // Tertiary metadata

  // Functional Accents
  success: '#6E9B82',           // Muted sage green (skincare calm)
  successSoft: '#E8F2EC',
  water: '#6B90B2',             // Soft mineral blue for hydration
  waterSoft: '#EDF3F8',
  warmSun: '#C28359',           // Warm terracotta for morning
  warmSunSoft: '#FBF1EA',
  moonNight: '#7B7599',         // Dusty lilac for night
  moonNightSoft: '#F2EEFA',

  // Dark Mode (Deep charcoal / plum - no pure black)
  darkBackground: '#1C191B',
  darkCard: '#262225',
  darkCardAlt: '#302B2E',
  darkBorder: '#383135',
  darkBorderSubtle: '#2E282B',
  darkTextPrimary: '#F5F2F3',
  darkTextSecondary: '#A3989D',
  darkTextMuted: '#7A7075',
  darkPrimary: '#D47592',
  darkPrimarySoft: '#38222A',
  darkPrimaryBorder: '#4A2A37',
};

export const getThemeColors = (mode = 'light') => {
  const isDark = mode === 'dark';

  return {
    mode,
    isDark,
    primary: isDark ? PALETTE.darkPrimary : PALETTE.primary,
    primarySoft: isDark ? PALETTE.darkPrimarySoft : PALETTE.primarySoft,
    primaryBorder: isDark ? PALETTE.darkPrimaryBorder : PALETTE.primaryMuted,
    primaryShadow: isDark ? 'rgba(0,0,0,0.4)' : PALETTE.primaryShadow,

    background: isDark ? PALETTE.darkBackground : PALETTE.lightBackground,
    card: isDark ? PALETTE.darkCard : PALETTE.lightCard,
    cardAlt: isDark ? PALETTE.darkCardAlt : PALETTE.lightCardAlt,
    border: isDark ? PALETTE.darkBorder : PALETTE.lightBorder,
    borderSubtle: isDark ? PALETTE.darkBorderSubtle : PALETTE.lightBorderSubtle,

    textPrimary: isDark ? PALETTE.darkTextPrimary : PALETTE.lightTextPrimary,
    textSecondary: isDark ? PALETTE.darkTextSecondary : PALETTE.lightTextSecondary,
    textMuted: isDark ? PALETTE.darkTextMuted : PALETTE.lightTextMuted,

    success: PALETTE.success,
    successSoft: isDark ? '#1C2E24' : PALETTE.successSoft,
    water: PALETTE.water,
    waterSoft: isDark ? '#1D2A37' : PALETTE.waterSoft,
    warmSun: PALETTE.warmSun,
    warmSunSoft: isDark ? '#332319' : PALETTE.warmSunSoft,
    moonNight: PALETTE.moonNight,
    moonNightSoft: isDark ? '#272336' : PALETTE.moonNightSoft,

    buttonText: '#FFFFFF',
  };
};
