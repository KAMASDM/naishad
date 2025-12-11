'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/ui/PropertyCard';
import SectionTitle from '@/components/ui/SectionTitle';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { api } from '@/lib/api';
import { PROPERTY_TYPES, BHK_TYPES, MUMBAI_AREAS } from '@/utils/constants';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    area: searchParams?.get('area') || '',
    propertyType: searchParams?.get('type') || '',
    bhk: searchParams?.get('bhk') || '',
    search: searchParams?.get('search') || '',
  });

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      
      // Fetch from Django backend with filters
      const data = await api.searchProperties(filters);
      setProperties(data.results || data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching properties:', err);
      
      // Fallback to mock data if API fails
      const mockProperties = [
        {
          id: 1,
          slug: 'luxury-3bhk-andheri',
          title: 'Luxury 3 BHK Apartment in Andheri West',
          location: 'Andheri West',
          area_name: 'Andheri',
          city_name: 'Mumbai',
          price: 25000000,
          bedrooms: 3,
          bathrooms: 3,
          sqft: 1450,
          property_type: 'apartment',
          primary_image: null,
        },
        {
          id: 2,
          slug: 'sea-view-penthouse-bandra',
          title: 'Sea View Penthouse in Bandra',
          location: 'Bandra West',
          area_name: 'Bandra',
          city_name: 'Mumbai',
          price: 85000000,
          bedrooms: 4,
          bathrooms: 4,
          sqft: 3200,
          property_type: 'penthouse',
          primary_image: null,
        },
      ];
      
      setProperties(mockProperties);
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      area: '',
      propertyType: '',
      bhk: '',
      search: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Browse Properties
            </h1>
            <p className="text-base md:text-lg text-blue-100">
              {properties.length} properties found
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Area Filter */}
              <select
                value={filters.area}
                onChange={(e) => handleFilterChange('area', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
              >
                <option value="">All Areas</option>
                {MUMBAI_AREAS.map((area) => (
                  <option key={area} value={area.toLowerCase()}>
                    {area}
                  </option>
                ))}
              </select>

              {/* Property Type Filter */}
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
              >
                <option value="">All Types</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              {/* BHK Filter */}
              <select
                value={filters.bhk}
                onChange={(e) => handleFilterChange('bhk', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
              >
                <option value="">All BHK</option>
                {BHK_TYPES.map((bhk) => (
                  <option key={bhk.value} value={bhk.value}>
                    {bhk.label}
                  </option>
                ))}
              </select>

              {/* Clear Filters */}
              <button
                onClick={handleClearFilters}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <LoadingSpinner />
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="w-24 h-24 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Properties Found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters to see more results
              </p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <PropertiesContent />
    </Suspense>
  );
}
