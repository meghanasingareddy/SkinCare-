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

export const BrandSelectionScreen = () => {
  const { colors } = useTheme();
  const { brands, selectedBrand, setSelectedBrand, addCustomBrand, goBack } = useApp();

  const [search, setSearch] = useState('');
  const [customBrandText, setCustomBrandText] = useState('');
  const [saveForFuture, setSaveForFuture] = useState(true);
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const filteredBrands = brands.filter((b) =>
    b.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectBrand = (brand) => {
    setIsOtherSelected(false);
    setSelectedBrand(brand);
    goBack();
  };

  const handleSaveOther = () => {
    if (!customBrandText.trim()) {
      alert('Please enter a brand / company name');
      return;
    }
    addCustomBrand(customBrandText.trim(), saveForFuture);
    goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Select Brand"
        showBack={true}
        onBack={goBack}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View
          style={[
            styles.searchBar,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={{ fontSize: 14, marginRight: 8 }}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Search brand..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={{ color: colors.textMuted, fontSize: 14 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Brands List */}
        <SoftCard style={{ padding: 6, marginTop: 14 }}>
          {filteredBrands.map((brand, idx) => {
            const isSelected = !isOtherSelected && selectedBrand === brand;
            return (
              <TouchableOpacity
                key={brand}
                style={[
                  styles.brandRow,
                  idx < filteredBrands.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.borderSubtle,
                  },
                ]}
                onPress={() => handleSelectBrand(brand)}
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
                    styles.brandText,
                    {
                      color: isSelected ? colors.primary : colors.textPrimary,
                      fontWeight: isSelected ? '700' : '400',
                    },
                  ]}
                >
                  {brand}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Others (Type your own) */}
          <TouchableOpacity
            style={[
              styles.brandRow,
              { borderTopWidth: 1, borderTopColor: colors.borderSubtle },
            ]}
            onPress={() => setIsOtherSelected(true)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radioCircle,
                {
                  borderColor: isOtherSelected ? colors.primary : colors.border,
                },
              ]}
            >
              {isOtherSelected && (
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
                styles.brandText,
                {
                  color: isOtherSelected ? colors.primary : colors.textPrimary,
                  fontWeight: isOtherSelected ? '700' : '500',
                },
              ]}
            >
              Others (Type your own)
            </Text>
          </TouchableOpacity>

          {isOtherSelected && (
            <View style={styles.customBrandInputArea}>
              <TextInput
                style={[
                  styles.customInput,
                  {
                    backgroundColor: colors.cardAlt,
                    borderColor: colors.border,
                    color: colors.textPrimary,
                  },
                ]}
                placeholder="Enter brand / company name"
                placeholderTextColor={colors.textMuted}
                value={customBrandText}
                onChangeText={setCustomBrandText}
                autoFocus
              />

              {/* Checkbox: Save this brand for future use */}
              <TouchableOpacity
                style={styles.saveFutureRow}
                onPress={() => setSaveForFuture(!saveForFuture)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: saveForFuture ? colors.primary : colors.border,
                      backgroundColor: saveForFuture ? colors.primary : 'transparent',
                    },
                  ]}
                >
                  {saveForFuture && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={[styles.saveFutureLabel, { color: colors.textSecondary }]}>
                  Save this brand for future use
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.applyBrandBtn, { backgroundColor: colors.primary }]}
                onPress={handleSaveOther}
                activeOpacity={0.8}
              >
                <Text style={styles.applyBrandText}>Use This Brand</Text>
              </TouchableOpacity>
            </View>
          )}
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 12,
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
  brandText: {
    fontSize: 15,
  },
  customBrandInputArea: {
    padding: 12,
    marginTop: 6,
  },
  customInput: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 14,
    marginBottom: 12,
  },
  saveFutureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
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
  saveFutureLabel: {
    fontSize: 13,
  },
  applyBrandBtn: {
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBrandText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
