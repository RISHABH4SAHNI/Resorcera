import { NextRequest } from 'next/server'
import { AuthError } from './auth'

interface RateLimitOptions {
  requests: number
  window: number // in minutes
}

// Simple in-memory rate limiting (for production, use Redis or similar)
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(options: RateLimitOptions = { requests: 60, window: 15 }) {
  return async (request: NextRequest): Promise<void> => {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               request.headers.get('x-real-ip') || 
               request.ip || 
               'anonymous'

    const now = Date.now()
    const windowMs = options.window * 60 * 1000
    const key = `rate_limit:${ip}`

    // Clean up old entries periodically
    for (const [k, v] of requestCounts.entries()) {
      if (now > v.resetTime) {
        requestCounts.delete(k)
      }
    }

    const current = requestCounts.get(key)

    if (!current) {
      // First request from this IP
      requestCounts.set(key, { count: 1, resetTime: now + windowMs })
      return
    }

    if (now > current.resetTime) {
      // Window has expired, reset
      requestCounts.set(key, { count: 1, resetTime: now + windowMs })
      return
    }

    if (current.count >= options.requests) {
      throw new AuthError('Rate limit exceeded. Please try again later.', 429)
    }

    current.count++
  }
}