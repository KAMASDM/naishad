'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ShareButtons from '@/components/ui/ShareButtons';
import { PropertySchema, BreadcrumbSchema } from '@/components/seo/StructuredData';
import { api } from '@/lib/api';
import { formatPrice, formatArea } from '@/utils/helpers';
import { AMENITIES, CONTACT_INFO } from '@/utils/constants';

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (params?.slug) {
      fetchProperty(params.slug);
    }
  }, [params]);

  const fetchProperty = async (slug) => {
    try {
      // Fetch from Django backend
      const data = await api.getPropertyBySlug(slug);
      setProperty(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching property:', err);
      setError('Failed to load property');
      setLoading(false);
    }
  };

  const handleCallNow = () => {
    // Use property contact phone or fallback to company phone
    const phoneNumber = property?.contact_phone || property?.contactPhone || CONTACT_INFO.phone;
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    // Use property contact phone or fallback to company phone
    const phoneNumber = property?.contact_phone || property?.contactPhone || CONTACT_INFO.phone;
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Hi, I'm interested in ${property?.title} - ${formatPrice(property?.price)}`);
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleScheduleVisit = () => {
    setShowEnquiryForm(true);
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleShareWhatsAppSidebar = () => {
    const text = encodeURIComponent(`Check out this property: ${property?.title} - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCloseEnquiry = () => {
    setShowEnquiryForm(false);
  };

  const handleEnquirySubmit = async (formData) => {
    try {
      await api.submitEnquiry({
        ...formData,
        property_interest: property?.title || '',
      });
      alert('Thank you! We will contact you shortly.');
      setShowEnquiryForm(false);
    } catch (error) {
      alert('Failed to submit enquiry. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <Link
            href="/properties"
            className="text-gold-600 hover:text-gold-700 font-semibold"
          >
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Properties', url: '/properties' },
    { name: property.title, url: `/properties/${property.slug}` },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PropertySchema property={property} />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      {/* Image Gallery */}
      <section className="bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Back Link */}
            <Link
              href="/properties"
              className="inline-flex items-center text-white hover:text-gold-400 font-semibold mb-4 transition-colors"
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
              Back to Properties
            </Link>

            {/* Main Image */}
            <div className="relative h-64 md:h-96 lg:h-[500px] bg-gradient-to-br from-gold-100 to-gold-200 rounded-xl overflow-hidden">
              {property.primary_image || (property.gallery && property.gallery.length > 0) ? (
                <Image
                  src={property.gallery && property.gallery.length > 0 && activeImageIndex < property.gallery.length 
                    ? property.gallery[activeImageIndex].image 
                    : property.primary_image}
                  alt={property.gallery && property.gallery.length > 0 && activeImageIndex < property.gallery.length
                    ? property.gallery[activeImageIndex].alt_text || property.title
                    : property.title}
                  fill
                  className="object-cover"
                />
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
              )}
              {property.featured && (
                <div className="absolute top-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold">
                  ⭐ Featured
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {property.gallery && property.gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {property.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === index ? 'border-gold-500 shadow-lg' : 'border-transparent hover:border-gold-300'
                    }`}
                  >
                    <Image
                      src={img.image}
                      alt={img.alt_text || `Gallery ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Title & Price */}
                <div className="mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>
                      {property.location}, {property.area_name}, {property.city_name}
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-gold-600 mb-4">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="inline-block bg-gold-100 text-gold-800 px-4 py-2 rounded-lg font-semibold capitalize">
                      {property.status?.replace('_', ' ')}
                    </div>
                    <ShareButtons
                      url={`/properties/${property.slug}`}
                      title={property.title}
                      description={`${property.bedrooms} BHK ${property.property_type} in ${property.location}, Mumbai - ${formatPrice(property.price)}`}
                      imageUrl={property.images?.[0]?.image || '/og-property.jpg'}
                    />
                  </div>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {property.bedrooms}
                    </div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {property.bathrooms}
                    </div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {formatArea(property.sqft)}
                    </div>
                    <div className="text-sm text-gray-600">Area</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {property.parking}
                    </div>
                    <div className="text-sm text-gray-600">Parking</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Description
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {property.description}
                  </p>
                </div>

                {/* Property Details */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Property Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Property Type:</span>
                      <span className="font-semibold text-gray-900 capitalize">
                        {property.property_type}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Furnished Status:</span>
                      <span className="font-semibold text-gray-900">
                        {property.furnished}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Floor:</span>
                      <span className="font-semibold text-gray-900">
                        {property.floor}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Total Floors:</span>
                      <span className="font-semibold text-gray-900">
                        {property.total_floors || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Facing:</span>
                      <span className="font-semibold text-gray-900 capitalize">
                        {property.facing?.replace('_', '-') || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Age of Property:</span>
                      <span className="font-semibold text-gray-900">
                        {property.age_of_property || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                {property.amenities_list && property.amenities_list.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Amenities
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.amenities_list.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
                        >
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Property Videos */}
                {property.videos && property.videos.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Property Videos
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {property.videos.map((video, index) => {
                        // Extract YouTube video ID if it's a YouTube URL
                        let embedUrl = video.url;
                        if (video.url.includes('youtube.com') || video.url.includes('youtu.be')) {
                          const videoId = video.url.includes('youtube.com') 
                            ? video.url.split('v=')[1]?.split('&')[0]
                            : video.url.split('youtu.be/')[1]?.split('?')[0];
                          embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        }

                        return (
                          <div key={index} className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden">
                            <iframe
                              src={embedUrl}
                              title={video.title || `Property Video ${index + 1}`}
                              className="absolute top-0 left-0 w-full h-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Nearby Places */}
                {Array.isArray(property.nearbyPlaces) && property.nearbyPlaces.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Nearby Places
                    </h2>
                    <div className="space-y-3">
                      {property.nearbyPlaces.map((place, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <div className="font-semibold text-gray-900">
                              {place.name}
                            </div>
                            <div className="text-sm text-gray-600">{place.type}</div>
                          </div>
                          <div className="text-gold-600 font-semibold">
                            {place.distance}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar - Contact Form */}
              <div className="lg:col-span-1">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Contact Agent
                  </h3>
                  <div className="mb-6">
                    <div className="font-semibold text-gray-900 mb-1">
                      {property.contact_person || 'Thakkar Auctioneer & Estate Agents'}
                    </div>
                    <a
                      href={`tel:${property.contact_phone || CONTACT_INFO.phone}`}
                      className="text-gold-600 hover:text-gold-700"
                    >
                      {property.contact_phone || CONTACT_INFO.phone}
                    </a>
                  </div>

                  <Button fullWidth size="lg" className="mb-3" onClick={handleCallNow}>
                    <svg
                      className="w-5 h-5 inline mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Call Now
                  </Button>

                  <Button fullWidth size="lg" variant="secondary" className="mb-3" onClick={handleWhatsApp}>
                    <svg
                      className="w-5 h-5 inline mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    Send Message
                  </Button>

                  <Button fullWidth size="lg" variant="outline" onClick={handleScheduleVisit}>
                    <svg
                      className="w-5 h-5 inline mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Schedule Visit
                  </Button>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">Share this property:</p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleShareFacebook}
                        className="flex-1 p-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                        aria-label="Share on Facebook"
                      >
                        <svg
                          className="w-5 h-5 mx-auto"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </button>
                      <button 
                        onClick={handleShareWhatsAppSidebar}
                        className="flex-1 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        aria-label="Share on WhatsApp"
                      >
                        <svg
                          className="w-5 h-5 mx-auto"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseEnquiry}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Schedule a Visit</h3>
            <p className="text-gray-600 mb-6">Fill in your details and we'll contact you shortly</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                message: e.target.message.value,
              };
              handleEnquirySubmit(formData);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    defaultValue={`I'm interested in ${property?.title}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-gray-900"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button type="button" variant="outline" fullWidth onClick={handleCloseEnquiry}>
                    Cancel
                  </Button>
                  <Button type="submit" fullWidth>
                    Submit Enquiry
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
