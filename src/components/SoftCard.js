import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export const SoftCard = ({
  children,
  style,
  onPress,
  variant = 'default', // 'default', 'subtle', 'highlight'
  padding = 16,
  borderRadius = 20,
}) => {
  const { colors, isDark } = useTheme();

  const getBackgroundColor = () => {
    if (variant === 'subtle') return colors.cardAlt;
    if (variant === 'highlight') return colors.primarySoft;
    return colors.card;
  };

  const getBorderColor = () => {
    if (variant === 'highlight') return colors.primaryBorder;
    return colors.border;
  };

  const cardStyle = [
    styles.card,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      padding,
      borderRadius,
      shadowColor: isDark ? '#000000' : '#8A95A5',
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
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    overflow: 'hidden',
  },
});
