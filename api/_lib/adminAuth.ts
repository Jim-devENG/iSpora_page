import { NextRequest } from 'next/server';

export interface AdminSession {
  isAuthenticated: boolean;
  loginTime: number;
  ipAddress: string;
  userAgent: string;
}

export function validateAdminSession(request: NextRequest): AdminSession | null {
  try {
    // In a real application, you'd validate against a secure session store
    // For now, we'll use a simple localStorage-based approach
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.substring(7);
    
    // Simple token validation (in production, use JWT or similar)
    if (token !== 'admin-secure-token-2024') {
      return null;
    }
    
    return {
      isAuthenticated: true,
      loginTime: Date.now(),
      ipAddress: getClientIP(request),
      userAgent: request.headers.get('user-agent') || 'unknown'
    };
  } catch (error) {
    console.error('Admin session validation error:', error);
    return null;
  }
}

export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(',')[0].trim();
  
  return 'unknown';
}

export function requireAdminAuth(request: NextRequest): AdminSession {
  const session = validateAdminSession(request);
  
  if (!session) {
    throw new Error('Unauthorized access to admin area');
  }
  
  // Check if session is expired (24 hours)
  const sessionAge = Date.now() - session.loginTime;
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  
  if (sessionAge > maxAge) {
    throw new Error('Admin session expired');
  }
  
  return session;
}
