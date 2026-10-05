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

export const RoutineScreen = () => {
  const { colors, isDark } = useTheme();
  const { routine, toggleRoutineItem, weeklyCare, navigate } = useApp();
  const { width } = useWindowDimensions();
  const isWide = width >= 800;

  // Track expanded categories for morning and night
  const [expandedCategories, setExpandedCategories] = useState({
    'morning-0': true,
    'night-0': true,
  });

  const toggleCategoryExpand = (key) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderRoutineCard = (timeKey, title, icon, headerBg, itemsList) => {
    const totalItems = itemsList.reduce((acc, cat) => acc + cat.items.length, 0);
    const completedItems = itemsList.reduce(
      (acc, cat) => acc + cat.items.filter((i) => i.completed).length,
      0
    );

    return (
      <SoftCard
        style={[
          styles.timeCard,
          isWide && styles.timeCardWide,
          { borderColor: colors.borderSubtle },
        ]}
        padding={0}
      >
        {/* Card Header */}
        <View style={[styles.timeHeader, { backgroundColor: headerBg }]}>
          <View style={styles.timeTitleRow}>
            <Text style={styles.timeIcon}>{icon}</Text>
            <View>
              <Text style={[styles.timeTitle, { color: colors.textPrimary }]}>{title}</Text>
              <Text style={[styles.timeCompletion, { color: colors.textSecondary }]}>
                {completedItems}/{totalItems} completed
              </Text>
            </View>
          </View>
        </View>

        {/* Categories List */}
        <View style={styles.categoriesContainer}>
          {itemsList.map((category, catIndex) => {
            const expandKey = `${timeKey}-${catIndex}`;
            const isExpanded = !!expandedCategories[expandKey];
            const catCompleted = category.items.filter((i) => i.completed).length;
            const catTotal = category.items.length;

            return (
              <View
                key={category.category}
                style={[
                  styles.categoryBox,
                  catIndex < itemsList.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.borderSubtle,
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.categoryRow}
                  onPress={() => toggleCategoryExpand(expandKey)}
                  activeOpacity={0.7}
                >
                  <View style={styles.categoryLeft}>
                    <View
                      style={[
                        styles.catIconCircle,
                        { backgroundColor: colors.cardAlt },
                      ]}
                    >
                      <Text style={{ fontSize: 16 }}>{category.icon}</Text>
                    </View>
                    <View>
                      <Text style={[styles.catName, { color: colors.textPrimary }]}>
                        {category.category}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.categoryRight}>
                    <Text style={[styles.catCountBadge, { color: colors.textSecondary }]}>
                      {catCompleted}/{catTotal}
                    </Text>
                    <Text style={[styles.chevron, { color: colors.textMuted }]}>
                      {isExpanded ? '▾' : '›'}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Expanded Items */}
                {isExpanded && (
                  <View style={styles.itemsListContainer}>
                    {category.items.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.itemRow}
                        onPress={() => toggleRoutineItem(timeKey, catIndex, item.id)}
                        activeOpacity={0.6}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            {
                              borderColor: item.completed ? colors.primary : colors.border,
                              backgroundColor: item.completed
                                ? colors.primary
                                : 'transparent',
                            },
                          ]}
                        >
                          {item.completed && <Text style={styles.checkMark}>✓</Text>}
                        </View>
                        <Text
                          style={[
                            styles.itemName,
                            {
                              color: item.completed
                                ? colors.textMuted
                                : colors.textPrimary,
                              textDecorationLine: item.completed
                                ? 'line-through'
                                : 'none',
                            },
                          ]}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </SoftCard>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="My Routine"
        showBack={true}
        onBack={() => navigate('home')}
        rightActions={
          <TouchableOpacity
            style={[styles.settingsButton, { backgroundColor: colors.cardAlt, borderColor: colors.border }]}
            onPress={() => navigate('more_care')}
          >
            <Text style={{ fontSize: 16 }}>⚙️</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tabs: [ Routine ] [ More Care ] */}
        <View style={[styles.tabsWrapper, { backgroundColor: colors.cardAlt }]}>
          <TouchableOpacity
            style={[styles.tabButton, { backgroundColor: colors.card }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabTextActive, { color: colors.textPrimary }]}>Routine</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => navigate('more_care')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabTextInactive, { color: colors.textSecondary }]}>
              More Care
            </Text>
          </TouchableOpacity>
        </View>

        {/* Morning & Night Side by Side (on wide) or Stacked (on mobile) */}
        <View style={[styles.routineRow, isWide && styles.routineRowWide]}>
          {renderRoutineCard(
            'morning',
            'Morning',
            '☀️',
            isDark ? '#2D2319' : '#FFF5EB',
            routine.morning
          )}
          {renderRoutineCard(
            'night',
            'Night',
            '🌙',
            isDark ? '#1C2433' : '#EDF4FE',
            routine.night
          )}
        </View>

        {/* Section: WEEKLY / CUSTOM CARE */}
        <View style={styles.weeklyCareHeader}>
          <View>
            <Text style={[styles.weeklyTitle, { color: colors.textPrimary }]}>
              Weekly / Custom Care
            </Text>
            <Text style={[styles.weeklySubtitle, { color: colors.textSecondary }]}>
              Set your frequency for treatments
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.addItemButton, { backgroundColor: colors.primary }]}
            onPress={() => navigate('add_care_item')}
            activeOpacity={0.8}
          >
            <Text style={styles.addItemText}>+ Add Item</Text>
          </TouchableOpacity>
        </View>

        {/* Weekly Care List */}
        <SoftCard style={{ padding: 6, marginTop: 12 }}>
          {weeklyCare.map((item, idx) => (
            <View
              key={item.id}
              style={[
                styles.weeklyCareRow,
                idx < weeklyCare.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderSubtle,
                },
              ]}
            >
              <View style={styles.weeklyCareLeft}>
                <View
                  style={[
                    styles.catIconCircle,
                    { backgroundColor: colors.cardAlt },
                  ]}
                >
                  <Text style={{ fontSize: 16 }}>{item.icon}</Text>
                </View>
                <View>
                  <Text style={[styles.careName, { color: colors.textPrimary }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.careCat, { color: colors.textMuted }]}>
                    {item.category}
                  </Text>
                </View>
              </View>

              <View style={styles.weeklyCareRight}>
                <View style={[styles.frequencyBadge, { backgroundColor: colors.primarySoft }]}>
                  <Text style={[styles.frequencyText, { color: colors.primary }]}>
                    {item.frequency}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigate('add_care_item')}
                  style={styles.pencilButton}
                >
                  <Text style={{ fontSize: 15, color: colors.textMuted }}>✏️</Text>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  settingsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsWrapper: {
    flexDirection: 'row',
    borderRadius: 24,
    padding: 4,
    marginVertical: 14,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  tabTextActive: {
    fontSize: 14,
    fontWeight: '700',
  },
  tabTextInactive: {
    fontSize: 14,
    fontWeight: '500',
  },
  routineRow: {
    flexDirection: 'column',
    gap: 16,
    marginTop: 6,
  },
  routineRowWide: {
    flexDirection: 'row',
  },
  timeCard: {
    flex: 1,
  },
  timeCardWide: {
    minWidth: 320,
  },
  timeHeader: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  timeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  timeTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  timeCompletion: {
    fontSize: 12,
    marginTop: 2,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  categoryBox: {
    paddingVertical: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  catName: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  catCountBadge: {
    fontSize: 12,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 16,
  },
  itemsListContainer: {
    marginTop: 10,
    marginLeft: 46,
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  itemName: {
    fontSize: 13,
  },
  weeklyCareHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 4,
  },
  weeklyTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  weeklySubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  addItemButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
  },
  addItemText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  weeklyCareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  weeklyCareLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  careName: {
    fontSize: 14,
    fontWeight: '600',
  },
  careCat: {
    fontSize: 11,
    marginTop: 2,
  },
  weeklyCareRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  frequencyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  frequencyText: {
    fontSize: 11,
    fontWeight: '600',
  },
  pencilButton: {
    padding: 4,
  },
});
