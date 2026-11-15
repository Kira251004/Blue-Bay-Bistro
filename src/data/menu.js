const menu = [
  // Starters
  { id: 1, name: 'Garden Salad', category: 'Starters', price: 9.99, emoji: '🥗', description: 'Fresh greens, tomato and cucumber with lemon dressing.', ingredients: ['lettuce', 'tomato', 'cucumber', 'lemon'], dietary: ['vegetarian', 'vegan', 'gluten-free'], available: true, isSpecial: false },
  { id: 2, name: 'Garlic Bread', category: 'Starters', price: 6.99, emoji: '🥖', description: 'Toasted bread with garlic butter and herbs.', ingredients: ['bread', 'butter', 'garlic', 'parsley'], dietary: ['vegetarian'], available: true, isSpecial: false },
  { id: 3, name: 'Chicken Wings', category: 'Starters', price: 12.99, emoji: '🍗', description: 'Crispy wings tossed in our house hot sauce.', ingredients: ['chicken wings', 'hot sauce', 'celery'], dietary: ['gluten-free'], available: true, isSpecial: false },

  // Mains
  { id: 4, name: 'Chicken Alfredo', category: 'Mains', price: 18.99, emoji: '🍝', description: 'Fettuccine in a creamy parmesan sauce with grilled chicken.', ingredients: ['fettuccine', 'chicken', 'cream', 'parmesan'], dietary: [], available: true, isSpecial: true },
  { id: 5, name: 'Vegetable Pasta', category: 'Mains', price: 15.99, emoji: '🥦', description: 'Penne with roasted vegetables in tomato sauce.', ingredients: ['penne', 'zucchini', 'peppers', 'tomato sauce'], dietary: ['vegetarian'], available: true, isSpecial: false },
  { id: 6, name: 'Margherita Pizza', category: 'Mains', price: 16.49, emoji: '🍕', description: 'Stone-baked pizza with tomato, mozzarella and basil.', ingredients: ['pizza dough', 'tomato', 'mozzarella', 'basil'], dietary: ['vegetarian'], available: true, isSpecial: false },
  { id: 7, name: 'Gluten-Free Pasta', category: 'Mains', price: 17.49, emoji: '🌿', description: 'Gluten-free penne with pesto and cherry tomatoes.', ingredients: ['gluten-free penne', 'pesto', 'cherry tomatoes'], dietary: ['vegetarian', 'gluten-free'], available: true, isSpecial: false },

  // Desserts
  { id: 8, name: 'Chocolate Lava Cake', category: 'Desserts', price: 8.99, emoji: '🍫', description: 'Warm chocolate cake with a molten centre.', ingredients: ['chocolate', 'butter', 'eggs', 'flour'], dietary: ['vegetarian'], available: true, isSpecial: false },
  { id: 9, name: 'Cheesecake', category: 'Desserts', price: 7.99, emoji: '🍰', description: 'Creamy New York cheesecake with berry sauce.', ingredients: ['cream cheese', 'biscuit', 'berries'], dietary: ['vegetarian'], available: true, isSpecial: false },
  { id: 10, name: 'Mango Sorbet', category: 'Desserts', price: 6.49, emoji: '🍨', description: 'Dairy-free sorbet made with ripe mangoes.', ingredients: ['mango', 'sugar', 'lime'], dietary: ['vegan', 'gluten-free'], available: true, isSpecial: false },

  // Beverages
  { id: 11, name: 'Fresh Lemonade', category: 'Beverages', price: 4.49, emoji: '🍋', description: 'House-made lemonade with mint.', ingredients: ['lemon', 'sugar', 'mint'], dietary: ['vegan'], available: true, isSpecial: false },
  { id: 12, name: 'Iced Coffee', category: 'Beverages', price: 4.99, emoji: '☕', description: 'Cold brew coffee over ice.', ingredients: ['coffee', 'ice', 'milk'], dietary: ['vegetarian'], available: false, isSpecial: false },
];

export default menu;
