import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    console.error('Error fetching course:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch course' },
      { status: 500 }
    )
  }
}

// PUT /api/courses/[courseId] - Update course
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const body = await request.json()

    const course = await prisma.course.update({
      where: { id: params.courseId },
      data: body
    })

    return NextResponse.json({ success: true, course })
  } catch (error) {
    console.error('Error updating course:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update course' },
      { status: 500 }
    )
  }
}

// DELETE /api/courses/[courseId] - Delete course
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    await prisma.course.delete({
      where: { id: params.courseId }
    })

    return NextResponse.json({ success: true, message: 'Course deleted successfully' })
  } catch (error) {
    console.error('Error deleting course:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}