'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminDB, compressImage } from '@/lib/firestore';

export default function PropertyForm({ property = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(property?.primary_image || null);
  const [gallery, setGallery] = useState(property?.gallery || []);
  const [videos, setVideos] = useState(property?.videos || []);
  
  const [formData, setFormData] = useState({
    title: property?.title || '',
    slug: property?.slug || '',
    description: property?.description || '',
    property_type: property?.property_type || 'Apartment',
    price: property?.price || '',
    area_sqft: property?.area_sqft || '',
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
    city_name: property?.city_name || '',
    area_name: property?.area_name || '',
    address: property?.address || '',
    primary_image: property?.primary_image || '',
    gallery: property?.gallery || [],
    videos: property?.videos || [],
    amenities: property?.amenities || '',
    featured: property?.featured || false,
    is_active: property?.is_active ?? true,
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

    // Validate file size (max 5MB before compression)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      // Compress and resize image (max 1200px width, 0.8 quality)
      const compressedBase64 = await compressImage(file, 1200, 0.8);
      setFormData(prev => ({ ...prev, primary_image: compressedBase64 }));
      setImagePreview(compressedBase64);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image');
    }
  };

  const handleGalleryImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validate max 10 images
    if (gallery.length + files.length > 10) {
      alert('Maximum 10 gallery images allowed');
      return;
    }

    try {
      const newImages = await Promise.all(
        files.map(async (file) => {
          if (!file.type.startsWith('image/')) {
            throw new Error('Please select only image files');
          }
          if (file.size > 5 * 1024 * 1024) {
            throw new Error('Each image should be less than 5MB');
          }
          // Compress gallery images to 800px width, 0.75 quality
          const compressedBase64 = await compressImage(file, 800, 0.75);
          return { image: compressedBase64, alt_text: file.name };
        })
      );

      const updatedGallery = [...gallery, ...newImages];
      setGallery(updatedGallery);
      setFormData(prev => ({ ...prev, gallery: updatedGallery }));
    } catch (error) {
      console.error('Error processing images:', error);
      alert(error.message || 'Failed to process images');
    }
  };

  const removeGalleryImage = (index) => {
    const updatedGallery = gallery.filter((_, i) => i !== index);
    setGallery(updatedGallery);
    setFormData(prev => ({ ...prev, gallery: updatedGallery }));
  };

  const handleVideoUrlAdd = () => {
    const url = prompt('Enter YouTube or video URL:');
    if (!url) return;

    if (videos.length >= 5) {
      alert('Maximum 5 videos allowed');
      return;
    }

    const newVideo = { url, title: 'Property Video' };
    const updatedVideos = [...videos, newVideo];
    setVideos(updatedVideos);
    setFormData(prev => ({ ...prev, videos: updatedVideos }));
  };

  const removeVideo = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
    setFormData(prev => ({ ...prev, videos: updatedVideos }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        area_sqft: parseFloat(formData.area_sqft),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
      };

      if (isEdit) {
        await adminDB.updateProperty(property.id, data);
      } else {
        await adminDB.createProperty(data);
      }

      router.push('/admin/properties');
      router.refresh();
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Failed to save property');
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type *
            </label>
            <select
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
            >
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
              <option value="Office">Office</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (₹) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area (sqft) *
            </label>
            <input
              type="number"
              name="area_sqft"
              value={formData.area_sqft}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms *
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bathrooms *
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              name="city_name"
              value={formData.city_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area *
            </label>
            <input
              type="text"
              name="area_name"
              value={formData.area_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities (comma-separated)
            </label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="Parking, Gym, Swimming Pool, Security"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
            />
            <p className="text-sm text-gray-600 mt-1">Max 5MB - Auto-compressed to 1200px width</p>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-full max-w-md h-48 object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      </div>

      {/* Gallery Images */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Gallery Images (Max 10)</h2>
        
        <div className="space-y-4">
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryImagesChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
            />
            <p className="text-sm text-gray-600 mt-1">
              Select multiple images (Max 10 total, 5MB each) - Auto-compressed to 800px width
            </p>
          </div>

          {gallery.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {gallery.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.image}
                    alt={img.alt_text || `Gallery ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Videos */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Property Videos (Max 5)</h2>
        
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleVideoUrlAdd}
            className="px-4 py-2 bg-gold-600 text-white rounded-md hover:bg-gold-700 transition-colors"
          >
            + Add Video URL
          </button>
          <p className="text-sm text-gray-600">Add YouTube or video URLs</p>

          {videos.length > 0 && (
            <div className="space-y-3 mt-4">
              {videos.map((video, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 truncate">{video.title}</p>
                    <p className="text-xs text-gray-600 truncate">{video.url}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVideo(index)}
                    className="ml-3 text-red-600 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-gold-600 border-gray-300 rounded focus:ring-gold-500"
            />
            <span className="text-sm font-medium text-gray-700">Featured Property</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4 text-gold-600 border-gray-300 rounded focus:ring-gold-500"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-gold-600 text-white rounded-md hover:bg-gold-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Saving...' : isEdit ? 'Update Property' : 'Create Property'}
        </button>
      </div>
    </form>
  );
}
