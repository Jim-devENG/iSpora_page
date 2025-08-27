# Custom Domain Setup: ispora.com

## 🌐 Setting Up ispora.com with Vercel

### Prerequisites
- Your domain `ispora.com` must be registered with a domain registrar
- You need access to your domain's DNS settings

## 🚀 Quick Setup

### 1. Add Domain in Vercel
1. Go to your Vercel project: `ispora-page`
2. Click "Settings" → "Domains"
3. Click "Add Domain"
4. Enter: `ispora.com`
5. Click "Add"

### 2. Configure DNS Records
Vercel will show you the required DNS records. You need to add these to your domain registrar:

#### Option A: Using Vercel's Nameservers (Recommended)
1. Go to your domain registrar (where you bought ispora.com)
2. Find "Nameservers" or "DNS" settings
3. Replace existing nameservers with Vercel's:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ns3.vercel-dns.com
   ns4.vercel-dns.com
   ns5.vercel-dns.com
   ```

#### Option B: Using A Records (Alternative)
If you prefer to keep your current nameservers, add these records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.19.36 |
| CNAME | www | cname.vercel-dns.com |

### 3. Wait for DNS Propagation
- DNS changes can take 24-48 hours to propagate globally
- You can check propagation at: [whatsmydns.net](https://whatsmydns.net)
- Enter `ispora.com` and check A records

## 🔧 Update Environment Variables

Once your domain is working, update the environment variable:

1. Go to Vercel project settings
2. Find `VITE_API_BASE_URL`
3. Change from: `https://ispora-page-9q28j59s1-jimdevengs-projects.vercel.app/api`
4. Change to: `https://ispora.com/api`
5. Save and redeploy

## 🧪 Test Your Domain

### 1. Test Main Site
- Visit: `https://ispora.com`
- Should show your iSpora homepage

### 2. Test Registration
- Visit: `https://ispora.com/#register`
- Test the registration form

### 3. Test Admin Dashboard
- Visit: `https://ispora.com/#admin`
- Enter password: `ispora2025`

### 4. Test API
- Visit: `https://ispora.com/api/registrations`
- Should return JSON data

## 🔒 SSL/HTTPS Setup

Vercel automatically provides SSL certificates:
- HTTPS will work automatically
- No additional configuration needed
- Certificates auto-renew

## 📱 Subdomain Setup (Optional)

If you want to add subdomains:

### 1. Add Subdomain in Vercel
1. Go to "Settings" → "Domains"
2. Click "Add Domain"
3. Enter: `admin.ispora.com` (or any subdomain)
4. Configure DNS as above

### 2. Common Subdomains
- `admin.ispora.com` - Admin dashboard
- `api.ispora.com` - API endpoints
- `www.ispora.com` - Main site (automatic)

## 🆘 Troubleshooting

### Common Issues:

1. **"Domain not found"**
   - Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
   - Verify nameservers are correct
   - Wait 24-48 hours for full propagation

2. **"SSL certificate error"**
   - Vercel handles SSL automatically
   - Wait for certificate to be issued (usually 5-10 minutes)
   - Check if domain is properly configured

3. **"Site not loading"**
   - Verify DNS records are correct
   - Check if domain is added in Vercel
   - Ensure project is deployed

### DNS Check Commands:
```bash
# Check A record
nslookup ispora.com

# Check nameservers
nslookup -type=ns ispora.com

# Check propagation
dig ispora.com
```

## 📊 Domain Analytics

### 1. Vercel Analytics
- Enable in project settings
- Track page views, performance
- Monitor API usage

### 2. Custom Analytics
- Add Google Analytics
- Add Facebook Pixel
- Track conversions

## 🔄 Domain Management

### 1. Transfer Domain (if needed)
- Vercel can help transfer domains
- Contact Vercel support for assistance

### 2. Renewal
- Domain renewals handled by your registrar
- Vercel hosting continues automatically

---

**🎉 Congratulations!** Your iSpora app is now live at `ispora.com` with:
- ✅ Custom domain
- ✅ SSL/HTTPS
- ✅ MongoDB Atlas database
- ✅ Admin dashboard
- ✅ Registration system
