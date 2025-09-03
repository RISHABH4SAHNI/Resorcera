import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
  courseId: string
}

// POST /api/courses/[courseId]/enroll - Enroll user in course
export async function POST(request: NextRequest, { params }: { params: Params }) {
  try {
    const { userId, userEmail, userName } = await request.json()

    // Create user if doesn't exist
    let user
    if (userId) {
      user = await prisma.user.findUnique({ where: { id: userId } })
    } else if (userEmail) {
      user = await prisma.user.findUnique({ where: { email: userEmail } })
    }

    if (!user && userEmail && userName) {
      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: userName
        }
      })
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User information required' },
        { status: 400 }
      )
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId
        }
      }
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { success: false, error: 'User already enrolled in this course' },
        { status: 400 }
      )
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: params.courseId
      }
    })

    // Update course enrollment count
    await prisma.course.update({
      where: { id: params.courseId },
      data: {
        enrollmentCount: {
          increment: 1
        }
      }
    })

    return NextResponse.json({ success: true, enrollment })
  } catch (error) {
    console.error('Error enrolling user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to enroll user' },
      { status: 500 }
    )
  }
}