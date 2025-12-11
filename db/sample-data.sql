-- Sample Data for Real Estate Website
-- Run this after running schema.sql

-- Insert Cities
INSERT INTO cities (name, state, slug) VALUES 
  ('Mumbai', 'Maharashtra', 'mumbai')
ON CONFLICT (slug) DO NOTHING;

-- Get Mumbai city ID (should be 1)
-- Insert Areas
INSERT INTO areas (name, city_id, slug, description) VALUES
  ('Andheri', 1, 'andheri-mumbai', 'Popular suburb in Western Mumbai with excellent connectivity'),
  ('Bandra', 1, 'bandra-mumbai', 'Queen of Suburbs - Upscale locality'),
  ('Worli', 1, 'worli-mumbai', 'Premium seafront neighborhood'),
  ('Powai', 1, 'powai-mumbai', 'IT hub with beautiful lake view'),
  ('Juhu', 1, 'juhu-mumbai', 'Beach-side premium locality'),
  ('Malad', 1, 'malad-mumbai', 'Well-connected suburb'),
  ('Goregaon', 1, 'goregaon-mumbai', 'Central suburb with film city'),
  ('Santacruz', 1, 'santacruz-mumbai', 'Prime location near airport')
ON CONFLICT (slug) DO NOTHING;

-- Insert Sample Properties
INSERT INTO properties (
  title, slug, description, city_id, area_id, location, 
  property_type, status, price, bedrooms, bathrooms, sqft, 
  furnished, parking, floor, total_floors, facing, age_of_property,
  amenities, featured, is_active
) VALUES
  (
    'Luxury 3 BHK Apartment in Andheri West',
    'luxury-3bhk-andheri',
    'Experience luxury living in this spacious 3 BHK apartment located in the heart of Andheri West. The property features modern interiors, premium fittings, and access to world-class amenities including a swimming pool, gym, and landscaped gardens.',
    1, 1, 'Andheri West',
    'apartment', 'for_sale', 25000000, 3, 3, 1450,
    'semi_furnished', 2, '12th Floor', 25, 'north', '2 Years',
    'Swimming Pool,Gym,Parking,Security,Power Backup,Lift,Club House,Kids Play Area,Garden,CCTV',
    true, true
  ),
  (
    'Sea View Penthouse in Bandra',
    'sea-view-penthouse-bandra',
    'Stunning 4 BHK penthouse with breathtaking sea views in Bandra West. This ultra-luxury property features premium Italian marble flooring, designer lighting, and a private terrace. Perfect for those seeking an exclusive lifestyle.',
    1, 2, 'Bandra West',
    'penthouse', 'for_sale', 85000000, 4, 4, 3200,
    'furnished', 3, 'Penthouse - 15th Floor', 15, 'west', 'New Construction',
    'Swimming Pool,Gym,Parking,Security,Power Backup,Lift,Club House,Joggers Track,Garden,CCTV,Intercom,Spa,Private Terrace',
    true, true
  ),
  (
    'Premium 4 BHK in Worli',
    'premium-4bhk-worli',
    'Exclusive 4 BHK apartment in Worli''s most sought-after address. Features include panoramic city and sea views, high ceilings, and access to 5-star amenities. Located close to business districts.',
    1, 3, 'Worli',
    'apartment', 'for_sale', 62000000, 4, 4, 2800,
    'furnished', 3, '18th Floor', 35, 'south_west', '3 Years',
    'Swimming Pool,Gym,Parking,Security,Power Backup,Lift,Club House,Concierge Service,Garden,CCTV,Party Hall',
    true, true
  ),
  (
    'Spacious 2 BHK in Powai',
    'spacious-2-bhk-powai',
    'Well-maintained 2 BHK apartment in Powai with lake view. Great for young professionals and small families. Close to IT parks, shopping malls, and schools.',
    1, 4, 'Powai',
    'apartment', 'for_sale', 18000000, 2, 2, 1100,
    'semi_furnished', 1, '8th Floor', 20, 'east', '3 Years',
    'Gym,Parking,Security,Power Backup,Lift,Garden,CCTV',
    false, true
  ),
  (
    'Modern Villa in Juhu',
    'modern-villa-juhu',
    'Stunning 5 BHK independent villa near Juhu Beach. Features include private pool, landscaped garden, and modern architecture. Perfect for luxury seekers.',
    1, 5, 'Juhu',
    'villa', 'for_sale', 125000000, 5, 5, 4500,
    'furnished', 4, 'Ground + 2 Floors', NULL, 'north', '1 Year',
    'Private Pool,Garden,Parking,Security,Power Backup,Home Theater,Gym,CCTV',
    true, true
  ),
  (
    'Affordable 1 BHK in Malad',
    'affordable-1bhk-malad',
    'Compact and well-designed 1 BHK perfect for first-time homebuyers. Located in a well-maintained society with basic amenities.',
    1, 6, 'Malad East',
    'apartment', 'for_sale', 9500000, 1, 1, 650,
    'unfurnished', 1, '5th Floor', 12, 'north_east', '5 Years',
    'Parking,Security,Lift,Power Backup',
    false, true
  );

-- Insert Sample Blogs
INSERT INTO blogs (
  title, slug, excerpt, content, category, author, 
  meta_description, is_published, featured
) VALUES
  (
    'Top 10 Areas to Buy Property in Mumbai 2024',
    'top-10-areas-to-buy-property-in-mumbai-2024',
    'Discover the best neighborhoods in Mumbai for property investment this year.',
    '<h2>Introduction</h2><p>Mumbai''s real estate market continues to evolve, with certain areas emerging as prime investment opportunities. Here are the top 10 areas to consider in 2024.</p><h3>1. Andheri</h3><p>Andheri remains one of Mumbai''s most sought-after locations due to excellent connectivity...</p>',
    'market_trends', 'Raj Sharma',
    'Explore the top 10 areas in Mumbai for property investment in 2024. Expert analysis and market trends.',
    true, true
  ),
  (
    'First Time Home Buyer Guide',
    'first-time-home-buyer-guide',
    'Everything you need to know before buying your first home in Mumbai.',
    '<h2>Buying Your First Home</h2><p>Purchasing your first home is an exciting milestone. Here''s a comprehensive guide to help you navigate the process...</p>',
    'buying_guide', 'Priya Desai',
    'Complete guide for first-time home buyers in Mumbai. Tips, checklist, and expert advice.',
    true, false
  );

-- Insert Sample Services
INSERT INTO services (
  title, slug, service_type, description, short_description,
  icon, features, meta_description, is_active, featured, display_order
) VALUES
  (
    'Legal Guidance & Documentation',
    'legal-guidance-and-documentation',
    'legal_services',
    'Expert legal assistance for all your property documentation and compliance needs. Our team of experienced lawyers ensures smooth and hassle-free property transactions.',
    'Expert legal assistance for all your property documentation and compliance needs.',
    'fas fa-gavel',
    'Title Verification,Contract Drafting,Legal Compliance,Documentation Support,Dispute Resolution,Registration Assistance',
    'Professional legal services for property transactions in Mumbai',
    true, true, 1
  ),
  (
    'Government Approved Property Valuations',
    'government-approved-property-valuations',
    'property_valuation',
    'Certified property valuation services by government-approved valuers for all purposes including bank loans, legal matters, and investment decisions.',
    'Certified property valuation services by government-approved valuers for all purposes.',
    'fas fa-file-invoice-dollar',
    'Government Certified Valuers,Bank-Accepted Reports,Market Analysis,Detailed Inspection,Comprehensive Documentation,Quick Turnaround',
    'Government approved property valuation services in Mumbai',
    true, true, 2
  ),
  (
    'Home Loan Assistance',
    'home-loan-assistance',
    'home_loan',
    'We help you secure the best home loan deals from top banks and financial institutions. Our experts guide you through the entire process from application to disbursement.',
    'Secure the best home loan deals with our expert assistance.',
    'fas fa-hand-holding-usd',
    'Best Interest Rates,Multiple Bank Options,Quick Approval,Documentation Support,Loan EMI Calculator,Free Consultation',
    'Home loan assistance and consultation services in Mumbai',
    true, true, 3
  ),
  (
    'Interior Design Services',
    'interior-design-services',
    'interior_design',
    'Transform your property with our professional interior design services. From concept to execution, we create beautiful and functional living spaces.',
    'Professional interior design services from concept to execution.',
    'fas fa-paint-brush',
    '3D Visualization,Modular Kitchen,Bedroom Design,Living Room Design,Lighting Solutions,Turnkey Projects',
    'Interior design and home decor services in Mumbai',
    true, false, 4
  ),
  (
    'Vastu Consultation',
    'vastu-consultation',
    'vastu_consultation',
    'Get expert Vastu guidance for your property. Our certified consultants help align your space with Vastu principles for harmony and prosperity.',
    'Expert Vastu guidance for your property.',
    'fas fa-om',
    'Certified Consultants,Site Inspection,Detailed Report,Remedies & Solutions,Construction Guidance,Post-Construction Advice',
    'Vastu consultation services for properties in Mumbai',
    true, false, 5
  ),
  (
    'Property Management',
    'property-management',
    'property_management',
    'Comprehensive property management services for landlords and property owners. We handle everything from tenant screening to maintenance.',
    'Complete property management solutions for landlords.',
    'fas fa-building',
    'Tenant Screening,Rent Collection,Maintenance Management,Legal Compliance,Regular Inspections,24/7 Support',
    'Professional property management services in Mumbai',
    true, false, 6
  ),
  (
    'Relocation Services',
    'relocation-services',
    'relocation',
    'Stress-free relocation services for individuals and families moving to Mumbai. We assist with property search, documentation, and settling in.',
    'Hassle-free relocation assistance in Mumbai.',
    'fas fa-truck-moving',
    'Property Search,Documentation Help,Moving Assistance,School Admissions,Utility Setup,Local Area Guide',
    'Relocation and settling services in Mumbai',
    true, false, 7
  ),
  (
    'Rental Services',
    'rental-services',
    'rental_services',
    'Find the perfect rental property in Mumbai. We have a wide range of options from budget-friendly to luxury rentals.',
    'Find your ideal rental property in Mumbai.',
    'fas fa-key',
    'Wide Property Selection,Verified Listings,Negotiation Support,Rental Agreement,Tenant Verification,Quick Process',
    'Rental property services and assistance in Mumbai',
    true, false, 8
  );

-- Note: Property images would be uploaded separately and referenced by URLs
-- For now, properties don't have images, but the structure is ready

SELECT 'Sample data inserted successfully!' as message;
