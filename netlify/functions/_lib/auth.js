// Admin authentication utilities

const crypto = require('crypto');

// Simple session management
const sessions = new Map();

/**
 * Generate a secure session token
 */
function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create admin session
 */
function createAdminSession(ip) {
  const token = generateSessionToken();
  const session = {
    token,
    ip,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  };
  
  sessions.set(token, session);
  
  // Clean up expired sessions
  cleanupExpiredSessions();
  
  return token;
}

/**
 * Validate admin session
 */
function validateAdminSession(token, ip) {
  const session = sessions.get(token);
  
  if (!session) {
    return false;
  }
  
  // Check if session is expired
  if (new Date() > session.expiresAt) {
    sessions.delete(token);
    return false;
  }
  
  // Check IP (optional - can be strict or lenient)
  if (session.ip !== ip) {
    // For now, we'll allow different IPs but log it
    console.log(`Session IP mismatch: expected ${session.ip}, got ${ip}`);
  }
  
  return true;
}

/**
 * Clean up expired sessions
 */
function cleanupExpiredSessions() {
  const now = new Date();
  for (const [token, session] of sessions.entries()) {
    if (now > session.expiresAt) {
      sessions.delete(token);
    }
  }
}

/**
 * Invalidate session
 */
function invalidateSession(token) {
  sessions.delete(token);
}

/**
 * Check if request is from admin
 */
function isAdminRequest(event) {
  const token = event.headers.authorization?.replace('Bearer ', '');
  const ip = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
  
  if (!token) {
    return false;
  }
  
  return validateAdminSession(token, ip);
}

module.exports = {
  createAdminSession,
  validateAdminSession,
  invalidateSession,
  isAdminRequest,
  cleanupExpiredSessions
};
