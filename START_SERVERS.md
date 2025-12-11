# Quick Start Guide 🚀

## Starting Both Servers

### Terminal 1 - Django Backend

```bash
# Navigate to backend directory
cd /Users/jigardesai/Desktop/naishad/realestate-backend

# Activate virtual environment (if using one)
source venv/bin/activate

# Start Django server
python manage.py runserver
```

**Backend will run on:** http://localhost:8000

---

### Terminal 2 - Next.js Frontend

```bash
# Navigate to frontend directory
cd /Users/jigardesai/Desktop/naishad/realestate-website

# Start Next.js development server
npm run dev
```

**Frontend will run on:** http://localhost:3000

---

## Quick Access URLs

### Frontend Pages:
- 🏠 Home: http://localhost:3000
- 🏢 Properties: http://localhost:3000/properties
- 📝 Blogs: http://localhost:3000/blogs
- 🛠️ Services: http://localhost:3000/services
- 📧 Contact: http://localhost:3000/contact
- ℹ️ About: http://localhost:3000/about

### Backend Admin:
- 🔐 Django Admin: http://localhost:8000/admin
  - Create superuser first: `python manage.py createsuperuser`

### API Endpoints:
- 📊 Properties API: http://localhost:8000/api/properties/
- 📰 Blogs API: http://localhost:8000/api/blogs/
- 🛠️ Services API: http://localhost:8000/api/services/
- 🏙️ Cities API: http://localhost:8000/api/cities/
- 📍 Areas API: http://localhost:8000/api/areas/

---

## Stopping Servers

Press `Ctrl + C` in each terminal window to stop the servers.

---

## Troubleshooting

### Backend not starting?
```bash
# Check if port 8000 is in use
lsof -i :8000

# Kill process if needed
kill -9 <PID>
```

### Frontend not starting?
```bash
# Check if port 3000 is in use
lsof -i :3000

# Clear Next.js cache and restart
rm -rf .next
npm run dev
```

### Database migrations needed?
```bash
cd /Users/jigardesai/Desktop/naishad/realestate-backend
python manage.py makemigrations
python manage.py migrate
```

---

## First Time Setup

### Backend Setup:
```bash
cd /Users/jigardesai/Desktop/naishad/realestate-backend

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install django djangorestframework django-cors-headers django-filter Pillow python-decouple django-jazzmin

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load sample data (if available)
python manage.py loaddata initial_data.json

# Start server
python manage.py runserver
```

### Frontend Setup:
```bash
cd /Users/jigardesai/Desktop/naishad/realestate-website

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## Production Build

### Frontend:
```bash
npm run build
npm start
```

### Backend:
- Configure production settings
- Use PostgreSQL database
- Set DEBUG=False
- Configure allowed hosts
- Set up static/media file serving
- Use gunicorn or similar WSGI server

---

**Note:** Make sure both servers are running for the website to work properly!
