import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../data/AppContext';

export const BottomNav = () => {
  const { colors } = useTheme();
  const { currentScreen, navigate } = useApp();

  const navItems = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'routine', label: 'Routine', icon: '📋' },
    { key: 'progress', label: 'Progress', icon: '📊' },
    { key: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <View
      style={[
        styles.navContainer,
        {
          backgroundColor: colors.card,
          borderTopColor: colors.borderSubtle,
        },
      ]}
    >
      {navItems.map((item) => {
        const isActive = currentScreen === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => navigate(item.key)}
            style={styles.navItem}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconWrapper,
                isActive && {
                  backgroundColor: colors.primarySoft,
                  borderRadius: 16,
                },
              ]}
            >
              <Text
                style={[
                  styles.navIcon,
                  { color: isActive ? colors.primary : colors.textMuted },
                ]}
              >
                {item.icon}
              </Text>
            </View>
            <Text
              style={[
                styles.navLabel,
                {
                  color: isActive ? colors.primary : colors.textSecondary,
                  fontWeight: isActive ? '700' : '500',
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 6,
    paddingTop: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 19,
  },
  navLabel: {
    fontSize: 11,
    letterSpacing: 0.1,
  },
});
