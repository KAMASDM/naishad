// Firebase Firestore Database Utilities
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc,
  updateDoc,
  deleteDoc,
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

// Helper function to convert image file to base64
export async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

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
      let q = collection(db, COLLECTIONS.PROPERTIES);
      
      // If no filters, just get all active properties
      if (!filters.property_type && !filters.bedrooms && !filters.featured) {
        q = query(q, where('is_active', '==', true), orderBy('created_at', 'desc'));
        
        if (filters.limit) {
          q = query(q, limit(parseInt(filters.limit)));
        }
      } else {
        // Build query with filters
        let constraints = [where('is_active', '==', true)];
        
        if (filters.property_type) {
          constraints.push(where('property_type', '==', filters.property_type));
        }
        
        if (filters.bedrooms) {
          constraints.push(where('bedrooms', '==', parseInt(filters.bedrooms)));
        }
        
        if (filters.featured !== undefined) {
          constraints.push(where('featured', '==', filters.featured));
        }
        
        constraints.push(orderBy('created_at', 'desc'));
        
        if (filters.limit) {
          constraints.push(limit(parseInt(filters.limit)));
        }
        
        q = query(q, ...constraints);
      }
      
      const snapshot = await getDocs(q);
      const properties = snapshot.docs.map(doc => ({
        id: doc.id,
        ...formatPropertyData(doc.data())
      }));
      
      return properties;
    } catch (error) {
      console.error('Error fetching properties:', error);
      // If index error, try simpler query
      if (error.code === 'failed-precondition' || error.message?.includes('index')) {
        console.log('Index building, fetching all properties...');
        try {
          const snapshot = await getDocs(collection(db, COLLECTIONS.PROPERTIES));
          return snapshot.docs.map(doc => ({
            id: doc.id,
            ...formatPropertyData(doc.data())
          }));
        } catch (fallbackError) {
          console.error('Fallback query failed:', fallbackError);
          return [];
        }
      }
      return [];
    }
  },

  async getPropertyBySlug(slug) {
    try {
      // Decode URL-encoded slug
      const decodedSlug = decodeURIComponent(slug);
      
      const q = query(
        collection(db, COLLECTIONS.PROPERTIES),
        where('slug', '==', decodedSlug),
        where('is_active', '==', true)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        console.log('Property not found with slug:', decodedSlug);
        return null;
      }
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...formatPropertyData(doc.data())
      };
    } catch (error) {
      console.error('Error fetching property by slug:', error);
      
      // Fallback: if index error, fetch all and filter manually
      if (error.code === 'failed-precondition' || error.message?.includes('index')) {
        console.log('Index building, fetching all properties and filtering...');
        try {
          const decodedSlug = decodeURIComponent(slug);
          const snapshot = await getDocs(collection(db, COLLECTIONS.PROPERTIES));
          const properties = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          const found = properties.find(p => p.slug === decodedSlug && p.is_active === true);
          if (found) {
            return {
              id: found.id,
              ...formatPropertyData(found)
            };
          }
          return null;
        } catch (fallbackError) {
          console.error('Fallback query failed:', fallbackError);
          return null;
        }
      }
      
      return null;
    }
  },

  // Blogs
  async getBlogs(filters = {}) {
    try {
      let q = collection(db, COLLECTIONS.BLOGS);
      
      // Build query with filters
      let constraints = [where('is_published', '==', true)];
      
      if (filters.category) {
        constraints.push(where('category', '==', filters.category));
      }
      
      if (filters.featured !== undefined) {
        constraints.push(where('featured', '==', filters.featured));
      }
      
      constraints.push(orderBy('published_date', 'desc'));
      
      if (filters.limit) {
        constraints.push(limit(parseInt(filters.limit)));
      }
      
      q = query(q, ...constraints);
      
      const snapshot = await getDocs(q);
      const blogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...formatBlogData(doc.data())
      }));
      
      return blogs;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // If index error, try simpler query
      if (error.code === 'failed-precondition' || error.message?.includes('index')) {
        console.log('Index building, fetching all blogs...');
        try {
          const snapshot = await getDocs(collection(db, COLLECTIONS.BLOGS));
          return snapshot.docs.map(doc => ({
            id: doc.id,
            ...formatBlogData(doc.data())
          }));
        } catch (fallbackError) {
          console.error('Fallback query failed:', fallbackError);
          return [];
        }
      }
      return [];
    }
  },

  async getBlogBySlug(slug) {
    try {
      // Decode URL-encoded slug
      const decodedSlug = decodeURIComponent(slug);
      
      const q = query(
        collection(db, COLLECTIONS.BLOGS),
        where('slug', '==', decodedSlug),
        where('is_published', '==', true)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        console.log('Blog not found with slug:', decodedSlug);
        return null;
      }
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...formatBlogData(doc.data())
      };
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      
      // Fallback: if index error, fetch all and filter manually
      if (error.code === 'failed-precondition' || error.message?.includes('index')) {
        console.log('Index building, fetching all blogs and filtering...');
        try {
          const decodedSlug = decodeURIComponent(slug);
          const snapshot = await getDocs(collection(db, COLLECTIONS.BLOGS));
          const blogs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          const found = blogs.find(b => b.slug === decodedSlug && b.is_published === true);
          if (found) {
            return {
              id: found.id,
              ...formatBlogData(found)
            };
          }
          return null;
        } catch (fallbackError) {
          console.error('Fallback query failed:', fallbackError);
          return null;
        }
      }
      
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

// Admin CRUD Operations
export const adminDB = {
  // Properties Management
  async createProperty(data) {
    try {
      const propertyData = {
        ...data,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      };
      const docRef = await addDoc(collection(db, COLLECTIONS.PROPERTIES), propertyData);
      return { id: docRef.id, ...propertyData };
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },

  async updateProperty(id, data) {
    try {
      const propertyRef = doc(db, COLLECTIONS.PROPERTIES, id);
      const updateData = {
        ...data,
        updated_at: Timestamp.now(),
      };
      await updateDoc(propertyRef, updateData);
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  },

  async deleteProperty(id) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.PROPERTIES, id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  },

  async getAllProperties() {
    try {
      const q = query(collection(db, COLLECTIONS.PROPERTIES), orderBy('created_at', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching all properties:', error);
      return [];
    }
  },

  // Blogs Management
  async createBlog(data) {
    try {
      const blogData = {
        ...data,
        published_date: Timestamp.now(),
        updated_date: Timestamp.now(),
      };
      const docRef = await addDoc(collection(db, COLLECTIONS.BLOGS), blogData);
      return { id: docRef.id, ...blogData };
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  async updateBlog(id, data) {
    try {
      const blogRef = doc(db, COLLECTIONS.BLOGS, id);
      const updateData = {
        ...data,
        updated_date: Timestamp.now(),
      };
      await updateDoc(blogRef, updateData);
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  async deleteBlog(id) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.BLOGS, id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },

  async getAllBlogs() {
    try {
      const q = query(collection(db, COLLECTIONS.BLOGS), orderBy('published_date', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching all blogs:', error);
      return [];
    }
  },

  async getBlogById(id) {
    try {
      const blogDoc = await getDoc(doc(db, COLLECTIONS.BLOGS, id));
      if (blogDoc.exists()) {
        return { id: blogDoc.id, ...blogDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      throw error;
    }
  },

  // Services Management
  async createService(data) {
    try {
      const serviceData = {
        ...data,
        created_at: Timestamp.now(),
      };
      const docRef = await addDoc(collection(db, COLLECTIONS.SERVICES), serviceData);
      return { id: docRef.id, ...serviceData };
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },

  async updateService(id, data) {
    try {
      const serviceRef = doc(db, COLLECTIONS.SERVICES, id);
      await updateDoc(serviceRef, data);
      return { id, ...data };
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  },

  async deleteService(id) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.SERVICES, id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  },

  async getServiceById(id) {
    try {
      const serviceDoc = await getDoc(doc(db, COLLECTIONS.SERVICES, id));
      if (serviceDoc.exists()) {
        return { id: serviceDoc.id, ...serviceDoc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error fetching service by ID:', error);
      throw error;
    }
  },

  async getAllServices() {
    try {
      const q = query(collection(db, COLLECTIONS.SERVICES), orderBy('display_order', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching all services:', error);
      return [];
    }
  },

  // Enquiries Management
  async getAllEnquiries() {
    try {
      const q = query(collection(db, COLLECTIONS.ENQUIRIES), orderBy('created_at', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      return [];
    }
  },

  async markEnquiryAsRead(id) {
    try {
      const enquiryRef = doc(db, COLLECTIONS.ENQUIRIES, id);
      await updateDoc(enquiryRef, { is_read: true });
      return { success: true };
    } catch (error) {
      console.error('Error marking enquiry as read:', error);
      throw error;
    }
  },

  async deleteEnquiry(id) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.ENQUIRIES, id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      throw error;
    }
  },

  // Contacts Management
  async getAllContacts() {
    try {
      const q = query(collection(db, COLLECTIONS.CONTACTS), orderBy('created_at', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  },

  async markContactAsRead(id) {
    try {
      const contactRef = doc(db, COLLECTIONS.CONTACTS, id);
      await updateDoc(contactRef, { is_read: true });
      return { success: true };
    } catch (error) {
      console.error('Error marking contact as read:', error);
      throw error;
    }
  },

  async deleteContact(id) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.CONTACTS, id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },

  // Cities Management
  async createCity(data) {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.CITIES), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error('Error creating city:', error);
      throw error;
    }
  },

  async deleteCity(id) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.CITIES, id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting city:', error);
      throw error;
    }
  },

  // Areas Management
  async createArea(data) {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.AREAS), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error('Error creating area:', error);
      throw error;
    }
  },

  async deleteArea(id) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.AREAS, id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting area:', error);
      throw error;
    }
  },
};

