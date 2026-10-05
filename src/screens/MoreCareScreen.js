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

export const MoreCareScreen = () => {
  const { colors, isDark } = useTheme();
  const { moreCareItems, toggleMoreCareItem, navigate, goBack } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="More Care"
        subtitle="Choose what you want to track (Optional)"
        showBack={true}
        onBack={() => navigate('routine')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SoftCard style={{ padding: 6, marginTop: 12 }}>
          {moreCareItems.map((item, idx) => (
            <View
              key={item.id}
              style={[
                styles.itemRow,
                idx < moreCareItems.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.borderSubtle,
                },
              ]}
            >
              <View style={styles.itemLeft}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: item.enabled ? colors.primarySoft : colors.cardAlt },
                  ]}
                >
                  <Text style={{ fontSize: 16 }}>{item.icon}</Text>
                </View>
                <View style={styles.textContainer}>
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
                  false: isDark ? '#3A3F47' : '#E2E5EA',
                  true: colors.primary,
                }}
                thumbColor="#FFFFFF"
                ios_backgroundColor={isDark ? '#3A3F47' : '#E2E5EA'}
              />
            </View>
          ))}
        </SoftCard>

        {/* Save Preferences Button */}
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          activeOpacity={0.85}
          onPress={() => {
            alert('Your care preferences have been saved! 🌸');
            goBack();
          }}
        >
          <Text style={styles.saveButtonText}>Save Preferences</Text>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
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
    flex: 1,
    marginRight: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
  },
  itemCategory: {
    fontSize: 11,
    marginTop: 2,
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
