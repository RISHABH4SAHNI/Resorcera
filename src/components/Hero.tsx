'use client'

import Link from 'next/link'
import Logo from './Logo'

export default function Hero() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-resorcera-cream via-resorcera-light-brown/30 to-resorcera-mustard/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Section - Logo and Branding (20% on desktop) */}
          <div className="flex-shrink-0 lg:w-1/5 text-center lg:text-left">
            <div className="mb-8">
              {/* Resorcera Logo with rays */}
              <div className="flex justify-center lg:justify-start mb-6">
                <Logo size="xl" showText={false} linkTo={undefined} />
              </div>
            </div>

            <div className="space-y-4 text-resorcera-brown">
              <h1 className="text-2xl font-bold font-display">RESORCERA</h1>
              <div className="space-y-2 text-sm">
                <p className="font-medium">• Learn & Grow</p>
                <p className="font-medium">• Expert Courses</p>
                <p className="font-medium">• Career Ready</p>
              </div>

              <div className="pt-4 space-y-1 text-xs text-resorcera-ochre">
                <p>📧 resorcera@gmail.com</p>
                <p>📞 +91-9321244915</p>
                <p>🌐 www.resorcera.com</p>
              </div>
            </div>
          </div>

          {/* Right Section - Main Content (80% on desktop) */}
          <div className="flex-1 lg:w-4/5 text-center lg:text-left">
            <div className="max-w-4xl">
              <h2 className="text-5xl lg:text-7xl font-bold text-resorcera-brown font-display leading-tight mb-6">
                Upskill, Unlock, Upgrade
                <br />
                <span className="text-resorcera-ochre">with Resorcera</span>
              </h2>

              <p className="text-xl lg:text-2xl text-resorcera-brown mb-8 leading-relaxed max-w-3xl">
                Practical, engaging courses for growth & career advancement.
                <br />
                Start your learning journey today with industry-expert content.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/courses" className="bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Upskill Today
                </Link>
                <Link href="/courses" className="border-2 border-resorcera-ochre text-resorcera-brown px-8 py-4 rounded-full text-lg font-semibold hover:bg-resorcera-ochre hover:text-white transition-all duration-300">
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}