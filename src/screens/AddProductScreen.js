import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useApp } from '../data/AppContext';
import { AppHeader } from '../components/AppHeader';
import { SoftCard } from '../components/SoftCard';
import {
  IconFace,
  IconHair,
  IconBody,
  IconOral,
  IconMoreCare,
  IconChevronRight,
} from '../components/Icons';

export const AddProductScreen = () => {
  const { colors } = useTheme();
  const { addProduct, selectedBrand, navigate, goBack } = useApp();

  const [selectedArea, setSelectedArea] = useState('Face');
  const [category, setCategory] = useState('Serum');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [productName, setProductName] = useState('Vitamin C Serum');
  const [notes, setNotes] = useState('Morning application for brightening and antioxidant protection');
  const [saveToProducts, setSaveToProducts] = useState(true);

  const areas = [
    { label: 'Face', IconComponent: IconFace },
    { label: 'Hair', IconComponent: IconHair },
    { label: 'Body', IconComponent: IconBody },
    { label: 'Oral', IconComponent: IconOral },
    { label: 'Other', IconComponent: IconMoreCare },
  ];

  const categoryMap = {
    Face: ['Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen', 'Eye Care', 'Lip Care', 'Face Mask', 'Exfoliator', 'Other'],
    Hair: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Serum', 'Hair Mask', 'Leave-in', 'Scalp Treatment', 'Other'],
    Body: ['Body Wash', 'Body Lotion', 'Body Scrub', 'Body Oil', 'Deodorant', 'Body Sunscreen', 'Hand Cream', 'Foot Cream', 'Other'],
    Oral: ['Toothbrush', 'Toothpaste', 'Tongue Cleaner', 'Mouthwash', 'Floss', 'Other'],
    Other: ['Treatment', 'Balm', 'Mist', 'Other'],
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area);
    const availableCategories = categoryMap[area] || categoryMap.Face;
    setCategory(availableCategories[0]);
  };

  const handleSave = () => {
    if (!productName.trim()) {
      alert('Please enter a product name');
      return;
    }

    if (saveToProducts) {
      addProduct({
        name: productName,
        category,
        area: selectedArea,
        brand: selectedBrand,
        notes,
      });
    }

    alert(`Saved ${productName} to your skincare shelf.`);
    navigate('products');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="Add Product"
        showBack={true}
        onBack={goBack}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Where do you use this product? */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
          Where do you use this product?
        </Text>

        <View style={styles.areasRow}>
          {areas.map((a) => {
            const isSelected = selectedArea === a.label;
            const IconComp = a.IconComponent;
            return (
              <TouchableOpacity
                key={a.label}
                onPress={() => handleAreaChange(a.label)}
                style={styles.areaItem}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.areaCircle,
                    {
                      backgroundColor: isSelected ? colors.primarySoft : colors.card,
                      borderColor: isSelected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <IconComp size={20} color={isSelected ? colors.primary : colors.textSecondary} />
                </View>
                <Text
                  style={[
                    styles.areaLabel,
                    {
                      color: isSelected ? colors.primary : colors.textSecondary,
                      fontWeight: isSelected ? '600' : '500',
                    },
                  ]}
                >
                  {a.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Product Category */}
        <Text style={[styles.fieldLabel, { color: colors.textPrimary, marginTop: 20 }]}>
          Product Category
        </Text>
        <TouchableOpacity
          style={[styles.pickerInput, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          activeOpacity={0.8}
        >
          <Text style={[styles.pickerValue, { color: colors.textPrimary }]}>{category}</Text>
          <Text style={[styles.pickerArrow, { color: colors.textSecondary }]}>
            {showCategoryPicker ? '▴' : '▾'}
          </Text>
        </TouchableOpacity>

        {showCategoryPicker && (
          <SoftCard style={styles.dropdownCard} padding={6}>
            {(categoryMap[selectedArea] || categoryMap.Face).map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.dropdownOption,
                  category === cat && { backgroundColor: colors.primarySoft },
                ]}
                onPress={() => {
                  setCategory(cat);
                  setShowCategoryPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: category === cat ? colors.primary : colors.textPrimary,
                      fontWeight: category === cat ? '600' : '400',
                    },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </SoftCard>
        )}

        {/* Brand / Company (ONE FIELD) */}
        <View style={styles.brandHeaderRow}>
          <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>
            Brand / Company
          </Text>
          <TouchableOpacity onPress={() => navigate('select_brand')}>
            <Text style={[styles.typeOwnLink, { color: colors.primary }]}>
              Choose from list or custom
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.pickerInput, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => navigate('select_brand')}
          activeOpacity={0.8}
        >
          <Text style={[styles.pickerValue, { color: colors.textPrimary }]}>
            {selectedBrand || 'Select brand / company'}
          </Text>
          <IconChevronRight size={14} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Product Name */}
        <Text style={[styles.fieldLabel, { color: colors.textPrimary, marginTop: 18 }]}>
          Product Name
        </Text>
        <TextInput
          style={[
            styles.textInput,
            { backgroundColor: colors.card, borderColor: colors.border, color: colors.textPrimary },
          ]}
          value={productName}
          onChangeText={setProductName}
          placeholder="e.g. Vitamin C Serum"
          placeholderTextColor={colors.textMuted}
        />

        {/* Notes (Optional) */}
        <Text style={[styles.fieldLabel, { color: colors.textPrimary, marginTop: 18 }]}>
          Usage Notes & Actives (Optional)
        </Text>
        <TextInput
          style={[
            styles.textInput,
            styles.notesInput,
            { backgroundColor: colors.card, borderColor: colors.border, color: colors.textPrimary },
          ]}
          value={notes}
          onChangeText={setNotes}
          placeholder="e.g. Apply after toner, follow with moisturizer"
          placeholderTextColor={colors.textMuted}
          multiline
        />

        {/* Save to My Products toggle */}
        <View style={[styles.toggleRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>
            Save to My Products Shelf
          </Text>
          <Switch
            value={saveToProducts}
            onValueChange={setSaveToProducts}
            trackColor={{
              false: '#E0D8DA',
              true: colors.primary,
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: colors.primary }]}
          activeOpacity={0.88}
          onPress={handleSave}
        >
          <Text style={styles.saveBtnText}>Save to Products</Text>
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 14,
  },
  areasRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  areaItem: {
    alignItems: 'center',
    width: '18%',
  },
  areaCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  areaLabel: {
    fontSize: 12,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  brandHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 8,
  },
  typeOwnLink: {
    fontSize: 12,
    fontWeight: '500',
  },
  pickerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1,
  },
  pickerValue: {
    fontSize: 14,
  },
  pickerArrow: {
    fontSize: 14,
  },
  dropdownCard: {
    marginTop: 6,
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 14,
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 14,
  },
  notesInput: {
    height: 70,
    textAlignVertical: 'top',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 20,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '500',
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
