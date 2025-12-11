import HeroSection from "@/components/sections/HeroSection";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import FindPropertiesSection from "@/components/sections/FindPropertiesSection";

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
    </>
  );
}
