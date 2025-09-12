// Security utilities for input validation and sanitization

/**
 * Sanitize user input to prevent XSS attacks
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .substring(0, 1000); // Limit length
}

/**
 * Validate email format
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate phone number format
 */
function validatePhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Validate country name
 */
function validateCountry(country) {
  const validCountries = [
    'Nigeria', 'United States', 'United Kingdom', 'Canada', 'Australia',
    'Germany', 'France', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'Finland', 'Switzerland', 'Austria', 'Belgium', 'Italy', 'Spain',
    'Portugal', 'Ireland', 'New Zealand', 'South Africa', 'Kenya',
    'Ghana', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia', 'Cameroon',
    'Senegal', 'Mali', 'Burkina Faso', 'Ivory Coast', 'Togo', 'Benin',
    'Niger', 'Chad', 'Central African Republic', 'Republic of the Congo',
    'Democratic Republic of the Congo', 'Gabon', 'Equatorial Guinea',
    'São Tomé and Príncipe', 'Angola', 'Zambia', 'Zimbabwe', 'Botswana',
    'Namibia', 'Lesotho', 'Eswatini', 'Madagascar', 'Mauritius',
    'Seychelles', 'Comoros', 'Djibouti', 'Somalia', 'Sudan', 'South Sudan',
    'Eritrea', 'Libya', 'Tunisia', 'Algeria', 'Morocco', 'Egypt',
    'Jordan', 'Lebanon', 'Syria', 'Iraq', 'Iran', 'Afghanistan',
    'Pakistan', 'India', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Bhutan',
    'Maldives', 'Myanmar', 'Thailand', 'Laos', 'Cambodia', 'Vietnam',
    'Malaysia', 'Singapore', 'Indonesia', 'Philippines', 'Brazil',
    'Argentina', 'Chile', 'Peru', 'Colombia', 'Venezuela', 'Ecuador',
    'Bolivia', 'Paraguay', 'Uruguay', 'Guyana', 'Suriname',
    'Falkland Islands', 'Mexico', 'Guatemala', 'Belize', 'El Salvador',
    'Honduras', 'Nicaragua', 'Costa Rica', 'Panama', 'Cuba', 'Jamaica',
    'Haiti', 'Dominican Republic', 'Puerto Rico', 'Trinidad and Tobago',
    'Barbados', 'Grenada', 'Saint Lucia', 'Saint Vincent and the Grenadines',
    'Antigua and Barbuda', 'Saint Kitts and Nevis', 'Dominica', 'Bahamas',
    'Cyprus', 'Malta', 'Iceland', 'Luxembourg', 'Monaco', 'Liechtenstein',
    'Andorra', 'San Marino', 'Vatican City', 'Greece', 'Croatia',
    'Slovenia', 'Hungary', 'Czech Republic', 'Slovakia', 'Poland',
    'Lithuania', 'Latvia', 'Estonia', 'Bulgaria', 'Romania', 'Serbia',
    'Montenegro', 'Bosnia and Herzegovina', 'North Macedonia', 'Albania',
    'Kosovo', 'Moldova', 'Ukraine', 'Belarus', 'Russia', 'Kazakhstan',
    'Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Azerbaijan',
    'Georgia', 'Armenia', 'Turkey', 'Israel', 'Palestine', 'Saudi Arabia',
    'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Yemen',
    'China', 'Japan', 'South Korea', 'Taiwan', 'Hong Kong', 'Macau',
    'Mongolia', 'North Korea'
  ];
  
  return validCountries.includes(country);
}

/**
 * Rate limiting check (basic implementation)
 */
const rateLimitMap = new Map();

function checkRateLimit(ip, limit = 10, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const key = `${ip}_${Math.floor(now / windowMs)}`;
  
  const current = rateLimitMap.get(key) || 0;
  if (current >= limit) {
    return false;
  }
  
  rateLimitMap.set(key, current + 1);
  
  // Clean up old entries
  if (rateLimitMap.size > 1000) {
    const cutoff = now - (windowMs * 2);
    for (const [k, v] of rateLimitMap.entries()) {
      if (parseInt(k.split('_')[1]) * windowMs < cutoff) {
        rateLimitMap.delete(k);
      }
    }
  }
  
  return true;
}

/**
 * Validate registration data
 */
function validateRegistrationData(data) {
  const errors = [];
  
  // Required fields
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }
  
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.whatsapp || !validatePhone(data.whatsapp)) {
    errors.push('Valid WhatsApp number is required');
  }
  
  if (!data.countryOfOrigin || !validateCountry(data.countryOfOrigin)) {
    errors.push('Valid country of origin is required');
  }
  
  if (!data.countryOfResidence || !validateCountry(data.countryOfResidence)) {
    errors.push('Valid country of residence is required');
  }
  
  // Sanitize inputs
  const sanitizedData = {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email).toLowerCase(),
    whatsapp: sanitizeInput(data.whatsapp),
    countryOfOrigin: sanitizeInput(data.countryOfOrigin),
    countryOfResidence: sanitizeInput(data.countryOfResidence),
    group: data.group === 'local' ? 'local' : 'diaspora',
    ipAddress: data.ipAddress || '',
    location: data.location || {},
    timestamp: new Date().toISOString(),
    userAgent: sanitizeInput(data.userAgent || '')
  };
  
  return { isValid: errors.length === 0, errors, data: sanitizedData };
}

module.exports = {
  sanitizeInput,
  validateEmail,
  validatePhone,
  validateCountry,
  checkRateLimit,
  validateRegistrationData
};
