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
      // Block scroll - use CSS only for better performance
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${window.scrollY}px`
      
      // Store scroll position
      const scrollY = window.scrollY
      
      // Prevent scroll with wheel (desktop)
      const preventScroll = (e) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      
      // Prevent scroll with touch (mobile) - optimized
      let touchStartY = 0
      const preventTouchMove = (e) => {
        const touchY = e.touches[0].clientY
        const touchDiff = Math.abs(touchY - touchStartY)
        if (touchDiff > 10) {
          e.preventDefault()
        }
      }
      
      const handleTouchStart = (e) => {
        touchStartY = e.touches[0].clientY
      }
      
      window.addEventListener('wheel', preventScroll, { passive: false })
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchmove', preventTouchMove, { passive: false })
      
      return () => {
        window.removeEventListener('wheel', preventScroll)
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchmove', preventTouchMove)
        // Restore scroll position when unblocking
        document.body.style.position = ''
        document.body.style.width = ''
        document.body.style.top = ''
        window.scrollTo(0, scrollY)
      }
    } else {
      // Allow scroll
      const scrollY = parseInt(document.body.style.top || '0', 10) * -1 || 0
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      if (scrollY > 0) {
        window.scrollTo(0, scrollY)
      }
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

