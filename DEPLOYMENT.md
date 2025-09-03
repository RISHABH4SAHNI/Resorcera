# Resorcera - Production Deployment Guide

## Current Platform Status ✅

### **What's Ready Now**
- ✅ **Complete Course Platform** - Browse, view, and explore courses
- ✅ **Admin Panel** - Full course management system (`/admin`)
- ✅ **Responsive Design** - Mobile and desktop optimized
- ✅ **PDF Course Materials** - Upload and serve PDF resources
- ✅ **Course Search & Filtering** - Sort by popularity, rating, newest
- ✅ **Featured Course System** - Promote specific courses
- ✅ **Coming Soon Courses** - Tease upcoming content
- ✅ **Contact & About Pages** - Complete site structure
- ✅ **Database Integration** - PostgreSQL via Prisma ORM
- ✅ **Docker Development** - Local database setup

### **Current Functionality**

#### **Public Features**
- Course catalog browsing
- Individual course detail pages
- Course filtering and sorting
- PDF download for enrolled courses
- Contact form submission
- Responsive navigation
- SEO-optimized pages

#### **Admin Features** (`/admin` - Password: `resorcera2025`)
- ✅ **Add New Courses** - Active or upcoming courses
- ✅ **Edit Existing Courses** - Modify all course details
- ✅ **Delete Courses** - Remove courses with confirmation
- ✅ **Upload PDF Files** - Course materials via file upload
- ✅ **Manage Features** - Dynamic feature and topic management
- ✅ **Toggle Featured Status** - Promote/demote courses
- ✅ **Popularity Control** - Set custom popularity scores
- ✅ **Real-time Preview** - See changes immediately

#### **Technical Features**
- API endpoints for all CRUD operations
- Prisma database schema with relationships
- File upload handling for PDFs
- Environment-based configuration
- Docker containerization for development

---

## Pre-Production Checklist

### 1. Database Setup

#### **Supabase Database Configuration**
```bash
# 1. Create Supabase project at https://supabase.com
# 2. Get connection string from Settings → Database
# 3. Update .env.production file
```

**Update Environment Variables:**
```env
# .env.production
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require"
```

**Deploy Database Schema:**
```bash
# Push Prisma schema to production database
npm run db:push

# Generate Prisma client
npm run db:generate
```

### 2. Data Management

#### **Remove Demo Data**
```bash
# Clear localStorage-based demo data (happens automatically on admin side)
# Demo data is stored locally, not in production database
```

#### **Admin Data Entry**
- ✅ **Admin courses are automatically added to database**
- Admin interface uses API endpoints (`/api/courses`) that write to Prisma/PostgreSQL
- Data entered through admin panel (`/admin`) will persist in production database
- No manual database migration needed for admin-entered courses

#### **Data Sources:**
| Data Type | Storage | Auto-Database | Notes |
|-----------|---------|---------------|-------|
| Demo courses | localStorage | ❌ | Development only |
| Admin courses | PostgreSQL | ✅ | Production ready |
| User enrollments | PostgreSQL | ✅ | Automatic via API |
| Course ratings | PostgreSQL | ✅ | Automatic via API |

### 3. Firebase Deployment Setup

#### **Install Firebase CLI**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

#### **Firebase Configuration**
```json
// firebase.json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

#### **Next.js Configuration for Static Export**
```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL
  }
}

module.exports = nextConfig
```

### 4. Build & Deploy Commands

```bash
# 1. Set environment for production
cp .env.production .env

# 2. Build the application
npm run build

# 3. Export static files (if using static export)
npm run export

# 4. Deploy to Firebase
firebase deploy
```

### 5. Environment Files Structure

```
├── .env                    # Current environment (copied from .env.production)
├── .env.local             # Local development (PostgreSQL on localhost:5434)
├── .env.production        # Production Supabase database
└── .env.backup           # Backup configurations
```

### 6. Production Database Schema

**Tables automatically created via Prisma:**
- `courses` - All course data from admin panel
- `users` - User accounts and authentication
- `enrollments` - Course enrollments with progress tracking
- `ratings` - Course reviews and ratings

### 7. Admin Panel Access

**Production Admin Access:**
```
URL: https://your-domain.web.app/admin
Password: resorcera2025

Features:
✅ Add/Edit/Delete courses → Automatically saves to PostgreSQL
✅ Manage course popularity → Updates database
✅ Upload PDF files → Stores in public/pdfs/
✅ Toggle featured courses → Database updates
```

### 8. File Uploads

**PDF Course Materials:**
```bash
# Ensure public/pdfs directory exists
mkdir -p public/pdfs

# PDF files uploaded via admin panel are stored in:
# public/pdfs/[course-id].pdf
```

### 9. Security Checklist

- [ ] Update admin password in `src/app/admin/page.tsx`
- [ ] Add proper authentication middleware for admin routes
- [ ] Configure CORS for API endpoints if needed
- [ ] Set up environment variable validation

### 10. Post-Deployment Verification

```bash
# Test production site
curl https://your-domain.web.app/api/courses

# Expected response: JSON with courses from database
{
  "success": true,
  "courses": [...]
}
```

---

## Ready-to-Use Features 🚀

### **Immediate Capabilities**

1. **Course Management**
   - Create courses with rich details (title, description, features, topics)
   - Set pricing, duration, and difficulty levels
   - Upload PDF course materials
   - Mark courses as featured or coming soon

2. **Content Organization**
   - Dynamic feature lists per course
   - Topic breakdowns for learning outcomes  
   - Popularity scoring system
   - Course categorization and sorting

3. **User Experience**
   - Responsive design across all devices
   - Course search and filtering
   - Individual course detail pages
   - PDF resource downloads

4. **Admin Control**
   - Password-protected admin panel
   - Real-time course editing
   - Bulk course management
   - File upload handling

### **What You Can Do Right Now**

1. **Start Adding Real Courses**
   ```
   → Visit /admin (password: resorcera2025)
   → Add your first production course
   → Upload course PDF materials
   → Set appropriate pricing and details
   ```

2. **Customize Content**
   - Update hero section messaging
   - Modify about page content
   - Adjust contact information
   - Change branding colors/fonts

3. **Deploy to Production**
   - Set up Supabase database
   - Configure Firebase hosting
   - Push schema and deploy
   - Admin courses automatically persist

---

## Quick Deployment Script

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Starting Resorcera deployment..."

# Copy production environment
cp .env.production .env

# Build application
npm run build

# Deploy to Firebase
firebase deploy

echo "✅ Deployment complete!"
echo "🌐 Visit: https://your-domain.web.app"
echo "🔧 Admin: https://your-domain.web.app/admin"
```

## Important Notes

1. **No demo data removal needed** - Demo data is localStorage-based and won't affect production
2. **Admin courses persist** - All courses added via `/admin` are automatically saved to PostgreSQL database
3. **Database is required** - Even with Firebase hosting, you need PostgreSQL for dynamic features
4. **Static export limitations** - If using static export, dynamic features like user accounts won't work

## Troubleshooting

**Database Connection Issues:**
```bash
# Test database connection
npm run db:push

# If connection fails, verify:
# 1. Supabase project is active
# 2. DATABASE_URL is correctly formatted
# 3. Password is URL-encoded properly
```

**Build Failures:**
```bash
# Clear cache and rebuild
rm -rf .next
npm install
npm run build
