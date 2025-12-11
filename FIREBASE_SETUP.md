# Firebase Setup Guide

This project now uses Firebase (Firestore) as its backend database, replacing the previous Netlify Neon PostgreSQL setup.

## Firebase Configuration

The Firebase project is already configured in `lib/firebase.js`:
- **Project ID**: shreedhar-c51c5
- **Services**: Firestore Database, Storage, Analytics

## Firestore Collections Structure

### 1. Properties Collection (`properties`)

```javascript
{
  id: "auto-generated-id",
  title: "Beautiful 3 BHK Apartment",
  slug: "beautiful-3-bhk-apartment",
  description: "Spacious apartment with modern amenities...",
  property_type: "Apartment", // Villa, Apartment, Plot, etc.
  price: 5500000,
  area_sqft: 1250,
  bedrooms: 3,
  bathrooms: 2,
  city_name: "Mumbai",
  area_name: "Andheri West",
  address: "123 Main Street",
  primary_image: "https://storage.googleapis.com/.../image.jpg",
  amenities: "Parking,Gym,Swimming Pool,Security", // Comma-separated
  amenities_list: ["Parking", "Gym", "Swimming Pool", "Security"], // Auto-generated
  featured: true,
  is_active: true,
  created_at: Timestamp,
}
```

### 2. Blogs Collection (`blogs`)

```javascript
{
  id: "auto-generated-id",
  title: "Top 10 Real Estate Tips",
  slug: "top-10-real-estate-tips",
  excerpt: "Learn the best practices...",
  content: "Full blog content here...",
  featured_image: "https://storage.googleapis.com/.../image.jpg",
  category: "Tips", // Tips, Market News, Investment, etc.
  tags: "real-estate,investment,tips", // Comma-separated
  author: "Admin",
  published_date: Timestamp,
  updated_date: Timestamp,
  featured: true,
  is_published: true,
}
```

### 3. Services Collection (`services`)

```javascript
{
  id: "auto-generated-id",
  name: "Property Consultation",
  slug: "property-consultation",
  description: "Expert consultation for buying/selling properties",
  service_type: "Consultation", // Consultation, Valuation, Legal, etc.
  features: "Expert Advice,Market Analysis,Document Verification", // Comma-separated
  features_list: ["Expert Advice", "Market Analysis", "Document Verification"], // Auto-generated
  icon: "consultation-icon",
  image_url: "https://storage.googleapis.com/.../image.jpg",
  starting_price: null, // Optional, null if prices are hidden
  display_order: 1,
  featured: true,
  is_active: true,
}
```

### 4. Enquiries Collection (`enquiries`)

```javascript
{
  id: "auto-generated-id",
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 9876543210",
  property_interest: "Beautiful 3 BHK Apartment", // Optional
  message: "I'm interested in this property",
  source: "website", // website, phone, whatsapp, etc.
  is_read: false,
  is_responded: false,
  created_at: Timestamp,
}
```

### 5. Contacts Collection (`contacts`)

```javascript
{
  id: "auto-generated-id",
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "+91 9876543210",
  subject: "General Inquiry",
  message: "I have a question about...",
  is_read: false,
  created_at: Timestamp,
}
```

### 6. Cities Collection (`cities`)

```javascript
{
  id: "auto-generated-id",
  name: "Mumbai",
  slug: "mumbai",
  state: "Maharashtra",
}
```

### 7. Areas Collection (`areas`)

```javascript
{
  id: "auto-generated-id",
  name: "Andheri West",
  slug: "andheri-west",
  city_id: "city-document-id", // Reference to Cities collection
  city_name: "Mumbai", // Denormalized for faster queries
}
```

## Setting Up Firestore Database

### Step 1: Initialize Firestore in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **shreedhar-c51c5**
3. Navigate to **Firestore Database**
4. Click **Create Database**
5. Select **Production Mode** or **Test Mode**
   - Production Mode: More secure, requires security rules
   - Test Mode: Open access for 30 days (good for initial setup)
6. Choose location (preferably closest to your users)

### Step 2: Add Sample Data

You can add data through:
1. **Firebase Console UI**: Manually add documents
2. **Firebase Admin SDK**: Use a Node.js script to bulk import
3. **Using the app**: Create data through the enquiry forms

#### Sample Property Document

Go to Firestore → Create Collection `properties` → Add Document:

```
Document ID: auto-generated
Fields:
- title (string): "3 BHK Apartment in Andheri"
- slug (string): "3-bhk-apartment-andheri"
- description (string): "Beautiful apartment with sea view"
- property_type (string): "Apartment"
- price (number): 8500000
- area_sqft (number): 1400
- bedrooms (number): 3
- bathrooms (number): 2
- city_name (string): "Mumbai"
- area_name (string): "Andheri West"
- address (string): "Near Station Road"
- primary_image (string): "/images/properties/property-1.jpg"
- amenities (string): "Parking,Gym,Security,Lift"
- featured (boolean): true
- is_active (boolean): true
- created_at (timestamp): [Current timestamp]
```

### Step 3: Set Up Firestore Security Rules

Go to Firestore → Rules tab and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Properties - Read only
    match /properties/{property} {
      allow read: if true;
      allow write: if false; // Only allow writes through admin panel
    }
    
    // Blogs - Read only
    match /blogs/{blog} {
      allow read: if true;
      allow write: if false;
    }
    
    // Services - Read only
    match /services/{service} {
      allow read: if true;
      allow write: if false;
    }
    
    // Cities and Areas - Read only
    match /cities/{city} {
      allow read: if true;
      allow write: if false;
    }
    
    match /areas/{area} {
      allow read: if true;
      allow write: if false;
    }
    
    // Enquiries - Allow write from frontend, restrict read
    match /enquiries/{enquiry} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    
    // Contact messages - Allow write from frontend, restrict read
    match /contacts/{contact} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

### Step 4: Set Up Firebase Storage (for images)

1. Go to **Storage** in Firebase Console
2. Click **Get Started**
3. Choose security rules (can start with test mode)
4. Create folders:
   - `/properties/` - Property images
   - `/blogs/` - Blog featured images
   - `/services/` - Service images

### Step 5: Enable Firebase Analytics (Optional)

Firebase Analytics is already initialized in the code. It will automatically start tracking:
- Page views
- User engagement
- Custom events

## Using the API

The API client is in `lib/api.js` and uses Firestore directly:

```javascript
import { api } from '@/lib/api';

// Get all properties
const properties = await api.getProperties();

// Get featured properties
const featured = await api.getFeaturedProperties();

// Get property by slug
const property = await api.getPropertyBySlug('3-bhk-apartment');

// Submit enquiry
await api.submitEnquiry({
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 9876543210",
  message: "I'm interested"
});
```

## Environment Variables

No environment variables needed! Firebase config is in `lib/firebase.js`.

For production, you can optionally move the config to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCwm0w10uVJUx-c1ibUnSDnqmhMG8pdfUs
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=shreedhar-c51c5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=shreedhar-c51c5
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=shreedhar-c51c5.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=933661074064
NEXT_PUBLIC_FIREBASE_APP_ID=1:933661074064:web:84fcefc73ff35c2c07ccf9
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-Z1VQL5RCFT
```

## Testing the Integration

Run the development server:

```bash
npm run dev
```

The app will now use Firebase Firestore for all data operations.

## Next Steps

1. **Add data to Firestore**: Use Firebase Console to add properties, blogs, services
2. **Set up Admin Panel**: Create a separate admin interface for managing data
3. **Configure Security Rules**: Tighten security rules for production
4. **Enable Authentication**: Add Firebase Auth if you need user login
5. **Set up Cloud Functions**: For server-side operations like email notifications

## Advantages of Firebase

✅ **Serverless**: No server management needed
✅ **Real-time**: Get live updates when data changes
✅ **Scalable**: Automatically scales with your traffic
✅ **Free Tier**: Generous free quota for small apps
✅ **Easy Setup**: No SQL, no migrations
✅ **Built-in Analytics**: Track user behavior
✅ **File Storage**: Integrated image/file hosting

## Migration from Previous Backends

- ✅ Django backend files removed
- ✅ Netlify Neon files removed (`app/api/*`, `db/*`, `lib/db.js`)
- ✅ @netlify/neon package uninstalled
- ✅ Firebase package installed
- ✅ API client updated to use Firestore
- ✅ All components compatible with new structure
