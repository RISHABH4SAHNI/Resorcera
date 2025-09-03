'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            {/* Logo Section */}
            <div className="relative inline-block mb-6">
              <Logo size="xl" showText={false} linkTo={undefined} />
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-resorcera-brown font-display mb-4">
              About Resorcera
            </h1>
            <p className="text-xl text-resorcera-ochre mb-8">
              Empowering Growth Through Learning
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">

            {/* Mission Statement */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-resorcera-brown font-display mb-6">
                Our Mission
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  At <span className="font-semibold text-resorcera-brown">Resorcera</span>, we believe learning is the key to growth. Our mission is to empower professionals, students, and lifelong learners with high-quality upskilling courses, detailed workbooks, and hands-on learning experiences—both technical and non-technical.
                </p>

                <p>
                  Whether you're looking to master a new skill, boost your career, or explore a new field, we provide comprehensive, structured content designed to make learning practical, engaging, and effective. Every course is crafted with care, combining in-depth knowledge with actionable insights, so you can confidently apply what you learn.
                </p>

                <p>
                  We're more than a learning platform—we're your partner in continuous growth, career advancement, and personal development. Join us, upskill at your pace, and unlock your potential.
                </p>
              </div>
            </div>

            {/* Values Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-resorcera-ochre to-resorcera-mustard rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-resorcera-brown mb-2">Practical Learning</h3>
                <p className="text-gray-600 text-sm">Hands-on experience with real-world applications</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-resorcera-ochre to-resorcera-mustard rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-semibold text-resorcera-brown mb-2">Career Growth</h3>
                <p className="text-gray-600 text-sm">Skills that directly impact your professional journey</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-resorcera-ochre to-resorcera-mustard rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="font-semibold text-resorcera-brown mb-2">Quality Content</h3>
                <p className="text-gray-600 text-sm">Carefully crafted courses with expert insights</p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-br from-resorcera-cream to-resorcera-light-brown/50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-resorcera-brown font-display mb-4">
                Ready to Start Your Learning Journey?
              </h3>
              <p className="text-resorcera-ochre mb-6">
                Explore our courses and begin your path to success today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/courses"
                  className="bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Browse Courses
                </Link>
                <Link 
                  href="/contact"
                  className="border-2 border-resorcera-ochre text-resorcera-brown px-8 py-3 rounded-full font-semibold hover:bg-resorcera-ochre hover:text-white transition-all duration-300"
                >
                  Contact Us
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