import { getCurrentPartnerFeatures } from '@/contexts/PartnerContext';

// PMS subscription tiers
export type SubscriptionTier = 'regular' | 'premium';

// Map of feature access based on subscription tier
export interface TierFeatures {
  dashboard: boolean;
  frontDesk: boolean;
  guest: boolean;
  rooms: boolean;
  rate: boolean;
  policy: boolean;
  feedback: boolean;
  calendar: boolean;
  inventory: boolean;
  revenue: boolean;
  accounts: boolean;
  employee: boolean;
  bookingData: boolean;
  taxManagement: boolean;
}

// Define which features are available in each tier
export const tierFeatures: Record<SubscriptionTier, TierFeatures> = {
  regular: {
    dashboard: true,     // Basic stats and overview
    frontDesk: true,     // Check-in/out management
    guest: true,         // Guest management
    rooms: true,         // Room management
    rate: true,          // Basic rate plans
    policy: true,        // Basic policies
    feedback: true,      // Basic feedback management
    calendar: true,      // Basic calendar view
    
    // Premium features - not available in regular tier
    inventory: false,    // Inventory management
    revenue: false,      // Revenue reports and analysis
    accounts: false,     // Financial management
    employee: false,     // Staff management
    bookingData: false,  // Advanced booking analytics
    taxManagement: false // Tax management
  },
  premium: {
    // All features available in premium tier
    dashboard: true,
    frontDesk: true,
    guest: true,
    rooms: true,
    rate: true,
    policy: true,
    feedback: true,
    calendar: true,
    inventory: true,
    revenue: true,
    accounts: true,
    employee: true,
    bookingData: true,
    taxManagement: true
  }
};

// Default to regular tier - in a real app, this would be fetched from the user's account
export const getCurrentSubscriptionTier = (): SubscriptionTier => {
  // This would typically be fetched from an API or context
  // For demo purposes, we'll return 'regular' by default
  // To test Premium features, change this to 'premium'
  return 'premium';
};

// Check if a feature is available in the current subscription tier
export const hasFeatureAccess = (feature: keyof TierFeatures, tier: SubscriptionTier): boolean => {
  // First check if the partner has this feature specifically enabled by admin
  const partnerFeatures = getCurrentPartnerFeatures();
  
  // Map tier features to partner features
  if (feature === 'revenue' && partnerFeatures.revenueAnalytics) {
    return true;
  }
  
  if (feature === 'accounts' && partnerFeatures.accounts) {
    return true;
  }
  
  if (feature === 'inventory' && partnerFeatures.inventoryManagement) {
    return true;
  }
  
  if (feature === 'employee' && partnerFeatures.employeeManagement) {
    return true;
  }
  
  if (feature === 'bookingData' && partnerFeatures.bookingData) {
    return true;
  }
  
  if (feature === 'taxManagement' && partnerFeatures.taxManagement) {
    return true;
  }
  
  // Fall back to regular subscription tier check
  return tierFeatures[tier][feature];
};
