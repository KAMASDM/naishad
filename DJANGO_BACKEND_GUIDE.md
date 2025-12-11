# Django Backend - Quick Start Guide

This guide will help you create the Django backend for your RealEstate website.

## 🚀 Step 1: Create Django Project

```bash
# Navigate to your workspace
cd /Users/jigardesai/Desktop/naishad

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On macOS/Linux
# venv\Scripts\activate   # On Windows

# Install Django and dependencies
pip install django djangorestframework django-cors-headers Pillow python-decouple

# Create Django project
django-admin startproject backend
cd backend

# Create apps
python manage.py startapp properties
python manage.py startapp blogs
python manage.py startapp enquiries
```

## 📝 Step 2: Configure Settings

Edit `backend/settings.py`:

```python
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Add to INSTALLED_APPS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',
    'corsheaders',
    
    # Your apps
    'properties',
    'blogs',
    'enquiries',
]

# Add CORS middleware (at top of MIDDLEWARE)
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    # ... rest of middleware
]

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 12,
    'DEFAULT_FILTER_BACKENDS': [
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

## 🗄️ Step 3: Create Models

### properties/models.py

```python
from django.db import models
from django.utils.text import slugify

class City(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    
    class Meta:
        verbose_name_plural = "Cities"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name

class Area(models.Model):
    name = models.CharField(max_length=100)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='areas')
    slug = models.SlugField(blank=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.name}, {self.city.name}"

class Property(models.Model):
    PROPERTY_TYPES = [
        ('apartment', 'Apartment'),
        ('villa', 'Villa'),
        ('penthouse', 'Penthouse'),
        ('studio', 'Studio'),
        ('duplex', 'Duplex'),
        ('commercial', 'Commercial'),
    ]
    
    STATUS_CHOICES = [
        ('for_sale', 'For Sale'),
        ('for_rent', 'For Rent'),
        ('sold', 'Sold'),
        ('rented', 'Rented'),
    ]
    
    FURNISHED_CHOICES = [
        ('furnished', 'Fully Furnished'),
        ('semi_furnished', 'Semi-Furnished'),
        ('unfurnished', 'Unfurnished'),
    ]
    
    # Basic Info
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    
    # Location
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='properties')
    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name='properties')
    location = models.CharField(max_length=255)
    
    # Property Details
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='for_sale')
    price = models.DecimalField(max_digits=12, decimal_places=2)
    
    # Specifications
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    sqft = models.IntegerField()
    parking = models.IntegerField(default=0)
    floor = models.CharField(max_length=50, blank=True)
    total_floors = models.IntegerField(null=True, blank=True)
    facing = models.CharField(max_length=20, blank=True)
    age_of_property = models.CharField(max_length=50, blank=True)
    furnished = models.CharField(max_length=20, choices=FURNISHED_CHOICES)
    
    # Additional Info
    amenities = models.JSONField(default=list)
    nearby_places = models.JSONField(default=list)
    featured = models.BooleanField(default=False)
    
    # Contact
    contact_person = models.CharField(max_length=100)
    contact_phone = models.CharField(max_length=20)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='properties/')
    is_primary = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"Image for {self.property.title}"
```

### blogs/models.py

```python
from django.db import models
from django.utils.text import slugify

class Blog(models.Model):
    CATEGORY_CHOICES = [
        ('market_trends', 'Market Trends'),
        ('buying_guide', 'Buying Guide'),
        ('investment', 'Investment'),
        ('luxury', 'Luxury'),
        ('finance', 'Finance'),
        ('lifestyle', 'Lifestyle'),
    ]
    
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    excerpt = models.TextField()
    content = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    author = models.CharField(max_length=100)
    image = models.ImageField(upload_to='blogs/', null=True, blank=True)
    published_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-published_date']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title
```

### enquiries/models.py

```python
from django.db import models

class Enquiry(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    property_interest = models.CharField(max_length=100, blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Enquiries"
    
    def __str__(self):
        return f"{self.name} - {self.created_at.strftime('%Y-%m-%d')}"

class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"
```

## 🔧 Step 4: Create Serializers

Create `properties/serializers.py`:

```python
from rest_framework import serializers
from .models import Property, PropertyImage, City, Area

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['image', 'is_primary', 'order']

class PropertyListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Property
        fields = ['id', 'slug', 'title', 'location', 'area', 'city', 
                 'price', 'bedrooms', 'bathrooms', 'sqft', 'property_type', 
                 'image', 'featured']
    
    def get_image(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()
        if primary_image:
            request = self.context.get('request')
            return request.build_absolute_uri(primary_image.image.url) if request else primary_image.image.url
        return None

class PropertyDetailSerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    city = serializers.CharField(source='city.name')
    area = serializers.CharField(source='area.name')
    
    class Meta:
        model = Property
        fields = '__all__'

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ['id', 'name', 'slug']

class CitySerializer(serializers.ModelSerializer):
    areas = AreaSerializer(many=True, read_only=True)
    
    class Meta:
        model = City
        fields = ['id', 'name', 'slug', 'areas']
```

Create similar serializers for blogs and enquiries.

## 🌐 Step 5: Create Views

Create `properties/views.py`:

```python
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Property, City, Area
from .serializers import (
    PropertyListSerializer, 
    PropertyDetailSerializer,
    CitySerializer
)

class PropertyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Property.objects.all()
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['property_type', 'city', 'area', 'bedrooms', 'status']
    search_fields = ['title', 'location', 'description']
    ordering_fields = ['price', 'created_at', 'sqft']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PropertyDetailSerializer
        return PropertyListSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_properties = self.queryset.filter(featured=True)[:6]
        serializer = self.get_serializer(featured_properties, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        queryset = self.queryset
        
        # Apply filters
        area = request.query_params.get('area')
        property_type = request.query_params.get('propertyType')
        bhk = request.query_params.get('bhk')
        budget = request.query_params.get('budget')
        sqft = request.query_params.get('sqft')
        
        if area:
            queryset = queryset.filter(area__slug=area)
        if property_type:
            queryset = queryset.filter(property_type=property_type)
        if bhk:
            queryset = queryset.filter(bedrooms=bhk)
        if budget:
            min_price, max_price = budget.split('-')
            queryset = queryset.filter(price__gte=min_price, price__lte=max_price)
        if sqft:
            min_sqft, max_sqft = sqft.split('-')
            queryset = queryset.filter(sqft__gte=min_sqft, sqft__lte=max_sqft)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    
    @action(detail=True, methods=['get'])
    def areas(self, request, pk=None):
        city = self.get_object()
        areas = city.areas.all()
        serializer = AreaSerializer(areas, many=True)
        return Response(serializer.data)
```

## 🛣️ Step 6: Create URLs

Create `properties/urls.py`:

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, CityViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'cities', CityViewSet)

urlpatterns = router.urls
```

Update `backend/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('properties.urls')),
    path('api/', include('blogs.urls')),
    path('api/', include('enquiries.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

## 📊 Step 7: Create Admin

Create `properties/admin.py`:

```python
from django.contrib import admin
from .models import Property, PropertyImage, City, Area

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ['title', 'city', 'area', 'price', 'property_type', 'featured', 'created_at']
    list_filter = ['property_type', 'city', 'featured', 'status']
    search_fields = ['title', 'location', 'description']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [PropertyImageInline]

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ['name']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
    list_display = ['name', 'city']
    list_filter = ['city']
    prepopulated_fields = {'slug': ('name',)}
```

## 🚀 Step 8: Run Migrations

```bash
# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver
```

## 📝 Step 9: Add Sample Data

```python
# Create management command: properties/management/commands/load_sample_data.py

from django.core.management.base import BaseCommand
from properties.models import City, Area, Property

class Command(BaseCommand):
    help = 'Load sample data'
    
    def handle(self, *args, **options):
        # Create Mumbai city
        mumbai = City.objects.create(name='Mumbai')
        
        # Create areas
        areas = ['Andheri', 'Bandra', 'Worli', 'Powai', 'Juhu']
        for area_name in areas:
            Area.objects.create(name=area_name, city=mumbai)
        
        self.stdout.write(self.style.SUCCESS('Sample data loaded!'))
```

Run: `python manage.py load_sample_data`

## ✅ Step 10: Test API

Visit these URLs:
- http://localhost:8000/api/properties/
- http://localhost:8000/api/properties/featured/
- http://localhost:8000/api/cities/
- http://localhost:8000/admin/

## 🔗 Step 11: Connect to Frontend

Update Next.js `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

In your API files, uncomment the real API calls and comment out mock data.

## 🎉 Done!

Your Django backend is now ready and connected to your Next.js frontend!

**Both servers running:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Admin: http://localhost:8000/admin

---

**Need more help?** Check Django REST Framework docs: https://www.django-rest-framework.org/
