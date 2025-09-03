// Fallback logo component that matches your design exactly
export default function LogoFallback({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' | 'xl' }) {
  const sizeConfig = {
    small: { container: 'w-8 h-8', rays: 'w-0.5 h-2', text: 'text-sm' },
    medium: { container: 'w-12 h-12', rays: 'w-0.5 h-3', text: 'text-lg' },
    large: { container: 'w-16 h-16', rays: 'w-1 h-4', text: 'text-2xl' },
    xl: { container: 'w-24 h-24', rays: 'w-1 h-6', text: 'text-4xl' }
  }

  const config = sizeConfig[size]

  return (
    <div className="relative inline-block">
      <div className={`${config.container} relative`}>
        {/* Sun rays */}
        <div className="absolute inset-0 animate-pulse">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${config.rays} bg-gradient-to-t from-resorcera-ochre to-resorcera-mustard`}
              style={{
                left: '50%',
                top: '0%',
                transformOrigin: `50% ${config.container.includes('24') ? '48px' : config.container.includes('16') ? '32px' : config.container.includes('12') ? '24px' : '16px'}`,
                transform: `translateX(-50%) rotate(${i * 22.5}deg)`,
              }}
            />
          ))}
        </div>
        {/* Central R */}
        <div className="absolute inset-1 bg-gradient-to-br from-resorcera-ochre to-resorcera-brown rounded-full flex items-center justify-center shadow-2xl">
          <span className={`${config.text} font-bold text-white font-display`}>R</span>
        </div>
      </div>

      {/* RESORCERA text below for xl size */}
      {size === 'xl' && (
        <div className="text-center mt-2 text-resorcera-brown font-bold text-lg font-display">RESORCERA</div>
      )}
    </div>
  )
}