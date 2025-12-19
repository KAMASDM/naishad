'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminDB } from '@/lib/firestore';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await adminDB.getAllServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await adminDB.deleteService(id);
      setServices(services.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-2">Manage your service offerings</p>
        </div>
        <Link
          href="/admin/services/new"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          + Add New Service
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">No services yet</p>
          <Link
            href="/admin/services/new"
            className="inline-block mt-4 text-purple-600 hover:text-purple-700"
          >
            Add your first service →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
              {service.image_url && (
                <img
                  src={service.image_url}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description?.substring(0, 100)}...</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    service.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {service.is_active ? 'Active' : 'Inactive'}
                </span>
                {service.featured && (
                  <span className="px-2 py-1 text-xs font-semibold rounded bg-purple-100 text-purple-800">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/admin/services/${service.id}`}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-center text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
