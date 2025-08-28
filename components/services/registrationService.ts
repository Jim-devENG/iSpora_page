// Mock database service for registration data
// In production, this would connect to a real database (MongoDB, PostgreSQL, etc.)

interface RegistrationData {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  countryOfOrigin: string;
  countryOfResidence: string;
  ipAddress: string;
  location: {
    city: string;
    country: string;
    timezone: string;
    coordinates?: { lat: number; lng: number };
  };
  status: 'pending' | 'active' | 'verified';
  createdAt: string;
  updatedAt: string;
  group?: 'local' | 'diaspora';
}

interface DashboardStats {
  total: number;
  daily: number;
  weekly: number;
  monthly: number;
  topCountries: { country: string; count: number }[];
  recentActivity: RegistrationData[];
}

// Simulate database storage
class MockDatabase {
  private registrations: RegistrationData[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    // Load existing data from localStorage (for demo persistence)
    const stored = localStorage.getItem('registrations');
    if (stored) {
      try {
        this.registrations = JSON.parse(stored);
      } catch (error) {
        console.error('Error loading stored registrations:', error);
        this.registrations = [];
      }
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('registrations', JSON.stringify(this.registrations));
      this.notifyListeners();
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  private notifyListeners() {
    this.listeners.forEach(callback => callback());
  }

  // Database operations
  async create(data: Omit<RegistrationData, 'id' | 'createdAt' | 'updatedAt'>): Promise<RegistrationData> {
    const newRegistration: RegistrationData = {
      ...data,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.registrations.push(newRegistration);
    this.saveToStorage();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return newRegistration;
  }

  async findAll(): Promise<RegistrationData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50));
    return [...this.registrations].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async findById(id: string): Promise<RegistrationData | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return this.registrations.find(r => r.id === id) || null;
  }

  async updateStatus(id: string, status: RegistrationData['status']): Promise<RegistrationData | null> {
    const registration = this.registrations.find(r => r.id === id);
    if (!registration) return null;

    registration.status = status;
    registration.updatedAt = new Date().toISOString();
    this.saveToStorage();
    
    await new Promise(resolve => setTimeout(resolve, 100));
    return registration;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.registrations.findIndex(r => r.id === id);
    if (index === -1) return false;

    this.registrations.splice(index, 1);
    this.saveToStorage();
    
    await new Promise(resolve => setTimeout(resolve, 100));
    return true;
  }

  async getStats(): Promise<DashboardStats> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const daily = this.registrations.filter(r => new Date(r.createdAt) >= oneDayAgo).length;
    const weekly = this.registrations.filter(r => new Date(r.createdAt) >= oneWeekAgo).length;
    const monthly = this.registrations.filter(r => new Date(r.createdAt) >= oneMonthAgo).length;

    // Calculate top countries
    const countryCounts: { [key: string]: number } = {};
    this.registrations.forEach(r => {
      const country = r.countryOfResidence;
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const recentActivity = this.registrations
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    return {
      total: this.registrations.length,
      daily,
      weekly,
      monthly,
      topCountries,
      recentActivity
    };
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Real-time updates
  subscribe(callback: () => void) {
    this.listeners.push(callback);
    
    // Set up cross-tab communication
    let channel: BroadcastChannel | null = null;
    let storageHandler: ((e: StorageEvent) => void) | null = null;
    
    try {
      channel = new BroadcastChannel('registrations');
      channel.onmessage = () => callback();
    } catch (error) {
      console.warn('BroadcastChannel not supported, using storage events');
    }

    // Fallback for browsers without BroadcastChannel
    try {
      storageHandler = (e: StorageEvent) => {
        if (e.key === 'registrations') {
          callback();
        }
      };
      window.addEventListener('storage', storageHandler);
    } catch (error) {
      console.warn('Storage events not supported');
    }

    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
      
      if (channel) {
        try { channel.close(); } catch {}
      }
      
      if (storageHandler) {
        try { window.removeEventListener('storage', storageHandler); } catch {}
      }
    };
  }
}

// Create singleton database instance
const db = new MockDatabase();

function resolveApiBaseUrl(): string {
  const envBase = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined;
  if (typeof window === 'undefined') return envBase || '';
  const origin = window.location.origin;
  // Force same-origin when on production domain to avoid CORS
  if (origin.includes('ispora.com')) return `${origin}/api`;
  // If env var exists but points to a different origin, prefer same-origin
  try {
    if (envBase) {
      const envOrigin = new URL(envBase).origin;
      if (envOrigin !== origin) return `${origin}/api`;
    }
  } catch {}
  return envBase || `${origin}/api`;
}

const API_BASE_URL = resolveApiBaseUrl();
const USE_API = !!API_BASE_URL;

// Public API (simulates REST API endpoints)
export const registrationService = {
  // Submit new registration
  async submitRegistration(data: {
    name: string;
    email: string;
    whatsapp: string;
    countryOfOrigin: string;
    countryOfResidence: string;
    ipAddress: string;
    location: {
      city: string;
      country: string;
      timezone: string;
      coordinates?: { lat: number; lng: number };
    };
    group?: 'local' | 'diaspora';
  }): Promise<RegistrationData> {
    // If API_BASE_URL is configured, use serverless API; else use mock DB
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to submit registration');
      return await response.json();
    }
    const status = Math.random() > 0.7 ? 'active' : Math.random() > 0.5 ? 'verified' : 'pending';
    return await db.create({ ...data, status });
  },

  // Get all registrations (for admin dashboard)
  async getRegistrations(): Promise<RegistrationData[]> {
    if (USE_API) {
      const response = await fetch(`${API_BASE_URL}/registrations`);
      if (!response.ok) throw new Error('Failed to fetch registrations');
      const data = await response.json();
      // Map API data to expected format
      return data.map((item: any) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        whatsapp: item.whatsapp,
        countryOfOrigin: item.countryOfOrigin,
        countryOfResidence: item.countryOfResidence,
        ipAddress: item.ipAddress,
        location: item.location,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        group: item.group,
        timestamp: item.createdAt, // For compatibility
        userAgent: 'N/A' // API doesn't provide this yet
      }));
    }
    return await db.findAll();
  },

  // Get registration by ID
  async getRegistration(id: string): Promise<RegistrationData | null> {
    return await db.findById(id);
  },

  // Update registration status
  async updateRegistrationStatus(id: string, status: RegistrationData['status']): Promise<RegistrationData | null> {
    return await db.updateStatus(id, status);
  },

  // Delete registration
  async deleteRegistration(id: string): Promise<boolean> {
    return await db.delete(id);
  },

  // Get dashboard statistics
  async getDashboardStats(): Promise<DashboardStats> {
    if (USE_API) {
      console.log('Fetching dashboard stats from API:', `${API_BASE_URL}/dashboard/stats`);
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
      console.log('Stats API response:', response.status, response.statusText);
      if (!response.ok) throw new Error('Failed to fetch dashboard stats');
      const data = await response.json();
      console.log('Stats data received:', data);
      return data;
    }
    return await db.getStats();
  },

  // Subscribe to real-time updates
  subscribe(callback: () => void) {
    return db.subscribe(callback);
  }
};

export type { RegistrationData, DashboardStats };
