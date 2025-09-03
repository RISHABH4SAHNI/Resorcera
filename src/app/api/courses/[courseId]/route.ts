import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handleApiError } from '@/lib/errorHandler'
import { validateCourseInput, sanitizeString } from '@/lib/validation'
import { rateLimit } from '@/lib/rateLimit'

// GET /api/courses/[courseId] - Get single course

interface Params {
  courseId: string
}

// GET /api/courses/[courseId] - Fetch single course
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: params.courseId },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        },
        _count: {
          select: {
            enrollments: true,
            ratings: true
          }
        }
      }
    })

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, course })
  } catch (error) {
    return handleApiError(error)
  }
}

// PUT /api/courses/[courseId] - Update course
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    // Apply rate limiting
    await rateLimit({ requests: 20, window: 15 })(request)
    
    
    let body = await request.json()
    
    // Validate input if it's a complete course update
    if (body.title || body.description) {
      validateCourseInput(body)
    }

    // Handle field name conversions from frontend
    if (body.students !== undefined) {
      body.enrollmentCount = body.students
      delete body.students
    }
    if (body.rating !== undefined) {
      body.averageRating = body.rating
      delete body.rating
    }

    // Remove fields that shouldn't be updated via this route
    delete body.id
    delete body.createdAt
    delete body.updatedAt
    
    // Sanitize string fields if they exist
    if (body.title) body.title = sanitizeString(body.title, 200)
    if (body.subtitle) body.subtitle = sanitizeString(body.subtitle, 200)
    if (body.description) body.description = sanitizeString(body.description, 5000)
    if (body.detailedDescription) body.detailedDescription = sanitizeString(body.detailedDescription, 10000)
    if (body.price) body.price = sanitizeString(body.price, 50)
    if (body.originalPrice) body.originalPrice = sanitizeString(body.originalPrice, 50)
    if (body.duration) body.duration = sanitizeString(body.duration, 100)

    const course = await prisma.course.update({
      where: { id: params.courseId },
      data: body
    })

    return NextResponse.json({ success: true, course })
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/courses/[courseId] - Delete course
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    // Apply rate limiting
    await rateLimit({ requests: 10, window: 15 })(request)
    
    
    // First check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id: params.courseId }
    })

    if (!existingCourse) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      )
    }

    await prisma.course.delete({
      where: { id: params.courseId }
    })

    return NextResponse.json({ success: true, message: 'Course deleted successfully' })
  } catch (error) {
    return handleApiError(error)
  }
}
