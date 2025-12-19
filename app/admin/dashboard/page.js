'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminDB } from '@/lib/firestore';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    properties: 0,
    blogs: 0,
    services: 0,
    enquiries: 0,
    contacts: 0,
    unreadEnquiries: 0,
    unreadContacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [properties, blogs, services, enquiries, contacts] = await Promise.all([
        adminDB.getAllProperties(),
        adminDB.getAllBlogs(),
        adminDB.getAllServices(),
        adminDB.getAllEnquiries(),
        adminDB.getAllContacts(),
      ]);

      setStats({
        properties: properties.length,
        blogs: blogs.length,
        services: services.length,
        enquiries: enquiries.length,
        contacts: contacts.length,
        unreadEnquiries: enquiries.filter(e => !e.is_read).length,
        unreadContacts: contacts.filter(c => !c.is_read).length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: 'Properties',
      count: stats.properties,
      icon: '🏠',
      href: '/admin/properties',
      color: 'bg-gold-500',
    },
    {
      title: 'Blogs',
      count: stats.blogs,
      icon: '📝',
      href: '/admin/blogs',
      color: 'bg-green-500',
    },
    {
      title: 'Services',
      count: stats.services,
      icon: '💼',
      href: '/admin/services',
      color: 'bg-purple-500',
    },
    {
      title: 'Enquiries',
      count: stats.enquiries,
      badge: stats.unreadEnquiries,
      icon: '📬',
      href: '/admin/enquiries',
      color: 'bg-orange-500',
    },
    {
      title: 'Contacts',
      count: stats.contacts,
      badge: stats.unreadContacts,
      icon: '📞',
      href: '/admin/contacts',
      color: 'bg-red-500',
    },
    {
      title: 'Locations',
      count: '-',
      icon: '📍',
      href: '/admin/locations',
      color: 'bg-teal-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{card.count}</p>
                {card.badge > 0 && (
                  <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
                    {card.badge} unread
                  </span>
                )}
              </div>
              <div className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
                {card.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/properties/new"
            className="px-4 py-3 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors text-center font-medium"
          >
            + Add New Property
          </Link>
          <Link
            href="/admin/blogs/new"
            className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
          >
            + Add New Blog
          </Link>
          <Link
            href="/admin/services/new"
            className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center font-medium"
          >
            + Add New Service
          </Link>
        </div>
      </div>
    </div>
  );
}
