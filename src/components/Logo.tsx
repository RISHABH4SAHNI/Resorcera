'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xl'
  showText?: boolean
  className?: string
  linkTo?: string
}

const sizeConfig = {
  small: {
    container: 'w-8 h-8',
    text: 'text-lg',
    textSize: 'text-xs'
  },
  medium: {
    container: 'w-12 h-12',
    text: 'text-xl',
    textSize: 'text-sm'
  },
  large: {
    container: 'w-16 h-16',
    text: 'text-2xl', 
    textSize: 'text-base'
  },
  xl: {
    container: 'w-24 h-24',
    text: 'text-4xl',
    textSize: 'text-lg'
  }
}

export default function Logo({ 
  size = 'medium', 
  showText = true, 
  className = '',
  linkTo = '/'
}: LogoProps) {
  const config = sizeConfig[size]
  const [imageError, setImageError] = useState(false)
  const [imageSrc, setImageSrc] = useState('/logo.jpeg')

  const LogoContent = () => (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        {!imageError ? (
          <Image
            src={imageSrc}
            alt="Resorcera Logo"
            width={size === 'xl' ? 96 : size === 'large' ? 64 : size === 'medium' ? 48 : 32}
            height={size === 'xl' ? 96 : size === 'large' ? 64 : size === 'medium' ? 48 : 32}
            className="object-contain"
            onError={() => {
              if (imageSrc === '/logo.jpeg') {
                setImageSrc('/logo.svg')
              } else {
                setImageError(true)
              }
            }}
          />
        ) : (
          // Fallback to text-based logo if both images fail
          <div className={`${config.container} bg-gradient-to-br from-resorcera-ochre to-resorcera-mustard rounded-full flex items-center justify-center`}>
            <span className={`text-white font-bold ${config.text} font-display`}>R</span>
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col">
          <h1 className={`${config.textSize} font-bold text-resorcera-brown font-display leading-tight`}>
            RESORCERA
          </h1>
          <p className="text-xs text-resorcera-ochre">Upskill, Unlock, Upgrade</p>
        </div>
      )}
    </div>
  )

  return linkTo ? (
    <Link href={linkTo}><LogoContent /></Link>
  ) : (
    <LogoContent />
  )
}