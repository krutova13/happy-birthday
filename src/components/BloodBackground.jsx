import { useEffect } from 'react'

const BloodBackground = () => {
  useEffect(() => {
    const container = document.getElementById('blood-background')
    if (!container) return

    // Create blood drops
    for (let i = 0; i < 15; i++) {
      const drop = document.createElement('div')
      drop.className = 'blood-drop'
      const size = 30 + Math.random() * 50
      drop.style.width = `${size}px`
      drop.style.height = `${size * 1.3}px`
      drop.style.left = `${Math.random() * 100}%`
      drop.style.top = `${Math.random() * 30}%`
      drop.style.animationDelay = `${Math.random() * 8}s`
      drop.style.animationDuration = `${6 + Math.random() * 4}s`
      container.appendChild(drop)
    }

    // Create blood splatters
    for (let i = 0; i < 20; i++) {
      const splatter = document.createElement('div')
      splatter.className = 'blood-splatter'
      const size = 40 + Math.random() * 80
      splatter.style.width = `${size}px`
      splatter.style.height = `${size}px`
      splatter.style.left = `${Math.random() * 100}%`
      splatter.style.top = `${Math.random() * 100}%`
      splatter.style.animationDelay = `${Math.random() * 6}s`
      splatter.style.animationDuration = `${4 + Math.random() * 4}s`
      container.appendChild(splatter)
    }

    // Create blood stains on walls
    for (let i = 0; i < 10; i++) {
      const stain = document.createElement('div')
      stain.className = 'blood-stain'
      const width = 60 + Math.random() * 100
      const height = 80 + Math.random() * 120
      stain.style.width = `${width}px`
      stain.style.height = `${height}px`
      stain.style.left = `${Math.random() * 100}%`
      stain.style.top = `${Math.random() * 100}%`
      stain.style.setProperty('--blood-rotation', `${Math.random() * 360}deg`)
      stain.style.opacity = `${0.3 + Math.random() * 0.3}`
      container.appendChild(stain)
    }

    return () => {
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [])

  return <div id="blood-background" className="blood-background" />
}

export default BloodBackground

