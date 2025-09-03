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
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { success: false, error: 'Title and description are required' },
        { status: 400 }
      )
    }

    // Generate a proper course ID from title
    const courseId = body.title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .trim()

    const course = await prisma.course.create({
      data: {
        id: courseId,
        title: body.title,
        subtitle: body.subtitle || '',
        description: body.description,
        detailedDescription: body.detailedDescription || body.description,
        price: body.price || 'TBD',
        originalPrice: body.originalPrice || '',
        duration: body.duration || 'TBD',
        level: body.level || 'Beginner',
        thumbnail: body.thumbnail || '📚',
        pdfFile: body.pdfFile || null,
        features: body.features || [],
        topics: body.topics || [],
        featured: Boolean(body.featured),
        comingSoon: Boolean(body.comingSoon),
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