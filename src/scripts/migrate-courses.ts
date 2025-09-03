// Run this script to migrate existing courses from localStorage format to database
// Usage: npx tsx src/scripts/migrate-courses.ts

import { prisma } from '../lib/prisma'

const defaultCourses = [
  {
    title: 'Complete SQL Workbook',
    subtitle: 'Master Database Management',
    description: 'Comprehensive SQL workbook covering everything from basic queries to advanced database operations. Perfect for beginners and professionals.',
    detailedDescription: 'This comprehensive SQL workbook is designed to take you from a complete beginner to an advanced database professional. With over 40 hours of content, hands-on exercises, real-world examples, and practical projects that mirror industry scenarios.',
    price: '₹999',
    originalPrice: '₹1999',
    duration: '40+ Hours',
    level: 'Beginner to Advanced',
    thumbnail: '📊',
    pdfFile: null,
    features: [
      'Complete SQL Reference Guide',
      'Hands-on Practice Exercises',
      'Real-world Database Projects',
      'PDF Workbook & Examples',
      'Lifetime Access'
    ],
    topics: [
      'Basic SQL Queries',
      'Joins & Relationships',
      'Functions & Procedures',
      'Database Design',
      'Performance Optimization'
    ],
    popularity: 85,
    averageRating: 4.8,
    totalRatings: 127,
    enrollmentCount: 500,
    featured: true,
    comingSoon: false
  },
  {
    title: 'Python for Data Analysis',
    subtitle: 'Coming Soon',
    description: 'Master Python for data analysis, visualization, and machine learning. Perfect for aspiring data scientists.',
    price: 'Coming Soon',
    originalPrice: '',
    duration: 'TBD',
    level: 'Intermediate',
    thumbnail: '🐍',
    features: ['Coming Soon'],
    topics: ['Coming Soon'],
    popularity: 0,
    averageRating: 0,
    totalRatings: 0,
    enrollmentCount: 0,
    featured: false,
    comingSoon: true
  }
]

async function migrateCourses() {
  try {
    for (const courseData of defaultCourses) {
      await prisma.course.create({ data: courseData })
      console.log(`Created course: ${courseData.title}`)
    }
    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateCourses()