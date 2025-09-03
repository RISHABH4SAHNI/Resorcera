'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'

interface Course {
  id: string
  title: string
  subtitle?: string
  description: string
  detailedDescription?: string
  price: string
  originalPrice?: string
  duration: string
  level: string
  thumbnail: string
  pdfFile: string | null
  features: string[]
  topics: string[]
  popularity: number
  enrollmentCount: number
  averageRating: number
  totalRatings: number
  featured: boolean
  comingSoon?: boolean
  createdAt?: string
  updatedAt?: string
}

interface NewCourse extends Partial<Course> {
  courseType?: 'active' | 'upcoming'
}

// Price input component that automatically adds rupee symbol
const PriceInput = ({ 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  label 
}: { 
  value: string, 
  onChange: (value: string) => void, 
  placeholder?: string, 
  required?: boolean,
  label: string 
}) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value

    // Remove any existing rupee symbols and non-numeric characters except numbers
    let numericValue = inputValue.replace(/[^\d]/g, '')

    // If there's a numeric value, format it with rupee symbol
    if (numericValue) {
      const formattedValue = `₹${numericValue}`
      onChange(formattedValue)
    } else {
      onChange('')
    }
  }

  // Display value without rupee symbol for editing
  const displayValue = value.startsWith('₹') ? value.slice(1) : value

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-500 font-medium">₹</span>
        <input
          type="text"
          required={required}
          value={displayValue}
          onChange={handlePriceChange}
          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
          placeholder={placeholder || "Enter amount"}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">Just enter numbers, ₹ symbol will be added automatically</p>
    </div>
  )
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])

  const [newCourse, setNewCourse] = useState<NewCourse>({
    title: '',
    subtitle: '',
    description: '',
    price: '',
    originalPrice: '',
    duration: '',
    level: 'Beginner',
    thumbnail: '📚',
    features: [''],
    topics: [''],
    courseType: 'active'
  })

  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState('courses')

  // Load courses from API on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      console.log('🔄 Fetching courses from API...')
      try {
        console.log('Fetching courses from API...')
        const response = await fetch('/api/courses')
        console.log('📡 API Response status:', response.status)
        const data = await response.json()
        console.log('📊 API Response data:', data)
        if (data.success) {
          console.log('✅ Setting courses:', data.courses.length, 'courses found')
          setCourses(data.courses)
        } else {
          console.error('❌ API returned success: false', data.error)
        }
      } catch (error) {
        console.error('💥 Error fetching courses:', error)
        // Fallback to localStorage if API fails
        const savedCourses = localStorage.getItem('resorcera-courses')
        if (savedCourses) {
          setCourses(JSON.parse(savedCourses))
        }
      }
    }

    if (isAuthenticated) {
      fetchCourses()
    }
  }, [isAuthenticated])

  // Refresh courses from API
  const refreshCourses = async () => {
    try {
      console.log('🔄 Refreshing courses...')
      const response = await fetch('/api/courses')
      console.log('📡 Refresh Response status:', response.status)
      const data = await response.json()
      console.log('📊 Refresh API Response:', data)
      if (data.success) {
        console.log('✅ Updated courses:', data.courses.length, 'courses')
        setCourses(data.courses)
      } else {
        console.error('❌ Refresh API returned success: false', data.error)
        alert('Failed to refresh courses: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error refreshing courses:', error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'resorcera2025') {
      setIsAuthenticated(true)
    } else {
      alert('Incorrect password')
    }
  }

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault()

    let pdfFileName = null

    // Handle PDF upload
    if (selectedFile) {
      const formData = new FormData()
      formData.append('pdf', selectedFile)
      formData.append('courseId', newCourse.title?.replace(/\s+/g, '-').toLowerCase() || '')

      try {
        const response = await fetch('/api/upload-pdf', {
          method: 'POST',
          body: formData
        })
        const result = await response.json()
        if (result.success) {
          pdfFileName = result.fileName
        }
      } catch (error) {
        console.error('PDF upload failed:', error)
      }
    }

    const courseId = newCourse.title?.replace(/\s+/g, '-').toLowerCase() || ''
    const isUpcoming = newCourse.courseType === 'upcoming'

    const courseData = {
      title: newCourse.title || '',
      subtitle: newCourse.subtitle || (isUpcoming ? 'Coming Soon' : ''),
      description: newCourse.description || '',
      detailedDescription: newCourse.description || '',
      price: isUpcoming ? 'Coming Soon' : (newCourse.price || ''),
      originalPrice: isUpcoming ? '' : (newCourse.originalPrice || ''),
      duration: isUpcoming ? 'TBD' : (newCourse.duration || ''),
      level: newCourse.level || 'Beginner',
      thumbnail: newCourse.thumbnail || '📚',
      pdfFile: isUpcoming ? null : pdfFileName,
      features: isUpcoming ? ['Coming Soon'] : (newCourse.features?.filter(f => f.trim()) || ['Basic course content']),
      topics: isUpcoming ? ['Coming Soon'] : (newCourse.topics?.filter(t => t.trim()) || ['Course introduction']),
      featured: false,
      comingSoon: isUpcoming,
      popularity: 0,
      averageRating: 5.0,
      totalRatings: 0,
      enrollmentCount: 0
    }

    try {
      // Save to database via API
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseData)
      })

      const result = await response.json()
      if (result.success) {
        alert('Course added successfully!')
        await refreshCourses() // Refresh the courses list
      } else {
        alert('Failed to add course: ' + (result.error || 'Unknown error'))
        return // Don't reset form if failed
      }
    } catch (error) {
      console.error('Error adding course:', error)
      alert('Failed to add course. Please try again.')
      return // Don't reset form if failed
    }

    // Reset form
    setNewCourse({
      title: '',
      subtitle: '',
      description: '',
      price: '',
      originalPrice: '',
      duration: '',
      level: 'Beginner',
      thumbnail: '📚',
      features: [''],
      topics: [''],
      courseType: 'active'
    })
    setSelectedFile(null)
  }

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course)
    setShowEditModal(true)
  }

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCourse) return

    console.log('🔄 Updating course:', editingCourse.id)
    console.log('📦 Course data:', editingCourse)

    try {
      console.log('📡 Sending PUT request to update course...')

      const response = await fetch(`/api/courses/${editingCourse.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingCourse)
      })

      console.log('📡 Response status:', response.status)
      const result = await response.json()
      console.log('📊 Update response:', result)

      if (result.success) {
        console.log('✅ Successfully updated course')
        await refreshCourses()
        alert('Course updated successfully!')
        setShowEditModal(false)
        setEditingCourse(null)
      } else {
        alert('Failed to update course: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error updating course:', error)
      alert('Failed to update course. Please try again.')
    }
  }

  const handleDeleteCourse = async (courseId: string) => {
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      // Also delete from database
      try {
        const response = await fetch(`/api/courses/${courseId}`, {
          method: 'DELETE'
        })

        const result = await response.json()
        if (result.success) {
          await refreshCourses()
          alert('Course deleted successfully!')
        } else {
          alert('Failed to delete course: ' + (result.error || 'Unknown error'))
        }
      } catch (error) {
        console.error('Error deleting course:', error)
        alert('Failed to delete course from database.')
      }
    }
  }

  const handleToggleFeatured = async (courseId: string) => {
    const course = courses.find(c => c.id === courseId)
    if (!course) return

    console.log('🔄 Toggling featured for course:', courseId, 'Current featured:', course.featured)

    try {
      // Update in database first
      console.log('📡 Sending PUT request to update featured status...')
      const updateData = { ...course, featured: !course.featured }
      console.log('📦 Update data:', updateData)

      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })

      console.log('📡 Response status:', response.status)
      const result = await response.json()
      console.log('📊 PUT response:', result)

      if (result.success) {
        // Update local state after successful API call
        console.log('✅ Successfully updated featured status')
        const updatedCourses = courses.map(c => 
          c.id === courseId ? { ...c, featured: !c.featured } : c
        )
        setCourses(updatedCourses)
        alert(`Course ${!course.featured ? 'marked as featured' : 'removed from featured'} successfully!`)
      } else {
        console.error('API Error:', result.error)
        alert('Failed to update featured status: ' + (result.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('💥 Error updating featured status:', error)
      alert('Failed to update featured status. Please try again. Error: ' + (error instanceof Error ? error.message : String(error)))
    }
  }

  const updateEditingCourseField = (field: string, value: any) => {
    if (editingCourse) {
      setEditingCourse({
        ...editingCourse,
        [field]: value
      })
    }
  }

  const addEditFeature = () => {
    if (editingCourse) {
      setEditingCourse({
        ...editingCourse,
        features: [...editingCourse.features, '']
      })
    }
  }

  const addEditTopic = () => {
    if (editingCourse) {
      setEditingCourse({
        ...editingCourse,
        topics: [...editingCourse.topics, '']
      })
    }
  }

  const updateEditFeature = (index: number, value: string) => {
    if (editingCourse) {
      const features = [...editingCourse.features]
      features[index] = value
      setEditingCourse({
        ...editingCourse,
        features: features
      })
    }
  }

  const updateEditTopic = (index: number, value: string) => {
    if (editingCourse) {
      const topics = [...editingCourse.topics]
      topics[index] = value
      setEditingCourse({
        ...editingCourse,
        topics: topics
      })
    }
  }

  const removeEditFeature = (index: number) => {
    if (editingCourse) {
      const features = editingCourse.features.filter((_, i) => i !== index)
      setEditingCourse({ ...editingCourse, features })
    }
  }

  const removeEditTopic = (index: number) => {
    if (editingCourse) {
      const topics = editingCourse.topics.filter((_, i) => i !== index)
      setEditingCourse({ ...editingCourse, topics })
    }
  }

  const addFeature = () => {
    setNewCourse({
      ...newCourse,
      features: [...(newCourse.features || []), '']
    })
  }

  const addTopic = () => {
    setNewCourse({
      ...newCourse,
      topics: [...(newCourse.topics || []), '']
    })
  }

  const updateFeature = (index: number, value: string) => {
    const features = [...(newCourse.features || [])]
    features[index] = value
    setNewCourse({ ...newCourse, features })
  }

  const updateTopic = (index: number, value: string) => {
    const topics = [...(newCourse.topics || [])]
    topics[index] = value
    setNewCourse({ ...newCourse, topics })
  }

  const removeFeature = (index: number) => {
    const features = (newCourse.features || []).filter((_, i) => i !== index)
    setNewCourse({ ...newCourse, features })
  }

  const removeTopic = (index: number) => {
    const topics = (newCourse.topics || []).filter((_, i) => i !== index)
    setNewCourse({ ...newCourse, topics })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-resorcera-brown text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown">
      <Navigation />

      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-resorcera-brown font-display mb-8">
              Resorcera Admin Dashboard
            </h1>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {[
                  { id: 'courses', label: 'Manage Courses' },
                  { id: 'add-course', label: 'Add New Course' },
                  { id: 'popularity', label: 'Manage Popularity' }
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

            {/* Existing Courses */}
            {activeTab === 'courses' && (
              <div>
                <h2 className="text-2xl font-semibold text-resorcera-brown mb-6">Current Courses</h2>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-resorcera-brown">{course.title}</h3>
                            {course.featured && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                ⭐ Featured
                              </span>
                            )}
                            {course.comingSoon && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                🔮 Coming Soon
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">{course.subtitle}</p>
                          <p className="text-sm text-gray-500 mt-2">{course.description}</p>
                          <div className="mt-3 flex items-center flex-wrap gap-4 text-sm">
                            <span className="text-resorcera-ochre font-semibold">{course.price}</span>
                            {course.originalPrice && (
                              <span className="text-gray-400 line-through">{course.originalPrice}</span>
                            )}
                            <span className="text-gray-600">{course.duration}</span>
                            <span className="text-gray-600">{course.level}</span>
                            <span className="text-blue-600">📊 Popularity: {course.popularity}%</span>
                            <span className="text-green-600">👥 {course.enrollmentCount} students</span>
                            <span className="text-yellow-600">⭐ {course.averageRating}/5</span>
                          </div>
                          {course.pdfFile && (
                            <p className="text-xs text-green-600 mt-2">📄 PDF: {course.pdfFile}</p>
                          )}
                        </div>
                        <div className="text-4xl">{course.thumbnail}</div>
                      </div>

                      <div className="flex items-center space-x-3 pt-4 border-t">
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleToggleFeatured(course.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            course.featured
                              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          }`}
                        >
                          {course.featured ? '⭐ Remove from Featured' : '⭐ Make Featured'}
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Popularity Management */}
            {activeTab === 'popularity' && (
              <div>
                <h2 className="text-2xl font-semibold text-resorcera-brown mb-6">Manage Course Popularity</h2>
                <p className="text-gray-600 mb-6">
                  Set popularity scores to control which courses appear first. Higher scores show first.
                </p>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">{course.thumbnail}</span>
                          <div>
                            <h3 className="font-semibold text-resorcera-brown">{course.title}</h3>
                            <p className="text-sm text-gray-600">Current popularity: {course.popularity}%</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <label className="text-sm font-medium text-gray-700">Popularity Score:</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={course.popularity}
                            onChange={(e) => {
                              const updatedCourses = courses.map(c => 
                                c.id === course.id 
                                  ? { ...c, popularity: parseInt(e.target.value) || 0 }
                                  : c
                              )
                              setCourses(updatedCourses)
                              // Update in database and refresh
                              const updatedCourse = updatedCourses.find(c => c.id === course.id)
                              if (updatedCourse) {
                                fetch(`/api/courses/${course.id}`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify(updatedCourse)
                                }).then(() => refreshCourses())
                              }
                            }}
                            className="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                          />
                          <span className="text-sm text-gray-500">%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Course */}
            {activeTab === 'add-course' && (
              <div>
                <h2 className="text-2xl font-semibold text-resorcera-brown mb-6">Add New Course</h2>
                <form onSubmit={handleAddCourse} className="space-y-6">
                  {/* Course Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Type *</label>
                    <select
                      value={newCourse.courseType || 'active'}
                      onChange={(e) => setNewCourse({...newCourse, courseType: e.target.value as 'active' | 'upcoming'})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                    >
                      <option value="active">🎯 Active Course (Available Now)</option>
                      <option value="upcoming">🔮 Upcoming Course (Coming Soon)</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
                      <input
                        type="text"
                        required
                        value={newCourse.title || ''}
                        onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                        placeholder="e.g., Advanced Python Programming"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                      <input
                        type="text"
                        disabled={newCourse.courseType === 'upcoming'}
                        placeholder={newCourse.courseType === 'upcoming' ? 'Auto-filled: Coming Soon' : 'e.g., Master Programming Fundamentals'}
                        value={newCourse.subtitle || ''}
                        onChange={(e) => setNewCourse({...newCourse, subtitle: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder={newCourse.courseType === 'upcoming' ? 'Describe what students will learn when this course launches...' : 'Describe what students will learn in this course...'}
                      value={newCourse.description || ''}
                      onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                    />
                  </div>

                  {/* Only show price fields for active courses */}
                  {newCourse.courseType === 'active' && (
                    <div className="grid md:grid-cols-4 gap-4">
                      <PriceInput
                        label="Course Price *"
                        value={newCourse.price || ''}
                        onChange={(value) => setNewCourse({...newCourse, price: value})}
                        placeholder="999"
                        required
                      />
                      <PriceInput
                        label="Original Price"
                        value={newCourse.originalPrice || ''}
                        onChange={(value) => setNewCourse({...newCourse, originalPrice: value})}
                        placeholder="1999"
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <input
                          type="text"
                          placeholder="40+ Hours"
                          value={newCourse.duration || ''}
                          onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                        <select
                          value={newCourse.level || 'Beginner'}
                          onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Beginner to Advanced">Beginner to Advanced</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {newCourse.courseType === 'active' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course PDF File</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Upload the PDF file for this course</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emoji/Thumbnail</label>
                    <input
                      type="text"
                      value={newCourse.thumbnail || ''}
                      onChange={(e) => setNewCourse({...newCourse, thumbnail: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                      placeholder="📚 (Enter an emoji)"
                    />
                  </div>

                  {/* Only show features and topics for active courses */}
                  {newCourse.courseType === 'active' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course Features</label>
                        <p className="text-sm text-gray-500 mb-2">What students get with this course</p>
                        {newCourse.features?.map((feature, index) => (
                          <div key={index} className="flex mb-2 items-center gap-2">
                            <input
                              type="text"
                              value={feature || ''}
                              onChange={(e) => updateFeature(index, e.target.value)}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                              placeholder="Enter a feature"
                            />
                            <button
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addFeature}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          + Add Feature
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course Topics</label>
                        <p className="text-sm text-gray-500 mb-2">What students will learn in this course</p>
                        {newCourse.topics?.map((topic, index) => (
                          <div key={index} className="flex mb-2 items-center gap-2">
                            <input
                              type="text"
                              value={topic || ''}
                              onChange={(e) => updateTopic(index, e.target.value)}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                              placeholder="Enter a topic"
                            />
                            <button
                              type="button"
                              onClick={() => removeTopic(index)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addTopic}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          + Add Topic
                        </button>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Add Course
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-resorcera-brown mb-6">Edit Course</h2>
              <form onSubmit={handleUpdateCourse} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
                    <input
                      type="text"
                      required
                      value={editingCourse.title || ''}
                      onChange={(e) => updateEditingCourseField('title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={editingCourse.subtitle || ''}
                      onChange={(e) => updateEditingCourseField('subtitle', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={editingCourse.description || ''}
                    onChange={(e) => updateEditingCourseField('description', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                  />
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <PriceInput
                    label="Course Price *"
                    value={editingCourse.price || ''}
                    onChange={(value) => updateEditingCourseField('price', value)}
                    placeholder="999"
                    required
                  />
                  <PriceInput
                    label="Original Price"
                    value={editingCourse.originalPrice || ''}
                    onChange={(value) => updateEditingCourseField('originalPrice', value)}
                    placeholder="1999"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={editingCourse.duration || ''}
                      onChange={(e) => updateEditingCourseField('duration', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                    <select
                      value={editingCourse.level || 'Beginner'}
                      onChange={(e) => updateEditingCourseField('level', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Beginner to Advanced">Beginner to Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emoji/Thumbnail</label>
                  <input
                    type="text"
                    value={editingCourse.thumbnail || ''}
                    onChange={(e) => updateEditingCourseField('thumbnail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Features</label>
                  {editingCourse.features?.map((feature, index) => (
                    <div key={index} className="flex mb-2 items-center gap-2">
                      <input
                        type="text"
                        value={feature || ''}
                        onChange={(e) => updateEditFeature(index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeEditFeature(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEditFeature}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    + Add Feature
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Topics</label>
                  {editingCourse.topics?.map((topic, index) => (
                    <div key={index} className="flex mb-2 items-center gap-2">
                      <input
                        type="text"
                        value={topic || ''}
                        onChange={(e) => updateEditTopic(index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeEditTopic(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEditTopic}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    + Add Topic
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Update Course
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}