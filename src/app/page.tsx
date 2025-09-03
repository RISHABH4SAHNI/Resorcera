import Hero from '@/components/Hero'
import Navigation from '@/components/Navigation'
import CourseGrid from '@/components/CourseGrid'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-resorcera-cream via-white to-resorcera-light-brown">
      <Navigation />
      <Hero />
      <CourseGrid />
      <Footer />
    </main>
  )
}