import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../data/AppContext';
import { LotusLogo } from '../components/LotusLogo';
import { IconSun, IconMoon } from '../components/Icons';

export const SplashScreen = () => {
  const { colors, isDark, toggleMode } = useTheme();
  const { navigate } = useApp();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        { backgroundColor: colors.background },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.contentCard}>
        {/* Subtle Theme Pill at top right */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={toggleMode}
            style={[styles.modeToggle, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            {isDark ? (
              <IconSun size={15} color={colors.textSecondary} />
            ) : (
              <IconMoon size={15} color={colors.textSecondary} />
            )}
            <Text style={[styles.modeToggleText, { color: colors.textSecondary }]}>
              {isDark ? 'Light' : 'Dark'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Centered Brand Hero */}
        <View style={styles.heroSection}>
          <View style={[styles.lotusCircle, { backgroundColor: colors.primarySoft }]}>
            <LotusLogo size={42} showText={false} centered={true} />
          </View>

          <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>
            Glow<Text style={{ color: colors.primary }}>Track</Text>
          </Text>

          <Text style={[styles.tagline, { color: colors.primary }]}>
            Your personal self-care companion
          </Text>

          <Text style={[styles.supportingText, { color: colors.textSecondary }]}>
            Mindful skincare routines, daily nourishment, gentle hydration, and wellness rituals designed around your lifestyle.
          </Text>
        </View>

        {/* Action Button & Subtle Details */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.88}
            onPress={() => navigate('home')}
          >
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>

          <Text style={[styles.discreetFooter, { color: colors.textMuted }]}>
            Personalized • Privacy First • Cross-Platform
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  contentCard: {
    maxWidth: 440,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  modeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  modeToggleText: {
    fontSize: 12,
    fontWeight: '500',
  },
  heroSection: {
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 20,
  },
  lotusCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  tagline: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
    letterSpacing: 0.2,
  },
  supportingText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 14,
    maxWidth: 340,
  },
  actionSection: {
    width: '100%',
    marginTop: 36,
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#B85C78',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  discreetFooter: {
    fontSize: 12,
    marginTop: 18,
    letterSpacing: 0.3,
  },
});
