'use client'

import { useState, useEffect } from 'react'

interface Course {
  id: string
  title: string
  featured: boolean
  popularity: number
  averageRating: number
}

export default function AdminTestPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [testResults, setTestResults] = useState<string[]>([])

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  // Fetch courses
  const fetchCourses = async () => {
    try {
      addResult('🔄 Fetching courses...')
      const response = await fetch('/api/courses')
      const data = await response.json()

      if (data.success) {
        setCourses(data.courses)
        addResult(`✅ Loaded ${data.courses.length} courses`)
      } else {
        addResult(`❌ Failed to fetch courses: ${data.error}`)
      }
    } catch (error) {
      addResult(`💥 Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  // Test featured toggle
  const testFeaturedToggle = async (courseId: string, currentFeatured: boolean) => {
    try {
      addResult(`🔄 Testing featured toggle for ${courseId}...`)
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentFeatured })
      })

      const result = await response.json()
      if (result.success) {
        addResult(`✅ Featured toggle successful: ${currentFeatured} → ${!currentFeatured}`)
        await fetchCourses() // Refresh
      } else {
        addResult(`❌ Featured toggle failed: ${result.error}`)
      }
    } catch (error) {
      addResult(`💥 Featured toggle error: ${error}`)
    }
  }

  // Test course edit
  const testCourseEdit = async (courseId: string) => {
    try {
      const newTitle = `Updated ${Date.now()}`
      addResult(`🔄 Testing course edit for ${courseId}...`)
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      })

      const result = await response.json()
      if (result.success) {
        addResult(`✅ Course edit successful: title updated to "${newTitle}"`)
        await fetchCourses() // Refresh
      } else {
        addResult(`❌ Course edit failed: ${result.error}`)
      }
    } catch (error) {
      addResult(`💥 Course edit error: ${error}`)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Panel Test</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Courses ({courses.length})</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-2">
              {courses.slice(0, 3).map((course) => (
                <div key={course.id} className="p-4 bg-white rounded border">
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-600">ID: {course.id}</p>
                  <p className="text-sm">Featured: {course.featured ? '✅' : '❌'}</p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => testFeaturedToggle(course.id, course.featured)}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                    >
                      Toggle Featured
                    </button>
                    <button
                      onClick={() => testCourseEdit(course.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                    >
                      Edit Title
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Test Results</h2>
          <div className="bg-white p-4 rounded border h-96 overflow-y-auto">
            {testResults.map((result, index) => (
              <div key={index} className="text-sm mb-1 font-mono">{result}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}