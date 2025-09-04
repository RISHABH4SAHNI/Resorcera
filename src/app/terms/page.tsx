'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-resorcera-brown font-display mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-resorcera-ochre mb-8">
            Please read these terms carefully before using our services
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

                {/* Acceptance of Terms */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Acceptance of Terms
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    By accessing and using Resorcera's website and services, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our educational platform and courses.
                  </p>
                </div>

                {/* Description of Services */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Description of Services
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Resorcera provides online educational courses, workbooks, and learning materials covering both technical and non-technical subjects. Our services include:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Access to online courses and educational content</li>
                    <li>Downloadable course materials and workbooks</li>
                    <li>Progress tracking and completion certificates</li>
                    <li>Customer support and learning assistance</li>
                    <li>Community features and discussion forums</li>
                  </ul>
                </div>

                {/* User Accounts */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    User Accounts
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-resorcera-ochre mb-2">
                        Account Creation
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        To access our courses, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-resorcera-ochre mb-2">
                        Account Responsibilities
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Maintain accurate account information</li>
                        <li>Keep login credentials secure and confidential</li>
                        <li>Notify us immediately of any unauthorized access</li>
                        <li>Use the platform responsibly and ethically</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Course Enrollment and Access */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Course Enrollment and Access
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Upon successful payment, you gain access to purchased courses for the duration specified in the course description. Course access is personal and non-transferable.
                    </p>
                    <div>
                      <h3 className="text-lg font-semibold text-resorcera-ochre mb-2">
                        Access Duration
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Lifetime access courses remain available indefinitely</li>
                        <li>Time-limited courses expire as specified</li>
                        <li>Access may be revoked for violation of these terms</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Payment and Refunds */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Payment and Refunds
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-resorcera-ochre mb-2">
                        Payment Terms
                      </h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>All payments are processed securely through third-party providers</li>
                        <li>Prices are subject to change without notice</li>
                        <li>Payment is required before course access is granted</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-resorcera-ochre mb-2">
                        Refund Policy
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        We offer a 30-day money-back guarantee for most courses. Refund requests must be submitted within 30 days of purchase and before completing more than 30% of the course content.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Intellectual Property */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Intellectual Property
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    All course content, materials, and intellectual property on Resorcera are owned by us or our licensors. You may not:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Share, distribute, or resell course content</li>
                    <li>Copy or reproduce course materials for commercial use</li>
                    <li>Reverse engineer or attempt to extract source materials</li>
                    <li>Use our content to create competing educational products</li>
                  </ul>
                </div>

                {/* Prohibited Uses */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Prohibited Uses
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You agree not to use our platform for any of the following:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Illegal activities or violation of applicable laws</li>
                    <li>Harassment, abuse, or harm to other users</li>
                    <li>Spreading malware or engaging in hacking attempts</li>
                    <li>Impersonating others or providing false information</li>
                    <li>Attempting to circumvent security measures</li>
                  </ul>
                </div>

                {/* Privacy and Data Protection */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Privacy and Data Protection
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the services, to understand our practices regarding the collection and use of your personal information.
                  </p>
                </div>

                {/* Disclaimers */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Disclaimers
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      While we strive to provide high-quality educational content, we cannot guarantee specific outcomes or results from course completion.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Course content is provided "as is" without warranties</li>
                      <li>We are not responsible for individual learning outcomes</li>
                      <li>Platform availability may be subject to maintenance or technical issues</li>
                      <li>Third-party integrations are subject to their own terms</li>
                    </ul>
                  </div>
                </div>

                {/* Limitation of Liability */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Limitation of Liability
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    To the maximum extent permitted by law, Resorcera shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses.
                  </p>
                </div>

                {/* Termination */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Termination
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users.
                  </p>
                </div>

                {/* Changes to Terms */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Changes to Terms
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update these Terms of Service from time to time. We will notify users of any material changes by posting the new terms on this page and updating the "Last updated" date.
                  </p>
                </div>

                {/* Governing Law */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Governing Law
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                  </p>
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                    Contact Us
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
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
                Ready to Start Learning?
              </h3>
              <p className="text-resorcera-ochre mb-6">
                Browse our courses and begin your educational journey today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/courses"
                  className="bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Browse Courses
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