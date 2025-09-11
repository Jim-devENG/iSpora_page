import { NextRequest } from 'next/server';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export interface SecurityConfig {
  maxRequests: number;
  windowMs: number;
  blockDuration: number;
}

export const defaultSecurityConfig: SecurityConfig = {
  maxRequests: 10, // Max requests per window
  windowMs: 15 * 60 * 1000, // 15 minutes
  blockDuration: 60 * 60 * 1000, // 1 hour block
};

export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(',')[0].trim();
  
  return 'unknown';
}

export function rateLimit(
  request: NextRequest,
  config: SecurityConfig = defaultSecurityConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const clientIP = getClientIP(request);
  const now = Date.now();
  const windowStart = now - config.windowMs;
  
  // Clean up expired entries
  for (const [ip, data] of rateLimitStore.entries()) {
    if (data.resetTime < now) {
      rateLimitStore.delete(ip);
    }
  }
  
  const clientData = rateLimitStore.get(clientIP);
  
  if (!clientData || clientData.resetTime < now) {
    // First request or window expired
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + config.windowMs
    });
    
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs
    };
  }
  
  if (clientData.count >= config.maxRequests) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: clientData.resetTime
    };
  }
  
  // Increment count
  clientData.count++;
  rateLimitStore.set(clientIP, clientData);
  
  return {
    allowed: true,
    remaining: config.maxRequests - clientData.count,
    resetTime: clientData.resetTime
  };
}

export function validateInput(data: any, schema: Record<string, any>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];
    
    if (rules.required && (!value || value.toString().trim() === '')) {
      errors.push(`${field} is required`);
      continue;
    }
    
    if (value && rules.type) {
      if (rules.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.push(`${field} must be a valid email`);
      } else if (rules.type === 'phone' && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) {
        errors.push(`${field} must be a valid phone number`);
      } else if (rules.type === 'string' && typeof value !== 'string') {
        errors.push(`${field} must be a string`);
      }
    }
    
    if (value && rules.maxLength && value.length > rules.maxLength) {
      errors.push(`${field} must be no more than ${rules.maxLength} characters`);
    }
    
    if (value && rules.minLength && value.length < rules.minLength) {
      errors.push(`${field} must be at least ${rules.minLength} characters`);
    }
    
    // Sanitize input
    if (value && typeof value === 'string') {
      // Remove potential XSS attempts
      const sanitized = value
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '');
      
      if (sanitized !== value) {
        errors.push(`${field} contains invalid characters`);
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function addSecurityHeaders(response: Response): Response {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  return response;
}

export function isSuspiciousRequest(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /php/i,
    /java/i,
    /perl/i,
    /ruby/i,
    /go-http/i,
    /okhttp/i,
    /apache/i,
    /nginx/i
  ];
  
  // Allow legitimate browsers
  const legitimateBrowsers = [
    /chrome/i,
    /firefox/i,
    /safari/i,
    /edge/i,
    /opera/i,
    /chromium/i
  ];
  
  // Check if it's a legitimate browser first
  if (legitimateBrowsers.some(pattern => pattern.test(userAgent))) {
    return false;
  }
  
  // Check for suspicious patterns
  return suspiciousPatterns.some(pattern => pattern.test(userAgent));
}
