import { NextResponse } from 'next/server'
import { AuthError, ValidationError } from './auth'
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'

// Secure error handling that doesn't leak sensitive information
export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error)

  // Handle known error types
  if (error instanceof AuthError) {
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: error.statusCode }
    )
  }

  if (error instanceof ValidationError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.statusCode }
    )
  }

  // Handle Prisma errors securely
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return NextResponse.json(
          { success: false, error: 'Record already exists' },
          { status: 409 }
        )
      case 'P2025':
        return NextResponse.json(
          { success: false, error: 'Record not found' },
          { status: 404 }
        )
      case 'P2014':
        return NextResponse.json(
          { success: false, error: 'Invalid data provided' },
          { status: 400 }
        )
      default:
        return NextResponse.json(
          { success: false, error: 'Database operation failed' },
          { status: 500 }
        )
    }
  }

  if (error instanceof PrismaClientValidationError) {
    return NextResponse.json(
      { success: false, error: 'Invalid data format' },
      { status: 400 }
    )
  }

  // Handle other known errors
  if (error instanceof Error) {
    // Don't expose the actual error message in production
    const isDev = process.env.NODE_ENV === 'development'
    const message = isDev ? error.message : 'Internal server error'
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }

  // Fallback for unknown errors
  return NextResponse.json(
    { success: false, error: 'An unexpected error occurred' },
    { status: 500 }
  )
}