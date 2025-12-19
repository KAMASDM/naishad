'use client';

import ServiceForm from '@/components/admin/ServiceForm';

export default function NewServicePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Service</h1>
        <p className="text-gray-600 mt-2">Create a new service offering</p>
      </div>

      <ServiceForm />
    </div>
  );
}
