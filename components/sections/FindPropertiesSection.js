'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { PROPERTY_TYPES, BHK_TYPES, BUDGET_RANGES, AREA_RANGES, MUMBAI_AREAS } from '@/utils/constants';

export default function FindPropertiesSection() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    area: '',
    propertyType: '',
    bhk: '',
    budget: '',
    sqft: '',
  });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    // Build query string
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    router.push(`/properties?${queryParams.toString()}`);
  };

  const handleReset = () => {
    setFilters({
      area: '',
      propertyType: '',
      bhk: '',
      budget: '',
      sqft: '',
    });
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="animate-fade-in-up">
          <SectionTitle
            subtitle="Advanced Search"
            title="Find Your Perfect Property"
            centered
          />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Filters Card */}
          <div className="bg-gradient-to-br from-gold-50 to-white p-6 md:p-8 rounded-2xl shadow-xl border border-gold-100 hover:shadow-2xl transition-shadow duration-500 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Area Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📍 Location / Area
                </label>
                <select
                  value={filters.area}
                  onChange={(e) => handleFilterChange('area', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="">Select Area</option>
                  {MUMBAI_AREAS.map((area) => (
                    <option key={area} value={area.toLowerCase()}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🏠 Property Type
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="">Select Type</option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* BHK Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🛏️ BHK
                </label>
                <select
                  value={filters.bhk}
                  onChange={(e) => handleFilterChange('bhk', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="">Select BHK</option>
                  {BHK_TYPES.map((bhk) => (
                    <option key={bhk.value} value={bhk.value}>
                      {bhk.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💰 Budget Range
                </label>
                <select
                  value={filters.budget}
                  onChange={(e) => handleFilterChange('budget', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="">Select Budget</option>
                  {BUDGET_RANGES.map((budget) => (
                    <option key={budget.value} value={budget.value}>
                      {budget.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area/Sqft Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📐 Area (sq.ft)
                </label>
                <select
                  value={filters.sqft}
                  onChange={(e) => handleFilterChange('sqft', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white text-gray-900"
                >
                  <option value="">Select Area</option>
                  {AREA_RANGES.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-end gap-3">
                <Button
                  onClick={handleSearch}
                  fullWidth
                  className="flex-1"
                >
                  <svg
                    className="inline-block w-5 h-5 mr-2"
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
                  Search
                </Button>
                <button
                  onClick={handleReset}
                  className="px-4 py-3 text-gray-700 hover:text-gold-600 transition-colors"
                  title="Reset Filters"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                🔥 Popular Searches:
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setFilters({ area: 'bandra', propertyType: '', bhk: '2', budget: '', sqft: '' });
                  }}
                  className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gold-50 hover:text-gold-600 border border-gray-200 transition-colors"
                >
                  2 BHK in Bandra
                </button>
                <button
                  onClick={() => {
                    setFilters({ area: 'andheri', propertyType: '', bhk: '3', budget: '', sqft: '' });
                  }}
                  className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gold-50 hover:text-gold-600 border border-gray-200 transition-colors"
                >
                  3 BHK in Andheri
                </button>
                <button
                  onClick={() => {
                    setFilters({ area: '', propertyType: 'villa', bhk: '', budget: '', sqft: '' });
                  }}
                  className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gold-50 hover:text-gold-600 border border-gray-200 transition-colors"
                >
                  Luxury Villas
                </button>
                <button
                  onClick={() => {
                    setFilters({ area: 'worli', propertyType: 'penthouse', bhk: '', budget: '', sqft: '' });
                  }}
                  className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gold-50 hover:text-gold-600 border border-gray-200 transition-colors"
                >
                  Penthouses in Worli
                </button>
                <button
                  onClick={() => {
                    setFilters({ area: '', propertyType: '', bhk: '', budget: '0-5000000', sqft: '' });
                  }}
                  className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gold-50 hover:text-gold-600 border border-gray-200 transition-colors"
                >
                  Under ₹50 Lakhs
                </button>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gold-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Verified Listings
              </h3>
              <p className="text-sm text-gray-600">
                All properties are verified and authenticated by our team
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gold-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Best Prices
              </h3>
              <p className="text-sm text-gray-600">
                Competitive pricing with no hidden charges or fees
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gold-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Expert Support
              </h3>
              <p className="text-sm text-gray-600">
                24/7 dedicated support to help you find your dream home
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
