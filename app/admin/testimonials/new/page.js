import TestimonialForm from '@/components/admin/TestimonialForm';

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Testimonial</h1>
        <p className="text-gray-600 mt-1">Create a new client testimonial</p>
      </div>
      <TestimonialForm />
    </div>
  );
}
