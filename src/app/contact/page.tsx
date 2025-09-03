'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setShowSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-resorcera-brown font-display mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-resorcera-ochre mb-8">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-resorcera-brown font-display mb-8">
                Get In Touch
              </h2>

              <div className="space-y-6">

                {/* Website */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-resorcera-ochre to-resorcera-mustard rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🌐</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-resorcera-brown mb-1">Website</h3>
                    <a 
                      href="https://www.resorcera.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-resorcera-ochre hover:underline"
                    >
                      www.resorcera.com
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-resorcera-ochre to-resorcera-mustard rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-resorcera-brown mb-1">Email</h3>
                    <a 
                      href="mailto:resorcera@gmail.com"
                      className="text-resorcera-ochre hover:underline"
                    >
                      resorcera@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-resorcera-ochre to-resorcera-mustard rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-resorcera-brown mb-1">Phone</h3>
                    <a 
                      href="tel:+919321244915"
                      className="text-resorcera-ochre hover:underline"
                    >
                      +91-9321244915
                    </a>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-resorcera-ochre to-resorcera-mustard rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-resorcera-brown mb-1">LinkedIn</h3>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-resorcera-ochre hover:underline"
                    >
                      Connect with us on LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-8 p-6 bg-gradient-to-br from-resorcera-cream to-resorcera-light-brown/50 rounded-xl">
                <h3 className="font-semibold text-resorcera-brown mb-3">Business Hours</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {showSuccess ? (
                <div className="text-center">
                  <div className="text-6xl mb-4">✉️</div>
                  <h3 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-resorcera-brown font-display mb-8">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent"
                      >
                        <option value="">Select a subject</option>
                        <option value="course-inquiry">Course Inquiry</option>
                        <option value="technical-support">Technical Support</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-resorcera-ochre focus:border-transparent resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}