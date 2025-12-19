// JSON-LD Structured Data for SEO
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Thakkar Auctioneer & Realtors Pvt. Ltd.',
    legalName: 'THAKKAR AUCTIONEER & REALTORS PVT.LTD',
    description: 'Ex: Court Receiver - Debt Recovery Tribunal - Mumbai, Auctioneer & Solution Provider For Banks',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://thakkarauctioneer.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thakkarauctioneer.com'}/logo.png`,
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thakkarauctioneer.com'}/og-image.jpg`,
    telephone: '+91 93245 41883',
    email: 'thakkar.thakkar703@gmail.com',
    taxID: '24AADCT2495G1ZB',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office NO.1, 1st Floor, Dholkwala Building, Opp. Shiddharth Collage, Jamna Bhumi Marg',
      addressLocality: 'Fort',
      addressRegion: 'Mumbai',
      postalCode: '400001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '18.9322',
      longitude: '72.8264',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Mumbai',
      },
      {
        '@type': 'City',
        name: 'Vadodara',
      },
    ],
    openingHours: 'Mo-Sa 09:00-20:00',
    priceRange: '₹₹₹',
    sameAs: [
      'https://www.facebook.com/realestate',
      'https://www.instagram.com/realestate',
      'https://twitter.com/realestate',
      'https://www.linkedin.com/company/realestate',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PropertySchema({ property }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: property.title,
    description: property.description,
    image: property.images || [],
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://thakkarauctioneer.com'}/properties/${property.slug}`,
    },
    brand: {
      '@type': 'Brand',
      name: 'Thakkar Auctioneer & Realtors',
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Bedrooms',
        value: property.bedrooms,
      },
      {
        '@type': 'PropertyValue',
        name: 'Bathrooms',
        value: property.bathrooms,
      },
      {
        '@type': 'PropertyValue',
        name: 'Floor Area',
        value: `${property.sqft} sq ft`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Property Type',
        value: property.propertyType,
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
      addressRegion: property.city,
      addressCountry: 'IN',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogPostSchema({ blog }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt || blog.title,
    image: blog.image,
    datePublished: blog.publishedDate,
    dateModified: blog.updatedDate || blog.publishedDate,
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RealEstate Mumbai',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate.com'}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate.com'}/blogs/${blog.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate.com'}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate.com'}/#localbusiness`,
    name: 'RealEstate Mumbai',
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate.com'}/og-image.jpg`,
    telephone: '+91 98765 43210',
    email: 'info@realestate.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Linking Road',
      addressLocality: 'Bandra West',
      addressRegion: 'Mumbai',
      postalCode: '400050',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '19.0596',
      longitude: '72.8295',
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate.com',
    priceRange: '₹₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
