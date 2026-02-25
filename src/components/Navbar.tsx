'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Menu as MenuIcon, X, Search } from 'lucide-react'
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
    router.push(`/${country.slug}`)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
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
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setHighlightedIndex(-1)
      inputRef.current?.blur()
    }
  }

  return (
    <Disclosure
      as="nav"
      className="relative bg-white shadow-sm dark:bg-gray-800/50 dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 lg:px-0">
            <a href="/" className="flex shrink-0 items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">TripSheetz</span>
            </a>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              <a
                href="/browse"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-white"
              >
                Browse Countries
              </a>
              <a
                href="/compare"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-white"
              >
                Compare
              </a>
            </div>
          </div>
          {showSearch && (
            <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div ref={searchRef} className="relative w-full max-w-lg lg:max-w-xs">
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
                    className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                  />
                </div>

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

                {isOpen && query.length >= 1 && filteredCountries.length === 0 && countries.length > 0 && (
                  <div className="absolute z-50 mt-1 w-full rounded-md bg-white py-3 px-4 text-sm text-gray-500 shadow-lg ring-1 ring-black/5">
                    No countries found for &ldquo;{query}&rdquo;
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center lg:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-600 dark:hover:bg-white/5 dark:hover:text-white dark:focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <MenuIcon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <X aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="hidden lg:ml-4 lg:flex lg:items-center">
            <a
              href="/sign-in"
              className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>

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
                className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                role="combobox"
                aria-expanded={isOpen && filteredCountries.length > 0}
                aria-controls="mobile-search-results"
                aria-activedescendant={highlightedIndex >= 0 ? `mobile-search-result-${highlightedIndex}` : undefined}
              />
              <Search
                aria-hidden="true"
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
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Browse Countries
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="/compare"
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Compare
          </DisclosureButton>
          <DisclosureButton
            as="a"
            href="/sign-in"
            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Sign In
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
