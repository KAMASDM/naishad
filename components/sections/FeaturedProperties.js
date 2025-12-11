'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/ui/PropertyCard';
import SectionTitle from '@/components/ui/SectionTitle';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import { api } from '@/lib/api';

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      // Fetch from Django backend
      const data = await api.getFeaturedProperties();
      setProperties(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching featured properties:', err);
      // Fallback to mock data if API fails
      const mockProperties = [
        {
          id: 1,
          slug: 'luxury-3bhk-andheri',
          title: 'Luxury 3 BHK Apartment in Andheri West',
          location: 'Andheri West',
          area: 'Andheri',
          city: 'Mumbai',
          price: 25000000,
          bedrooms: 3,
          bathrooms: 3,
          sqft: 1450,
          propertyType: 'Apartment',
          image: null,
          featured: true,
        },
        {
          id: 2,
          slug: 'sea-view-penthouse-bandra',
          title: 'Sea View Penthouse in Bandra',
          location: 'Bandra West',
          area: 'Bandra',
          city: 'Mumbai',
          price: 85000000,
          bedrooms: 4,
          bathrooms: 4,
          sqft: 3200,
          propertyType: 'Penthouse',
          image: null,
          featured: true,
        },
        {
          id: 3,
          slug: 'modern-villa-juhu',
          title: 'Modern Villa in Juhu',
          location: 'Juhu',
          area: 'Juhu',
          city: 'Mumbai',
          price: 120000000,
          bedrooms: 5,
          bathrooms: 5,
          sqft: 4500,
          propertyType: 'Villa',
          image: null,
          featured: true,
        },
        {
          id: 4,
          slug: 'spacious-2bhk-powai',
          title: 'Spacious 2 BHK in Powai',
          location: 'Powai',
          area: 'Powai',
          city: 'Mumbai',
          price: 18000000,
          bedrooms: 2,
          bathrooms: 2,
          sqft: 1150,
          propertyType: 'Apartment',
          image: null,
          featured: true,
        },
        {
          id: 5,
          slug: 'premium-4bhk-worli',
          title: 'Premium 4 BHK in Worli',
          location: 'Worli',
          area: 'Worli',
          city: 'Mumbai',
          price: 65000000,
          bedrooms: 4,
          bathrooms: 4,
          sqft: 2800,
          propertyType: 'Apartment',
          image: null,
          featured: true,
        },
        {
          id: 6,
          slug: 'cozy-1bhk-malad',
          title: 'Cozy 1 BHK in Malad East',
          location: 'Malad East',
          area: 'Malad',
          city: 'Mumbai',
          price: 8500000,
          bedrooms: 1,
          bathrooms: 1,
          sqft: 650,
          propertyType: 'Apartment',
          image: null,
          featured: true,
        },
      ];

      setProperties(mockProperties);
      setError('Using mock data - Backend API unavailable');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="Handpicked for You"
          title="Featured Properties"
          centered
        />

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/properties">
            <Button size="lg" className="shadow-lg">
              View All Properties
              <svg
                className="inline-block ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
