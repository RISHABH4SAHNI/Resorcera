'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'

// Course data (simplified)
const courseData = {
  'sql-workbook': {
    title: 'Complete SQL Workbook',
    price: '₹999',
    originalPrice: '₹1999',
    thumbnail: '📊'
  }
}

export default function PaymentPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const course = courseData[courseId as keyof typeof courseData]

  const [paymentMethod, setPaymentMethod] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate payment processing
    setTimeout(() => {
      setShowSuccess(true)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
                  <span className="line-through text-gray-400">{course.originalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount (50%)</span>
                  <span className="text-green-600">-₹1000</span>
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
                  <li>✓ Complete SQL Workbook (PDF)</li>
                  <li>✓ Practice Exercises & Solutions</li>
                  <li>✓ Real-world Project Files</li>
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