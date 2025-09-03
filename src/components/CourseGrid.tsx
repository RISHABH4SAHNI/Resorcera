'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Course } from '@/types/course'

interface CourseGridProps {
  sortBy?: 'rating' | 'students' | 'newest'
}

export default function CourseGrid({ sortBy = 'rating' }: CourseGridProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/courses?sortBy=${sortBy}`)
        const data = await response.json()
        if (data.success) {
          setCourses(data.courses)
        }
      } catch (error) {
        console.error('Error fetching courses:', error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [sortBy])

  if (loading) {
    return (
      <div className="py-16 px-4 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-resorcera-ochre">Loading courses...</div>
        </div>
      </div>
    )
  }

  // Separate featured and regular courses
  const featuredCourses = courses.filter(course => course.featured && !course.comingSoon)

  // Only available courses for carousel (no coming soon)
  const availableCoursesOnly = courses.filter(course => !course.comingSoon)

  // Coming soon courses
  const comingSoonCourses = courses.filter(course => course.comingSoon)

  // Create seamless infinite array by repeating courses enough times
  const createInfiniteArray = (courses: Course[], minLength: number = 20) => {
    if (courses.length === 0) return []
    const result = []
    while (result.length < minLength) {
      result.push(...courses)
    }
    return result
  }

  const infiniteCoursesArray = createInfiniteArray(availableCoursesOnly)

  const CourseCard = ({ course }: { course: Course }) => (
    <div className={`bg-gradient-to-br from-white to-resorcera-cream rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-resorcera-ochre/20 h-[600px] flex flex-col ${course.comingSoon ? 'opacity-70' : 'hover:scale-105'}`}>
      <div className="p-6 flex flex-col h-full">
        {/* Featured Badge */}
        {course.featured && (
          <div className="flex justify-center mb-2">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
              ⭐ FEATURED
            </span>
          </div>
        )}

        {/* Course Thumbnail */}
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">{course.thumbnail}</div>
          <div className="flex items-center justify-center space-x-2">
            {course.averageRating > 0 && (
              <>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(course.averageRating) ? 'text-yellow-400' : 'text-gray-300'}>
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-sm text-resorcera-ochre">({course.averageRating.toFixed(1)})</span>
              </>
            )}
          </div>
        </div>

        {/* Course Info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-resorcera-brown font-display mb-2">
            {course.title}
          </h3>
          <p className="text-sm text-resorcera-ochre font-medium mb-2">
            {course.subtitle}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {course.description}
          </p>
        </div>

        {/* Course Details */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium text-resorcera-brown">{course.duration}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Level:</span>
            <span className="font-medium text-resorcera-brown">{course.level}</span>
          </div>
          {course.enrollmentCount > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Students:</span>
              <span className="font-medium text-resorcera-brown">{course.enrollmentCount}+</span>
            </div>
          )}
          {course.popularity > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Popularity:</span>
              <span className="font-medium text-blue-600">{course.popularity}%</span>
            </div>
          )}
        </div>

        {/* Key Features */}
        {!course.comingSoon && (
          <div className="mb-4 flex-grow">
            <h4 className="font-semibold text-resorcera-brown mb-2 text-sm">What you'll get:</h4>
            <ul className="space-y-1">
              {course.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-xs text-gray-600 flex items-center">
                  <span className="text-resorcera-ochre mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price and CTA */}
        <div className="border-t border-resorcera-ochre/20 pt-4 mt-auto">
          {!course.comingSoon ? (
            <>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-resorcera-brown">
                  {course.price}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {course.originalPrice}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Link 
                  href={`/course/${course.id}`}
                  className="block w-full bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white text-center py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  View Course
                </Link>
                <Link 
                  href={`/course/${course.id}`}
                  className="block w-full border border-resorcera-ochre text-resorcera-brown text-center py-2 rounded-lg font-medium hover:bg-resorcera-ochre hover:text-white transition-all duration-300"
                >
                  Preview Content
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="text-lg font-semibold text-resorcera-ochre mb-2">
                Coming Soon
              </div>
              <button 
                disabled
                className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                Stay Tuned
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-resorcera-brown font-display mb-4">
            Our Courses
          </h2>
          <p className="text-xl text-resorcera-ochre max-w-2xl mx-auto">
            Carefully crafted courses designed to accelerate your career growth
          </p>
        </div>

        {/* Auto-Rotating Course Carousel */}
        <div className="mb-16">
          {infiniteCoursesArray.length > 0 ? (
            <div className="relative overflow-hidden">
              {/* Infinite Scroll Container */}
              <div className="flex animate-infinite-scroll">
                {infiniteCoursesArray.map((course, index) => (
                  <div key={`${course.id}-${index}`} className="flex-shrink-0 w-80 mx-4">
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>

              {/* Visual Indicators */}
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  {availableCoursesOnly.slice(0, Math.min(5, availableCoursesOnly.length)).map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full bg-resorcera-ochre/60 animate-pulse"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-resorcera-ochre">No courses available to display</p>
            </div>
          )}
        </div>

        {/* Custom CSS for infinite scroll animation */}
        <style jsx>{`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${availableCoursesOnly.length * 320}px); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll ${availableCoursesOnly.length * 2}s linear infinite;
          }
        `}</style>

        {/* Featured Courses */}
        {featuredCourses.length > 0 && (
          <div className="mb-16">
            <h3 className="text-4xl font-bold text-resorcera-brown font-display mb-4 text-center">
              Featured Course{featuredCourses.length > 1 ? 's' : ''}
            </h3>
            <p className="text-xl text-center text-resorcera-ochre mb-8">
              {featuredCourses.length === 1 
                ? "Our handpicked premium course for maximum impact" 
                : `${featuredCourses.length} handpicked premium courses for maximum impact`}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <div key={course.id}><CourseCard course={course} /></div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Courses - Always Show */}
          <div>
            <h3 className="text-4xl font-bold text-resorcera-brown font-display mb-4 text-center">
              🔮 Upcoming Courses
            </h3>
            <p className="text-xl text-center text-resorcera-ochre mb-8">
              Exciting new courses in development - stay tuned for more amazing learning opportunities!
            </p>
            {comingSoonCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {comingSoonCourses.map((course) => (
                  <div key={course.id}><CourseCard course={course} /></div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚀</div>
                <p className="text-lg text-resorcera-brown font-semibold mb-2">More Courses Coming Soon!</p>
                <p className="text-resorcera-ochre">We're working on exciting new courses for you. Stay tuned!</p>
              </div>
            )}
          </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-resorcera-ochre mb-4">Ready to start your learning journey?</p>
          <Link 
            href="/courses"
            className="inline-flex items-center bg-gradient-to-r from-resorcera-brown to-resorcera-ochre text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Explore All Courses
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}