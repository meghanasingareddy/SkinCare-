import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../data/AppContext';
import { AppHeader } from '../components/AppHeader';
import { SoftCard } from '../components/SoftCard';
import { ProgressBar } from '../components/ProgressBar';

export const HomeScreen = () => {
  const { colors, isDark } = useTheme();
  const { navigate, nutrition, userProfile, routine } = useApp();
  const { width } = useWindowDimensions();
  const isWide = width >= 800;

  // Days of week selector
  const days = [
    { day: 'M', date: 12, label: 'Mon' },
    { day: 'T', date: 13, label: 'Tue' },
    { day: 'W', date: 14, label: 'Wed' },
    { day: 'T', date: 15, label: 'Thu' },
    { day: 'F', date: 16, label: 'Fri' },
    { day: 'S', date: 17, label: 'Sat' },
    { day: 'S', date: 18, label: 'Sun' },
  ];
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Calculate routine count
  const morningCompleted = routine.morning.reduce(
    (acc, cat) => acc + cat.items.filter((i) => i.completed).length,
    0
  );
  const morningTotal = routine.morning.reduce((acc, cat) => acc + cat.items.length, 0);

  const overviewCards = [
    {
      id: 'routine',
      label: 'Routine',
      value: `${morningCompleted}/${morningTotal}`,
      icon: '📋',
      bgColor: colors.routineBg,
      iconColor: colors.routineIcon,
      targetScreen: 'routine',
    },
    {
      id: 'water',
      label: 'Water',
      value: `${nutrition.waterCurrent} / ${nutrition.waterTarget} L`,
      icon: '💧',
      bgColor: colors.waterBg,
      iconColor: colors.waterIcon,
      targetScreen: 'nutrition',
    },
    {
      id: 'nutrition',
      label: 'Nutrition',
      value: '3/5 meals',
      icon: '🥗',
      bgColor: colors.nutritionBg,
      iconColor: colors.nutritionIcon,
      targetScreen: 'nutrition',
    },
    {
      id: 'steps',
      label: 'Steps',
      value: `${userProfile.stepsToday.toLocaleString()} / 5K`,
      icon: '👟',
      bgColor: colors.stepsBg,
      iconColor: colors.stepsIcon,
      targetScreen: 'progress',
    },
    {
      id: 'mood',
      label: 'Mood',
      value: 'Good',
      icon: '😊',
      bgColor: colors.moodBg,
      iconColor: colors.moodIcon,
      targetScreen: 'wellness',
    },
    {
      id: 'sleep',
      label: 'Sleep',
      value: '7h 20m',
      icon: '🌙',
      bgColor: colors.sleepBg,
      iconColor: colors.sleepIcon,
      targetScreen: 'wellness',
    },
  ];

  const quickActions = [
    { label: 'Routine', icon: '📋', screen: 'routine', tint: colors.routineBg },
    { label: 'Nutrition', icon: '🥗', screen: 'nutrition', tint: colors.nutritionBg },
    { label: 'Products', icon: '🧴', screen: 'products', tint: colors.waterBg },
    { label: 'Wellness', icon: '🧘‍♀️', screen: 'wellness', tint: colors.moodBg },
    { label: 'Progress', icon: '📊', screen: 'progress', tint: colors.primarySoft },
    { label: 'More Care', icon: '✨', screen: 'more_care', tint: colors.sleepBg },
    { label: 'Settings', icon: '⚙️', screen: 'profile', tint: colors.cardAlt },
  ];

  const progressSummary = [
    { label: 'Skincare', percent: 70 },
    { label: 'Haircare', percent: 50 },
    { label: 'Body Care', percent: 40 },
    { label: 'Nutrition', percent: 60 },
    { label: 'Hydration', percent: 60 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader isHome={true} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Row */}
        <View style={styles.dateRow}>
          <Text style={[styles.dateText, { color: colors.textSecondary }]}>
            Mon, 12 May 2025
          </Text>
        </View>

        {/* Days Horizontal Bar */}
        <View style={styles.weekDaysContainer}>
          {days.map((item, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedDayIndex(idx)}
                style={[
                  styles.dayPill,
                  isSelected && {
                    backgroundColor: colors.primary,
                    shadowColor: colors.primary,
                    shadowOpacity: 0.25,
                    shadowRadius: 6,
                    elevation: 3,
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.dayLetter,
                    {
                      color: isSelected
                        ? '#FFFFFF'
                        : isDark
                        ? colors.textSecondary
                        : colors.textPrimary,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {item.day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Overview Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Overview</Text>
        </View>

        {/* Responsive Grid for Overview Cards */}
        <View style={[styles.overviewGrid, isWide && styles.overviewGridWide]}>
          {overviewCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.overviewCard,
                isWide ? styles.overviewCardWide : styles.overviewCardMobile,
                {
                  backgroundColor: card.bgColor,
                  borderColor: colors.borderSubtle,
                },
              ]}
              onPress={() => navigate(card.targetScreen)}
              activeOpacity={0.8}
            >
              <View style={styles.cardIconBox}>
                <Text style={styles.cardEmoji}>{card.icon}</Text>
              </View>
              <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>
                {card.label}
              </Text>
              <Text style={[styles.cardValue, { color: colors.textPrimary }]}>
                {card.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Wide Layout: Today's Progress Column */}
        {isWide && (
          <View style={styles.desktopSplitSection}>
            <View style={{ flex: 1 }}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                  Today's Progress
                </Text>
              </View>
              <SoftCard style={{ padding: 20 }}>
                {progressSummary.map((item, idx) => (
                  <View key={idx} style={styles.progressRow}>
                    <Text style={[styles.progressLabel, { color: colors.textPrimary }]}>
                      {item.label}
                    </Text>
                    <View style={styles.progressBarWrapper}>
                      <ProgressBar progress={item.percent} color={colors.primary} />
                    </View>
                    <Text style={[styles.progressPercent, { color: colors.textSecondary }]}>
                      {item.percent}%
                    </Text>
                  </View>
                ))}
              </SoftCard>
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                  Quick Actions
                </Text>
              </View>
              <SoftCard style={{ padding: 20 }}>
                <View style={styles.quickActionsGridWide}>
                  {quickActions.map((action, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.quickActionItemWide}
                      onPress={() => navigate(action.screen)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.actionIconCircle, { backgroundColor: action.tint }]}>
                        <Text style={styles.actionIconEmoji}>{action.icon}</Text>
                      </View>
                      <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>
                        {action.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </SoftCard>
            </View>
          </View>
        )}

        {/* Mobile Quick Actions */}
        {!isWide && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                Quick Actions
              </Text>
            </View>
            <View style={styles.quickActionsContainer}>
              <View style={styles.quickActionsRow}>
                {quickActions.slice(0, 4).map((action, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.quickActionItem}
                    onPress={() => navigate(action.screen)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.actionIconCircle, { backgroundColor: action.tint }]}>
                      <Text style={styles.actionIconEmoji}>{action.icon}</Text>
                    </View>
                    <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>
                      {action.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={[styles.quickActionsRow, { marginTop: 14 }]}>
                {quickActions.slice(4).map((action, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.quickActionItem}
                    onPress={() => navigate(action.screen)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.actionIconCircle, { backgroundColor: action.tint }]}>
                      <Text style={styles.actionIconEmoji}>{action.icon}</Text>
                    </View>
                    <Text style={[styles.actionLabel, { color: colors.textPrimary }]}>
                      {action.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
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
    paddingBottom: 30,
  },
  dateRow: {
    marginTop: 12,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  dayPill: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLetter: {
    fontSize: 14,
  },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  overviewGridWide: {
    flexWrap: 'wrap',
    gap: 16,
  },
  overviewCard: {
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overviewCardMobile: {
    width: '30.5%',
    minHeight: 112,
  },
  overviewCardWide: {
    flexBasis: '15%',
    flexGrow: 1,
    minHeight: 120,
  },
  cardIconBox: {
    marginBottom: 8,
  },
  cardEmoji: {
    fontSize: 22,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  quickActionsContainer: {
    marginTop: 4,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    alignItems: 'center',
    width: '22%',
  },
  actionIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionIconEmoji: {
    fontSize: 22,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  desktopSplitSection: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 20,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  progressLabel: {
    width: 100,
    fontSize: 13,
    fontWeight: '500',
  },
  progressBarWrapper: {
    flex: 1,
    marginHorizontal: 14,
  },
  progressPercent: {
    width: 40,
    fontSize: 12,
    textAlign: 'right',
  },
  quickActionsGridWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  quickActionItemWide: {
    alignItems: 'center',
    width: 78,
  },
});
