// Firebase API Client
import { firebaseDB } from './firestore';

// API Endpoints
export const api = {
  // Properties
  getProperties: async (params = {}) => {
    try {
      const filters = {
        property_type: params.property_type,
        bedrooms: params.bedrooms,
        featured: params.featured,
        limit: params.limit,
      };
      return await firebaseDB.getProperties(filters);
    } catch (error) {
      console.error('Error getting properties:', error);
      return [];
    }
  },
  
  getPropertyBySlug: async (slug) => {
    try {
      return await firebaseDB.getPropertyBySlug(slug);
    } catch (error) {
      console.error('Error getting property:', error);
      return null;
    }
  },
  
  getFeaturedProperties: async () => {
    try {
      return await firebaseDB.getProperties({ featured: true, limit: 6 });
    } catch (error) {
      console.error('Error getting featured properties:', error);
      return [];
    }
  },
  
  searchProperties: async (filters) => {
    try {
      // Map frontend filter names to database fields
      const dbFilters = {};
      if (filters.propertyType) dbFilters.property_type = filters.propertyType;
      if (filters.bhk) dbFilters.bedrooms = parseInt(filters.bhk);
      
      return await firebaseDB.getProperties(dbFilters);
    } catch (error) {
      console.error('Error searching properties:', error);
      return [];
    }
  },
  
  // Cities and Areas
  getCities: async () => {
    try {
      return await firebaseDB.getCities();
    } catch (error) {
      console.error('Error getting cities:', error);
      return [];
    }
  },
  
  getAreasByCity: async (cityId) => {
    try {
      return await firebaseDB.getAreas(cityId);
    } catch (error) {
      console.error('Error getting areas:', error);
      return [];
    }
  },
  
  getAreas: async (params = {}) => {
    try {
      return await firebaseDB.getAreas(params.city_id);
    } catch (error) {
      console.error('Error getting areas:', error);
      return [];
    }
  },
  
  // Blogs
  getBlogs: async (page = 1) => {
    try {
      // Firebase doesn't use pagination in the same way
      // You can implement offset-based pagination if needed
      return await firebaseDB.getBlogs({});
    } catch (error) {
      console.error('Error getting blogs:', error);
      return [];
    }
  },
  
  getBlogBySlug: async (slug) => {
    try {
      return await firebaseDB.getBlogBySlug(slug);
    } catch (error) {
      console.error('Error getting blog:', error);
      return null;
    }
  },
  
  // Enquiries
  submitEnquiry: async (data) => {
    try {
      return await firebaseDB.createEnquiry(data);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      throw error;
    }
  },
  
  // Contact Form
  submitContactForm: async (data) => {
    try {
      return await firebaseDB.createContactMessage(data);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  // Services
  getServices: async (params = {}) => {
    try {
      const filters = {
        service_type: params.service_type,
        featured: params.featured,
      };
      return await firebaseDB.getServices(filters);
    } catch (error) {
      console.error('Error getting services:', error);
      return [];
    }
  },

  getServiceBySlug: async (slug) => {
    try {
      return await firebaseDB.getServiceBySlug(slug);
    } catch (error) {
      console.error('Error getting service:', error);
      return null;
    }
  },

  getFeaturedServices: async () => {
    try {
      return await firebaseDB.getServices({ featured: true });
    } catch (error) {
      console.error('Error getting featured services:', error);
      return [];
    }
  },
};

export default api;
