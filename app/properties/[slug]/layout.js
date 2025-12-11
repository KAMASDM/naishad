// Generate metadata for property detail pages
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  // Mock data - replace with actual API call
  const propertyTitle = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return {
    title: `${propertyTitle} - Property Details`,
    description: `View details of ${propertyTitle} in Mumbai. Check price, amenities, location, and photos. Contact us for site visit and booking.`,
    openGraph: {
      title: `${propertyTitle} - Buy/Rent in Mumbai`,
      description: `Premium property in Mumbai with all modern amenities. Book a site visit today!`,
      images: [`/properties/${slug}.jpg`],
      type: 'article',
    },
    alternates: {
      canonical: `/properties/${slug}`,
    },
  };
}

export default function PropertyLayout({ children }) {
  return children;
}
