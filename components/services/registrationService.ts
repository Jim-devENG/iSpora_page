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

// In-memory storage for demo purposes (start empty; load from localStorage if present)
const stored = typeof window !== 'undefined' ? localStorage.getItem('registrations') : null;
let registrations: RegistrationData[] = stored ? JSON.parse(stored) : [];

// Simple pub/sub for real-time updates within the SPA
const listeners: Array<() => void> = [];
const notify = () => {
  listeners.forEach((fn) => {
    try { fn(); } catch {}
  });
  // Broadcast to other tabs/windows
  try {
    const channel = new BroadcastChannel('registrations');
    channel.postMessage({ type: 'update' });
    channel.close();
  } catch {}
};

export const subscribeToRegistrations = (callback: () => void) => {
  listeners.push(callback);
  // Listen to cross-tab updates
  let channel: BroadcastChannel | null = null;
  let storageHandler: ((e: StorageEvent) => void) | null = null;
  try {
    channel = new BroadcastChannel('registrations');
    channel.onmessage = () => callback();
  } catch {}
  // Fallback for browsers without BroadcastChannel support
  try {
    storageHandler = (e: StorageEvent) => {
      if (e.key === 'registrations') {
        callback();
      }
    };
    window.addEventListener('storage', storageHandler);
  } catch {}
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx >= 0) listeners.splice(idx, 1);
    if (channel) {
      try { channel.close(); } catch {}
    }
    if (storageHandler) {
      try { window.removeEventListener('storage', storageHandler); } catch {}
    }
  };
};

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
    notify();
    
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
    notify();
    
    return registration;
  },

  // Delete registration
  async deleteRegistration(id: string): Promise<void> {
    await delay(300);
    
    registrations = registrations.filter(r => r.id !== id);
    localStorage.setItem('registrations', JSON.stringify(registrations));
    notify();
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
