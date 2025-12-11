# Netlify Neon Database Migration Guide

## ✅ Migration Complete!

Your real estate website has been successfully migrated from Django backend to **Netlify Neon Database** with Next.js API routes.

---

## 🎯 What Changed

### **Before (Django Backend)**
- Separate Django server running on port 8000
- Django REST Framework for API
- Two servers to manage (Next.js + Django)
- CORS configuration needed

### **After (Netlify Neon)**
- Single Next.js application
- Built-in Next.js API routes (`/api/*`)
- Direct Neon PostgreSQL database connection
- No separate backend server needed
- Perfect for Netlify deployment

---

## 📦 New Dependencies

```json
{
  "@netlify/neon": "^1.x.x"
}
```

---

## 🗂️ New Project Structure

```
realestate-website/
├── app/
│   ├── api/                    # ✨ NEW: API Routes
│   │   ├── properties/
│   │   │   ├── route.js       # GET /api/properties
│   │   │   ├── featured/
│   │   │   │   └── route.js   # GET /api/properties/featured
│   │   │   ├── search/
│   │   │   │   └── route.js   # GET /api/properties/search
│   │   │   └── [slug]/
│   │   │       └── route.js   # GET /api/properties/:slug
│   │   ├── blogs/
│   │   │   ├── route.js       # GET /api/blogs
│   │   │   └── [slug]/
│   │   │       └── route.js   # GET /api/blogs/:slug
│   │   ├── services/
│   │   │   ├── route.js       # GET /api/services
│   │   │   └── [slug]/
│   │   │       └── route.js   # GET /api/services/:slug
│   │   ├── enquiries/
│   │   │   └── route.js       # POST /api/enquiries
│   │   ├── contact/
│   │   │   └── route.js       # POST /api/contact
│   │   ├── cities/
│   │   │   └── route.js       # GET /api/cities
│   │   └── areas/
│   │       ├── route.js       # GET /api/areas
│   │       └── by-city/
│   │           └── [cityId]/
│   │               └── route.js
│   └── ... (existing pages)
├── db/
│   └── schema.sql             # ✨ NEW: Database schema
├── lib/
│   ├── db.js                  # ✨ NEW: Database utilities
│   └── api.js                 # ✅ UPDATED: Now uses /api routes
└── .env.local                 # ✅ UPDATED: Neon database URL

```

---

## 🔧 Setup Instructions

### 1. **Create Neon Database**

#### Option A: Via Netlify Dashboard
1. Go to your Netlify site dashboard
2. Navigate to **Site Configuration** → **Environment Variables**
3. Add integration for **Neon PostgreSQL**
4. Netlify will automatically create `NETLIFY_DATABASE_URL`

#### Option B: Standalone Neon Account
1. Go to [console.neon.tech](https://console.neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to `.env.local`:
   ```env
   NETLIFY_DATABASE_URL=postgresql://user:password@host/database
   ```

### 2. **Run Database Migrations**

You can run the schema using any PostgreSQL client:

```bash
# Using psql
psql $NETLIFY_DATABASE_URL < db/schema.sql

# Using Neon SQL Editor (in browser)
# Copy contents of db/schema.sql and paste in SQL Editor
```

### 3. **Seed Initial Data** (Optional)

Connect to your database and insert sample data:

```sql
-- Insert Mumbai city
INSERT INTO cities (name, state, slug) VALUES ('Mumbai', 'Maharashtra', 'mumbai');

-- Insert areas
INSERT INTO areas (name, city_id, slug, description) VALUES
  ('Andheri', 1, 'andheri-mumbai', 'Popular suburb in Western Mumbai'),
  ('Bandra', 1, 'bandra-mumbai', 'Queen of Suburbs'),
  ('Worli', 1, 'worli-mumbai', 'Upscale neighborhood'),
  ('Powai', 1, 'powai-mumbai', 'IT hub with lake view');

-- Insert sample properties
INSERT INTO properties (
  title, slug, description, city_id, area_id, location, 
  property_type, status, price, bedrooms, bathrooms, sqft, 
  furnished, parking, floor, total_floors, amenities, featured
) VALUES
  (
    'Luxury 3 BHK in Andheri',
    'luxury-3bhk-andheri',
    'Spacious 3 BHK apartment with modern amenities in prime Andheri location.',
    1, 1, 'Andheri West',
    'apartment', 'for_sale', 25000000, 3, 3, 1450,
    'semi_furnished', 2, '12th Floor', 25,
    'Swimming Pool,Gym,Parking,Security,Power Backup,Lift,Club House',
    true
  );

-- Add more properties, blogs, services as needed
```

### 4. **Environment Variables**

Update your `.env.local`:

```env
# Netlify Neon Database
NETLIFY_DATABASE_URL=your_neon_connection_string_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. **Start Development Server**

```bash
npm run dev
```

Your app will now use the Neon database via Next.js API routes!

---

## 🌐 API Endpoints

All endpoints now work locally at `http://localhost:3000/api/*`:

### Properties
- `GET /api/properties` - List all properties
- `GET /api/properties?property_type=apartment&bedrooms=3` - Filter properties
- `GET /api/properties/featured` - Featured properties
- `GET /api/properties/search?search=andheri&area_name=bandra` - Search
- `GET /api/properties/:slug` - Single property

### Blogs
- `GET /api/blogs` - List all blogs
- `GET /api/blogs?category=market_trends&featured=true` - Filter blogs
- `GET /api/blogs/:slug` - Single blog

### Services
- `GET /api/services` - List all services
- `GET /api/services?featured=true` - Featured services
- `GET /api/services/:slug` - Single service

### Forms
- `POST /api/enquiries` - Submit enquiry
- `POST /api/contact` - Submit contact form

### Cities & Areas
- `GET /api/cities` - List all cities
- `GET /api/areas` - List all areas
- `GET /api/areas?city=1` - Areas by city
- `GET /api/areas/by-city/:cityId` - Areas by city ID

---

## 📝 Database Schema

The database has 8 tables:

1. **cities** - Mumbai and other cities
2. **areas** - Neighborhoods (Andheri, Bandra, etc.)
3. **properties** - Property listings
4. **property_images** - Property photos
5. **blogs** - Blog posts
6. **services** - Services offered
7. **enquiries** - User enquiries
8. **contact_messages** - Contact form submissions

Full schema is in `db/schema.sql`.

---

## 🚀 Deployment to Netlify

### 1. **Push to GitHub**

```bash
git add .
git commit -m "Migrate to Netlify Neon database"
git push origin main
```

### 2. **Connect to Netlify**

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to your GitHub repository
4. Build settings will be auto-detected:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

### 3. **Add Neon Database Integration**

1. In Netlify dashboard → **Integrations**
2. Search for "Neon" and click "Enable"
3. Create new database or connect existing
4. `NETLIFY_DATABASE_URL` will be automatically set

### 4. **Deploy!**

Click "Deploy site" and your site will be live!

---

## ✨ Benefits of This Migration

### ✅ Simplified Architecture
- Single codebase instead of two
- No separate backend server
- Easier to maintain and deploy

### ✅ Better Performance
- Server-side rendering with database access
- No CORS issues
- Faster API responses (same server)

### ✅ Cost Effective
- No need for separate backend hosting
- Netlify's generous free tier
- Neon's free PostgreSQL tier

### ✅ Scalability
- Auto-scaling with Netlify
- Neon database auto-scaling
- Serverless architecture

### ✅ Developer Experience
- Single `npm run dev` command
- Hot reload for API changes
- TypeScript support (if needed)

---

## 🔄 Migrating Existing Django Data

If you have data in your Django SQLite database:

### 1. **Export from Django**

```bash
cd /Users/jigardesai/Desktop/naishad/realestate-backend
python manage.py dumpdata properties blogs services enquiries > data.json
```

### 2. **Convert to SQL**

Create a Python script to convert Django JSON to SQL:

```python
import json

with open('data.json') as f:
    data = json.load(f)

# Generate INSERT statements based on your data
# Match field names to Neon schema
```

### 3. **Import to Neon**

```bash
psql $NETLIFY_DATABASE_URL < converted_data.sql
```

---

## 🧪 Testing

Test all endpoints:

```bash
# Properties
curl http://localhost:3000/api/properties

# Single property
curl http://localhost:3000/api/properties/luxury-3bhk-andheri

# Featured properties
curl http://localhost:3000/api/properties/featured

# Blogs
curl http://localhost:3000/api/blogs

# Services
curl http://localhost:3000/api/services

# Submit enquiry
curl -X POST http://localhost:3000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"9876543210","message":"Test enquiry"}'
```

---

## 📊 Database Management

### Using Neon Console
1. Go to [console.neon.tech](https://console.neon.tech)
2. Select your project
3. Use **SQL Editor** to run queries
4. View tables, data, and run migrations

### Using TablePlus / DataGrip
1. Create new PostgreSQL connection
2. Use `NETLIFY_DATABASE_URL` connection string
3. Manage database visually

### Backup & Restore
Neon provides automatic backups. You can also:

```bash
# Backup
pg_dump $NETLIFY_DATABASE_URL > backup.sql

# Restore
psql $NETLIFY_DATABASE_URL < backup.sql
```

---

## 🐛 Troubleshooting

### Database connection errors
- Verify `NETLIFY_DATABASE_URL` is set correctly
- Check if database is accessible from your IP
- Ensure schema is created

### API routes not working
- Check file paths: `app/api/properties/route.js`
- Verify imports: `import { db } from '@/lib/db'`
- Check Next.js console for errors

### Queries failing
- Verify table names match schema
- Check for SQL syntax errors
- Look at database logs in Neon console

---

## 📚 Resources

- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Neon Documentation](https://neon.tech/docs/introduction)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

## ✅ Migration Complete!

You can now:
1. ✅ Run single server with `npm run dev`
2. ✅ Deploy to Netlify with one click
3. ✅ Manage database via Neon console
4. ✅ Scale automatically
5. ✅ No Django backend needed!

**Your site is now using Netlify Neon Database! 🎉**
