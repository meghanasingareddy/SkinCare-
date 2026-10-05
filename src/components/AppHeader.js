import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../data/AppContext';
import { LotusLogo } from './LotusLogo';
import { IconChevronLeft, IconBell, IconSun, IconMoon, IconProfile } from './Icons';

export const AppHeader = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightActions,
  isHome = false,
}) => {
  const { colors, isDark, toggleMode } = useTheme();
  const { goBack, navigate } = useApp();

  return (
    <View style={[styles.headerContainer, { borderBottomColor: colors.borderSubtle }]}>
      <View style={styles.leftSection}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBack || goBack}
            style={[styles.iconButton, { borderColor: colors.border, backgroundColor: colors.card }]}
            activeOpacity={0.7}
          >
            <IconChevronLeft size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        ) : isHome ? (
          <LotusLogo size={24} showText={true} />
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
            {/* Minimal Dark/Light Mode toggle button */}
            <TouchableOpacity
              onPress={toggleMode}
              style={[styles.iconButton, { borderColor: colors.border, backgroundColor: colors.card }]}
              activeOpacity={0.7}
              accessibilityLabel="Toggle Theme"
            >
              {isDark ? (
                <IconSun size={17} color={colors.textPrimary} />
              ) : (
                <IconMoon size={17} color={colors.textPrimary} />
              )}
            </TouchableOpacity>

            {/* Notification Bell */}
            <TouchableOpacity
              style={[styles.iconButton, { borderColor: colors.border, backgroundColor: colors.card }]}
              activeOpacity={0.7}
              onPress={() => alert('All your self-care routines are on schedule.')}
            >
              <IconBell size={17} color={colors.textPrimary} />
            </TouchableOpacity>

            {/* Profile Avatar */}
            <TouchableOpacity
              style={[
                styles.iconButton,
                { backgroundColor: colors.primarySoft, borderColor: 'transparent' },
              ]}
              activeOpacity={0.7}
              onPress={() => navigate('profile')}
            >
              <IconProfile size={17} color={colors.primary} />
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
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  titleContainer: {
    marginLeft: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
