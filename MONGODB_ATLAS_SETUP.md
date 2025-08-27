# MongoDB Atlas Setup Guide for iSpora

## 🚀 Quick Setup (5 minutes)

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Try Free" or "Sign Up"
3. Create account with email/password or Google account

### 2. Create Cluster
1. Choose "FREE" tier (M0)
2. Select cloud provider: **AWS** (recommended)
3. Select region: **N. Virginia (us-east-1)** (closest to Vercel)
4. Click "Create"

### 3. Set Up Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `ispora-admin`
5. Password: Generate a strong password (save it!)
6. Built-in Role: "Atlas admin" (for full access)
7. Click "Add User"

### 4. Set Up Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 5. Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Add database name: `?retryWrites=true&w=majority&dbName=ispora`

**Example connection string:**
```
mongodb+srv://ispora-admin:YourPassword123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&dbName=ispora
```

## 🔧 Configure Vercel Environment Variables

### 1. Go to Vercel Dashboard
1. Visit [vercel.com](https://vercel.com)
2. Click on your `ispora-page` project
3. Go to "Settings" → "Environment Variables"

### 2. Add Environment Variables
Add these three variables:

| Name | Value | Environment |
|------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://ispora-admin:YourPassword123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&dbName=ispora` | Production |
| `MONGODB_DB` | `ispora` | Production |
| `VITE_API_BASE_URL` | `https://ispora-page-9q28j59s1-jimdevengs-projects.vercel.app/api` | Production |

### 3. Redeploy
1. Go to "Deployments" tab
2. Click "Redeploy" on your latest deployment
3. Wait for deployment to complete

## 🧪 Test Your Setup

### 1. Test Registration
1. Visit: `https://ispora-page-9q28j59s1-jimdevengs-projects.vercel.app/#register`
2. Fill out and submit the form
3. Check MongoDB Atlas → "Browse Collections" to see the data

### 2. Test Admin Dashboard
1. Visit: `https://ispora-page-9q28j59s1-jimdevengs-projects.vercel.app/#admin`
2. Enter password: `ispora2025`
3. Verify you can see registration data

### 3. Test API Directly
1. Visit: `https://ispora-page-9q28j59s1-jimdevengs-projects.vercel.app/api/registrations`
2. Should return JSON array of registrations

## 🔒 Security Best Practices

### 1. Database User
- Use a dedicated user for the application
- Don't use the root admin user
- Use strong, unique passwords

### 2. Network Access
- For production: Add Vercel's IP ranges instead of 0.0.0.0/0
- Vercel IP ranges: [https://vercel.com/docs/concepts/edge-network/regions](https://vercel.com/docs/concepts/edge-network/regions)

### 3. Environment Variables
- Never commit secrets to Git
- Use Vercel's encrypted environment variables
- Rotate passwords regularly

## 📊 Monitor Your Database

### 1. Atlas Dashboard
- Monitor database performance
- Check storage usage
- View connection patterns

### 2. Set Up Alerts
1. Go to "Alerts" in Atlas
2. Set up alerts for:
   - High CPU usage
   - High memory usage
   - Connection count limits

## 🆘 Troubleshooting

### Common Issues:

1. **"Database connection failed"**
   - Check MONGODB_URI format
   - Verify username/password
   - Check network access settings

2. **"Authentication failed"**
   - Verify database user credentials
   - Check if user has correct permissions

3. **"Network timeout"**
   - Check if IP whitelist includes 0.0.0.0/0
   - Verify cluster is running

### Get Help:
- MongoDB Atlas Documentation: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)

---

**Next Step:** After MongoDB is working, we'll set up your custom domain `ispora.com`!
