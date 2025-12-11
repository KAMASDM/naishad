-- Real Estate Database Schema for Netlify Neon

-- Cities Table
CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    state VARCHAR(100) DEFAULT 'Maharashtra',
    slug VARCHAR(120) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Areas Table
CREATE TABLE IF NOT EXISTS areas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(city_id, name)
);

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    city_id INTEGER REFERENCES cities(id) ON DELETE CASCADE,
    area_id INTEGER REFERENCES areas(id) ON DELETE CASCADE,
    location VARCHAR(200) NOT NULL,
    address TEXT,
    property_type VARCHAR(20) NOT NULL CHECK (property_type IN ('apartment', 'villa', 'penthouse', 'studio', 'duplex', 'commercial')),
    status VARCHAR(10) DEFAULT 'for_sale' CHECK (status IN ('for_sale', 'for_rent', 'sold', 'rented')),
    price DECIMAL(12, 2) NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    sqft INTEGER NOT NULL,
    furnished VARCHAR(20) DEFAULT 'semi_furnished' CHECK (furnished IN ('furnished', 'semi_furnished', 'unfurnished')),
    parking INTEGER DEFAULT 0,
    floor VARCHAR(50),
    total_floors INTEGER,
    facing VARCHAR(15) CHECK (facing IN ('north', 'south', 'east', 'west', 'north_east', 'north_west', 'south_east', 'south_west')),
    age_of_property VARCHAR(50),
    amenities TEXT,
    nearby_places TEXT,
    featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Property Images Table
CREATE TABLE IF NOT EXISTS property_images (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(200),
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('market_trends', 'buying_guide', 'investment', 'legal', 'home_decor', 'news')),
    author VARCHAR(100) DEFAULT 'Admin',
    image_url TEXT,
    meta_description VARCHAR(160),
    is_published BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(250) NOT NULL UNIQUE,
    service_type VARCHAR(30) NOT NULL CHECK (service_type IN ('property_management', 'home_loan', 'legal_services', 'interior_design', 'vastu_consultation', 'property_valuation', 'relocation', 'rental_services')),
    description TEXT NOT NULL,
    short_description VARCHAR(300),
    icon VARCHAR(100),
    image_url TEXT,
    starting_price DECIMAL(10, 2),
    price_description VARCHAR(200),
    features TEXT,
    meta_description VARCHAR(160),
    is_active BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    property_interest VARCHAR(250),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_responded BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city_id);
CREATE INDEX IF NOT EXISTS idx_properties_area ON properties(area_id);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_is_active ON properties(is_active);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(featured);
CREATE INDEX IF NOT EXISTS idx_services_type ON services(service_type);
CREATE INDEX IF NOT EXISTS idx_services_featured ON services(featured);
