import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../data/AppContext';
import { LotusLogo } from './LotusLogo';

export const Sidebar = () => {
  const { colors, accent, mode, setAccent, setMode } = useTheme();
  const { currentScreen, navigate } = useApp();

  const menuItems = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'routine', label: 'Routine', icon: '📋' },
    { key: 'products', label: 'Products', icon: '🧴' },
    { key: 'nutrition', label: 'Nutrition', icon: '🥗' },
    { key: 'wellness', label: 'Wellness', icon: '🧘‍♀️' },
    { key: 'progress', label: 'Progress', icon: '📊' },
    { key: 'more_care', label: 'More Care', icon: '✨' },
    { key: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <View
      style={[
        styles.sidebarContainer,
        {
          backgroundColor: colors.card,
          borderRightColor: colors.borderSubtle,
        },
      ]}
    >
      <View style={styles.logoHeader}>
        <LotusLogo size={36} showText={true} subtitle="Self-Care Companion" />
      </View>

      <ScrollView style={styles.menuScroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>MAIN MENU</Text>
        {menuItems.map((item) => {
          const isActive = currentScreen === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => navigate(item.key)}
              style={[
                styles.navItem,
                isActive && {
                  backgroundColor: colors.primarySoft,
                  borderLeftColor: colors.primary,
                  borderLeftWidth: 3,
                },
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.navIcon,
                  { color: isActive ? colors.primary : colors.textSecondary },
                ]}
              >
                {item.icon}
              </Text>
              <Text
                style={[
                  styles.navLabel,
                  {
                    color: isActive ? colors.primary : colors.textPrimary,
                    fontWeight: isActive ? '700' : '500',
                  },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Theme and Mode controls at bottom of sidebar */}
      <View style={[styles.bottomControlBox, { borderTopColor: colors.borderSubtle }]}>
        <Text style={[styles.controlLabel, { color: colors.textSecondary }]}>Theme Accent</Text>
        <View style={styles.accentToggleRow}>
          <TouchableOpacity
            onPress={() => setAccent('pink')}
            style={[
              styles.accentChip,
              accent === 'pink' && {
                borderColor: '#D96B91',
                backgroundColor: colors.primarySoft,
              },
            ]}
          >
            <View style={[styles.dot, { backgroundColor: '#D96B91' }]} />
            <Text
              style={[
                styles.chipText,
                { color: accent === 'pink' ? '#D96B91' : colors.textSecondary },
              ]}
            >
              Pink
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setAccent('blue')}
            style={[
              styles.accentChip,
              accent === 'blue' && {
                borderColor: '#5B83B7',
                backgroundColor: colors.primarySoft,
              },
            ]}
          >
            <View style={[styles.dot, { backgroundColor: '#5B83B7' }]} />
            <Text
              style={[
                styles.chipText,
                { color: accent === 'blue' ? '#5B83B7' : colors.textSecondary },
              ]}
            >
              Blue
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setMode(mode === 'light' ? 'dark' : 'light')}
          style={[styles.modeToggleRow, { backgroundColor: colors.cardAlt, borderColor: colors.border }]}
        >
          <Text style={{ fontSize: 14 }}>{mode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    width: 250,
    borderRightWidth: 1,
    height: '100%',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  logoHeader: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  menuScroll: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    paddingHorizontal: 22,
    marginBottom: 10,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 12,
    marginBottom: 4,
    borderRadius: 12,
  },
  navIcon: {
    fontSize: 18,
    marginRight: 14,
  },
  navLabel: {
    fontSize: 14,
    letterSpacing: -0.1,
  },
  bottomControlBox: {
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  controlLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  accentToggleRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  accentChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  modeToggleRow: {
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
