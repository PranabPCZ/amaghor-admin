'use client';

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface User {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role: string;
}

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export default function ProfileSidebar({ isOpen, onClose, user }: ProfileSidebarProps) {
  // Mock stats - in real app this would come from user data
  const userStats = {
    bookings: 12,
    wishlist: 8,
    reviews: 5,
    tier: "Gold Member"
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-80 bg-background shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-border">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="flex justify-end items-start mb-4">
            <button 
              onClick={onClose}
              className="text-white hover:text-green-100 transition-colors p-1 rounded-full hover:bg-white/10"
              aria-label="Close sidebar"
            >
              <span className="text-xl font-bold">✕</span>
            </button>
          </div>
          
          {/* User Info */}
          <div className="text-center">
            <Avatar className="w-16 h-16 mx-auto mb-3 border-2 border-white">
              <AvatarImage src={user.image || '/user.svg'} alt={user.name || 'User'} />
              <AvatarFallback className="bg-green-500 text-white text-lg">
                {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-white">{user.name || 'User'}</h2>
            <p className="text-green-100 text-sm">{user.email}</p>
            <Badge className="mt-2 bg-yellow-500 text-yellow-900 border-yellow-400">
              {userStats.tier}
            </Badge>
          </div>
        </div>

        {/* User Stats */}
        <div className="p-4 bg-muted">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{userStats.bookings}</div>
              <div className="text-xs text-muted-foreground">Bookings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{userStats.wishlist}</div>
              <div className="text-xs text-muted-foreground">Wishlist</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{userStats.reviews}</div>
              <div className="text-xs text-muted-foreground">Reviews</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 bg-background">
          <nav className="space-y-2">
            {/* Profile Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-3">ACCOUNT</h3>
              <div className="space-y-1">
                <Link href="/profile" className="flex items-center gap-3 p-4 mx-2 rounded-lg hover:bg-accent transition-colors text-foreground hover:text-accent-foreground min-h-[48px]" onClick={onClose}>
                  <span className="text-lg">👤</span>
                  <span className="font-medium">Profile Settings</span>
                </Link>
                <Link href="/profile/personal" className="flex items-center gap-3 p-4 mx-2 rounded-lg hover:bg-accent transition-colors text-foreground hover:text-accent-foreground min-h-[48px]" onClick={onClose}>
                  <span className="text-lg">📝</span>
                  <span className="font-medium">Personal Details</span>
                </Link>
                <Link href="/profile/preferences" className="flex items-center gap-3 p-4 mx-2 rounded-lg hover:bg-accent transition-colors text-foreground hover:text-accent-foreground min-h-[48px]" onClick={onClose}>
                  <span className="text-lg">⚙️</span>
                  <span className="font-medium">Preferences</span>
                </Link>
                <Link href="/profile/security" className="flex items-center gap-3 p-4 mx-2 rounded-lg hover:bg-accent transition-colors text-foreground hover:text-accent-foreground min-h-[48px]" onClick={onClose}>
                  <span className="text-lg">🔒</span>
                  <span className="font-medium">Security</span>
                </Link>
              </div>
            </div>

            {/* Booking Section */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Bookings</h3>
              <div className="space-y-1">
                <Link href="/bookings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-foreground hover:text-accent-foreground" onClick={onClose}>
                  <span className="text-lg">📅</span>
                  <span className="font-medium">My Bookings</span>
                  <Badge variant="secondary" className="ml-auto">{userStats.bookings}</Badge>
                </Link>
                <Link href="/bookings/upcoming" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={onClose}>
                  <span className="text-lg">🔜</span>
                  <span className="font-medium">Upcoming Trips</span>
                </Link>
                <Link href="/bookings/history" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={onClose}>
                  <span className="text-lg">📜</span>
                  <span className="font-medium">Booking History</span>
                </Link>
                <Link href="/cancellations" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={onClose}>
                  <span className="text-lg">❌</span>
                  <span className="font-medium">Cancellations</span>
                </Link>
              </div>
            </div>

            {/* Favorites Section */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Favorites</h3>
              <div className="space-y-1">
                <Link href="/wishlist" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={onClose}>
                  <span className="text-lg">❤️</span>
                  <span className="font-medium">Wishlist</span>
                  <Badge variant="secondary" className="ml-auto">{userStats.wishlist}</Badge>
                </Link>
                <Link href="/reviews" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={onClose}>
                  <span className="text-lg">⭐</span>
                  <span className="font-medium">My Reviews</span>
                  <Badge variant="secondary" className="ml-auto">{userStats.reviews}</Badge>
                </Link>
                <Link href="/recommendations" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={onClose}>
                  <span className="text-lg">💡</span>
                  <span className="font-medium">Recommendations</span>
                </Link>
              </div>
            </div>

            {/* Payment Section */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Payment</h3>
              <div className="space-y-1">
                <Link href="/payment-methods" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={onClose}>
                  <span className="text-lg">💳</span>
                  <span className="font-medium">Payment Methods</span>
                </Link>
                <Link href="/wallet" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={onClose}>
                  <span className="text-lg">💰</span>
                  <span className="font-medium">Wallet</span>
                </Link>
                <Link href="/transactions" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={onClose}>
                  <span className="text-lg">📊</span>
                  <span className="font-medium">Transaction History</span>
                </Link>
              </div>
            </div>

            {/* Support Section */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Support</h3>
              <div className="space-y-1">
                <Link href="/help" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={onClose}>
                  <span className="text-lg">❓</span>
                  <span className="font-medium">Help Center</span>
                </Link>
                <Link href="/contact" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={onClose}>
                  <span className="text-lg">📞</span>
                  <span className="font-medium">Contact Support</span>
                </Link>
                <Link href="/feedback" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={onClose}>
                  <span className="text-lg">💬</span>
                  <span className="font-medium">Send Feedback</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-border bg-muted mt-auto">
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <span className="text-lg">🚺</span>
              <span>Sign Out</span>
            </Button>
            
            {user.role === 'owner' && (
              <Link href="/my-properties" className="block">
                <Button variant="default" className="w-full justify-start gap-3 mt-2 bg-green-600 hover:bg-green-700" onClick={onClose}>
                  <span className="text-lg">🏨</span>
                  <span>My Properties</span>
                </Button>
              </Link>
            )}
            
            {user.role === 'admin' && (
              <Link href="/admin" className="block">
                <Button variant="default" className="w-full justify-start gap-3 mt-2 bg-blue-600 hover:bg-blue-700" onClick={onClose}>
                  <span className="text-lg">⚡</span>
                  <span>Admin Panel</span>
                </Button>
              </Link>
            )}
          </div>
          
          <div className="text-center mt-4 text-xs text-muted-foreground">
            Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </div>
        </div>
      </div>
    </>
  );
}
