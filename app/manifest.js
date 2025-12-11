// Web App Manifest for PWA support
export default function manifest() {
  return {
    name: 'RealEstate - Premium Properties in Mumbai',
    short_name: 'RealEstate',
    description: 'Find your dream property in Mumbai. Browse luxury apartments, villas, and penthouses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
