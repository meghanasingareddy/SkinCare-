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
  IconRoutine,
  IconProgress,
  IconWellness,
  IconWaterDrop,
  IconNutrition,
  IconHair,
} from '../components/Icons';

export const MoreCareScreen = () => {
  const { colors } = useTheme();
  const { moreCareItems, toggleMoreCareItem, navigate, goBack } = useApp();

  const getIconForCategory = (cat) => {
    switch (cat) {
      case 'Fitness':
        return IconProgress;
      case 'Nutrition':
        return IconNutrition;
      case 'Hydration':
        return IconWaterDrop;
      case 'Hair Care':
        return IconHair;
      case 'Wellness':
        return IconWellness;
      default:
        return IconRoutine;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Tracking Preferences"
        subtitle="Opt in to habits that matter to you"
        showBack={true}
        onBack={() => navigate('routine')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.instructionText, { color: colors.textSecondary }]}>
          Enable or disable habits to personalize your daily dashboard and progress scores.
        </Text>

        <SoftCard style={{ padding: 4 }} borderRadius={18}>
          {moreCareItems.map((item, idx) => {
            const IconComp = getIconForCategory(item.category);
            return (
              <View
                key={item.id}
                style={[
                  styles.itemRow,
                  idx < moreCareItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderSubtle },
                ]}
              >
                <View style={styles.itemLeft}>
                  <View style={[styles.iconBox, { backgroundColor: item.enabled ? colors.primarySoft : colors.cardAlt }]}>
                    <IconComp size={16} color={item.enabled ? colors.primary : colors.textSecondary} />
                  </View>
                  <View>
                    <Text style={[styles.itemName, { color: colors.textPrimary }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.itemCategory, { color: colors.textMuted }]}>
                      {item.category}
                    </Text>
                  </View>
                </View>

                <Switch
                  value={item.enabled}
                  onValueChange={() => toggleMoreCareItem(item.id)}
                  trackColor={{
                    false: '#E0D8DA',
                    true: colors.primary,
                  }}
                  thumbColor="#FFFFFF"
                />
              </View>
            );
          })}
        </SoftCard>

        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: colors.primary }]}
          activeOpacity={0.88}
          onPress={() => {
            alert('Your habit preferences have been updated.');
            goBack();
          }}
        >
          <Text style={styles.saveBtnText}>Save Preferences</Text>
        </TouchableOpacity>
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
  instructionText: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemCategory: {
    fontSize: 11,
    marginTop: 2,
  },
  saveBtn: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#B85C78',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 3,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
