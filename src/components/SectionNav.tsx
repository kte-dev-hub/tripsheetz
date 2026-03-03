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
  const [isStuck, setIsStuck] = useState(false)
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const isClickScrolling = useRef(false)

  // Use a sentinel element to detect when pill bar should become fixed
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  // Track which section is in view using IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []

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
            rootMargin: '-120px 0px -60% 0px',
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
    isClickScrolling.current = true
    el.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      isClickScrolling.current = false
    }, 1000)
  }, [])

  const pillBar = (
    <div
      ref={scrollContainerRef}
      className="section-nav-scroll mx-auto max-w-5xl overflow-x-auto px-4 sm:px-6 lg:px-8"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`.section-nav-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div className="flex gap-1.5 py-3">
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
        <div className="shrink-0 w-4" aria-hidden="true" />
      </div>
    </div>
  )

  return (
    <>
      {/* Sentinel: when this scrolls out of view, the fixed bar appears */}
      <div ref={sentinelRef} className="bg-white border-b border-gray-200">
        {pillBar}
      </div>

      {/* Fixed bar that appears when sentinel scrolls away */}
      {isStuck && (
        <div className="fixed top-14 left-0 right-0 z-40 bg-white border-b border-gray-200">
          {pillBar}
        </div>
      )}
    </>
  )
}
