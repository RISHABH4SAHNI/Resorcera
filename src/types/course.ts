export interface Course {
  id: string
  title: string
  subtitle?: string | null
  description: string
  detailedDescription?: string | null
  price: string
  originalPrice?: string | null
  duration: string
  level: string
  thumbnail: string
  pdfFile?: string | null
  features: string[]
  topics: string[]
  popularity: number
  featured: boolean
  comingSoon: boolean
  averageRating: number
  totalRatings: number
  enrollmentCount: number
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  name: string
  password?: string | null
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  enrolledAt: Date
  completedAt?: Date | null
  progress: number
}

export interface Rating {
  id: string
  userId: string
  courseId: string
  rating: number
  review?: string | null
  createdAt: Date
  updatedAt: Date
  user?: {
    name: string
    email: string
  }
}