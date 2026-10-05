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

export const WellnessScreen = () => {
  const { colors, isDark } = useTheme();
  const {
    wellness,
    updateMood,
    updateEnergy,
    updateStress,
    updateWellnessNote,
    navigate,
  } = useApp();

  const [activeTab, setActiveTab] = useState('mood'); // 'mood' | 'sleep' | 'journal'
  const [noteText, setNoteText] = useState(wellness.note);

  const moodOptions = [
    { key: 'very_low', label: 'Very low', emoji: '😞', tint: '#FEB2B2' },
    { key: 'low', label: 'Low', emoji: '🙁', tint: '#FEEBC8' },
    { key: 'okay', label: 'Okay', emoji: '😐', tint: '#FEFCBF' },
    { key: 'good', label: 'Good', emoji: '😊', tint: '#C6F6D5' },
    { key: 'very_good', label: 'Very good', emoji: '🥰', tint: '#FED7E2' },
  ];

  const levels = [1, 2, 3, 4, 5];

  const handleSave = () => {
    updateWellnessNote(noteText);
    alert('Wellness check-in saved! 🧘‍♀️');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Wellness"
        showBack={true}
        onBack={() => navigate('home')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mood / Sleep / Journal Tabs */}
        <View style={[styles.tabBar, { backgroundColor: colors.cardAlt }]}>
          {['mood', 'sleep', 'journal'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  isActive && { backgroundColor: colors.primary },
                ]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    {
                      color: isActive ? '#FFFFFF' : colors.textSecondary,
                      fontWeight: isActive ? '700' : '500',
                    },
                  ]}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {activeTab === 'mood' && (
          <>
            {/* How are you feeling today? */}
            <Text style={[styles.questionTitle, { color: colors.textPrimary }]}>
              How are you feeling today?
            </Text>

            <View style={styles.moodRow}>
              {moodOptions.map((opt) => {
                const isSelected = wellness.mood === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    onPress={() => updateMood(opt.key)}
                    style={styles.moodItem}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.moodCircle,
                        {
                          backgroundColor: isSelected ? colors.primarySoft : colors.card,
                          borderColor: isSelected ? colors.primary : colors.border,
                        },
                      ]}
                    >
                      <Text style={{ fontSize: 28 }}>{opt.emoji}</Text>
                    </View>
                    <Text
                      style={[
                        styles.moodLabel,
                        {
                          color: isSelected ? colors.primary : colors.textSecondary,
                          fontWeight: isSelected ? '700' : '500',
                        },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Energy Level */}
            <Text style={[styles.levelTitle, { color: colors.textPrimary, marginTop: 24 }]}>
              Energy Level
            </Text>
            <View style={styles.levelRow}>
              {levels.map((lvl) => {
                const isSelected = wellness.energy === lvl;
                return (
                  <TouchableOpacity
                    key={lvl}
                    onPress={() => updateEnergy(lvl)}
                    style={[
                      styles.levelCircle,
                      {
                        backgroundColor: isSelected ? colors.primary : colors.card,
                        borderColor: isSelected ? colors.primary : colors.border,
                      },
                    ]}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.levelText,
                        {
                          color: isSelected ? '#FFFFFF' : colors.textSecondary,
                          fontWeight: isSelected ? '700' : '500',
                        },
                      ]}
                    >
                      {lvl}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Stress Level */}
            <Text style={[styles.levelTitle, { color: colors.textPrimary, marginTop: 22 }]}>
              Stress Level
            </Text>
            <View style={styles.levelRow}>
              {levels.map((lvl) => {
                const isSelected = wellness.stress === lvl;
                return (
                  <TouchableOpacity
                    key={lvl}
                    onPress={() => updateStress(lvl)}
                    style={[
                      styles.levelCircle,
                      {
                        backgroundColor: isSelected ? colors.primary : colors.card,
                        borderColor: isSelected ? colors.primary : colors.border,
                      },
                    ]}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.levelText,
                        {
                          color: isSelected ? '#FFFFFF' : colors.textSecondary,
                          fontWeight: isSelected ? '700' : '500',
                        },
                      ]}
                    >
                      {lvl}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Notes (Optional) */}
            <Text style={[styles.levelTitle, { color: colors.textPrimary, marginTop: 22 }]}>
              Notes (Optional)
            </Text>
            <TextInput
              style={[
                styles.noteInput,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                },
              ]}
              placeholder="What's on your mind?"
              placeholderTextColor={colors.textMuted}
              value={noteText}
              onChangeText={setNoteText}
              multiline
            />

            {/* Save Button */}
            <TouchableOpacity
              style={[styles.saveBtn, { backgroundColor: colors.primary }]}
              activeOpacity={0.85}
              onPress={handleSave}
            >
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'sleep' && (
          <View style={styles.sleepSection}>
            <SoftCard style={{ padding: 20 }}>
              <View style={styles.sleepHeroRow}>
                <View>
                  <Text style={[styles.sleepDuration, { color: colors.textPrimary }]}>
                    {wellness.sleep.duration}
                  </Text>
                  <Text style={[styles.sleepSub, { color: colors.textSecondary }]}>
                    Optimal rest achieved
                  </Text>
                </View>
                <View style={[styles.sleepMoonCircle, { backgroundColor: colors.sleepBg }]}>
                  <Text style={{ fontSize: 28 }}>🌙</Text>
                </View>
              </View>

              <View style={[styles.sleepDetailsRow, { borderTopColor: colors.borderSubtle }]}>
                <View style={styles.sleepCol}>
                  <Text style={[styles.sleepColLabel, { color: colors.textMuted }]}>
                    SLEEP TIME
                  </Text>
                  <Text style={[styles.sleepColVal, { color: colors.textPrimary }]}>
                    {wellness.sleep.sleepTime}
                  </Text>
                </View>

                <View style={styles.sleepCol}>
                  <Text style={[styles.sleepColLabel, { color: colors.textMuted }]}>
                    WAKE TIME
                  </Text>
                  <Text style={[styles.sleepColVal, { color: colors.textPrimary }]}>
                    {wellness.sleep.wakeTime}
                  </Text>
                </View>

                <View style={styles.sleepCol}>
                  <Text style={[styles.sleepColLabel, { color: colors.textMuted }]}>
                    TARGET
                  </Text>
                  <Text style={[styles.sleepColVal, { color: colors.textPrimary }]}>
                    {wellness.sleep.targetHours}h
                  </Text>
                </View>
              </View>
            </SoftCard>
          </View>
        )}

        {activeTab === 'journal' && (
          <View style={styles.journalSection}>
            <SoftCard style={{ padding: 20 }}>
              <Text style={[styles.journalPrompt, { color: colors.textPrimary }]}>
                Daily Reflection & Gratitude
              </Text>
              <Text style={[styles.journalSub, { color: colors.textSecondary }]}>
                Write down 3 things you are grateful for today or reflections on your skincare and wellness journey.
              </Text>

              <TextInput
                style={[
                  styles.journalInput,
                  {
                    backgroundColor: colors.cardAlt,
                    borderColor: colors.border,
                    color: colors.textPrimary,
                  },
                ]}
                placeholder="1. Fresh morning sunshine..."
                placeholderTextColor={colors.textMuted}
                multiline
              />

              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: colors.primary, marginTop: 16 }]}
                onPress={() => alert('Journal entry recorded! ✍️')}
              >
                <Text style={styles.saveBtnText}>Save Entry</Text>
              </TouchableOpacity>
            </SoftCard>
          </View>
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
  tabBar: {
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
  tabButtonText: {
    fontSize: 14,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    alignItems: 'center',
    width: '18%',
  },
  moodCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  moodLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  levelTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  levelCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: 15,
  },
  noteInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  saveBtn: {
    marginTop: 26,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sleepSection: {
    marginTop: 10,
  },
  sleepHeroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sleepDuration: {
    fontSize: 28,
    fontWeight: '800',
  },
  sleepSub: {
    fontSize: 13,
    marginTop: 4,
  },
  sleepMoonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sleepDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
  },
  sleepCol: {
    alignItems: 'center',
  },
  sleepColLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  sleepColVal: {
    fontSize: 14,
    fontWeight: '600',
  },
  journalSection: {
    marginTop: 10,
  },
  journalPrompt: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  journalSub: {
    fontSize: 13,
    marginBottom: 14,
    lineHeight: 18,
  },
  journalInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 14,
  },
});
