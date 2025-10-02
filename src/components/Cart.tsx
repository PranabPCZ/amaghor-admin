'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CartProps } from '@/types';
import { APP_CONFIG } from '@/lib/constants';
import { getTaxBreakdown } from '@/lib/services/taxService';
import { formatCurrencyWithTax } from '@/lib/utils/tax';
import type { BookingTaxCalculation } from '@/lib/types/tax';

interface TaxBreakdown {
  subtotal: number;
  taxes: Array<{
    name: string;
    type: string;
    amount: number;
    rate: number | string;
    description?: string;
  }>;
  totalTax: number;
  total: number;
}

export default function Cart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  checkInDate,
  checkOutDate,
  guestCount,
  onDateChange,
  onGuestChange,
}: CartProps) {
  const [taxBreakdown, setTaxBreakdown] = useState<TaxBreakdown | null>(null);
  const [isCalculatingTax, setIsCalculatingTax] = useState(false);
  const [showTaxDetails, setShowTaxDetails] = useState(false);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseInt(item.pricing.discountedPrice) * item.quantity);
    }, 0);
  };

  const calculateNights = (): number => {
    if (!checkInDate || !checkOutDate) return 1;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  // Calculate taxes when booking details change
  useEffect(() => {
    const calculateTaxes = async () => {
      if (cartItems.length === 0 || !checkInDate || !checkOutDate) {
        setTaxBreakdown(null);
        return;
      }

      setIsCalculatingTax(true);
      try {
        const subtotal = calculateSubtotal() * calculateNights();
        const nights = calculateNights();
        
        const result = await getTaxBreakdown({
          subtotal,
          nights,
          guests: guestCount,
          roomType: cartItems[0]?.type || 'Standard Room',
          services: ['accommodation'],
          location: 'Dhaka', // Default location - could be made dynamic
          guestType: 'leisure',
          checkIn: checkInDate,
          checkOut: checkOutDate
        });

        if (result.success && result.breakdown) {
          setTaxBreakdown(result.breakdown);
        } else {
          console.error('Tax calculation failed:', result.errors);
          setTaxBreakdown(null);
        }
      } catch (error) {
        console.error('Tax calculation error:', error);
        setTaxBreakdown(null);
      } finally {
        setIsCalculatingTax(false);
      }
    };

    const debounceTimer = setTimeout(calculateTaxes, 300);
    return () => clearTimeout(debounceTimer);
  }, [cartItems, checkInDate, checkOutDate, guestCount]);

  const getFinalTotal = (): number => {
    if (taxBreakdown) {
      return taxBreakdown.total;
    }
    return calculateSubtotal() * calculateNights();
  };

  const handleBookNow = () => {
    if (cartItems.length === 0) {
      alert('Please add rooms to cart first');
      return;
    }
    
    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    const bookingDetails = {
      rooms: cartItems,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guestCount,
      nights: calculateNights(),
      subtotal: calculateSubtotal() * calculateNights(),
      taxes: taxBreakdown?.taxes || [],
      totalTax: taxBreakdown?.totalTax || 0,
      finalTotal: getFinalTotal()
    };
    
    console.log('Booking details with tax:', bookingDetails);
    
    const totalAmount = getFinalTotal();
    alert(`Booking confirmed! Total: ${APP_CONFIG.currency}${totalAmount.toLocaleString()} (including taxes)`);
  };

  return (
    <div className="sticky top-4 md:top-5 w-full lg:w-80 h-fit z-40">
      <Card className="shadow-lg">
        <CardHeader className="pb-3 md:pb-4 px-3 md:px-6 py-3 md:py-6">
          <CardTitle className="text-center text-base md:text-lg">Booking Summary</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3 md:space-y-4 px-3 md:px-6 pb-3 md:pb-6">
          {/* Booking Details */}
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-card border rounded-lg">
              <span className="text-base md:text-lg text-primary">📅</span>
              <div className="flex-1 space-y-1 min-w-0">
                <span className="text-xs text-muted-foreground font-medium">Check In</span>
                <Input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => onDateChange('checkIn', e.target.value)}
                  className="border-none bg-transparent text-sm font-medium p-0 h-auto"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-card border rounded-lg">
              <span className="text-base md:text-lg text-primary">📅</span>
              <div className="flex-1 space-y-1 min-w-0">
                <span className="text-xs text-muted-foreground font-medium">Check Out</span>
                <Input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => onDateChange('checkOut', e.target.value)}
                  className="border-none bg-transparent text-sm font-medium p-0 h-auto"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-card border rounded-lg">
              <span className="text-base md:text-lg text-primary">👥</span>
              <div className="flex-1 space-y-1 min-w-0">
                <span className="text-xs text-muted-foreground font-medium">Guests</span>
                <Input
                  type="number"
                  min={APP_CONFIG.minGuests}
                  max={APP_CONFIG.maxGuests}
                  value={guestCount}
                  onChange={(e) => onGuestChange(parseInt(e.target.value))}
                  className="border-none bg-transparent text-sm font-medium p-0 h-auto w-12 md:w-16"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Cart Items */}
          <div className="space-y-2 md:space-y-3">
            <h4 className="font-medium text-sm md:text-base">Selected Rooms</h4>
            <div className="bg-card rounded-lg max-h-48 overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-4 md:py-5">
                  No rooms selected
                </p>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 md:p-4 border-b last:border-b-0 gap-2">
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-semibold truncate">{item.type}</h5>
                      <p className="text-xs text-muted-foreground">
                        {APP_CONFIG.currency} {item.pricing.discountedPrice}/night
                      </p>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-5 w-5 md:h-6 md:w-6 p-0 rounded-full text-xs"
                        onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                      >
                        −
                      </Button>
                      <span className="text-xs md:text-sm font-semibold min-w-[16px] md:min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-5 w-5 md:h-6 md:w-6 p-0 rounded-full text-xs"
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-5 w-5 md:h-6 md:w-6 p-0 rounded-full ml-1 text-xs"
                        onClick={() => onRemoveItem(index)}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <Separator />

          {/* Pricing Breakdown */}
          {cartItems.length > 0 && (
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({calculateNights()} night{calculateNights() > 1 ? 's' : ''})</span>
                <span>{APP_CONFIG.currency}{(calculateSubtotal() * calculateNights()).toLocaleString()}</span>
              </div>
              
              {/* Tax Breakdown */}
              {taxBreakdown && taxBreakdown.taxes.length > 0 && (
                <>
                  <div className="space-y-1">
                    {taxBreakdown.taxes.map((tax, index) => (
                      <div key={index} className="flex justify-between items-center text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span>{tax.name}</span>
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            {tax.rate}
                          </Badge>
                          {tax.description && (
                            <span className="text-xs">• {tax.description}</span>
                          )}
                        </div>
                        <span>+{APP_CONFIG.currency}{tax.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total Tax</span>
                    <span>{APP_CONFIG.currency}{taxBreakdown.totalTax.toLocaleString()}</span>
                  </div>
                </>
              )}
              
              {isCalculatingTax && (
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Calculating taxes...</span>
                  <div className="animate-pulse">⏳</div>
                </div>
              )}
              
              <Separator />
              
              {/* Final Total */}
              <div className="flex justify-between items-center">
                <span className="text-base md:text-lg font-bold text-primary">
                  Final Total
                </span>
                <div className="text-right">
                  <div className="text-base md:text-lg font-bold text-primary">
                    {APP_CONFIG.currency}{getFinalTotal().toLocaleString()}
                  </div>
                  {taxBreakdown && taxBreakdown.totalTax > 0 && (
                    <div className="text-xs text-muted-foreground">
                      (incl. {APP_CONFIG.currency}{taxBreakdown.totalTax.toLocaleString()} tax)
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center text-xs text-muted-foreground">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} room(s) • {calculateNights()} night{calculateNights() > 1 ? 's' : ''} • {guestCount} guest{guestCount > 1 ? 's' : ''}
              </div>
            </div>
          )}
          
          {cartItems.length === 0 && (
            <div className="text-center">
              <div className="text-lg md:text-xl font-bold text-primary mb-1">
                Total: {APP_CONFIG.currency}0
              </div>
              <p className="text-xs text-muted-foreground">
                Add rooms to see pricing
              </p>
            </div>
          )}

          {/* Tax Information */}
          {cartItems.length > 0 && taxBreakdown && taxBreakdown.taxes.length > 0 && (
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-primary"
                onClick={() => setShowTaxDetails(!showTaxDetails)}
              >
                {showTaxDetails ? '▲' : '▼'} Tax Details
              </Button>
              
              {showTaxDetails && (
                <div className="mt-2 p-3 bg-muted/50 rounded-lg text-xs space-y-2">
                  <div className="font-medium">Tax Breakdown:</div>
                  {taxBreakdown.taxes.map((tax, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{tax.name} ({tax.type})</span>
                      <span>{APP_CONFIG.currency}{tax.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total Taxes</span>
                    <span>{APP_CONFIG.currency}{taxBreakdown.totalTax.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Taxes are calculated based on current rates and may vary.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Book Now Button */}
          <Button
            className="w-full shadow-lg text-sm md:text-base"
            size="lg"
            onClick={handleBookNow}
            disabled={cartItems.length === 0 || isCalculatingTax}
          >
            {isCalculatingTax ? 'Calculating...' : `Book Now - ${APP_CONFIG.currency}${getFinalTotal().toLocaleString()}`}
          </Button>
          
          {/* Secure booking notice */}
          <div className="text-center text-xs text-muted-foreground space-y-1">
            <div className="flex items-center justify-center gap-4">
              <span>🔒 Secure booking</span>
              <span>✅ Best rate guaranteed</span>
            </div>
            <div>💳 Pay at hotel or online</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
