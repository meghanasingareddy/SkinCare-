import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../data/AppContext';
import { AppHeader } from '../components/AppHeader';
import { SoftCard } from '../components/SoftCard';

export const ProfileScreen = () => {
  const { colors, accent, mode, setAccent, setMode, isDark } = useTheme();
  const { userProfile, navigate } = useApp();

  const profileMenuItems = [
    {
      id: 'skin',
      label: 'Skin Profile',
      value: userProfile.skinType,
      icon: '🧖‍♀️',
      onPress: () => alert(`Skin Profile: ${userProfile.skinType}`),
    },
    {
      id: 'hair',
      label: 'Hair Profile',
      value: userProfile.hairType,
      icon: '💇‍♀️',
      onPress: () => alert(`Hair Profile: ${userProfile.hairType}`),
    },
    {
      id: 'goals',
      label: 'Goals',
      value: 'Daily 5K Steps, 2.5L Water',
      icon: '🎯',
      onPress: () => navigate('more_care'),
    },
    {
      id: 'products',
      label: 'My Products',
      value: '7 Products',
      icon: '🧴',
      onPress: () => navigate('products'),
    },
  ];

  const themePresets = [
    {
      label: 'Blue + Light',
      accentVal: 'blue',
      modeVal: 'light',
      bg: '#FAF8FA',
      cardBg: '#FFFFFF',
      accentColor: '#5B83B7',
    },
    {
      label: 'Pink + Light',
      accentVal: 'pink',
      modeVal: 'light',
      bg: '#FAF8FA',
      cardBg: '#FFFFFF',
      accentColor: '#D96B91',
    },
    {
      label: 'Blue + Dark',
      accentVal: 'blue',
      modeVal: 'dark',
      bg: '#151719',
      cardBg: '#202326',
      accentColor: '#5B83B7',
    },
    {
      label: 'Pink + Dark',
      accentVal: 'pink',
      modeVal: 'dark',
      bg: '#151719',
      cardBg: '#202326',
      accentColor: '#D96B91',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Profile & Settings"
        showBack={true}
        onBack={() => navigate('home')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        <SoftCard style={styles.userCard} padding={18}>
          <View style={styles.userRow}>
            <View style={[styles.avatarCircle, { backgroundColor: colors.primarySoft }]}>
              <Text style={{ fontSize: 28 }}>👤</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.textPrimary }]}>
                {userProfile.name}
              </Text>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
                {userProfile.email}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.editProfileBtn, { backgroundColor: colors.cardAlt }]}
              onPress={() => alert('Profile editing modal')}
            >
              <Text style={{ fontSize: 13, color: colors.textSecondary }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </SoftCard>

        {/* Profile Settings List */}
        <SoftCard style={{ padding: 6, marginTop: 14 }}>
          {profileMenuItems.map((item, idx) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuRow,
                idx < profileMenuItems.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderSubtle,
                },
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <View style={[styles.menuIconCircle, { backgroundColor: colors.cardAlt }]}>
                  <Text style={{ fontSize: 16 }}>{item.icon}</Text>
                </View>
                <View>
                  <Text style={[styles.menuLabel, { color: colors.textPrimary }]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.menuVal, { color: colors.textMuted }]}>
                    {item.value}
                  </Text>
                </View>
              </View>

              <Text style={[styles.chevron, { color: colors.textMuted }]}>›</Text>
            </TouchableOpacity>
          ))}
        </SoftCard>

        {/* Section: APPEARANCE & THEMES (Screens 12 & 13) */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Theme & Appearance (Screen 13)
          </Text>
        </View>

        {/* Quick Accent & Mode Toggles */}
        <SoftCard style={{ padding: 14, marginTop: 4 }}>
          <View style={styles.toggleRow}>
            <View>
              <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>
                Theme Accent Color
              </Text>
              <Text style={[styles.settingSub, { color: colors.textSecondary }]}>
                Current: {accent === 'pink' ? 'Soft Pink' : 'Soft Blue'}
              </Text>
            </View>

            <View style={styles.accentButtonsRow}>
              <TouchableOpacity
                onPress={() => setAccent('pink')}
                style={[
                  styles.accentChoiceBtn,
                  { backgroundColor: '#D96B91' },
                  accent === 'pink' && styles.accentChoiceActive,
                ]}
              >
                {accent === 'pink' && <Text style={styles.checkText}>✓</Text>}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setAccent('blue')}
                style={[
                  styles.accentChoiceBtn,
                  { backgroundColor: '#5B83B7' },
                  accent === 'blue' && styles.accentChoiceActive,
                ]}
              >
                {accent === 'blue' && <Text style={styles.checkText}>✓</Text>}
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.toggleRow, { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.borderSubtle }]}>
            <View>
              <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>
                Dark Appearance
              </Text>
              <Text style={[styles.settingSub, { color: colors.textSecondary }]}>
                {isDark ? 'Dark Mode active' : 'Light Mode active'}
              </Text>
            </View>

            <Switch
              value={isDark}
              onValueChange={(val) => setMode(val ? 'dark' : 'light')}
              trackColor={{
                false: isDark ? '#3A3F47' : '#E2E5EA',
                true: colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>
        </SoftCard>

        {/* 4 Theme Presets Visual Gallery (Screen 13) */}
        <Text style={[styles.presetTitle, { color: colors.textPrimary }]}>
          4 Theme Switcher Gallery
        </Text>
        <View style={styles.presetGrid}>
          {themePresets.map((preset) => {
            const isCurrent = accent === preset.accentVal && mode === preset.modeVal;
            return (
              <TouchableOpacity
                key={preset.label}
                style={[
                  styles.presetCard,
                  {
                    backgroundColor: preset.cardBg,
                    borderColor: isCurrent ? preset.accentColor : colors.border,
                    borderWidth: isCurrent ? 2 : 1,
                  },
                ]}
                onPress={() => {
                  setAccent(preset.accentVal);
                  setMode(preset.modeVal);
                }}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.miniCardPreview,
                    { backgroundColor: preset.bg, borderColor: preset.accentColor },
                  ]}
                >
                  <View
                    style={[
                      styles.miniDot,
                      { backgroundColor: preset.accentColor },
                    ]}
                  />
                  <View
                    style={[
                      styles.miniBar,
                      { backgroundColor: preset.modeVal === 'dark' ? '#33383F' : '#EAE6EB' },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.presetLabel,
                    {
                      color: isCurrent
                        ? preset.accentColor
                        : preset.modeVal === 'dark'
                        ? '#F1F3F7'
                        : '#2B2D42',
                      fontWeight: isCurrent ? '700' : '500',
                    },
                  ]}
                >
                  {preset.label}
                </Text>
                {isCurrent && (
                  <Text style={[styles.activeTag, { color: preset.accentColor }]}>
                    Active
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Account & Notifications */}
        <SoftCard style={{ padding: 6, marginTop: 18 }}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => alert('Notification settings')}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconCircle, { backgroundColor: colors.cardAlt }]}>
                <Text style={{ fontSize: 16 }}>🔔</Text>
              </View>
              <Text style={[styles.menuLabel, { color: colors.textPrimary }]}>
                Notifications & Reminders
              </Text>
            </View>
            <Text style={[styles.chevron, { color: colors.textMuted }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuRow, { borderTopWidth: 1, borderTopColor: colors.borderSubtle }]}
            onPress={() => alert('Cloud synchronization')}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconCircle, { backgroundColor: colors.cardAlt }]}>
                <Text style={{ fontSize: 16 }}>☁️</Text>
              </View>
              <Text style={[styles.menuLabel, { color: colors.textPrimary }]}>
                Account & Sync
              </Text>
            </View>
            <Text style={[styles.chevron, { color: colors.textMuted }]}>›</Text>
          </TouchableOpacity>
        </SoftCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  userCard: {
    marginTop: 14,
    borderRadius: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  userEmail: {
    fontSize: 13,
    marginTop: 2,
  },
  editProfileBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  menuVal: {
    fontSize: 11,
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
  },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  settingSub: {
    fontSize: 12,
    marginTop: 2,
  },
  accentButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  accentChoiceBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentChoiceActive: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  presetTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 10,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  presetCard: {
    width: '48%',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  miniCardPreview: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    padding: 6,
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  miniDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  miniBar: {
    height: 6,
    borderRadius: 3,
    width: '80%',
  },
  presetLabel: {
    fontSize: 12,
  },
  activeTag: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
});
