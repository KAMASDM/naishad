import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingEnquiryForm from "@/components/layout/FloatingEnquiryForm";
import BottomNav from "@/components/layout/BottomNav";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/seo/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://realestate.com'),
  title: {
    default: 'RealEstate - Premium Properties in Mumbai | Buy, Sell & Rent',
    template: '%s | RealEstate Mumbai',
  },
  description: 'Find your dream property in Mumbai. Browse 500+ verified luxury apartments, villas, and penthouses in prime locations like Bandra, Andheri, Juhu, Worli.',
  keywords: ['real estate Mumbai', 'properties Mumbai', 'buy apartment Mumbai', 'luxury villas Mumbai', 'penthouses Mumbai', 'real estate agents Mumbai', 'property dealers Mumbai', 'flats for sale Mumbai', 'houses for rent Mumbai'],
  authors: [{ name: 'RealEstate Mumbai' }],
  creator: 'RealEstate Mumbai',
  publisher: 'RealEstate Mumbai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'RealEstate Mumbai',
    title: 'RealEstate - Premium Properties in Mumbai',
    description: 'Find your dream property in Mumbai. Browse luxury apartments, villas, and penthouses in prime locations.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RealEstate Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RealEstate - Premium Properties in Mumbai',
    description: 'Find your dream property in Mumbai. Browse luxury apartments, villas, and penthouses.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="pt-16 md:pt-20 pb-20 lg:pb-0">{children}</main>
        <Footer />
        <FloatingEnquiryForm />
        <BottomNav />
      </body>
    </html>
  );
}
