// Web App Manifest for PWA support
export default function manifest() {
  return {
    name: 'Thakkar Auctioneer & Realtors - Premium Properties & Auction Services',
    short_name: 'Thakkar Auctioneer',
    description: 'Ex: Court Receiver - Debt Recovery Tribunal - Mumbai. Auctioneer & Solution Provider For Banks.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#d97706',
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
