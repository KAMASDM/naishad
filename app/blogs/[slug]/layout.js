// Generate metadata for blog detail pages
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  // Mock data - replace with actual API call
  const blogTitle = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return {
    title: `${blogTitle} - Real Estate Blog`,
    description: `Read about ${blogTitle}. Expert insights on Mumbai real estate, property investment tips, and market trends.`,
    openGraph: {
      title: `${blogTitle} | RealEstate Mumbai Blog`,
      description: `Expert insights on Mumbai real estate market and property investment.`,
      images: [`/blogs/${slug}.jpg`],
      type: 'article',
      publishedTime: new Date().toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blogTitle}`,
      description: `Expert insights on Mumbai real estate market and property investment.`,
      images: [`/blogs/${slug}.jpg`],
    },
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}

export default function BlogLayout({ children }) {
  return children;
}
