import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { SvgIcon } from './Icons';

export const LotusLogo = ({ size = 28, showText = true, subtitle = null, centered = false }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, centered && styles.centered]}>
      <View
        style={[
          styles.iconBox,
          {
            width: size + 8,
            height: size + 8,
            borderRadius: (size + 8) / 2,
            backgroundColor: colors.primarySoft,
          },
        ]}
      >
        <SvgIcon size={size * 0.75} color={colors.primary} strokeWidth={1.8}>
          {/* Elegant geometric lotus petals */}
          <path d="M12 4c-1.5 3-4 6-4 9a4 4 0 0 0 8 0c0-3-2.5-6-4-9z" />
          <path d="M6 10c0 3 2 6 4 7-2 0-5-1.5-5-4 0-1.5.5-2.5 1-3z" />
          <path d="M18 10c0 3-2 6-4 7 2 0 5-1.5 5-4 0-1.5-.5-2.5-1-3z" />
        </SvgIcon>
      </View>

      {showText && (
        <View style={[styles.textWrapper, centered && styles.centeredText]}>
          <Text style={[styles.brandName, { color: colors.textPrimary }]}>
            Glow<Text style={{ color: colors.primary, fontWeight: '700' }}>Track</Text>
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
    alignItems: 'center',
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    marginLeft: 10,
  },
  centeredText: {
    marginLeft: 0,
    marginTop: 10,
    alignItems: 'center',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  brandSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 1,
    letterSpacing: 0.1,
  },
});
