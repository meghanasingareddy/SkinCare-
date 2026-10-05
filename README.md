# GlowTrack - Cross-Platform Self-Care & Lifestyle Tracking App

A cross-platform self-care, skincare, and lifestyle companion built with **React Native (Expo)** designed to run on **iOS, Android, Web, and Desktop**.

The app adheres to the design reference:
- **Soft Pastel Aesthetics**: Rounded cards, subtle borders, soft shadows, clean typography.
- **4 Real-time Themes**:
  - Pink + Light (`#D96B91`, `#FAF8FA`)
  - Pink + Dark (`#D96B91`, `#151719`, `#202326`)
  - Blue + Light (`#5B83B7`, `#FAF8FA`)
  - Blue + Dark (`#5B83B7`, `#151719`, `#202326`)
- **Responsive Architecture**:
  - **Mobile (< 800px)**: Bottom Navigation (Home, Routine, Progress, Profile) with vertically stacked Routine cards.
  - **Desktop / Tablet / Web (≥ 800px)**: Persistent Left Sidebar navigation with Morning & Night routines placed side-by-side, plus wide overview cards and progress columns.

---

## 📱 Implemented Screens & Features

1. **Splash & Theme Selection (`SplashScreen.js`)**
   - Glowing Lotus branding (`GlowTrack`), subtitle, primary Continue button, and interactive Blue & Pink theme selector with live feedback.
2. **Home Dashboard (`HomeScreen.js`)**
   - Clean neutral header ("Mon, 12 May 2025"), week day selector (M-T-W-T-F-S-S), 6 pastel overview cards (Routine 6/8, Water 1.5/2.5L, Nutrition 3/5 meals, Steps 2,430/5K, Mood Good, Sleep 7h 20m), Quick Actions grid, and desktop split-view with today's progress bars.
3. **Routine (`RoutineScreen.js`)**
   - Side-by-side on wide screens / stacked on mobile.
   - Separate Morning (☀️) and Night (🌙) cards with category expandable sections (Face Care, Hair Care, Body Care, Oral Care) and interactive completion checkboxes.
   - **Weekly / Custom Care**: Frequency badges (3x/week, 2x/week, Monthly, etc.) and "+ Add Item".
4. **More Care (`MoreCareScreen.js`)**
   - Opt-in toggles (Wake up after first alarm, Daily 5K steps, Meditation, Hydration, Protein, Oats, Fruits & veg, Mood, Sleep, Scalp treatment, English practice, etc.). Only enabled items impact tracking.
5. **Add Care Item (`AddCareItemScreen.js`)**
   - Category picker (Face, Hair, Body, Oral, Grooming, Fitness, etc.), Item name, Frequency radio options (Not using, 1x/wk, 2x/wk, 3x/wk, Every 2 wks, Monthly, Custom Every X days/weeks/months/years).
6. **My Products (`ProductsScreen.js`)**
   - Search bar, area filter tags (Face, Hair, Body, Oral, Other), product cards list showing Brand, Name, Category, and "+ Add Product" button.
7. **Add Product (`AddProductScreen.js`)**
   - "Where do you use this product?" area picker, dynamic category dropdown based on area, "Brand / Company" picker with "+ Other (Type your own)" link, product name, optional notes, and "Save to My Products" switch.
8. **Brand Selection (`BrandSelectionScreen.js`)**
   - Searchable list of common skincare and haircare brands (Minimalist, The Derma Co, Cetaphil, CeraVe, The Ordinary, etc.) plus "Others (Type your own)" with input and "[✓] Save this brand for future use" checkbox.
9. **Nutrition Tracker (`NutritionScreen.js`)**
   - Daily / Weekly tabs, date switcher, meals completion check (Breakfast, Lunch, Snack, Dinner), Protein goal (64g/80g), Water goal (1.5L/2.5L) with quick add buttons (+250ml, +500ml, +750ml, +1L), Today's intake counters (Oats, Fruits, Vegetables, Sugar, Junk food), and full Weekly Consistency Matrix (Mon-Sun).
10. **Wellness (`WellnessScreen.js`)**
    - Mood face scale (Very low to Very good), Energy level (1-5), Stress level (1-5), "What's on your mind?" journal note, Sleep tracker (duration, sleep/wake times, quality, target), and daily gratitude reflection journal.
11. **Progress (`ProgressScreen.js`)**
    - Weekly and Monthly tabs, individual category progress bars (Skincare 86%, Haircare 74%, Body Care 79%, Oral Care 60%, Nutrition 82%, Hydration 91%, Fitness 66%, Wellness 76%, Grooming 80%), Current Streak, Best Streak, and completion rates.
12. **Profile & Settings (`ProfileScreen.js`)**
    - User avatar & info, skin & hair profile, goals, live Theme Accent selector (Pink/Blue), Light/Dark appearance toggle, and interactive 4-theme gallery switcher.

---

## 🚀 Running the App

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on Web directly
npm run web

# Run on Android / iOS
npm run android
npm run ios
```
