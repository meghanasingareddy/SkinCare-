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
import {
  IconFace,
  IconHair,
  IconBody,
  IconOral,
  IconNutrition,
  IconWaterDrop,
  IconProgress,
  IconWellness,
} from '../components/Icons';

export const ProgressScreen = () => {
  const { colors } = useTheme();
  const { progress, navigate } = useApp();
  const [activeTab, setActiveTab] = useState('weekly'); // 'weekly' | 'monthly'

  const iconMapping = {
    skincare: IconFace,
    haircare: IconHair,
    bodycare: IconBody,
    oralcare: IconOral,
    nutrition: IconNutrition,
    hydration: IconWaterDrop,
    fitness: IconProgress,
    wellness: IconWellness,
    grooming: IconFace,
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Habit Consistency"
        showBack={true}
        onBack={() => navigate('home')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Subtle Tab Switcher */}
        <View style={[styles.tabBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'weekly' && { backgroundColor: colors.primarySoft }]}
            onPress={() => setActiveTab('weekly')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'weekly' ? colors.primary : colors.textSecondary, fontWeight: activeTab === 'weekly' ? '600' : '400' },
              ]}
            >
              Weekly Overview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'monthly' && { backgroundColor: colors.primarySoft }]}
            onPress={() => setActiveTab('monthly')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'monthly' ? colors.primary : colors.textSecondary, fontWeight: activeTab === 'monthly' ? '600' : '400' },
              ]}
            >
              Monthly Rhythm
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date Subtitle */}
        <View style={styles.dateHeader}>
          <Text style={[styles.dateRange, { color: colors.textSecondary }]}>
            {activeTab === 'weekly' ? 'May 5 – 11, 2025' : 'May 2025'}
          </Text>
        </View>

        {/* Category Progress Bars */}
        <SoftCard style={{ padding: 18, marginBottom: 24 }} borderRadius={20}>
          {progress.categories
            .filter((c) => c.enabled)
            .map((cat, idx, arr) => {
              const IconComp = iconMapping[cat.id] || IconFace;
              return (
                <View
                  key={cat.id}
                  style={[
                    styles.progressRow,
                    idx < arr.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
                  ]}
                >
                  <View style={[styles.iconBox, { backgroundColor: colors.cardAlt }]}>
                    <IconComp size={16} color={colors.primary} />
                  </View>

                  <View style={styles.barBox}>
                    <View style={styles.barLabelRow}>
                      <Text style={[styles.catName, { color: colors.textPrimary }]}>
                        {cat.label}
                      </Text>
                      <Text style={[styles.catPercent, { color: colors.primary }]}>
                        {cat.percentage}%
                      </Text>
                    </View>
                    <ProgressBar
                      progress={cat.percentage}
                      color={colors.primary}
                      height={6}
                      style={{ marginTop: 6 }}
                    />
                  </View>
                </View>
              );
            })}
        </SoftCard>

        {/* Streak & Consistency Metrics */}
        <View style={styles.metricsGrid}>
          <SoftCard style={styles.metricCard} padding={16} borderRadius={16}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Current Streak</Text>
            <Text style={[styles.metricVal, { color: colors.textPrimary }]}>
              {progress.currentStreak} <Text style={styles.metricUnit}>Days</Text>
            </Text>
            <Text style={[styles.metricSub, { color: colors.success }]}>Consistent momentum</Text>
          </SoftCard>

          <SoftCard style={styles.metricCard} padding={16} borderRadius={16}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Best Streak</Text>
            <Text style={[styles.metricVal, { color: colors.textPrimary }]}>
              {progress.longestStreak} <Text style={styles.metricUnit}>Days</Text>
            </Text>
            <Text style={[styles.metricSub, { color: colors.textMuted }]}>Personal record</Text>
          </SoftCard>

          <SoftCard style={styles.metricCard} padding={16} borderRadius={16}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Completion Rate</Text>
            <Text style={[styles.metricVal, { color: colors.textPrimary }]}>
              {progress.weeklyCompletion}%
            </Text>
            <Text style={[styles.metricSub, { color: colors.textMuted }]}>Across all habits</Text>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    padding: 3,
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 13,
  },
  tabText: {
    fontSize: 13,
  },
  dateHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  dateRange: {
    fontSize: 13,
    fontWeight: '500',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  barBox: {
    flex: 1,
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  catName: {
    fontSize: 13,
    fontWeight: '500',
  },
  catPercent: {
    fontSize: 13,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
  },
  metricVal: {
    fontSize: 18,
    fontWeight: '700',
  },
  metricUnit: {
    fontSize: 12,
    fontWeight: '400',
  },
  metricSub: {
    fontSize: 11,
    marginTop: 4,
  },
});
