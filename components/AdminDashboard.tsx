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
  Loader2
} from 'lucide-react';
import { registrationService } from './services/registrationService';

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
  const registrationsPerPage = 10;

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
            <p className="text-muted-foreground">Manage social media registrations and track user activity</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleRefresh} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={handleExport} size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
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
                {stats.recentActivity.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No activity yet</p>
                ) : (
                  stats.recentActivity.map((activity) => (
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
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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
      </div>
    </div>
  );
}
