import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_BRANDS,
  INITIAL_PRODUCTS,
  INITIAL_WEEKLY_CARE,
  INITIAL_MORE_CARE_ITEMS,
  INITIAL_ROUTINE,
  INITIAL_NUTRITION,
  INITIAL_WELLNESS,
  INITIAL_PROGRESS,
} from './initialData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Navigation state
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [screenHistory, setScreenHistory] = useState(['splash']);

  // Brands list
  const [brands, setBrands] = useState(INITIAL_BRANDS);
  const [selectedBrand, setSelectedBrand] = useState('Minimalist');

  // Products
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Care & Routine
  const [routine, setRoutine] = useState(INITIAL_ROUTINE);
  const [weeklyCare, setWeeklyCare] = useState(INITIAL_WEEKLY_CARE);
  const [moreCareItems, setMoreCareItems] = useState(INITIAL_MORE_CARE_ITEMS);

  // Nutrition
  const [nutrition, setNutrition] = useState(INITIAL_NUTRITION);

  // Wellness
  const [wellness, setWellness] = useState(INITIAL_WELLNESS);

  // User Profile
  const [userProfile, setUserProfile] = useState({
    name: 'Meghana',
    email: 'meghana@glowtrack.app',
    skinType: 'Combination / Sensitive',
    hairType: 'Wavy / Medium Density',
    stepGoal: 5000,
    stepsToday: 2430,
  });

  // Navigation handlers
  const navigate = (screen) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop();
      setScreenHistory(nextHistory);
      setCurrentScreen(nextHistory[nextHistory.length - 1]);
    } else {
      setCurrentScreen('home');
    }
  };

  // Routine toggle
  const toggleRoutineItem = (timeOfDay, categoryIndex, itemId) => {
    setRoutine((prev) => {
      const updatedList = prev[timeOfDay].map((cat, idx) => {
        if (idx !== categoryIndex) return cat;
        return {
          ...cat,
          items: cat.items.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
        };
      });
      return { ...prev, [timeOfDay]: updatedList };
    });
  };

  // Add Care Item
  const addCareItem = (item) => {
    const newItem = {
      id: `care_${Date.now()}`,
      name: item.name,
      category: item.category,
      frequency: item.frequency,
      daysCount: item.daysCount || 1,
      icon: item.icon || '✨',
    };
    setWeeklyCare((prev) => [...prev, newItem]);
  };

  // Toggle More Care item (opt-in tracking)
  const toggleMoreCareItem = (id) => {
    setMoreCareItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  // Add brand
  const addCustomBrand = (brandName, saveForFuture = true) => {
    if (saveForFuture && brandName && !brands.includes(brandName)) {
      setBrands((prev) => [brandName, ...prev]);
    }
    setSelectedBrand(brandName);
  };

  // Add product
  const addProduct = (product) => {
    const newProduct = {
      id: `prod_${Date.now()}`,
      name: product.name,
      category: product.category,
      area: product.area,
      brand: product.brand,
      notes: product.notes || '',
      icon: product.icon || '🧴',
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Nutrition handlers
  const toggleMeal = (mealKey) => {
    setNutrition((prev) => ({
      ...prev,
      meals: {
        ...prev.meals,
        [mealKey]: !prev.meals[mealKey],
      },
    }));
  };

  const addWater = (amountLiters) => {
    setNutrition((prev) => ({
      ...prev,
      waterCurrent: Math.min(5.0, Number((prev.waterCurrent + amountLiters).toFixed(2))),
    }));
  };

  const updateIntake = (itemKey, delta) => {
    setNutrition((prev) => ({
      ...prev,
      intake: {
        ...prev.intake,
        [itemKey]: Math.max(0, prev.intake[itemKey] + delta),
      },
    }));
  };

  // Wellness handlers
  const updateMood = (mood) => {
    setWellness((prev) => ({ ...prev, mood }));
  };

  const updateEnergy = (energy) => {
    setWellness((prev) => ({ ...prev, energy }));
  };

  const updateStress = (stress) => {
    setWellness((prev) => ({ ...prev, stress }));
  };

  const updateWellnessNote = (note) => {
    setWellness((prev) => ({ ...prev, note }));
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigate,
        goBack,
        brands,
        selectedBrand,
        setSelectedBrand,
        addCustomBrand,
        products,
        addProduct,
        routine,
        toggleRoutineItem,
        weeklyCare,
        addCareItem,
        moreCareItems,
        toggleMoreCareItem,
        nutrition,
        toggleMeal,
        addWater,
        updateIntake,
        wellness,
        updateMood,
        updateEnergy,
        updateStress,
        updateWellnessNote,
        userProfile,
        setUserProfile,
        progress: INITIAL_PROGRESS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
