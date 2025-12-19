'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { api } from '@/lib/api';
import { formatPrice } from '@/utils/helpers';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await api.getServices();
      // Handle both array and paginated response
      const servicesData = Array.isArray(data) ? data : (data.results || []);
      setServices(servicesData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services');
      setLoading(false);
    }
  };

  // Icon mapping for service types
  const getServiceIcon = (serviceType) => {
    const icons = {
      property_management: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      home_loan: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      legal_services: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      interior_design: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      vastu_consultation: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      property_valuation: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      relocation: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      rental_services: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    };
    return icons[serviceType] || icons.property_management;
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Unable to Load Services
          </h1>
          <p className="text-gray-600">{error}</p>
        </div>
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
              Our Services
            </h1>
            <p className="text-lg md:text-xl text-gold-100">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            subtitle="What We Offer"
            title="Comprehensive Real Estate Services"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gold-100 rounded-xl flex items-center justify-center text-gold-600 mb-6">
                  {getServiceIcon(service.service_type)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                {service.short_description && (
                  <p className="text-gray-600 mb-4">{service.short_description}</p>
                )}
                {service.features_list && service.features_list.length > 0 && (
                  <ul className="space-y-3">
                    {service.features_list.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
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
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            subtitle="Why Choose Us"
            title="Your Trusted Real Estate Partner"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-gold-600 mb-2">15+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-gold-600 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Happy Clients</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-gold-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Properties</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-gold-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Expert Agents</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gold-600 to-gold-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Professional Assistance?
            </h2>
            <p className="text-lg text-gold-100 mb-8">
              Our expert team is here to help you with all your real estate needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-gold-600 rounded-lg font-semibold hover:bg-gold-50 transition-colors shadow-lg"
              >
                Get in Touch
              </a>
              <a
                href="/properties"
                className="px-8 py-4 bg-gold-700 text-white rounded-lg font-semibold hover:bg-gold-600 transition-colors border-2 border-white shadow-lg"
              >
                Browse Properties
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
