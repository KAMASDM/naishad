# Quick Start Guide 🚀

## ✨ **NEW: Now Using Netlify Neon Database!**

No separate Django backend needed! Everything runs in one Next.js application.

---

## Starting the Application

### Single Command Setup:

```bash
# Navigate to project directory
cd /Users/jigardesai/Desktop/naishad/realestate-website

# Start Next.js development server
npm run dev
```

**Application will run on:** http://localhost:3000

That's it! No separate backend server needed! 🎉

---

## Initial Setup (One-Time Only)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
Add your Neon database URL to `.env.local`:

```env
NETLIFY_DATABASE_URL=your_neon_connection_string_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Database Schema
```bash
# Using psql
psql $NETLIFY_DATABASE_URL < db/schema.sql

# Insert sample data
psql $NETLIFY_DATABASE_URL < db/sample-data.sql
```

### 4. Start Development
```bash
npm run dev
```

---

## Quick Access URLs

### Frontend Pages:
- 🏠 Home: http://localhost:3000
- 🏢 Properties: http://localhost:3000/properties
- 📝 Blogs: http://localhost:3000/blogs
- 🛠️ Services: http://localhost:3000/services
- 📧 Contact: http://localhost:3000/contact
- ℹ️ About: http://localhost:3000/about

### API Endpoints (for testing):
- 📊 Properties API: http://localhost:3000/api/properties
- 📰 Blogs API: http://localhost:3000/api/blogs
- 🛠️ Services API: http://localhost:3000/api/services
- 🏙️ Cities API: http://localhost:3000/api/cities

---

## Getting Neon Database

### Option A: Via Netlify (Recommended)
1. Deploy to Netlify
2. Add Neon integration from dashboard
3. Database URL auto-configured

### Option B: Direct Neon Account
1. Visit [console.neon.tech](https://console.neon.tech)
2. Create free account
3. Create new project
4. Copy connection string to `.env.local`

---

## Stopping Server

Press `Ctrl + C` in terminal to stop the development server.

---

## Troubleshooting

### Port 3000 already in use?
```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>
```

### Database connection error?
- Verify `NETLIFY_DATABASE_URL` in `.env.local`
- Check if database schema is created
- Ensure database is accessible

### API routes not working?
```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run dev
```

---

## 📚 Documentation

- **Migration Guide:** [NETLIFY_NEON_MIGRATION.md](./NETLIFY_NEON_MIGRATION.md)
- **API Integration:** [API_INTEGRATION_COMPLETE.md](./API_INTEGRATION_COMPLETE.md)
- **Project Details:** [PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md)

---

## 🚀 Deploy to Netlify

1. Push to GitHub:
   ```bash
   git push origin main
   ```

2. Connect to Netlify:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Import your GitHub repository
   - Add Neon integration
   - Deploy!

---

**Enjoy your simplified, single-server real estate website! 🎉**
