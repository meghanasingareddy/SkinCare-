import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../data/AppContext';
import { AppHeader } from '../components/AppHeader';
import { SoftCard } from '../components/SoftCard';

export const AddCareItemScreen = () => {
  const { colors, isDark } = useTheme();
  const { addCareItem, navigate, goBack } = useApp();

  const categories = [
    'Hair Care',
    'Face Care',
    'Body Care',
    'Oral Care',
    'Grooming',
    'Fitness',
    'Nutrition',
    'Wellness',
    'Productivity',
    'Cleaning',
    'Other',
  ];

  const frequencyOptions = [
    { label: 'Not using', value: 'Not using' },
    { label: 'Once a week', value: '1x per week' },
    { label: 'Twice a week', value: '2x per week' },
    { label: '3 times a week', value: '3x per week' },
    { label: 'Every 2 weeks', value: 'Every 2 weeks' },
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Every 3 months', value: 'Every 3 months' },
    { label: 'Once a year', value: 'Once a year' },
    { label: 'Custom', value: 'Custom' },
  ];

  const [category, setCategory] = useState('Hair Care');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [itemName, setItemName] = useState('Scalp Treatment');
  const [selectedFrequency, setSelectedFrequency] = useState('2x per week');
  const [customDays, setCustomDays] = useState('3');
  const [customUnit, setCustomUnit] = useState('days');

  const handleSave = () => {
    if (!itemName.trim()) {
      alert('Please enter an item name');
      return;
    }

    const freq =
      selectedFrequency === 'Custom'
        ? `Every ${customDays} ${customUnit}`
        : selectedFrequency;

    addCareItem({
      name: itemName,
      category,
      frequency: freq,
      icon: category === 'Hair Care' ? '💆‍♀️' : category === 'Face Care' ? '🧖‍♀️' : '✨',
    });

    alert(`Saved ${itemName} to your care schedule! 🌸`);
    goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Add Care Item"
        showBack={true}
        onBack={goBack}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Field */}
        <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>Category</Text>
        <TouchableOpacity
          style={[
            styles.dropdownButton,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
          onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          activeOpacity={0.8}
        >
          <Text style={[styles.dropdownValue, { color: colors.textPrimary }]}>
            {category}
          </Text>
          <Text style={[styles.dropdownArrow, { color: colors.textSecondary }]}>
            {showCategoryPicker ? '▴' : '▾'}
          </Text>
        </TouchableOpacity>

        {showCategoryPicker && (
          <SoftCard style={styles.categoryPickerList} padding={8}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.catOption,
                  category === cat && { backgroundColor: colors.primarySoft },
                ]}
                onPress={() => {
                  setCategory(cat);
                  setShowCategoryPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.catOptionText,
                    {
                      color: category === cat ? colors.primary : colors.textPrimary,
                      fontWeight: category === cat ? '700' : '400',
                    },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </SoftCard>
        )}

        {/* Item Name Field */}
        <Text style={[styles.fieldLabel, { color: colors.textPrimary, marginTop: 18 }]}>
          Item Name
        </Text>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.textPrimary,
            },
          ]}
          value={itemName}
          onChangeText={setItemName}
          placeholder="e.g. Scalp Treatment, Face Mask"
          placeholderTextColor={colors.textMuted}
        />

        {/* Frequency Options */}
        <Text style={[styles.fieldLabel, { color: colors.textPrimary, marginTop: 22 }]}>
          Frequency
        </Text>
        <SoftCard style={{ padding: 10, marginTop: 6 }}>
          {frequencyOptions.map((opt, idx) => {
            const isSelected = selectedFrequency === opt.value;
            return (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.freqRow,
                  idx < frequencyOptions.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.borderSubtle,
                  },
                ]}
                onPress={() => setSelectedFrequency(opt.value)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.radioCircle,
                    {
                      borderColor: isSelected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  {isSelected && (
                    <View
                      style={[
                        styles.radioInner,
                        { backgroundColor: colors.primary },
                      ]}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.freqText,
                    {
                      color: isSelected ? colors.primary : colors.textPrimary,
                      fontWeight: isSelected ? '700' : '400',
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Custom Frequency Sub-input */}
          {selectedFrequency === 'Custom' && (
            <View style={styles.customFrequencyBox}>
              <Text style={[styles.customFreqLabel, { color: colors.textSecondary }]}>
                Every
              </Text>
              <TextInput
                style={[
                  styles.customNumberInput,
                  {
                    backgroundColor: colors.cardAlt,
                    borderColor: colors.border,
                    color: colors.textPrimary,
                  },
                ]}
                keyboardType="numeric"
                value={customDays}
                onChangeText={setCustomDays}
              />
              <View style={styles.unitRow}>
                {['days', 'weeks', 'months', 'years'].map((unit) => (
                  <TouchableOpacity
                    key={unit}
                    onPress={() => setCustomUnit(unit)}
                    style={[
                      styles.unitChip,
                      customUnit === unit && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.unitChipText,
                        {
                          color: customUnit === unit ? '#FFFFFF' : colors.textSecondary,
                        },
                      ]}
                    >
                      {unit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </SoftCard>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
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
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  dropdownValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 14,
  },
  categoryPickerList: {
    marginTop: 6,
  },
  catOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  catOptionText: {
    fontSize: 14,
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 16,
    borderWidth: 1,
    fontSize: 14,
  },
  freqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  freqText: {
    fontSize: 14,
  },
  customFrequencyBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
  },
  customFreqLabel: {
    fontSize: 13,
    marginBottom: 6,
  },
  customNumberInput: {
    width: 60,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  unitRow: {
    flexDirection: 'row',
    gap: 8,
  },
  unitChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  unitChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  saveButton: {
    marginTop: 24,
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
