'use client'

import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-resorcera-ochre/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section - 20% width */}
          <div className="flex-shrink-0 w-1/5">
            <Logo size="medium" showText={true} />
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-8 flex-1 justify-center">
            <Link href="/" className="text-resorcera-brown hover:text-resorcera-ochre transition-colors font-medium">
              Home
            </Link>
            <Link href="/courses" className="text-resorcera-brown hover:text-resorcera-ochre transition-colors font-medium">
              Courses
            </Link>
            <Link href="/about" className="text-resorcera-brown hover:text-resorcera-ochre transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-resorcera-brown hover:text-resorcera-ochre transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/courses" className="bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium">
              Start Learning
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-resorcera-brown hover:text-resorcera-ochre focus:outline-none focus:text-resorcera-ochre"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-lg shadow-lg mb-4">
              <Link href="/" className="block px-3 py-2 text-resorcera-brown hover:text-resorcera-ochre">
                Home
              </Link>
              <Link href="/courses" className="block px-3 py-2 text-resorcera-brown hover:text-resorcera-ochre">
                Courses
              </Link>
              <Link href="/about" className="block px-3 py-2 text-resorcera-brown hover:text-resorcera-ochre">
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-resorcera-brown hover:text-resorcera-ochre">
                Contact
              </Link>
              <Link href="/courses" className="block px-3 py-2 bg-gradient-to-r from-resorcera-ochre to-resorcera-mustard text-white rounded-full text-center">
                Start Learning
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}