'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { api } from '@/lib/api';
import { formatDate, truncateText } from '@/utils/helpers';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      // Fetch from Django backend
      const data = await api.getBlogs();
      setBlogs(data.results || data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      
      // Fallback to mock data if API fails
      const mockBlogs = [
        {
          id: 1,
          slug: 'top-areas-mumbai-2024',
          title: 'Top 10 Areas to Buy Property in Mumbai 2024',
          excerpt: 'Discover the most promising neighborhoods in Mumbai for property investment this year.',
          author: 'Priya Sharma',
          published_date: '2024-12-01',
          category: 'Market Trends',
          image: null,
        },
        {
          id: 2,
          slug: 'first-time-home-buyer-guide',
          title: 'First Time Home Buyer\'s Guide: Everything You Need to Know',
          excerpt: 'Buying your first home? This comprehensive guide covers everything you need.',
          author: 'Rahul Mehta',
          published_date: '2024-11-28',
          category: 'Buying Guide',
          image: null,
        },
      ];
      
      setBlogs(mockBlogs);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <LoadingSpinner fullScreen />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-900 to-gold-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Real Estate Blog
            </h1>
            <p className="text-lg md:text-xl text-gold-100">
              Expert insights, market trends, and valuable tips for property buyers
              and investors
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            subtitle="Latest Articles"
            title="Stay Informed"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group"
              >
                <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gold-100 to-gold-200 overflow-hidden">
                    {blog.image ? (
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-gold-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-gold-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {blog.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span>{formatDate(blog.published_date)}</span>
                      <span className="mx-2">•</span>
                      <span>{blog.author}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gold-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center text-gold-600 font-semibold group-hover:gap-2 transition-all">
                      <span>Read More</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gold-600 to-gold-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-gold-100 mb-8">
              Get the latest real estate news, market insights, and property
              listings delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-gold-300"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-gold-600 rounded-lg font-semibold hover:bg-gold-50 transition-colors shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
