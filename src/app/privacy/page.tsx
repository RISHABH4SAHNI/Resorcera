'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-resorcera-brown font-display mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-resorcera-ochre mb-8">
            Your privacy is important to us
          </p>
          <p className="text-gray-600">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">

            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">

                {/* Introduction */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Introduction
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Welcome to Resorcera. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, process, and safeguard your information when you visit our website and use our services.
                  </p>
                </div>

                {/* Information We Collect */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Information We Collect
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-resorcera-ochre mb-2">
                        Personal Information
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Name and contact information (email, phone number)</li>
                        <li>Account credentials (username, encrypted password)</li>
                        <li>Payment information (processed securely through third-party providers)</li>
                        <li>Profile information and preferences</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-resorcera-ochre mb-2">
                        Usage Information
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Course enrollment and completion data</li>
                        <li>Learning progress and performance metrics</li>
                        <li>Device information and IP address</li>
                        <li>Browser type and operating system</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* How We Use Your Information */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    How We Use Your Information
                  </h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>To provide and improve our educational services</li>
                    <li>To process enrollments and manage your account</li>
                    <li>To communicate with you about courses and updates</li>
                    <li>To personalize your learning experience</li>
                    <li>To analyze usage patterns and improve our platform</li>
                    <li>To ensure security and prevent fraud</li>
                  </ul>
                </div>

                {/* Information Sharing */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Information Sharing
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>With service providers who assist in operating our platform</li>
                    <li>When required by law or to protect our rights</li>
                    <li>In case of a business merger or acquisition (with prior notice)</li>
                    <li>With your explicit consent for specific purposes</li>
                  </ul>
                </div>

                {/* Data Security */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Data Security
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
                  </p>
                </div>

                {/* Data Retention */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Data Retention
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. You may request deletion of your account and associated data at any time.
                  </p>
                </div>

                {/* Your Rights */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Your Rights
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Access and review your personal data</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Request deletion of your account and data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Data portability (receive your data in a structured format)</li>
                  </ul>
                </div>

                {/* Cookies */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Cookies and Tracking
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences.
                  </p>
                </div>

                {/* Third-Party Services */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Third-Party Services
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our platform may integrate with third-party services for payments, analytics, and other functionalities. These services have their own privacy policies, and we encourage you to review them.
                  </p>
                </div>

                {/* Children's Privacy */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Children's Privacy
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
                  </p>
                </div>

                {/* Changes to This Policy */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Changes to This Privacy Policy
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Contact Us
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                  </p>
                  <div className="bg-resorcera-cream rounded-lg p-6">
                    <div className="space-y-2 text-gray-700">
                      <p className="flex items-center">
                        <span className="mr-2">📧</span>
                        <strong>Email:</strong> hello@resorcera.com
                      </p>
                      <p className="flex items-center">
                        <span className="mr-2">🌐</span>
                        <strong>Website:</strong> www.resorcera.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 text-center bg-gradient-to-br from-resorcera-cream to-resorcera-light-brown/50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                Questions About Our Privacy Policy?
              </h3>
              <p className="text-resorcera-ochre mb-6">
                We're here to help and ensure your privacy is protected
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Contact Us
                </Link>
                <Link 
                  href="/"
                  className="border-2 border-resorcera-ochre text-resorcera-brown px-8 py-3 rounded-full font-semibold hover:bg-resorcera-ochre hover:text-white transition-all duration-300"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}