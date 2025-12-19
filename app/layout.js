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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://thakkarauctioneer.com'),
  title: {
    default: 'Thakkar Auctioneer & Realtors - Premium Properties & Auction Services',
    template: '%s | Thakkar Auctioneer',
  },
  description: 'Ex: Court Receiver - Debt Recovery Tribunal - Mumbai. Auctioneer & Solution Provider For Banks. Premium real estate and auction services in Mumbai and Vadodara.',
  keywords: ['property auction Mumbai', 'real estate Mumbai', 'court receiver Mumbai', 'debt recovery tribunal', 'bank auction properties', 'property dealers Mumbai', 'Thakkar Auctioneer', 'real estate Vadodara', 'auction services'],
  authors: [{ name: 'Thakkar Auctioneer & Realtors Pvt. Ltd.' }],
  creator: 'Thakkar Auctioneer & Realtors Pvt. Ltd.',
  publisher: 'Thakkar Auctioneer & Realtors Pvt. Ltd.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Thakkar Auctioneer & Realtors',
    title: 'Thakkar Auctioneer & Realtors - Premium Properties & Auction Services',
    description: 'Ex: Court Receiver - Debt Recovery Tribunal - Mumbai. Auctioneer & Solution Provider For Banks.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Thakkar Auctioneer & Realtors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thakkar Auctioneer & Realtors - Premium Properties & Auction Services',
    description: 'Ex: Court Receiver - Debt Recovery Tribunal - Mumbai. Auctioneer & Solution Provider For Banks.',
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
