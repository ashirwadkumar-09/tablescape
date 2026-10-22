import { DiningOffer, EditorialGuide } from '../types/venue';

export const INITIAL_OFFERS: DiningOffer[] = [
  {
    id: 'off-1',
    title: '20% Off All Single-Origin Pour-Overs & Brew Flights',
    venueId: 'tablescape-v1',
    venueName: 'Araku Coffee & Roastery',
    locality: 'Indiranagar, Bengaluru',
    discountType: 'Percentage',
    description: 'Experience estate-harvested micro-lot coffees with an exclusive weekday 20% privilege on manual brewing bar items between 9 AM and 1 PM.',
    terms: 'Valid Monday through Thursday on bills above ₹400. Not valid in conjunction with other offers.',
    validDays: 'Mon - Thu, 9 AM - 1 PM',
    validTill: 'Nov 30, 2026',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    bookingUrl: 'https://arakucoffee.in/reservations',
    isFeatured: true
  },
  {
    id: 'off-2',
    title: 'Sunset Aperitivo: Complimentary Chef Tapas with Craft Cocktails',
    venueId: 'tablescape-v2',
    venueName: 'Sly Granny - The Community House',
    locality: 'Indiranagar, Bengaluru',
    discountType: 'Complimentary',
    description: 'Order any two handcrafted rooftop cocktails between 5 PM and 7 PM and receive a complimentary artisan bruschetta or truffle brie plate.',
    terms: 'Valid on rooftop seating only. Maximum 1 complimentary plate per table.',
    validDays: 'Daily, 5 PM - 7 PM',
    validTill: 'Dec 15, 2026',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    bookingUrl: 'https://district.in/bengaluru/sly-granny-indiranagar/book',
    isFeatured: true
  },
  {
    id: 'off-3',
    title: 'Weekend Acoustic Jazz & 4-Course Degustation Menu',
    venueId: 'tablescape-v5',
    venueName: 'Olive Beach Bistro & Garden',
    locality: 'Richmond Town, Bengaluru',
    discountType: 'Special Set Menu',
    description: 'Immerse in live Mediterranean gypsy jazz alongside a curated four-course coastal tasting menu prepared by Master Chef Manu Chandra.',
    terms: 'Advance booking mandatory via District or official concierge. Price: ₹2,200 per guest.',
    validDays: 'Saturdays & Sundays 7:30 PM',
    validTill: 'Nov 28, 2026',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    bookingUrl: 'https://district.in/bengaluru/olive-beach-richmond-town/book',
    isFeatured: false
  },
  {
    id: 'off-4',
    title: 'Late Night Coffee & Warm Croissant Combo @ ₹299',
    venueId: 'tablescape-v3',
    venueName: 'Third Wave Coffee Roasters',
    locality: 'Koramangala, Bengaluru',
    discountType: 'Happy Hour',
    description: 'Night owls rejoice! Any classic cappuccino or flat white paired with a warm butter croissant or cinnamon swirl after 10 PM.',
    terms: 'Dine-in only. Available 10:00 PM until closing.',
    validDays: 'All days, 10 PM - 1 AM',
    validTill: 'Dec 31, 2026',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    isFeatured: false
  }
];

export const EDITORIAL_GUIDES: EditorialGuide[] = [
  {
    id: 'guide-1',
    title: 'The Best Cafes for Focused Deep Work & Fast Wi-Fi in Bengaluru',
    subtitle: 'Where ergonomics, charging ports, specialty brews, and quiet hum align for peak productivity.',
    author: 'Tarun Jacob',
    readTime: '4 min read',
    date: 'October 2026',
    city: 'Bengaluru',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
    featuredVenueIds: ['tablescape-v1', 'tablescape-v3', 'tablescape-v10'],
    summary: 'Finding a cafe where staff don’t give you side-eyes after 90 minutes is an art form. We tested Wi-Fi latencies, outlet availability, and background decibels across 25 Bengaluru spots.',
    content: [
      'For knowledge workers, freelancers, and startup founders, the cafe is the contemporary studio. But not every aesthetic spot is built for getting work done.',
      'Our top benchmark is simple: uninterrupted Wi-Fi exceeding 50 Mbps, comfortable back-supporting chairs, accessible power plugs, and baristas who respect the flow state.',
      'Araku Coffee in Indiranagar excels with its dedicated first-floor mezzanine, while Third Wave Koramangala remains the city champion for late-night crunch hours with its 1 AM closing schedule.'
    ]
  },
  {
    id: 'guide-2',
    title: 'Where to Go for a First Date: Intimate Corners & Candlelit Courtyards',
    subtitle: 'Skip the deafening club lounges and opt for romantic acoustics where conversation flows naturally.',
    author: 'Sanya Malhotra',
    readTime: '5 min read',
    date: 'October 2026',
    city: 'Bengaluru',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    featuredVenueIds: ['tablescape-v2', 'tablescape-v5', 'tablescape-v12'],
    summary: 'The difference between an awkward date and a magical evening often comes down to lighting, acoustics, and sharing small plates that spark delight.',
    content: [
      'First dates are high-stakes auditory environments. If you have to yell across a table over deep bass, intimacy evaporates before appetizers arrive.',
      'Olive Beach’s candlelit courtyard under the bougainvillea canopy is an eternal classic for timeless European charm.',
      'If you prefer a breezy, playful cocktail vibe, the rooftop greenhouse at Sly Granny provides just enough eclectic intrigue to keep conversations sparkling.'
    ]
  },
  {
    id: 'guide-3',
    title: 'Best Coffee Spots for a Slow Sunday Morning Crawl',
    subtitle: 'From manual pour-overs to flaky almond pastries, how to slow down time in Indiranagar.',
    author: 'Arjun Das',
    readTime: '3 min read',
    date: 'October 2026',
    city: 'Bengaluru',
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
    featuredVenueIds: ['tablescape-v1', 'tablescape-v4', 'tablescape-v6'],
    summary: 'Sunday mornings are sacred. Forget hurried drive-thrus; treat yourself to slow drippers, warm sourdough, and a great physical book.',
    content: [
      'Start at 8:30 AM before the neighborhood wakes up. The morning light on 12th Main Road is golden, filtering through ancient rain trees.',
      'Pair an iced pour-over with a warm pastry, settle into an outdoor patio, and leave your notifications on silent.'
    ]
  }
];
