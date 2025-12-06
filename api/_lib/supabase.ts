import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Supabase environment variables are not set. API routes will fail without them.');
}

// Create Supabase client with service role key (for admin operations)
export function getSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// Database types matching our schema
export interface RegistrationRow {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  country_of_origin: string;
  country_of_residence: string;
  group_type: 'local' | 'diaspora';
  ip_address: string | null;
  location: {
    city?: string;
    country?: string;
    timezone?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  } | null;
  status: 'pending' | 'active' | 'verified';
  user_agent: string | null;
  created_at: string;
  updated_at: string;
}

// Transform Supabase row to API format
export function transformRegistration(row: RegistrationRow) {
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    email: row.email,
    whatsapp: row.whatsapp,
    countryOfOrigin: row.country_of_origin,
    countryOfResidence: row.country_of_residence,
    group: row.group_type,
    ipAddress: row.ip_address || undefined,
    location: row.location || {},
    status: row.status,
    userAgent: row.user_agent || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    timestamp: row.created_at, // For compatibility
  };
}

