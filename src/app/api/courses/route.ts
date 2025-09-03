import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

// POST /api/courses - Create new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      subtitle,
      description,
      detailedDescription,
      price,
      originalPrice,
      duration,
      level,
      thumbnail,
      pdfFile,
      features,
      topics,
      featured,
      comingSoon
    } = body

    // Generate a proper course ID from title
    const courseId = title?.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .trim() || `course-${Date.now()}`

    // Check if course with this ID already exists
    const existingCourse = await prisma.course.findUnique({ where: { id: courseId } })
    if (existingCourse) {
      return NextResponse.json(
        { success: false, error: 'A course with this title already exists' },
        { status: 400 }
      )
    }

    const course = await prisma.course.create({
      data: {
        id: courseId,
        title,
        subtitle,
        description,
        detailedDescription,
        price,
        originalPrice,
        duration,
        level,
        thumbnail,
        pdfFile,
        features,
        topics,
        featured: featured || false,
        comingSoon: comingSoon || false,
        averageRating: 0, // Start with 0 rating
        totalRatings: 0,
        popularity: 0,
        enrollmentCount: 0
      }
    })

    return NextResponse.json({ success: true, course })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    )
  }
}