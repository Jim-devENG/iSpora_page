import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { safeAnimate, safeTransition } from './utils/animationUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Users, 
  MapPin, 
  Globe, 
  Clock, 
  Search, 
  Download, 
  RefreshCw, 
  Eye, 
  Trash2, 
  Filter,
  BarChart3,
  TrendingUp,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Loader2,
  MoreHorizontal,
  FileText,
  Calendar,
  Plus,
  Edit,
  Save,
  Building,
  X
} from 'lucide-react';
import { ImageUpload } from './ui/ImageUpload';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { registrationService } from './services/registrationService';
import { NotificationModal } from './ui/notification-modal';

interface RegistrationData {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  countryOfOrigin: string;
  countryOfResidence: string;
  ipAddress?: string;
  location?: {
    country?: string;
    city?: string;
    region?: string;
    latitude?: number;
    longitude?: number;
  };
  timestamp: string;
  userAgent: string;
  status: 'active' | 'pending' | 'verified';
  group?: 'local' | 'diaspora';
}

interface DashboardStats {
  totalRegistrations: number;
  todayRegistrations: number;
  thisWeekRegistrations: number;
  thisMonthRegistrations: number;
  topCountries: { country: string; count: number }[];
  recentActivity: RegistrationData[];
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'registrations' | 'blog' | 'events' | 'partners'>('registrations');
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalRegistrations: 0,
    todayRegistrations: 0,
    thisWeekRegistrations: 0,
    thisMonthRegistrations: 0,
    topCountries: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'verified'>('all');
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationData | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentActivityPage, setRecentActivityPage] = useState(1);
  const registrationsPerPage = 10;
  const recentActivityPerPage = 5;
  
  // Blog posts state
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<any>(null);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    authorAvatar: '',
    category: '',
    imageUrl: '',
    readTime: '',
    featured: false,
    published: false
  });
  
  // Events state
  const [events, setEvents] = useState<any[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    eventTime: '',
    eventType: '',
    speaker: '',
    speakerRole: '',
    imageUrl: '',
    registrationLink: '',
    recordingLink: '',
    maxAttendees: '',
    status: 'upcoming'
  });
  
  // Notification modal state
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
    confirmText: 'OK'
  });

  // Fetch data and subscribe to real-time updates
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    const fetchData = async () => {
      try {
        const load = async () => {
          console.log('Loading admin dashboard data...');
          try {
            const registrationsData = await registrationService.getRegistrations();
            console.log('Registrations loaded:', registrationsData);
            setRegistrations(registrationsData);
            
            // Re-enable stats API now that we know database works
            const statsData = await registrationService.getDashboardStats();
            console.log('Stats loaded:', statsData);
            setStats(statsData);
          } catch (error) {
            console.error('Error loading data:', error);
            // Fallback to basic stats if stats API fails
            setStats({
              totalRegistrations: registrationsData?.length || 0,
              todayRegistrations: 0,
              thisWeekRegistrations: 0,
              thisMonthRegistrations: 0,
              topCountries: [],
              recentActivity: registrationsData?.slice(0, 10) || []
            });
          }
        };

        await load();
        // Subscribe to updates
        unsubscribe = registrationService.subscribe(async () => {
          await load();
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Fetch blog posts when blog tab is active
  useEffect(() => {
    if (activeTab === 'blog') {
      fetchBlogPosts();
    }
  }, [activeTab]);

  // Fetch events when events tab is active
  useEffect(() => {
    if (activeTab === 'events') {
      fetchEvents();
    }
  }, [activeTab]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // Calculate pagination
  const totalPages = Math.ceil(registrations.length / registrationsPerPage);

  // Apply filters to all registrations first
  const filteredRegistrations = registrations.filter(registration => {
    const matchesSearch = registration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         registration.whatsapp.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || registration.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Then apply pagination to filtered results
  const totalFilteredPages = Math.ceil(filteredRegistrations.length / registrationsPerPage);
  const startIndex = (currentPage - 1) * registrationsPerPage;
  const endIndex = startIndex + registrationsPerPage;
  const currentRegistrations = filteredRegistrations.slice(startIndex, endIndex);

  // Recent Activity pagination
  const totalRecentActivityPages = Math.ceil(stats.recentActivity.length / recentActivityPerPage);
  const recentActivityStartIndex = (recentActivityPage - 1) * recentActivityPerPage;
  const recentActivityEndIndex = recentActivityStartIndex + recentActivityPerPage;
  const currentRecentActivity = stats.recentActivity.slice(recentActivityStartIndex, recentActivityEndIndex);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Fetch fresh data
      const [registrationsData, statsData] = await Promise.all([
        registrationService.getRegistrations(),
        registrationService.getDashboardStats()
      ]);
      
      setRegistrations(registrationsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'WhatsApp', 'Country of Origin', 'Country of Residence', 'IP Address', 'Location', 'Timestamp', 'Status'],
      ...filteredRegistrations.map(r => [
        r.name,
        r.email,
        r.whatsapp,
        r.countryOfOrigin,
        r.countryOfResidence,
        r.ipAddress || '',
        r.location ? `${r.location.city}, ${r.location.country}` : '',
        new Date(r.timestamp).toLocaleString(),
        r.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = async (registrationId: string) => {
    setNotification({
      isOpen: true,
      type: 'error',
      title: 'Delete Registration',
      message: 'Are you sure you want to delete this registration? This action cannot be undone.',
      confirmText: 'Delete',
      onConfirm: async () => {
        try {
          console.log('Deleting registration:', registrationId);
          
          // Call the API to delete the registration
          await registrationService.deleteRegistration(registrationId);
          
          // Remove from local state
          setRegistrations(prev => prev.filter(r => r.id !== registrationId));
          
          // Show success message
          setNotification({
            isOpen: true,
            type: 'success',
            title: 'Success',
            message: 'Registration deleted successfully',
            confirmText: 'OK'
          });
        } catch (error) {
          console.error('Error deleting registration:', error);
          setNotification({
            isOpen: true,
            type: 'error',
            title: 'Error',
            message: 'Failed to delete registration',
            confirmText: 'OK'
          });
        }
      }
    });
  };

  const handleStatusChange = async (registrationId: string, newStatus: 'active' | 'pending' | 'verified') => {
    try {
      console.log('Updating status:', registrationId, newStatus);
      
      // Call the API to update the status
      const updatedRegistration = await registrationService.updateRegistrationStatus(registrationId, newStatus);
      
      if (updatedRegistration) {
        // Update local state with the response from API
        setRegistrations(prev => prev.map(r => 
          r.id === registrationId ? updatedRegistration : r
        ));
        
        // Show success message
        setNotification({
          isOpen: true,
          type: 'success',
          title: 'Success',
          message: 'Status updated successfully',
          confirmText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to update status',
        confirmText: 'OK'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'verified':
        return <Badge className="bg-blue-100 text-blue-800">Verified</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  // Blog Posts CRUD functions
  const fetchBlogPosts = async () => {
    setBlogLoading(true);
    try {
      const response = await fetch('/api/blog/blog?published=all');
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setBlogLoading(false);
    }
  };

  const handleCreateBlogPost = async () => {
    try {
      const response = await fetch('/api/blog/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...blogFormData,
          imageUrl: blogFormData.imageUrl || null,
          readTime: blogFormData.readTime || null
        })
      });

      if (!response.ok) throw new Error('Failed to create blog post');
      
      setNotification({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: 'Blog post created successfully',
        confirmText: 'OK'
      });
      
      resetBlogForm();
      fetchBlogPosts();
    } catch (error: any) {
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: error.message || 'Failed to create blog post',
        confirmText: 'OK'
      });
    }
  };

  const handleUpdateBlogPost = async () => {
    if (!editingBlogPost) return;
    
    try {
      const response = await fetch(`/api/blog/${editingBlogPost.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...blogFormData,
          imageUrl: blogFormData.imageUrl || null,
          readTime: blogFormData.readTime || null
        })
      });

      if (!response.ok) throw new Error('Failed to update blog post');
      
      setNotification({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: 'Blog post updated successfully',
        confirmText: 'OK'
      });
      
      resetBlogForm();
      fetchBlogPosts();
    } catch (error: any) {
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: error.message || 'Failed to update blog post',
        confirmText: 'OK'
      });
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    setNotification({
      isOpen: true,
      type: 'error',
      title: 'Delete Blog Post',
      message: 'Are you sure you want to delete this blog post? This action cannot be undone.',
      confirmText: 'Delete',
      onConfirm: async () => {
        try {
          const response = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Failed to delete blog post');
          
          setNotification({
            isOpen: true,
            type: 'success',
            title: 'Success',
            message: 'Blog post deleted successfully',
            confirmText: 'OK'
          });
          
          fetchBlogPosts();
        } catch (error: any) {
          setNotification({
            isOpen: true,
            type: 'error',
            title: 'Error',
            message: error.message || 'Failed to delete blog post',
            confirmText: 'OK'
          });
        }
      }
    });
  };

  const resetBlogForm = () => {
    setBlogFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      authorAvatar: '',
      category: '',
      imageUrl: '',
      readTime: '',
      featured: false,
      published: false
    });
    setEditingBlogPost(null);
    setShowBlogForm(false);
  };

  const handleEditBlogPost = (post: any) => {
    setEditingBlogPost(post);
    setBlogFormData({
      title: post.title || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      author: post.author || '',
      authorAvatar: post.author_avatar || '',
      category: post.category || '',
      imageUrl: post.image_url || '',
      readTime: post.read_time || '',
      featured: post.featured || false,
      published: post.published || false
    });
    setShowBlogForm(true);
  };

  // Events CRUD functions
  const fetchEvents = async () => {
    setEventsLoading(true);
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setEventsLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...eventFormData,
          imageUrl: eventFormData.imageUrl || null,
          registrationLink: eventFormData.registrationLink || null,
          recordingLink: eventFormData.recordingLink || null,
          maxAttendees: eventFormData.maxAttendees ? parseInt(eventFormData.maxAttendees) : null
        })
      });

      if (!response.ok) throw new Error('Failed to create event');
      
      setNotification({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: 'Event created successfully',
        confirmText: 'OK'
      });
      
      resetEventForm();
      fetchEvents();
    } catch (error: any) {
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: error.message || 'Failed to create event',
        confirmText: 'OK'
      });
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent) return;
    
    try {
      const response = await fetch(`/api/events/${editingEvent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...eventFormData,
          imageUrl: eventFormData.imageUrl || null,
          registrationLink: eventFormData.registrationLink || null,
          recordingLink: eventFormData.recordingLink || null,
          maxAttendees: eventFormData.maxAttendees ? parseInt(eventFormData.maxAttendees) : null
        })
      });

      if (!response.ok) throw new Error('Failed to update event');
      
      setNotification({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: 'Event updated successfully',
        confirmText: 'OK'
      });
      
      resetEventForm();
      fetchEvents();
    } catch (error: any) {
      setNotification({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: error.message || 'Failed to update event',
        confirmText: 'OK'
      });
    }
  };

  const handleDeleteEvent = async (id: string) => {
    setNotification({
      isOpen: true,
      type: 'error',
      title: 'Delete Event',
      message: 'Are you sure you want to delete this event? This action cannot be undone.',
      confirmText: 'Delete',
      onConfirm: async () => {
        try {
          const response = await fetch(`/api/events/${id}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Failed to delete event');
          
          setNotification({
            isOpen: true,
            type: 'success',
            title: 'Success',
            message: 'Event deleted successfully',
            confirmText: 'OK'
          });
          
          fetchEvents();
        } catch (error: any) {
          setNotification({
            isOpen: true,
            type: 'error',
            title: 'Error',
            message: error.message || 'Failed to delete event',
            confirmText: 'OK'
          });
        }
      }
    });
  };

  const resetEventForm = () => {
    setEventFormData({
      title: '',
      description: '',
      eventDate: '',
      eventTime: '',
      eventType: '',
      speaker: '',
      speakerRole: '',
      imageUrl: '',
      registrationLink: '',
      recordingLink: '',
      maxAttendees: '',
      status: 'upcoming'
    });
    setEditingEvent(null);
    setShowEventForm(false);
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setEventFormData({
      title: event.title || '',
      description: event.description || '',
      eventDate: event.event_date ? event.event_date.split('T')[0] : '',
      eventTime: event.event_time || '',
      eventType: event.event_type || '',
      speaker: event.speaker || '',
      speakerRole: event.speaker_role || '',
      imageUrl: event.image_url || '',
      registrationLink: event.registration_link || '',
      recordingLink: event.recording_link || '',
      maxAttendees: event.max_attendees?.toString() || '',
      status: event.status || 'upcoming'
    });
    setShowEventForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={safeAnimate({ opacity: 1, y: 0 })}
          transition={safeTransition({ duration: 0.6 })}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage registrations, blog posts, and events</p>
          </div>
          <div className="flex gap-2">
            {activeTab === 'registrations' && (
              <>
                <Button onClick={handleRefresh} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button onClick={handleExport} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </>
            )}
            <Button 
              onClick={() => {
                localStorage.removeItem('adminAuthenticated');
                localStorage.removeItem('adminLoginTime');
                window.location.reload();
              }} 
              variant="outline" 
              size="sm"
            >
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={safeAnimate({ opacity: 1, y: 0 })}
          transition={safeTransition({ duration: 0.6, delay: 0.05 })}
          className="flex gap-2 border-b"
        >
          <Button
            variant={activeTab === 'registrations' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('registrations')}
            className="rounded-b-none"
          >
            <Users className="h-4 w-4 mr-2" />
            Registrations
          </Button>
          <Button
            variant={activeTab === 'blog' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('blog')}
            className="rounded-b-none"
          >
            <FileText className="h-4 w-4 mr-2" />
            Blog Posts
          </Button>
          <Button
            variant={activeTab === 'events' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('events')}
            className="rounded-b-none"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </Button>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'registrations' && (
          <>
            {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={safeAnimate({ opacity: 1, y: 0 })}
          transition={safeTransition({ duration: 0.6, delay: 0.1 })}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRegistrations}</div>
              <p className="text-xs text-muted-foreground">All time registrations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayRegistrations}</div>
              <p className="text-xs text-muted-foreground">New registrations today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisWeekRegistrations}</div>
              <p className="text-xs text-muted-foreground">Registrations this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisMonthRegistrations}</div>
              <p className="text-xs text-muted-foreground">Registrations this month</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Countries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={safeAnimate({ opacity: 1, y: 0 })}
          transition={safeTransition({ duration: 0.6, delay: 0.2 })}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Top Countries
              </CardTitle>
              <CardDescription>Most popular countries of residence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topCountries.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No data yet</p>
                ) : (
                  stats.topCountries.map((item, index) => (
                  <div key={item.country} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {index + 1}
                      </div>
                      <span className="font-medium">{item.country}</span>
                    </div>
                    <Badge variant="secondary">{item.count}</Badge>
                  </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest registrations with location data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentRecentActivity.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No activity yet</p>
                ) : (
                  currentRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{activity.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.location?.city}, {activity.location?.country}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                  ))
                )}
              </div>
              
              {/* Recent Activity Pagination */}
              {totalRecentActivityPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Showing {recentActivityStartIndex + 1}-{Math.min(recentActivityEndIndex, stats.recentActivity.length)} of {stats.recentActivity.length} activities
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRecentActivityPage(recentActivityPage - 1)}
                      disabled={recentActivityPage === 1}
                      className="w-8 h-8 p-0"
                    >
                      ←
                    </Button>
                    <span className="text-sm text-muted-foreground px-2">
                      {recentActivityPage} / {totalRecentActivityPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRecentActivityPage(recentActivityPage + 1)}
                      disabled={recentActivityPage === totalRecentActivityPages}
                      className="w-8 h-8 p-0"
                    >
                      →
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={safeAnimate({ opacity: 1, y: 0 })}
          transition={safeTransition({ duration: 0.6, delay: 0.3 })}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1">
            <Label htmlFor="search" className="sr-only">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('active')}
            >
              Active
            </Button>
            <Button
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('pending')}
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === 'verified' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('verified')}
            >
              Verified
            </Button>
          </div>
        </motion.div>

        {/* Registrations Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={safeAnimate({ opacity: 1, y: 0 })}
          transition={safeTransition({ duration: 0.6, delay: 0.4 })}
        >
          <Card>
            <CardHeader>
              <CardTitle>Registrations</CardTitle>
                              <CardDescription>
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredRegistrations.length)} of {filteredRegistrations.length} registrations
                </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>WhatsApp</TableHead>
                      <TableHead>Group</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-muted-foreground">
                          No registrations yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRegistrations.map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell className="font-medium">{registration.name}</TableCell>
                        <TableCell>{registration.email}</TableCell>
                        <TableCell>{registration.whatsapp}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{registration.group || 'diaspora'}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">
                              {registration.location?.city}, {registration.location?.country}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {registration.ipAddress || 'N/A'}
                        </TableCell>
                        <TableCell>{getStatusBadge(registration.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedRegistration(registration);
                                setShowDetails(true);
                              }}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleStatusChange(registration.id, 'verified')}
                              title="Mark as Verified"
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDelete(registration.id)}
                              title="Delete Registration"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Controls */}
              {totalFilteredPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalFilteredPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalFilteredPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalFilteredPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Registration Details Modal */}
        {showDetails && selectedRegistration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={safeAnimate({ opacity: 1 })}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={safeAnimate({ scale: 1, opacity: 1 })}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Registration Details</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                    <p className="font-medium">{selectedRegistration.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p>{selectedRegistration.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">WhatsApp</Label>
                    <p>{selectedRegistration.whatsapp}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedRegistration.status)}</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Location Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Country of Origin</Label>
                      <p>{selectedRegistration.countryOfOrigin}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Country of Residence</Label>
                      <p>{selectedRegistration.countryOfResidence}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">IP Address</Label>
                      <p className="font-mono">{selectedRegistration.ipAddress || 'N/A'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Detected Location</Label>
                      <p>
                        {selectedRegistration.location?.city}, {selectedRegistration.location?.country}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Technical Information</h3>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Registration Time</Label>
                      <p>{new Date(selectedRegistration.timestamp).toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">User Agent</Label>
                      <p className="text-sm font-mono bg-muted p-2 rounded">
                        {selectedRegistration.userAgent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

          </>
        )}
        
        {/* Notification Modal - Always available */}
        <NotificationModal
          isOpen={notification.isOpen}
          onClose={() => setNotification(prev => ({ ...prev, isOpen: false }))}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          confirmText={notification.confirmText}
          onConfirm={notification.onConfirm}
        />

        {activeTab === 'blog' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={safeAnimate({ opacity: 1, y: 0 })}
            transition={safeTransition({ duration: 0.6 })}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Blog Posts Management</CardTitle>
                    <CardDescription>Create, edit, and manage blog posts</CardDescription>
                  </div>
                  <Button onClick={() => setShowBlogForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {blogLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
                    <p className="text-muted-foreground">Loading blog posts...</p>
                  </div>
                ) : blogPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No blog posts yet. Create your first post!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        {post.image_url && (
                          <img src={post.image_url} alt={post.title} className="w-24 h-24 object-cover rounded" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{post.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary">{post.category}</Badge>
                                {post.featured && <Badge className="bg-primary">Featured</Badge>}
                                {post.published ? (
                                  <Badge className="bg-green-100 text-green-800">Published</Badge>
                                ) : (
                                  <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditBlogPost(post)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteBlogPost(post.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Blog Post Form Modal */}
            {showBlogForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={safeAnimate({ opacity: 1 })}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={() => resetBlogForm()}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={safeAnimate({ scale: 1, opacity: 1 })}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-background rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{editingBlogPost ? 'Edit Blog Post' : 'New Blog Post'}</h2>
                    <Button variant="ghost" size="sm" onClick={() => resetBlogForm()}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Title *</Label>
                      <Input
                        value={blogFormData.title}
                        onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                        placeholder="Enter blog post title"
                      />
                    </div>
                    
                    <div>
                      <Label>Excerpt *</Label>
                      <Textarea
                        value={blogFormData.excerpt}
                        onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                        placeholder="Enter a brief excerpt"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label>Content</Label>
                      <Textarea
                        value={blogFormData.content}
                        onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                        placeholder="Enter full blog post content"
                        rows={8}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Author *</Label>
                        <Input
                          value={blogFormData.author}
                          onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                          placeholder="Author name"
                        />
                      </div>
                      <div>
                        <Label>Category *</Label>
                        <Select value={blogFormData.category} onValueChange={(value) => setBlogFormData({ ...blogFormData, category: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Updates">Updates</SelectItem>
                            <SelectItem value="Success Stories">Success Stories</SelectItem>
                            <SelectItem value="Diaspora Voices">Diaspora Voices</SelectItem>
                            <SelectItem value="Youth Impact">Youth Impact</SelectItem>
                            <SelectItem value="Partnerships">Partnerships</SelectItem>
                            <SelectItem value="Mentorship">Mentorship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Read Time</Label>
                        <Input
                          value={blogFormData.readTime}
                          onChange={(e) => setBlogFormData({ ...blogFormData, readTime: e.target.value })}
                          placeholder="e.g., 5 min read"
                        />
                      </div>
                      <div>
                        <Label>Author Avatar</Label>
                        <Input
                          value={blogFormData.authorAvatar}
                          onChange={(e) => setBlogFormData({ ...blogFormData, authorAvatar: e.target.value })}
                          placeholder="Initials or avatar URL"
                        />
                      </div>
                    </div>
                    
                    <ImageUpload
                      value={blogFormData.imageUrl}
                      onChange={(url) => setBlogFormData({ ...blogFormData, imageUrl: url || '' })}
                      type="blog"
                      label="Blog Post Image"
                    />
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={blogFormData.featured}
                          onChange={(e) => setBlogFormData({ ...blogFormData, featured: e.target.checked })}
                          className="rounded"
                        />
                        <Label htmlFor="featured">Featured</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="published"
                          checked={blogFormData.published}
                          onChange={(e) => setBlogFormData({ ...blogFormData, published: e.target.checked })}
                          className="rounded"
                        />
                        <Label htmlFor="published">Published</Label>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => resetBlogForm()}>Cancel</Button>
                      <Button onClick={editingBlogPost ? handleUpdateBlogPost : handleCreateBlogPost}>
                        {editingBlogPost ? 'Update' : 'Create'} Post
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={safeAnimate({ opacity: 1, y: 0 })}
            transition={safeTransition({ duration: 0.6 })}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Events Management</CardTitle>
                    <CardDescription>Create, edit, and manage webinars and programs</CardDescription>
                  </div>
                  <Button onClick={() => setShowEventForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Event
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {eventsLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
                    <p className="text-muted-foreground">Loading events...</p>
                  </div>
                ) : events.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No events yet. Create your first event!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        {event.image_url && (
                          <img src={event.image_url} alt={event.title} className="w-24 h-24 object-cover rounded" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{event.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary">{event.event_type}</Badge>
                                {event.status === 'upcoming' ? (
                                  <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
                                ) : (
                                  <Badge className="bg-gray-100 text-gray-800">Past</Badge>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {new Date(event.event_date).toLocaleDateString()} at {event.event_time}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                Speaker: {event.speaker} {event.speaker_role && `- ${event.speaker_role}`}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Event Form Modal */}
            {showEventForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={safeAnimate({ opacity: 1 })}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={() => resetEventForm()}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={safeAnimate({ scale: 1, opacity: 1 })}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-background rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{editingEvent ? 'Edit Event' : 'New Event'}</h2>
                    <Button variant="ghost" size="sm" onClick={() => resetEventForm()}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Title *</Label>
                      <Input
                        value={eventFormData.title}
                        onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                        placeholder="Enter event title"
                      />
                    </div>
                    
                    <div>
                      <Label>Description *</Label>
                      <Textarea
                        value={eventFormData.description}
                        onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                        placeholder="Enter event description"
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Event Date *</Label>
                        <Input
                          type="date"
                          value={eventFormData.eventDate}
                          onChange={(e) => setEventFormData({ ...eventFormData, eventDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Event Time *</Label>
                        <Input
                          value={eventFormData.eventTime}
                          onChange={(e) => setEventFormData({ ...eventFormData, eventTime: e.target.value })}
                          placeholder="e.g., 2:00 PM GMT"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Event Type *</Label>
                        <Select value={eventFormData.eventType} onValueChange={(value) => setEventFormData({ ...eventFormData, eventType: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Webinar">Webinar</SelectItem>
                            <SelectItem value="Workshop">Workshop</SelectItem>
                            <SelectItem value="Panel Discussion">Panel Discussion</SelectItem>
                            <SelectItem value="Conference">Conference</SelectItem>
                            <SelectItem value="Training">Training</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <Select value={eventFormData.status} onValueChange={(value) => setEventFormData({ ...eventFormData, status: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="past">Past</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Speaker *</Label>
                        <Input
                          value={eventFormData.speaker}
                          onChange={(e) => setEventFormData({ ...eventFormData, speaker: e.target.value })}
                          placeholder="Speaker name"
                        />
                      </div>
                      <div>
                        <Label>Speaker Role</Label>
                        <Input
                          value={eventFormData.speakerRole}
                          onChange={(e) => setEventFormData({ ...eventFormData, speakerRole: e.target.value })}
                          placeholder="Speaker role/title"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Registration Link</Label>
                        <Input
                          value={eventFormData.registrationLink}
                          onChange={(e) => setEventFormData({ ...eventFormData, registrationLink: e.target.value })}
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <Label>Recording Link</Label>
                        <Input
                          value={eventFormData.recordingLink}
                          onChange={(e) => setEventFormData({ ...eventFormData, recordingLink: e.target.value })}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Max Attendees</Label>
                      <Input
                        type="number"
                        value={eventFormData.maxAttendees}
                        onChange={(e) => setEventFormData({ ...eventFormData, maxAttendees: e.target.value })}
                        placeholder="Optional"
                      />
                    </div>
                    
                    <ImageUpload
                      value={eventFormData.imageUrl}
                      onChange={(url) => setEventFormData({ ...eventFormData, imageUrl: url || '' })}
                      type="event"
                      label="Event Image"
                    />
                    
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => resetEventForm()}>Cancel</Button>
                      <Button onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}>
                        {editingEvent ? 'Update' : 'Create'} Event
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'partners' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={safeAnimate({ opacity: 1, y: 0 })}
            transition={safeTransition({ duration: 0.6 })}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Partner Submissions</CardTitle>
                    <CardDescription>View and manage partnership interest submissions</CardDescription>
                  </div>
                  <Button onClick={handleRefresh} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>API Endpoint: <code className="bg-muted px-2 py-1 rounded">/api/partners</code></p>
                  <p className="mt-2">View all partnership interest submissions from the Partners page.</p>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">API Methods:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• <code>GET /api/partners</code> - List all partner submissions</li>
                    <li>• <code>GET /api/partners?status=pending</code> - Filter by status</li>
                    <li>• <code>POST /api/partners</code> - Create new submission (from form)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
