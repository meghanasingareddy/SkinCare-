import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../data/AppContext';
import { AppHeader } from '../components/AppHeader';
import { SoftCard } from '../components/SoftCard';
import { ProgressBar } from '../components/ProgressBar';

export const ProgressScreen = () => {
  const { colors } = useTheme();
  const { progress, navigate } = useApp();

  const [activeTab, setActiveTab] = useState('weekly'); // 'weekly' | 'monthly'

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Progress"
        showBack={true}
        onBack={() => navigate('home')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Weekly / Monthly Toggle */}
        <View style={[styles.tabBar, { backgroundColor: colors.cardAlt }]}>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'weekly' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setActiveTab('weekly')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabBtnText,
                {
                  color: activeTab === 'weekly' ? '#FFFFFF' : colors.textSecondary,
                  fontWeight: activeTab === 'weekly' ? '700' : '500',
                },
              ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'monthly' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setActiveTab('monthly')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabBtnText,
                {
                  color: activeTab === 'monthly' ? '#FFFFFF' : colors.textSecondary,
                  fontWeight: activeTab === 'monthly' ? '700' : '500',
                },
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
        </View>

        {/* Section Heading & Date Subtitle */}
        <View style={styles.titleSection}>
          <Text style={[styles.mainProgressTitle, { color: colors.textPrimary }]}>
            Your {activeTab === 'weekly' ? 'Weekly' : 'Monthly'} Progress
          </Text>
          <Text style={[styles.dateRangeSubtitle, { color: colors.textSecondary }]}>
            {activeTab === 'weekly' ? '‹ 5 - 11 May 2025 ›' : '‹ May 2025 ›'}
          </Text>
        </View>

        {/* Category Progress Bars */}
        <SoftCard style={{ padding: 16, marginTop: 14 }}>
          {progress.categories
            .filter((c) => c.enabled)
            .map((cat, idx) => (
              <View
                key={cat.id}
                style={[
                  styles.categoryProgressRow,
                  idx < progress.categories.length - 1 && {
                    marginBottom: 16,
                  },
                ]}
              >
                <View style={[styles.iconCircle, { backgroundColor: colors.primarySoft }]}>
                  <Text style={{ fontSize: 16 }}>{cat.icon}</Text>
                </View>

                <View style={styles.barContainer}>
                  <View style={styles.labelRow}>
                    <Text style={[styles.catLabel, { color: colors.textPrimary }]}>
                      {cat.label}
                    </Text>
                    <Text style={[styles.percentLabel, { color: colors.textSecondary }]}>
                      {cat.percentage}%
                    </Text>
                  </View>
                  <ProgressBar
                    progress={cat.percentage}
                    color={colors.primary}
                    height={8}
                    style={{ marginTop: 6 }}
                  />
                </View>
              </View>
            ))}
        </SoftCard>

        {/* Streaks & Consistency Overview */}
        <View style={styles.statsGrid}>
          <SoftCard style={styles.statCard} padding={14}>
            <Text style={{ fontSize: 24, marginBottom: 4 }}>🔥</Text>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>
              {progress.currentStreak} Days
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Current Streak
            </Text>
          </SoftCard>

          <SoftCard style={styles.statCard} padding={14}>
            <Text style={{ fontSize: 24, marginBottom: 4 }}>🏆</Text>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>
              {progress.longestStreak} Days
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Best Streak
            </Text>
          </SoftCard>

          <SoftCard style={styles.statCard} padding={14}>
            <Text style={{ fontSize: 24, marginBottom: 4 }}>✨</Text>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>
              {progress.weeklyCompletion}%
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Completion
            </Text>
          </SoftCard>
        </View>
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
  tabBar: {
    flexDirection: 'row',
    borderRadius: 24,
    padding: 4,
    marginVertical: 14,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  tabBtnText: {
    fontSize: 14,
  },
  titleSection: {
    marginTop: 6,
    alignItems: 'center',
  },
  mainProgressTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  dateRangeSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  categoryProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  barContainer: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  percentLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
});
