// Helper Functions

export const formatPrice = (price) => {
  if (!price) return 'Price on Request';
  
  const numPrice = Number(price);
  
  if (numPrice >= 10000000) {
    return `₹${(numPrice / 10000000).toFixed(2)} Cr`;
  } else if (numPrice >= 100000) {
    return `₹${(numPrice / 100000).toFixed(2)} Lakhs`;
  } else {
    return `₹${numPrice.toLocaleString('en-IN')}`;
  }
};

export const formatArea = (area) => {
  if (!area) return 'N/A';
  return `${Number(area).toLocaleString('en-IN')} sq.ft`;
};

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone.replace(/\s+/g, ''));
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/placeholder.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return `${process.env.NEXT_PUBLIC_API_URL}${imagePath}`;
};
