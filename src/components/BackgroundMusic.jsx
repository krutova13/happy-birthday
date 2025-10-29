import { useEffect, useRef } from 'react'

const BackgroundMusic = () => {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set volume lower for background music
    audio.volume = 0.3
    audio.loop = true

    // Try to play on user interaction (after first click anywhere)
    const handleFirstInteraction = () => {
      audio.play().catch(() => {
        // Ignore autoplay restrictions - user needs to interact first
      })
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }

    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('touchstart', handleFirstInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [])

  // Expose audio ref globally for other components to control
  useEffect(() => {
    if (audioRef.current) {
      window.backgroundMusicAudio = audioRef.current
    }
    return () => {
      delete window.backgroundMusicAudio
    }
  }, [])

  return (
    <audio ref={audioRef} id="background-music" preload="auto">
      <source src="/horror-sound.wav" type="audio/wav" />
    </audio>
  )
}

export default BackgroundMusic

