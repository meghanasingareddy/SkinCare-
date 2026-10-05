import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

// Universal SVG icon wrapper (works flawlessly on Web and handles vector rendering)
export const SvgIcon = ({ size = 20, color = 'currentColor', strokeWidth = 1.8, children, viewBox = '0 0 24 24', style }) => {
  if (Platform.OS === 'web') {
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
      >
        {children}
      </svg>
    );
  }

  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      {/* Fallback container */}
    </View>
  );
};

export const IconHome = ({ size = 20, color = '#292528' }) => (
  <SvgIcon size={size} color={color}>
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />
  </SvgIcon>
);

export const IconRoutine = ({ size = 20, color = '#292528' }) => (
  <SvgIcon size={size} color={color}>
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M9 9h6M9 13h6M9 17h4" />
  </SvgIcon>
);

export const IconProducts = ({ size = 20, color = '#292528' }) => (
  <SvgIcon size={size} color={color}>
    <path d="M10 3h4v4h-4zM6 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
    <path d="M12 11v6M9 14h6" />
  </SvgIcon>
);

export const IconNutrition = ({ size = 20, color = '#292528' }) => (
  <SvgIcon size={size} color={color}>
    <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 14 7.5L21 21l-1.5-4A9 9 0 0 0 12 3z" />
    <path d="M12 12c2-2 4-3 7-3" />
  </SvgIcon>
);

export const IconWellness = ({ size = 20, color = '#292528' }) => (
  <SvgIcon size={size} color={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </SvgIcon>
);

export const IconProgress = ({ size = 20, color = '#292528' }) => (
  <SvgIcon size={size} color={color}>
    <path d="M18 20V10M12 20V4M6 20v-6" />
  </SvgIcon>
);

export const IconMoreCare = ({ size = 20, color = '#292528' }) => (
  <SvgIcon size={size} color={color}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83" />
  </SvgIcon>
);

export const IconProfile = ({ size = 20, color = '#292528' }) => (
  <SvgIcon size={size} color={color}>
    <circle cx="12" cy="7" r="4" />
    <path d="M5 21v-2a6 6 0 0 1 14 0v2" />
  </SvgIcon>
);

export const IconSun = ({ size = 20, color = '#C28359' }) => (
  <SvgIcon size={size} color={color}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </SvgIcon>
);

export const IconMoon = ({ size = 20, color = '#7B7599' }) => (
  <SvgIcon size={size} color={color}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </SvgIcon>
);

export const IconWaterDrop = ({ size = 20, color = '#6B90B2' }) => (
  <SvgIcon size={size} color={color}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </SvgIcon>
);

export const IconCheck = ({ size = 16, color = '#B85C78', strokeWidth = 2.2 }) => (
  <SvgIcon size={size} color={color} strokeWidth={strokeWidth}>
    <polyline points="20 6 9 17 4 12" />
  </SvgIcon>
);

export const IconCircleCheck = ({ size = 20, color = '#6E9B82' }) => (
  <SvgIcon size={size} color={color}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="16 9 11 14 8 11" />
  </SvgIcon>
);

export const IconCircleEmpty = ({ size = 20, color = '#EDE5E7' }) => (
  <SvgIcon size={size} color={color}>
    <circle cx="12" cy="12" r="9" />
  </SvgIcon>
);

export const IconSearch = ({ size = 18, color = '#81777B' }) => (
  <SvgIcon size={size} color={color}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </SvgIcon>
);

export const IconBell = ({ size = 18, color = '#292528' }) => (
  <SvgIcon size={size} color={color}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </SvgIcon>
);

export const IconChevronRight = ({ size = 16, color = '#81777B' }) => (
  <SvgIcon size={size} color={color}>
    <polyline points="9 18 15 12 9 6" />
  </SvgIcon>
);

export const IconChevronLeft = ({ size = 16, color = '#81777B' }) => (
  <SvgIcon size={size} color={color}>
    <polyline points="15 18 9 12 15 6" />
  </SvgIcon>
);

export const IconPencil = ({ size = 16, color = '#81777B' }) => (
  <SvgIcon size={size} color={color}>
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </SvgIcon>
);

export const IconPlus = ({ size = 18, color = '#B85C78' }) => (
  <SvgIcon size={size} color={color}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </SvgIcon>
);

export const IconSettings = ({ size = 18, color = '#81777B' }) => (
  <SvgIcon size={size} color={color}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </SvgIcon>
);

// Category Icons (Clean Minimal Outline)
export const IconFace = ({ size = 20, color = '#B85C78' }) => (
  <SvgIcon size={size} color={color}>
    <circle cx="12" cy="12" r="8" />
    <path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0" />
  </SvgIcon>
);

export const IconHair = ({ size = 20, color = '#B85C78' }) => (
  <SvgIcon size={size} color={color}>
    <path d="M12 4c-4 0-7 3.5-7 8 0 3 1.5 5 3 6 1.5 1 2.5 3 4 3s2.5-2 4-3c1.5-1 3-3 3-6 0-4.5-3-8-7-8z" />
    <path d="M12 4v10" />
  </SvgIcon>
);

export const IconBody = ({ size = 20, color = '#B85C78' }) => (
  <SvgIcon size={size} color={color}>
    <circle cx="12" cy="5" r="2" />
    <path d="M9 20l3-7 3 7M6 10l6 2 6-2" />
  </SvgIcon>
);

export const IconOral = ({ size = 20, color = '#B85C78' }) => (
  <SvgIcon size={size} color={color}>
    <path d="M7 4h10v3a5 5 0 0 1-10 0V4zM12 12v9" />
  </SvgIcon>
);

// Mood Face Icons (Minimal, clean, line faces)
export const IconMoodFace = ({ mood = 'good', size = 38, isSelected = false, activeColor = '#B85C78' }) => {
  const configs = {
    very_low: {
      mouth: <path d="M8 15a4 4 0 0 1 8 0" />,
      eyes: <path d="M8 9.5l1.5 1M16 9.5l-1.5 1" />,
    },
    low: {
      mouth: <path d="M9 14.5a3 3 0 0 1 6 0" />,
      eyes: <path d="M9 10h.01M15 10h.01" />,
    },
    okay: {
      mouth: <line x1="9" y1="14" x2="15" y2="14" />,
      eyes: <path d="M9 10h.01M15 10h.01" />,
    },
    good: {
      mouth: <path d="M8.5 13a3.5 3.5 0 0 0 7 0" />,
      eyes: <path d="M9 10h.01M15 10h.01" />,
    },
    very_good: {
      mouth: <path d="M8 12.5a4 4 0 0 0 8 0" />,
      eyes: <path d="M7.5 9.5a1.5 1.5 0 0 1 3 0M13.5 9.5a1.5 1.5 0 0 1 3 0" />,
    },
  };

  const current = configs[mood] || configs.good;

  return (
    <SvgIcon size={size} color={isSelected ? activeColor : '#81777B'} strokeWidth={isSelected ? 2 : 1.6}>
      <circle cx="12" cy="12" r="9" />
      {current.eyes}
      {current.mouth}
    </SvgIcon>
  );
};
