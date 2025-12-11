// Firebase Firestore Database Utilities
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Collections
const COLLECTIONS = {
  PROPERTIES: 'properties',
  BLOGS: 'blogs',
  SERVICES: 'services',
  ENQUIRIES: 'enquiries',
  CONTACTS: 'contacts',
  CITIES: 'cities',
  AREAS: 'areas',
};

// Helper function to format property data
export function formatPropertyData(property) {
  return {
    ...property,
    amenities_list: property.amenities ? property.amenities.split(',').map(a => a.trim()) : [],
    price: parseFloat(property.price || 0),
    created_at: property.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
  };
}

// Helper function to format blog data
export function formatBlogData(blog) {
  return {
    ...blog,
    published_date: blog.published_date?.toDate?.()?.toISOString() || new Date().toISOString(),
    updated_date: blog.updated_date?.toDate?.()?.toISOString() || new Date().toISOString(),
  };
}

// Helper function to format service data
export function formatServiceData(service) {
  return {
    ...service,
    features_list: service.features ? service.features.split(',').map(f => f.trim()) : [],
    starting_price: service.starting_price ? parseFloat(service.starting_price) : null,
  };
}

// Database operations
export const firebaseDB = {
  // Properties
  async getProperties(filters = {}) {
    try {
      let q = query(collection(db, COLLECTIONS.PROPERTIES), where('is_active', '==', true));
      
      if (filters.property_type) {
        q = query(q, where('property_type', '==', filters.property_type));
      }
      
      if (filters.bedrooms) {
        q = query(q, where('bedrooms', '==', parseInt(filters.bedrooms)));
      }
      
      if (filters.featured !== undefined) {
        q = query(q, where('featured', '==', filters.featured));
      }
      
      q = query(q, orderBy('created_at', 'desc'));
      
      if (filters.limit) {
        q = query(q, limit(parseInt(filters.limit)));
      }
      
      const snapshot = await getDocs(q);
      const properties = snapshot.docs.map(doc => ({
        id: doc.id,
        ...formatPropertyData(doc.data())
      }));
      
      return properties;
    } catch (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
  },

  async getPropertyBySlug(slug) {
    try {
      const q = query(
        collection(db, COLLECTIONS.PROPERTIES),
        where('slug', '==', slug),
        where('is_active', '==', true)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) return null;
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...formatPropertyData(doc.data())
      };
    } catch (error) {
      console.error('Error fetching property:', error);
      return null;
    }
  },

  // Blogs
  async getBlogs(filters = {}) {
    try {
      let q = query(collection(db, COLLECTIONS.BLOGS), where('is_published', '==', true));
      
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }
      
      if (filters.featured !== undefined) {
        q = query(q, where('featured', '==', filters.featured));
      }
      
      q = query(q, orderBy('published_date', 'desc'));
      
      if (filters.limit) {
        q = query(q, limit(parseInt(filters.limit)));
      }
      
      const snapshot = await getDocs(q);
      const blogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...formatBlogData(doc.data())
      }));
      
      return blogs;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  },

  async getBlogBySlug(slug) {
    try {
      const q = query(
        collection(db, COLLECTIONS.BLOGS),
        where('slug', '==', slug),
        where('is_published', '==', true)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) return null;
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...formatBlogData(doc.data())
      };
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  },

  // Services
  async getServices(filters = {}) {
    try {
      let q = query(collection(db, COLLECTIONS.SERVICES), where('is_active', '==', true));
      
      if (filters.service_type) {
        q = query(q, where('service_type', '==', filters.service_type));
      }
      
      if (filters.featured !== undefined) {
        q = query(q, where('featured', '==', filters.featured));
      }
      
      q = query(q, orderBy('display_order', 'asc'));
      
      const snapshot = await getDocs(q);
      const services = snapshot.docs.map(doc => ({
        id: doc.id,
        ...formatServiceData(doc.data())
      }));
      
      return services;
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },

  async getServiceBySlug(slug) {
    try {
      const q = query(
        collection(db, COLLECTIONS.SERVICES),
        where('slug', '==', slug),
        where('is_active', '==', true)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) return null;
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...formatServiceData(doc.data())
      };
    } catch (error) {
      console.error('Error fetching service:', error);
      return null;
    }
  },

  // Cities and Areas
  async getCities() {
    try {
      const q = query(collection(db, COLLECTIONS.CITIES), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching cities:', error);
      return [];
    }
  },

  async getAreas(cityId = null) {
    try {
      let q = query(collection(db, COLLECTIONS.AREAS));
      
      if (cityId) {
        q = query(q, where('city_id', '==', cityId));
      }
      
      q = query(q, orderBy('name', 'asc'));
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching areas:', error);
      return [];
    }
  },

  // Enquiries
  async createEnquiry(data) {
    try {
      const enquiryData = {
        ...data,
        is_read: false,
        is_responded: false,
        created_at: Timestamp.now(),
      };
      
      const docRef = await addDoc(collection(db, COLLECTIONS.ENQUIRIES), enquiryData);
      return { id: docRef.id, ...enquiryData };
    } catch (error) {
      console.error('Error creating enquiry:', error);
      throw error;
    }
  },

  async createContactMessage(data) {
    try {
      const contactData = {
        ...data,
        is_read: false,
        created_at: Timestamp.now(),
      };
      
      const docRef = await addDoc(collection(db, COLLECTIONS.CONTACTS), contactData);
      return { id: docRef.id, ...contactData };
    } catch (error) {
      console.error('Error creating contact message:', error);
      throw error;
    }
  },
};
