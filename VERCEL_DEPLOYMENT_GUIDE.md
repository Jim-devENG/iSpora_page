# Vercel Deployment Guide for ispora.com

## Quick Setup for Production

### 1. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier works fine)
3. Create a database user with read/write permissions
4. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. Add `0.0.0.0/0` to IP Access List (or add Vercel's IP ranges for better security)

### 2. Deploy to Vercel
1. Push this repository to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Set the following environment variables in Vercel project settings:

```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/
MONGODB_DB=ispora
VITE_API_BASE_URL=https://ispora.com/api
```

### 3. Domain Configuration
1. In Vercel project settings, go to "Domains"
2. Add your custom domain: `ispora.com`
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 24 hours)

## Environment Variables Breakdown

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `MONGODB_DB` | `ispora` | Database name (optional, defaults to 'ispora') |
| `VITE_API_BASE_URL` | `https://ispora.com/api` | Frontend API endpoint |

## Testing Your Deployment

### 1. Test Registration Form
- Visit: `https://ispora.com/#register`
- Fill out and submit the form
- Check MongoDB Atlas to see if data is saved

### 2. Test Admin Dashboard
- Visit: `https://ispora.com/#admin`
- Enter password: `ispora2025`
- Verify you can see registration data

### 3. Test API Endpoints
- `https://ispora.com/api/registrations` (GET - should return JSON)
- `https://ispora.com/api/dashboard/stats` (GET - should return stats)

## Local Development with API

If you want to test the API locally:

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

3. Run both servers:
```bash
# Terminal 1: Vercel dev server (API)
vercel dev

# Terminal 2: Frontend dev server
npm run dev
```

4. Visit `http://localhost:5174` for the frontend

## Troubleshooting

### Common Issues

1. **"Database connection failed"**
   - Check `MONGODB_URI` is correct
   - Verify IP whitelist in MongoDB Atlas
   - Check network connectivity

2. **"Failed to fetch registrations"**
   - Verify `VITE_API_BASE_URL` is set correctly
   - Check if API routes are deployed
   - Look at Vercel function logs

3. **Domain not working**
   - Check DNS configuration
   - Wait for DNS propagation
   - Verify domain is added in Vercel

### Vercel Function Logs
1. Go to Vercel dashboard
2. Click on your project
3. Go to "Functions" tab
4. Check logs for any errors

## Security Recommendations

1. **MongoDB Atlas Security**
   - Use strong passwords
   - Enable IP whitelisting (add Vercel IPs)
   - Enable database access logs

2. **Environment Variables**
   - Never commit secrets to Git
   - Use Vercel's environment variable encryption
   - Rotate passwords regularly

3. **API Security**
   - Consider adding rate limiting
   - Implement proper CORS policies
   - Add input validation

## Monitoring

### Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor function performance
- Track API usage

### MongoDB Atlas Monitoring
- Monitor database performance
- Set up alerts for high usage
- Track connection patterns

## Backup Strategy

1. **MongoDB Atlas Backups**
   - Enable automated backups
   - Set up point-in-time recovery
   - Export data regularly

2. **Code Backups**
   - Keep GitHub repository updated
   - Use Vercel's automatic deployments
   - Document any manual changes

## Cost Optimization

### Vercel
- Free tier includes 100GB bandwidth
- Serverless functions: $20 per million invocations
- Custom domains: Free

### MongoDB Atlas
- Free tier: 512MB storage, shared clusters
- Paid tiers start at $9/month for dedicated clusters

## Support

If you encounter issues:
1. Check Vercel function logs
2. Verify environment variables
3. Test API endpoints directly
4. Check MongoDB Atlas connection
5. Review this deployment guide

---

**Note**: This setup provides a production-ready registration system with real database storage, admin dashboard, and automatic deployment through Vercel.
