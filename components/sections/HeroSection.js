'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/properties?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold-900/90 via-gold-800/85 to-gold-900/90"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center bg-gold-700/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Mumbai's #1 Real Estate Platform
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Find Your Dream
            <br />
            <span className="text-gold-300 animate-pulse-slow">Property in Mumbai</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gold-100 mb-10 md:mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Discover premium apartments, villas, and penthouses across Mumbai's
            most sought-after locations. Your perfect home awaits.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8 md:mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="flex-1 relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location, property type, or BHK..."
                  className="w-full px-6 py-4 md:py-5 rounded-xl text-gray-900 placeholder-gray-500 bg-white border-2 border-gold-300 focus:outline-none focus:ring-4 focus:ring-gold-400 focus:border-gold-500 shadow-xl hover:shadow-2xl transition-all duration-300"
                />
                <svg
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gold-600 pointer-events-none group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Button
                type="submit"
                size="lg"
                className="sm:px-10 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/properties?type=apartment"
              className="px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-sm md:text-base font-medium border border-white/20 hover:border-gold-300"
            >
              🏢 Apartments
            </Link>
            <Link
              href="/properties?type=villa"
              className="px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-sm md:text-base font-medium border border-white/20 hover:border-gold-300"
            >
              🏡 Villas
            </Link>
            <Link
              href="/properties?type=penthouse"
              className="px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-sm md:text-base font-medium border border-white/20 hover:border-gold-300"
            >
              🌆 Penthouses
            </Link>
            <Link
              href="/properties?area=andheri"
              className="px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-sm md:text-base font-medium border border-white/20 hover:border-gold-300"
            >
              📍 Andheri
            </Link>
            <Link
              href="/properties?area=bandra"
              className="px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-sm md:text-base font-medium border border-white/20 hover:border-gold-300"
            >
              📍 Bandra
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center hover:scale-110 transition-transform duration-300">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 animate-count-up">
                500+
              </div>
              <div className="text-sm md:text-base text-gold-200">
                Properties Listed
              </div>
            </div>
            <div className="text-center border-x border-gold-700 hover:scale-110 transition-transform duration-300">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 animate-count-up">
                1000+
              </div>
              <div className="text-sm md:text-base text-gold-200">
                Happy Clients
              </div>
            </div>
            <div className="text-center hover:scale-110 transition-transform duration-300">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 animate-count-up">
                15+
              </div>
              <div className="text-sm md:text-base text-gold-200">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
