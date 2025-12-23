'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TestimonialForm from '@/components/admin/TestimonialForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { adminDB } from '@/lib/firestore';

export default function EditTestimonialPage() {
  const params = useParams();
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const testimonials = await adminDB.getAllTestimonials();
        const found = testimonials.find(t => t.id === params.id);
        setTestimonial(found);
      } catch (error) {
        console.error('Error fetching testimonial:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [params.id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!testimonial) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Testimonial Not Found</h2>
        <p className="text-gray-600">The testimonial you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Testimonial</h1>
        <p className="text-gray-600 mt-1">Update testimonial from {testimonial.name}</p>
      </div>
      <TestimonialForm testimonial={testimonial} isEdit={true} />
    </div>
  );
}
