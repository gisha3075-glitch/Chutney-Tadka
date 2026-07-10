// Chutney&Tadka — Mock Data
// All data is decoupled from UI components. Images use a curated dictionary for 100% accuracy.

// ─── Reliable Image Dictionary ───────────────────────────────────────────────
const IMAGE_MAP = {
  // Categories
  'biryani': 'https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=400&q=80',
  'pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
  'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
  'dosa': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=400&q=80',
  'cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
  'rolls': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=400&q=80',
  'north-indian': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=400&q=80',
  'chinese': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80',
  'ice-cream': 'https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&w=400&q=80',
  'pasta': 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&q=80',
  'south-indian': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80',
  'dessert': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',

  // Brands
  'kfc': 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?auto=format&fit=crop&w=400&q=80',
  'mcd': 'https://images.unsplash.com/photo-1550050552-330691500ee3?auto=format&fit=crop&w=400&q=80',
  'bk': 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=400&q=80',
  'dominos': 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=400&q=80',
  'subway': 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80',
  'starbucks': 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=400&q=80',
  'baskin': 'https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?auto=format&fit=crop&w=400&q=80',
  'pizza-hut': 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80',

  // Restaurants
  'meghana-foods': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80',
  'truffles': 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
  'haldirams': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=700&q=80',
  'naturals': 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=700&q=80',
  'paradise-biryani': 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=700&q=80',
  'mtr': 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=700&q=80',
  'beijing-bites': 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=700&q=80',
  'la-pinoz': 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=700&q=80',
  'empire-restaurant': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=700&q=80',
  'the-chocolate-room': 'https://images.unsplash.com/photo-1542866952-33230b31e9a9?auto=format&fit=crop&w=700&q=80',
  'khan-saheb-rolls': 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=700&q=80',
  'mainland-china': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=700&q=80',

  // Fallback for general dishes
  'dish-fallback': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
};

const getImg = (id) => IMAGE_MAP[id] || IMAGE_MAP['dish-fallback'];

// ─── Food Categories ("What's on your mind?") ────────────────────────────────
export const FOOD_CATEGORIES = [
  { id: 'biryani', name: 'Biryani', image: getImg('biryani') },
  { id: 'pizza', name: 'Pizza', image: getImg('pizza') },
  { id: 'burger', name: 'Burger', image: getImg('burger') },
  { id: 'dosa', name: 'Dosa', image: getImg('dosa') },
  { id: 'cake', name: 'Cake', image: getImg('cake') },
  { id: 'rolls', name: 'Rolls', image: getImg('rolls') },
  { id: 'north-indian', name: 'North Indian', image: getImg('north-indian') },
  { id: 'chinese', name: 'Chinese', image: getImg('chinese') },
  { id: 'ice-cream', name: 'Ice Cream', image: getImg('ice-cream') },
  { id: 'pasta', name: 'Pasta', image: getImg('pasta') },
  { id: 'south-indian', name: 'South Indian', image: getImg('south-indian') },
  { id: 'dessert', name: 'Desserts', image: getImg('dessert') },
];

// ─── Top Brands ─────────────────────────────────────────────────────────────
export const TOP_BRANDS = [
  { id: 'kfc', name: "KFC", image: getImg('kfc') },
  { id: 'mcd', name: "McDonald's", image: getImg('mcd') },
  { id: 'bk', name: 'Burger King', image: getImg('bk') },
  { id: 'dominos', name: "Domino's", image: getImg('dominos') },
  { id: 'subway', name: 'Subway', image: getImg('subway') },
  { id: 'starbucks', name: 'Starbucks', image: getImg('starbucks') },
  { id: 'baskin', name: "Baskin Robbins", image: getImg('baskin') },
  { id: 'pizza-hut', name: 'Pizza Hut', image: getImg('pizza-hut') },
];

// ─── Collections ─────────────────────────────────────────────────────────────
export const COLLECTIONS = [
  { id: 'newly-opened', title: 'Newly Opened', subtitle: '12 Places', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=700&q=80' },
  { id: 'best-blr', title: 'Best of Bengaluru', subtitle: '25 Places', image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=700&q=80' },
  { id: 'trending', title: 'Trending This Week', subtitle: '30 Places', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80' },
  { id: 'pure-veg', title: 'Pure Veg Restaurants', subtitle: '18 Places', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80' },
  { id: 'romantic', title: 'Romantic Dining', subtitle: '10 Places', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80' },
  { id: 'cafe', title: 'Cafés & Chill', subtitle: '22 Places', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=700&q=80' },
];

// ─── Helper: dish factory ───────────────────────────────────────────────────
let dishIdCounter = 1;
const dish = (d) => ({
  id: `dish-${dishIdCounter++}`,
  isVeg: true,
  isBestseller: false,
  isMustTry: false,
  isSpicy: false,
  price: 0,
  rating: 4.2,
  ...d,
  image: d.image || getImg('dish-fallback'),
});

// ─── Menus (deeply nested for 4 restaurants) ────────────────────────────────
const MEGHANA_MENU = {
  'Recommended': [
    dish({ name: 'Chicken Biryani', isVeg: false, isBestseller: true, isMustTry: true, isSpicy: true, price: 320, rating: 4.6, description: 'Aromatic basmati rice layered with marinated chicken, saffron, and signature spices. Slow-cooked dum style. Served with mirchi ka salan and raita.', image: getImg('biryani') }),
    dish({ name: 'Mutton Biryani', isVeg: false, isBestseller: true, isSpicy: true, price: 420, rating: 4.7, description: 'Tender mutton pieces cooked with fragrant basmati rice, whole spices, and caramelized onions. A Hyderabadi classic.', image: getImg('biryani') }),
    dish({ name: 'Paneer Butter Masala', isVeg: true, isBestseller: true, price: 260, rating: 4.5, description: 'Soft paneer cubes simmered in a rich, creamy tomato gravy with butter and a blend of aromatic spices.', image: getImg('north-indian') }),
  ],
  'Starters': [
    dish({ name: 'Chicken 65', isVeg: false, isBestseller: true, isSpicy: true, price: 240, rating: 4.4, description: 'Deep-fried marinated chicken pieces tossed with curry leaves, green chilies, and spices. A fiery South Indian starter.' }),
    dish({ name: 'Chicken Tikka', isVeg: false, isMustTry: true, price: 280, rating: 4.5, description: 'Tandoor-grilled chicken marinated in yogurt and spices. Smoky, tender, and served with mint chutney.' }),
    dish({ name: 'Paneer Tikka', isVeg: true, isBestseller: true, price: 220, rating: 4.4, description: 'Marinated paneer cubes grilled in the tandoor with bell peppers and onions. Served with mint chutney.' }),
  ],
  'Main Course': [
    dish({ name: 'Butter Chicken', isVeg: false, isMustTry: true, price: 340, rating: 4.6, description: 'Tandoori chicken pieces in a velvety tomato-butter gravy. Mildly spiced and best paired with naan.' }),
    dish({ name: 'Mutton Rogan Josh', isVeg: false, isSpicy: true, price: 380, rating: 4.5, description: 'Kashmiri-style mutton curry with aromatic spices, yogurt, and a deep red gravy. Slow-cooked to perfection.' }),
    dish({ name: 'Dal Makhani', isVeg: true, isBestseller: true, price: 200, rating: 4.3, description: 'Black lentils slow-cooked overnight with butter, cream, and tomatoes. Rich, creamy, and deeply flavorful.' }),
  ],
  'Breads': [
    dish({ name: 'Garlic Naan', isVeg: true, isBestseller: true, price: 60, rating: 4.5, description: 'Soft tandoor-baked naan brushed with garlic butter. The perfect accompaniment to any curry.' }),
    dish({ name: 'Butter Naan', isVeg: true, price: 50, rating: 4.4, description: 'Classic tandoor naan brushed with melted butter. Soft and pillowy.' }),
    dish({ name: 'Tandoori Roti', isVeg: true, price: 40, rating: 4.2, description: 'Whole wheat flatbread baked in the tandoor. A healthier alternative to naan.' }),
  ],
  'Desserts': [
    dish({ name: 'Choco Lava Cake', isVeg: true, isBestseller: true, isMustTry: true, price: 120, rating: 4.7, description: 'Warm chocolate cake with a molten lava center. Served with a scoop of vanilla ice cream.', image: getImg('cake') }),
    dish({ name: 'Gulab Jamun', isVeg: true, price: 80, rating: 4.5, description: 'Soft milk-based dumplings soaked in warm cardamom-flavored sugar syrup. A classic Indian dessert.', image: getImg('dessert') }),
  ],
  'Beverages': [
    dish({ name: 'Sweet Lassi', isVeg: true, price: 70, rating: 4.3, description: 'Thick, creamy yogurt drink blended with sugar. Served chilled.' }),
    dish({ name: 'Masala Chai', isVeg: true, price: 40, rating: 4.4, description: 'Traditional Indian spiced tea with cardamom, ginger, and milk.' }),
  ],
};

const TRUFFLES_MENU = {
  'Recommended': [
    dish({ name: 'Classic Cheese Burger', isVeg: false, isBestseller: true, isMustTry: true, price: 250, rating: 4.7, description: 'Juicy grilled chicken patty, melted cheddar, crisp lettuce, tomato, and house sauce in a toasted brioche bun. Served with fries.', image: getImg('burger') }),
    dish({ name: 'Veggie Delight Burger', isVeg: true, isBestseller: true, price: 220, rating: 4.5, description: 'Crispy paneer and corn patty with fresh veggies, jalapeños, and tangy mayo in a soft bun. Served with fries.', image: getImg('burger') }),
    dish({ name: 'Loaded Fries', isVeg: true, isMustTry: true, price: 180, rating: 4.6, description: 'Crispy fries topped with melted cheese, jalapeños, sour cream, and herbs. The ultimate side.' }),
  ],
  'Starters': [
    dish({ name: 'Chicken Wings', isVeg: false, isBestseller: true, isSpicy: true, price: 280, rating: 4.5, description: '8 pieces of crispy fried chicken wings tossed in spicy peri-peri sauce. Served with dip.' }),
    dish({ name: 'Mozzarella Sticks', isVeg: true, price: 200, rating: 4.4, description: 'Golden-fried mozzarella sticks with a crispy coating. Served with marinara dip.' }),
    dish({ name: 'Onion Rings', isVeg: true, price: 150, rating: 4.2, description: 'Crispy battered onion rings fried to golden perfection. Served with chipotle mayo.' }),
  ],
  'Main Course': [
    dish({ name: 'Grilled Chicken Steak', isVeg: false, isMustTry: true, price: 380, rating: 4.6, description: 'Tender grilled chicken breast with herb butter, sautéed vegetables, and mashed potatoes. A hearty meal.' }),
    dish({ name: 'Peri Peri Pasta', isVeg: true, isSpicy: true, price: 260, rating: 4.4, description: 'Penne pasta tossed in a creamy peri-peri sauce with bell peppers, olives, and cheese.', image: getImg('pasta') }),
    dish({ name: 'BBQ Chicken Pizza', isVeg: false, isBestseller: true, price: 340, rating: 4.5, description: 'Smoky BBQ chicken, red onions, and mozzarella on a thin-crust base with BBQ drizzle.', image: getImg('pizza') }),
  ],
  'Desserts': [
    dish({ name: 'Choco Lava Cake', isVeg: true, isBestseller: true, isMustTry: true, price: 120, rating: 4.8, description: 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream.', image: getImg('cake') }),
    dish({ name: 'New York Cheesecake', isVeg: true, price: 180, rating: 4.6, description: 'Creamy baked cheesecake with a buttery graham cracker crust and berry compote.', image: getImg('dessert') }),
  ],
  'Beverages': [
    dish({ name: 'Cold Coffee', isVeg: true, isBestseller: true, price: 120, rating: 4.5, description: 'Thick, creamy cold coffee blended with ice cream and chocolate sauce.' }),
    dish({ name: 'Fresh Lime Soda', isVeg: true, price: 60, rating: 4.3, description: 'Refreshing lime soda with a choice of sweet, salt, or mixed.' }),
  ],
};

const HALDIRAMS_MENU = {
  'Recommended': [
    dish({ name: 'Chole Bhature', isVeg: true, isBestseller: true, isMustTry: true, isSpicy: true, price: 180, rating: 4.6, description: 'Fluffy deep-fried bhature served with spicy chickpea curry, pickled onions, and green chutney. A North Indian staple.', image: getImg('north-indian') }),
    dish({ name: 'Pani Puri', isVeg: true, isBestseller: true, isSpicy: true, price: 80, rating: 4.7, description: 'Crispy hollow puris filled with spiced potato, chickpeas, and tangy tamarind water. 6 pieces.' }),
    dish({ name: 'Samosa', isVeg: true, isBestseller: true, price: 40, rating: 4.5, description: 'Crispy pastry filled with spiced potatoes and peas. Served with tamarind chutney. 2 pieces.' }),
  ],
  'Starters': [
    dish({ name: 'Dahi Puri', isVeg: true, isMustTry: true, price: 90, rating: 4.5, description: 'Puris topped with yogurt, sweet chutney, sev, and pomegranate. A refreshing street food favorite.' }),
    dish({ name: 'Aloo Tikki', isVeg: true, price: 70, rating: 4.4, description: 'Crispy potato patties topped with chickpeas, yogurt, and chutneys. A classic chaat.' }),
    dish({ name: 'Pav Bhaji', isVeg: true, isBestseller: true, isSpicy: true, price: 150, rating: 4.6, description: 'Buttery mashed vegetable curry served with toasted pav buns and lemon wedges.' }),
  ],
  'Main Course': [
    dish({ name: 'Rajma Chawal', isVeg: true, price: 160, rating: 4.4, description: 'Kidney beans cooked in a rich onion-tomato gravy, served with steamed basmati rice. Comfort food at its best.' }),
    dish({ name: 'Kadhai Paneer', isVeg: true, isMustTry: true, isSpicy: true, price: 240, rating: 4.5, description: 'Paneer and bell peppers cooked in a spicy kadhai gravy with freshly ground spices.', image: getImg('north-indian') }),
    dish({ name: 'Chole Kulche', isVeg: true, price: 140, rating: 4.3, description: 'Spiced chickpea curry served with soft kulche bread, onions, and chutney.' }),
  ],
  'Desserts': [
    dish({ name: 'Rasmalai', isVeg: true, isBestseller: true, price: 100, rating: 4.7, description: 'Soft cottage cheese discs soaked in saffron-cardamom flavored milk. Served chilled.', image: getImg('dessert') }),
    dish({ name: 'Jalebi', isVeg: true, isMustTry: true, price: 80, rating: 4.5, description: 'Crispy, syrup-soaked spiral sweets served warm. A traditional Indian dessert.', image: getImg('dessert') }),
  ],
  'Beverages': [
    dish({ name: 'Masala Chai', isVeg: true, price: 30, rating: 4.4, description: 'Traditional Indian spiced tea with cardamom, ginger, and milk.' }),
    dish({ name: 'Lassi', isVeg: true, price: 60, rating: 4.5, description: 'Thick, creamy yogurt drink. Available in sweet or salted varieties.' }),
  ],
};

const DOMINOS_MENU = {
  'Recommended': [
    dish({ name: 'Margherita Pizza', isVeg: true, isBestseller: true, isMustTry: true, price: 199, rating: 4.5, description: 'Classic pizza with tangy tomato sauce, 100% mozzarella cheese, and oregano on a hand-tossed crust.', image: getImg('pizza') }),
    dish({ name: 'Pepperoni Pizza', isVeg: false, isBestseller: true, price: 399, rating: 4.6, description: 'Loaded with pepperoni slices and extra mozzarella on a classic crust. A timeless favorite.', image: getImg('pizza') }),
    dish({ name: 'Veggie Supreme Pizza', isVeg: true, isMustTry: true, price: 349, rating: 4.4, description: 'Onions, capsicum, tomatoes, mushrooms, and sweet corn on a cheesy base. A garden-fresh delight.', image: getImg('pizza') }),
  ],
  'Starters': [
    dish({ name: 'Garlic Breadsticks', isVeg: true, isBestseller: true, price: 99, rating: 4.5, description: 'Oven-baked breadsticks brushed with garlic butter and herbs. Served with marinara dip.' }),
    dish({ name: 'Cheesy Dip', isVeg: true, price: 69, rating: 4.3, description: 'Creamy, cheesy dip perfect for breadsticks and pizza crusts.' }),
    dish({ name: 'Chicken Wings', isVeg: false, isSpicy: true, price: 199, rating: 4.4, description: '8 pieces of crispy chicken wings tossed in hot sauce. Served with dip.' }),
  ],
  'Main Course': [
    dish({ name: 'Chicken Tikka Pizza', isVeg: false, isBestseller: true, isSpicy: true, price: 449, rating: 4.5, description: 'Tandoori chicken tikka, onions, and capsicum on a cheesy base with mint mayo.', image: getImg('pizza') }),
    dish({ name: 'Paneer Makhani Pizza', isVeg: true, isMustTry: true, price: 399, rating: 4.4, description: 'Paneer tikka, onions, and capsicum on a makhani sauce base with extra cheese.', image: getImg('pizza') }),
  ],
  'Desserts': [
    dish({ name: 'Choco Lava Cake', isVeg: true, isBestseller: true, isMustTry: true, price: 99, rating: 4.7, description: 'Warm chocolate cake with a molten chocolate center. A Domino\'s classic.', image: getImg('cake') }),
    dish({ name: 'Butterscotch Mousse', isVeg: true, price: 79, rating: 4.4, description: 'Smooth, creamy butterscotch mousse with caramel bits. A light, sweet finish.' }),
  ],
  'Beverages': [
    dish({ name: 'Pepsi', isVeg: true, price: 60, rating: 4.2, description: 'Chilled 475ml bottle. Refreshing cola.' }),
    dish({ name: 'Lipton Iced Tea', isVeg: true, price: 70, rating: 4.3, description: 'Refreshing lemon iced tea. 475ml.' }),
  ],
};

// ─── Restaurants (12+) ───────────────────────────────────────────────────────
export const RESTAURANTS = [
  {
    id: 'meghana-foods',
    name: 'Meghana Foods',
    cuisines: ['North Indian', 'Biryani', 'Chinese'],
    category: 'North Indian',
    rating: 4.5,
    reviewCount: 12800,
    deliveryTime: '25-30 min',
    distance: '2.5 km',
    costForTwo: 500,
    offer: '60% OFF up to ₹120',
    promoted: true,
    pureVeg: false,
    image: getImg('meghana-foods'),
    menu: MEGHANA_MENU,
    offers: [
      { title: 'Flat ₹150 off', subtitle: 'on ICICI cards', code: 'ICICI150' },
      { title: '50% OFF up to ₹100', subtitle: 'Use code KHAO50', code: 'KHAO50' },
      { title: 'Free delivery', subtitle: 'on orders above ₹399', code: 'FREEDEL' },
    ],
  },
  {
    id: 'truffles',
    name: 'Truffles',
    cuisines: ['American', 'Burgers', 'Continental'],
    category: 'Italian',
    rating: 4.7,
    reviewCount: 18500,
    deliveryTime: '30-35 min',
    distance: '3.2 km',
    costForTwo: 600,
    offer: '40% OFF up to ₹200',
    promoted: true,
    pureVeg: false,
    image: getImg('truffles'),
    menu: TRUFFLES_MENU,
    offers: [
      { title: 'Flat ₹100 off', subtitle: 'on HDFC cards', code: 'HDFC100' },
      { title: 'Buy 1 Get 1 Free', subtitle: 'on all burgers', code: 'BOGO' },
      { title: 'Free dessert', subtitle: 'on orders above ₹499', code: 'SWEET' },
    ],
  },
  {
    id: 'haldirams',
    name: "Haldiram's",
    cuisines: ['North Indian', 'Street Food', 'Sweets'],
    category: 'Street Food',
    rating: 4.4,
    reviewCount: 9800,
    deliveryTime: '20-25 min',
    distance: '1.8 km',
    costForTwo: 300,
    offer: '50% OFF up to ₹100',
    promoted: false,
    pureVeg: true,
    image: getImg('haldirams'),
    menu: HALDIRAMS_MENU,
    offers: [
      { title: 'Flat ₹75 off', subtitle: 'on Axis cards', code: 'AXIS75' },
      { title: '30% OFF up to ₹75', subtitle: 'Use code KHAO30', code: 'KHAO30' },
    ],
  },
  {
    id: 'dominos',
    name: "Domino's",
    cuisines: ['Italian', 'Pizza', 'Fast Food'],
    category: 'Italian',
    rating: 4.3,
    reviewCount: 15200,
    deliveryTime: '25-30 min',
    distance: '2.0 km',
    costForTwo: 400,
    offer: '60% OFF up to ₹120',
    promoted: true,
    pureVeg: false,
    image: getImg('dominos'),
    menu: DOMINOS_MENU,
    offers: [
      { title: 'Flat ₹150 off', subtitle: 'on ICICI cards', code: 'ICICI150' },
      { title: 'Buy 1 Get 1 Free', subtitle: 'on medium pizzas', code: 'PIZZABOGO' },
      { title: 'Free delivery', subtitle: 'always', code: 'FREEDEL' },
    ],
  },
  {
    id: 'naturals',
    name: 'Naturals Ice Cream',
    cuisines: ['Desserts', 'Ice Cream'],
    category: 'Desserts',
    rating: 4.6,
    reviewCount: 6400,
    deliveryTime: '15-20 min',
    distance: '1.2 km',
    costForTwo: 250,
    offer: '20% OFF up to ₹60',
    promoted: false,
    pureVeg: true,
    image: getImg('naturals'),
    menu: {
      'Recommended': [
        dish({ name: 'Tender Coconut Ice Cream', isVeg: true, isBestseller: true, isMustTry: true, price: 180, rating: 4.7, description: 'Fresh tender coconut pieces blended into creamy ice cream. A Naturals signature.', image: getImg('ice-cream') }),
        dish({ name: 'Mango Ice Cream', isVeg: true, isBestseller: true, price: 180, rating: 4.6, description: 'Real Alphonso mango pulp swirled into rich ice cream. Seasonal favorite.', image: getImg('ice-cream') }),
        dish({ name: 'Sitaphal Ice Cream', isVeg: true, isMustTry: true, price: 200, rating: 4.8, description: 'Custard apple pieces in a creamy base. A unique, beloved flavor.', image: getImg('ice-cream') }),
      ],
      'Ice Creams': [
        dish({ name: 'Chocolate Ice Cream', isVeg: true, price: 160, rating: 4.5, description: 'Rich Belgian chocolate ice cream. Dense, fudgy, and indulgent.', image: getImg('ice-cream') }),
        dish({ name: 'Strawberry Ice Cream', isVeg: true, price: 160, rating: 4.4, description: 'Fresh strawberry pieces in a creamy pink base. Sweet and tangy.', image: getImg('ice-cream') }),
        dish({ name: 'Butterscotch Ice Cream', isVeg: true, price: 160, rating: 4.5, description: 'Creamy butterscotch ice cream with caramelized bits.', image: getImg('ice-cream') }),
      ],
      'Sundaes': [
        dish({ name: 'Death by Chocolate', isVeg: true, isBestseller: true, price: 280, rating: 4.7, description: 'Layers of chocolate ice cream, brownie, fudge, and chocolate shavings. For chocolate lovers.', image: getImg('dessert') }),
        dish({ name: 'Fruit Sundae', isVeg: true, price: 250, rating: 4.5, description: 'Three scoops of ice cream topped with seasonal fruits and nuts.', image: getImg('dessert') }),
      ],
    },
    offers: [
      { title: 'Flat ₹50 off', subtitle: 'on orders above ₹200', code: 'ICE50' },
      { title: 'Free waffle cone', subtitle: 'on all scoops', code: 'CONE' },
    ],
  },
  {
    id: 'paradise-biryani',
    name: 'Paradise Biryani',
    cuisines: ['North Indian', 'Biryani', 'Hyderabadi'],
    category: 'North Indian',
    rating: 4.4,
    reviewCount: 8900,
    deliveryTime: '30-35 min',
    distance: '3.5 km',
    costForTwo: 550,
    offer: '40% OFF up to ₹150',
    promoted: false,
    pureVeg: false,
    image: getImg('paradise-biryani'),
    menu: MEGHANA_MENU,
    offers: [
      { title: 'Flat ₹100 off', subtitle: 'on SBI cards', code: 'SBI100' },
      { title: 'Free delivery', subtitle: 'on orders above ₹299', code: 'FREEDEL' },
    ],
  },
  {
    id: 'mtr',
    name: 'MTR',
    cuisines: ['South Indian', 'Breakfast', 'Beverages'],
    category: 'South Indian',
    rating: 4.6,
    reviewCount: 11200,
    deliveryTime: '20-25 min',
    distance: '1.5 km',
    costForTwo: 350,
    offer: '30% OFF up to ₹75',
    promoted: true,
    pureVeg: true,
    image: getImg('mtr'),
    menu: {
      'Recommended': [
        dish({ name: 'Masala Dosa', isVeg: true, isBestseller: true, isMustTry: true, price: 120, rating: 4.7, description: 'Crispy golden dosa stuffed with spiced potato masala. Served with coconut chutney and sambar. An MTR legend.', image: getImg('dosa') }),
        dish({ name: 'Idli Sambar', isVeg: true, isBestseller: true, price: 80, rating: 4.6, description: 'Steamed rice cakes served with hot sambar and coconut chutney. Soft, fluffy, and healthy.', image: getImg('south-indian') }),
        dish({ name: 'Rava Idli', isVeg: true, isMustTry: true, price: 90, rating: 4.5, description: 'Steamed semolina cakes with cashews and curry leaves. An MTR invention. Served with chutney and sambar.', image: getImg('south-indian') }),
      ],
      'Main Course': [
        dish({ name: 'Bisi Bele Bath', isVeg: true, isSpicy: true, price: 140, rating: 4.5, description: 'Rice and lentils cooked with vegetables, tamarind, and spices. A Karnataka specialty.', image: getImg('south-indian') }),
        dish({ name: 'Lemon Rice', isVeg: true, price: 110, rating: 4.3, description: 'Rice tempered with mustard seeds, curry leaves, peanuts, and lemon juice.', image: getImg('south-indian') }),
      ],
      'Desserts': [
        dish({ name: 'Mysore Pak', isVeg: true, isBestseller: true, price: 60, rating: 4.6, description: 'Traditional ghee-laden sweet made from gram flour and sugar. Crumbly and rich.', image: getImg('dessert') }),
        dish({ name: 'Kheer', isVeg: true, price: 70, rating: 4.4, description: 'Rice pudding with milk, sugar, cardamom, and nuts. Served warm.', image: getImg('dessert') }),
      ],
      'Beverages': [
        dish({ name: 'Filter Coffee', isVeg: true, isBestseller: true, price: 40, rating: 4.7, description: 'Authentic South Indian filter coffee. Strong, frothy, and aromatic.' }),
      ],
    },
    offers: [
      { title: 'Flat ₹60 off', subtitle: 'on orders above ₹200', code: 'MTR60' },
      { title: 'Free filter coffee', subtitle: 'on orders above ₹300', code: 'COFFEE' },
    ],
  },
  {
    id: 'beijing-bites',
    name: 'Beijing Bites',
    cuisines: ['Chinese', 'Asian', 'Tibetan'],
    category: 'Chinese',
    rating: 4.2,
    reviewCount: 5600,
    deliveryTime: '30-40 min',
    distance: '4.0 km',
    costForTwo: 450,
    offer: '50% OFF up to ₹100',
    promoted: false,
    pureVeg: false,
    image: getImg('beijing-bites'),
    menu: {
      'Recommended': [
        dish({ name: 'Chicken Manchurian', isVeg: false, isBestseller: true, isSpicy: true, price: 240, rating: 4.4, description: 'Crispy chicken tossed in a spicy Manchurian sauce with onions and peppers. Indo-Chinese classic.', image: getImg('chinese') }),
        dish({ name: 'Veg Hakka Noodles', isVeg: true, isBestseller: true, price: 180, rating: 4.3, description: 'Stir-fried noodles with vegetables, soy sauce, and vinegar. Wok-tossed to perfection.', image: getImg('chinese') }),
        dish({ name: 'Chilli Chicken', isVeg: false, isMustTry: true, isSpicy: true, price: 260, rating: 4.5, description: 'Battered chicken fried and tossed with garlic, chilies, and soy in a fiery gravy.', image: getImg('chinese') }),
      ],
      'Starters': [
        dish({ name: 'Spring Rolls', isVeg: true, isBestseller: true, price: 140, rating: 4.4, description: 'Crispy rolls stuffed with shredded vegetables. Served with sweet chili sauce. 4 pieces.' }),
        dish({ name: 'Crispy Corn', isVeg: true, isSpicy: true, price: 160, rating: 4.3, description: 'Fried corn kernels tossed with onions, chilies, and garlic. Crunchy and addictive.' }),
      ],
      'Main Course': [
        dish({ name: 'Veg Fried Rice', isVeg: true, price: 160, rating: 4.2, description: 'Rice stir-fried with vegetables, soy sauce, and spring onions. Simple and satisfying.', image: getImg('chinese') }),
        dish({ name: 'Chicken Schezwan Rice', isVeg: false, isSpicy: true, price: 220, rating: 4.4, description: 'Rice tossed with chicken and fiery Schezwan sauce. Bold and spicy.', image: getImg('chinese') }),
      ],
      'Desserts': [
        dish({ name: 'Date Pancake', isVeg: true, isMustTry: true, price: 140, rating: 4.5, description: 'Warm pancake with dates and honey drizzle. A unique Chinese-inspired dessert.', image: getImg('dessert') }),
      ],
    },
    offers: [
      { title: 'Flat ₹80 off', subtitle: 'on orders above ₹250', code: 'CHINESE80' },
    ],
  },
  {
    id: 'la-pinoz',
    name: "La Pino'z Pizza",
    cuisines: ['Italian', 'Pizza', 'Pasta'],
    category: 'Italian',
    rating: 4.3,
    reviewCount: 7200,
    deliveryTime: '25-30 min',
    distance: '2.8 km',
    costForTwo: 500,
    offer: 'Buy 1 Get 1 Free',
    promoted: true,
    pureVeg: false,
    image: getImg('la-pinoz'),
    menu: DOMINOS_MENU,
    offers: [
      { title: 'Buy 1 Get 1 Free', subtitle: 'on all large pizzas', code: 'LAPINOBK' },
      { title: 'Free garlic bread', subtitle: 'on orders above ₹399', code: 'GARLIC' },
    ],
  },
  {
    id: 'empire-restaurant',
    name: 'Empire Restaurant',
    cuisines: ['North Indian', 'Mughlai', 'Kebabs'],
    category: 'North Indian',
    rating: 4.4,
    reviewCount: 8100,
    deliveryTime: '30-40 min',
    distance: '3.8 km',
    costForTwo: 600,
    offer: '40% OFF up to ₹200',
    promoted: false,
    pureVeg: false,
    image: getImg('empire-restaurant'),
    menu: MEGHANA_MENU,
    offers: [
      { title: 'Flat ₹120 off', subtitle: 'on Kotak cards', code: 'KOTAK120' },
      { title: 'Free kebab platter', subtitle: 'on orders above ₹599', code: 'KEBAB' },
    ],
  },
  {
    id: 'the-chocolate-room',
    name: 'The Chocolate Room',
    cuisines: ['Desserts', 'Continental', 'Beverages'],
    category: 'Desserts',
    rating: 4.5,
    reviewCount: 4300,
    deliveryTime: '20-25 min',
    distance: '2.2 km',
    costForTwo: 350,
    offer: '30% OFF up to ₹90',
    promoted: false,
    pureVeg: true,
    image: getImg('the-chocolate-room'),
    menu: {
      'Recommended': [
        dish({ name: 'Chocolate Fondue', isVeg: true, isBestseller: true, isMustTry: true, price: 280, rating: 4.7, description: 'Warm melted chocolate with marshmallows, brownie bites, and fruit skewers for dipping. A chocolate lover\'s dream.', image: getImg('dessert') }),
        dish({ name: 'Belgian Waffle', isVeg: true, isBestseller: true, price: 180, rating: 4.6, description: 'Crispy Belgian waffle with chocolate sauce, whipped cream, and ice cream.', image: getImg('dessert') }),
        dish({ name: 'Hot Chocolate', isVeg: true, isMustTry: true, price: 120, rating: 4.5, description: 'Rich, thick Belgian hot chocolate with whipped cream and chocolate shavings.' }),
      ],
      'Desserts': [
        dish({ name: 'Brownie Sundae', isVeg: true, isBestseller: true, price: 220, rating: 4.6, description: 'Warm fudge brownie with vanilla ice cream, chocolate sauce, and nuts.', image: getImg('dessert') }),
        dish({ name: 'Tiramisu', isVeg: true, price: 200, rating: 4.5, description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone.', image: getImg('cake') }),
      ],
      'Beverages': [
        dish({ name: 'Iced Chocolate', isVeg: true, price: 130, rating: 4.4, description: 'Chilled chocolate milk with ice cream and chocolate syrup. Perfect for summer.' }),
        dish({ name: 'Cold Coffee', isVeg: true, price: 140, rating: 4.5, description: 'Thick, creamy cold coffee with ice cream and chocolate drizzle.' }),
      ],
    },
    offers: [
      { title: 'Flat ₹60 off', subtitle: 'on orders above ₹200', code: 'CHOCO60' },
      { title: 'Free brownie', subtitle: 'on orders above ₹350', code: 'BROWNIE' },
    ],
  },
  {
    id: 'khan-saheb-rolls',
    name: 'Khan Saheb Rolls',
    cuisines: ['Street Food', 'Rolls', 'Mughlai'],
    category: 'Street Food',
    rating: 4.3,
    reviewCount: 5200,
    deliveryTime: '20-30 min',
    distance: '2.0 km',
    costForTwo: 250,
    offer: '50% OFF up to ₹100',
    promoted: false,
    pureVeg: false,
    image: getImg('khan-saheb-rolls'),
    menu: {
      'Recommended': [
        dish({ name: 'Chicken Tikka Roll', isVeg: false, isBestseller: true, isMustTry: true, isSpicy: true, price: 140, rating: 4.5, description: 'Tandoori chicken tikka wrapped in a flaky paratha with onions, mint chutney, and spices. A Kolkata-style roll.', image: getImg('rolls') }),
        dish({ name: 'Paneer Tikka Roll', isVeg: true, isBestseller: true, price: 120, rating: 4.4, description: 'Grilled paneer tikka with onions and chutneys wrapped in a buttery paratha.', image: getImg('rolls') }),
        dish({ name: 'Egg Roll', isVeg: false, isBestseller: true, price: 80, rating: 4.3, description: 'Classic Kolkata egg roll with a double-egg paratha, onions, and lime. The original.', image: getImg('rolls') }),
      ],
      'Rolls': [
        dish({ name: 'Mutton Seekh Roll', isVeg: false, isMustTry: true, isSpicy: true, price: 160, rating: 4.5, description: 'Juicy seekh kebab with onions and chutneys in a soft paratha wrap.', image: getImg('rolls') }),
        dish({ name: 'Veg Roll', isVeg: true, price: 90, rating: 4.2, description: 'Spiced potato and paneer filling with chutneys in a crispy paratha.', image: getImg('rolls') }),
      ],
      'Beverages': [
        dish({ name: 'Masala Chai', isVeg: true, price: 30, rating: 4.4, description: 'Traditional Indian spiced tea with cardamom, ginger, and milk.' }),
      ],
    },
    offers: [
      { title: 'Flat ₹50 off', subtitle: 'on orders above ₹150', code: 'ROLL50' },
    ],
  },
  {
    id: 'mainland-china',
    name: 'Mainland China',
    cuisines: ['Chinese', 'Asian', 'Continental'],
    category: 'Chinese',
    rating: 4.5,
    reviewCount: 6800,
    deliveryTime: '35-45 min',
    distance: '4.5 km',
    costForTwo: 800,
    offer: '40% OFF up to ₹250',
    promoted: true,
    pureVeg: false,
    image: getImg('mainland-china'),
    menu: {
      'Recommended': [
        dish({ name: 'Dim Sum Platter', isVeg: true, isBestseller: true, isMustTry: true, price: 320, rating: 4.6, description: 'Steamed dumplings with assorted fillings. Served with chili oil and soy dip. 6 pieces.', image: getImg('chinese') }),
        dish({ name: 'Crispy Chilli Potato', isVeg: true, isBestseller: true, isSpicy: true, price: 220, rating: 4.5, description: 'Fried potato strips tossed with garlic, chilies, and spring onions. A crowd favorite.', image: getImg('chinese') }),
        dish({ name: 'Chicken Dim Sum', isVeg: false, isMustTry: true, price: 340, rating: 4.6, description: 'Steamed chicken dumplings with herbs. Served with chili oil and soy. 6 pieces.', image: getImg('chinese') }),
      ],
      'Starters': [
        dish({ name: 'Crispy Corn Peppered', isVeg: true, isSpicy: true, price: 200, rating: 4.4, description: 'Fried corn tossed with peppers, onions, and garlic in a spicy sauce.' }),
        dish({ name: 'Chicken Lettuce Wraps', isVeg: false, price: 280, rating: 4.5, description: 'Minced chicken with water chestnuts in crisp lettuce cups. Healthy and flavorful.' }),
      ],
      'Main Course': [
        dish({ name: 'Mushroom Bamboo Bok Choy', isVeg: true, price: 260, rating: 4.4, description: 'Stir-fried mushrooms with bamboo shoots and bok choy in a light garlic sauce.', image: getImg('chinese') }),
        dish({ name: 'Chicken in Black Bean', isVeg: false, price: 320, rating: 4.5, description: 'Wok-tossed chicken with black bean sauce, peppers, and onions.', image: getImg('chinese') }),
      ],
      'Desserts': [
        dish({ name: 'Honey Noodles', isVeg: true, isMustTry: true, price: 180, rating: 4.5, description: 'Crispy fried noodles tossed in honey and sesame. Sweet, crunchy, and unique.', image: getImg('dessert') }),
      ],
      'Beverages': [
        dish({ name: 'Jasmine Tea', isVeg: true, price: 80, rating: 4.4, description: 'Fragrant jasmine tea. Calming and aromatic.' }),
      ],
    },
    offers: [
      { title: 'Flat ₹200 off', subtitle: 'on American Express', code: 'AMEX200' },
      { title: 'Free dessert', subtitle: 'on orders above ₹699', code: 'MCLDESSERT' },
    ],
  },
];

// ─── Delivery Partner (for tracking page) ───────────────────────────────────
export const DELIVERY_PARTNER = {
  name: 'Rajesh Kumar',
  rating: 4.8,
  vehicleNumber: 'KA05 AB 4521',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  phone: '+91 98765 43210',
};

// ─── Saved Addresses (for checkout) ─────────────────────────────────────────
export const ADDRESSES = [

  {
    id: 'work',
    type: 'Work',
    name: 'Jatin Pandey',
    address: 'Tripathi Bhawan near Bakery Excellence',
    city: 'Lucknow',
    state: 'UP',
    pincode: '',
    phone: '+91 91402324022',
  },
];

// ─── Promo Codes ────────────────────────────────────────────────────────────
export const PROMO_CODES = {
  KHAO50: { discount: 100, type: 'flat', label: '50% OFF up to ₹100' },
  KHAO30: { discount: 75, type: 'flat', label: '30% OFF up to ₹75' },
  FREEDEL: { discount: 40, type: 'delivery', label: 'Free Delivery' },
  ICICI150: { discount: 150, type: 'flat', label: 'Flat ₹150 off' },
  NEWUSER: { discount: 120, type: 'flat', label: '₹120 off for new users' },
};

// ─── Cities ─────────────────────────────────────────────────────────────────
export const CITIES = ['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'];

// ─── Helper Functions ───────────────────────────────────────────────────────
export const getRestaurantById = (id) => RESTAURANTS.find((r) => r.id === id);

export const getAllDishes = (restaurantId) => {
  const restaurant = getRestaurantById(restaurantId);
  if (!restaurant || !restaurant.menu) return [];
  return Object.entries(restaurant.menu).flatMap(([section, dishes]) =>
    dishes.map((d) => ({ ...d, restaurantId, restaurantName: restaurant.name, section }))
  );
};

export const getDishById = (dishId) => {
  for (const r of RESTAURANTS) {
    if (!r.menu) continue;
    for (const dishes of Object.values(r.menu)) {
      const found = dishes.find((d) => d.id === dishId);
      if (found) return { ...found, restaurantId: r.id, restaurantName: r.name };
    }
  }
  return null;
};
