import { Hotel, NavItem } from '@/types';

// Mock Hotel Data
export const MOCK_HOTEL: Hotel = {
  id: 1,
  name: "Hotel Heaven",
  rating: 5,
  location: "Rangamati, Bangladesh",
  address: "Rangamati Hill District, Chattogram Division, Bangladesh",
  coordinates: {
    lat: 22.6533,
    lng: 92.2056
  },
  images: [
    "/hotel2.jpg",
    "/hotel3.jpg", 
    "/hotel.jpg",
    "/hotel.webp",
    "/hotel2.jpg",
    "/hotel3.jpg"
  ],
  facilities: [
    { icon: "🏠", name: "AC" },
    { icon: "📺", name: "TV" },
    { icon: "🏊", name: "Pool" },
    { icon: "📶", name: "Wifi" }
  ],
  rooms: [
    {
      id: 1,
      type: "Single Room",
      capacity: "2 Adults",
      images: [
        "/room.jpg",
        "/room2.jpg",
        "/room3.jpg",
        "/room4.jpg",
        "/room.jpg",
        "/room2.jpg"
      ],
      amenities: [
        { icon: "🏠", name: "AC" },
        { icon: "📺", name: "TV" },
        { icon: "🏊", name: "Pool" },
        { icon: "📶", name: "Wifi" },
        { icon: "🍳", name: "Free Breakfast" }
      ],
      pricing: {
        originalPrice: "3500",
        discountedPrice: "3200",
        discount: "10% OFF"
      },
      cancellation: "Free cancellation until 7/11 October",
      extraNote: "Extra bed Available"
    },
    {
      id: 2,
      type: "Double Room",
      capacity: "4 Adults",
      images: [
        "/room3.jpg",
        "/room4.jpg",
        "/room.jpg",
        "/room2.jpg",
        "/room3.jpg",
        "/room4.jpg"
      ],
      amenities: [
        { icon: "🏠", name: "AC" },
        { icon: "📺", name: "TV" },
        { icon: "🏊", name: "Pool" },
        { icon: "📶", name: "Wifi" },
        { icon: "🍳", name: "Free Breakfast" }
      ],
      pricing: {
        originalPrice: "4500",
        discountedPrice: "4200",
        discount: "30% OFF"
      },
      cancellation: "Free cancellation until 7/11 October",
      extraNote: "BDT 2100 for 1 night"
    }
  ],
  policy: {
    checkIn: "2:00 PM",
    checkOut: "12:00 PM"
  }
};

export const MOCK_HOTELS: Hotel[] = [
  MOCK_HOTEL,
  {
    ...MOCK_HOTEL,
    id: 2,
    name: "Hotel Hell",
    location: "Rangamati, Bangladesh",
    address: "Downtown Rangamati, Chattogram Division, Bangladesh",
    coordinates: {
      lat: 22.6585,
      lng: 92.2025
    },
    rating: 3,
    images: [
      "/hotel3.jpg",
      "/hotel2.jpg", 
      "/hotel.webp",
      "/hotel.jpg",
      "/hotel3.jpg",
      "/hotel2.jpg"
    ],
    rooms: [
      {
        ...MOCK_HOTEL.rooms[0],
        id: 21,
        pricing: {
          originalPrice: "2800",
          discountedPrice: "2500",
          discount: "30% OFF"
        }
      },
      {
        ...MOCK_HOTEL.rooms[1],
        id: 22,
        pricing: {
          originalPrice: "3500",
          discountedPrice: "2800",
          discount: "30% OFF"
        }
      }
    ]
  },
  {
    ...MOCK_HOTEL,
    id: 3,
    name: "Paradise Resort",
    location: "Cox's Bazar, Bangladesh",
    address: "Beach Road, Cox's Bazar, Chattogram Division, Bangladesh",
    coordinates: {
      lat: 21.4272,
      lng: 92.0058
    },
    rating: 4,
    images: [
      "/hotel.webp",
      "/hotel2.jpg", 
      "/hotel3.jpg",
      "/hotel.jpg",
      "/hotel.webp",
      "/hotel2.jpg"
    ],
    facilities: [
      { icon: "🏠", name: "AC" },
      { icon: "📺", name: "TV" },
      { icon: "🏊", name: "Swimming Pool" },
      { icon: "📶", name: "WiFi" },
      { icon: "🍳", name: "Breakfast" },
      { icon: "🚗", name: "Parking" }
    ],
    rooms: [
      {
        ...MOCK_HOTEL.rooms[0],
        id: 31,
        pricing: {
          originalPrice: "4000",
          discountedPrice: "3600",
          discount: "10% OFF"
        }
      }
    ]
  },
  {
    ...MOCK_HOTEL,
    id: 4,
    name: "Mountain View Lodge",
    location: "Bandarban, Bangladesh",
    address: "Bandarban Hill District, Chattogram Division, Bangladesh",
    coordinates: {
      lat: 22.1953,
      lng: 92.2183
    },
    rating: 4,
    images: [
      "/hotel.jpg",
      "/hotel3.jpg", 
      "/hotel2.jpg",
      "/hotel.webp",
      "/hotel.jpg",
      "/hotel3.jpg"
    ],
    facilities: [
      { icon: "🏠", name: "Non AC" },
      { icon: "📺", name: "TV" },
      { icon: "🍳", name: "Breakfast" },
      { icon: "🎯", name: "Resort" },
      { icon: "🐕", name: "Pet Allowed" }
    ],
    rooms: [
      {
        ...MOCK_HOTEL.rooms[0],
        id: 41,
        type: "Deluxe Room",
        pricing: {
          originalPrice: "5000",
          discountedPrice: "4500",
          discount: "10% OFF"
        }
      },
      {
        ...MOCK_HOTEL.rooms[1],
        id: 42,
        type: "Suite Room",
        capacity: "6 Adults",
        pricing: {
          originalPrice: "8000",
          discountedPrice: "7200",
          discount: "10% OFF"
        }
      }
    ]
  },
  {
    ...MOCK_HOTEL,
    id: 5,
    name: "Seaside Paradise",
    location: "Saint Martin, Bangladesh",
    address: "Saint Martin's Island, Cox's Bazar, Chattogram Division, Bangladesh",
    coordinates: {
      lat: 20.6077,
      lng: 92.3231
    },
    rating: 5,
    images: [
      "/hotel2.jpg",
      "/hotel.webp", 
      "/hotel3.jpg",
      "/hotel.jpg",
      "/hotel2.jpg",
      "/hotel.webp"
    ],
    facilities: [
      { icon: "🏠", name: "AC" },
      { icon: "📺", name: "TV" },
      { icon: "🏊", name: "Beach Access" },
      { icon: "📶", name: "WiFi" },
      { icon: "🍳", name: "All Meals" },
      { icon: "🚗", name: "Parking" },
      { icon: "🎯", name: "Spa" }
    ],
    rooms: [
      {
        ...MOCK_HOTEL.rooms[0],
        id: 51,
        type: "Ocean View Room",
        pricing: {
          originalPrice: "6000",
          discountedPrice: "5400",
          discount: "10% OFF"
        }
      }
    ]
  }
];

// Navigation Items for Customer Booking System
export const GUEST_NAV_ITEMS: NavItem[] = [
  { icon: "🏨", label: "Hotels", href: "/hotels" },
  { icon: "🚌", label: "Transport", href: "/transport" },
  { icon: "📦", label: "Package Tour", href: "/packages" },
  { icon: "🏠", label: "Become a Partner", href: "/hotel-partners" }
];

// Default Navigation Items (for backward compatibility)
export const NAV_ITEMS: NavItem[] = GUEST_NAV_ITEMS;

// Filter Categories
export const FILTER_CATEGORIES = [
  { icon: "🏠", label: "Homestays", value: "homestays" },
  { icon: "🏨", label: "Hotels & Hostels", value: "hotels" },
  { icon: "🎯", label: "Offers list", value: "offers" },
  { icon: "📋", label: "Others Categories", value: "others" }
] as const;

// App Configuration
export const APP_CONFIG = {
  name: "Amaghor",
  description: "Your trusted hotel booking platform",
  version: "2.0.0",
  currency: "BDT",
  defaultGuests: 2,
  maxGuests: 10,
  minGuests: 1
} as const;

// Color Scheme (Tailwind classes)
export const COLORS = {
  primary: "text-green-600 bg-green-600",
  secondary: "text-green-100 bg-green-100",
  accent: "text-green-50 bg-green-50",
  muted: "text-gray-500 bg-gray-100",
  destructive: "text-red-600 bg-red-600"
} as const;
