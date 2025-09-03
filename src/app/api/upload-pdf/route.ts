import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('pdf') as unknown as File
    const courseId = data.get('courseId') as string

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ success: false, error: 'Only PDF files are allowed' })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create filename with course ID and original name
    const fileName = `${courseId}-${file.name}`
    const filePath = path.join(process.cwd(), 'public', 'courses', fileName)

    // Create directory if it doesn't exist
    const { mkdir } = await import('fs/promises')
    await mkdir(path.dirname(filePath), { recursive: true })

    // Write the file
    await writeFile(filePath, buffer)

    return NextResponse.json({ 
      success: true, 
      fileName: fileName,
      message: 'PDF uploaded successfully' 
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Upload failed' })
  }
}