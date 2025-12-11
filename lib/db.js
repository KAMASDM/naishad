import { neon } from '@netlify/neon';

// Initialize Neon database connection
// Automatically uses NETLIFY_DATABASE_URL environment variable
export const sql = neon();

// Helper function to format property data
export function formatPropertyData(property) {
  return {
    ...property,
    amenities_list: property.amenities ? property.amenities.split(',').map(a => a.trim()) : [],
    price: parseFloat(property.price),
  };
}

// Helper function to format blog data
export function formatBlogData(blog) {
  return {
    ...blog,
    published_date: blog.published_date?.toISOString() || new Date().toISOString(),
    updated_date: blog.updated_date?.toISOString() || new Date().toISOString(),
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

// Database query helpers
export const db = {
  // Properties
  async getProperties(filters = {}) {
    let query = `
      SELECT 
        p.*,
        c.name as city_name,
        a.name as area_name,
        (SELECT image_url FROM property_images WHERE property_id = p.id AND is_primary = true LIMIT 1) as primary_image
      FROM properties p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN areas a ON p.area_id = a.id
      WHERE p.is_active = true
    `;
    
    const params = [];
    
    if (filters.property_type) {
      params.push(filters.property_type);
      query += ` AND p.property_type = $${params.length}`;
    }
    
    if (filters.bedrooms) {
      params.push(filters.bedrooms);
      query += ` AND p.bedrooms = $${params.length}`;
    }
    
    if (filters.area_name) {
      params.push(`%${filters.area_name}%`);
      query += ` AND LOWER(a.name) LIKE LOWER($${params.length})`;
    }
    
    if (filters.search) {
      params.push(`%${filters.search}%`);
      query += ` AND (LOWER(p.title) LIKE LOWER($${params.length}) OR LOWER(p.description) LIKE LOWER($${params.length}) OR LOWER(a.name) LIKE LOWER($${params.length}))`;
    }
    
    if (filters.featured !== undefined) {
      params.push(filters.featured);
      query += ` AND p.featured = $${params.length}`;
    }
    
    query += ' ORDER BY p.created_at DESC';
    
    if (filters.limit) {
      params.push(filters.limit);
      query += ` LIMIT $${params.length}`;
    }
    
    const results = await sql(query, params);
    return results.map(formatPropertyData);
  },

  async getPropertyBySlug(slug) {
    const results = await sql`
      SELECT 
        p.*,
        c.name as city_name,
        a.name as area_name,
        COALESCE(
          json_agg(
            json_build_object(
              'id', pi.id,
              'image', pi.image_url,
              'alt_text', pi.alt_text,
              'is_primary', pi.is_primary,
              'order', pi.display_order
            ) ORDER BY pi.display_order, pi.created_at
          ) FILTER (WHERE pi.id IS NOT NULL),
          '[]'
        ) as images
      FROM properties p
      LEFT JOIN cities c ON p.city_id = c.id
      LEFT JOIN areas a ON p.area_id = a.id
      LEFT JOIN property_images pi ON p.id = pi.property_id
      WHERE p.slug = ${slug} AND p.is_active = true
      GROUP BY p.id, c.name, a.name
    `;
    
    if (results.length === 0) return null;
    return formatPropertyData(results[0]);
  },

  // Blogs
  async getBlogs(filters = {}) {
    let query = `
      SELECT * FROM blogs
      WHERE is_published = true
    `;
    
    const params = [];
    
    if (filters.category) {
      params.push(filters.category);
      query += ` AND category = $${params.length}`;
    }
    
    if (filters.featured !== undefined) {
      params.push(filters.featured);
      query += ` AND featured = $${params.length}`;
    }
    
    query += ' ORDER BY published_date DESC';
    
    if (filters.limit) {
      params.push(filters.limit);
      query += ` LIMIT $${params.length}`;
    }
    
    const results = await sql(query, params);
    return results.map(formatBlogData);
  },

  async getBlogBySlug(slug) {
    const results = await sql`
      SELECT * FROM blogs
      WHERE slug = ${slug} AND is_published = true
    `;
    
    if (results.length === 0) return null;
    return formatBlogData(results[0]);
  },

  // Services
  async getServices(filters = {}) {
    let query = `
      SELECT * FROM services
      WHERE is_active = true
    `;
    
    const params = [];
    
    if (filters.service_type) {
      params.push(filters.service_type);
      query += ` AND service_type = $${params.length}`;
    }
    
    if (filters.featured !== undefined) {
      params.push(filters.featured);
      query += ` AND featured = $${params.length}`;
    }
    
    query += ' ORDER BY display_order, created_at DESC';
    
    const results = await sql(query, params);
    return results.map(formatServiceData);
  },

  async getServiceBySlug(slug) {
    const results = await sql`
      SELECT * FROM services
      WHERE slug = ${slug} AND is_active = true
    `;
    
    if (results.length === 0) return null;
    return formatServiceData(results[0]);
  },

  // Cities and Areas
  async getCities() {
    return await sql`
      SELECT * FROM cities
      ORDER BY name
    `;
  },

  async getAreas(cityId = null) {
    if (cityId) {
      return await sql`
        SELECT a.*, c.name as city_name
        FROM areas a
        LEFT JOIN cities c ON a.city_id = c.id
        WHERE a.city_id = ${cityId}
        ORDER BY a.name
      `;
    }
    
    return await sql`
      SELECT a.*, c.name as city_name
      FROM areas a
      LEFT JOIN cities c ON a.city_id = c.id
      ORDER BY a.name
    `;
  },

  // Enquiries
  async createEnquiry(data) {
    const results = await sql`
      INSERT INTO enquiries (name, email, phone, property_interest, message)
      VALUES (${data.name}, ${data.email}, ${data.phone}, ${data.property_interest || ''}, ${data.message})
      RETURNING *
    `;
    return results[0];
  },

  async createContactMessage(data) {
    const results = await sql`
      INSERT INTO contact_messages (name, email, phone, subject, message)
      VALUES (${data.name}, ${data.email}, ${data.phone}, ${data.subject}, ${data.message})
      RETURNING *
    `;
    return results[0];
  },
};
