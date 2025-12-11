'use client';

import { useEffect, useState } from 'react';
import { adminDB } from '@/lib/firestore';

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const data = await adminDB.getAllEnquiries();
      setEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await adminDB.markEnquiryAsRead(id);
      setEnquiries(prev =>
        prev.map(e => e.id === id ? { ...e, is_read: true } : e)
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      await adminDB.deleteEnquiry(id);
      setEnquiries(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      alert('Failed to delete enquiry');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Enquiries</h1>
        <p className="text-gray-600 mt-2">
          {enquiries.filter(e => !e.is_read).length} unread enquiries
        </p>
      </div>

      {enquiries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">No enquiries yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className={`bg-white rounded-lg shadow-md p-6 ${
                !enquiry.is_read ? 'border-l-4 border-blue-600' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{enquiry.name}</h3>
                  <p className="text-sm text-gray-600">{formatDate(enquiry.created_at)}</p>
                </div>
                {!enquiry.is_read && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                    NEW
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600">Email:</span>
                  <p className="font-medium">{enquiry.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Phone:</span>
                  <p className="font-medium">{enquiry.phone || '-'}</p>
                </div>
                {enquiry.property_interest && (
                  <div className="md:col-span-2">
                    <span className="text-sm text-gray-600">Property Interest:</span>
                    <p className="font-medium">{enquiry.property_interest}</p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <span className="text-sm text-gray-600">Message:</span>
                <p className="mt-1 text-gray-900">{enquiry.message}</p>
              </div>

              <div className="flex gap-2">
                {!enquiry.is_read && (
                  <button
                    onClick={() => handleMarkAsRead(enquiry.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(enquiry.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
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
