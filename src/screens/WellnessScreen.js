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
import { IconMoodFace, IconMoon } from '../components/Icons';

export const WellnessScreen = () => {
  const { colors } = useTheme();
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
    { key: 'very_low', label: 'Very Low' },
    { key: 'low', label: 'Tired' },
    { key: 'okay', label: 'Balanced' },
    { key: 'good', label: 'Calm' },
    { key: 'very_good', label: 'Vibrant' },
  ];

  const levels = [1, 2, 3, 4, 5];

  const handleSave = () => {
    updateWellnessNote(noteText);
    alert('Wellness check-in recorded.');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Mindful Wellness"
        showBack={true}
        onBack={() => navigate('home')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Subtle Tab Switcher */}
        <View style={[styles.tabBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {['mood', 'sleep', 'journal'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabItem,
                  isActive && { backgroundColor: colors.primarySoft },
                ]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isActive ? colors.primary : colors.textSecondary,
                      fontWeight: isActive ? '600' : '400',
                    },
                  ]}
                >
                  {tab === 'mood' ? 'Mood Check-in' : tab === 'sleep' ? 'Sleep & Rest' : 'Reflections'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {activeTab === 'mood' && (
          <SoftCard style={{ padding: 22 }} borderRadius={20}>
            <Text style={[styles.questionTitle, { color: colors.textPrimary }]}>
              How are you feeling today?
            </Text>
            <Text style={[styles.questionSubtitle, { color: colors.textSecondary }]}>
              Pause and check in with your mind and body.
            </Text>

            {/* Vector Mood Faces (No Emojis!) */}
            <View style={styles.moodRow}>
              {moodOptions.map((opt) => {
                const isSelected = wellness.mood === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    onPress={() => updateMood(opt.key)}
                    style={styles.moodItem}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.moodIconWrap,
                        isSelected && {
                          backgroundColor: colors.primarySoft,
                          borderColor: colors.primary,
                        },
                      ]}
                    >
                      <IconMoodFace
                        mood={opt.key}
                        size={30}
                        isSelected={isSelected}
                        activeColor={colors.primary}
                      />
                    </View>
                    <Text
                      style={[
                        styles.moodLabel,
                        {
                          color: isSelected ? colors.primary : colors.textSecondary,
                          fontWeight: isSelected ? '600' : '400',
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
            <Text style={[styles.levelTitle, { color: colors.textPrimary, marginTop: 28 }]}>
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
                        backgroundColor: isSelected ? colors.primary : colors.cardAlt,
                        borderColor: isSelected ? colors.primary : colors.border,
                      },
                    ]}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.levelText,
                        {
                          color: isSelected ? '#FFFFFF' : colors.textSecondary,
                          fontWeight: isSelected ? '600' : '500',
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
            <Text style={[styles.levelTitle, { color: colors.textPrimary, marginTop: 24 }]}>
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
                        backgroundColor: isSelected ? colors.primary : colors.cardAlt,
                        borderColor: isSelected ? colors.primary : colors.border,
                      },
                    ]}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.levelText,
                        {
                          color: isSelected ? '#FFFFFF' : colors.textSecondary,
                          fontWeight: isSelected ? '600' : '500',
                        },
                      ]}
                    >
                      {lvl}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Notes */}
            <Text style={[styles.levelTitle, { color: colors.textPrimary, marginTop: 24 }]}>
              Thoughts & Journal Note
            </Text>
            <TextInput
              style={[
                styles.noteInput,
                {
                  backgroundColor: colors.cardAlt,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                },
              ]}
              placeholder="What made you feel grounded or uplifted today?"
              placeholderTextColor={colors.textMuted}
              value={noteText}
              onChangeText={setNoteText}
              multiline
            />

            {/* Save Button */}
            <TouchableOpacity
              style={[styles.saveBtn, { backgroundColor: colors.primary }]}
              activeOpacity={0.88}
              onPress={handleSave}
            >
              <Text style={styles.saveBtnText}>Save Reflection</Text>
            </TouchableOpacity>
          </SoftCard>
        )}

        {activeTab === 'sleep' && (
          <SoftCard style={{ padding: 24 }} borderRadius={20}>
            <View style={styles.sleepHeroRow}>
              <View>
                <Text style={[styles.sleepDuration, { color: colors.textPrimary }]}>
                  {wellness.sleep.duration}
                </Text>
                <Text style={[styles.sleepSubtitle, { color: colors.textSecondary }]}>
                  Deep, restorative sleep recorded
                </Text>
              </View>
              <View style={[styles.sleepIconBox, { backgroundColor: colors.moonNightSoft }]}>
                <IconMoon size={22} color={colors.moonNight} />
              </View>
            </View>

            <View style={[styles.sleepDetailsRow, { borderTopColor: colors.borderSubtle }]}>
              <View style={styles.sleepCol}>
                <Text style={[styles.sleepColLabel, { color: colors.textMuted }]}>FELL ASLEEP</Text>
                <Text style={[styles.sleepColVal, { color: colors.textPrimary }]}>
                  {wellness.sleep.sleepTime}
                </Text>
              </View>

              <View style={styles.sleepCol}>
                <Text style={[styles.sleepColLabel, { color: colors.textMuted }]}>WOKE UP</Text>
                <Text style={[styles.sleepColVal, { color: colors.textPrimary }]}>
                  {wellness.sleep.wakeTime}
                </Text>
              </View>

              <View style={styles.sleepCol}>
                <Text style={[styles.sleepColLabel, { color: colors.textMuted }]}>GOAL</Text>
                <Text style={[styles.sleepColVal, { color: colors.textPrimary }]}>
                  {wellness.sleep.targetHours}h 00m
                </Text>
              </View>
            </View>
          </SoftCard>
        )}

        {activeTab === 'journal' && (
          <SoftCard style={{ padding: 24 }} borderRadius={20}>
            <Text style={[styles.journalHeading, { color: colors.textPrimary }]}>
              Daily Gratitude
            </Text>
            <Text style={[styles.journalSub, { color: colors.textSecondary }]}>
              Take 2 minutes to write down three things that brought you calm today.
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
              placeholder="1. The morning sunlight during my skincare routine..."
              placeholderTextColor={colors.textMuted}
              multiline
            />

            <TouchableOpacity
              style={[styles.saveBtn, { backgroundColor: colors.primary, marginTop: 18 }]}
              onPress={() => alert('Gratitude entry saved.')}
              activeOpacity={0.88}
            >
              <Text style={styles.saveBtnText}>Save Gratitude Entry</Text>
            </TouchableOpacity>
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
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  questionSubtitle: {
    fontSize: 13,
    marginTop: 4,
    marginBottom: 24,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    alignItems: 'center',
    width: '18%',
  },
  moodIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  levelTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 14,
  },
  noteInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    height: 90,
    textAlignVertical: 'top',
    fontSize: 14,
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
  sleepHeroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  sleepDuration: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  sleepSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  sleepIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sleepDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 18,
    borderTopWidth: 1,
  },
  sleepCol: {
    alignItems: 'center',
  },
  sleepColLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  sleepColVal: {
    fontSize: 14,
    fontWeight: '600',
  },
  journalHeading: {
    fontSize: 16,
    fontWeight: '600',
  },
  journalSub: {
    fontSize: 13,
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 20,
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
