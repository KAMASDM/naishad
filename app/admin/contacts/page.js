'use client';

import { useEffect, useState } from 'react';
import { adminDB } from '@/lib/firestore';

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await adminDB.getAllContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await adminDB.markContactAsRead(id);
      setContacts(prev =>
        prev.map(c => c.id === id ? { ...c, is_read: true } : c)
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      await adminDB.deleteContact(id);
      setContacts(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
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
        <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-gray-600 mt-2">
          {contacts.filter(c => !c.is_read).length} unread messages
        </p>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">No contact messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-white rounded-lg shadow-md p-6 ${
                !contact.is_read ? 'border-l-4 border-blue-600' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{formatDate(contact.created_at)}</p>
                </div>
                {!contact.is_read && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                    NEW
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600">Email:</span>
                  <p className="font-medium">{contact.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Phone:</span>
                  <p className="font-medium">{contact.phone || '-'}</p>
                </div>
                {contact.subject && (
                  <div className="md:col-span-2">
                    <span className="text-sm text-gray-600">Subject:</span>
                    <p className="font-medium">{contact.subject}</p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <span className="text-sm text-gray-600">Message:</span>
                <p className="mt-1 text-gray-900">{contact.message}</p>
              </div>

              <div className="flex gap-2">
                {!contact.is_read && (
                  <button
                    onClick={() => handleMarkAsRead(contact.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(contact.id)}
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
