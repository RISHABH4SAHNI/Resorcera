import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
  courseId: string
}

// POST /api/courses/[courseId]/rating - Add or update rating
export async function POST(request: NextRequest, { params }: { params: Params }) {
  try {
    const { userId, userEmail, userName, rating, review } = await request.json()

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

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

    // Upsert rating (create or update)
    const ratingRecord = await prisma.rating.upsert({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId
        }
      },
      update: {
        rating,
        review
      },
      create: {
        userId: user.id,
        courseId: params.courseId,
        rating,
        review
      }
    })

    // Recalculate course average rating
    const ratings = await prisma.rating.findMany({
      where: { courseId: params.courseId }
    })

    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length

    await prisma.course.update({
      where: { id: params.courseId },
      data: {
        averageRating: averageRating,
        totalRatings: ratings.length
      }
    })

    return NextResponse.json({ success: true, rating: ratingRecord })
  } catch (error) {
    console.error('Error adding rating:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add rating' },
      { status: 500 }
    )
  }
}

// GET /api/courses/[courseId]/rating - Get course ratings
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const ratings = await prisma.rating.findMany({
      where: { courseId: params.courseId },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ success: true, ratings })
  } catch (error) {
    console.error('Error fetching ratings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ratings' },
      { status: 500 }
    )
  }
}