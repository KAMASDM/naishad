'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminDB, fileToBase64 } from '@/lib/firestore';

export default function ServiceForm({ service = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(service?.icon_image || null);
  
  const [formData, setFormData] = useState({
    title: service?.title || '',
    slug: service?.slug || '',
    description: service?.description || '',
    service_type: service?.service_type || 'Property Services',
    features: service?.features || '',
    starting_price: service?.starting_price || '',
    icon_image: service?.icon_image || '',
    display_order: service?.display_order || 0,
    is_active: service?.is_active ?? true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generate slug from title
    if (name === 'title' && !isEdit) {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setFormData(prev => ({ ...prev, icon_image: base64 }));
      setImagePreview(base64);
    } catch (error) {
      console.error('Error converting image:', error);
      alert('Failed to process image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        starting_price: formData.starting_price ? parseFloat(formData.starting_price) : null,
        display_order: parseInt(formData.display_order),
      };

      if (isEdit) {
        await adminDB.updateService(service.id, data);
      } else {
        await adminDB.createService(data);
      }

      router.push('/admin/services');
      router.refresh();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Type *
            </label>
            <select
              name="service_type"
              value={formData.service_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            >
              <option value="Property Services">Property Services</option>
              <option value="Auction Services">Auction Services</option>
              <option value="Consulting">Consulting</option>
              <option value="Legal Services">Legal Services</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting Price (Optional)
            </label>
            <input
              type="number"
              name="starting_price"
              value={formData.starting_price}
              onChange={handleChange}
              placeholder="Leave empty if not applicable"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Order *
            </label>
            <input
              type="number"
              name="display_order"
              value={formData.display_order}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-600 mt-1">Lower numbers appear first</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features (comma-separated)
            </label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows={3}
              placeholder="Feature 1, Feature 2, Feature 3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-600 mt-1">Separate features with commas</p>
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Service Icon</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-600 mt-1">Max size: 2MB. Recommended: Square image (e.g., 400x400px)</p>
          </div>

          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <img
                src={imagePreview}
                alt="Service icon preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Status</h2>
        
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-5 h-5 text-gold-600 border-gray-300 rounded focus:ring-gold-500"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push('/admin/services')}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-gold-600 text-white rounded-md hover:bg-gold-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Service' : 'Create Service'}
        </button>
      </div>
    </form>
  );
}
