export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with RealEstate Mumbai. Visit our office in Bandra West or contact us via phone, email, or WhatsApp. Open Mon-Sat 9:00 AM - 8:00 PM.',
  openGraph: {
    title: 'Contact RealEstate Mumbai - We\'re Here to Help',
    description: 'Reach out to Mumbai\'s leading real estate experts. Quick response guaranteed.',
    images: ['/og-contact.jpg'],
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }) {
  return children;
}
