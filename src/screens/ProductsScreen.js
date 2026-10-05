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

export const ProductsScreen = () => {
  const { colors, isDark } = useTheme();
  const { products, navigate, goBack } = useApp();

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
            style={[styles.iconBtn, { backgroundColor: colors.cardAlt, borderColor: colors.border }]}
            onPress={() => navigate('add_product')}
          >
            <Text style={{ fontSize: 16 }}>➕</Text>
          </TouchableOpacity>
        }
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
            placeholder="Search your products..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={{ color: colors.textMuted, fontSize: 14 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Pills: [ Face ] [ Hair ] [ Body ] [ Oral ] [ Other ] */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsContainer}
        >
          {areas.map((area) => {
            const isSelected = selectedArea === area;
            return (
              <TouchableOpacity
                key={area}
                onPress={() => setSelectedArea(area)}
                style={[
                  styles.pill,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.pillText,
                    {
                      color: isSelected ? '#FFFFFF' : colors.textSecondary,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {area}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Products List */}
        <View style={styles.productList}>
          {filteredProducts.length === 0 ? (
            <SoftCard style={styles.emptyCard} padding={24}>
              <Text style={{ fontSize: 32, textAlign: 'center', marginBottom: 8 }}>🧴</Text>
              <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
                No products found
              </Text>
              <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
                Tap "+ Add Product" below to add a new skincare or haircare item.
              </Text>
            </SoftCard>
          ) : (
            filteredProducts.map((prod) => (
              <SoftCard
                key={prod.id}
                style={styles.productCard}
                padding={14}
                onPress={() =>
                  alert(`${prod.name}\nBrand: ${prod.brand}\nNotes: ${prod.notes || 'None'}`)
                }
              >
                <View style={styles.productRow}>
                  <View style={[styles.prodIconCircle, { backgroundColor: colors.primarySoft }]}>
                    <Text style={{ fontSize: 20 }}>{prod.icon || '🧴'}</Text>
                  </View>

                  <View style={styles.prodInfo}>
                    <Text style={[styles.prodName, { color: colors.textPrimary }]}>
                      {prod.name}
                    </Text>
                    <Text style={[styles.prodSub, { color: colors.textSecondary }]}>
                      {prod.category} • {prod.area}
                    </Text>
                  </View>

                  <Text style={[styles.chevron, { color: colors.textMuted }]}>›</Text>
                </View>
              </SoftCard>
            ))
          )}
        </View>

        {/* Floating / Bottom Action Button */}
        <TouchableOpacity
          style={[styles.addProductBtn, { backgroundColor: colors.primary }]}
          activeOpacity={0.85}
          onPress={() => navigate('add_product')}
        >
          <Text style={styles.addProductBtnText}>+ Add Product</Text>
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
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  pillsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    marginBottom: 16,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 13,
  },
  productList: {
    gap: 12,
  },
  productCard: {
    borderRadius: 18,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prodIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  prodInfo: {
    flex: 1,
  },
  prodName: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  prodSub: {
    fontSize: 12,
    marginTop: 3,
  },
  chevron: {
    fontSize: 20,
    paddingHorizontal: 4,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  addProductBtn: {
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
  addProductBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
