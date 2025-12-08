/**
 * TypeScript types for Blog Posts and Events
 * These types match the Supabase schema for blog_posts and events tables
 */

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

/**
 * API Response types
 */
export interface BlogPostsResponse {
  posts: BlogPost[];
}

export interface BlogPostResponse {
  post: BlogPost;
}

export interface EventsResponse {
  events: Event[];
}

export interface EventResponse {
  event: Event;
}

export interface ApiError {
  error: string;
  details?: string;
}

