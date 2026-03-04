'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Equal, X, Search } from 'lucide-react'
import { getSupabase } from '@/lib/supabase'

interface CountryOption {
  name: string
  slug: string
  iso_alpha2: string
}

interface NavbarProps {
  showSearch?: boolean
}

export default function Navbar({ showSearch = true }: NavbarProps) {
  const router = useRouter()
  const [countries, setCountries] = useState<CountryOption[]>([])
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const mobileSearchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function fetchCountries() {
      const supabase = getSupabase()
      const { data } = await supabase
        .from('countries')
        .select('name, slug, iso_alpha2')
        .order('name', { ascending: true })
      if (data) setCountries(data)
    }
    fetchCountries()
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      const insideDesktop = searchRef.current?.contains(target)
      const insideMobile = mobileSearchRef.current?.contains(target)
      if (!insideDesktop && !insideMobile) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredCountries = query.length >= 1
    ? countries.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : []

  function handleSelect(country: CountryOption) {
    setQuery('')
    setIsOpen(false)
    setHighlightedIndex(-1)
    setSearchOpen(false)
    router.push(`/${country.slug}`)
  }

  function closeSearch() {
    setSearchOpen(false)
    setQuery('')
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      if (isOpen) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      } else {
        closeSearch()
      }
      return
    }

    if (!isOpen || filteredCountries.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(prev => (prev < filteredCountries.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : filteredCountries.length - 1))
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault()
      handleSelect(filteredCountries[highlightedIndex])
    }
  }

  return (
<Disclosure
  as="nav"
  className="sticky top-0 z-50 bg-white"
>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 justify-between">

          {/* ===== SEARCH TAKEOVER MODE ===== */}
          {searchOpen ? (
            <div ref={searchRef} className="relative flex flex-1 items-center gap-3">
              <div className="relative flex-1">
                <div className="grid w-full grid-cols-1">
                  <input
                    ref={inputRef}
                    name="search"
                    type="search"
                    placeholder="Search countries..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value)
                      setIsOpen(e.target.value.length >= 1)
                      setHighlightedIndex(-1)
                    }}
                    onFocus={() => {
                      if (query.length >= 1) setIsOpen(true)
                    }}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    role="combobox"
                    aria-expanded={isOpen && filteredCountries.length > 0}
                    aria-controls="search-results"
                    aria-activedescendant={highlightedIndex >= 0 ? `search-result-${highlightedIndex}` : undefined}
                  />
                  <Search
                    aria-hidden="true"
                    strokeWidth={1}
                    className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                  />
                </div>

                {/* Autocomplete dropdown */}
                {isOpen && filteredCountries.length > 0 && (
                  <ul
                    id="search-results"
                    role="listbox"
                    className="absolute z-50 mt-1 w-full overflow-hidden rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
                  >
                    {filteredCountries.map((country, index) => (
                      <li
                        key={country.slug}
                        id={`search-result-${index}`}
                        role="option"
                        aria-selected={index === highlightedIndex}
                        className={`flex cursor-pointer items-center gap-3 px-4 py-2 text-sm ${
                          index === highlightedIndex
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-900 hover:bg-gray-50'
                        }`}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          handleSelect(country)
                        }}
                      >
                        <img
                          src={`https://flagcdn.com/w40/${country.iso_alpha2.trim().toLowerCase()}.png`}
                          alt=""
                          className="h-4 w-6 object-cover"
                        />
                        <span>{country.name}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* No results */}
                {isOpen && query.length >= 1 && filteredCountries.length === 0 && countries.length > 0 && (
                  <div className="absolute z-50 mt-1 w-full rounded-md bg-white py-3 px-4 text-sm text-gray-500 shadow-lg ring-1 ring-black/5">
                    No countries found for &ldquo;{query}&rdquo;
                  </div>
                )}
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={closeSearch}
                className="shrink-0 rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-600"
                aria-label="Close search"
              >
                <X className="size-5" aria-hidden="true" strokeWidth={1} />
              </button>
            </div>
          ) : (
            /* ===== NORMAL NAVBAR MODE ===== */
            <>
              <div className="flex">
                <a href="/" className="flex shrink-0 items-center -space-x-1">
                  <svg width="38" height="38" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                    <path d="M56 8L8 30L30 35Z" fill="#4f46e5" />
                    <path d="M8 30L30 35L38 56Z" fill="#ea580c" />
                    <path d="M56 8L30 35" stroke="#fff" strokeWidth="4" />
                    <path d="M8 30L30 35" stroke="#fff" strokeWidth="4" />
                    <path d="M30 35L38 56" stroke="#fff" strokeWidth="4" />
                  </svg>
                  <span className="text-xl font-extrabold tracking-tight">
                    <span className="text-indigo-600">Trip</span>
                    <span className="text-orange-600">Sheetz</span>
                  </span>
                </a>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  <a
                    href="/browse"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Browse Countries
                  </a>
                  <a
                    href="/compare"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Compare
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Search icon — desktop */}
                {showSearch && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(true)
                      setTimeout(() => inputRef.current?.focus(), 50)
                    }}
                    className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-600"
                    aria-label="Search countries"
                  >
                    <Search className="size-5" aria-hidden="true" strokeWidth={1} />
                  </button>
                )}

                {/* Sign In — desktop */}
                <a
                  href="/sign-in"
                  className="hidden lg:block text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Sign In
                </a>

                {/* Hamburger — mobile */}
                <div className="flex items-center lg:hidden">
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-600">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Equal aria-hidden="true" strokeWidth={1} className="block size-6 group-data-open:hidden" />
                    <X aria-hidden="true" strokeWidth={1} className="hidden size-6 group-data-open:block" />
                  </DisclosureButton>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <DisclosurePanel className="lg:hidden">
        {showSearch && (
          <div ref={mobileSearchRef} className="relative px-2 pt-2 pb-3">
            <div className="grid w-full grid-cols-1">
              <input
                name="mobile-search"
                type="search"
                placeholder="Search countries..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setIsOpen(e.target.value.length >= 1)
                  setHighlightedIndex(-1)
                }}
                onFocus={() => {
                  if (query.length >= 1) setIsOpen(true)
                }}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                role="combobox"
                aria-expanded={isOpen && filteredCountries.length > 0}
                aria-controls="mobile-search-results"
                aria-activedescendant={highlightedIndex >= 0 ? `mobile-search-result-${highlightedIndex}` : undefined}
              />
              <Search
                aria-hidden="true"
                strokeWidth={1}
                className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
              />
            </div>

            {isOpen && filteredCountries.length > 0 && (
              <ul
                id="mobile-search-results"
                role="listbox"
                className="mt-1 w-full overflow-hidden rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
              >
                {filteredCountries.map((country, index) => (
                  <li
                    key={country.slug}
                    id={`mobile-search-result-${index}`}
                    role="option"
                    aria-selected={index === highlightedIndex}
                    className={`flex cursor-pointer items-center gap-3 px-4 py-2 text-sm ${
                      index === highlightedIndex
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      handleSelect(country)
                    }}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${country.iso_alpha2.trim().toLowerCase()}.png`}
                      alt=""
                      className="h-4 w-6 object-cover"
                    />
                    <span>{country.name}</span>
                  </li>
                ))}
              </ul>
            )}

            {isOpen && query.length >= 1 && filteredCountries.length === 0 && countries.length > 0 && (
              <div className="mt-1 w-full rounded-md bg-white py-3 px-4 text-sm text-gray-500 shadow-lg ring-1 ring-black/5">
                No countries found for &ldquo;{query}&rdquo;
              </div>
            )}
          </div>
        )}
        <div className="space-y-1 pt-2 pb-3">
          <DisclosureButton
            as="a"
            href="/browse"
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >
            Browse Countries
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="/compare"
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >
            Compare
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="/sign-in"
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
          >
            Sign In
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
