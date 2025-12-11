export const metadata = {
  title: 'Browse Properties',
  description: 'Browse 500+ verified properties in Mumbai. Filter by location, type, BHK, budget. Find apartments, villas, penthouses in Bandra, Andheri, Juhu, Worli.',
  openGraph: {
    title: 'Properties for Sale & Rent in Mumbai',
    description: 'Find your dream property from our extensive collection of verified listings.',
    images: ['/og-properties.jpg'],
  },
  alternates: {
    canonical: '/properties',
  },
};

export default function PropertiesLayout({ children }) {
  return children;
}
