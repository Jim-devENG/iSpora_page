/**
 * Admin Dashboard TypeScript Types
 * These types match the API responses from Supabase-backed endpoints
 */

export type GroupType = 'local' | 'diaspora';

export type RegistrationStatus = 'pending' | 'verified' | 'active';

export interface Registration {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  countryOfOrigin: string;
  countryOfResidence: string;
  group: GroupType;
  status: RegistrationStatus;
  createdAt: string;
  created_at?: string; // API may return either format
  updatedAt?: string;
  updated_at?: string;
}

export type BlogPostStatus = 'draft' | 'published' | 'archived';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  tags?: string[] | null;
  status: BlogPostStatus;
  cover_image_url?: string | null;
  author_name?: string | null;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export type EventStatus = 'draft' | 'published' | 'archived';

export interface Event {
  id: string;
  title: string;
  description?: string | null;
  start_at: string;
  end_at?: string | null;
  location?: string | null;
  registration_link?: string | null;
  status: EventStatus;
  cover_image_url?: string | null;
  created_at: string;
  updated_at: string;
}

export type PartnerStatus = 'pending' | 'approved' | 'rejected';

export interface Partner {
  id: string;
  fullName?: string;
  name?: string; // API may return either
  email: string;
  orgName?: string;
  organization?: string; // API may return either
  country?: string;
  status: PartnerStatus;
  created_at: string;
  updated_at?: string;
}

export type JoinStatus = 'pending' | 'approved' | 'rejected';

export interface JoinRequest {
  id: string;
  name: string;
  email: string;
  role?: string | null;
  status: JoinStatus;
  created_at: string;
  updated_at?: string;
}

export interface DashboardStats {
  totalRegistrations: number;
  todayRegistrations: number;
  thisWeekRegistrations: number;
  thisMonthRegistrations: number;
  topCountries: { country: string; count: number }[];
  recentActivity: Registration[];
}

/**
 * API Response types
 */
export interface DashboardStatsResponse {
  totalRegistrations: number;
  todayRegistrations: number;
  thisWeekRegistrations: number;
  thisMonthRegistrations: number;
  topCountries: { country: string; count: number }[];
  recentActivity: Registration[];
}

export interface RegistrationsResponse {
  registrations?: Registration[];
  // API may return array directly or wrapped
}

export interface BlogPostsResponse {
  posts: BlogPost[];
}

export interface EventsResponse {
  events: Event[];
}

export interface PartnersResponse {
  partners?: Partner[];
  // API may return array directly or wrapped
}

export interface JoinRequestsResponse {
  joinRequests?: JoinRequest[];
  // API may return array directly or wrapped
}

