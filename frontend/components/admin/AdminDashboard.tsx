/**
 * Admin Dashboard - Complete Rebuild
 * 
 * Clean, modern admin dashboard with tabs for:
 * - Overview
 * - Registrations
 * - Blog
 * - Events
 * - Partners
 * - Join Requests
 * 
 * Uses strict JSON fetching to avoid "Expected JSON but got text/html" errors
 */

import React, { useState, useEffect } from 'react';
import { fetchJson } from '../../src/utils/fetchJson';
import type {
  DashboardStats,
  Registration,
  BlogPost,
  Event,
  Partner,
  JoinRequest,
  DashboardStatsResponse,
  BlogPostsResponse,
  EventsResponse,
} from '../../src/types/admin';
import { OverviewTab } from './tabs/OverviewTab';
import { RegistrationsTab } from './tabs/RegistrationsTab';
import { BlogTab } from './tabs/BlogTab';
import { EventsTab } from './tabs/EventsTab';
import { PartnersTab } from './tabs/PartnersTab';
import { JoinTab } from './tabs/JoinTab';

type TabId = 'overview' | 'registrations' | 'blog' | 'events' | 'partners' | 'join';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  // Stats state
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Registrations state
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(false);
  const [registrationsError, setRegistrationsError] = useState<string | null>(null);

  // Blog posts state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  // Events state
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState<string | null>(null);

  // Partners state
  const [partners, setPartners] = useState<Partner[]>([]);
  const [partnersLoading, setPartnersLoading] = useState(false);
  const [partnersError, setPartnersError] = useState<string | null>(null);

  // Join requests state
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  // Load stats and registrations on mount
  useEffect(() => {
    loadStats();
    loadRegistrations();
  }, []);

  // Lazy load data when tabs are activated
  useEffect(() => {
    if (activeTab === 'blog' && posts.length === 0 && !postsLoading && !postsError) {
      loadBlogPosts();
    }
    if (activeTab === 'events' && events.length === 0 && !eventsLoading && !eventsError) {
      loadEvents();
    }
    if (activeTab === 'partners' && partners.length === 0 && !partnersLoading && !partnersError) {
      loadPartners();
    }
    if (activeTab === 'join' && joinRequests.length === 0 && !joinLoading && !joinError) {
      loadJoinRequests();
    }
  }, [activeTab]);

  // Load dashboard stats
  const loadStats = async () => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const data = await fetchJson<DashboardStatsResponse>('/api/dashboard/stats');
      setStats({
        totalRegistrations: data.totalRegistrations,
        todayRegistrations: data.todayRegistrations,
        thisWeekRegistrations: data.thisWeekRegistrations,
        thisMonthRegistrations: data.thisMonthRegistrations,
        topCountries: data.topCountries || [],
        recentActivity: data.recentActivity || [],
      });
    } catch (error: any) {
      console.error('[Admin] Failed to load stats:', error);
      setStatsError(error.message || 'Failed to load dashboard statistics');
    } finally {
      setStatsLoading(false);
    }
  };

  // Load registrations
  const loadRegistrations = async () => {
    setRegistrationsLoading(true);
    setRegistrationsError(null);
    try {
      const data = await fetchJson<Registration[]>('/api/registrations');
      // API returns array directly
      setRegistrations(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error('[Admin] Failed to load registrations:', error);
      setRegistrationsError(error.message || 'Failed to load registrations');
    } finally {
      setRegistrationsLoading(false);
    }
  };

  // Load blog posts
  const loadBlogPosts = async () => {
    setPostsLoading(true);
    setPostsError(null);
    try {
      const data = await fetchJson<BlogPostsResponse>('/api/blog-posts');
      setPosts(data.posts || []);
    } catch (error: any) {
      console.error('[Admin] Failed to load blog posts:', error);
      setPostsError(error.message || 'Failed to load blog posts');
    } finally {
      setPostsLoading(false);
    }
  };

  // Load events
  const loadEvents = async () => {
    setEventsLoading(true);
    setEventsError(null);
    try {
      const data = await fetchJson<EventsResponse>('/api/events');
      setEvents(data.events || []);
    } catch (error: any) {
      console.error('[Admin] Failed to load events:', error);
      setEventsError(error.message || 'Failed to load events');
    } finally {
      setEventsLoading(false);
    }
  };

  // Load partners
  const loadPartners = async () => {
    setPartnersLoading(true);
    setPartnersError(null);
    try {
      const data = await fetchJson<Partner[]>('/api/partners');
      // API returns array directly
      setPartners(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error('[Admin] Failed to load partners:', error);
      setPartnersError(error.message || 'Failed to load partners');
    } finally {
      setPartnersLoading(false);
    }
  };

  // Load join requests
  const loadJoinRequests = async () => {
    setJoinLoading(true);
    setJoinError(null);
    try {
      // Note: This endpoint may not exist yet
      const data = await fetchJson<JoinRequest[]>('/api/join-requests');
      setJoinRequests(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error('[Admin] Failed to load join requests:', error);
      // Don't show error if endpoint doesn't exist (404)
      if (error.message?.includes('404')) {
        setJoinError('Join requests endpoint not yet implemented');
      } else {
        setJoinError(error.message || 'Failed to load join requests');
      }
    } finally {
      setJoinLoading(false);
    }
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'registrations', label: 'Registrations' },
    { id: 'blog', label: 'Blog' },
    { id: 'events', label: 'Events' },
    { id: 'partners', label: 'Partners' },
    { id: 'join', label: 'Join Requests' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-50">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">Manage registrations, content, and partners</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${
                    activeTab === tab.id
                      ? 'border-indigo-400 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-700'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <OverviewTab
            stats={stats}
            statsLoading={statsLoading}
            statsError={statsError}
            registrations={registrations}
          />
        )}

        {activeTab === 'registrations' && (
          <RegistrationsTab
            registrations={registrations}
            loading={registrationsLoading}
            error={registrationsError}
            onRefresh={loadRegistrations}
          />
        )}

        {activeTab === 'blog' && (
          <BlogTab
            posts={posts}
            loading={postsLoading}
            error={postsError}
            onRefresh={loadBlogPosts}
          />
        )}

        {activeTab === 'events' && (
          <EventsTab
            events={events}
            loading={eventsLoading}
            error={eventsError}
            onRefresh={loadEvents}
          />
        )}

        {activeTab === 'partners' && (
          <PartnersTab
            partners={partners}
            loading={partnersLoading}
            error={partnersError}
            onRefresh={loadPartners}
          />
        )}

        {activeTab === 'join' && (
          <JoinTab
            joinRequests={joinRequests}
            loading={joinLoading}
            error={joinError}
            onRefresh={loadJoinRequests}
          />
        )}
      </div>
    </div>
  );
}

