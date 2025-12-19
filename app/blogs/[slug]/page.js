'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ShareButtons from '@/components/ui/ShareButtons';
import { BlogPostSchema, BreadcrumbSchema } from '@/components/seo/StructuredData';
import { api } from '@/lib/api';
import { formatDate } from '@/utils/helpers';

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params?.slug) {
      fetchBlog(params.slug);
    }
  }, [params]);

  const fetchBlog = async (slug) => {
    try {
      // Fetch from Django backend
      const data = await api.getBlogBySlug(slug);
      setBlog(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Failed to load blog post');
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Blog Post Not Found
          </h1>
          <Link
            href="/blogs"
            className="text-gold-600 hover:text-gold-700 font-semibold"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blogs', url: '/blogs' },
    { name: blog.title, url: `/blogs/${blog.slug}` },
  ];

  return (
    <div className="min-h-screen bg-white">
      <BlogPostSchema blog={blog} />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 bg-gradient-to-br from-gold-100 to-gold-200">
        {blog.image ? (
          <Image src={blog.image} alt={blog.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-24 h-24 text-gold-400"
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
      </div>

      {/* Article Content */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link
              href="/blogs"
              className="inline-flex items-center text-gold-600 hover:text-gold-700 font-semibold mb-6"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blogs
            </Link>

            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-gold-100 text-gold-600 px-4 py-1 rounded-full text-sm font-semibold">
                {blog.category}
              </span>
              <span className="text-gray-600">
                {formatDate(blog.published_date)}
              </span>
              <span className="text-gray-600">By {blog.author}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>

            {/* Share Buttons */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Share this article:</p>
              <ShareButtons
                url={`/blogs/${blog.slug}`}
                title={blog.title}
                description={blog.excerpt || blog.title}
                imageUrl={blog.image || '/og-blog.jpg'}
              />
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Share this article
                  </h3>
                  <div className="flex space-x-3">
                    <button className="w-10 h-10 bg-gold-600 text-white rounded-full flex items-center justify-center hover:bg-gold-700 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-gold-400 text-white rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Looking for Properties in Mumbai?
            </h2>
            <p className="text-gray-600 mb-8">
              Browse our extensive collection of premium properties
            </p>
            <Link
              href="/properties"
              className="inline-block px-8 py-4 bg-gold-600 text-white rounded-lg font-semibold hover:bg-gold-700 transition-colors shadow-lg"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
