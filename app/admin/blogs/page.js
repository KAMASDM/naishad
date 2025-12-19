'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminDB } from '@/lib/firestore';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await adminDB.getAllBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      await adminDB.deleteBlog(id);
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
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
          <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>
          <p className="text-gray-600 mt-2">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          + Add New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">No blogs yet</p>
          <Link
            href="/admin/blogs/new"
            className="inline-block mt-4 text-green-600 hover:text-green-700"
          >
            Add your first blog post →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blog
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {blog.featured_image && (
                          <img
                            src={blog.featured_image}
                            alt={blog.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{blog.title}</div>
                          <div className="text-sm text-gray-500">{blog.excerpt?.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {blog.category || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(blog.published_date)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          blog.is_published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {blog.is_published ? 'Published' : 'Draft'}
                      </span>
                      {blog.featured && (
                        <span className="ml-2 px-2 py-1 text-xs font-semibold rounded bg-gold-100 text-gold-800">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-sm space-x-2">
                      <Link
                        href={`/admin/blogs/${blog.id}`}
                        className="text-green-600 hover:text-green-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
