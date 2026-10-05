# GlowTrack - Editorial Skincare & Wellness Companion

A premium, calm, editorial skincare and self-care tracking application built with **React Native / Expo** for **Web, iOS, Android, and macOS/Desktop**.

---

##  Tech Stack

### Core Framework & Runtime
* **[React Native](https://reactnative.dev/) (v0.74.5)** – Cross-platform native UI framework targeting iOS, Android, and Web.
* **[React](https://react.dev/) (v18.2.0)** – Component-driven architecture utilizing modern React Hooks (`useState`, `useContext`, `useMemo`).
* **[Expo](https://expo.dev/) (SDK 51)** – Unified universal runtime, build system, and cross-platform mobile toolchain.

### Web Engine & Cross-Platform Rendering
* **[React Native Web](https://necolas.github.io/react-native-web/) (v0.19.10)** – Compiles React Native primitives into responsive, high-performance HTML5 and CSS.
* **React DOM (v18.2.0)** – Web rendering engine.
* **@expo/metro-runtime (v3.2.3)** – Fast Refresh development and bundling engine for web browsers.

### State & Architecture
* **React Context API** – Lightweight, reactive global state architecture:
  * `AppContext.js`: Centralized store for routine checklist items, water tracking, meal logs, product shelf items, and wellness check-ins.
  * `ThemeContext.js`: Real-time semantic theme provider with instant Light / Dark mode toggling.
* **Modular Architecture**: Complete separation of concerns across `theme/`, `components/`, `screens/`, and `data/`.

### Design System & Styling
* **Custom Editorial Theme System**:
  * Bespoke palette: Light background (`#FAF8F6`), deep berry accent (`#B85C78`), soft rose pill (`#F4DDE5`), and charcoal plum typography (`#292528`).
  * Full dark mode support using deep charcoal/plum surfaces (`#1C191B`, `#262225`).
* **Zero-Emoji Vector Icon System** (`src/components/Icons.js`): Pure, crisp vector SVG icons rendered universally across web and mobile platforms.
* **Responsive Breakpoint Layout** (`ResponsiveContainer.js`):
  * **Desktop / Tablet (≥ 860px)**: Persistent left sidebar navigation and side-by-side routine columns.
  * **Mobile (< 860px)**: Compact bottom navigation bar with vertically stacked cards.

### Tooling & Compilation
* **Babel (v7.20.0)** with `babel-preset-expo` – Modern JavaScript (ESNext) and JSX transpilation.
* **Expo CLI** – Cross-platform local dev server, web bundler, and simulator launcher.

---

## 🌸 Visual Design System

- **Default Mode**: Clean, warm Light Mode (`#FAF8F6`)
- **Palette**:
  - Background: `#FAF8F6`
  - Surfaces / Cards: `#FFFFFF`
  - Primary Accent: `#B85C78` (deep muted rose / berry)
  - Soft Accent: `#F4DDE5` (delicate rose pill & active indicator)
  - Primary Text: `#292528` (charcoal plum)
  - Secondary Text: `#81777B` (warm muted slate)
  - Delicate Borders: `#EDE5E7`
  - Success / Nourished: `#6E9B82` (calming sage green)
  - Hydration: `#6B90B2` (mineral soft blue)
- **Zero Random Emojis**: Pure vector SVG icons (`IconHome`, `IconRoutine`, `IconProducts`, `IconNutrition`, `IconWellness`, `IconProgress`, `IconProfile`, `IconSun`, `IconMoon`, `IconWaterDrop`, etc.) with consistent line weight and aesthetic.
- **Card Hierarchy**: Reduced card clutter, subtle 1px borders, 18px rounded corners, and soft natural elevation.

---

##  Redesigned Screens

1. **Onboarding / Welcome (`SplashScreen.js`)**
   - Clean, centered editorial layout with warm light background, vector lotus mark, "Your personal self-care companion", and prominent Continue CTA.
2. **Home Dashboard (`HomeScreen.js`)**
   - Editorial header: "Good morning, Meghana" • "Let's take care of you today."
   - Single primary daily progress card (`Today's progress: 72%`) with weekly consistency dots.
   - Interactive routine checklist (`Today's routine: 8 / 13 completed`).
   - Compact inline tracking controls for Water, Nourishment, Mood, and Rest (no oversized colorful metric cards).
3. **Routine (`RoutineScreen.js`)**
   - Dedicated Morning Ritual (07:30 AM) and Evening Care (10:30 PM).
   - Clean vertical timeline checklist with circle checkmarks and muted incomplete steps.
   - Weekly & Custom Care section with treatment frequencies and pencil action triggers.
4. **My Products (`ProductsScreen.js`)**
   - Clean minimal search bar.
   - Pill-shaped category filters (`Face`, `Hair`, `Body`, `Oral`, `Other`).
   - Editorial product cards with brand headers, category, and usage notes.
5. **Nourishment & Water (`NutritionScreen.js`)**
   - Prominent, simple water tracker with quick additions (+250ml, +500ml, +1L).
   - Clean meal completion indicators (Breakfast, Lunch, Snack, Dinner).
   - Delicate progress bars for protein and whole foods without forced calorie counting.
6. **Mindful Wellness (`WellnessScreen.js`)**
   - Clean vector line mood faces (Low, Tired, Balanced, Calm, Vibrant).
   - Discrete circular energy and stress selectors.
   - Journal reflection note and restorative sleep card.
7. **Consistency & Progress (`ProgressScreen.js`)**
   - Weekly & Monthly tabs.
   - Clean category consistency progress bars and minimalist streak metrics.
8. **Profile & Settings (`ProfileScreen.js`)**
   - Clean profile header with user avatar.
   - Categorized settings rows with delicate hairline dividers and Dark Mode switch.
9. **Desktop / Tablet Responsive Layout (`ResponsiveContainer.js`, `Sidebar.js`)**
   - Slimmer, cleaner sidebar with soft rose active pills.
   - Side-by-side routines on desktop widths with no horizontal overflow.

---

##  How to Run

In the project root `c:\meghna\Coding\proj\SkinCare+`:

```bash
# Install dependencies
npm install

# Run in Web browser
npx expo start --web

# Run on iOS / Android via Expo Go
npx expo start
```
