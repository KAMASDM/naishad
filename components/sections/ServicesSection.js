'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { firebaseDB } from '@/lib/firestore';

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await firebaseDB.getServices({ limit: 6, activeOnly: true });
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold-600 border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          subtitle="What We Offer"
          title="Our Services"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gold-300 group"
            >
              {/* Icon */}
              {service.icon_image && (
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                    <img
                      src={service.icon_image}
                      alt={service.title}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-gold-600 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-center mb-4 line-clamp-3">
                {service.description}
              </p>

              {/* Features */}
              {service.features && (
                <ul className="space-y-2 mb-4">
                  {service.features.split(',').slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <svg className="w-5 h-5 text-gold-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{feature.trim()}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Price */}
              {service.starting_price && (
                <p className="text-center text-sm text-gray-500 mb-4">
                  Starting from <span className="font-semibold text-gold-600">₹{service.starting_price.toLocaleString('en-IN')}</span>
                </p>
              )}

              {/* Learn More Link */}
              <div className="text-center">
                <Link
                  href={`/services#${service.slug}`}
                  className="inline-flex items-center text-gold-600 hover:text-gold-700 font-semibold text-sm group-hover:underline"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-3 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
          >
            View All Services
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
