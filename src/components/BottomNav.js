import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../data/AppContext';
import { IconHome, IconRoutine, IconProgress, IconProfile } from './Icons';

export const BottomNav = () => {
  const { colors } = useTheme();
  const { currentScreen, navigate } = useApp();

  const navItems = [
    { key: 'home', label: 'Home', IconComponent: IconHome },
    { key: 'routine', label: 'Routine', IconComponent: IconRoutine },
    { key: 'progress', label: 'Progress', IconComponent: IconProgress },
    { key: 'profile', label: 'Profile', IconComponent: IconProfile },
  ];

  return (
    <View
      style={[
        styles.navContainer,
        {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
      ]}
    >
      {navItems.map((item) => {
        const isActive = currentScreen === item.key;
        const IconComponent = item.IconComponent;
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
              <IconComponent
                size={20}
                color={isActive ? colors.primary : colors.textSecondary}
              />
            </View>
            <Text
              style={[
                styles.navLabel,
                {
                  color: isActive ? colors.primary : colors.textSecondary,
                  fontWeight: isActive ? '600' : '400',
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
    height: 62,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 6,
    paddingTop: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 11,
    letterSpacing: 0.1,
  },
});
