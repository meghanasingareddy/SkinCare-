import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export const LotusLogo = ({ size = 32, showText = true, subtitle = null, centered = false }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, centered && styles.centered]}>
      <View
        style={[
          styles.iconContainer,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors.primarySoft,
          },
        ]}
      >
        <Text style={[styles.lotusIcon, { fontSize: size * 0.55 }]}>🪷</Text>
      </View>
      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>
            Glow<Text style={{ color: colors.primary }}>Track</Text>
          </Text>
          {subtitle && (
            <Text style={[styles.brandSubtitle, { color: colors.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centered: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lotusIcon: {
    textAlign: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  brandSubtitle: {
    fontSize: 13,
    marginTop: 2,
    fontWeight: '400',
  },
});
