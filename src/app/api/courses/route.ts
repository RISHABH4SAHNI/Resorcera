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

    const course = await prisma.course.create({
      data: {
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
        averageRating: 5.0, // Default 5-star rating for new courses
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