# Test API Routes Directly

## Test in Browser Console

Open your browser's developer console (F12) on `https://ispora.com` and run these tests:

### Test 1: Blog Posts API
```javascript
fetch('/api/blog-posts')
  .then(r => {
    console.log('Status:', r.status);
    console.log('Status Text:', r.statusText);
    return r.text();
  })
  .then(text => {
    console.log('Response:', text);
  })
  .catch(err => console.error('Error:', err));
```

### Test 2: Upload Image API (GET - health check)
```javascript
fetch('/api/upload-image')
  .then(r => {
    console.log('Status:', r.status);
    return r.json();
  })
  .then(data => console.log('Response:', data))
  .catch(err => console.error('Error:', err));
```

### Test 3: Compare with Working Route
```javascript
fetch('/api/registrations')
  .then(r => {
    console.log('Registrations Status:', r.status);
    return r.json();
  })
  .then(data => console.log('Registrations Response:', data.length, 'items'))
  .catch(err => console.error('Error:', err));
```

## Check Runtime Logs in Vercel

1. In the deployment page, look for **"Runtime Logs"** section
2. Click on it to see real-time function invocations
3. Try calling the API from your browser
4. Watch the logs to see what errors appear

## Check Network Tab

1. Open browser DevTools → Network tab
2. Try to upload an image or fetch blog posts
3. Look at the failed request
4. Check:
   - Status code (should be 404)
   - Response headers
   - Response body (might show error details)

