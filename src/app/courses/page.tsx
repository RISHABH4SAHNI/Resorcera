'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import CourseGrid from '@/components/CourseGrid'
import Footer from '@/components/Footer'

export default function CoursesPage() {
  const [sortBy, setSortBy] = useState<'rating' | 'students' | 'newest'>('rating')

  return (
    <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown">
      <Navigation />

      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto mb-8">
          {/* Filter Control - Left Top Corner */}
          <div className="flex justify-start mb-6">
            <div className="inline-flex items-center space-x-4 bg-resorcera-cream/50 px-6 py-3 rounded-lg">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'students' | 'newest')}
                className="px-4 py-2 border border-resorcera-ochre/30 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent text-sm"
              >
                <option value="rating">Rating</option>
                <option value="students">Students</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Centered Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-resorcera-brown font-display mb-4">
              All Courses
            </h1>
            <p className="text-xl text-resorcera-ochre max-w-2xl mx-auto">
              Explore our comprehensive collection of courses designed to boost your career
            </p>
          </div>
        </div>
      </div>

      <CourseGrid sortBy={sortBy} />
      <Footer />
    </div>
  )
}