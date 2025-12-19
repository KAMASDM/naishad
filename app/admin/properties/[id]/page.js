'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PropertyForm from '@/components/admin/PropertyForm';
import { adminDB } from '@/lib/firestore';

export default function EditPropertyPage() {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [params.id]);

  const fetchProperty = async () => {
    try {
      const data = await adminDB.getAllProperties();
      const found = data.find(p => p.id === params.id);
      setProperty(found);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Property not found</h2>
        <a href="/admin/properties" className="text-gold-600 hover:text-gold-700 mt-4 inline-block">
          ← Back to Properties
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Property</h1>
        <p className="text-gray-600 mt-2">Update property details</p>
      </div>

      <PropertyForm property={property} isEdit={true} />
    </div>
  );
}
