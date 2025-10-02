'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { APP_CONFIG } from '@/lib/constants';
import { useState, useEffect } from 'react';

interface FooterProps {
  fullWidth?: boolean;
}

export default function Footer({ fullWidth = false }: FooterProps) {
  const [isPartnerAuthenticated, setIsPartnerAuthenticated] = useState(false);

  useEffect(() => {
    // Check if partner is authenticated
    const partnerAuth = localStorage.getItem('partnerAuth');
    if (partnerAuth) {
      try {
        const authData = JSON.parse(partnerAuth);
        const loginTime = authData.loginTime || 0;
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        const isValid = authData.isAuthenticated && (Date.now() - loginTime) < thirtyDaysInMs;
        
        if (isValid) {
          setIsPartnerAuthenticated(true);
        } else {
          localStorage.removeItem('partnerAuth');
        }
      } catch (error) {
        localStorage.removeItem('partnerAuth');
      }
    }
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-t overflow-hidden">
      {/* Unique Wave Pattern Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0fdf4" />
              <stop offset="50%" stopColor="#dcfce7" />
              <stop offset="100%" stopColor="#bbf7d0" />
            </linearGradient>
          </defs>
          <path d="M0,100 C200,50 400,150 600,100 C800,50 1000,150 1200,100 L1200,400 L0,400 Z" fill="url(#footerGradient)" />
          <path d="M0,150 C300,100 500,200 800,150 C900,120 1100,180 1200,150 L1200,400 L0,400 Z" fill="#16a34a" fillOpacity="0.1" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-6 left-6 w-4 h-4 bg-green-200 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
      <div className="absolute top-16 right-20 w-6 h-6 bg-green-300 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
      <div className="absolute top-32 left-1/4 w-3 h-3 bg-green-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>

      {/* Main Content */}
      <div className={`relative z-10 w-full ${fullWidth ? 'px-4' : 'max-w-7xl mx-auto px-4'} py-16`}>
        {/* Unique Circular Layout for Brand Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            {/* Circular Brand Container */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-white rounded-full shadow-2xl border-4 border-green-100"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Amaghor Logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </div>
              {/* Orbiting Elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                ৳
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-green-200">
                <span className="text-green-600 text-sm">🏠</span>
              </div>
              <div className="absolute top-1/2 left-0 transform -translate-x-4 -translate-y-1/2 w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
                ✈
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-3 sm:mb-4">{APP_CONFIG.name}</h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
              <span className="text-green-600 font-semibold block sm:inline">ভ্রমণ হোক নির্ভর, থাকার ঠিকানা আমাঘর!</span>
              <br className="hidden sm:block" />
              <span className="block sm:inline mt-1 sm:mt-0">Experience authentic Bangladeshi hospitality with our curated stays</span>
            </p>
          </div>
        </div>

        {/* Hexagonal Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {/* Destinations Hexagon */}
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-green-100 transform hover:rotate-1 hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  🗺️
                </div>
                <h3 className="text-xl font-bold text-green-700">Discover Bangladesh</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Dhaka', icon: '🏢', color: 'bg-blue-100 text-blue-700' },
                  { name: 'Cox\'s Bazar', icon: '🏖️', color: 'bg-orange-100 text-orange-700' },
                  { name: 'Sylhet', icon: '🌿', color: 'bg-green-100 text-green-700' },
                  { name: 'Rangamati', icon: '🏔️', color: 'bg-purple-100 text-purple-700' }
                ].map((dest, i) => (
                  <Link key={i} href={`/destinations/${dest.name.toLowerCase().replace(/['\s]/g, '-')}`} 
                        className="flex items-center p-2 rounded-xl hover:bg-green-50 transition-colors group">
                    <span className={`w-8 h-8 ${dest.color} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
                      {dest.icon}
                    </span>
                    <span className="font-medium text-gray-700 group-hover:text-green-600">{dest.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Services Hexagon */}
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100 transform hover:-rotate-1 hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-green-700">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                {(isPartnerAuthenticated ? [
                  { name: 'Become Partner', icon: '🤝', href: '/hotel-partners' }
                ] : [
                  { name: 'Find Hotels', icon: '🏨', href: '/hotels' },
                  { name: 'Book Transport', icon: '🚌', href: '/transport' },
                  { name: 'Tour Packages', icon: '📦', href: '/packages' },
                  { name: 'Become Partner', icon: '🤝', href: '/hotel-partners' }
                ]).map((service, i) => (
                  <Link key={i} href={service.href} 
                        className="flex items-center p-2 rounded-xl hover:bg-emerald-50 transition-colors group">
                    <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      {service.icon}
                    </span>
                    <span className="font-medium text-gray-700 group-hover:text-emerald-600">{service.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Hexagon */}
          <div className="relative md:col-span-2 lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-100 transform hover:rotate-1 hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  💬
                </div>
                <h3 className="text-xl font-bold text-green-700">Stay Connected</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <span className="text-teal-600">📍</span>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">Indira Road, Dhaka 1215</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <span className="text-teal-600">📞</span>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">+880 140 201 1605</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <span className="text-teal-600">✉️</span>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">info@amaghor.com</p>
                  </div>
                </div>
                {/* Social Links */}
                <div className="flex space-x-2 pt-2">
                  {[{ icon: '📘', color: 'bg-blue-500 hover:bg-blue-600' }, 
                    { icon: '📷', color: 'bg-pink-500 hover:bg-pink-600' }, 
                    { icon: '🐦', color: 'bg-sky-500 hover:bg-sky-600' }].map((social, i) => (
                    <a key={i} href="#" className={`w-10 h-10 ${social.color} rounded-xl text-white flex items-center justify-center transform hover:scale-110 transition-all shadow-lg`}>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unique Newsletter Section with Slanted Design */}
        <div className="relative mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 rounded-2xl md:rounded-3xl p-4 md:p-8 lg:p-12 transform md:-skew-y-1 shadow-2xl">
            <div className="transform md:skew-y-1">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">
                  🚀 Join the Amaghor Journey!
                </h3>
                <p className="text-green-100 text-sm md:text-base mb-4 md:mb-6 lg:mb-8 max-w-2xl mx-auto px-2">
                  Be first to know about exclusive deals, hidden gems, and travel secrets across Bangladesh
                </p>
                <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 px-2">
                  <input
                    type="email"
                    placeholder="Enter your adventure email..."
                    className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-white/90 backdrop-blur-sm border-0 rounded-xl md:rounded-2xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all text-sm md:text-base"
                    suppressHydrationWarning
                  />
                  <button 
                    className="px-6 md:px-8 py-3 md:py-4 bg-white text-green-600 rounded-xl md:rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-sm md:text-base whitespace-nowrap"
                    suppressHydrationWarning
                  >
                    🎯 Subscribe
                  </button>
                </div>
                <p className="text-green-200 text-xs md:text-sm mt-2 md:mt-3">
                  ✨ 10,000+ travelers already joined our community!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unique Curved Bottom Section */}
      <div className="relative mt-8">
        {/* Curved separator */}
        <svg className="w-full h-16" viewBox="0 0 1200 64" preserveAspectRatio="none">
          <path d="M0,0 C300,32 900,32 1200,0 L1200,64 L0,64 Z" fill="#ffffff" />
        </svg>
        
        {/* Bottom content */}
        <div className="bg-white pt-0 pb-8">
          <div className={`w-full ${fullWidth ? 'px-4' : 'max-w-7xl mx-auto px-4'}`}>
            {/* Unique zigzag pattern */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 transform rotate-45"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-4 h-4 bg-green-600 transform rotate-45"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 transform rotate-45"></div>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <div className="flex justify-center items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                  <span className="text-green-600">🏆</span>
                  <span className="text-sm font-medium text-green-700">Bangladesh&apos;s #1 Travel Platform</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                  <span className="text-green-600">🔒</span>
                  <span className="text-sm font-medium text-green-700">SSL Secured Payments</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                  <span className="text-green-600">👥</span>
                  <span className="text-sm font-medium text-green-700">50k+ Happy Travelers</span>
                </div>
              </div>
              
              <div className="border-t border-green-100 pt-6">
                <p className="text-gray-600 text-sm">
                  © 2024 <span className="font-bold text-green-700">{APP_CONFIG.name}</span> - Crafted with ❤️ in the heart of Bangladesh
                </p>
                <div className="flex flex-wrap justify-center items-center gap-4 mt-3">
                  <span className="text-gray-500 text-xs">🌟 Licensed Travel Partner</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 text-xs">📧 ISO 27001 Certified</span>
                  <span className="text-gray-400">•</span>
                  <Link href="/privacy-policy" className="text-gray-500 text-xs hover:text-green-600 transition-colors">
                    📜 Privacy Policy
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/terms-conditions" className="text-gray-500 text-xs hover:text-green-600 transition-colors">
                    📋 Terms & Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
