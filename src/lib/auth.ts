

// Secure admin authentication utilities
export class AuthError extends Error {
  constructor(message: string, public statusCode: number = 401) {
    super(message)
    this.name = 'AuthError'
  }
}

export class ValidationError extends Error {
  constructor(message: string, public statusCode: number = 400) {
    super(message)
    this.name = 'ValidationError'
  }
}
