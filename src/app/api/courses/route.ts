import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handleApiError } from '@/lib/errorHandler'
import { validateCourseInput, sanitizeString } from '@/lib/validation'
import { rateLimit } from '@/lib/rateLimit'

// GET /api/courses - Fetch all courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sortBy = searchParams.get('sortBy') || 'rating'

    let orderBy: any = {}
    switch (sortBy) {
      case 'students':
        orderBy = { enrollmentCount: 'desc' }
        break
      case 'newest':
        orderBy = { createdAt: 'desc' }
        break
      case 'rating':
      default:
        orderBy = { averageRating: 'desc' }
        break
    }

    const courses = await prisma.course.findMany({
      orderBy,
      include: {
        _count: {
          select: {
            enrollments: true,
            ratings: true
          }
        }
      }
    })

    return NextResponse.json({ success: true, courses })
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/courses - Create new course
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    await rateLimit({ requests: 10, window: 15 })(request)

    const body = await request.json()

    // Validate input
    validateCourseInput(body)

    // Sanitize string inputs
    const sanitizedData = {
      title: sanitizeString(body.title, 200),
      subtitle: body.subtitle ? sanitizeString(body.subtitle, 200) : undefined,
      description: sanitizeString(body.description, 5000),
      detailedDescription: body.detailedDescription ? sanitizeString(body.detailedDescription, 10000) : undefined,
      price: body.price ? sanitizeString(body.price, 50) : undefined,
      originalPrice: body.originalPrice ? sanitizeString(body.originalPrice, 50) : undefined,
      duration: body.duration ? sanitizeString(body.duration, 100) : undefined,
      level: body.level || 'Beginner',
      thumbnail: body.thumbnail ? sanitizeString(body.thumbnail, 10) : '📚',
      pdfFile: body.pdfFile,
      features: Array.isArray(body.features) ? body.features.map((f: string) => sanitizeString(f, 200)) : [],
      topics: Array.isArray(body.topics) ? body.topics.map((t: string) => sanitizeString(t, 200)) : [],
      featured: Boolean(body.featured),
      comingSoon: Boolean(body.comingSoon)
    }

    // Generate a proper course ID from title
    const courseId = sanitizedData.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .trim()

    const course = await prisma.course.create({
      data: {
        id: courseId,
        ...sanitizedData,
        averageRating: 0, // Start with 0 rating
        totalRatings: 0,
        popularity: 0,
        enrollmentCount: 0
      }
    })

    return NextResponse.json({ success: true, course })
  } catch (error) {
    return handleApiError(error)
  }
}