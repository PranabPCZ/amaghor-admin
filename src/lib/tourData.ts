import { TourPackage } from '@/types/tour';

export const MOCK_TOUR_PACKAGES: TourPackage[] = [
  {
    id: 1,
    title: "Cox's Bazar Beach Paradise",
    slug: "coxs-bazar-beach-paradise",
    destination: "Cox's Bazar",
    duration: "3 Days 2 Nights",
    images: ["/hotel.webp", "/hotel2.jpg", "/hotel3.jpg"],
    price: {
      adult: 8500,
      child: 6500,
      infant: 2000
    },
    originalPrice: {
      adult: 10000,
      child: 7500,
      infant: 2500
    },
    discount: "15% OFF",
    rating: 4.8,
    totalReviews: 156,
    maxGuests: 30,
    minGuests: 2,
    category: "beach",
    highlights: [
      "World's longest natural sea beach",
      "Sunset at Laboni Beach",
      "Sea food dining experience",
      "Himchari National Park visit",
      "Inani Beach exploration"
    ],
    inclusions: [
      "2 nights accommodation in 3-star hotel",
      "All meals (breakfast, lunch, dinner)",
      "AC transport from Dhaka",
      "Professional tour guide",
      "All entry fees",
      "Boat ride at Maheshkhali"
    ],
    exclusions: [
      "Personal expenses",
      "Tips for guide/driver",
      "Travel insurance",
      "Extra activities not mentioned"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Beach Exploration",
        description: "Arrive in Cox's Bazar, check-in to hotel, and enjoy the evening at the beach",
        activities: ["Hotel check-in", "Laboni Beach visit", "Sunset viewing", "Beach walk"],
        meals: ["Lunch", "Dinner"],
        accommodation: "Hotel Sea Crown or similar",
        transport: "AC Bus from Dhaka"
      },
      {
        day: 2,
        title: "Full Day Sightseeing",
        description: "Explore Himchari, Inani Beach, and surrounding attractions",
        activities: ["Himchari National Park", "Inani Beach", "Maheshkhali Island", "Local market visit"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Hotel Sea Crown or similar",
        transport: "Local sightseeing vehicle"
      },
      {
        day: 3,
        title: "Departure",
        description: "Final beach time and departure back to Dhaka",
        activities: ["Morning beach walk", "Souvenir shopping", "Departure preparation"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Check-out",
        transport: "AC Bus to Dhaka"
      }
    ],
    accommodation: {
      type: "3-Star Hotel",
      name: "Hotel Sea Crown",
      rating: 4.2
    },
    meals: {
      breakfast: true,
      lunch: true,
      dinner: true
    },
    transport: {
      type: "AC Bus",
      included: true,
      details: "Round trip AC bus from Dhaka to Cox's Bazar"
    },
    guide: {
      included: true,
      language: ["Bengali", "English"]
    },
    cancellationPolicy: "Free cancellation up to 7 days before tour. 50% refund for 3-7 days, no refund within 3 days.",
    bookingDeadline: "3 days",
    status: "available",
    seasonality: {
      bestTime: "November to March",
      available: "Year round (except extreme weather)"
    },
    difficulty: "easy",
    tags: ["beach", "family-friendly", "photography", "seafood", "sunset"],
    location: {
      lat: 21.4272,
      lng: 92.0058,
      address: "Cox's Bazar, Chittagong Division, Bangladesh"
    }
  },
  {
    id: 2,
    title: "Sundarbans Mangrove Adventure",
    slug: "sundarbans-mangrove-adventure",
    destination: "Sundarbans",
    duration: "4 Days 3 Nights",
    images: ["/hotel3.jpg", "/hotel.webp", "/hotel2.jpg"],
    price: {
      adult: 12500,
      child: 9500,
      infant: 3000
    },
    originalPrice: {
      adult: 15000,
      child: 11000,
      infant: 3500
    },
    discount: "20% OFF",
    rating: 4.6,
    totalReviews: 89,
    maxGuests: 25,
    minGuests: 4,
    category: "wildlife",
    highlights: [
      "Royal Bengal Tiger spotting",
      "Mangrove forest exploration",
      "Boat safari experience",
      "Bird watching at Kotka",
      "Traditional fishing villages"
    ],
    inclusions: [
      "3 nights accommodation in forest lodge",
      "All meals during tour",
      "Boat transport & permits",
      "Experienced nature guide",
      "Forest department fees",
      "Life jackets & safety equipment"
    ],
    exclusions: [
      "Transport to/from Dhaka",
      "Personal expenses",
      "Camera fees",
      "Alcoholic beverages"
    ],
    itinerary: [
      {
        day: 1,
        title: "Journey to Sundarbans",
        description: "Travel from Dhaka to Mongla port and board the boat",
        activities: ["Travel to Mongla", "Boat boarding", "Initial briefing", "River cruise"],
        meals: ["Lunch", "Dinner"],
        accommodation: "Forest Lodge",
        transport: "Bus + Boat"
      },
      {
        day: 2,
        title: "Deep Forest Exploration",
        description: "Full day boat safari in the core areas of Sundarbans",
        activities: ["Tiger spotting", "Kotka beach visit", "Bird watching", "Mangrove study"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Forest Lodge",
        transport: "Safari boat"
      },
      {
        day: 3,
        title: "Village & Culture",
        description: "Visit local fishing villages and cultural sites",
        activities: ["Fishing village tour", "Local culture experience", "Honey collection demo", "Evening wildlife watch"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Forest Lodge",
        transport: "Boat"
      },
      {
        day: 4,
        title: "Return Journey",
        description: "Final wildlife spotting and return to Dhaka",
        activities: ["Morning bird watching", "Return journey", "Mongla port"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Check-out",
        transport: "Boat + Bus"
      }
    ],
    accommodation: {
      type: "Forest Lodge",
      name: "Sundarbans Forest Lodge",
      rating: 3.8
    },
    meals: {
      breakfast: true,
      lunch: true,
      dinner: true
    },
    transport: {
      type: "Boat Safari",
      included: true,
      details: "Traditional wooden boat with modern safety equipment"
    },
    guide: {
      included: true,
      language: ["Bengali", "English"]
    },
    cancellationPolicy: "Free cancellation up to 10 days. 30% refund for 5-10 days, no refund within 5 days.",
    bookingDeadline: "7 days",
    status: "limited",
    seasonality: {
      bestTime: "November to March",
      available: "October to April (closed during monsoon)"
    },
    difficulty: "moderate",
    tags: ["wildlife", "adventure", "photography", "nature", "tiger", "mangrove"],
    location: {
      lat: 22.3569,
      lng: 89.6406,
      address: "Sundarbans National Park, Khulna Division, Bangladesh"
    }
  },
  {
    id: 3,
    title: "Bandarban Hill Tracts Adventure",
    slug: "bandarban-hill-tracts-adventure",
    destination: "Bandarban",
    duration: "5 Days 4 Nights",
    images: ["/hotel2.jpg", "/hotel3.jpg", "/hotel.webp"],
    price: {
      adult: 15000,
      child: 11000,
      infant: 4000
    },
    rating: 4.9,
    totalReviews: 127,
    maxGuests: 20,
    minGuests: 6,
    category: "mountain",
    highlights: [
      "Nilgiri hilltop experience",
      "Boga Lake trekking",
      "Traditional tribal villages",
      "Nafakhum waterfall visit",
      "Cloud touching at Keokradong"
    ],
    inclusions: [
      "4 nights accommodation (resort + camping)",
      "All meals & snacks",
      "4WD transport for hills",
      "Professional trekking guide",
      "Camping equipment",
      "All permits & entry fees"
    ],
    exclusions: [
      "Transport from Dhaka",
      "Personal trekking gear",
      "Medical insurance",
      "Extra activities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Nilgiri",
        description: "Arrive in Bandarban and ascend to Nilgiri hilltop",
        activities: ["Bandarban arrival", "Nilgiri ascent", "Sunset viewing", "Local dinner"],
        meals: ["Lunch", "Dinner"],
        accommodation: "Nilgiri Resort",
        transport: "4WD vehicle"
      },
      {
        day: 2,
        title: "Boga Lake Trek",
        description: "Trek to the mysterious Boga Lake",
        activities: ["Early morning trek", "Boga Lake exploration", "Tribal village visit", "Camping setup"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Lakeside camping",
        transport: "Trekking"
      },
      {
        day: 3,
        title: "Nafakhum Waterfall",
        description: "Visit the spectacular Nafakhum waterfall",
        activities: ["Waterfall trekking", "Swimming", "Photography", "Local tribal culture"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Local guesthouse",
        transport: "Trekking + boat"
      },
      {
        day: 4,
        title: "Keokradong Peak",
        description: "Challenge the highest accessible peak",
        activities: ["Peak climbing", "Cloud forest experience", "360° views", "Cultural evening"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Mountain lodge",
        transport: "4WD + trekking"
      },
      {
        day: 5,
        title: "Return Journey",
        description: "Final sightseeing and departure",
        activities: ["Buddha Dhatu Jadi temple", "Local market", "Departure"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Check-out",
        transport: "4WD vehicle"
      }
    ],
    accommodation: {
      type: "Resort + Camping",
      name: "Mixed accommodation",
      rating: 4.1
    },
    meals: {
      breakfast: true,
      lunch: true,
      dinner: true
    },
    transport: {
      type: "4WD + Trekking",
      included: true,
      details: "4WD vehicles for hill roads, trekking for remote areas"
    },
    guide: {
      included: true,
      language: ["Bengali", "English", "Chakma"]
    },
    cancellationPolicy: "Free cancellation up to 15 days. 50% refund for 7-15 days, 25% refund within 7 days.",
    bookingDeadline: "10 days",
    status: "available",
    seasonality: {
      bestTime: "October to March",
      available: "October to May (avoid monsoon)"
    },
    difficulty: "challenging",
    tags: ["mountain", "trekking", "adventure", "tribal", "waterfall", "peak"],
    location: {
      lat: 22.1953,
      lng: 92.2183,
      address: "Bandarban Hill District, Chittagong Division, Bangladesh"
    }
  },
  {
    id: 4,
    title: "Sylhet Tea Garden & Spiritual Journey",
    slug: "sylhet-tea-garden-spiritual",
    destination: "Sylhet",
    duration: "3 Days 2 Nights",
    images: ["/hotel.webp", "/hotel3.jpg", "/hotel2.jpg"],
    price: {
      adult: 7500,
      child: 5500,
      infant: 2000
    },
    originalPrice: {
      adult: 9000,
      child: 6500,
      infant: 2500
    },
    discount: "15% OFF",
    rating: 4.7,
    totalReviews: 203,
    maxGuests: 30,
    minGuests: 2,
    category: "cultural",
    highlights: [
      "Srimangal tea gardens tour",
      "Hazrat Shah Jalal shrine visit",
      "Jaflong stone collection",
      "Ratargul swamp forest",
      "Traditional tea tasting"
    ],
    inclusions: [
      "2 nights 3-star hotel accommodation",
      "All meals & tea sessions",
      "AC transport throughout",
      "English/Bengali guide",
      "All entry fees",
      "Boat ride at Ratargul"
    ],
    exclusions: [
      "Travel insurance",
      "Personal shopping",
      "Extra beverages",
      "Optional activities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Spiritual Sylhet",
        description: "Explore the spiritual heritage of Sylhet",
        activities: ["Hazrat Shah Jalal shrine", "Hazrat Shah Paran shrine", "Keane Bridge", "City tour"],
        meals: ["Lunch", "Dinner"],
        accommodation: "Hotel Sylhet International",
        transport: "AC vehicle"
      },
      {
        day: 2,
        title: "Tea Garden Experience",
        description: "Full day at Srimangal tea gardens",
        activities: ["Tea garden tour", "Tea factory visit", "Tea tasting session", "Lawachara National Park"],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Tea resort in Srimangal",
        transport: "AC vehicle"
      },
      {
        day: 3,
        title: "Natural Wonders",
        description: "Explore Jaflong and Ratargul before departure",
        activities: ["Jaflong stone collection", "Ratargul swamp forest", "Boat ride", "Return journey"],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Check-out",
        transport: "AC vehicle + boat"
      }
    ],
    accommodation: {
      type: "3-Star Hotel",
      name: "Hotel Sylhet International",
      rating: 4.3
    },
    meals: {
      breakfast: true,
      lunch: true,
      dinner: true
    },
    transport: {
      type: "AC Vehicle",
      included: true,
      details: "Comfortable AC transport with experienced driver"
    },
    guide: {
      included: true,
      language: ["Bengali", "English"]
    },
    cancellationPolicy: "Free cancellation up to 5 days. 70% refund for 2-5 days, 30% refund within 2 days.",
    bookingDeadline: "2 days",
    status: "available",
    seasonality: {
      bestTime: "October to March",
      available: "Year round"
    },
    difficulty: "easy",
    tags: ["cultural", "spiritual", "tea", "nature", "family-friendly", "photography"],
    location: {
      lat: 24.8949,
      lng: 91.8687,
      address: "Sylhet Division, Bangladesh"
    }
  },
  {
    id: 5,
    title: "Old Dhaka Heritage Walk",
    slug: "old-dhaka-heritage-walk",
    destination: "Dhaka",
    duration: "1 Day",
    images: ["/hotel2.jpg", "/hotel.webp", "/hotel3.jpg"],
    price: {
      adult: 2500,
      child: 1500,
      infant: 500
    },
    rating: 4.4,
    totalReviews: 78,
    maxGuests: 25,
    minGuests: 5,
    category: "historical",
    highlights: [
      "Lalbagh Fort exploration",
      "Ahsan Manzil museum visit",
      "Sadarghat river port",
      "Traditional rickshaw ride",
      "Street food tasting tour"
    ],
    inclusions: [
      "Professional heritage guide",
      "All entry fees to monuments",
      "Traditional lunch at heritage restaurant",
      "Rickshaw ride experience",
      "Street food tasting",
      "Bottled water & snacks"
    ],
    exclusions: [
      "Hotel pickup/drop-off",
      "Personal shopping",
      "Additional meals",
      "Gratuities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Old Dhaka Heritage Experience",
        description: "Full day exploration of Old Dhaka's rich cultural heritage",
        activities: [
          "Morning: Lalbagh Fort & Ahsan Manzil",
          "Midday: Traditional lunch at heritage restaurant", 
          "Afternoon: Sadarghat river port & boat ride",
          "Evening: Shakhari Bazaar & rickshaw ride"
        ],
        meals: ["Traditional lunch", "Street food tasting"],
        accommodation: "Day tour - no accommodation",
        transport: "Walking + Rickshaw + Boat"
      }
    ],
    accommodation: {
      type: "Day Tour",
      name: "Not applicable",
      rating: 0
    },
    meals: {
      breakfast: false,
      lunch: true,
      dinner: false
    },
    transport: {
      type: "Walking Tour + Rickshaw",
      included: true,
      details: "Walking tour with traditional rickshaw experience"
    },
    guide: {
      included: true,
      language: ["Bengali", "English", "Hindi"]
    },
    cancellationPolicy: "Free cancellation up to 1 day before tour. 50% refund on same day cancellation.",
    bookingDeadline: "Same day booking available",
    status: "available",
    seasonality: {
      bestTime: "October to March",
      available: "Year round (indoor attractions available during rain)"
    },
    difficulty: "easy",
    tags: ["historical", "cultural", "walking", "food", "photography", "heritage"],
    location: {
      lat: 23.7104,
      lng: 90.4074,
      address: "Old Dhaka, Dhaka Division, Bangladesh"
    }
  }
];

export const TOUR_CATEGORIES = [
  { value: 'all', label: 'All Categories', icon: '🌟' },
  { value: 'beach', label: 'Beach & Coastal', icon: '🏖️' },
  { value: 'mountain', label: 'Mountain & Hills', icon: '🏔️' },
  { value: 'wildlife', label: 'Wildlife & Nature', icon: '🦎' },
  { value: 'cultural', label: 'Cultural & Heritage', icon: '🏛️' },
  { value: 'historical', label: 'Historical Sites', icon: '🏺' },
  { value: 'adventure', label: 'Adventure & Trekking', icon: '🥾' },
  { value: 'religious', label: 'Religious & Spiritual', icon: '🕌' },
  { value: 'family', label: 'Family Friendly', icon: '👨‍👩‍👧‍👦' },
  { value: 'honeymoon', label: 'Romantic & Honeymoon', icon: '💕' }
];

export const POPULAR_DESTINATIONS = [
  "Cox's Bazar",
  "Sundarbans", 
  "Bandarban",
  "Sylhet",
  "Rangamati",
  "Kuakata",
  "Saint Martin",
  "Srimangal",
  "Paharpur",
  "Dhaka"
];
