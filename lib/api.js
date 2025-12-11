// API Configuration for Django Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// API Client with better error handling
const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};

// API Endpoints
export const api = {
  // Properties
  getProperties: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient(`/properties/${queryString ? '?' + queryString : ''}`);
  },
  
  getPropertyBySlug: (slug) => {
    return apiClient(`/properties/${slug}/`);
  },
  
  getFeaturedProperties: () => {
    return apiClient('/properties/featured/');
  },
  
  searchProperties: (filters) => {
    // Clean up filter params
    const cleanFilters = {};
    if (filters.area) cleanFilters.area_name = filters.area;
    if (filters.propertyType) cleanFilters.property_type = filters.propertyType;
    if (filters.bhk) cleanFilters.bedrooms = filters.bhk;
    if (filters.search) cleanFilters.search = filters.search;
    
    const queryString = new URLSearchParams(cleanFilters).toString();
    return apiClient(`/properties/search/${queryString ? '?' + queryString : ''}`);
  },
  
  // Cities and Areas
  getCities: () => {
    return apiClient('/cities/');
  },
  
  getAreasByCity: (cityId) => {
    return apiClient(`/areas/by-city/${cityId}/`);
  },
  
  getAreas: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient(`/areas/${queryString ? '?' + queryString : ''}`);
  },
  
  // Blogs
  getBlogs: (page = 1) => {
    return apiClient(`/blogs/?page=${page}`);
  },
  
  getBlogBySlug: (slug) => {
    return apiClient(`/blogs/${slug}/`);
  },
  
  // Enquiries
  submitEnquiry: (data) => {
    return apiClient('/enquiries/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // Contact Form
  submitContactForm: (data) => {
    return apiClient('/contact/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Services
  getServices: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient(`/services/${queryString ? '?' + queryString : ''}`);
  },

  getServiceBySlug: (slug) => {
    return apiClient(`/services/${slug}/`);
  },

  getFeaturedServices: () => {
    return apiClient('/services/?featured=true');
  },
};

export default api;
