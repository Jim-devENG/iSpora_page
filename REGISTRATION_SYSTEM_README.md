# iSpora Registration System & Admin Dashboard

## Overview

This system provides a comprehensive registration form for users to join iSpora's WhatsApp and Telegram communities, along with a powerful admin dashboard for managing registrations and tracking user data.

## Features

### 🎯 Registration Form
- **User-friendly interface** with modern design
- **Required fields**: Name, Email, WhatsApp number, Country of Origin, Country of Residence
- **Automatic IP tracking** and location detection
- **Real-time form validation**
- **Success/error feedback**
- **Mobile responsive design**

### 📊 Admin Dashboard
- **Comprehensive statistics** (total, today, this week, this month)
- **User management** with search and filtering
- **Real-time location tracking** with IP geolocation
- **Export functionality** (CSV format)
- **Detailed user profiles** with technical information
- **Status management** (Active, Pending, Verified)

### 🔐 Security Features
- **Password-protected admin access**
- **Session management** (24-hour expiry)
- **Secure data storage** (localStorage for demo, can be replaced with backend)

## How to Use

### For Users (Registration)

1. **Navigate to Registration Page**
   - Click "Join Us" in the navigation menu
   - Or visit: `http://localhost:5174/#register`

2. **Fill Out the Form**
   - Enter your full name
   - Provide a valid email address
   - Add your WhatsApp number (with country code)
   - Select your country of origin
   - Select your current country of residence

3. **Submit Registration**
   - The system will automatically detect your location
   - You'll receive confirmation upon successful registration

### For Administrators

1. **Access Admin Dashboard**
   - Navigate to: `http://localhost:5174/#admin`
   - Enter admin password: `ispora2025`

2. **View Dashboard Statistics**
   - Total registrations
   - Today's new registrations
   - Weekly and monthly trends
   - Top countries by registration count

3. **Manage Registrations**
   - Search users by name, email, or phone
   - Filter by status (All, Active, Pending, Verified)
   - View detailed user information
   - Export data to CSV

4. **User Details**
   - Click the eye icon to view full user details
   - See IP address and detected location
   - View registration timestamp and user agent
   - Manage user status

## Technical Implementation

### Components Structure

```
components/
├── SocialMediaRegistrationForm.tsx    # Main registration form
├── RegistrationPage.tsx               # Registration page wrapper
├── AdminDashboard.tsx                 # Admin dashboard interface
├── AdminAccess.tsx                    # Admin authentication
└── services/
    └── registrationService.ts         # Data management service
```

### Data Flow

1. **Registration Process**
   ```
   User Input → Form Validation → IP/Location Detection → Service Storage → Success Feedback
   ```

2. **Admin Dashboard**
   ```
   Authentication → Data Fetching → Statistics Calculation → UI Rendering → User Management
   ```

### Key Technologies

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Motion** for animations
- **Radix UI** components
- **LocalStorage** for data persistence (demo)

## API Integration

### Current Implementation (Demo)
- Uses localStorage for data persistence
- Mock API calls with simulated delays
- Client-side data management

### Production Ready
To make this production-ready, replace the mock service with:

```typescript
// Replace in registrationService.ts
const API_BASE_URL = 'https://your-api-domain.com/api';

export const registrationService = {
  async submitRegistration(data) {
    const response = await fetch(`${API_BASE_URL}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  async getRegistrations() {
    const response = await fetch(`${API_BASE_URL}/registrations`);
    return response.json();
  }
  // ... other methods
};
```

## Using a Real Database on Vercel (MongoDB Atlas)

To enable production storage and dashboard using serverless API routes:

1. Create a MongoDB Atlas cluster and user
2. Copy the connection string and set it in Vercel as `MONGODB_URI`
3. Optionally set `MONGODB_DB` (defaults to `ispora`)
4. Deploy this repository to Vercel
5. Set `VITE_API_BASE_URL` env var for the frontend:
   - Locally (with `vercel dev`): add `.env` with `VITE_API_BASE_URL=http://localhost:3000/api`
   - On Vercel: set `VITE_API_BASE_URL=https://ispora.com/api`

The frontend will automatically use the API if `VITE_API_BASE_URL` is defined; otherwise it falls back to the mock service.

## IP Tracking & Geolocation

The system automatically tracks:
- **IP Address** (via ipify.org API)
- **Geographic Location** (via ipapi.co API)
- **City, Country, Region**
- **Latitude/Longitude coordinates**
- **Timezone information**

## Security Considerations

### Current Implementation
- Basic password protection for admin access
- Client-side session management
- LocalStorage for data persistence

### Production Recommendations
- **Server-side authentication** with JWT tokens
- **Database storage** instead of localStorage
- **HTTPS encryption** for all data transmission
- **Rate limiting** for registration submissions
- **Input sanitization** and validation
- **GDPR compliance** for data handling

## Customization

### Adding New Fields
1. Update the `RegistrationData` interface in `registrationService.ts`
2. Add form fields in `SocialMediaRegistrationForm.tsx`
3. Update the admin dashboard table and details modal

### Styling Changes
- Modify Tailwind classes in components
- Update color scheme in `styles/globals.css`
- Customize animations in `utils/animationUtils.ts`

### Admin Password
Change the admin password in `AdminAccess.tsx`:
```typescript
const ADMIN_PASSWORD = 'your-new-password';
```

## Troubleshooting

### Common Issues

1. **Registration not saving**
   - Check browser localStorage support
   - Verify form validation passes
   - Check console for errors

2. **Admin access not working**
   - Clear localStorage and try again
   - Verify password is correct
   - Check if session has expired

3. **Location not detected**
   - Check internet connection
   - Verify API endpoints are accessible
   - Check browser geolocation permissions

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Future Enhancements

- [ ] **Email notifications** for new registrations
- [ ] **WhatsApp integration** for automatic group invites
- [ ] **Telegram bot integration**
- [ ] **Advanced analytics** and reporting
- [ ] **Bulk operations** for user management
- [ ] **User verification system**
- [ ] **Multi-language support**
- [ ] **Mobile app version**

## Support

For technical support or feature requests, please contact the development team.

---

**Note**: This is a demo implementation. For production use, implement proper backend services, database storage, and security measures.
