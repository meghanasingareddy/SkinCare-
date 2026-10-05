export const PALETTE = {
  pink: '#D96B91',
  pinkSoft: '#FBF0F4',
  pinkHover: '#C6587E',
  pinkLightBorder: '#F5DEE7',

  blue: '#5B83B7',
  blueSoft: '#EEF3F9',
  blueHover: '#4A6F9E',
  blueLightBorder: '#D8E3F0',

  lightBackground: '#FAF8FA',
  lightCard: '#FFFFFF',
  lightCardAlt: '#F5F3F6',
  lightBorder: '#F0EAF1',
  lightBorderSubtle: '#E8E2E9',
  lightTextPrimary: '#2B2D42',
  lightTextSecondary: '#7F8494',
  lightTextMuted: '#A0A5B5',

  darkBackground: '#151719',
  darkCard: '#202326',
  darkCardAlt: '#272B2F',
  darkBorder: '#2E3238',
  darkBorderSubtle: '#25292E',
  darkTextPrimary: '#F3F4F8',
  darkTextSecondary: '#9EA4B3',
  darkTextMuted: '#6B7280',

  // Soft pastel category colors from reference image
  pastelRoutineBg: '#FFF7EC',
  pastelRoutineIcon: '#E29547',
  pastelWaterBg: '#EBF4FE',
  pastelWaterIcon: '#4898F0',
  pastelNutritionBg: '#EDFAF0',
  pastelNutritionIcon: '#48B76E',
  pastelStepsBg: '#EDFAF3',
  pastelStepsIcon: '#38A169',
  pastelMoodBg: '#FFFBEA',
  pastelMoodIcon: '#D99B26',
  pastelSleepBg: '#F3EFFF',
  pastelSleepIcon: '#8260E6',

  // Dark equivalents for overview cards
  darkRoutineBg: '#2A241C',
  darkWaterBg: '#1B2433',
  darkNutritionBg: '#1B2C21',
  darkStepsBg: '#1B2D24',
  darkMoodBg: '#2E2818',
  darkSleepBg: '#27203B',

  // Status colors
  success: '#48BB78',
  warning: '#ED8936',
  danger: '#E53E3E',
};

export const getThemeColors = (accent = 'pink', mode = 'light') => {
  const isDark = mode === 'dark';
  const isPink = accent === 'pink';

  const primaryAccent = isPink ? PALETTE.pink : PALETTE.blue;
  const primarySoft = isPink
    ? (isDark ? '#3D242E' : PALETTE.pinkSoft)
    : (isDark ? '#1C293A' : PALETTE.blueSoft);
  const primaryBorder = isPink
    ? (isDark ? '#4D2B3B' : PALETTE.pinkLightBorder)
    : (isDark ? '#263B54' : PALETTE.blueLightBorder);

  return {
    accent,
    mode,
    isDark,
    isPink,
    primary: primaryAccent,
    primarySoft,
    primaryBorder,
    background: isDark ? PALETTE.darkBackground : PALETTE.lightBackground,
    card: isDark ? PALETTE.darkCard : PALETTE.lightCard,
    cardAlt: isDark ? PALETTE.darkCardAlt : PALETTE.lightCardAlt,
    border: isDark ? PALETTE.darkBorder : PALETTE.lightBorder,
    borderSubtle: isDark ? PALETTE.darkBorderSubtle : PALETTE.lightBorderSubtle,
    textPrimary: isDark ? PALETTE.darkTextPrimary : PALETTE.lightTextPrimary,
    textSecondary: isDark ? PALETTE.darkTextSecondary : PALETTE.lightTextSecondary,
    textMuted: isDark ? PALETTE.darkTextMuted : PALETTE.lightTextMuted,
    
    // Overview cards
    routineBg: isDark ? PALETTE.darkRoutineBg : PALETTE.pastelRoutineBg,
    routineIcon: PALETTE.pastelRoutineIcon,
    waterBg: isDark ? PALETTE.darkWaterBg : PALETTE.pastelWaterBg,
    waterIcon: PALETTE.pastelWaterIcon,
    nutritionBg: isDark ? PALETTE.darkNutritionBg : PALETTE.pastelNutritionBg,
    nutritionIcon: PALETTE.pastelNutritionIcon,
    stepsBg: isDark ? PALETTE.darkStepsBg : PALETTE.pastelStepsBg,
    stepsIcon: PALETTE.pastelStepsIcon,
    moodBg: isDark ? PALETTE.darkMoodBg : PALETTE.pastelMoodBg,
    moodIcon: PALETTE.pastelMoodIcon,
    sleepBg: isDark ? PALETTE.darkSleepBg : PALETTE.pastelSleepBg,
    sleepIcon: PALETTE.pastelSleepIcon,

    // Button text
    buttonText: '#FFFFFF',
    chipSelectedBg: primaryAccent,
    chipSelectedText: '#FFFFFF',
    chipUnselectedBg: isDark ? '#272B2F' : '#F2EFF2',
    chipUnselectedText: isDark ? PALETTE.darkTextSecondary : PALETTE.lightTextSecondary,
  };
};
