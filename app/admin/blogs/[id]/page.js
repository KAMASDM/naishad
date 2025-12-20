'use client';

import { use, useEffect, useState } from 'react';
import { adminDB } from '@/lib/firestore';
import BlogForm from '@/components/admin/BlogForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function EditBlogPage({ params }) {
  const { id } = use(params);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await adminDB.getBlogById(id);
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h2>
        <p className="text-gray-600">The requested blog post could not be found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
        <p className="text-gray-600 mt-2">Update blog post information</p>
      </div>

      <BlogForm blog={blog} isEdit={true} />
    </div>
  );
}
