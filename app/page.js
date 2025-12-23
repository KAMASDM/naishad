import HeroSection from "@/components/sections/HeroSection";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import FindPropertiesSection from "@/components/sections/FindPropertiesSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BlogsSection from "@/components/sections/BlogsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export const metadata = {
  title: 'Home',
  description: 'Discover 500+ premium properties in Mumbai. Find luxury apartments, villas, and penthouses in Bandra, Andheri, Juhu, Worli, and other prime locations.',
  openGraph: {
    title: 'RealEstate - Find Your Dream Property in Mumbai',
    description: 'Browse 500+ verified properties in Mumbai\'s best locations. Expert guidance for buying, selling, and renting.',
    images: ['/og-home.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <FindPropertiesSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogsSection />
    </>
  );
}
