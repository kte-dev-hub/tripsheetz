'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'visa', label: 'Visa & Entry' },
  { id: 'money', label: 'Money' },
  { id: 'communications', label: 'Communications' },
  { id: 'time', label: 'Time' },
  { id: 'transport', label: 'Transportation' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'weather', label: 'Weather' },
  { id: 'measurements', label: 'Measurements' },
  { id: 'emergency', label: 'Emergency' },
]

export default function SectionNav() {
  const [activeId, setActiveId] = useState('overview')
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isClickScrolling = useRef(false)

  // Track which section is in view using IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    // Small delay to ensure sections are rendered
    const timer = setTimeout(() => {
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !isClickScrolling.current) {
                setActiveId(id)
              }
            })
          },
          {
            // Offset for navbar (56px) + pill bar (~52px) = ~108px
            rootMargin: '-108px 0px -60% 0px',
            threshold: 0,
          }
        )

        observer.observe(el)
        observers.push(observer)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  // Auto-scroll pill bar to keep active pill visible
  useEffect(() => {
    const pill = pillRefs.current[activeId]
    if (pill && scrollContainerRef.current) {
      pill.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [activeId])

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    setActiveId(id)

    // Prevent IntersectionObserver from overriding during smooth scroll
    isClickScrolling.current = true

    el.scrollIntoView({ behavior: 'smooth' })

    // Re-enable observer after scroll completes
    setTimeout(() => {
      isClickScrolling.current = false
    }, 1000)
  }, [])

  return (
    <div className="sticky top-14 z-30 bg-gray-50 border-b border-gray-200">
      <div
        ref={scrollContainerRef}
        className="section-nav-scroll mx-auto max-w-5xl overflow-x-auto px-4 sm:px-6 lg:px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`.section-nav-scroll::-webkit-scrollbar { display: none; }`}</style>
        <div className="section-nav-scroll flex gap-1.5 py-3">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              ref={(el) => { pillRefs.current[id] = el }}
              onClick={() => handleClick(id)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                activeId === id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
          {/* Extra padding so last pill isn't flush against edge */}
          <div className="shrink-0 w-4" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
