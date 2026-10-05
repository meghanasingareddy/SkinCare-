import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../data/AppContext';
import { LotusLogo } from './LotusLogo';
import {
  IconHome,
  IconRoutine,
  IconProducts,
  IconNutrition,
  IconWellness,
  IconProgress,
  IconMoreCare,
  IconProfile,
  IconSun,
  IconMoon,
} from './Icons';

export const Sidebar = () => {
  const { colors, isDark, toggleMode } = useTheme();
  const { currentScreen, navigate } = useApp();

  const menuItems = [
    { key: 'home', label: 'Home', IconComponent: IconHome },
    { key: 'routine', label: 'Routine', IconComponent: IconRoutine },
    { key: 'products', label: 'Products', IconComponent: IconProducts },
    { key: 'nutrition', label: 'Nutrition', IconComponent: IconNutrition },
    { key: 'wellness', label: 'Wellness', IconComponent: IconWellness },
    { key: 'progress', label: 'Progress', IconComponent: IconProgress },
    { key: 'more_care', label: 'More Care', IconComponent: IconMoreCare },
    { key: 'profile', label: 'Profile', IconComponent: IconProfile },
  ];

  return (
    <View
      style={[
        styles.sidebarContainer,
        {
          backgroundColor: colors.card,
          borderRightColor: colors.border,
        },
      ]}
    >
      <View style={styles.logoHeader}>
        <LotusLogo size={26} showText={true} subtitle="Skincare & Wellness" />
      </View>

      <ScrollView style={styles.menuScroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>MENU</Text>
        {menuItems.map((item) => {
          const isActive = currentScreen === item.key;
          const IconComponent = item.IconComponent;
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => navigate(item.key)}
              style={[
                styles.navItem,
                isActive && {
                  backgroundColor: colors.primarySoft,
                },
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.iconBox}>
                <IconComponent
                  size={18}
                  color={isActive ? colors.primary : colors.textSecondary}
                />
              </View>
              <Text
                style={[
                  styles.navLabel,
                  {
                    color: isActive ? colors.primary : colors.textPrimary,
                    fontWeight: isActive ? '600' : '400',
                  },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Subtle Mode Toggle at bottom */}
      <View style={[styles.bottomControlBox, { borderTopColor: colors.borderSubtle }]}>
        <TouchableOpacity
          onPress={toggleMode}
          style={[styles.modeToggleRow, { backgroundColor: colors.cardAlt, borderColor: colors.border }]}
          activeOpacity={0.7}
        >
          {isDark ? (
            <IconSun size={15} color={colors.textSecondary} />
          ) : (
            <IconMoon size={15} color={colors.textSecondary} />
          )}
          <Text style={[styles.modeText, { color: colors.textSecondary }]}>
            {isDark ? 'Light Appearance' : 'Dark Appearance'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    width: 228,
    borderRightWidth: 1,
    height: '100%',
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  logoHeader: {
    paddingHorizontal: 22,
    marginBottom: 28,
  },
  menuScroll: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginBottom: 4,
    borderRadius: 12,
  },
  iconBox: {
    width: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  navLabel: {
    fontSize: 14,
    letterSpacing: -0.1,
  },
  bottomControlBox: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  modeToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  modeText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
