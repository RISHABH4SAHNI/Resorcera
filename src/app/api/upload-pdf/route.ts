import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('pdf') as File | null
    const courseId = formData.get('courseId') as string

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, error: 'Only PDF files are allowed' },
        { status: 400 }
      )
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'pdfs')
    await fs.mkdir(uploadsDir, { recursive: true })

    // Generate filename
    const timestamp = Date.now()
    const filename = `${courseId}-${timestamp}.pdf`
    const filepath = path.join(uploadsDir, filename)

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await fs.writeFile(filepath, buffer)

    return NextResponse.json({ success: true, fileName: filename })
  } catch (error) {
    console.error('Error uploading PDF:', error)
    return NextResponse.json({ success: false, error: 'Failed to upload PDF' }, { status: 500 })
  }
}