'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Course data (same as in CourseGrid)
const courseData = {
  'sql-workbook': {
    id: 'sql-workbook',
    title: 'Complete SQL Workbook',
    subtitle: 'Master Database Management',
    description: 'Comprehensive SQL workbook covering everything from basic queries to advanced database operations. Perfect for beginners and professionals looking to master database management.',
    detailedDescription: 'This comprehensive SQL workbook is designed to take you from a complete beginner to an advanced database professional. You\'ll learn through hands-on exercises, real-world examples, and practical projects that mirror industry scenarios.',
    price: '₹999',
    originalPrice: '₹1999',
    duration: '40+ Hours',
    level: 'Beginner to Advanced',
    students: '500+',
    rating: 4.8,
    thumbnail: '📊',
    instructor: 'Resorcera Team',
    lastUpdated: 'January 2025',
    language: 'English',
    features: [
      'Complete SQL Reference Guide',
      'Hands-on Practice Exercises',
      'Real-world Database Projects',
      'PDF Workbook & Examples',
      'Lifetime Access',
      'Email Support',
      'Certificate of Completion'
    ],
    curriculum: [
      {
        module: 'Introduction to Databases',
        topics: ['What is a Database?', 'Types of Databases', 'SQL Basics', 'Database Management Systems'],
        duration: '2 hours'
      },
      {
        module: 'Basic SQL Queries',
        topics: ['SELECT Statements', 'WHERE Clauses', 'Sorting and Filtering', 'Basic Functions'],
        duration: '6 hours'
      },
      {
        module: 'Advanced Queries',
        topics: ['JOINs and Relationships', 'Subqueries', 'Advanced Functions', 'Window Functions'],
        duration: '8 hours'
      },
      {
        module: 'Database Design',
        topics: ['Normalization', 'Entity Relationship Diagrams', 'Schema Design', 'Best Practices'],
        duration: '6 hours'
      },
      {
        module: 'Stored Procedures & Functions',
        topics: ['Creating Procedures', 'Functions and Triggers', 'Error Handling', 'Performance Tips'],
        duration: '8 hours'
      },
      {
        module: 'Performance & Optimization',
        topics: ['Indexing Strategies', 'Query Optimization', 'Performance Monitoring', 'Troubleshooting'],
        duration: '6 hours'
      },
      {
        module: 'Real-world Projects',
        topics: ['E-commerce Database', 'Analytics Dashboard', 'Reporting System', 'Final Capstone'],
        duration: '4 hours'
      }
    ],
    requirements: [
      'Basic computer knowledge',
      'No prior programming experience required',
      'Access to a computer with internet connection',
      'Willingness to learn and practice'
    ],
    whatYouLearn: [
      'Write complex SQL queries with confidence',
      'Design efficient database schemas',
      'Understand database relationships and normalization',
      'Optimize query performance',
      'Create stored procedures and functions',
      'Build real-world database applications',
      'Master advanced SQL concepts and techniques'
    ]
  }
}

export default function CoursePage() {
  const params = useParams()
  const courseId = params.courseId as string
  const course = courseData[courseId as keyof typeof courseData]
  const [activeTab, setActiveTab] = useState('overview')

  if (!course) {
    return (
      <div className="min-h-screen bg-resorcera-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-resorcera-brown mb-4">Course Not Found</h1>
          <Link href="/" className="text-resorcera-ochre hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Course Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-resorcera-brown font-display mb-2">
                      {course.title}
                    </h1>
                    <p className="text-xl text-resorcera-ochre mb-4">{course.subtitle}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>By {course.instructor}</span>
                      <span>•</span>
                      <span>Updated {course.lastUpdated}</span>
                      <span>•</span>
                      <span>{course.language}</span>
                    </div>
                  </div>
                  <div className="text-6xl">{course.thumbnail}</div>
                </div>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({course.rating})</span>
                  </div>
                  <span className="text-sm text-gray-600">{course.students} students</span>
                  <span className="text-sm text-gray-600">{course.duration}</span>
                  <span className="text-sm text-gray-600">{course.level}</span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-8">
                  {course.detailedDescription}
                </p>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-8">
                  <nav className="flex space-x-8">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'curriculum', label: 'Curriculum' },
                      { id: 'requirements', label: 'Requirements' }
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
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-resorcera-brown mb-4">What you'll learn</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.whatYouLearn.map((item, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <span className="text-resorcera-ochre mt-1">✓</span>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-resorcera-brown mb-4">Course Content</h3>
                    {course.curriculum.map((module, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-resorcera-brown">{module.module}</h4>
                          <span className="text-sm text-gray-500">{module.duration}</span>
                        </div>
                        <ul className="space-y-1">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="text-sm text-gray-600 flex items-center">
                              <span className="w-2 h-2 bg-resorcera-ochre rounded-full mr-2"></span>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div>
                    <h3 className="text-xl font-semibold text-resorcera-brown mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-resorcera-ochre mt-1">•</span>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Purchase Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{course.thumbnail}</div>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="text-3xl font-bold text-resorcera-brown">
                      {course.price}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {course.originalPrice}
                    </span>
                  </div>
                  <p className="text-green-600 font-medium">50% OFF - Limited Time!</p>
                </div>

                <div className="space-y-4 mb-6">
                  <Link 
                    href={`/payment/${course.id}`}
                    className="block w-full bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white text-center py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300"
                  >
                    Enroll Now
                  </Link>
                  <p className="text-center text-sm text-gray-600">
                    30-day money-back guarantee
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <h4 className="font-semibold text-resorcera-brown">This course includes:</h4>
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-resorcera-ochre">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}