// Mock registration service - replace with actual API calls in production

export interface RegistrationData {
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
}

// In-memory storage for demo purposes
let registrations: RegistrationData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    whatsapp: '+1234567890',
    countryOfOrigin: 'Nigeria',
    countryOfResidence: 'United States',
    ipAddress: '192.168.1.1',
    location: {
      country: 'United States',
      city: 'New York',
      region: 'NY',
      latitude: 40.7128,
      longitude: -74.0060
    },
    timestamp: new Date().toISOString(),
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    whatsapp: '+1987654321',
    countryOfOrigin: 'Ghana',
    countryOfResidence: 'United Kingdom',
    ipAddress: '192.168.1.2',
    location: {
      country: 'United Kingdom',
      city: 'London',
      region: 'England',
      latitude: 51.5074,
      longitude: -0.1278
    },
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    status: 'verified'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    whatsapp: '+1122334455',
    countryOfOrigin: 'Kenya',
    countryOfResidence: 'Canada',
    ipAddress: '192.168.1.3',
    location: {
      country: 'Canada',
      city: 'Toronto',
      region: 'ON',
      latitude: 43.6532,
      longitude: -79.3832
    },
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    status: 'pending'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const registrationService = {
  // Submit new registration
  async submitRegistration(data: Omit<RegistrationData, 'id' | 'status'>): Promise<RegistrationData> {
    await delay(1000); // Simulate network delay
    
    // Add some variety to the status - randomly assign different statuses
    const statuses: ('active' | 'pending' | 'verified')[] = ['active', 'pending', 'verified'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    const newRegistration: RegistrationData = {
      ...data,
      id: Date.now().toString(),
      status: randomStatus
    };
    
    registrations.push(newRegistration);
    
    // Store in localStorage for persistence across page reloads
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    return newRegistration;
  },

  // Get all registrations
  async getRegistrations(): Promise<RegistrationData[]> {
    await delay(500);
    
    // Try to load from localStorage first
    const stored = localStorage.getItem('registrations');
    if (stored) {
      registrations = JSON.parse(stored);
    }
    
    return registrations.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  // Get registration by ID
  async getRegistrationById(id: string): Promise<RegistrationData | null> {
    await delay(300);
    return registrations.find(r => r.id === id) || null;
  },

  // Update registration status
  async updateRegistrationStatus(id: string, status: 'active' | 'pending' | 'verified'): Promise<RegistrationData> {
    await delay(500);
    
    const registration = registrations.find(r => r.id === id);
    if (!registration) {
      throw new Error('Registration not found');
    }
    
    registration.status = status;
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    return registration;
  },

  // Delete registration
  async deleteRegistration(id: string): Promise<void> {
    await delay(300);
    
    registrations = registrations.filter(r => r.id !== id);
    localStorage.setItem('registrations', JSON.stringify(registrations));
  },

  // Get dashboard statistics
  async getDashboardStats() {
    await delay(500);
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getFullYear(), now.getMonth() - 1, now.getDate());

    const todayRegistrations = registrations.filter(r => new Date(r.timestamp) >= today).length;
    const thisWeekRegistrations = registrations.filter(r => new Date(r.timestamp) >= weekAgo).length;
    const thisMonthRegistrations = registrations.filter(r => new Date(r.timestamp) >= monthAgo).length;

    // Calculate top countries
    const countryCounts: { [key: string]: number } = {};
    registrations.forEach(r => {
      const country = r.countryOfResidence;
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalRegistrations: registrations.length,
      todayRegistrations,
      thisWeekRegistrations,
      thisMonthRegistrations,
      topCountries,
      recentActivity: registrations.slice(0, 5)
    };
  }
};
