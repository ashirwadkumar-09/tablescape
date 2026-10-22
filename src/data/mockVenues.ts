import { Venue } from '../types/venue';

export const INITIAL_VENUES: Venue[] = [
  {
    id: 'tablescape-v1',
    name: 'Araku Coffee & Roastery',
    slug: 'araku-coffee-indiranagar',
    venueType: 'cafe',
    tagline: 'World-renowned single-origin specialty coffees with Scandinavian minimalist design.',
    description: 'Araku is an international award-winning coffee destination that sources regenerative organic coffee from the Araku Valley. Featuring dual-level minimalist white architecture, a dedicated cupping laboratory, and an artisanal European brunch menu.',
    knownFor: ['Micro-lot manual pour-overs', 'Truffle Brioche Toast', 'Regenerative organic coffees', 'Cold drip nitro infusions'],
    cuisineTypes: ['Specialty Coffee', 'Artisan Bakery', 'European Brunch'],
    address: '968, 12th Main Road, HAL 2nd Stage, Indiranagar',
    locality: 'Indiranagar',
    city: 'Bengaluru',
    landmark: 'Near 100 Feet Road Junction',
    latitude: 12.9719,
    longitude: 77.6412,
    rating: 4.8,
    reviewCount: 1420,
    priceLevel: '₹₹₹',
    estimatedCostForTwo: 900,
    openingHours: {
      monday: '8:00 AM - 10:30 PM',
      tuesday: '8:00 AM - 10:30 PM',
      wednesday: '8:00 AM - 10:30 PM',
      thursday: '8:00 AM - 10:30 PM',
      friday: '8:00 AM - 11:00 PM',
      saturday: '8:00 AM - 11:00 PM',
      sunday: '8:00 AM - 10:30 PM'
    },
    currentOpenStatus: 'open',
    timingNote: 'Special cupping sessions every Saturday at 11 AM.',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      wifi: true,
      powerOutlets: true,
      outdoorSeating: true,
      petFriendly: true,
      airConditioning: true,
      valetParking: true,
      reservations: true,
      liveMusic: false,
      wheelchairAccessible: true,
      privateDining: false
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      jain: false,
      glutenFree: true,
      halal: true
    },
    ambienceTags: ['Aesthetic', 'Minimalist', 'Cozy', 'Work-Friendly'],
    occasionTags: ['Coffee and conversations', 'Solo time', 'Work mode', 'Brunch'],
    badges: ["Editor's Pick", 'Listed on District', 'Specialty Coffee'],
    officialWebsite: 'https://arakucoffee.in',
    instagramUrl: 'https://instagram.com/arakucoffeein',
    phone: '+91 80 4370 0988',
    districtListingUrl: 'https://district.in/bengaluru/araku-coffee-indiranagar',
    reservationUrl: 'https://arakucoffee.in/reservations',
    menuItems: [
      { id: 'm1', name: 'Grand Reserve Chemex Pour Over', category: 'Specialty Coffee', price: 290, description: 'Notes of dark chocolate, candied orange, and toasted almonds.', isVeg: true, isVegan: true, isChefSpecial: true },
      { id: 'm2', name: 'Oat Milk Flat White', category: 'Specialty Coffee', price: 260, description: 'Double shot espresso balanced with creamy Minor Figures oat milk.', isVeg: true, isVegan: true },
      { id: 'm3', name: 'Avocado Tartine with Feta & Dukkah', category: 'Small Plates', price: 380, description: 'Sourdough bread topped with spiced Hass avocado, citrus herbs and pistachio crumb.', isVeg: true },
      { id: 'm4', name: 'Wild Mushroom Brioche Benedict', category: 'Mains', price: 440, description: 'Poached eggs, sautéed wild porcini mushrooms, hollandaise on brioche.', isVeg: true, isChefSpecial: true },
      { id: 'm5', name: 'Madagascar Vanilla Bean Canelé', category: 'Bakery & Dessert', price: 180, description: 'Caramelized crust with custardy vanilla interior.', isVeg: true }
    ],
    reviews: [
      { id: 'r1', author: 'Ananya Sharma', rating: 5, date: 'October 15, 2026', comment: 'The pour-over station here is unmatched in South India. Incredible natural light for reading and the oat flat white is velvety smooth.', userType: 'Verified Diner', helpfulCount: 24 },
      { id: 'r2', author: 'Rohan Mehra', rating: 4.8, date: 'September 28, 2026', comment: 'Great ambience, super fast Wi-Fi and plenty of charging ports on the mezzanine floor. Perfect place to get 3 hours of deep work done.', userType: 'Foodie', helpfulCount: 16 }
    ],
    dataSource: 'District Verified',
    isVerified: true,
    lastVerifiedAt: '2026-10-18'
  },
  {
    id: 'tablescape-v2',
    name: 'Sly Granny - The Community House',
    slug: 'sly-granny-indiranagar',
    venueType: 'bistro',
    tagline: 'Whimsical prohibition-era cocktail lounge with eclectic European comfort plates.',
    description: 'Sly Granny blends eccentric Victorian parlours with a sun-drenched rooftop terrace. Known for its curated jazz soundtracks, craft mixology, and decadent small plates.',
    knownFor: ['Gin cocktails', 'Brie en Croûte', 'Rooftop golden hour', 'Duck Confit Tacos'],
    cuisineTypes: ['European', 'Cocktail Lounge', 'Tapas'],
    address: '618, 3rd Floor & Rooftop, 12th Main Rd, Indiranagar',
    locality: 'Indiranagar',
    city: 'Bengaluru',
    landmark: 'Above Smoke House Deli',
    latitude: 12.9734,
    longitude: 77.6405,
    rating: 4.6,
    reviewCount: 980,
    priceLevel: '₹₹₹',
    estimatedCostForTwo: 1400,
    openingHours: {
      monday: '12:00 PM - 11:30 PM',
      tuesday: '12:00 PM - 11:30 PM',
      wednesday: '12:00 PM - 11:30 PM',
      thursday: '12:00 PM - 12:00 AM',
      friday: '12:00 PM - 1:00 AM',
      saturday: '12:00 PM - 1:00 AM',
      sunday: '12:00 PM - 11:30 PM'
    },
    currentOpenStatus: 'open',
    timingNote: 'Rooftop sundowners start at 5:00 PM daily.',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      wifi: true,
      powerOutlets: false,
      outdoorSeating: true,
      petFriendly: false,
      airConditioning: true,
      valetParking: true,
      reservations: true,
      liveMusic: true,
      wheelchairAccessible: true,
      privateDining: true
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: false,
      jain: false,
      glutenFree: true,
      halal: true
    },
    ambienceTags: ['Romantic', 'Rooftop', 'Aesthetic', 'Vintage'],
    occasionTags: ['A romantic evening', 'Celebrations', 'Catch-up with friends', 'Date Night'],
    badges: ['Great for Dates', 'Listed on District', 'Rooftop Lounge'],
    officialWebsite: 'https://slygranny.com',
    instagramUrl: 'https://instagram.com/sly_granny',
    phone: '+91 80 4853 6712',
    districtListingUrl: 'https://district.in/bengaluru/sly-granny-indiranagar',
    reservationUrl: 'https://district.in/bengaluru/sly-granny-indiranagar/book',
    menuItems: [
      { id: 'sg1', name: 'Baked French Brie en Croûte', category: 'Small Plates', price: 520, description: 'Phyllo pastry with fig compote and roasted walnuts.', isVeg: true, isChefSpecial: true },
      { id: 'sg2', name: 'Truffled Wild Mushroom Risotto', category: 'Mains', price: 590, description: 'Carnaroli rice, porcini dust, aged parmesan crisp.', isVeg: true },
      { id: 'sg3', name: 'Pan-Seared Sea Bass', category: 'Mains', price: 740, description: 'Lemon caper beurre blanc, crushed baby potatoes.', isVeg: false, isChefSpecial: true },
      { id: 'sg4', name: 'Elderflower Botanical Gin Fizz', category: 'Beverages', price: 460, description: 'Handcrafted craft gin, artisanal elderflower, cucumber twist.', isVeg: true }
    ],
    reviews: [
      { id: 'r3', author: 'Kabir Varma', rating: 4.7, date: 'October 10, 2026', comment: 'Took my partner here for our anniversary. The rooftop seating around sunset is magical with the fairy lights.', userType: 'Verified Diner', helpfulCount: 31 }
    ],
    dataSource: 'District Verified',
    isVerified: true,
    lastVerifiedAt: '2026-10-19'
  },
  {
    id: 'tablescape-v3',
    name: 'Third Wave Coffee Roasters',
    slug: 'third-wave-coffee-koramangala',
    venueType: 'cafe',
    tagline: 'Neighbourhood haven for quiet work sessions, cold brews, and fresh bagels.',
    description: 'A spacious, plant-filled cafe with quiet study zones, ergonomic seating, high-speed Wi-Fi, and a dedicated menu of specialty espresso roasts.',
    knownFor: ['Cold Fashioned brew', 'Cilantro Hummus Sourdough', 'Quiet study corners', 'Sea Salt Mocha'],
    cuisineTypes: ['Specialty Coffee', 'Bakery', 'Sandwiches'],
    address: '80 Feet Road, 4th Block, Koramangala',
    locality: 'Koramangala',
    city: 'Bengaluru',
    landmark: 'Opposite Sony World Signal',
    latitude: 12.9344,
    longitude: 77.6256,
    rating: 4.5,
    reviewCount: 2150,
    priceLevel: '₹₹',
    estimatedCostForTwo: 550,
    openingHours: {
      monday: '7:30 AM - 1:00 AM',
      tuesday: '7:30 AM - 1:00 AM',
      wednesday: '7:30 AM - 1:00 AM',
      thursday: '7:30 AM - 1:00 AM',
      friday: '7:30 AM - 2:00 AM',
      saturday: '7:30 AM - 2:00 AM',
      sunday: '7:30 AM - 1:00 AM'
    },
    currentOpenStatus: 'open',
    timingNote: 'Open until 1:00 AM every night. Great for late-night cravings.',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      wifi: true,
      powerOutlets: true,
      outdoorSeating: true,
      petFriendly: true,
      airConditioning: true,
      valetParking: false,
      reservations: false,
      liveMusic: false,
      wheelchairAccessible: true,
      privateDining: false
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      jain: true,
      glutenFree: false,
      halal: true
    },
    ambienceTags: ['Work-Friendly', 'Cozy', 'Minimalist'],
    occasionTags: ['Work mode', 'Solo time', 'Late-night cravings', 'Catch-up with friends'],
    badges: ['Work-Friendly', 'Late Night', 'Listed on District'],
    officialWebsite: 'https://thirdwavecoffeeroasters.com',
    instagramUrl: 'https://instagram.com/thirdwavecoffeeindia',
    phone: '+91 80 4965 2441',
    districtListingUrl: 'https://district.in/bengaluru/third-wave-coffee-koramangala',
    menuItems: [
      { id: 'tw1', name: 'Cold Fashioned Nitro Brew', category: 'Specialty Coffee', price: 230, description: 'Orange bitters, cold brew coffee, cinnamon zest.', isVeg: true, isVegan: true, isChefSpecial: true },
      { id: 'tw2', name: 'Sea Salt Mocha', category: 'Specialty Coffee', price: 240, description: 'Belgian dark chocolate, espresso, sea salt sprinkle.', isVeg: true },
      { id: 'tw3', name: 'Everything Bagel with Herb Cream Cheese', category: 'Bakery & Dessert', price: 210, description: 'Toasted sesame bagel served with whipped herb garlic cream cheese.', isVeg: true },
      { id: 'tw4', name: 'Smoked Cottage Cheese Melt Panini', category: 'Small Plates', price: 280, description: 'Charred paneer, sundried tomato pesto, mozzarella.', isVeg: true }
    ],
    reviews: [
      { id: 'r4', author: 'Pooja Nair', rating: 4.6, date: 'October 12, 2026', comment: 'Reliable Wi-Fi (over 90 Mbps), polite staff, and charging sockets at practically every table. Kept me productive all Sunday.', userType: 'Local Guide', helpfulCount: 19 }
    ],
    dataSource: 'District Verified',
    isVerified: true,
    lastVerifiedAt: '2026-10-20'
  },
  {
    id: 'tablescape-v4',
    name: 'Glen’s Bakehouse & Woodfired',
    slug: 'glens-bakehouse-lavelle-road',
    venueType: 'bakery',
    tagline: 'Iconic bakery in a vintage colonial bungalow serving red velvet cupcakes and sourdough pizzas.',
    description: 'Set within an idyllic white heritage villa surrounded by sprawling rain trees, Glen’s is famous across Bengaluru for warm oven-fresh mini red velvet cupcakes and sourdough pizzas.',
    knownFor: ['Mini Red Velvet cupcakes', 'Wood-fired sourdough pizza', 'Outdoor patio garden', 'Apple cinnamon tart'],
    cuisineTypes: ['Artisan Bakery', 'Italian', 'Cafe'],
    address: '24/1, Lavelle Road, Shanthala Nagar, Ashok Nagar',
    locality: 'Lavelle Road',
    city: 'Bengaluru',
    landmark: 'Behind UB City',
    latitude: 12.9711,
    longitude: 77.5968,
    rating: 4.7,
    reviewCount: 3800,
    priceLevel: '₹₹',
    estimatedCostForTwo: 600,
    openingHours: {
      monday: '9:00 AM - 11:30 PM',
      tuesday: '9:00 AM - 11:30 PM',
      wednesday: '9:00 AM - 11:30 PM',
      thursday: '9:00 AM - 11:30 PM',
      friday: '9:00 AM - 12:00 AM',
      saturday: '9:00 AM - 12:00 AM',
      sunday: '9:00 AM - 11:30 PM'
    },
    currentOpenStatus: 'open',
    timingNote: 'Fresh batches of warm cupcakes come out every 45 minutes.',
    coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      wifi: true,
      powerOutlets: false,
      outdoorSeating: true,
      petFriendly: true,
      airConditioning: true,
      valetParking: true,
      reservations: false,
      liveMusic: false,
      wheelchairAccessible: true,
      privateDining: false
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      jain: true,
      glutenFree: false,
      halal: true
    },
    ambienceTags: ['Vintage', 'Lush Greenery', 'Cozy', 'Outdoor'],
    occasionTags: ['A slow morning', 'Catch-up with friends', 'Food adventures', 'Brunch'],
    badges: ["Editor's Pick", 'Budget Friendly', 'Listed on District'],
    phone: '+91 80 4112 0440',
    districtListingUrl: 'https://district.in/bengaluru/glens-bakehouse-lavelle-road',
    menuItems: [
      { id: 'gb1', name: 'Signature Mini Red Velvet Cupcakes (Box of 4)', category: 'Bakery & Dessert', price: 160, description: 'Velvety cream cheese frosting on tender buttermilk crumb.', isVeg: true, isChefSpecial: true },
      { id: 'gb2', name: 'Quattro Formaggi Sourdough Pizza', category: 'Mains', price: 420, description: 'Buffalo mozzarella, gorgonzola, parmesan, ricotta.', isVeg: true },
      { id: 'gb3', name: 'Classic Iced Lemon Tea', category: 'Beverages', price: 140, description: 'Freshly brewed black tea infused with mint and Meyer lemon.', isVeg: true, isVegan: true }
    ],
    reviews: [
      { id: 'r5', author: 'Meera Iyer', rating: 4.9, date: 'October 17, 2026', comment: 'Sitting outside under the shade of the mango tree on Lavelle Road eating warm red velvet cupcakes is my favourite Bengaluru weekend ritual.', userType: 'Foodie', helpfulCount: 42 }
    ],
    dataSource: 'District Verified',
    isVerified: true,
    lastVerifiedAt: '2026-10-14'
  },
  {
    id: 'tablescape-v5',
    name: 'Olive Beach Bistro & Garden',
    slug: 'olive-beach-wood-street',
    venueType: 'fine_dining',
    tagline: 'Sun-washed Mediterranean courtyard serving Michelin-level European gastronomy.',
    description: 'A white-walled sanctuary reminiscent of a Greek island villa. Executive chefs craft handmade pastas, wood-fired seafood, and artisanal cocktails in an atmospheric candlelit courtyard.',
    knownFor: ['Handmade tagliatelle with shaved truffle', 'Charred octopus', 'Candlelit bougainvillea courtyard', 'Tiramisu al limone'],
    cuisineTypes: ['Mediterranean', 'Italian', 'Fine Dining'],
    address: '16, Wood Street, Ashok Nagar, Richmond Town',
    locality: 'Richmond Town',
    city: 'Bengaluru',
    landmark: 'Near Sacred Heart Girls School',
    latitude: 12.9649,
    longitude: 77.6074,
    rating: 4.9,
    reviewCount: 1640,
    priceLevel: '₹₹₹₹',
    estimatedCostForTwo: 2400,
    openingHours: {
      monday: '12:00 PM - 3:30 PM, 7:00 PM - 11:30 PM',
      tuesday: '12:00 PM - 3:30 PM, 7:00 PM - 11:30 PM',
      wednesday: '12:00 PM - 3:30 PM, 7:00 PM - 11:30 PM',
      thursday: '12:00 PM - 3:30 PM, 7:00 PM - 11:30 PM',
      friday: '12:00 PM - 3:30 PM, 7:00 PM - 12:00 AM',
      saturday: '12:00 PM - 4:00 PM, 7:00 PM - 12:00 AM',
      sunday: '12:00 PM - 4:00 PM, 7:00 PM - 11:30 PM'
    },
    currentOpenStatus: 'open',
    timingNote: 'Prior reservation strongly advised for courtyard dinner seating.',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      wifi: true,
      powerOutlets: false,
      outdoorSeating: true,
      petFriendly: false,
      airConditioning: true,
      valetParking: true,
      reservations: true,
      liveMusic: true,
      wheelchairAccessible: true,
      privateDining: true
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      jain: true,
      glutenFree: true,
      halal: true
    },
    ambienceTags: ['Romantic', 'Lush Greenery', 'Aesthetic', 'Outdoor'],
    occasionTags: ['A romantic evening', 'Celebrations', 'Date Night'],
    badges: ["Editor's Pick", 'Great for Dates', 'Fine Dining'],
    officialWebsite: 'https://olivebarandkitchen.com',
    instagramUrl: 'https://instagram.com/olivebeachblr',
    phone: '+91 80 4112 8400',
    districtListingUrl: 'https://district.in/bengaluru/olive-beach-richmond-town',
    reservationUrl: 'https://district.in/bengaluru/olive-beach-richmond-town/book',
    menuItems: [
      { id: 'ob1', name: 'Handmade Black Truffle Tagliatelle', category: 'Mains', price: 890, description: 'Hand-rolled egg yolk pasta, Umbrian black truffle butter, aged 24-month Parmigiano-Reggiano.', isVeg: true, isChefSpecial: true },
      { id: 'ob2', name: 'Burrata Pugliese with Heirloom Tomatoes', category: 'Small Plates', price: 620, description: 'Creamy artisanal burrata, macerated cherries, cold-pressed Tuscan olive oil, micro basil.', isVeg: true, isChefSpecial: true },
      { id: 'ob3', name: 'Chilean Sea Bass Cartoccio', category: 'Mains', price: 1150, description: 'Baked in parchment paper with baby clams, saffron broth, cherry tomatoes, kalamata olives.', isVeg: false }
    ],
    reviews: [
      { id: 'r6', author: 'Vikramaditya Roy', rating: 5, date: 'October 16, 2026', comment: 'The pinnacle of fine romantic dining in Bangalore. Unobtrusive service, sublime pasta, and candlelight under the stars.', userType: 'Verified Diner', helpfulCount: 50 }
    ],
    dataSource: 'District Verified',
    isVerified: true,
    lastVerifiedAt: '2026-10-21'
  },
  {
    id: 'tablescape-v6',
    name: 'Dyu Art Cafe',
    slug: 'dyu-art-cafe-koramangala',
    venueType: 'cafe',
    tagline: 'Traditional Kerala ancestral courtyard cafe with quiet art exhibitions and banoffee pie.',
    description: 'Constructed like a classic Kerala Tharavadu house with clay tile roofs, stone open-sky courtyards, and hanging artworks. Famous for its gentle, serene atmosphere where time slows down.',
    knownFor: ['Homemade Banoffee Pie', 'French Press Coffee', 'Art exhibitions', 'Chocolate Cake'],
    cuisineTypes: ['Cafe & Bakery', 'Continental', 'Desserts'],
    address: 'No. 23, KHB Colony, 5th Block, Koramangala',
    locality: 'Koramangala',
    city: 'Bengaluru',
    landmark: 'Behind Jyoti Nivas College',
    latitude: 12.9348,
    longitude: 77.6183,
    rating: 4.8,
    reviewCount: 4120,
    priceLevel: '₹',
    estimatedCostForTwo: 450,
    openingHours: {
      monday: '10:00 AM - 10:30 PM',
      tuesday: '10:00 AM - 10:30 PM',
      wednesday: '10:00 AM - 10:30 PM',
      thursday: '10:00 AM - 10:30 PM',
      friday: '10:00 AM - 10:30 PM',
      saturday: '10:00 AM - 10:30 PM',
      sunday: '10:00 AM - 10:30 PM'
    },
    currentOpenStatus: 'open',
    timingNote: 'Best visited during afternoon hours for peaceful book reading.',
    coverImage: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      wifi: false,
      powerOutlets: false,
      outdoorSeating: true,
      petFriendly: true,
      airConditioning: false,
      valetParking: false,
      reservations: false,
      liveMusic: false,
      wheelchairAccessible: true,
      privateDining: false
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      jain: true,
      glutenFree: false,
      halal: true
    },
    ambienceTags: ['Vintage', 'Cozy', 'Lush Greenery', 'Outdoor'],
    occasionTags: ['Solo time', 'A slow morning', 'Catch-up with friends'],
    badges: ['Hidden Gem', 'Budget Friendly', "Editor's Pick"],
    phone: '+91 98958 99866',
    districtListingUrl: 'https://district.in/bengaluru/dyu-art-cafe-koramangala',
    menuItems: [
      { id: 'dy1', name: 'Signature Warm Banoffee Pie', category: 'Bakery & Dessert', price: 180, description: 'Crisp biscuit base, dulce de leche, fresh bananas, whipped cream.', isVeg: true, isChefSpecial: true },
      { id: 'dy2', name: 'Cold Chocolate with Real Ganache', category: 'Beverages', price: 160, description: 'Rich dark melted cocoa whisked with chilled whole milk.', isVeg: true },
      { id: 'dy3', name: 'Kerala Spiced Tuna Melt Sandwich', category: 'Small Plates', price: 210, description: 'Crusty bread grilled with herbs, bell peppers and mild mustard.', isVeg: false }
    ],
    reviews: [
      { id: 'r7', author: 'Tanvi Kamath', rating: 5, date: 'September 19, 2026', comment: 'There is no Wi-Fi here and that is its greatest gift. Everyone is reading paperbacks or sketching in the open courtyard.', userType: 'Local Guide', helpfulCount: 38 }
    ],
    dataSource: 'Editorial Team',
    isVerified: true,
    lastVerifiedAt: '2026-10-15'
  },
  {
    id: 'tablescape-v7',
    name: 'Smoke House Deli',
    slug: 'smoke-house-deli-lavelle-road',
    venueType: 'bistro',
    tagline: 'Hand-drawn whimsical monochrome walls serving artisanal all-day breakfast & burgers.',
    description: 'Renowned for its illustrated storybook interiors and comfort gourmet cooking, Smoke House Deli is an institution for business brunches, fluffy buttermilk pancakes, and hand-rolled gnocchi.',
    knownFor: ['Fluffy Ricotta Buttermilk Pancakes', 'Smoked Chicken & Pesto Panini', 'Hand-drawn monochrome walls', 'Salted Caramel Tart'],
    cuisineTypes: ['European', 'Continental', 'Artisan Bakery'],
    address: '52, 53, Ground Floor, Lavelle Road',
    locality: 'Lavelle Road',
    city: 'Bengaluru',
    landmark: 'Near Richmond Circle',
    latitude: 12.9685,
    longitude: 77.5982,
    rating: 4.6,
    reviewCount: 2200,
    priceLevel: '₹₹₹',
    estimatedCostForTwo: 950,
    openingHours: {
      monday: '9:00 AM - 11:00 PM',
      tuesday: '9:00 AM - 11:00 PM',
      wednesday: '9:00 AM - 11:00 PM',
      thursday: '9:00 AM - 11:00 PM',
      friday: '9:00 AM - 11:30 PM',
      saturday: '9:00 AM - 11:30 PM',
      sunday: '9:00 AM - 11:00 PM'
    },
    currentOpenStatus: 'open',
    timingNote: 'Breakfast served from 9 AM to 12 PM daily.',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      wifi: true,
      powerOutlets: true,
      outdoorSeating: true,
      petFriendly: false,
      airConditioning: true,
      valetParking: true,
      reservations: true,
      liveMusic: false,
      wheelchairAccessible: true,
      privateDining: false
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      jain: true,
      glutenFree: true,
      halal: true
    },
    ambienceTags: ['Aesthetic', 'Minimalist', 'Cozy'],
    occasionTags: ['Brunch', 'Business meeting', 'Catch-up with friends'],
    badges: ['Listed on District', 'Trending'],
    officialWebsite: 'https://smokehousedeli.com',
    instagramUrl: 'https://instagram.com/smokehousedeli',
    phone: '+91 80 4127 6272',
    districtListingUrl: 'https://district.in/bengaluru/smoke-house-deli-lavelle-road',
    reservationUrl: 'https://district.in/bengaluru/smoke-house-deli-lavelle-road/book',
    menuItems: [
      { id: 'sh1', name: 'Ricotta Fluffy Pancakes with Blueberry Butter', category: 'Specialty Coffee', price: 340, description: 'Stack of 3 warm pancakes, real Canadian maple drizzle.', isVeg: true, isChefSpecial: true },
      { id: 'sh2', name: 'Smoked Salmon & Cream Cheese Croissant', category: 'Small Plates', price: 460, description: 'Norwegian cold-smoked salmon, capers, fresh dill.', isVeg: false },
      { id: 'sh3', name: 'Peri Peri Spiced Cottage Cheese Steak', category: 'Mains', price: 480, description: 'Herb roasted ratatouille, paprika coulis.', isVeg: true }
    ],
    reviews: [
      { id: 'r8', author: 'Naveen Kumar', rating: 4.5, date: 'October 11, 2026', comment: 'Always our go-to spot for brunch after morning walks in Cubbon Park. Clean, bright, and delicious.', userType: 'Verified Diner', helpfulCount: 14 }
    ],
    dataSource: 'District Verified',
    isVerified: true,
    lastVerifiedAt: '2026-10-17'
  },
  {
    id: 'tablescape-v8',
    name: 'Toit Brewpub & Kitchen',
    slug: 'toit-brewpub-indiranagar',
    venueType: 'lounge',
    tagline: 'Bengaluru’s legendary microbrewery with colonial wooden bars and handcrafted wood-fired pizzas.',
    description: 'An enduring cultural landmark of Indiranagar. Toit revolutionized India’s craft beer movement with signature brews like Tint-in-Toit, Tinted Ale, and legendary sourdough pizzas in a multi-level brick warehouse.',
    knownFor: ['Tint-in-Toit Belgian witbier', 'Basmati Blonde brew', 'Beef Stroganoff & Pork Ribs', 'Woodfired sourdough pizza'],
    cuisineTypes: ['Microbrewery', 'European', 'Pizza'],
    address: '298, 100 Feet Road, Near KFC Signal, Indiranagar',
    locality: 'Indiranagar',
    city: 'Bengaluru',
    landmark: 'Opposite New Horizon School',
    latitude: 12.9782,
    longitude: 77.6409,
    rating: 4.8,
    reviewCount: 9200,
    priceLevel: '₹₹₹',
    estimatedCostForTwo: 1200,
    openingHours: {
      monday: '12:00 PM - 12:00 AM',
      tuesday: '12:00 PM - 12:00 AM',
      wednesday: '12:00 PM - 12:00 AM',
      thursday: '12:00 PM - 12:00 AM',
      friday: '12:00 PM - 1:00 AM',
      saturday: '12:00 PM - 1:00 AM',
      sunday: '12:00 PM - 12:00 AM'
    },
    currentOpenStatus: 'open',
    timingNote: 'High weekend footfall; walk-ins may experience short wait times.',
    coverImage: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      wifi: true,
      powerOutlets: false,
      outdoorSeating: true,
      petFriendly: true,
      airConditioning: true,
      valetParking: true,
      reservations: true,
      liveMusic: true,
      wheelchairAccessible: true,
      privateDining: true
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      jain: false,
      glutenFree: false,
      halal: true
    },
    ambienceTags: ['Vintage', 'Casual', 'Cozy'],
    occasionTags: ['Catch-up with friends', 'Celebrations', 'Food adventures'],
    badges: ["Editor's Pick", 'Listed on District', 'Iconic Spot'],
    officialWebsite: 'https://toit.in',
    instagramUrl: 'https://instagram.com/toitbeerco',
    phone: '+91 90197 13388',
    districtListingUrl: 'https://district.in/bengaluru/toit-indiranagar',
    reservationUrl: 'https://toit.in/reservations',
    menuItems: [
      { id: 'tt1', name: 'Tint-in-Toit Belgian Wit Flight (330ml)', category: 'Beverages', price: 295, description: 'Brewed with orange peel and coriander seeds.', isVeg: true, isVegan: true, isChefSpecial: true },
      { id: 'tt2', name: 'Toit Baked Nachos Grande', category: 'Small Plates', price: 380, description: 'House corn chips, cheddar melt, jalapeño salsa, sour cream.', isVeg: true },
      { id: 'tt3', name: 'Smoked Bacon & Fig Pizza', category: 'Mains', price: 540, description: 'Thin crust, mozzarella, caramelized onions, honey balsamic drizzle.', isVeg: false, isChefSpecial: true }
    ],
    reviews: [
      { id: 'r9', author: 'Aditya Sen', rating: 4.8, date: 'October 14, 2026', comment: 'You cannot say you experienced Bengaluru without an evening at Toit. Electric vibe, stellar craft beer, and pet-friendly ground floor.', userType: 'Foodie', helpfulCount: 45 }
    ],
    dataSource: 'District Verified',
    isVerified: true,
    lastVerifiedAt: '2026-10-21'
  },
  {
    id: 'tablescape-v9',
    name: 'Sante Spa Cuisine',
    slug: 'sante-spa-cuisine-indiranagar',
    venueType: 'restaurant',
    tagline: 'Guilt-free organic, vegan & sattvic fine dining amidst bamboo groves.',
    description: 'A tranquil sanctuary focused on mindful eating. Sante Spa crafts exquisite plant-based gastronomy with ancient millets, chlorophyll coolers, and farm-fresh heirloom vegetables.',
    knownFor: ['Beetroot Tartare', 'Almond Milk Cappuccino', 'Raw Papaya Noodles', 'Guilt-Free Dark Chocolate Tart'],
    cuisineTypes: ['Healthy Organic', 'Vegan', 'Mediterranean'],
    address: '151, 2nd Cross Road, Domlur II Stage, Indiranagar',
    locality: 'Indiranagar',
    city: 'Bengaluru',
    landmark: 'Near Domlur Club',
    latitude: 12.9632,
    longitude: 77.6385,
    rating: 4.7,
    reviewCount: 890,
    priceLevel: '₹₹₹',
    estimatedCostForTwo: 850,
    openingHours: {
      monday: '11:00 AM - 10:30 PM',
      tuesday: '11:00 AM - 10:30 PM',
      wednesday: '11:00 AM - 10:30 PM',
      thursday: '11:00 AM - 10:30 PM',
      friday: '11:00 AM - 11:00 PM',
      saturday: '11:00 AM - 11:00 PM',
      sunday: '11:00 AM - 10:30 PM'
    },
    currentOpenStatus: 'open',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      wifi: true,
      powerOutlets: true,
      outdoorSeating: true,
      petFriendly: true,
      airConditioning: true,
      valetParking: true,
      reservations: true,
      liveMusic: false,
      wheelchairAccessible: true,
      privateDining: false
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      jain: true,
      glutenFree: true,
      halal: true
    },
    ambienceTags: ['Aesthetic', 'Lush Greenery', 'Minimalist', 'Cozy'],
    occasionTags: ['Solo time', 'Brunch', 'Catch-up with friends', 'A slow morning'],
    badges: ['Vegetarian-Friendly', 'Listed on District', 'Editor’s Pick'],
    officialWebsite: 'https://santespacuisine.com',
    instagramUrl: 'https://instagram.com/santespabengaluru',
    phone: '+91 80 4110 5005',
    districtListingUrl: 'https://district.in/bengaluru/sante-spa-indiranagar',
    menuItems: [
      { id: 'ss1', name: 'Organic Ragi Crusted Flatbread', category: 'Small Plates', price: 390, description: 'Superfood grain dough, homemade cashew cream, roasted sun peppers.', isVeg: true, isVegan: true, isChefSpecial: true },
      { id: 'ss2', name: 'Matcha Moringa Latte', category: 'Beverages', price: 240, description: 'Ceremonial Uji matcha, farm-pressed almond milk, raw coconut nectar.', isVeg: true, isVegan: true },
      { id: 'ss3', name: 'Raw Vegan Avocado Key Lime Tart', category: 'Bakery & Dessert', price: 310, description: 'Dates and macadamia nut crust with lime zest.', isVeg: true, isVegan: true, isGlutenFree: true }
    ],
    reviews: [
      { id: 'r10', author: 'Deepika Rao', rating: 4.8, date: 'October 18, 2026', comment: 'The best pure vegetarian & vegan menu in the city that genuinely tastes gourmet. Their patio garden is heavenly.', userType: 'Verified Diner', helpfulCount: 22 }
    ],
    dataSource: 'District Verified',
    isVerified: true,
    lastVerifiedAt: '2026-10-19'
  },
  {
    id: 'tablescape-v10',
    name: 'Blue Tokai Coffee Roasters',
    slug: 'blue-tokai-church-street',
    venueType: 'cafe',
    tagline: 'India’s pioneering specialty coffee pioneers on tree-lined Church Street.',
    description: 'Facing the vibrant cobbles of Church Street, Blue Tokai is the heartbeat of Bengaluru’s reader and tech culture. Settle in for freshly brewed single origins, sourdough croissants, and passionate barista conversations.',
    knownFor: ['Cold Brew Tonic with Grapefruit', 'Croissant Breads', 'Pourovers', 'Almond Croissants'],
    cuisineTypes: ['Specialty Coffee', 'Bakery', 'Breakfast'],
    address: 'Brigade Gardens, Church Street, Shanthala Nagar',
    locality: 'Church Street',
    city: 'Bengaluru',
    landmark: 'Opposite Blossom Book House',
    latitude: 12.9749,
    longitude: 77.6046,
    rating: 4.6,
    reviewCount: 3100,
    priceLevel: '₹₹',
    estimatedCostForTwo: 500,
    openingHours: {
      monday: '8:00 AM - 11:00 PM',
      tuesday: '8:00 AM - 11:00 PM',
      wednesday: '8:00 AM - 11:00 PM',
      thursday: '8:00 AM - 11:00 PM',
      friday: '8:00 AM - 11:30 PM',
      saturday: '8:00 AM - 11:30 PM',
      sunday: '8:00 AM - 11:00 PM'
    },
    currentOpenStatus: 'open',
    timingNote: 'Outdoor porch seating offers front-row views of Church Street buskers.',
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      wifi: true,
      powerOutlets: true,
      outdoorSeating: true,
      petFriendly: true,
      airConditioning: true,
      valetParking: false,
      reservations: false,
      liveMusic: false,
      wheelchairAccessible: true,
      privateDining: false
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      jain: true,
      glutenFree: false,
      halal: true
    },
    ambienceTags: ['Work-Friendly', 'Aesthetic', 'Cozy'],
    occasionTags: ['Coffee and conversations', 'Solo time', 'Work mode', 'A slow morning'],
    badges: ['Work-Friendly', 'Listed on District', 'Iconic Spot'],
    officialWebsite: 'https://bluetokaicoffee.com',
    instagramUrl: 'https://instagram.com/bluetokaicoffee',
    phone: '+91 93199 70008',
    districtListingUrl: 'https://district.in/bengaluru/blue-tokai-church-street',
    menuItems: [
      { id: 'bt1', name: 'Riverdale Estate Cold Brew Tonic', category: 'Specialty Coffee', price: 240, description: 'Naturally processed floral coffee with citrus tonic water.', isVeg: true, isVegan: true, isChefSpecial: true },
      { id: 'bt2', name: 'Freshly Baked Twice-Baked Almond Croissant', category: 'Bakery & Dessert', price: 220, description: 'Frangipane almond cream, toasted flakes, dusting of icing sugar.', isVeg: true },
      { id: 'bt3', name: 'Smoked Chicken & Mustard Sourdough Sandwich', category: 'Small Plates', price: 290, description: 'Dijon mayo, gherkins, aged cheddar.', isVeg: false }
    ],
    reviews: [
      { id: 'r11', author: 'Siddharth Iyer', rating: 4.7, date: 'October 13, 2026', comment: 'Grab a book from Blossom next door, order a pour-over here on Church Street, and you have the best Saturday imaginable.', userType: 'Local Guide', helpfulCount: 33 }
    ],
    dataSource: 'District Verified',
    isVerified: true,
    lastVerifiedAt: '2026-10-20'
  },
  {
    id: 'tablescape-v11',
    name: 'Bastian Bandra',
    slug: 'bastian-bandra-mumbai',
    venueType: 'fine_dining',
    tagline: 'Celebrity-favourite seafood indulgence and bohemian chic interiors in Bandra.',
    description: 'A high-energy, sophisticated culinary landmark in Mumbai. Bastian is renowned for decadent seafood platters, lobster mac and cheese, and their iconic giant Basque cheesecakes.',
    knownFor: ['Lobster Thermidor', 'Nutella Basque Cheesecake', 'Crab in butter garlic', 'Bohemian decor'],
    cuisineTypes: ['Seafood', 'Pan-Asian', 'Fine Dining'],
    address: 'B/1, Kamal Building, Linking Road, Bandra West',
    locality: 'Bandra West',
    city: 'Mumbai',
    landmark: 'Near National College',
    latitude: 19.0596,
    longitude: 72.8295,
    rating: 4.8,
    reviewCount: 3400,
    priceLevel: '₹₹₹₹',
    estimatedCostForTwo: 2800,
    openingHours: {
      monday: '12:00 PM - 4:00 PM, 7:00 PM - 1:00 AM',
      tuesday: '12:00 PM - 4:00 PM, 7:00 PM - 1:00 AM',
      wednesday: '12:00 PM - 4:00 PM, 7:00 PM - 1:00 AM',
      thursday: '12:00 PM - 4:00 PM, 7:00 PM - 1:00 AM',
      friday: '12:00 PM - 4:00 PM, 7:00 PM - 1:30 AM',
      saturday: '12:00 PM - 4:30 PM, 7:00 PM - 1:30 AM',
      sunday: '12:00 PM - 4:30 PM, 7:00 PM - 1:00 AM'
    },
    currentOpenStatus: 'open',
    timingNote: 'Dinner bookings required at least 3 days in advance.',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      wifi: true,
      powerOutlets: false,
      outdoorSeating: false,
      petFriendly: false,
      airConditioning: true,
      valetParking: true,
      reservations: true,
      liveMusic: true,
      wheelchairAccessible: true,
      privateDining: true
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: false,
      jain: false,
      glutenFree: true,
      halal: true
    },
    ambienceTags: ['Aesthetic', 'Romantic', 'Casual'],
    occasionTags: ['Celebrations', 'Date Night', 'A romantic evening'],
    badges: ["Editor's Pick", 'Listed on District', 'Iconic Spot'],
    officialWebsite: 'https://bastianhospitality.com',
    instagramUrl: 'https://instagram.com/bastianmumbai',
    phone: '+91 22 5033 3555',
    districtListingUrl: 'https://district.in/mumbai/bastian-bandra',
    reservationUrl: 'https://district.in/mumbai/bastian-bandra/book',
    menuItems: [
      { id: 'ba1', name: 'Signature Mud Crab in Singapore Chili Sauce', category: 'Mains', price: 1850, description: 'Served with warm steamed mantou buns.', isVeg: false, isChefSpecial: true },
      { id: 'ba2', name: 'Truffle & Edamame Dumplings (6 pcs)', category: 'Small Plates', price: 680, description: 'Steamed crystal wrappers, white truffle essence.', isVeg: true },
      { id: 'ba3', name: 'Burnt San Sebastian Basque Cheesecake', category: 'Bakery & Dessert', price: 550, description: 'Creamy caramelized custard center with berry coulis.', isVeg: true, isChefSpecial: true }
    ],
    reviews: [
      { id: 'r12', author: 'Karan Johar', rating: 5, date: 'October 8, 2026', comment: 'Bastian never fails to deliver high energy and exquisite seafood. The Basque cheesecake is perfection.', userType: 'Verified Diner', helpfulCount: 62 }
    ],
    dataSource: 'District Verified',
    isVerified: true,
    lastVerifiedAt: '2026-10-19'
  },
  {
    id: 'tablescape-v12',
    name: 'Diggin Cafe & Italian',
    slug: 'diggin-cafe-hauz-khas-delhi',
    venueType: 'cafe',
    tagline: 'Fairy-tale brick cafe covered in romantic ivy, fairy lights, and Italian pizzas.',
    description: 'Delhi’s quintessential romantic date spot. Nestled opposite Siri Fort auditorium, Diggin boasts cascading green ivy, French windows, hand-tossed thin crust pizzas, and decadent hot chocolate.',
    knownFor: ['Belgian Hot Chocolate', 'Diggin Special Sourdough Pizza', 'Rose Lemonade', 'Ivy-covered brick walls'],
    cuisineTypes: ['Italian', 'Cafe', 'Desserts'],
    address: 'Santushti Shopping Complex / Opposite Siri Fort, Hauz Khas',
    locality: 'Hauz Khas',
    city: 'Delhi NCR',
    landmark: 'Opposite Gargi College',
    latitude: 28.5529,
    longitude: 77.2185,
    rating: 4.7,
    reviewCount: 5600,
    priceLevel: '₹₹',
    estimatedCostForTwo: 750,
    openingHours: {
      monday: '11:30 AM - 11:00 PM',
      tuesday: '11:30 AM - 11:00 PM',
      wednesday: '11:30 AM - 11:00 PM',
      thursday: '11:30 AM - 11:00 PM',
      friday: '11:30 AM - 11:30 PM',
      saturday: '11:30 AM - 11:30 PM',
      sunday: '11:30 AM - 11:00 PM'
    },
    currentOpenStatus: 'open',
    timingNote: 'Fairy lights illuminate the entire exterior from 6:30 PM onwards.',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: {
      wifi: true,
      powerOutlets: false,
      outdoorSeating: true,
      petFriendly: true,
      airConditioning: true,
      valetParking: true,
      reservations: false,
      liveMusic: false,
      wheelchairAccessible: true,
      privateDining: false
    },
    dietaryOptions: {
      vegetarian: true,
      vegan: true,
      jain: true,
      glutenFree: false,
      halal: true
    },
    ambienceTags: ['Romantic', 'Aesthetic', 'Vintage', 'Cozy'],
    occasionTags: ['A romantic evening', 'Date Night', 'Catch-up with friends'],
    badges: ['Great for Dates', 'Listed on District', 'Iconic Spot'],
    instagramUrl: 'https://instagram.com/diggincafe',
    phone: '+91 11 4080 0081',
    districtListingUrl: 'https://district.in/delhi/diggin-hauz-khas',
    menuItems: [
      { id: 'dg1', name: 'Diggin Signature Hot Chocolate', category: 'Beverages', price: 230, description: 'Velvety melted Belgian chocolate topped with marshmallow fluff.', isVeg: true, isChefSpecial: true },
      { id: 'dg2', name: 'Smoked Chicken & Jalapeno Pizza', category: 'Mains', price: 440, description: 'Crisp wood-fired dough, mozzarella, spicy pickled peppers.', isVeg: false },
      { id: 'dg3', name: 'Zucchini & Goat Cheese Ravioli', category: 'Mains', price: 420, description: 'Sage burnt butter reduction, roasted pine nuts.', isVeg: true }
    ],
    reviews: [
      { id: 'r13', author: 'Ishita Kapoor', rating: 4.9, date: 'October 19, 2026', comment: 'Looks straight out of an Italian countryside romance film. Truly the most aesthetic cafe in South Delhi.', userType: 'Verified Diner', helpfulCount: 47 }
    ],
    dataSource: 'District Verified',
    isVerified: true,
    lastVerifiedAt: '2026-10-21'
  }
];

export const CITIES = [
  { id: 'bengaluru', name: 'Bengaluru', label: 'Bengaluru', defaultLocality: 'Indiranagar', lat: 12.9716, lng: 77.5946 },
  { id: 'mumbai', name: 'Mumbai', label: 'Mumbai', defaultLocality: 'Bandra West', lat: 19.0760, lng: 72.8777 },
  { id: 'delhi', name: 'Delhi NCR', label: 'Delhi NCR', defaultLocality: 'Hauz Khas', lat: 28.6139, lng: 77.2090 },
  { id: 'pune', name: 'Pune', label: 'Pune', defaultLocality: 'Koregaon Park', lat: 18.5204, lng: 73.8567 },
  { id: 'hyderabad', name: 'Hyderabad', label: 'Hyderabad', defaultLocality: 'Jubilee Hills', lat: 17.3850, lng: 78.4867 }
];

export const CATEGORIES = [
  { id: 'coffee', label: 'Coffee & Cafes', icon: 'Coffee', venueType: 'cafe', tag: 'Great Coffee' },
  { id: 'date-night', label: 'Date Night', icon: 'Heart', occasion: 'Date Night', tag: 'Romantic' },
  { id: 'work-cafes', label: 'Work & Study Cafes', icon: 'Laptop', facility: 'wifi', tag: 'Work-Friendly' },
  { id: 'fine-dining', label: 'Fine Dining', icon: 'Sparkles', venueType: 'fine_dining', tag: 'Fine Dining' },
  { id: 'bakeries', label: 'Bakeries & Desserts', icon: 'Cake', venueType: 'bakery', tag: 'Artisan Bakery' },
  { id: 'rooftops', label: 'Rooftop Restaurants', icon: 'Sunset', ambience: 'Rooftop', tag: 'Rooftop' },
  { id: 'budget', label: 'Budget Eats (< ₹500)', icon: 'Wallet', maxBudget: 500, tag: 'Budget Friendly' },
  { id: 'brunch', label: 'Brunch Spots', icon: 'Sun', occasion: 'Brunch', tag: 'Brunch' },
  { id: 'late-night', label: 'Late-Night Food', icon: 'Moon', tag: 'Late Night' },
  { id: 'pet-friendly', label: 'Pet-Friendly Places', icon: 'Dog', facility: 'petFriendly', tag: 'Pet Friendly' },
  { id: 'veg', label: 'Vegetarian-Friendly', icon: 'Leaf', dietary: 'vegetarian', tag: 'Pure Veg Options' },
  { id: 'hidden-gems', label: 'Hidden Gems', icon: 'Compass', badge: 'Hidden Gem', tag: 'Quiet Corners' }
];

export const MOODS = [
  { id: 'slow-morning', title: 'A slow morning', subtitle: 'Pour-overs, sunlit corners & paperbacks', occasion: 'A slow morning', badge: 'Sunny' },
  { id: 'coffee-talk', title: 'Coffee & conversations', subtitle: 'Acoustic tunes & deep catch-ups', occasion: 'Coffee and conversations', badge: 'Social' },
  { id: 'romantic', title: 'A romantic evening', subtitle: 'Candlelight, warm courtyard & fine wine', occasion: 'A romantic evening', badge: 'Intimate' },
  { id: 'work-mode', title: 'Work mode', subtitle: 'High-speed Wi-Fi, plugs & quiet focus', occasion: 'Work mode', badge: 'Productive' },
  { id: 'late-cravings', title: 'Late-night cravings', subtitle: 'Open past midnight for night owls', occasion: 'Late-night cravings', badge: 'After Dark' },
  { id: 'celebrations', title: 'Celebrations & birthdays', subtitle: 'Vibrant energy, cocktails & memories', occasion: 'Celebrations', badge: 'Festive' }
];
