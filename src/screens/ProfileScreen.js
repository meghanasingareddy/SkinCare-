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
import {
  IconProfile,
  IconFace,
  IconHair,
  IconProducts,
  IconSun,
  IconMoon,
  IconBell,
  IconChevronRight,
  IconSettings,
} from '../components/Icons';

export const ProfileScreen = () => {
  const { colors, isDark, toggleMode } = useTheme();
  const { userProfile, navigate } = useApp();

  const profileRows = [
    {
      id: 'skin',
      label: 'Skin Profile',
      value: userProfile.skinType,
      IconComponent: IconFace,
      onPress: () => alert(`Skin Profile: ${userProfile.skinType}`),
    },
    {
      id: 'hair',
      label: 'Hair Profile',
      value: userProfile.hairType,
      IconComponent: IconHair,
      onPress: () => alert(`Hair Profile: ${userProfile.hairType}`),
    },
    {
      id: 'goals',
      label: 'Daily Care Goals',
      value: '5K Steps, 2.5L Hydration',
      IconComponent: IconSettings,
      onPress: () => navigate('more_care'),
    },
    {
      id: 'products',
      label: 'My Products Shelf',
      value: '7 Products Tracked',
      IconComponent: IconProducts,
      onPress: () => navigate('products'),
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
        {/* Clean Profile Header */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatarCircle, { backgroundColor: colors.primarySoft }]}>
            <IconProfile size={32} color={colors.primary} />
          </View>

          <View style={styles.headerInfo}>
            <Text style={[styles.profileName, { color: colors.textPrimary }]}>
              {userProfile.name}
            </Text>
            <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
              {userProfile.email}
            </Text>
          </View>
        </View>

        {/* Section: Care Profile */}
        <Text style={[styles.sectionHeading, { color: colors.textSecondary }]}>
          CARE & SKIN PROFILE
        </Text>

        <SoftCard style={styles.cardGroup} padding={4} borderRadius={18}>
          {profileRows.map((row, idx) => {
            const IconComponent = row.IconComponent;
            return (
              <TouchableOpacity
                key={row.id}
                style={[
                  styles.settingsRow,
                  idx < profileRows.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
                ]}
                onPress={row.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.rowLeft}>
                  <View style={[styles.rowIconBox, { backgroundColor: colors.cardAlt }]}>
                    <IconComponent size={17} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>
                      {row.label}
                    </Text>
                    <Text style={[styles.rowValue, { color: colors.textSecondary }]}>
                      {row.value}
                    </Text>
                  </View>
                </View>

                <IconChevronRight size={14} color={colors.textMuted} />
              </TouchableOpacity>
            );
          })}
        </SoftCard>

        {/* Section: Appearance & Preferences */}
        <Text style={[styles.sectionHeading, { color: colors.textSecondary, marginTop: 28 }]}>
          PREFERENCES
        </Text>

        <SoftCard style={styles.cardGroup} padding={4} borderRadius={18}>
          {/* Appearance Toggle */}
          <View style={[styles.settingsRow, { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle }]}>
            <View style={styles.rowLeft}>
              <View style={[styles.rowIconBox, { backgroundColor: colors.cardAlt }]}>
                {isDark ? (
                  <IconMoon size={17} color={colors.primary} />
                ) : (
                  <IconSun size={17} color={colors.primary} />
                )}
              </View>
              <View>
                <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>
                  Dark Appearance
                </Text>
                <Text style={[styles.rowValue, { color: colors.textSecondary }]}>
                  {isDark ? 'Deep charcoal aesthetic' : 'Warm editorial light mode'}
                </Text>
              </View>
            </View>

            <Switch
              value={isDark}
              onValueChange={toggleMode}
              trackColor={{
                false: '#E0D8DA',
                true: colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Notifications */}
          <TouchableOpacity
            style={[styles.settingsRow, { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle }]}
            onPress={() => alert('Gentle routine and hydration reminders are configured.')}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.rowIconBox, { backgroundColor: colors.cardAlt }]}>
                <IconBell size={17} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>
                  Ritual Reminders
                </Text>
                <Text style={[styles.rowValue, { color: colors.textSecondary }]}>
                  Morning 07:30 AM • Evening 10:30 PM
                </Text>
              </View>
            </View>

            <IconChevronRight size={14} color={colors.textMuted} />
          </TouchableOpacity>

          {/* Sync & Account */}
          <TouchableOpacity
            style={styles.settingsRow}
            onPress={() => alert('Syncing your self-care routines to your account.')}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.rowIconBox, { backgroundColor: colors.cardAlt }]}>
                <IconSettings size={17} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles.rowTitle, { color: colors.textPrimary }]}>
                  Account & Data
                </Text>
                <Text style={[styles.rowValue, { color: colors.textSecondary }]}>
                  Private local storage & synchronization
                </Text>
              </View>
            </View>

            <IconChevronRight size={14} color={colors.textMuted} />
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  avatarCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  profileEmail: {
    fontSize: 13,
    marginTop: 3,
  },
  sectionHeading: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  cardGroup: {
    marginBottom: 4,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  rowIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  rowValue: {
    fontSize: 12,
    marginTop: 2,
  },
});
