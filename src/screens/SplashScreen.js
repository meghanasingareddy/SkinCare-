import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../data/AppContext';
import { LotusLogo } from '../components/LotusLogo';

export const SplashScreen = () => {
  const { colors, accent, setAccent } = useTheme();
  const { navigate } = useApp();
  const { height } = useWindowDimensions();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Background Soft Glow / Waves */}
      <View
        style={[
          styles.glowCircle,
          {
            backgroundColor: colors.primarySoft,
            top: -height * 0.15,
          },
        ]}
      />

      <View style={styles.content}>
        <View style={styles.brandHero}>
          <LotusLogo size={88} showText={false} centered={true} />
          <Text style={[styles.mainTitle, { color: colors.textPrimary }]}>
            Glow<Text style={{ color: colors.primary }}>Track</Text>
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Your Self-Care Companion
          </Text>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.continueButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.85}
            onPress={() => navigate('home')}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.themeSelectorSection}>
            <Text style={[styles.chooseThemeLabel, { color: colors.textSecondary }]}>
              Choose Theme Color
            </Text>
            <View style={styles.colorRow}>
              {/* Blue accent option */}
              <TouchableOpacity
                onPress={() => setAccent('blue')}
                style={styles.colorOption}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.colorCircle,
                    { backgroundColor: '#5B83B7' },
                    accent === 'blue' && styles.selectedCircle,
                  ]}
                >
                  {accent === 'blue' && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text
                  style={[
                    styles.colorName,
                    {
                      color: accent === 'blue' ? '#5B83B7' : colors.textSecondary,
                      fontWeight: accent === 'blue' ? '700' : '500',
                    },
                  ]}
                >
                  Blue
                </Text>
              </TouchableOpacity>

              {/* Pink accent option */}
              <TouchableOpacity
                onPress={() => setAccent('pink')}
                style={styles.colorOption}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.colorCircle,
                    { backgroundColor: '#D96B91' },
                    accent === 'pink' && styles.selectedCircle,
                  ]}
                >
                  {accent === 'pink' && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text
                  style={[
                    styles.colorName,
                    {
                      color: accent === 'pink' ? '#D96B91' : colors.textSecondary,
                      fontWeight: accent === 'pink' ? '700' : '500',
                    },
                  ]}
                >
                  Pink
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  glowCircle: {
    position: 'absolute',
    left: -50,
    right: -50,
    height: 500,
    borderRadius: 250,
    opacity: 0.7,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingVertical: 50,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  brandHero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  mainTitle: {
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: '400',
  },
  bottomSection: {
    width: '100%',
    marginBottom: 20,
  },
  continueButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  themeSelectorSection: {
    marginTop: 28,
    alignItems: 'center',
  },
  chooseThemeLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 14,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 36,
  },
  colorOption: {
    alignItems: 'center',
  },
  colorCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorName: {
    marginTop: 8,
    fontSize: 13,
  },
});
