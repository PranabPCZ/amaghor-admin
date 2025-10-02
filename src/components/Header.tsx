'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProfileSidebar from './ProfileSidebar';
import { GUEST_NAV_ITEMS, APP_CONFIG } from '@/lib/constants';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  nonSticky?: boolean;
  hideSearch?: boolean;
  fullWidth?: boolean;
}

export default function Header({ nonSticky = false, hideSearch = false, fullWidth = false }: HeaderProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  return (
    <header className={`w-full bg-background border-b ${nonSticky ? '' : 'sticky top-0'} z-50`}>
      {/* Navigation Section */}
      <div className={`w-full ${fullWidth ? 'px-2 sm:px-4' : 'max-w-[95%] md:max-w-7xl mx-auto px-2 sm:px-4'} py-3`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image
                src="/logo.png"
                alt="Amaghor Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="text-lg md:text-2xl font-bold text-green-600">{APP_CONFIG.name}</span>
          </Link>

          {/* Desktop Navigation Items */}
          {/* <nav className="hidden md:flex items-center gap-6"> */}
            {/* Customer Navigation Only */}
            {/* {GUEST_NAV_ITEMS.map((item) => (
              <Link key={item.label} href={item.href || '#'}>
                <Button variant="ghost" className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav> */}

          {/* Mobile Menu Button & User Avatar */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="space-y-1">
                <div className={`w-5 h-0.5 bg-foreground transition-all ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}></div>
                <div className={`w-5 h-0.5 bg-foreground transition-all ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}></div>
                <div className={`w-5 h-0.5 bg-foreground transition-all ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}></div>
              </div>
            </button>

            {/* Authentication Section */}
            {session ? (
              /* Guest Authentication - Show Guest Profile */
              <button 
                onClick={() => setIsProfileOpen(true)}
                className="relative group"
              >
                <Avatar className="h-8 w-8 md:h-10 md:w-10 border-2 border-transparent group-hover:border-primary transition-all">
                  <AvatarImage src={session?.user?.image || '/user.svg'} alt={session?.user?.name || 'User'} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-background"></div>
              </button>
            ) : (
              /* No Authentication - Show Sign In/Up buttons */
              <div className="flex items-center gap-2">
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-green-600 hover:bg-green-700" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            {/* Customer Mobile Navigation */}
            <nav className="flex flex-col gap-2 pt-4">
              {GUEST_NAV_ITEMS.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href || '#'}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="flex items-center justify-start gap-3 w-full py-3 px-4 text-left">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Search Section - Hidden on hotel management pages and mobile */}
      {!hideSearch && (
        <div className="hidden md:block bg-muted/50 border-t">
          <div className={`w-full ${fullWidth ? 'px-2 sm:px-4' : 'max-w-[95%] md:max-w-7xl mx-auto px-2 sm:px-4'} py-4`}>
            <div className="flex flex-wrap items-end gap-4">
              {/* Destination */}
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  📍 Destination
                </label>
                <Input
                  placeholder="Where are you going?"
                  className="h-10 bg-background"
                />
              </div>

              {/* Check In */}
              <div className="min-w-[140px]">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  📅 Check In
                </label>
                <Input
                  type="date"
                  className="h-10 bg-background"
                />
              </div>

              {/* Check Out */}
              <div className="min-w-[140px]">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  📤 Check Out
                </label>
                <Input
                  type="date"
                  className="h-10 bg-background"
                />
              </div>

              {/* Guests */}
              <div className="min-w-[100px]">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  👥 Guests
                </label>
                <Input
                  type="number"
                  defaultValue={APP_CONFIG.defaultGuests}
                  min={APP_CONFIG.minGuests}
                  max={APP_CONFIG.maxGuests}
                  className="h-10 bg-background"
                />
              </div>

              {/* Search Button */}
              <div>
                <Button className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                  🔍 Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Profile Sidebar */}
      {session && (
        <ProfileSidebar 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)}
          user={session?.user}
        />
      )}
    </header>
  );
}
