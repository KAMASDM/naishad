// Sitemap generation for SEO
export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic property pages (mock data - replace with actual API call)
  const propertyPages = [
    'luxury-3bhk-andheri',
    'sea-view-penthouse-bandra',
    'modern-villa-juhu',
    'spacious-2bhk-powai',
    'premium-4bhk-worli',
    'cozy-1bhk-malad',
    'duplex-apartment-goregaon',
    'studio-apartment-santacruz',
  ].map((slug) => ({
    url: `${baseUrl}/properties/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Dynamic blog pages (mock data - replace with actual API call)
  const blogPages = [
    'top-areas-mumbai-2024',
    'first-time-home-buyer-guide',
    'real-estate-investment-tips',
    'luxury-penthouses-mumbai',
    'home-loan-guide-2024',
    'vastu-tips-home',
  ].map((slug) => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...propertyPages, ...blogPages];
}
