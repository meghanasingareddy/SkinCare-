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
import { IconSearch, IconPlus, IconChevronRight, IconProducts } from '../components/Icons';

export const ProductsScreen = () => {
  const { colors } = useTheme();
  const { products, navigate } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('Face');

  const areas = ['Face', 'Hair', 'Body', 'Oral', 'Other'];

  const filteredProducts = products.filter((p) => {
    const matchesArea = selectedArea === 'All' || p.area === selectedArea;
    const matchesQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesArea && matchesQuery;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        title="My Products"
        showBack={true}
        onBack={() => navigate('home')}
        rightActions={
          <TouchableOpacity
            style={[styles.headerAddBtn, { backgroundColor: colors.primarySoft }]}
            onPress={() => navigate('add_product')}
          >
            <IconPlus size={16} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Modern Minimal Search Bar */}
        <View
          style={[
            styles.searchBar,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <IconSearch size={16} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Search products by name or brand..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={{ color: colors.textMuted, fontSize: 13 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Pill-shaped Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsScroll}
        >
          {areas.map((area) => {
            const isSelected = selectedArea === area;
            return (
              <TouchableOpacity
                key={area}
                onPress={() => setSelectedArea(area)}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    {
                      color: isSelected ? '#FFFFFF' : colors.textSecondary,
                      fontWeight: isSelected ? '600' : '500',
                    },
                  ]}
                >
                  {area}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Attractive Product Cards */}
        <View style={styles.productList}>
          {filteredProducts.length === 0 ? (
            <SoftCard style={styles.emptyCard} padding={32}>
              <View style={[styles.emptyIconBox, { backgroundColor: colors.primarySoft }]}>
                <IconProducts size={24} color={colors.primary} />
              </View>
              <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
                No products in this category
              </Text>
              <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
                Add a product to track your skincare regimen and shelf items.
              </Text>
            </SoftCard>
          ) : (
            filteredProducts.map((prod) => (
              <SoftCard
                key={prod.id}
                style={styles.productCard}
                padding={16}
                borderRadius={18}
                onPress={() =>
                  alert(`${prod.name}\nBrand: ${prod.brand}\nCategory: ${prod.category}\nNotes: ${prod.notes || 'None'}`)
                }
              >
                <View style={styles.productRow}>
                  {/* Clean Product Graphic Box */}
                  <View style={[styles.productIconBox, { backgroundColor: colors.cardAlt }]}>
                    <IconProducts size={20} color={colors.primary} />
                  </View>

                  <View style={styles.productMain}>
                    <Text style={[styles.productBrand, { color: colors.textSecondary }]}>
                      {prod.brand.toUpperCase()}
                    </Text>
                    <Text style={[styles.productName, { color: colors.textPrimary }]}>
                      {prod.name}
                    </Text>
                    <Text style={[styles.productCategory, { color: colors.textSecondary }]}>
                      {prod.category} • {prod.area} Care
                    </Text>
                    {prod.notes ? (
                      <Text style={[styles.productNotes, { color: colors.textMuted }]}>
                        {prod.notes}
                      </Text>
                    ) : null}
                  </View>

                  <View style={[styles.detailsBtn, { borderColor: colors.border }]}>
                    <IconChevronRight size={14} color={colors.textSecondary} />
                  </View>
                </View>
              </SoftCard>
            ))
          )}
        </View>

        {/* Add Product Button */}
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: colors.primary }]}
          activeOpacity={0.88}
          onPress={() => navigate('add_product')}
        >
          <IconPlus size={16} color="#FFFFFF" />
          <Text style={styles.addBtnText}>Add New Product</Text>
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
  headerAddBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  pillsScroll: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterPillText: {
    fontSize: 13,
  },
  productList: {
    gap: 12,
  },
  productCard: {
    marginBottom: 2,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  productMain: {
    flex: 1,
  },
  productBrand: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  productCategory: {
    fontSize: 12,
    marginTop: 2,
  },
  productNotes: {
    fontSize: 11,
    marginTop: 4,
    fontStyle: 'italic',
  },
  detailsBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  emptyIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 240,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 26,
    shadowColor: '#B85C78',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 3,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
