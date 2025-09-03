# Database Setup Guide

This guide will help you set up PostgreSQL database for Resorcera course management with ratings and student enrollment tracking.

## Prerequisites

1. **Install PostgreSQL** (if not already installed):
   - **macOS**: `brew install postgresql`
   - **Ubuntu**: `sudo apt install postgresql postgresql-contrib`
   - **Windows**: Download from [PostgreSQL website](https://www.postgresql.org/download/)

2. **Start PostgreSQL service**:
   - **macOS**: `brew services start postgresql`
   - **Ubuntu**: `sudo systemctl start postgresql`
   - **Windows**: PostgreSQL service starts automatically

## Database Setup

1. **Create Database**:
   ```bash
   # Connect to PostgreSQL as superuser
   sudo -u postgres psql

   # Create database
   CREATE DATABASE resorcera_db;

   # Create user (optional)
   CREATE USER resorcera_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE resorcera_db TO resorcera_user;

   # Exit PostgreSQL
   \q
   ```

2. **Update Environment Variables**:
   Edit `.env.local` file:
   ```bash
   # Update DATABASE_URL with your actual credentials
   DATABASE_URL="postgresql://username:password@localhost:5432/resorcera_db"

   # Example with default postgres user:
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/resorcera_db"
   ```

3. **Generate Prisma Client**:
   ```bash
   npm run db:generate
   ```

4. **Push Database Schema**:
   ```bash
   npm run db:push
   ```

5. **Migrate Default Courses** (optional):
   ```bash
   npm run db:migrate
   ```

## Database Features

### Course Management
- ✅ Complete CRUD operations
- ✅ Automatic rating calculations
- ✅ Student enrollment tracking
- ✅ Featured course management
- ✅ Coming soon course support

### Rating System
- ✅ User ratings (1-5 stars)
- ✅ Review comments
- ✅ Automatic average calculation
- ✅ Rating count tracking

### Student Enrollment
- ✅ User registration/login
- ✅ Course enrollment tracking
- ✅ Progress tracking
- ✅ Automatic enrollment counting

## Database Management Commands

```bash
# View database in browser
npm run db:studio

# Reset database (careful!)
npx prisma db push --force-reset

# View database schema
npx prisma db pull
