'use client';

import { use, useEffect, useState } from 'react';
import { adminDB } from '@/lib/firestore';
import ServiceForm from '@/components/admin/ServiceForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function EditServicePage({ params }) {
  const { id } = use(params);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      try {
        const data = await adminDB.getServiceById(id);
        setService(data);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Not Found</h2>
        <p className="text-gray-600">The requested service could not be found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Service</h1>
        <p className="text-gray-600 mt-2">Update service information</p>
      </div>

      <ServiceForm service={service} isEdit={true} />
    </div>
  );
}
