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
  IconSun,
  IconMoon,
  IconWaterDrop,
  IconNutrition,
  IconCheck,
  IconChevronRight,
  IconPlus,
} from '../components/Icons';

export const HomeScreen = () => {
  const { colors } = useTheme();
  const {
    navigate,
    nutrition,
    addWater,
    toggleMeal,
    wellness,
    routine,
    toggleRoutineItem,
  } = useApp();

  const days = [
    { label: 'Mon', date: 12, completed: true },
    { label: 'Tue', date: 13, completed: true },
    { label: 'Wed', date: 14, completed: true },
    { label: 'Thu', date: 15, completed: false },
    { label: 'Fri', date: 16, completed: true },
    { label: 'Sat', date: 17, completed: false },
    { label: 'Sun', date: 18, completed: false },
  ];
  const [selectedDay, setSelectedDay] = useState(0);

  // Routine counts
  const morningItems = routine.morning.flatMap((cat) => cat.items);
  const completedMorning = morningItems.filter((i) => i.completed).length;
  const totalMorning = morningItems.length;

  const nightItems = routine.night.flatMap((cat) => cat.items);
  const completedNight = nightItems.filter((i) => i.completed).length;
  const totalNight = nightItems.length;

  const totalRoutine = totalMorning + totalNight;
  const completedRoutine = completedMorning + completedNight;
  const progressPercent = Math.round((completedRoutine / totalRoutine) * 100);

  // Mood label
  const moodLabels = {
    very_low: 'Low Energy',
    low: 'Tired',
    okay: 'Balanced',
    good: 'Good & Calm',
    very_good: 'Vibrant',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader isHome={true} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Editorial Greeting Header */}
        <View style={styles.headerHero}>
          <Text style={[styles.greetingTitle, { color: colors.textPrimary }]}>
            Good morning, Meghana
          </Text>
          <Text style={[styles.greetingSubtitle, { color: colors.textSecondary }]}>
            Let's take care of you today.
          </Text>
        </View>

        {/* Primary Daily Progress Card */}
        <SoftCard style={styles.progressCard} padding={22}>
          <View style={styles.progressHeaderRow}>
            <View>
              <Text style={[styles.sectionOverline, { color: colors.textSecondary }]}>
                TODAY'S PROGRESS
              </Text>
              <Text style={[styles.progressNumber, { color: colors.textPrimary }]}>
                {progressPercent}%
              </Text>
            </View>
            <View style={[styles.routinePill, { backgroundColor: colors.primarySoft }]}>
              <Text style={[styles.routinePillText, { color: colors.primary }]}>
                {completedRoutine} of {totalRoutine} habits
              </Text>
            </View>
          </View>

          <ProgressBar
            progress={progressPercent}
            color={colors.primary}
            height={8}
            style={{ marginTop: 14 }}
          />

          {/* Weekly Habit Consistency Dots */}
          <View style={[styles.weeklyRow, { borderTopColor: colors.borderSubtle }]}>
            {days.map((d, idx) => {
              const isSelected = selectedDay === idx;
              return (
                <TouchableOpacity
                  key={d.label}
                  onPress={() => setSelectedDay(idx)}
                  style={[
                    styles.dayCol,
                    isSelected && {
                      backgroundColor: colors.cardAlt,
                      borderRadius: 12,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.dayLabel, { color: colors.textSecondary }]}>
                    {d.label}
                  </Text>
                  <View
                    style={[
                      styles.dayDot,
                      {
                        backgroundColor: d.completed ? colors.primary : colors.border,
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </SoftCard>

        {/* Today's Routine Checklist Section */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
              Today's Routine
            </Text>
            <Text style={[styles.sectionSub, { color: colors.textSecondary }]}>
              {completedMorning} / {totalMorning} morning steps completed
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigate('routine')}
            style={styles.viewAllButton}
            activeOpacity={0.7}
          >
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
            <IconChevronRight size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Routine Steps Checklist */}
        <SoftCard style={styles.routineListCard} padding={8}>
          {routine.morning[0].items.slice(0, 5).map((step, idx) => (
            <TouchableOpacity
              key={step.id}
              style={[
                styles.stepRow,
                idx < 4 && { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
              ]}
              onPress={() => toggleRoutineItem('morning', 0, step.id)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkCircle,
                  step.completed && {
                    backgroundColor: colors.primarySoft,
                    borderColor: colors.primary,
                  },
                ]}
              >
                {step.completed && <IconCheck size={13} color={colors.primary} />}
              </View>
              <Text
                style={[
                  styles.stepTitle,
                  {
                    color: step.completed ? colors.textMuted : colors.textPrimary,
                    textDecorationLine: step.completed ? 'line-through' : 'none',
                  },
                ]}
              >
                {step.name}
              </Text>
              <Text style={[styles.stepCategory, { color: colors.textMuted }]}>
                Face Care
              </Text>
            </TouchableOpacity>
          ))}
        </SoftCard>

        {/* Compact Tracking Controls (Water, Meals, Mood, Sleep) */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
            Daily Wellness
          </Text>
        </View>

        <View style={styles.compactControlsGrid}>
          {/* Water Tracker */}
          <SoftCard style={styles.compactCard} padding={16} onPress={() => navigate('nutrition')}>
            <View style={styles.compactHeader}>
              <View style={[styles.compactIconBox, { backgroundColor: colors.waterSoft }]}>
                <IconWaterDrop size={16} color={colors.water} />
              </View>
              <TouchableOpacity
                onPress={() => addWater(0.25)}
                style={[styles.smallAddBtn, { backgroundColor: colors.waterSoft }]}
              >
                <IconPlus size={12} color={colors.water} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.compactValue, { color: colors.textPrimary }]}>
              {nutrition.waterCurrent} <Text style={styles.compactUnit}>/ {nutrition.waterTarget}L</Text>
            </Text>
            <Text style={[styles.compactLabel, { color: colors.textSecondary }]}>Hydration</Text>
          </SoftCard>

          {/* Meals Tracker */}
          <SoftCard style={styles.compactCard} padding={16} onPress={() => navigate('nutrition')}>
            <View style={styles.compactHeader}>
              <View style={[styles.compactIconBox, { backgroundColor: colors.successSoft }]}>
                <IconNutrition size={16} color={colors.success} />
              </View>
              <Text style={[styles.compactTag, { color: colors.success }]}>
                {Object.values(nutrition.meals).filter(Boolean).length}/4
              </Text>
            </View>
            <Text style={[styles.compactValue, { color: colors.textPrimary }]}>
              3 Meals
            </Text>
            <Text style={[styles.compactLabel, { color: colors.textSecondary }]}>Nourishment</Text>
          </SoftCard>

          {/* Mood Tracker */}
          <SoftCard style={styles.compactCard} padding={16} onPress={() => navigate('wellness')}>
            <View style={styles.compactHeader}>
              <View style={[styles.compactIconBox, { backgroundColor: colors.primarySoft }]}>
                <IconSun size={16} color={colors.primary} />
              </View>
            </View>
            <Text style={[styles.compactValue, { color: colors.textPrimary }]}>
              {moodLabels[wellness.mood] || 'Balanced'}
            </Text>
            <Text style={[styles.compactLabel, { color: colors.textSecondary }]}>Current Mood</Text>
          </SoftCard>

          {/* Sleep Tracker */}
          <SoftCard style={styles.compactCard} padding={16} onPress={() => navigate('wellness')}>
            <View style={styles.compactHeader}>
              <View style={[styles.compactIconBox, { backgroundColor: colors.moonNightSoft }]}>
                <IconMoon size={16} color={colors.moonNight} />
              </View>
            </View>
            <Text style={[styles.compactValue, { color: colors.textPrimary }]}>
              {wellness.sleep.duration}
            </Text>
            <Text style={[styles.compactLabel, { color: colors.textSecondary }]}>Rest & Recovery</Text>
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
    paddingTop: 8,
    paddingBottom: 40,
  },
  headerHero: {
    marginVertical: 18,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  greetingSubtitle: {
    fontSize: 14,
    marginTop: 4,
    letterSpacing: 0.1,
  },
  progressCard: {
    marginBottom: 26,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sectionOverline: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  progressNumber: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    marginTop: 4,
  },
  routinePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  routinePillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  weeklyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  dayCol: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
  },
  dayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 6,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  sectionSub: {
    fontSize: 12,
    marginTop: 2,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  routineListCard: {
    marginBottom: 26,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#EDE5E7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  stepCategory: {
    fontSize: 12,
  },
  compactControlsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  compactCard: {
    width: '48%',
    flexGrow: 1,
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  compactIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallAddBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactTag: {
    fontSize: 11,
    fontWeight: '700',
  },
  compactValue: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  compactUnit: {
    fontSize: 12,
    fontWeight: '400',
  },
  compactLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});
