import React from 'react';
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
import {
  IconSun,
  IconMoon,
  IconCheck,
  IconCircleEmpty,
  IconPlus,
  IconPencil,
} from '../components/Icons';

export const RoutineScreen = () => {
  const { colors } = useTheme();
  const { routine, toggleRoutineItem, weeklyCare, navigate } = useApp();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 860;

  const renderRoutineSection = (timeKey, title, timeStr, IconComponent, color, softColor) => {
    const categories = routine[timeKey];
    const allItems = categories.flatMap((cat, catIdx) =>
      cat.items.map((item) => ({ ...item, catIdx, catName: cat.category }))
    );
    const completedCount = allItems.filter((i) => i.completed).length;
    const totalCount = allItems.length;
    const percent = Math.round((completedCount / totalCount) * 100);

    return (
      <SoftCard style={styles.routineSectionCard} padding={20} borderRadius={20}>
        {/* Section Header */}
        <View style={styles.routineHeader}>
          <View style={styles.routineHeaderLeft}>
            <View style={[styles.timeIconBox, { backgroundColor: softColor }]}>
              <IconComponent size={18} color={color} />
            </View>
            <View>
              <Text style={[styles.routineHeading, { color: colors.textPrimary }]}>
                {title}
              </Text>
              <Text style={[styles.routineTime, { color: colors.textSecondary }]}>
                {timeStr}
              </Text>
            </View>
          </View>

          <View style={styles.routineHeaderRight}>
            <Text style={[styles.routineScore, { color: colors.textPrimary }]}>
              {completedCount} <Text style={{ color: colors.textSecondary, fontWeight: '400' }}>/ {totalCount}</Text>
            </Text>
          </View>
        </View>

        {/* Delicate Progress bar */}
        <ProgressBar progress={percent} color={color} height={5} style={{ marginVertical: 14 }} />

        {/* Clean Vertical Timeline Checklist */}
        <View style={styles.stepsList}>
          {allItems.map((step, idx) => (
            <TouchableOpacity
              key={step.id}
              style={[
                styles.stepItem,
                idx < allItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
              ]}
              onPress={() => toggleRoutineItem(timeKey, step.catIdx, step.id)}
              activeOpacity={0.7}
            >
              <View style={styles.stepCheckboxArea}>
                {step.completed ? (
                  <View style={[styles.checkedBox, { backgroundColor: colors.primarySoft, borderColor: colors.primary }]}>
                    <IconCheck size={12} color={colors.primary} />
                  </View>
                ) : (
                  <IconCircleEmpty size={19} color={colors.border} />
                )}
              </View>

              <View style={styles.stepInfo}>
                <Text
                  style={[
                    styles.stepTitleText,
                    {
                      color: step.completed ? colors.textMuted : colors.textPrimary,
                      textDecorationLine: step.completed ? 'line-through' : 'none',
                    },
                  ]}
                >
                  {step.name}
                </Text>
                <Text style={[styles.stepSubCat, { color: colors.textMuted }]}>
                  {step.catName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </SoftCard>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Skincare Routine"
        showBack={true}
        onBack={() => navigate('home')}
        rightActions={
          <TouchableOpacity
            style={[styles.headerActionBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
            onPress={() => navigate('more_care')}
          >
            <Text style={[styles.moreCareText, { color: colors.primary }]}>Preferences</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Morning & Night Layout */}
        <View style={[styles.routinesWrapper, isDesktop && styles.routinesDesktopRow]}>
          <View style={{ flex: 1 }}>
            {renderRoutineSection(
              'morning',
              'Morning Ritual',
              '07:30 AM',
              IconSun,
              colors.warmSun,
              colors.warmSunSoft
            )}
          </View>

          <View style={{ flex: 1 }}>
            {renderRoutineSection(
              'night',
              'Evening Care',
              '10:30 PM',
              IconMoon,
              colors.moonNight,
              colors.moonNightSoft
            )}
          </View>
        </View>

        {/* Weekly & Custom Care Treatments */}
        <View style={styles.treatmentSectionHeader}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Weekly & Custom Care
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              Scheduled masks, treatments, and grooming
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.addCareBtn, { backgroundColor: colors.primarySoft }]}
            onPress={() => navigate('add_care_item')}
            activeOpacity={0.8}
          >
            <IconPlus size={14} color={colors.primary} />
            <Text style={[styles.addCareBtnText, { color: colors.primary }]}>Add Treatment</Text>
          </TouchableOpacity>
        </View>

        <SoftCard style={{ padding: 6, marginTop: 12 }} borderRadius={18}>
          {weeklyCare.map((item, idx) => (
            <View
              key={item.id}
              style={[
                styles.treatmentRow,
                idx < weeklyCare.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
              ]}
            >
              <View>
                <Text style={[styles.treatmentName, { color: colors.textPrimary }]}>
                  {item.name}
                </Text>
                <Text style={[styles.treatmentCat, { color: colors.textMuted }]}>
                  {item.category}
                </Text>
              </View>

              <View style={styles.treatmentRight}>
                <View style={[styles.frequencyPill, { backgroundColor: colors.cardAlt }]}>
                  <Text style={[styles.frequencyPillText, { color: colors.textSecondary }]}>
                    {item.frequency}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigate('add_care_item')}
                  style={styles.pencilBtn}
                >
                  <IconPencil size={15} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  headerActionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  moreCareText: {
    fontSize: 12,
    fontWeight: '600',
  },
  routinesWrapper: {
    flexDirection: 'column',
    gap: 20,
  },
  routinesDesktopRow: {
    flexDirection: 'row',
  },
  routineSectionCard: {
    marginBottom: 4,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routineHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routineHeading: {
    fontSize: 16,
    fontWeight: '600',
  },
  routineTime: {
    fontSize: 12,
    marginTop: 2,
  },
  routineScore: {
    fontSize: 15,
    fontWeight: '700',
  },
  stepsList: {
    marginTop: 4,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  stepCheckboxArea: {
    marginRight: 14,
  },
  checkedBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepInfo: {
    flex: 1,
  },
  stepTitleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  stepSubCat: {
    fontSize: 11,
    marginTop: 2,
  },
  treatmentSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  addCareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
  },
  addCareBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  treatmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  treatmentName: {
    fontSize: 14,
    fontWeight: '500',
  },
  treatmentCat: {
    fontSize: 11,
    marginTop: 2,
  },
  treatmentRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  frequencyPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  frequencyPillText: {
    fontSize: 11,
    fontWeight: '500',
  },
  pencilBtn: {
    padding: 4,
  },
});
