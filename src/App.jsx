import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import DressCode from './components/DressCode'
import Games from './components/Games'
import RSVP from './components/RSVP'
import Footer from './components/Footer'
import BloodBackground from './components/BloodBackground'
import BackgroundMusic from './components/BackgroundMusic'

function App() {
  const [scrollAllowed, setScrollAllowed] = useState(() => {
    // Check on initial state if already scrolled
    if (typeof window !== 'undefined') {
      return window.scrollY > 100 || document.documentElement.scrollTop > 100
    }
    return false
  })

  // Check if user has already scrolled or page was reloaded mid-scroll
  useEffect(() => {
    // Check scroll position on load
    const checkScrollPosition = () => {
      // If user is scrolled down more than 100px, they've already passed the Hero
      if (window.scrollY > 100 || document.documentElement.scrollTop > 100) {
        setScrollAllowed(true)
        return true
      }
      return false
    }
    
    // Immediate check
    if (checkScrollPosition()) {
      return // Already scrolled, allow scroll
    }
    
    // Also restore scroll position if it was saved
    const savedScroll = sessionStorage.getItem('scrollPosition')
    if (savedScroll) {
      const scrollY = parseInt(savedScroll, 10)
      if (scrollY > 100) {
        setScrollAllowed(true)
        // Restore scroll position after a tiny delay
        setTimeout(() => {
          window.scrollTo(0, scrollY)
        }, 100)
      }
    }
    
    // Check on any scroll event (one time)
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollAllowed(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!scrollAllowed) {
      // Block scroll
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      
      // Prevent scroll with wheel
      const preventScroll = (e) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      
      const preventTouchMove = (e) => {
        if (e.touches.length > 0) {
          e.preventDefault()
        }
      }
      
      window.addEventListener('wheel', preventScroll, { passive: false })
      window.addEventListener('touchmove', preventTouchMove, { passive: false })
      
      return () => {
        window.removeEventListener('wheel', preventScroll)
        window.removeEventListener('touchmove', preventTouchMove)
      }
    } else {
      // Allow scroll
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [scrollAllowed])

  return (
    <div className="min-h-screen bg-horror-black relative">
      <BackgroundMusic />
      <BloodBackground />
      <Hero onEnter={() => setScrollAllowed(true)} />
      <About />
      <DressCode />
      <Games />
      <RSVP />
      <Footer />
    </div>
  )
}

export default App

