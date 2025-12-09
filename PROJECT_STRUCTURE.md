# Project Structure

## Overview

This project is separated into **frontend** and **backend** components:

- **Frontend**: React/Vite application in `frontend/` folder
- **Backend**: Supabase (database, storage, auth) - no separate server needed
- **API Routes**: Vercel serverless functions in `api/` folder (at root level) that connect frontend to Supabase

## Directory Structure

```
ispora-page/
├── frontend/              # Frontend React application
│   ├── components/       # React components
│   ├── public/           # Static assets (images, fonts, etc.)
│   ├── styles/           # CSS files
│   ├── src/              # Source utilities
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.html        # HTML template
│
├── api/                  # Vercel serverless functions (API routes)
│   ├── _lib/             # Shared utilities (Supabase client)
│   ├── _types/           # TypeScript types
│   ├── blog-posts/       # Blog posts API routes
│   ├── events/           # Events API routes
│   ├── registrations/    # Registration API routes
│   ├── dashboard/        # Dashboard API routes
│   └── *.ts              # Other API routes
│
├── dist/                 # Build output (generated, not committed)
│
└── [config files]        # Root-level configs (vite.config.ts, package.json, etc.)
```

## Backend Architecture

### Supabase (Primary Backend)
- **Database**: PostgreSQL database hosted on Supabase
- **Storage**: File storage for images/uploads
- **Auth**: Authentication (if needed in future)
- **Tables**: `registrations`, `blog_posts`, `events`, `partners`

### API Routes (Vercel Serverless Functions)
The `api/` folder contains thin serverless functions that:
- Connect to Supabase using `getSupabaseClient()` from `api/_lib/supabase.ts`
- Handle HTTP requests (GET, POST, PUT, DELETE)
- Return JSON responses
- Set CORS headers

**Key API Routes:**
- `/api/registrations` - Registration CRUD
- `/api/blog-posts` - Blog posts CRUD
- `/api/events` - Events CRUD
- `/api/dashboard/stats` - Dashboard statistics
- `/api/upload-image` - Image upload (stub, to be implemented)
- `/api/debug-alive` - Deployment verification

## Frontend Architecture

### React Application
- Built with **Vite** for fast development and optimized builds
- Uses **React Router** (hash-based routing) for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Radix UI** components for accessible UI primitives

### Key Frontend Features
- Multi-page SPA with hash routing
- Admin dashboard for content management
- Blog and events pages
- Registration forms
- Responsive design

## Build Process

1. **Frontend Build**: `npm run build`
   - Builds React app from `frontend/` folder
   - Outputs to `dist/` folder at root
   - Vite handles bundling, minification, optimization

2. **API Routes**: Auto-detected by Vercel
   - Vercel automatically detects `api/**/*.ts` files
   - Each file becomes a serverless function
   - No separate build step needed

3. **Deployment**: Vercel
   - Frontend: Served from `dist/` folder
   - API Routes: Deployed as serverless functions
   - Environment variables: Set in Vercel dashboard

## Environment Variables

### Required (Vercel Dashboard)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for API routes)
- `VITE_SUPABASE_URL` - Supabase URL (for frontend, if using client SDK)
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key (for frontend)

### Optional
- `VITE_API_BASE_URL` - API base URL (defaults to `/api`)

## Development

### Local Development
```bash
# Install dependencies
npm install

# Start dev server (frontend only)
npm run dev

# For API routes, use Vercel CLI
npm i -g vercel
vercel dev
```

### File Organization

**Frontend Files** → `frontend/` folder:
- All React components
- Styles
- Public assets
- Frontend utilities

**Backend/API Files** → `api/` folder (root level):
- Serverless function handlers
- Supabase client configuration
- Shared types and utilities

**Config Files** → Root level:
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `vercel.json` - Vercel deployment configuration

## Why This Structure?

1. **Clear Separation**: Frontend and backend code are clearly separated
2. **Vercel Compatibility**: API routes must be at root `api/` for Vercel auto-detection
3. **Supabase as Backend**: No need for a separate backend server - Supabase handles everything
4. **Maintainability**: Easier to navigate and understand the codebase
5. **Scalability**: Easy to add new API routes or frontend features

## Important Notes

- **API routes stay at root**: Vercel requires `api/` folder at root level
- **Frontend in `frontend/`**: All React code is in `frontend/` folder
- **Supabase is the backend**: No Express/Node server needed
- **Build output**: Frontend builds to `dist/` at root (Vercel requirement)

