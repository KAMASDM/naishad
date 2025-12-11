export const metadata = {
  title: 'Real Estate Blog',
  description: 'Latest insights on Mumbai real estate market, property buying tips, investment advice, and neighborhood guides. Expert articles on real estate trends.',
  openGraph: {
    title: 'Real Estate Blog - Mumbai Property Insights & Tips',
    description: 'Expert advice on buying, selling, and investing in Mumbai properties.',
    images: ['/og-blog.jpg'],
  },
  alternates: {
    canonical: '/blogs',
  },
};

export default function BlogsLayout({ children }) {
  return children;
}
