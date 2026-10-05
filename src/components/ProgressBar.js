import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export const ProgressBar = ({
  progress = 0, // 0 to 100 or 0 to 1
  height = 8,
  color,
  backgroundColor,
  style,
}) => {
  const { colors } = useTheme();

  // Normalize progress to percentage (0 - 100)
  const normalizedProgress = Math.min(
    100,
    Math.max(0, progress <= 1 ? progress * 100 : progress)
  );

  return (
    <View
      style={[
        styles.track,
        {
          height,
          borderRadius: height / 2,
          backgroundColor: backgroundColor || colors.border,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${normalizedProgress}%`,
            height,
            borderRadius: height / 2,
            backgroundColor: color || colors.primary,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    transition: 'width 0.3s ease',
  },
});
