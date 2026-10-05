import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { AppProvider, useApp } from './src/data/AppContext';
import { ResponsiveContainer } from './src/components/ResponsiveContainer';

// Screens
import { SplashScreen } from './src/screens/SplashScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { RoutineScreen } from './src/screens/RoutineScreen';
import { MoreCareScreen } from './src/screens/MoreCareScreen';
import { AddCareItemScreen } from './src/screens/AddCareItemScreen';
import { ProductsScreen } from './src/screens/ProductsScreen';
import { AddProductScreen } from './src/screens/AddProductScreen';
import { BrandSelectionScreen } from './src/screens/BrandSelectionScreen';
import { NutritionScreen } from './src/screens/NutritionScreen';
import { WellnessScreen } from './src/screens/WellnessScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

const RootNavigator = () => {
  const { currentScreen } = useApp();
  const { isDark, colors } = useTheme();

  if (currentScreen === 'splash') {
    return (
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <SplashScreen />
      </View>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'routine':
        return <RoutineScreen />;
      case 'more_care':
        return <MoreCareScreen />;
      case 'add_care_item':
        return <AddCareItemScreen />;
      case 'products':
        return <ProductsScreen />;
      case 'add_product':
        return <AddProductScreen />;
      case 'select_brand':
        return <BrandSelectionScreen />;
      case 'nutrition':
        return <NutritionScreen />;
      case 'wellness':
        return <WellnessScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <ResponsiveContainer
      hideBottomNav={['splash', 'add_care_item', 'add_product', 'select_brand'].includes(
        currentScreen
      )}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {renderScreen()}
    </ResponsiveContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider initialMode="light">
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
