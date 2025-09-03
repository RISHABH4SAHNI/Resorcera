'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  detailedDescription?: string
  price: string
  originalPrice?: string
  duration: string
  level: string
  thumbnail: string
  pdfFile?: string
  features: string[]
  topics: string[]
  popularity: number
  featured: boolean
  comingSoon?: boolean
  averageRating: number
  totalRatings: number
  enrollmentCount: number
  createdAt: string
  updatedAt: string
  ratings?: Rating[]
}

interface Rating {
  id: string
  rating: number
  review?: string
  createdAt: string
  user: {
    name: string
  }
}

interface UserRating {
  rating: number
  review: string
}

export default function CoursePage() {
  const params = useParams()
  const courseId = params.courseId as string
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [userRating, setUserRating] = useState<UserRating>({ rating: 0, review: '' })
  const [userName, setUserName] = useState('')
  const [showRatingForm, setShowRatingForm] = useState(false)

  // Fetch course data and track view
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        
        // Fetch course details
        const response = await fetch(`/api/courses/${courseId}`)
        const data = await response.json()
        
        if (data.success) {
          setCourse(data.course)
          
          // Track course view for popularity
          fetch(`/api/courses/${courseId}/view`, { method: 'POST' })
            .catch(err => console.error('Error tracking view:', err))
        } else {
          console.error('Course not found:', data.error)
        }
      } catch (error) {
        console.error('Error fetching course:', error)
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

  // Submit rating
  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userName.trim()) {
      alert('Please enter your name')
      return
    }
    
    if (userRating.rating === 0) {
      alert('Please select a rating')
      return
    }

    try {
      const response = await fetch(`/api/courses/${courseId}/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: userRating.rating,
          review: userRating.review,
          userName: userName,
          userEmail: `${userName.toLowerCase().replace(/\s+/g, '.')}@resorcera.guest`
        })
      })

      const result = await response.json()
      if (result.success) {
        alert('Thank you for your rating!')
        setShowRatingForm(false)
        setUserRating({ rating: 0, review: '' })
        setUserName('')
        
        // Refresh course data to show new rating
        window.location.reload()
      } else {
        alert('Failed to submit rating: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error submitting rating:', error)
      alert('Failed to submit rating. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <div className="text-xl text-resorcera-brown">Loading course details...</div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-resorcera-brown mb-4">Course Not Found</h1>
          <p className="text-resorcera-ochre mb-6">The course you're looking for doesn't exist.</p>
          <Link 
            href="/courses"
            className="bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    )
  }

  const StarRating = ({ rating, onRatingChange, interactive = false }: { 
    rating: number, 
    onRatingChange?: (rating: number) => void,
    interactive?: boolean 
  }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            disabled={!interactive}
            onClick={() => interactive && onRatingChange?.(star)}
            className={`text-2xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'hover:text-yellow-400 cursor-pointer' : ''}`}
          >
            ⭐
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown">
      <Navigation />
      
      {/* Course Header */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Link href="/" className="hover:text-resorcera-ochre">Home</Link>
                  <span>/</span>
                  <Link href="/courses" className="hover:text-resorcera-ochre">Courses</Link>
                  <span>/</span>
                  <span className="text-resorcera-brown font-medium">{course.title}</span>
                </div>
              </nav>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Course Info */}
                <div className="lg:col-span-2">
                  {/* Course Badges */}
                  <div className="flex items-center space-x-2 mb-4">
                    {course.featured && (
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        ⭐ FEATURED
                      </span>
                    )}
                    {course.comingSoon && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                        🔮 COMING SOON
                      </span>
                    )}
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                      📊 {course.popularity}% Popular
                    </span>
                  </div>

                  {/* Course Title & Basic Info */}
                  <div className="mb-6">
                    <div className="text-6xl mb-4">{course.thumbnail}</div>
                    <h1 className="text-3xl font-bold text-resorcera-brown font-display mb-2">
                      {course.title}
                    </h1>
                    {course.subtitle && (
                      <p className="text-xl text-resorcera-ochre mb-4">{course.subtitle}</p>
                    )}
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {course.detailedDescription || course.description}
                    </p>
                    
                    {/* Rating Display */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <StarRating rating={course.averageRating || 5} />
                        <span className="text-lg font-semibold text-resorcera-brown">
                          {(course.averageRating || 5.0).toFixed(1)}
                        </span>
                      </div>
                      <span className="text-gray-600">
                        ({course.totalRatings} review{course.totalRatings !== 1 ? 's' : ''})
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-600">
                        {course.enrollmentCount}+ students
                      </span>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-resorcera-cream/50 p-4 rounded-lg text-center">
                      <div className="text-2xl mb-1">⏱️</div>
                      <div className="text-sm text-gray-600">Duration</div>
                      <div className="font-semibold text-resorcera-brown">{course.duration}</div>
                    </div>
                    <div className="bg-resorcera-cream/50 p-4 rounded-lg text-center">
                      <div className="text-2xl mb-1">📈</div>
                      <div className="text-sm text-gray-600">Level</div>
                      <div className="font-semibold text-resorcera-brown">{course.level}</div>
                    </div>
                    <div className="bg-resorcera-cream/50 p-4 rounded-lg text-center">
                      <div className="text-2xl mb-1">⭐</div>
                      <div className="text-sm text-gray-600">Rating</div>
                      <div className="font-semibold text-resorcera-brown">{(course.averageRating || 5.0).toFixed(1)}/5</div>
                    </div>
                    <div className="bg-resorcera-cream/50 p-4 rounded-lg text-center">
                      <div className="text-2xl mb-1">👥</div>
                      <div className="text-sm text-gray-600">Students</div>
                      <div className="font-semibold text-resorcera-brown">{course.enrollmentCount}+</div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Purchase Card */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-white to-resorcera-cream rounded-2xl p-6 shadow-lg border border-resorcera-ochre/20 sticky top-8">
                    {/* Price */}
                    {!course.comingSoon ? (
                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center space-x-3 mb-2">
                          <span className="text-3xl font-bold text-resorcera-brown">{course.price}</span>
                          {course.originalPrice && (
                            <span className="text-lg text-gray-400 line-through">{course.originalPrice}</span>
                          )}
                        </div>
                        <div className="text-sm text-green-600 font-medium">💰 Limited Time Offer</div>
                      </div>
                    ) : (
                      <div className="text-center mb-6">
                        <div className="text-2xl font-bold text-resorcera-ochre mb-2">Coming Soon</div>
                        <div className="text-sm text-gray-600">This course is under development</div>
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="space-y-3 mb-6">
                      {!course.comingSoon ? (
                        <>
                          <button className="w-full bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                            🛒 Enroll Now
                          </button>
                          <button className="w-full border border-resorcera-ochre text-resorcera-brown py-3 rounded-lg font-medium hover:bg-resorcera-ochre hover:text-white transition-all duration-300">
                            📋 Add to Wishlist
                          </button>
                        </>
                      ) : (
                        <button 
                          disabled
                          className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
                        >
                          🔔 Notify When Available
                        </button>
                      )}
                    </div>

                    {/* Course Features */}
                    <div>
                      <h4 className="font-semibold text-resorcera-brown mb-3">This course includes:</h4>
                      <ul className="space-y-2">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                        {course.pdfFile && (
                          <li className="flex items-center text-sm text-gray-600">
                            <span className="text-green-500 mr-2">✓</span>
                            Downloadable PDF Resources
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Tabs */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8 pt-8">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'content', label: 'Course Content' },
                  { id: 'ratings', label: `Reviews (${course.totalRatings})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-resorcera-ochre text-resorcera-ochre'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* What You'll Learn */}
                  <div>
                    <h3 className="text-2xl font-bold text-resorcera-brown mb-4">What you'll learn</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.topics.map((topic, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-green-500 mr-3 mt-1">✓</span>
                          <span className="text-gray-700">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-2xl font-bold text-resorcera-brown mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-resorcera-ochre mr-3 mt-1">•</span>
                        <span className="text-gray-700">Basic computer knowledge</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-resorcera-ochre mr-3 mt-1">•</span>
                        <span className="text-gray-700">Internet connection</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-resorcera-ochre mr-3 mt-1">•</span>
                        <span className="text-gray-700">Willingness to learn</span>
                      </li>
                    </ul>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-2xl font-bold text-resorcera-brown mb-4">Course Description</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {course.detailedDescription || course.description}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div>
                  <h3 className="text-2xl font-bold text-resorcera-brown mb-6">Course Topics</h3>
                  <div className="grid gap-3">
                    {course.topics.map((topic, index) => (
                      <div key={index} className="flex items-center p-3 bg-resorcera-cream/30 rounded-lg">
                        <span className="text-resorcera-ochre mr-3">📝</span>
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                  
                  {course.pdfFile && (
                    <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-800 mb-2">📄 Course Materials</h4>
                      <p className="text-green-700 mb-3">This course includes downloadable PDF resources.</p>
                      <div className="text-sm text-green-600">
                        Available after enrollment: <code>{course.pdfFile}</code>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'ratings' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-resorcera-brown">
                      Student Reviews ({course.totalRatings})
                    </h3>
                    <button
                      onClick={() => setShowRatingForm(!showRatingForm)}
                      className="bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    >
                      ⭐ Write a Review
                    </button>
                  </div>

                  {/* Rating Form */}
                  {showRatingForm && (
                    <div className="mb-8 p-6 bg-resorcera-cream/30 rounded-lg">
                      <h4 className="text-lg font-semibold text-resorcera-brown mb-4">Write Your Review</h4>
                      <form onSubmit={handleSubmitRating} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                          <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                            placeholder="Enter your name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                          <StarRating 
                            rating={userRating.rating} 
                            onRatingChange={(rating) => setUserRating({...userRating, rating})}
                            interactive={true}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Review (Optional)</label>
                          <textarea
                            value={userRating.review}
                            onChange={(e) => setUserRating({...userRating, review: e.target.value})}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                            placeholder="Share your experience with this course..."
                          />
                        </div>
                        <div className="flex space-x-3">
                          <button
                            type="submit"
                            className="bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Submit Review
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowRatingForm(false)}
                            className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-all duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Overall Rating */}
                  <div className="mb-8 p-6 bg-gradient-to-br from-white to-resorcera-cream rounded-lg border border-resorcera-ochre/20">
                    <div className="flex items-center justify-center space-x-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-resorcera-brown mb-2">
                          {(course.averageRating || 5.0).toFixed(1)}
                        </div>
                        <StarRating rating={course.averageRating || 5} />
                        <div className="text-sm text-gray-600 mt-1">
                          {course.totalRatings} review{course.totalRatings !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {course.ratings && course.ratings.length > 0 ? (
                      course.ratings.map((rating) => (
                        <div key={rating.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-semibold text-resorcera-brown">{rating.user.name}</div>
                              <StarRating rating={rating.rating} />
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(rating.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          {rating.review && (
                            <p className="text-gray-700 mt-2">{rating.review}</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">💬</div>
                        <p>No reviews yet. Be the first to review this course!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
