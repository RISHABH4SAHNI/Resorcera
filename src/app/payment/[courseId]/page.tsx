'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'

interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  price: string
  originalPrice?: string
  duration: string
  level: string
  thumbnail: string
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
}

export default function PaymentPage() {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()
  const courseId = params.courseId as string

  const [paymentMethod, setPaymentMethod] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        console.log('💳 Payment - Fetching course:', courseId)

        const response = await fetch(`/api/courses/${courseId}`)
        const data = await response.json()

        if (data.success) {
          console.log('✅ Payment - Course found:', data.course.title)
          setCourse(data.course)
        } else {
          console.error('❌ Payment - Course not found:', data.error)
        }
      } catch (error) {
        console.error('💥 Payment - Error fetching course:', error)
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💳</div>
          <div className="text-xl text-resorcera-brown">Loading payment details...</div>
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
          <p className="text-resorcera-ochre mb-6">The course you're trying to purchase doesn't exist.</p>
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

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown">
        <Navigation />
        <div className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="text-3xl font-bold text-resorcera-brown font-display mb-4">
                Payment Successful!
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for your purchase! We've sent the course materials to <strong>{formData.email}</strong>
              </p>
              <div className="bg-resorcera-cream p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-resorcera-brown mb-2">What's Next?</h3>
                <ul className="text-left space-y-2 text-sm text-gray-700">
                  <li>✓ Check your email for course materials</li>
                  <li>✓ Download the PDF workbook</li>
                  <li>✓ Start your learning journey</li>
                  <li>✓ Contact us if you need any help</li>
                </ul>
              </div>
              <Link 
                href="/"
                className="inline-block bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    // Simulate payment processing delay
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)
    }, 1500)
  }
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown">
      <Navigation />

      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Payment Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-resorcera-brown font-display mb-6">
                Complete Your Purchase
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-resorcera-brown mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                        placeholder="your@email.com"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Course materials will be sent to this email
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-resorcera-brown mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'upi', label: 'UPI Payment', icon: '📱' },
                      { id: 'debit', label: 'Debit Card', icon: '💳' },
                      { id: 'credit', label: 'Credit Card', icon: '💳' },
                      { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                      { id: 'wallet', label: 'Digital Wallet', icon: '💰' }
                    ].map((method) => (
                      <label key={method.id} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-resorcera-cream/50 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-resorcera-ochre focus:ring-resorcera-ochre"
                        />
                        <span className="text-2xl mr-3">{method.icon}</span>
                        <span className="font-medium text-gray-700">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Details based on selected method */}
                {paymentMethod && (
                  <div className="bg-resorcera-cream/30 p-4 rounded-lg">
                    <h4 className="font-medium text-resorcera-brown mb-2">
                      {paymentMethod === 'upi' && 'UPI Payment Instructions'}
                      {paymentMethod === 'debit' && 'Debit Card Information'}
                      {paymentMethod === 'credit' && 'Credit Card Information'}
                      {paymentMethod === 'netbanking' && 'Net Banking Details'}
                      {paymentMethod === 'wallet' && 'Digital Wallet Payment'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {paymentMethod === 'upi' && 'You will be redirected to your UPI app to complete the payment.'}
                      {(paymentMethod === 'debit' || paymentMethod === 'credit') && 'Enter your card details on the next page to complete payment.'}
                      {paymentMethod === 'netbanking' && 'You will be redirected to your bank\'s website to complete the payment.'}
                      {paymentMethod === 'wallet' && 'Choose your preferred digital wallet to complete payment.'}
                    </p>
                  </div>
                )}

                {/* Terms and Submit */}
                <div>
                  <label className="flex items-start space-x-2 mb-4">
                    <input 
                      type="checkbox" 
                      required 
                      className="mt-1 text-resorcera-ochre focus:ring-resorcera-ochre"
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the <Link href="/terms" className="text-resorcera-ochre hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-resorcera-ochre hover:underline">Privacy Policy</Link>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!paymentMethod || !formData.email || !formData.name}
                    className="w-full bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Complete Payment - {course.price}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-6">
                Order Summary
              </h2>

              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{course.thumbnail}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-resorcera-brown">{course.title}</h3>
                    <p className="text-sm text-gray-600">Digital Course Materials</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course Price</span>
                  <span className="line-through text-gray-400">{course.originalPrice || course.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount (50%)</span>
                  <span className="text-green-600">Limited Time Offer</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-resorcera-brown">Total</span>
                    <span className="text-2xl font-bold text-resorcera-brown">{course.price}</span>
                  </div>
                </div>
              </div>

              <div className="bg-resorcera-cream p-4 rounded-lg">
                <h4 className="font-semibold text-resorcera-brown mb-2">What you get:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {course.features.slice(0, 5).map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                  <li>✓ Lifetime Access</li>
                  <li>✓ Email Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}