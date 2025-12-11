# Admin Panel Setup Guide

## Overview

The admin panel allows you to manage all content on your real estate website including properties, blogs, services, enquiries, and contacts. Images are stored as base64 data directly in Firestore.

## Step 1: Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **shreedhar-c51c5**
3. Navigate to **Authentication** in the left sidebar
4. Click **Get Started**
5. Click on **Email/Password** under Sign-in methods
6. Enable **Email/Password** (leave Email link disabled)
7. Click **Save**

## Step 2: Create Admin User

### Option A: Using Firebase Console (Recommended)

1. In Firebase Console → **Authentication** → **Users** tab
2. Click **Add User**
3. Enter:
   - Email: `admin@yourdomain.com` (use your actual email)
   - Password: Create a strong password
4. Click **Add User**
5. Copy the **User UID** (e.g., `abc123xyz...`)

### Option B: Using Firebase CLI

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Create user
firebase auth:import users.json --project shreedhar-c51c5
```

## Step 3: Add Admin to Firestore

1. Go to **Firestore Database** in Firebase Console
2. Click **+ Start Collection**
3. Collection ID: `admins`
4. Click **Next**
5. Document ID: Paste the **User UID** from Step 2
6. Add fields:
   - `email` (string): `admin@yourdomain.com`
   - `role` (string): `admin`
   - `created_at` (timestamp): Click "Insert Field" → Select current timestamp
7. Click **Save**

## Step 4: Deploy Firestore Security Rules

1. In your project root, you'll find `firestore.rules`
2. Go to **Firestore Database** → **Rules** tab in Firebase Console
3. Copy the content from `firestore.rules`
4. Paste it into the Firebase Console editor
5. Click **Publish**

OR use Firebase CLI:

```bash
# Initialize Firebase (if not done)
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

## Step 5: Access Admin Panel

1. Start your development server:
```bash
npm run dev
```

2. Navigate to: `http://localhost:3000/admin/login`

3. Login with:
   - Email: The admin email you created
   - Password: The password you set

4. You'll be redirected to: `http://localhost:3000/admin/dashboard`

## Admin Panel Features

### 📊 Dashboard
- Overview statistics
- Quick access to all sections
- Unread notifications count

### 🏠 Properties Management
- **List Properties**: View all property listings
- **Add New Property**: Create property with:
  - Basic info (title, description, price)
  - Property details (type, bedrooms, bathrooms, area)
  - Location (city, area, address)
  - Amenities (comma-separated)
  - Primary Image (uploaded as base64, max 2MB)
  - Featured/Active status
- **Edit Property**: Update existing properties
- **Delete Property**: Remove properties

### 📝 Blogs Management
- Create, edit, and delete blog posts
- Featured image upload (base64)
- Publish/unpublish posts
- Categories and tags

### 💼 Services Management
- Manage service offerings
- Icon/image upload
- Display order control
- Feature toggle

### 📬 Enquiries Viewer
- View all property enquiries
- Mark as read/unread
- Delete enquiries
- See property interest
- Contact information

### 📞 Contacts Viewer
- View contact form submissions
- Mark as read/unread
- Delete messages
- See subject and message details

### 📍 Cities & Areas
- Manage location data
- Add/remove cities
- Add/remove areas
- Link areas to cities

## Image Upload Guidelines

### Base64 Storage
Images are converted to base64 and stored directly in Firestore:

✅ **Advantages:**
- No separate storage service needed
- Simple setup
- Free tier friendly
- Direct database queries with images

⚠️ **Limitations:**
- Max image size: 2MB (recommended 1MB for optimal performance)
- Firestore document size limit: 1MB total
- Large images increase database costs

### Best Practices:
1. **Compress images** before upload
2. **Recommended dimensions**: 1200x800px for properties
3. **Use tools** like TinyPNG or ImageOptim to compress
4. **File formats**: JPG (for photos), PNG (for graphics)
5. **Mobile photos**: Often too large, compress first

### Optimizing Images:
```bash
# Using ImageMagick
convert input.jpg -resize 1200x800 -quality 85 output.jpg

# Using online tools
# - https://tinypng.com/
# - https://squoosh.app/
```

## Adding Multiple Admins

To add more admin users, repeat Steps 2 & 3:

1. Create new user in Firebase Authentication
2. Copy the User UID
3. Add document in `admins` collection with that UID

## Security Best Practices

1. **Use strong passwords** for admin accounts
2. **Enable 2FA** in Firebase Console (recommended)
3. **Don't share** admin credentials
4. **Regularly review** Firestore security rules
5. **Monitor** Firebase usage and logs
6. **Backup data** regularly through Firestore export

## Firestore Collections Structure

The admin panel manages these collections:

- `properties` - Property listings
- `blogs` - Blog posts
- `services` - Services offered
- `enquiries` - Property enquiries from users
- `contacts` - Contact form submissions
- `cities` - Available cities
- `areas` - Areas within cities
- `admins` - Admin users (read-only from app)

## Troubleshooting

### Can't login?
- Verify admin user exists in Firebase Authentication
- Verify User UID is in `admins` collection
- Check browser console for errors
- Clear browser cache and cookies

### Permission denied errors?
- Ensure Firestore rules are deployed
- Verify you're logged in as admin
- Check Firebase Console for rule errors

### Images not uploading?
- Check file size (max 2MB)
- Compress image before upload
- Verify file type is image/*
- Check browser console for errors

### Data not showing?
- Verify data exists in Firestore
- Check `is_active`/`is_published` flags
- Refresh the page
- Check browser console for errors

## Production Deployment

### Environment Variables (Optional)
For added security in production, you can move Firebase config to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCwm0w10uVJUx-c1ibUnSDnqmhMG8pdfUs
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=shreedhar-c51c5.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=shreedhar-c51c5
```

### Deploy Steps

1. **Deploy Firestore Rules**:
```bash
firebase deploy --only firestore:rules
```

2. **Deploy to Vercel/Netlify**:
```bash
# Build locally to test
npm run build

# Deploy via Git (Vercel/Netlify auto-deploy)
git push origin main
```

3. **Verify Production**:
- Visit `https://yourdomain.com/admin/login`
- Test login with admin credentials
- Verify all CRUD operations work
- Check that public pages show data correctly

## Support

For issues or questions:
1. Check Firebase Console logs
2. Review browser console errors
3. Verify Firestore rules and data structure
4. Test with Firebase Emulator locally

## Next Steps

1. ✅ Set up Firebase Authentication
2. ✅ Create admin user
3. ✅ Add admin to Firestore
4. ✅ Deploy security rules
5. ✅ Login to admin panel
6. ✅ Add your first property/blog/service
7. ✅ Test enquiry and contact forms
8. ✅ Deploy to production

Happy managing! 🎉
