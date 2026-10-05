import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../data/AppContext';
import { LotusLogo } from './LotusLogo';

export const AppHeader = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightActions,
  isHome = false,
}) => {
  const { colors, mode, accent, toggleMode, toggleAccent } = useTheme();
  const { goBack, navigate } = useApp();

  return (
    <View style={[styles.headerContainer, { borderBottomColor: colors.borderSubtle }]}>
      <View style={styles.leftSection}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBack || goBack}
            style={[styles.iconButton, { backgroundColor: colors.cardAlt, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.iconText, { color: colors.textPrimary }]}>‹</Text>
          </TouchableOpacity>
        ) : isHome ? (
          <LotusLogo size={32} showText={true} />
        ) : null}

        {title && !isHome && (
          <View style={styles.titleContainer}>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{title}</Text>
            {subtitle && (
              <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                {subtitle}
              </Text>
            )}
          </View>
        )}
      </View>

      <View style={styles.rightSection}>
        {rightActions ? (
          rightActions
        ) : (
          <>
            {/* Quick theme accent toggle (Pink / Blue) */}
            <TouchableOpacity
              onPress={toggleAccent}
              style={[
                styles.themeBubble,
                {
                  backgroundColor: accent === 'pink' ? '#D96B91' : '#5B83B7',
                  borderColor: colors.card,
                },
              ]}
              title={`Switch accent (currently ${accent})`}
            >
              <Text style={styles.themeBubbleText}>
                {accent === 'pink' ? '🌸' : '💧'}
              </Text>
            </TouchableOpacity>

            {/* Light / Dark Mode Toggle */}
            <TouchableOpacity
              onPress={toggleMode}
              style={[
                styles.iconButton,
                { backgroundColor: colors.cardAlt, borderColor: colors.border },
              ]}
              activeOpacity={0.7}
              title={`Switch to ${mode === 'light' ? 'Dark' : 'Light'} mode`}
            >
              <Text style={[styles.modeIcon, { color: colors.textPrimary }]}>
                {mode === 'light' ? '🌙' : '☀️'}
              </Text>
            </TouchableOpacity>

            {/* Notification Bell */}
            <TouchableOpacity
              style={[
                styles.iconButton,
                { backgroundColor: colors.cardAlt, borderColor: colors.border },
              ]}
              activeOpacity={0.7}
              onPress={() => alert('All routines and reminders are up to date! 🌸')}
            >
              <Text style={[styles.modeIcon, { color: colors.textPrimary }]}>🔔</Text>
            </TouchableOpacity>

            {/* Profile Avatar / Shortcut */}
            <TouchableOpacity
              style={[
                styles.iconButton,
                { backgroundColor: colors.primarySoft, borderColor: colors.primaryBorder },
              ]}
              activeOpacity={0.7}
              onPress={() => navigate('profile')}
            >
              <Text style={{ fontSize: 16 }}>👤</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleContainer: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '300',
  },
  modeIcon: {
    fontSize: 15,
  },
  themeBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeBubbleText: {
    fontSize: 12,
  },
});
