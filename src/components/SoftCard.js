import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export const SoftCard = ({
  children,
  style,
  onPress,
  variant = 'default', // 'default', 'subtle', 'highlight'
  padding = 20,
  borderRadius = 18,
  noBorder = false,
}) => {
  const { colors, isDark } = useTheme();

  const getBackgroundColor = () => {
    if (variant === 'subtle') return colors.cardAlt;
    if (variant === 'highlight') return colors.primarySoft;
    return colors.card;
  };

  const getBorderColor = () => {
    if (variant === 'highlight') return colors.primaryBorder;
    if (variant === 'subtle') return colors.borderSubtle;
    return colors.border;
  };

  const shadowStyle = Platform.select({
    web: {
      boxShadow: isDark
        ? '0 6px 20px -4px rgba(0, 0, 0, 0.35)'
        : '0 4px 16px -2px rgba(41, 37, 40, 0.04), 0 1px 3px rgba(41, 37, 40, 0.02)',
    },
    default: {
      shadowColor: '#292528',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.3 : 0.04,
      shadowRadius: 12,
      elevation: 1,
    },
  });

  const cardStyle = [
    styles.card,
    shadowStyle,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      padding,
      borderRadius,
      borderWidth: noBorder ? 0 : 1,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={cardStyle}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});
