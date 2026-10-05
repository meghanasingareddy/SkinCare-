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

export const NutritionScreen = () => {
  const { colors, isDark } = useTheme();
  const { nutrition, toggleMeal, addWater, updateIntake, navigate } = useApp();

  const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'weekly'

  const meals = [
    { key: 'breakfast', label: 'Breakfast', icon: '🥞' },
    { key: 'lunch', label: 'Lunch', icon: '🥗' },
    { key: 'snack', label: 'Snack', icon: '🍎' },
    { key: 'dinner', label: 'Dinner', icon: '🍲' },
  ];

  const intakeItems = [
    { key: 'oats', label: 'Oats', unit: 'serving', icon: '🥣' },
    { key: 'fruits', label: 'Fruits', unit: 'servings', icon: '🍎' },
    { key: 'vegetables', label: 'Vegetables', unit: 'servings', icon: '🥦' },
    { key: 'addedSugar', label: 'Added Sugar', unit: 'serving', icon: '🍬' },
    { key: 'junkFood', label: 'Junk Food', unit: 'servings', icon: '🍟' },
  ];

  const quickWaterAmounts = [
    { label: '+250 ml', val: 0.25 },
    { label: '+500 ml', val: 0.5 },
    { label: '+750 ml', val: 0.75 },
    { label: '+1 L', val: 1.0 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Nutrition Tracker"
        showBack={true}
        onBack={() => navigate('home')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily / Weekly Tabs */}
        <View style={[styles.tabToggleRow, { backgroundColor: colors.cardAlt }]}>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'daily' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setActiveTab('daily')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabBtnText,
                {
                  color: activeTab === 'daily' ? '#FFFFFF' : colors.textSecondary,
                  fontWeight: activeTab === 'daily' ? '700' : '500',
                },
              ]}
            >
              Daily
            </Text>
          </TouchableOpacity>

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
        </View>

        {/* Date Navigator */}
        <View style={styles.dateNavRow}>
          <TouchableOpacity style={styles.arrowBtn}>
            <Text style={[styles.arrowText, { color: colors.textSecondary }]}>‹</Text>
          </TouchableOpacity>
          <Text style={[styles.dateNavText, { color: colors.textPrimary }]}>
            Mon, 12 May 2025
          </Text>
          <TouchableOpacity style={styles.arrowBtn}>
            <Text style={[styles.arrowText, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'daily' ? (
          <>
            {/* Meals Section */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Meals</Text>
            </View>

            <View style={styles.mealsRow}>
              {meals.map((m) => {
                const isChecked = !!nutrition.meals[m.key];
                return (
                  <TouchableOpacity
                    key={m.key}
                    onPress={() => toggleMeal(m.key)}
                    style={styles.mealItem}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.mealCircle,
                        {
                          backgroundColor: isChecked ? colors.primarySoft : colors.card,
                          borderColor: isChecked ? colors.primary : colors.border,
                        },
                      ]}
                    >
                      <Text style={{ fontSize: 22 }}>
                        {isChecked ? '✓' : m.icon}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.mealLabel,
                        {
                          color: isChecked ? colors.primary : colors.textSecondary,
                          fontWeight: isChecked ? '700' : '500',
                        },
                      ]}
                    >
                      {m.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Nutrition Goals */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                Nutrition Goals
              </Text>
            </View>

            <View style={styles.goalsContainer}>
              {/* Protein Goal */}
              <SoftCard style={styles.goalCard} padding={16}>
                <View style={styles.goalTitleRow}>
                  <View style={styles.goalLeft}>
                    <Text style={{ fontSize: 18, marginRight: 8 }}>🥩</Text>
                    <Text style={[styles.goalLabel, { color: colors.textSecondary }]}>
                      Protein
                    </Text>
                  </View>
                  <Text style={[styles.goalValue, { color: colors.textPrimary }]}>
                    {nutrition.proteinCurrent}g / {nutrition.proteinTarget}g
                  </Text>
                </View>
                <ProgressBar
                  progress={(nutrition.proteinCurrent / nutrition.proteinTarget) * 100}
                  color={colors.primary}
                  height={8}
                  style={{ marginTop: 10 }}
                />
              </SoftCard>

              {/* Water Goal */}
              <SoftCard style={styles.goalCard} padding={16}>
                <View style={styles.goalTitleRow}>
                  <View style={styles.goalLeft}>
                    <Text style={{ fontSize: 18, marginRight: 8 }}>💧</Text>
                    <Text style={[styles.goalLabel, { color: colors.textSecondary }]}>
                      Water
                    </Text>
                  </View>
                  <Text style={[styles.goalValue, { color: colors.waterIcon }]}>
                    {nutrition.waterCurrent} / {nutrition.waterTarget} L
                  </Text>
                </View>
                <ProgressBar
                  progress={(nutrition.waterCurrent / nutrition.waterTarget) * 100}
                  color={colors.waterIcon}
                  height={8}
                  style={{ marginTop: 10 }}
                />

                {/* Quick Add Water Buttons */}
                <View style={styles.waterQuickAddRow}>
                  {quickWaterAmounts.map((q) => (
                    <TouchableOpacity
                      key={q.label}
                      onPress={() => addWater(q.val)}
                      style={[
                        styles.waterQuickBtn,
                        { backgroundColor: colors.waterBg, borderColor: colors.borderSubtle },
                      ]}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.waterQuickText, { color: colors.waterIcon }]}>
                        {q.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </SoftCard>
            </View>

            {/* Today's Intake */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                Today's Intake
              </Text>
            </View>

            <SoftCard style={{ padding: 6 }}>
              {intakeItems.map((item, idx) => {
                const count = nutrition.intake[item.key] || 0;
                return (
                  <View
                    key={item.key}
                    style={[
                      styles.intakeRow,
                      idx < intakeItems.length - 1 && {
                        borderBottomWidth: 1,
                        borderBottomColor: colors.borderSubtle,
                      },
                    ]}
                  >
                    <View style={styles.intakeLeft}>
                      <Text style={{ fontSize: 20, marginRight: 12 }}>{item.icon}</Text>
                      <Text style={[styles.intakeLabel, { color: colors.textPrimary }]}>
                        {item.label}
                      </Text>
                    </View>

                    <View style={styles.counterRow}>
                      <Text style={[styles.intakeCountText, { color: colors.textSecondary }]}>
                        {count} {item.unit}
                      </Text>
                      <TouchableOpacity
                        onPress={() => updateIntake(item.key, -1)}
                        style={[
                          styles.counterBtn,
                          { backgroundColor: colors.cardAlt, borderColor: colors.border },
                        ]}
                      >
                        <Text style={[styles.counterBtnText, { color: colors.textPrimary }]}>
                          -
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => updateIntake(item.key, 1)}
                        style={[
                          styles.counterBtn,
                          { backgroundColor: colors.primarySoft, borderColor: colors.primaryBorder },
                        ]}
                      >
                        <Text style={[styles.counterBtnText, { color: colors.primary }]}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </SoftCard>
          </>
        ) : (
          /* Weekly Consistency Matrix */
          <SoftCard style={{ padding: 14 }}>
            <Text style={[styles.weeklyMatrixTitle, { color: colors.textPrimary }]}>
              Weekly Consistency Tracker
            </Text>
            <Text style={[styles.weeklyMatrixSubtitle, { color: colors.textSecondary }]}>
              Track healthy habits across the week without stressful calorie counting.
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.matrixTable}>
                {/* Table Header */}
                <View style={styles.matrixRow}>
                  <Text style={[styles.matrixMetricHeader, { color: colors.textMuted }]}>
                    METRIC
                  </Text>
                  {nutrition.weeklyMatrix.map((col) => (
                    <Text
                      key={col.day}
                      style={[styles.matrixColHeader, { color: colors.textPrimary }]}
                    >
                      {col.day}
                    </Text>
                  ))}
                </View>

                {/* Meals Row */}
                <View style={[styles.matrixRow, { borderTopWidth: 1, borderTopColor: colors.borderSubtle }]}>
                  <Text style={[styles.matrixMetricName, { color: colors.textPrimary }]}>
                    Meals
                  </Text>
                  {nutrition.weeklyMatrix.map((col) => (
                    <Text key={col.day} style={[styles.matrixCell, { color: colors.primary }]}>
                      {col.meals === '4/4' ? '✓' : '3/4'}
                    </Text>
                  ))}
                </View>

                {/* Protein Row */}
                <View style={[styles.matrixRow, { borderTopWidth: 1, borderTopColor: colors.borderSubtle }]}>
                  <Text style={[styles.matrixMetricName, { color: colors.textPrimary }]}>
                    Protein (g)
                  </Text>
                  {nutrition.weeklyMatrix.map((col) => (
                    <Text key={col.day} style={[styles.matrixCell, { color: colors.textPrimary }]}>
                      {col.protein}
                    </Text>
                  ))}
                </View>

                {/* Water Row */}
                <View style={[styles.matrixRow, { borderTopWidth: 1, borderTopColor: colors.borderSubtle }]}>
                  <Text style={[styles.matrixMetricName, { color: colors.textPrimary }]}>
                    Water (L)
                  </Text>
                  {nutrition.weeklyMatrix.map((col) => (
                    <Text key={col.day} style={[styles.matrixCell, { color: colors.waterIcon }]}>
                      {col.water}
                    </Text>
                  ))}
                </View>

                {/* Oats Row */}
                <View style={[styles.matrixRow, { borderTopWidth: 1, borderTopColor: colors.borderSubtle }]}>
                  <Text style={[styles.matrixMetricName, { color: colors.textPrimary }]}>
                    Oats
                  </Text>
                  {nutrition.weeklyMatrix.map((col) => (
                    <Text key={col.day} style={[styles.matrixCell, { color: colors.textSecondary }]}>
                      {col.oats}
                    </Text>
                  ))}
                </View>

                {/* Junk Food Row */}
                <View style={[styles.matrixRow, { borderTopWidth: 1, borderTopColor: colors.borderSubtle }]}>
                  <Text style={[styles.matrixMetricName, { color: colors.textPrimary }]}>
                    Junk Food
                  </Text>
                  {nutrition.weeklyMatrix.map((col) => (
                    <Text key={col.day} style={[styles.matrixCell, { color: colors.textSecondary }]}>
                      {col.junk}
                    </Text>
                  ))}
                </View>

                {/* Added Sugar Row */}
                <View style={[styles.matrixRow, { borderTopWidth: 1, borderTopColor: colors.borderSubtle }]}>
                  <Text style={[styles.matrixMetricName, { color: colors.textPrimary }]}>
                    Sugar
                  </Text>
                  {nutrition.weeklyMatrix.map((col) => (
                    <Text key={col.day} style={[styles.matrixCell, { color: colors.textSecondary }]}>
                      {col.sugar}
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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  tabToggleRow: {
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
  dateNavRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    gap: 16,
  },
  arrowBtn: {
    padding: 6,
  },
  arrowText: {
    fontSize: 22,
    fontWeight: '300',
  },
  dateNavText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  mealsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealItem: {
    alignItems: 'center',
    width: '22%',
  },
  mealCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  mealLabel: {
    fontSize: 12,
  },
  goalsContainer: {
    gap: 12,
  },
  goalCard: {
    borderRadius: 18,
  },
  goalTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  goalValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  waterQuickAddRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  waterQuickBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  waterQuickText: {
    fontSize: 12,
    fontWeight: '600',
  },
  intakeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  intakeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  intakeLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  intakeCountText: {
    fontSize: 13,
    minWidth: 70,
    textAlign: 'right',
  },
  counterBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 18,
  },
  weeklyMatrixTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  weeklyMatrixSubtitle: {
    fontSize: 12,
    marginBottom: 16,
  },
  matrixTable: {
    minWidth: 460,
  },
  matrixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  matrixMetricHeader: {
    width: 100,
    fontSize: 11,
    fontWeight: '700',
  },
  matrixColHeader: {
    width: 48,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  matrixMetricName: {
    width: 100,
    fontSize: 13,
    fontWeight: '600',
  },
  matrixCell: {
    width: 48,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
