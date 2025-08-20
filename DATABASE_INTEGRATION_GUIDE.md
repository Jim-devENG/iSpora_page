# Database Integration Guide

## Current Implementation (Demo/Mock)

The current system uses a **mock database** that simulates real database operations using:
- `localStorage` for data persistence
- In-memory storage for real-time operations
- Simulated API delays to mimic real database calls

## Production Database Options

### 1. MongoDB (Recommended for this use case)

**Why MongoDB?**
- Flexible schema for user registration data
- Excellent for storing location data and IP information
- Built-in support for geospatial queries
- Easy scaling and real-time capabilities

**Setup Example:**
```javascript
// Using MongoDB with Mongoose
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  whatsapp: { type: String, required: true },
  countryOfOrigin: { type: String, required: true },
  countryOfResidence: { type: String, required: true },
  ipAddress: { type: String, required: true },
  location: {
    city: String,
    country: String,
    timezone: String,
    coordinates: {
      type: { type: String, default: 'Point' },
      coordinates: [Number] // [longitude, latitude]
    }
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'verified'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Index for geospatial queries
registrationSchema.index({ 'location.coordinates': '2dsphere' });
```

### 2. PostgreSQL with PostGIS

**Why PostgreSQL?**
- ACID compliance for data integrity
- Advanced geospatial capabilities with PostGIS
- Excellent for complex queries and analytics
- Built-in JSON support

**Setup Example:**
```sql
-- Create registrations table
CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  whatsapp VARCHAR(50) NOT NULL,
  country_of_origin VARCHAR(100) NOT NULL,
  country_of_residence VARCHAR(100) NOT NULL,
  ip_address INET NOT NULL,
  location JSONB,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create geospatial index
CREATE INDEX idx_location_coordinates ON registrations USING GIST (
  ST_SetSRID(ST_MakePoint(
    (location->>'lng')::float, 
    (location->>'lat')::float
  ), 4326)
);
```

### 3. Firebase Firestore

**Why Firestore?**
- Real-time updates out of the box
- Built-in authentication and security
- Automatic scaling
- Offline support

**Setup Example:**
```javascript
// Firestore collection structure
const registrationsCollection = db.collection('registrations');

// Add registration
const addRegistration = async (data) => {
  return await registrationsCollection.add({
    ...data,
    status: 'pending',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
};

// Real-time listener
const unsubscribe = registrationsCollection
  .orderBy('createdAt', 'desc')
  .onSnapshot((snapshot) => {
    const registrations = [];
    snapshot.forEach((doc) => {
      registrations.push({ id: doc.id, ...doc.data() });
    });
    // Update UI with real-time data
  });
```

## Backend API Implementation

### Express.js + MongoDB Example

```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ispora_registrations');

// Registration routes
app.post('/api/registrations', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json(registration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find()
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const stats = await Registration.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          daily: {
            $sum: {
              $cond: [
                { $gte: ['$createdAt', new Date(Date.now() - 24*60*60*1000)] },
                1, 0
              ]
            }
          }
        }
      }
    ]);
    res.json(stats[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Frontend Integration

### Update the registration service to use real API:

```typescript
// components/services/registrationService.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const registrationService = {
  async submitRegistration(data: RegistrationFormData): Promise<RegistrationData> {
    const response = await fetch(`${API_BASE_URL}/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit registration');
    }
    
    return await response.json();
  },

  async getRegistrations(): Promise<RegistrationData[]> {
    const response = await fetch(`${API_BASE_URL}/registrations`);
    if (!response.ok) {
      throw new Error('Failed to fetch registrations');
    }
    return await response.json();
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }
    return await response.json();
  }
};
```

## Real-time Updates

### Option 1: WebSockets (Socket.io)

```javascript
// Backend
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Admin connected');
  
  socket.on('join-admin-room', () => {
    socket.join('admin-room');
  });
});

// When new registration is created
io.to('admin-room').emit('new-registration', registrationData);
```

```typescript
// Frontend
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

useEffect(() => {
  socket.emit('join-admin-room');
  
  socket.on('new-registration', (data) => {
    // Update admin dashboard in real-time
    setRegistrations(prev => [data, ...prev]);
  });
  
  return () => {
    socket.off('new-registration');
  };
}, []);
```

### Option 2: Server-Sent Events (SSE)

```javascript
// Backend
app.get('/api/registrations/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  
  // Send updates when new registrations are added
  const sendUpdate = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };
  
  // Store reference to send updates
  req.app.locals.adminStreams = req.app.locals.adminStreams || [];
  req.app.locals.adminStreams.push(sendUpdate);
});
```

## Environment Variables

Create a `.env` file:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ispora_registrations
# or
DATABASE_URL=postgresql://username:password@localhost:5432/ispora_db

# API
API_PORT=3001
NODE_ENV=production

# Frontend
REACT_APP_API_URL=http://localhost:3001/api
```

## Security Considerations

1. **Input Validation**: Validate all user inputs
2. **Rate Limiting**: Prevent spam registrations
3. **CORS**: Configure proper CORS settings
4. **Authentication**: Protect admin dashboard
5. **Data Encryption**: Encrypt sensitive data
6. **IP Logging**: Log IP addresses for security

## Deployment Options

### 1. Vercel + MongoDB Atlas
- Deploy frontend to Vercel
- Use MongoDB Atlas for database
- Deploy backend to Vercel Functions

### 2. Heroku + PostgreSQL
- Deploy full-stack app to Heroku
- Use Heroku Postgres add-on
- Configure environment variables

### 3. AWS + DynamoDB
- Deploy frontend to S3 + CloudFront
- Use DynamoDB for database
- Deploy backend to Lambda + API Gateway

## Migration from Mock to Real Database

1. **Backup current data** (if any exists in localStorage)
2. **Set up real database** (MongoDB/PostgreSQL/Firebase)
3. **Update environment variables**
4. **Deploy backend API**
5. **Update frontend service calls**
6. **Test thoroughly**
7. **Migrate existing data** (if any)

## Monitoring and Analytics

- **Database performance**: Monitor query performance
- **User analytics**: Track registration patterns
- **Error tracking**: Monitor API errors
- **Real-time metrics**: Dashboard usage statistics

This guide provides a roadmap for transitioning from the current mock implementation to a production-ready database system.
