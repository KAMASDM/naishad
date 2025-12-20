'use client';

import BlogForm from '@/components/admin/BlogForm';

export default function NewBlogPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Blog Post</h1>
        <p className="text-gray-600 mt-2">Create a new blog post</p>
      </div>

      <BlogForm />
    </div>
  );
}
