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
  IconWaterDrop,
  IconCheck,
  IconPlus,
} from '../components/Icons';

export const NutritionScreen = () => {
  const { colors } = useTheme();
  const { nutrition, toggleMeal, addWater, updateIntake, navigate } = useApp();
  const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'weekly'

  const meals = [
    { key: 'breakfast', label: 'Breakfast' },
    { key: 'lunch', label: 'Lunch' },
    { key: 'snack', label: 'Afternoon Snack' },
    { key: 'dinner', label: 'Dinner' },
  ];

  const quickWater = [
    { label: '+250 ml', val: 0.25 },
    { label: '+500 ml', val: 0.5 },
    { label: '+1 L', val: 1.0 },
  ];

  const habits = [
    { key: 'fruits', label: 'Fresh Fruits', count: nutrition.intake.fruits || 0, unit: 'servings' },
    { key: 'vegetables', label: 'Greens & Veggies', count: nutrition.intake.vegetables || 0, unit: 'servings' },
    { key: 'oats', label: 'Whole Grains / Oats', count: nutrition.intake.oats || 0, unit: 'serving' },
    { key: 'addedSugar', label: 'Added Sugar', count: nutrition.intake.addedSugar || 0, unit: 'serving' },
  ];

  const waterPercent = Math.min(100, Math.round((nutrition.waterCurrent / nutrition.waterTarget) * 100));
  const proteinPercent = Math.min(100, Math.round((nutrition.proteinCurrent / nutrition.proteinTarget) * 100));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Nourishment & Water"
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
            style={[styles.tabItem, activeTab === 'daily' && { backgroundColor: colors.primarySoft }]}
            onPress={() => setActiveTab('daily')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'daily' ? colors.primary : colors.textSecondary, fontWeight: activeTab === 'daily' ? '600' : '400' },
              ]}
            >
              Daily Wellness
            </Text>
          </TouchableOpacity>

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
              Weekly Consistency
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'daily' ? (
          <>
            {/* Prominent Hydration Card */}
            <SoftCard style={styles.hydrationCard} padding={22} borderRadius={20}>
              <View style={styles.hydrationHeader}>
                <View style={styles.hydrationLeft}>
                  <View style={[styles.waterIconCircle, { backgroundColor: colors.waterSoft }]}>
                    <IconWaterDrop size={20} color={colors.water} />
                  </View>
                  <View>
                    <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Hydration Goal</Text>
                    <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
                      Pure water & herbal infusions
                    </Text>
                  </View>
                </View>

                <View style={styles.hydrationValueBox}>
                  <Text style={[styles.hydrationValue, { color: colors.textPrimary }]}>
                    {nutrition.waterCurrent}
                    <Text style={[styles.hydrationTarget, { color: colors.textSecondary }]}>
                      {' '}/ {nutrition.waterTarget} L
                    </Text>
                  </Text>
                </View>
              </View>

              <ProgressBar progress={waterPercent} color={colors.water} height={7} style={{ marginVertical: 16 }} />

              <View style={styles.quickWaterRow}>
                {quickWater.map((q) => (
                  <TouchableOpacity
                    key={q.label}
                    onPress={() => addWater(q.val)}
                    style={[styles.quickWaterBtn, { borderColor: colors.border, backgroundColor: colors.cardAlt }]}
                    activeOpacity={0.7}
                  >
                    <IconPlus size={12} color={colors.water} />
                    <Text style={[styles.quickWaterText, { color: colors.textPrimary }]}>{q.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </SoftCard>

            {/* Today's Meals Section */}
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
                Today's Meals
              </Text>
            </View>

            <SoftCard style={styles.mealsCard} padding={12} borderRadius={18}>
              {meals.map((m, idx) => {
                const isChecked = !!nutrition.meals[m.key];
                return (
                  <TouchableOpacity
                    key={m.key}
                    onPress={() => toggleMeal(m.key)}
                    style={[
                      styles.mealRow,
                      idx < meals.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
                    ]}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.mealCheck,
                        isChecked && { backgroundColor: colors.successSoft, borderColor: colors.success },
                      ]}
                    >
                      {isChecked && <IconCheck size={12} color={colors.success} />}
                    </View>
                    <Text
                      style={[
                        styles.mealTitle,
                        {
                          color: isChecked ? colors.textPrimary : colors.textSecondary,
                          fontWeight: isChecked ? '600' : '400',
                        },
                      ]}
                    >
                      {m.label}
                    </Text>
                    <Text style={[styles.mealStatus, { color: isChecked ? colors.success : colors.textMuted }]}>
                      {isChecked ? 'Mindfully Nourished' : 'Pending'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </SoftCard>

            {/* Nutrition Goals (Protein & Clean Whole Foods) */}
            <View style={styles.sectionHeaderRow}>
              <Text style={[styles.sectionHeading, { color: colors.textPrimary }]}>
                Nourishment Balance
              </Text>
            </View>

            <SoftCard style={{ padding: 18, marginBottom: 20 }} borderRadius={18}>
              <View style={styles.proteinHeader}>
                <Text style={[styles.proteinLabel, { color: colors.textPrimary }]}>Daily Protein Target</Text>
                <Text style={[styles.proteinScore, { color: colors.primary }]}>
                  {nutrition.proteinCurrent}g <Text style={{ color: colors.textSecondary, fontWeight: '400' }}>/ {nutrition.proteinTarget}g</Text>
                </Text>
              </View>
              <ProgressBar progress={proteinPercent} color={colors.primary} height={6} style={{ marginTop: 10, marginBottom: 18 }} />

              <View style={[styles.habitsList, { borderTopWidth: 1, borderTopColor: colors.borderSubtle, paddingTop: 12 }]}>
                {habits.map((item) => (
                  <View key={item.key} style={styles.habitRow}>
                    <Text style={[styles.habitLabel, { color: colors.textPrimary }]}>{item.label}</Text>
                    <View style={styles.stepperRow}>
                      <Text style={[styles.habitCount, { color: colors.textSecondary }]}>
                        {item.count} {item.unit}
                      </Text>
                      <TouchableOpacity
                        onPress={() => updateIntake(item.key, -1)}
                        style={[styles.stepBtn, { borderColor: colors.border }]}
                      >
                        <Text style={[styles.stepBtnText, { color: colors.textSecondary }]}>–</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => updateIntake(item.key, 1)}
                        style={[styles.stepBtn, { borderColor: colors.border, backgroundColor: colors.cardAlt }]}
                      >
                        <Text style={[styles.stepBtnText, { color: colors.textPrimary }]}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </SoftCard>
          </>
        ) : (
          /* Weekly Consistency View */
          <SoftCard style={{ padding: 20 }} borderRadius={18}>
            <Text style={[styles.weeklyTitle, { color: colors.textPrimary }]}>
              Weekly Nourishment Rhythm
            </Text>
            <Text style={[styles.weeklySub, { color: colors.textSecondary }]}>
              Consistency over perfection across your week.
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.matrix}>
                <View style={styles.matrixHeaderRow}>
                  <Text style={[styles.matrixMetricCol, { color: colors.textMuted }]}>HABIT</Text>
                  {nutrition.weeklyMatrix.map((c) => (
                    <Text key={c.day} style={[styles.matrixDayCol, { color: colors.textPrimary }]}>
                      {c.day}
                    </Text>
                  ))}
                </View>

                <View style={[styles.matrixDataRow, { borderTopColor: colors.borderSubtle }]}>
                  <Text style={[styles.matrixMetricName, { color: colors.textPrimary }]}>Meals</Text>
                  {nutrition.weeklyMatrix.map((c) => (
                    <Text key={c.day} style={[styles.matrixCell, { color: colors.success }]}>
                      {c.meals === '4/4' ? '●' : '○'}
                    </Text>
                  ))}
                </View>

                <View style={[styles.matrixDataRow, { borderTopColor: colors.borderSubtle }]}>
                  <Text style={[styles.matrixMetricName, { color: colors.textPrimary }]}>Water (L)</Text>
                  {nutrition.weeklyMatrix.map((c) => (
                    <Text key={c.day} style={[styles.matrixCell, { color: colors.water }]}>
                      {c.water}
                    </Text>
                  ))}
                </View>

                <View style={[styles.matrixDataRow, { borderTopColor: colors.borderSubtle }]}>
                  <Text style={[styles.matrixMetricName, { color: colors.textPrimary }]}>Protein (g)</Text>
                  {nutrition.weeklyMatrix.map((c) => (
                    <Text key={c.day} style={[styles.matrixCell, { color: colors.textPrimary }]}>
                      {c.protein}
                    </Text>
                  ))}
                </View>
              </View>
            </ScrollView>
          </SoftCard>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    padding: 3,
    marginBottom: 20,
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
  hydrationCard: {
    marginBottom: 24,
  },
  hydrationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hydrationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  waterIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  hydrationValueBox: {
    alignItems: 'flex-end',
  },
  hydrationValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  hydrationTarget: {
    fontSize: 13,
    fontWeight: '400',
  },
  quickWaterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  quickWaterBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  quickWaterText: {
    fontSize: 12,
    fontWeight: '500',
  },
  sectionHeaderRow: {
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  mealsCard: {
    marginBottom: 24,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  mealCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#EDE5E7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  mealTitle: {
    flex: 1,
    fontSize: 14,
  },
  mealStatus: {
    fontSize: 12,
  },
  proteinHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proteinLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  proteinScore: {
    fontSize: 15,
    fontWeight: '700',
  },
  habitsList: {
    gap: 12,
  },
  habitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  habitLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  habitCount: {
    fontSize: 12,
    minWidth: 70,
    textAlign: 'right',
  },
  stepBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16,
  },
  weeklyTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  weeklySub: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 16,
  },
  matrix: {
    minWidth: 420,
  },
  matrixHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  matrixMetricCol: {
    width: 90,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  matrixDayCol: {
    width: 44,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  matrixDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  matrixMetricName: {
    width: 90,
    fontSize: 13,
    fontWeight: '500',
  },
  matrixCell: {
    width: 44,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
});
