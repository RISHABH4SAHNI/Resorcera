import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import multer from 'multer'
import { handleApiError } from '@/lib/errorHandler'
import { validateFileUpload, sanitizeString } from '@/lib/validation'
import { rateLimit } from '@/lib/rateLimit'
import { ValidationError } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    await rateLimit({ requests: 5, window: 15 })(request)

    const formData = await request.formData()
    const file = formData.get('pdf') as File | null
    const courseId = formData.get('courseId') as string

    if (!file) {
      throw new ValidationError('No file provided')
    }

    if (!courseId) {
      throw new ValidationError('Course ID is required')
    }

    // Validate file
    validateFileUpload(file)

    // Sanitize course ID for filename
    const sanitizedCourseId = sanitizeString(courseId, 100)
      .replace(/[^a-z0-9-]/gi, '-')
      .toLowerCase()

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'pdfs')
    await fs.mkdir(uploadsDir, { recursive: true })

    // Generate filename
    const timestamp = Date.now()
    const filename = `${sanitizedCourseId}-${timestamp}.pdf`
    const filepath = path.join(uploadsDir, filename)

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await fs.writeFile(filepath, buffer)

    return NextResponse.json({ success: true, fileName: filename })
  } catch (error) {
    return handleApiError(error)
  }
}