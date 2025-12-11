# Real Estate Website

A modern real estate website built with Next.js 14, React 19, and Firebase.

## Features

- 🏠 Property Listings with Search & Filters
- 📝 Blog System for Real Estate News
- 💼 Services Showcase
- 📞 Contact & Enquiry Forms
- 🔥 Firebase Backend (Firestore + Storage)
- 📱 Responsive Design
- ⚡ Fast Performance with Next.js
- 🎨 Modern UI with Tailwind CSS v4
- 📊 SEO Optimized

## Tech Stack

- **Frontend**: Next.js 14, React 19
- **Styling**: Tailwind CSS v4
- **Backend**: Firebase (Firestore Database)
- **Storage**: Firebase Storage
- **Analytics**: Firebase Analytics
- **Deployment**: Vercel/Netlify

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Firebase

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed Firebase configuration instructions.

The Firebase project is already configured in `lib/firebase.js`:
- Project ID: shreedhar-c51c5
- Services: Firestore, Storage, Analytics

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Add Data to Firestore

Use the Firebase Console to add:
- Properties
- Blogs
- Services
- Cities
- Areas

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for data structure and examples.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.js            # Homepage
│   ├── properties/        # Property listings
│   ├── blogs/             # Blog pages
│   ├── services/          # Services page
│   ├── contact/           # Contact page
│   └── about/             # About page
├── components/            # React components
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Page sections
│   ├── ui/                # Reusable UI components
│   └── seo/               # SEO components
├── lib/                   # Utilities and configurations
│   ├── firebase.js        # Firebase initialization
│   ├── firestore.js       # Firestore database utilities
│   ├── api.js             # API client
│   └── utils/             # Helper functions
└── public/                # Static assets
```

## API Usage

```javascript
import { api } from '@/lib/api';

// Get properties
const properties = await api.getProperties();

// Get property by slug
const property = await api.getPropertyBySlug('apartment-slug');

// Submit enquiry
await api.submitEnquiry({
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 9876543210",
  message: "Interested in property"
});
```

## Documentation

- [Firebase Setup Guide](./FIREBASE_SETUP.md) - Complete Firebase configuration
- [SEO Implementation](./SEO_IMPLEMENTATION.md) - SEO features and setup
- [Project Complete](./PROJECT_COMPLETE.md) - Project completion checklist

## Deployment

### Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/realestate-website)

1. Push code to GitHub
2. Import project to Vercel
3. Deploy automatically

### Deploy on Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT
