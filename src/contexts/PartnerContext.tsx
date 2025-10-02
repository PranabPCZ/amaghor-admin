'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PartnerFeatures {
  revenueAnalytics: boolean;
  accounts: boolean;
  inventoryManagement: boolean;
  employeeManagement: boolean;
  bookingData: boolean;
  taxManagement: boolean;
}

export interface PartnerContextType {
  currentPartnerId: string | null;
  partnerFeatures: PartnerFeatures | null;
  setCurrentPartner: (partnerId: string, features: PartnerFeatures) => void;
  hasPartnerFeature: (feature: keyof PartnerFeatures) => boolean;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

interface PartnerProviderProps {
  children: ReactNode;
}

export function PartnerProvider({ children }: PartnerProviderProps) {
  const [currentPartnerId, setCurrentPartnerId] = useState<string | null>(null);
  const [partnerFeatures, setPartnerFeatures] = useState<PartnerFeatures | null>(null);

  const setCurrentPartner = (partnerId: string, features: PartnerFeatures) => {
    setCurrentPartnerId(partnerId);
    setPartnerFeatures(features);
  };

  const hasPartnerFeature = (feature: keyof PartnerFeatures): boolean => {
    if (!partnerFeatures) return false;
    return partnerFeatures[feature];
  };

  return (
    <PartnerContext.Provider
      value={{
        currentPartnerId,
        partnerFeatures,
        setCurrentPartner,
        hasPartnerFeature,
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
}

export function usePartner() {
  const context = useContext(PartnerContext);
  if (context === undefined) {
    throw new Error('usePartner must be used within a PartnerProvider');
  }
  return context;
}

// Mock function to simulate getting current partner data
// In a real app, this would fetch from your API/database
export function getCurrentPartnerFeatures(): PartnerFeatures {
  // For demo purposes, let's simulate that partner ID "1" (Grand Palace Hotel) is the current user
  // This would typically be fetched from your backend based on the current user's partner ID
  const currentPartnerId = '1'; // This would come from auth/session
  
  // Check if we have admin-set features in localStorage (for testing)
  if (typeof window !== 'undefined') {
    const storedFeatures = localStorage.getItem(`partner_features_${currentPartnerId}`);
    if (storedFeatures) {
      try {
        return JSON.parse(storedFeatures);
      } catch {
        // Fall through to default
      }
    }
  }
  
  // Mock partner features - in production this would be an API call
  const partnerFeaturesMap: Record<string, PartnerFeatures> = {
    '1': {
      revenueAnalytics: false,
      accounts: false,
      inventoryManagement: false,
      employeeManagement: false,
      bookingData: false,
      taxManagement: false,
    },
    '2': {
      revenueAnalytics: true,
      accounts: false,
      inventoryManagement: true,
      employeeManagement: false,
      bookingData: true,
      taxManagement: false,
    },
    '3': {
      revenueAnalytics: false,
      accounts: false,
      inventoryManagement: false,
      employeeManagement: false,
      bookingData: false,
      taxManagement: false,
    },
    '4': {
      revenueAnalytics: false,
      accounts: true,
      inventoryManagement: false,
      employeeManagement: true,
      bookingData: false,
      taxManagement: true,
    },
    // Add other partners as needed
  };

  return partnerFeaturesMap[currentPartnerId] || {
    revenueAnalytics: false,
    accounts: false,
    inventoryManagement: false,
    employeeManagement: false,
    bookingData: false,
    taxManagement: false,
  };
}
