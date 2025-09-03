import { ValidationError } from './auth'

// Input validation and sanitization utilities
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') {
    throw new ValidationError('Input must be a string')
  }

  // Remove potential XSS characters and limit length
  const sanitized = input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .slice(0, maxLength)

  return sanitized
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 320
}

export function validateCourseInput(data: any): void {
  const required = ['title', 'description']

  for (const field of required) {
    if (!data[field] || typeof data[field] !== 'string' || data[field].trim().length === 0) {
      throw new ValidationError(`${field} is required`)
    }
  }

  // Validate title length
  if (data.title.length > 200) {
    throw new ValidationError('Title must be less than 200 characters')
  }

  // Validate description length
  if (data.description.length > 5000) {
    throw new ValidationError('Description must be less than 5000 characters')
  }

  // Validate price format if provided
  if (data.price && typeof data.price === 'string') {
    // Allow formats like ₹999, $99, 999, Coming Soon
    const priceRegex = /^(₹|$)?[\d,]+(\.\d{1,2})?$|^Coming Soon$|^Free$/i
    if (!priceRegex.test(data.price)) {
      throw new ValidationError('Invalid price format')
    }
  }

  // Validate level
  const validLevels = ['Beginner', 'Intermediate', 'Advanced', 'Beginner to Advanced']
  if (data.level && !validLevels.includes(data.level)) {
    throw new ValidationError('Invalid level')
  }
}

export function validateContactInput(data: any): void {
  const required = ['name', 'email', 'subject', 'message']

  for (const field of required) {
    if (!data[field] || typeof data[field] !== 'string' || data[field].trim().length === 0) {
      throw new ValidationError(`${field} is required`)
    }
  }

  if (!validateEmail(data.email)) {
    throw new ValidationError('Invalid email address')
  }

  if (data.name.length > 100) {
    throw new ValidationError('Name must be less than 100 characters')
  }

  if (data.subject.length > 200) {
    throw new ValidationError('Subject must be less than 200 characters')
  }

  if (data.message.length > 2000) {
    throw new ValidationError('Message must be less than 2000 characters')
  }
}

export function validateFileUpload(file: File): void {
  if (file.type !== 'application/pdf') {
    throw new ValidationError('Only PDF files are allowed')
  }

  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    throw new ValidationError('File size must be less than 10MB')
  }
}