import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
  courseId: string
}

// POST /api/courses/[courseId]/view - Track course view and update popularity
export async function POST(request: NextRequest, { params }: { params: Params }) {
  try {
    // Get current course
    const course = await prisma.course.findUnique({
      where: { id: params.courseId }
    })

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      )
    }

    // Increment popularity by 1 (you can adjust this logic)
    const updatedCourse = await prisma.course.update({
      where: { id: params.courseId },
      data: {
        popularity: Math.min(course.popularity + 1, 100) // Cap at 100%
      }
    })

    return NextResponse.json({ success: true, popularity: updatedCourse.popularity })
  } catch (error) {
    console.error('Error tracking course view:', error)
    return NextResponse.json({ success: false, error: 'Failed to track view' }, { status: 500 })
  }
}