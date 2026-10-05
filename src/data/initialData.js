export const INITIAL_BRANDS = [
  'Minimalist',
  'The Derma Co',
  'Deconstruct',
  'Dot & Key',
  'Plum',
  'Mamaearth',
  'Cetaphil',
  'CeraVe',
  'Neutrogena',
  'The Ordinary',
  'COSRX',
  'La Roche-Posay',
  'Bioderma',
  'Simple',
  'Clinique',
  'Beauty of Joseon',
  'Innisfree',
  'Nivea',
  'Vaseline',
  'Dove',
  'L\'Oréal',
  'Tresemmé',
  'OGX',
  'Schwarzkopf',
  'Matrix',
  'Head & Shoulders',
  'Pantene',
  'Colgate',
  'Sensodyne',
  'Oral-B',
  'Listerine',
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod_1',
    name: 'Cetaphil Gentle Cleanser',
    category: 'Cleanser',
    area: 'Face',
    brand: 'Cetaphil',
    notes: 'Hydrating, non-foaming daily wash',
    icon: '🧴',
  },
  {
    id: 'prod_2',
    name: 'Minimalist Vitamin C Serum',
    category: 'Serum',
    area: 'Face',
    brand: 'Minimalist',
    notes: '10% Ethyl Ascorbic Acid + Centella',
    icon: '🧪',
  },
  {
    id: 'prod_3',
    name: 'The Ordinary Moisturizer',
    category: 'Moisturizer',
    area: 'Face',
    brand: 'The Ordinary',
    notes: 'Natural Moisturizing Factors + HA',
    icon: '🧴',
  },
  {
    id: 'prod_4',
    name: 'Nivea Sunscreen',
    category: 'Sunscreen',
    area: 'Face',
    brand: 'Nivea',
    notes: 'SPF 50+ PA++++ light feel',
    icon: '☀️',
  },
  {
    id: 'prod_5',
    name: 'Olaplex No. 3 Hair Perfector',
    category: 'Hair Mask',
    area: 'Hair',
    brand: 'Other',
    notes: 'Bond builder treatment',
    icon: '✨',
  },
  {
    id: 'prod_6',
    name: 'Dove Deep Moisture Body Wash',
    category: 'Body Wash',
    area: 'Body',
    brand: 'Dove',
    notes: 'Gentle microbiome wash',
    icon: '🫧',
  },
  {
    id: 'prod_7',
    name: 'Sensodyne Rapid Relief Toothpaste',
    category: 'Toothpaste',
    area: 'Oral',
    brand: 'Sensodyne',
    notes: 'Sensitivity protection',
    icon: '🪥',
  },
];

export const INITIAL_WEEKLY_CARE = [
  { id: 'care_1', name: 'Hair Wash', category: 'Hair Care', frequency: '3x per week', daysCount: 3, icon: '🚿' },
  { id: 'care_2', name: 'Hair Oil', category: 'Hair Care', frequency: '2x per week', daysCount: 2, icon: '💧' },
  { id: 'care_3', name: 'Face Mask', category: 'Face Care', frequency: '1x per week', daysCount: 1, icon: '🧖‍♀️' },
  { id: 'care_4', name: 'Body Scrub', category: 'Body Care', frequency: '1x per week', daysCount: 1, icon: '🫧' },
  { id: 'care_5', name: 'Scalp Treatment', category: 'Hair Care', frequency: 'Monthly', daysCount: 1, icon: '💆‍♀️' },
  { id: 'care_6', name: 'Grooming (Nails)', category: 'Grooming', frequency: 'Every 2 weeks', daysCount: 1, icon: '💅' },
];

export const INITIAL_MORE_CARE_ITEMS = [
  { id: 'mc_1', name: 'Wake up after first alarm', category: 'Productivity', enabled: true, icon: '⏰' },
  { id: 'mc_2', name: 'Daily 5K steps', category: 'Fitness', enabled: true, icon: '👟' },
  { id: 'mc_3', name: 'Meditation', category: 'Wellness', enabled: false, icon: '🧘‍♀️' },
  { id: 'mc_4', name: 'Hydration goal', category: 'Hydration', enabled: true, icon: '💧' },
  { id: 'mc_5', name: 'Nutrition requirements', category: 'Nutrition', enabled: true, icon: '🥗' },
  { id: 'mc_6', name: 'Protein requirement', category: 'Nutrition', enabled: true, icon: '🥩' },
  { id: 'mc_7', name: 'Oats', category: 'Nutrition', enabled: false, icon: '🥣' },
  { id: 'mc_8', name: 'Fruits & vegetables', category: 'Nutrition', enabled: true, icon: '🍎' },
  { id: 'mc_9', name: 'Mood tracking', category: 'Wellness', enabled: true, icon: '😊' },
  { id: 'mc_10', name: 'Sleep tracking', category: 'Wellness', enabled: true, icon: '🌙' },
  { id: 'mc_11', name: 'Scalp treatment', category: 'Hair Care', enabled: false, icon: '💆‍♀️' },
  { id: 'mc_12', name: 'Cleaning / tidying', category: 'Productivity', enabled: false, icon: '🧹' },
  { id: 'mc_13', name: 'Study / learning', category: 'Productivity', enabled: false, icon: '📖' },
  { id: 'mc_14', name: 'English practice', category: 'Productivity', enabled: false, icon: '🗣️' },
  { id: 'mc_15', name: 'Journaling / gratitude', category: 'Wellness', enabled: false, icon: '✍️' },
];

export const INITIAL_ROUTINE = {
  morning: [
    {
      category: 'Face Care',
      icon: '🧖‍♀️',
      items: [
        { id: 'm_f_1', name: 'Cleanser', completed: true },
        { id: 'm_f_2', name: 'Toner', completed: true },
        { id: 'm_f_3', name: 'Serum', completed: true },
        { id: 'm_f_4', name: 'Moisturizer', completed: true },
        { id: 'm_f_5', name: 'Sunscreen', completed: true },
        { id: 'm_f_6', name: 'Eye Care', completed: true },
      ],
    },
    {
      category: 'Hair Care',
      icon: '💇‍♀️',
      items: [
        { id: 'm_h_1', name: 'Hair Serum', completed: true },
        { id: 'm_h_2', name: 'Leave-in Spray', completed: false },
      ],
    },
    {
      category: 'Body Care',
      icon: '🧴',
      items: [
        { id: 'm_b_1', name: 'Body Wash', completed: true },
        { id: 'm_b_2', name: 'Body Lotion', completed: false },
        { id: 'm_b_3', name: 'Deodorant', completed: false },
      ],
    },
    {
      category: 'Oral Care',
      icon: '🪥',
      items: [
        { id: 'm_o_1', name: 'Brush', completed: false },
        { id: 'm_o_2', name: 'Tongue Cleaning', completed: false },
      ],
    },
  ],
  night: [
    {
      category: 'Face Care',
      icon: '🧖‍♀️',
      items: [
        { id: 'n_f_1', name: 'Cleanser', completed: true },
        { id: 'n_f_2', name: 'Retinol Serum', completed: false },
        { id: 'n_f_3', name: 'Night Moisturizer', completed: false },
        { id: 'n_f_4', name: 'Lip Mask', completed: false },
      ],
    },
    {
      category: 'Hair Care',
      icon: '💇‍♀️',
      items: [
        { id: 'n_h_1', name: 'Scalp Massage', completed: false },
        { id: 'n_h_2', name: 'Hair Oil', completed: false },
      ],
    },
    {
      category: 'Body Care',
      icon: '🧴',
      items: [
        { id: 'n_b_1', name: 'Shower', completed: true },
        { id: 'n_b_2', name: 'Body Butter', completed: false },
        { id: 'n_b_3', name: 'Hand & Foot Cream', completed: false },
      ],
    },
    {
      category: 'Oral Care',
      icon: '🪥',
      items: [
        { id: 'n_o_1', name: 'Brush', completed: false },
        { id: 'n_o_2', name: 'Floss', completed: false },
      ],
    },
  ],
};

export const INITIAL_NUTRITION = {
  meals: {
    breakfast: true,
    lunch: true,
    snack: true,
    dinner: false,
  },
  proteinCurrent: 64,
  proteinTarget: 80,
  waterCurrent: 1.5,
  waterTarget: 2.5,
  intake: {
    oats: 1,
    fruits: 2,
    vegetables: 3,
    addedSugar: 1,
    junkFood: 0,
  },
  weeklyMatrix: [
    { day: 'Mon', date: '12', meals: '4/4', protein: 80, water: 2.5, oats: '✓', junk: 0, sugar: 0, fruits: 3, veg: 3 },
    { day: 'Tue', date: '13', meals: '4/4', protein: 72, water: 2.2, oats: '✓', junk: 1, sugar: 1, fruits: 2, veg: 4 },
    { day: 'Wed', date: '14', meals: '3/4', protein: 68, water: 2.0, oats: '-', junk: 0, sugar: 0, fruits: 2, veg: 3 },
    { day: 'Thu', date: '15', meals: '4/4', protein: 84, water: 2.6, oats: '✓', junk: 0, sugar: 1, fruits: 3, veg: 4 },
    { day: 'Fri', date: '16', meals: '4/4', protein: 75, water: 2.1, oats: '✓', junk: 2, sugar: 1, fruits: 2, veg: 2 },
    { day: 'Sat', date: '17', meals: '3/4', protein: 62, water: 1.9, oats: '-', junk: 1, sugar: 2, fruits: 1, veg: 2 },
    { day: 'Sun', date: '18', meals: '3/4', protein: 64, water: 1.5, oats: '✓', junk: 0, sugar: 1, fruits: 2, veg: 3 },
  ],
};

export const INITIAL_WELLNESS = {
  mood: 'good', // 'very_low', 'low', 'okay', 'good', 'very_good'
  energy: 4, // 1 - 5
  stress: 2, // 1 - 5
  note: 'Felt calm and energized after morning skincare and a brief morning walk.',
  sleep: {
    sleepTime: '11:00 PM',
    wakeTime: '06:20 AM',
    duration: '7h 20m',
    quality: 4,
    targetHours: 8,
  },
};

export const INITIAL_PROGRESS = {
  currentStreak: 7,
  longestStreak: 24,
  weeklyCompletion: 81,
  monthlyCompletion: 78,
  categories: [
    { id: 'skincare', label: 'Skincare', percentage: 86, icon: '🧖‍♀️', enabled: true },
    { id: 'haircare', label: 'Haircare', percentage: 74, icon: '💇‍♀️', enabled: true },
    { id: 'bodycare', label: 'Body Care', percentage: 79, icon: '🧴', enabled: true },
    { id: 'oralcare', label: 'Oral Care', percentage: 60, icon: '🪥', enabled: true },
    { id: 'nutrition', label: 'Nutrition', percentage: 82, icon: '🥗', enabled: true },
    { id: 'hydration', label: 'Hydration', percentage: 91, icon: '💧', enabled: true },
    { id: 'fitness', label: 'Fitness (Steps)', percentage: 66, icon: '👟', enabled: true },
    { id: 'wellness', label: 'Wellness', percentage: 76, icon: '🧘‍♀️', enabled: true },
    { id: 'grooming', label: 'Grooming', percentage: 80, icon: '💅', enabled: true },
  ],
};
