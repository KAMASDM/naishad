import SectionTitle from '@/components/ui/SectionTitle';
import Image from 'next/image';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Thakkar Auctioneer & Realtors - Ex: Court Receiver, Debt Recovery Tribunal Mumbai, Auctioneer & Solution Provider For Banks. Your trusted partner for premium properties and auction services.',
  openGraph: {
    title: 'About Thakkar Auctioneer & Realtors - Trusted Auction & Real Estate Services',
    description: 'Ex: Court Receiver - Debt Recovery Tribunal - Mumbai. Auctioneer & Solution Provider For Banks.',
    images: ['/og-about.jpg'],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-900 to-gold-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About Thakkar Auctioneer
            </h1>
            <p className="text-lg md:text-xl text-gold-100">
              Ex: Court Receiver - Debt Recovery Tribunal - Mumbai, Auctioneer & Solution Provider For Banks
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              subtitle="Our Story"
              title="Professional Excellence in Auctions & Real Estate"
              centered
            />
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p>
                Thakkar Auctioneer & Realtors Pvt. Ltd. was founded by Naishadh V. Thakkar with a
                mission to provide professional auction and real estate services with complete
                transparency and integrity. As an Ex: Court Receiver and Debt Recovery Tribunal
                specialist in Mumbai, we bring decades of experience in handling complex property
                transactions and auction proceedings.
              </p>
              <p>
                We understand that property auctions and real estate transactions require expertise,
                trust, and precision. That's why we've built our reputation as a trusted Auctioneer
                & Solution Provider For Banks, handling sensitive cases with professionalism and
                discretion. Our services span across Mumbai and Vadodara, serving clients from
                financial institutions, legal entities, and private individuals.
              </p>
              <p>
                Today, we're proud to be recognized as one of the leading auctioneers and real estate
                consultants in the region. Our commitment to legal compliance, market knowledge, and
                exceptional client service remains at the heart of everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            subtitle="Our Values"
            title="What We Stand For"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gold-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparency</h3>
              <p className="text-gray-600">
                We believe in complete transparency in all our dealings. No hidden costs,
                no surprises - just honest, straightforward service.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gold-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We go above and beyond to ensure you
                find the perfect property that matches your needs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gold-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to make property search easier, faster, and
                more efficient for our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Stats Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            subtitle="Our Achievements"
            title="Numbers That Speak"
            centered
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold-600 mb-2">
                15+
              </div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold-600 mb-2">
                500+
              </div>
              <div className="text-gray-600">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold-600 mb-2">
                1000+
              </div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold-600 mb-2">
                50+
              </div>
              <div className="text-gray-600">Expert Agents</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gold-600 to-gold-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-lg text-gold-100 mb-8">
              Let our expert team help you find the perfect property in Mumbai
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/properties"
                className="px-8 py-4 bg-white text-gold-600 rounded-lg font-semibold hover:bg-gold-50 transition-colors shadow-lg"
              >
                Browse Properties
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-gold-700 text-white rounded-lg font-semibold hover:bg-gold-600 transition-colors border-2 border-white shadow-lg"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
