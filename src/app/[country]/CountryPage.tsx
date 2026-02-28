'use client'

import { useState, useEffect } from 'react'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'
import { ChevronsUpDown, Check, Info, ChevronDown, ExternalLink, Clock, Plane } from 'lucide-react'

interface Country {
  id: number
  name: string
  official_name: string
  native_name: string
  iso_alpha2: string
  slug: string
}

interface VisaRequirement {
  id: number
  passport_code: string
  destination_code: string
  visa_status: string | null
  visa_duration: string | null
  visa_color: string | null
  secondary_rule_name: string | null
  secondary_rule_duration: string | null
  secondary_rule_color: string | null
  secondary_rule_link: string | null
  passport_validity: string | null
  mandatory_registration_name: string | null
  mandatory_registration_color: string | null
  mandatory_registration_link: string | null
  embassy_url: string | null
  last_verified: string | null
}

interface EntryRequirement {
  id: number
  country_code: string
  return_ticket_required: boolean | null
  proof_of_funds_required: boolean | null
  customs_declaration_required: boolean | null
  arrival_card_required: boolean | null
  dutyfree_alcohol: string | null
  dutyfree_tobacco: string | null
  dutyfree_cash_limit: string | null
  dutyfree_perfume: string | null
  dutyfree_other: string | null
  dutyfree_penalties: string | null
  restricted_items: string | null
  immigration_website: string | null
  customs_website: string | null
  entry_portal_name: string | null
  entry_portal_url: string | null
  entry_portal_description: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string[] | null
}

interface GovernmentResource {
  id: number
  country_code: string
  category: string
  name: string | null
  url: string | null
  description: string | null
  is_primary: boolean | null
  verified: boolean | null
  last_verified: string | null
}

interface Currency {
  id: number
  country_code: string
  currency_name: string
  currency_symbol: string | null
  currency_code: string
  banknotes: string | null
  coins: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface PaymentMethod {
  id: number
  country_code: string
  cash_vs_card: string | null
  mobile_payment_apps: string | null
  atm_availability: string | null
  foreign_card_fees: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface TippingCustom {
  id: number
  country_code: string
  context: string
  expected: string
  typical_amount: string | null
  note: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface AverageCost {
  id: number
  country_code: string
  item: string
  cost_local: string
  cost_usd: string
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface TaxRefund {
  id: number
  country_code: string
  tax_rate: string | null
  eligible_purchases: string | null
  minimum_purchase: string | null
  how_to_claim: string | null
  where_to_claim: string | null
  refund_method: string | null
  time_limit: string | null
  refund_portal_url: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface PhoneInfo {
  id: number
  country_code: string
  dialing_code: string | null
  phone_number_format: string | null
  phone_number_length: string | null
  how_to_dial_local: string | null
  how_to_dial_international: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface MobileData {
  id: number
  country_code: string
  major_carriers: string | null
  esim_available: string | null
  esim_providers: string | null
  sim_purchase_locations: string | null
  sim_requirements: string | null
  network_standards: string | null
  prepaid_plan_costs: string | null
  wifi_rental: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface AppsAccess {
  id: number
  country_code: string
  messaging_apps: string | null
  vpn_needed: string | null
  blocked_services: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface CountryTimezone {
  id: number
  country_code: string
  city: string
  timezone_id: string
  timezone_name: string
  timezone_abbreviation: string | null
  dst_observed: boolean
  display_order: number
}

interface Airport {
  id: number
  country_code: string
  city: string
  airport_name: string
  iata_code: string
  distance_to_city: string
  transport_options: string | null
  website: string | null
  display_order: number
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface TaxisRidehailing {
  id: number
  country_code: string
  ride_hailing_apps: string | null
  taxi_info: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface PublicTransit {
  id: number
  country_code: string
  transit_systems: string | null
  transit_card_name: string | null
  transit_card_where_to_buy: string | null
  transit_contactless: string | null
  intercity_options: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface Driving {
  id: number
  country_code: string
  driving_side: string | null
  idp_required: string | null
  road_conditions: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface CountryElectrical {
  id: number
  country_code: string
  plug_types: string
  voltage: string
  frequency: string
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface PlugType {
  id: number
  type_letter: string
  description: string
  svg_filename: string
}

interface ElectricalTemplate {
  id: number
  scenario: string
  heading: string
  description: string
}

interface CountryElectricalSummary {
  country_code: string
  plug_types: string
  voltage: string
  frequency: string
}

interface CountryPageProps {
  country: Country
  allCountries: { id: number; name: string; iso_alpha2: string; currency_code: string | null }[]
  visaRequirements: VisaRequirement[]
  entryRequirements: EntryRequirement | null
  governmentResources: GovernmentResource[]
  currency: Currency | null
  paymentMethods: PaymentMethod | null
  tippingCustoms: TippingCustom[]
  averageCosts: AverageCost[]
  taxRefund: TaxRefund | null
  currencyReference: { currency_code: string; currency_name: string; currency_symbol: string }[]
  phoneInfo: PhoneInfo | null
  mobileData: MobileData | null
  appsAccess: AppsAccess | null
  countryTimezones: CountryTimezone[]
  airports: Airport[]
  taxisRidehailing: TaxisRidehailing | null
  publicTransit: PublicTransit | null
  driving: Driving | null
  countryElectrical: CountryElectrical | null
  plugTypes: PlugType[]
  electricalTemplates: ElectricalTemplate[]
  allCountryElectrical: CountryElectricalSummary[]
}

export default function CountryPage({
  country,
  allCountries,
  visaRequirements,
  entryRequirements,
  governmentResources,
  currency,
  paymentMethods,
  tippingCustoms,
  averageCosts,
  taxRefund,
  currencyReference,
  phoneInfo,
  mobileData,
  appsAccess,
  countryTimezones,
  airports,
  taxisRidehailing,
  publicTransit,
  driving,
  countryElectrical,
  plugTypes,
  electricalTemplates,
  allCountryElectrical,
}: CountryPageProps) {
  const [masterTravelingFrom, setMasterTravelingFrom] = useState<string | null>(null)
  const [masterNationality, setMasterNationality] = useState<string | null>(null)
  const [travelingFromQuery, setTravelingFromQuery] = useState('')
  const [masterNationalityQuery, setMasterNationalityQuery] = useState('')
  const [dutyFreeOpen, setDutyFreeOpen] = useState(false)
  const [restrictedItemsOpen, setRestrictedItemsOpen] = useState(false)

  // Money section state
  const [tippingOpen, setTippingOpen] = useState(false)
  const [typicalCostsOpen, setTypicalCostsOpen] = useState(false)

  // Currency converter state
  const [localAmount, setLocalAmount] = useState<string>('1')
  const [foreignAmount, setForeignAmount] = useState<string>('')
  const [selectedCurrency, setSelectedCurrency] = useState<string>('')
  const [exchangeRates, setExchangeRates] = useState<Record<string, number> | null>(null)
  const [rateLastUpdated, setRateLastUpdated] = useState<string>('')
  const [rateLoading, setRateLoading] = useState<boolean>(false)
  const [rateError, setRateError] = useState<string>('')
  const [currencyQuery, setCurrencyQuery] = useState('')

  // Live clock
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTimezoneIndex, setActiveTimezoneIndex] = useState(0)

  // Airport city selector
  const [selectedAirportCity, setSelectedAirportCity] = useState<string | null>(null)
  const [airportCityQuery, setAirportCityQuery] = useState('')

  const masterCountryList = allCountries
    .filter((c) => c.iso_alpha2.trim() !== country.iso_alpha2.trim())
    .map((c) => ({
      code: c.iso_alpha2.trim(),
      name: c.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const filteredTravelingFrom = travelingFromQuery === ''
    ? masterCountryList
    : masterCountryList.filter((c) =>
        c.name.toLowerCase().includes(travelingFromQuery.toLowerCase())
      )

  const filteredMasterNationality = masterNationalityQuery === ''
    ? masterCountryList
    : masterCountryList.filter((c) =>
        c.name.toLowerCase().includes(masterNationalityQuery.toLowerCase())
      )

  const handleTravelingFromChange = (countryCode: string | null) => {
    setMasterTravelingFrom(countryCode)
    if (countryCode && (!masterNationality || masterNationality === masterTravelingFrom)) {
      setMasterNationality(countryCode)
    }
  }

  const activeVisa = masterNationality
    ? visaRequirements.find((v) => v.passport_code.trim() === masterNationality)
    : null

  const visaGovResources = governmentResources.filter((r) =>
    ['immigration', 'customs', 'entry_portal', 'tourism'].includes(r.category)
  )

  function getVisaColors(visaStatus: string | null) {
    const status = (visaStatus ?? '').toLowerCase()
    if (status.includes('free') || status.includes('not required')) {
      return {
        border: 'border-green-400',
        bg: 'bg-green-50',
        text: 'text-green-700',
        icon: 'text-green-400',
      }
    }
    if (status.includes('e-visa') || status.includes('on arrival') || status.includes('eta')) {
      return {
        border: 'border-yellow-400',
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        icon: 'text-yellow-400',
      }
    }
    return {
      border: 'border-red-400',
      bg: 'bg-red-50',
      text: 'text-red-700',
      icon: 'text-red-400',
    }
  }

  function boolStatus(val: boolean | null | undefined): string {
    if (val === true) return 'Required'
    if (val === false) return 'Not Required'
    return '—'
  }

  function formatTimeForZone(date: Date, timezoneId: string) {
    const time24 = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: timezoneId,
    }).format(date)

    const time12 = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: timezoneId,
    }).format(date)

    const dateStr = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: timezoneId,
    }).format(date)

    return { time24, time12, dateStr }
  }

  function getUtcOffset(date: Date, timezoneId: string): string {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezoneId,
      timeZoneName: 'longOffset',
    })
    const parts = formatter.formatToParts(date)
    const offsetPart = parts.find((p) => p.type === 'timeZoneName')
    const raw = offsetPart?.value ?? ''
    if (raw === 'GMT') return '+00:00'
    return raw.replace('GMT', '')
  }

  const homeCountries = allCountryElectrical
    .filter((ce) => ce.country_code.trim() !== country.iso_alpha2.trim())
    .map((ce) => {
      const match = allCountries.find((c) => c.iso_alpha2.trim() === ce.country_code.trim())
      return {
        code: ce.country_code.trim(),
        name: match?.name ?? ce.country_code,
        plug_types: ce.plug_types,
        voltage: ce.voltage,
        frequency: ce.frequency,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  const selectedHomeElectrical = masterTravelingFrom
    ? homeCountries.find((c) => c.code === masterTravelingFrom) ?? null
    : null

  function getElectricalComparison() {
    if (!countryElectrical || !selectedHomeElectrical) return null

    const destTypes = countryElectrical.plug_types.split(',').map((t) => t.trim())
    const homeTypes = selectedHomeElectrical.plug_types.split(',').map((t) => t.trim())

    const matching = destTypes.filter((t) => homeTypes.includes(t))
    const nonMatchingHome = homeTypes.filter((t) => !destTypes.includes(t))

    let adapterScenario: string
    if (matching.length === homeTypes.length) {
      adapterScenario = 'adapter_not_needed'
    } else if (matching.length > 0) {
      adapterScenario = 'adapter_partial'
    } else {
      adapterScenario = 'adapter_needed'
    }

    const destV = parseInt(countryElectrical.voltage)
    const homeV = parseInt(selectedHomeElectrical.voltage)
    const voltageSameRange =
      (destV >= 100 && destV <= 127 && homeV >= 100 && homeV <= 127) ||
      (destV >= 220 && destV <= 240 && homeV >= 220 && homeV <= 240)
    const voltageScenario = voltageSameRange ? 'voltage_same' : 'voltage_different'

    const fillTemplate = (template: string) => {
      const homePlugTypeNames = homeTypes.map((t) => `Type ${t}`).join(', ')
      const destPlugTypeNames = destTypes.map((t) => `Type ${t}`).join(', ')
      const matchingTypeNames = matching.map((t) => `Type ${t}`).join(', ')
      const nonMatchingTypeNames = nonMatchingHome.map((t) => `Type ${t}`).join(', ')

      return template
        .replace(/{home_country}/g, selectedHomeElectrical.name)
        .replace(/{destination_country}/g, country.name)
        .replace(/{home_plug_types}/g, homePlugTypeNames)
        .replace(/{destination_plug_types}/g, destPlugTypeNames)
        .replace(/{matching_types}/g, matchingTypeNames)
        .replace(/{non_matching_types}/g, nonMatchingTypeNames)
        .replace(/{home_voltage}/g, selectedHomeElectrical.voltage)
        .replace(/{destination_voltage}/g, countryElectrical.voltage)
    }

    const adapterTemplate = electricalTemplates.find((t) => t.scenario === adapterScenario)
    const voltageTemplate = electricalTemplates.find((t) => t.scenario === voltageScenario)

    return {
      adapter: adapterTemplate
        ? { heading: adapterTemplate.heading, description: fillTemplate(adapterTemplate.description) }
        : null,
      voltage: voltageTemplate
        ? { heading: voltageTemplate.heading, description: fillTemplate(voltageTemplate.description) }
        : null,
    }
  }

  const electricalComparison = getElectricalComparison()

  const getCurrencySymbol = (code: string): string => {
    const ref = currencyReference.find((c) => c.currency_code === code)
    return ref?.currency_symbol || code
  }

  const getCurrencyName = (code: string): string => {
    const ref = currencyReference.find((c) => c.currency_code === code)
    return ref?.currency_name || code
  }

  const availableCurrencies = exchangeRates
    ? Object.keys(exchangeRates)
        .filter((code) => code !== currency?.currency_code)
        .sort()
        .map((code) => ({
          code,
          name: getCurrencyName(code),
          symbol: getCurrencySymbol(code),
        }))
    : []

  const filteredCurrencies = currencyQuery === ''
    ? availableCurrencies
    : availableCurrencies.filter((c) =>
        c.code.toLowerCase().includes(currencyQuery.toLowerCase()) ||
        c.name.toLowerCase().includes(currencyQuery.toLowerCase())
      )

  const airportCities = airports.reduce<string[]>((cities, airport) => {
    if (!cities.includes(airport.city)) cities.push(airport.city)
    return cities
  }, [])

  const activeAirportCity = selectedAirportCity || airportCities[0] || null

  const filteredAirports = airports.filter(a => a.city === activeAirportCity)

  const filteredAirportCities = airportCityQuery === ''
    ? airportCities
    : airportCities.filter(city =>
        city.toLowerCase().includes(airportCityQuery.toLowerCase())
      )

  const handleLocalAmountChange = (value: string) => {
    setLocalAmount(value)
    if (exchangeRates && value && !isNaN(Number(value))) {
      const rate = exchangeRates[selectedCurrency]
      if (rate) {
        setForeignAmount((Number(value) * rate).toFixed(2))
      }
    } else {
      setForeignAmount('')
    }
  }

  const handleForeignAmountChange = (value: string) => {
    setForeignAmount(value)
    if (exchangeRates && value && !isNaN(Number(value))) {
      const rate = exchangeRates[selectedCurrency]
      if (rate) {
        setLocalAmount((Number(value) / rate).toFixed(2))
      }
    } else {
      setLocalAmount('')
    }
  }

  const handleCurrencyChange = (newCurrency: string) => {
    setSelectedCurrency(newCurrency)
    if (exchangeRates && localAmount && !isNaN(Number(localAmount))) {
      const rate = exchangeRates[newCurrency]
      if (rate) {
        setForeignAmount((Number(localAmount) * rate).toFixed(2))
      }
    }
  }

  useEffect(() => {
    if (currency?.currency_code && !exchangeRates) {
      setRateLoading(true)
      setRateError('')
      fetch(`https://open.er-api.com/v6/latest/${currency.currency_code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.result === 'success') {
            setExchangeRates(data.rates)
            setRateLastUpdated(data.time_last_update_utc)
          } else {
            setRateError('Unable to load exchange rates.')
          }
        })
        .catch(() => {
          setRateError('Unable to load exchange rates.')
        })
        .finally(() => {
          setRateLoading(false)
        })
    }
  }, [currency?.currency_code])

  useEffect(() => {
    if (masterTravelingFrom && exchangeRates) {
      const travelingFromCountry = allCountries.find(
        (c) => c.iso_alpha2.trim() === masterTravelingFrom
      )
      if (travelingFromCountry?.currency_code && exchangeRates[travelingFromCountry.currency_code]) {
        if (!selectedCurrency) {
          handleCurrencyChange(travelingFromCountry.currency_code)
        }
      }
    }
  }, [masterTravelingFrom, exchangeRates])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

      {/* ============================================================
          PAGE HEADER — Flag + Country Name
          ============================================================ */}
      <div className="flex items-center gap-4">
        <img
          alt={`Flag of ${country.name}`}
          src={`https://flagcdn.com/w80/${country.iso_alpha2.trim().toLowerCase()}.png`}
          className="h-8 w-auto"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{country.name}</h1>
          <p className="text-sm text-gray-500">
            {country.native_name && country.native_name !== country.name && `${country.native_name} · `}{country.official_name}
          </p>
        </div>
      </div>

      {/* ============================================================
          MASTER SELECTOR — Well On Gray (#334) container
          ============================================================ */}
      <div className="mt-6 overflow-hidden rounded-lg bg-gray-200">
        <div className="px-4 py-5 sm:p-6">

          {/* Header row with info icon */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-900">Personalize your trip</p>
            <span className="group relative">
              <Info className="size-4 text-gray-400 cursor-help" aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 w-64 rounded-md bg-gray-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                Select your home country and passport nationality to personalize visa requirements, embassy info, electrical comparisons, and currency defaults.
              </span>
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">

            {/* Traveling From — Combobox (#182) */}
            <Combobox
              as="div"
              value={masterTravelingFrom}
              onChange={handleTravelingFromChange}
              className="flex-1"
            >
              <label className="block text-sm/6 font-medium text-gray-900">Traveling from</label>
              <div className="relative mt-1.5">
                <ComboboxInput
                  className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(event) => setTravelingFromQuery(event.target.value)}
                  onBlur={() => setTravelingFromQuery('')}
                  displayValue={(code: string | null) =>
                    code ? (masterCountryList.find((c) => c.code === code)?.name ?? '') : ''
                  }
                  placeholder="Select a country"
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
                  <ChevronsUpDown className="size-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>
                <ComboboxOptions
                  transition
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                  {filteredTravelingFrom.map((c) => (
                    <ComboboxOption
                      key={c.code}
                      value={c.code}
                      className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                    >
                      <span className="block truncate font-normal group-data-selected:font-semibold">{c.name}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                        <Check aria-hidden="true" className="size-5" />
                      </span>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </div>
            </Combobox>

            {/* Nationality — Combobox (#182) */}
            <Combobox
              as="div"
              value={masterNationality}
              onChange={setMasterNationality}
              className="flex-1"
            >
              <label className="block text-sm/6 font-medium text-gray-900">Nationality</label>
              <div className="relative mt-1.5">
                <ComboboxInput
                  className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(event) => setMasterNationalityQuery(event.target.value)}
                  onBlur={() => setMasterNationalityQuery('')}
                  displayValue={(code: string | null) =>
                    code ? (masterCountryList.find((c) => c.code === code)?.name ?? '') : ''
                  }
                  placeholder="Select a country"
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
                  <ChevronsUpDown className="size-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>
                <ComboboxOptions
                  transition
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                  {filteredMasterNationality.map((c) => (
                    <ComboboxOption
                      key={c.code}
                      value={c.code}
                      className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                    >
                      <span className="block truncate font-normal group-data-selected:font-semibold">{c.name}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                        <Check aria-hidden="true" className="size-5" />
                      </span>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </div>
            </Combobox>

          </div>

          {/* Helper text */}
          <p className="mt-3 text-xs text-gray-500">
            {masterTravelingFrom || masterNationality
              ? 'Your selections personalize visa requirements, embassy info, electrical comparisons, and currency defaults.'
              : 'Select your country to personalize visa requirements, embassy info, electrical comparisons, and currency defaults.'}
          </p>

        </div>
      </div>

    {/* ============================================================
        SECTION 1: VISA & ENTRY
        ============================================================ */}
    <section id="visa" className="mt-10">

      {/* Section Divider — #355 With Title On Left */}
      <div className="flex items-center">
        <div className="relative flex justify-start">
          <span className="pr-3 text-base font-semibold whitespace-nowrap text-gray-900">
            Visa & Entry
          </span>
        </div>
        <div aria-hidden="true" className="w-full border-t border-gray-300" />
      </div>

      {/* ---- P1: VISA STATUS VERDICT ---- */}
      {masterNationality && activeVisa ? (
        <div className="mt-6">
          {/* Alert With Accent Border — #190 */}
          {(() => {
            const colors = getVisaColors(activeVisa.visa_status)
            return (
              <div className={`border-l-4 ${colors.border} ${colors.bg} p-4`}>
                <div className="flex">
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${colors.text}`}>
                      {activeVisa.visa_status ?? 'Unknown'}
                    </p>
                    {activeVisa.visa_duration && (
                      <p className={`mt-1 text-2xl font-bold ${colors.text}`}>
                        {activeVisa.visa_duration}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Passport validity note */}
          {activeVisa.passport_validity && (
            <p className="mt-3 text-sm text-gray-700">
              <span className="font-medium">Passport validity:</span> {activeVisa.passport_validity}
            </p>
          )}

          {/* Secondary rule (e.g. K-ETA) */}
          {activeVisa.secondary_rule_name && (
            <p className="mt-2 text-sm text-gray-700">
              <span className="font-medium">{activeVisa.secondary_rule_name}:</span>{' '}
              {activeVisa.secondary_rule_duration}
              {activeVisa.secondary_rule_link && (
                <>
                  {' — '}
                  <a
                    href={activeVisa.secondary_rule_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    More info <ExternalLink className="ml-1 inline size-3.5" aria-hidden="true" />
                  </a>
                </>
              )}
            </p>
          )}

          {/* Mandatory registration */}
          {activeVisa.mandatory_registration_name && (
            <p className="mt-2 text-sm text-gray-700">
              <span className="font-medium">{activeVisa.mandatory_registration_name}</span>
              {activeVisa.mandatory_registration_link && (
                <>
                  {' — '}
                  <a
                    href={activeVisa.mandatory_registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    More info <ExternalLink className="ml-1 inline size-3.5" aria-hidden="true" />
                  </a>
                </>
              )}
            </p>
          )}

          {/* Immigration authority link */}
          {entryRequirements?.immigration_website && (
            <p className="mt-3 text-sm text-gray-500">
              Source:{' '}
              <a
                href={entryRequirements.immigration_website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Immigration authority <ExternalLink className="ml-1 inline size-3.5" aria-hidden="true" />
              </a>
            </p>
          )}
        </div>
      ) : !masterNationality ? (
        <p className="mt-6 text-sm text-gray-500">
          Select your nationality above to see visa requirements for {country.name}.
        </p>
      ) : null}

      {/* ---- P2: BEFORE YOU FLY (stat grid) ---- */}
      {entryRequirements && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Before You Fly</h3>

          {/* Stats With Shared Borders — #59 (simplified, no change arrows) */}
          <dl className="mt-3 grid grid-cols-2 overflow-hidden rounded-lg bg-white ring-1 ring-gray-200">
            <div className="px-4 py-4 sm:p-6 border-b border-r border-gray-200">
              <dt className="text-sm font-normal text-gray-900">Return Ticket</dt>
              <dd className="mt-1 text-lg font-semibold text-indigo-600">
                {boolStatus(entryRequirements.return_ticket_required)}
              </dd>
            </div>
            <div className="px-4 py-4 sm:p-6 border-b border-gray-200">
              <dt className="text-sm font-normal text-gray-900">Proof of Funds</dt>
              <dd className="mt-1 text-lg font-semibold text-indigo-600">
                {boolStatus(entryRequirements.proof_of_funds_required)}
              </dd>
            </div>
            <div className="px-4 py-4 sm:p-6 border-r border-gray-200">
              <dt className="text-sm font-normal text-gray-900">Customs Declaration</dt>
              <dd className="mt-1 text-lg font-semibold text-indigo-600">
                {boolStatus(entryRequirements.customs_declaration_required)}
              </dd>
            </div>
            <div className="px-4 py-4 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">Arrival Card</dt>
              <dd className="mt-1 text-lg font-semibold text-indigo-600">
                {boolStatus(entryRequirements.arrival_card_required)}
              </dd>
            </div>
          </dl>

          {/* Entry portal note */}
          {entryRequirements.entry_portal_name && (
            <div className="mt-4 text-sm text-gray-700">
              <p>
                <span className="font-medium">{entryRequirements.entry_portal_name}</span>
                {entryRequirements.entry_portal_description && (
                  <> — {entryRequirements.entry_portal_description}</>
                )}
              </p>
              {entryRequirements.entry_portal_url && (
                <a
                  href={entryRequirements.entry_portal_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Complete online <ExternalLink className="ml-1 inline size-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* ---- SECONDARY: CUSTOMS (accordions) ---- */}
      {entryRequirements && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Customs</h3>
          <p className="mt-1 text-sm text-gray-600">
            Customs regulations for entering {country.name}.
          </p>

          {/* Duty-Free Allowances Accordion */}
          {(entryRequirements.dutyfree_alcohol || entryRequirements.dutyfree_tobacco || entryRequirements.dutyfree_cash_limit || entryRequirements.dutyfree_perfume || entryRequirements.dutyfree_other) && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setDutyFreeOpen(!dutyFreeOpen)}
                className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                aria-expanded={dutyFreeOpen}
              >
                <span>Duty-Free Allowances</span>
                <ChevronDown
                  className={`size-5 text-gray-400 transition-transform duration-200 ${dutyFreeOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: dutyFreeOpen ? '1000px' : '0px' }}
              >
                <div className="mt-1">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-2 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                          Item
                        </th>
                        <th scope="col" className="px-2 py-2 text-left text-sm font-semibold text-gray-900">
                          Allowance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {entryRequirements.dutyfree_alcohol && (
                        <tr>
                          <td className="py-2 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-0">Alcohol</td>
                          <td className="px-2 py-2 text-sm text-gray-500">{entryRequirements.dutyfree_alcohol}</td>
                        </tr>
                      )}
                      {entryRequirements.dutyfree_tobacco && (
                        <tr>
                          <td className="py-2 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-0">Tobacco</td>
                          <td className="px-2 py-2 text-sm text-gray-500">{entryRequirements.dutyfree_tobacco}</td>
                        </tr>
                      )}
                      {entryRequirements.dutyfree_cash_limit && (
                        <tr>
                          <td className="py-2 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-0">Cash Limit</td>
                          <td className="px-2 py-2 text-sm text-gray-500">{entryRequirements.dutyfree_cash_limit}</td>
                        </tr>
                      )}
                      {entryRequirements.dutyfree_perfume && (
                        <tr>
                          <td className="py-2 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-0">Perfume</td>
                          <td className="px-2 py-2 text-sm text-gray-500">{entryRequirements.dutyfree_perfume}</td>
                        </tr>
                      )}
                      {entryRequirements.dutyfree_other && (
                        <tr>
                          <td className="py-2 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-0">Other</td>
                          <td className="px-2 py-2 text-sm text-gray-500">{entryRequirements.dutyfree_other}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {entryRequirements.dutyfree_penalties && (
                    <p className="mt-2 px-4 text-xs text-gray-500 sm:px-0">
                      <span className="font-medium">Penalties:</span> {entryRequirements.dutyfree_penalties}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Restricted & Prohibited Items Accordion */}
          {entryRequirements.restricted_items && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setRestrictedItemsOpen(!restrictedItemsOpen)}
                className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                aria-expanded={restrictedItemsOpen}
              >
                <span>Restricted & Prohibited Items</span>
                <ChevronDown
                  className={`size-5 text-gray-400 transition-transform duration-200 ${restrictedItemsOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: restrictedItemsOpen ? '2000px' : '0px' }}
              >
                <div className="mt-1 rounded-md bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-yellow-800">
                        Items restricted or prohibited for import
                      </h4>
                      <div className="mt-2 text-sm text-yellow-700">
                        {entryRequirements.restricted_items.includes('||') ? (
                          <ul role="list" className="list-disc space-y-2 pl-5">
                            {entryRequirements.restricted_items.split('||').map((chunk, i) => {
                              const colonIndex = chunk.indexOf(':')
                              if (colonIndex > -1) {
                                const label = chunk.slice(0, colonIndex).trim()
                                const desc = chunk.slice(colonIndex + 1).trim()
                                return (
                                  <li key={i}>
                                    <span className="font-medium">
                                      {label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}:
                                    </span>{' '}
                                    {desc}
                                  </li>
                                )
                              }
                              return <li key={i}>{chunk.trim()}</li>
                            })}
                          </ul>
                        ) : (
                          <p>{entryRequirements.restricted_items}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customs authority link */}
          {entryRequirements.customs_website && (
            <p className="mt-3 text-sm text-gray-500">
              Source:{' '}
              <a
                href={entryRequirements.customs_website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Customs authority <ExternalLink className="ml-1 inline size-3.5" aria-hidden="true" />
              </a>
            </p>
          )}
        </div>
      )}

      {/* ---- GOVERNMENT RESOURCES ---- */}
      {visaGovResources.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Government Resources</h3>
          <ul className="mt-3 space-y-2">
            {visaGovResources.map((resource) => (
              <li key={resource.id} className="text-sm">
                {resource.url ? (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {resource.name} <ExternalLink className="ml-1 inline size-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="font-medium text-gray-900">{resource.name}</span>
                )}
                {resource.description && (
                  <p className="text-gray-500">{resource.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>

    {/* ============================================================
        SECTION 2: MONEY
        ============================================================ */}
    <section id="money" className="mt-10">

      {/* Section Divider — #355 */}
      <div className="flex items-center">
        <div className="relative flex justify-start">
          <span className="pr-3 text-base font-semibold whitespace-nowrap text-gray-900">
            Money
          </span>
        </div>
        <div aria-hidden="true" className="w-full border-t border-gray-300" />
      </div>

      {/* ---- CURRENCY — stat grid (#59 simplified) ---- */}
      {currency && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Currency Overview</h3>
          <dl className="mt-3 grid grid-cols-3 overflow-hidden rounded-lg bg-white ring-1 ring-gray-200">
            <div className="px-4 py-4 sm:p-6 border-r border-gray-200">
              <dt className="text-sm font-normal text-gray-900">Currency</dt>
              <dd className="mt-1 text-lg font-semibold text-indigo-600">{currency.currency_name}</dd>
            </div>
            <div className="px-4 py-4 sm:p-6 border-r border-gray-200">
              <dt className="text-sm font-normal text-gray-900">Symbol</dt>
              <dd className="mt-1 text-lg font-semibold text-indigo-600">{currency.currency_symbol ?? '—'}</dd>
            </div>
            <div className="px-4 py-4 sm:p-6">
              <dt className="text-sm font-normal text-gray-900">Code</dt>
              <dd className="mt-1 text-lg font-semibold text-indigo-600">{currency.currency_code}</dd>
            </div>
          </dl>

          {(currency.banknotes || currency.coins) && (
            <div className="mt-4 space-y-3">
              {currency.banknotes && (
                <div>
                  <p className="text-sm font-medium text-gray-900">Banknotes</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {currency.banknotes.split('·').map((note, i) => (
                      <span
                        key={i}
                        className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700"
                      >
                        {note.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {currency.coins && (
                <div>
                  <p className="text-sm font-medium text-gray-900">Coins</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {currency.coins.split('·').map((coin, i) => (
                      <span
                        key={i}
                        className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700"
                      >
                        {coin.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ---- CURRENCY CONVERTER ---- */}
      {currency && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Currency Converter</h3>
          {/* Summary text */}
          <div className="mt-3 mb-4">
            {selectedCurrency && localAmount && foreignAmount ? (
              <>
                <p className="text-sm text-gray-500">
                  {localAmount} {currency.currency_name} equals
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {foreignAmount} {getCurrencyName(selectedCurrency)}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">Convert {currency.currency_name} to another currency</p>
            )}
          </div>

          {rateLoading ? (
            <p className="text-sm text-gray-500">Loading exchange rates...</p>
          ) : rateError ? (
            <p className="text-sm text-gray-500">{rateError}</p>
          ) : exchangeRates ? (
            <>
              {/* Row 1: Local currency — unified input */}
              <div className="flex items-center rounded-lg border border-gray-300 bg-white focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                <div className="w-1/2">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="1"
                    value={localAmount}
                    onChange={(e) => handleLocalAmountChange(e.target.value)}
                    className="block w-full border-0 bg-transparent py-3 px-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm/6"
                  />
                </div>
                <div className="flex w-1/2 items-center border-l border-gray-300 py-3 px-4 text-sm text-gray-700">
                  <span className="truncate">{currency.currency_name}</span>
                </div>
              </div>

              {/* Row 2: Foreign currency — unified input with Combobox */}
              <div className="mt-3 flex items-center rounded-lg border border-gray-300 bg-white focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
                <div className="w-1/2">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={foreignAmount}
                    onChange={(e) => handleForeignAmountChange(e.target.value)}
                    className="block w-full border-0 bg-transparent py-3 px-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm/6"
                  />
                </div>
                <div className="w-1/2 border-l border-gray-300">
                  <Combobox
                    value={selectedCurrency}
                    onChange={(val: string | null) => {
                      if (val) handleCurrencyChange(val)
                    }}
                  >
                    <div className="relative">
                      <ComboboxInput
                        className="block w-full border-0 bg-transparent py-3 pr-8 pl-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                        onChange={(event) => setCurrencyQuery(event.target.value)}
                        onBlur={() => setCurrencyQuery('')}
                        displayValue={(code: string) =>
                          code ? getCurrencyName(code) : ''
                        }
                        placeholder="Select currency"
                      />
                      <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2 focus:outline-hidden">
                        <ChevronsUpDown className="size-4 text-gray-400" aria-hidden="true" />
                      </ComboboxButton>
                      {filteredCurrencies.length > 0 && (
                        <ComboboxOptions
                          transition
                          className="absolute right-0 z-10 mt-1 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                        >
                          {filteredCurrencies.map((c) => (
                            <ComboboxOption
                              key={c.code}
                              value={c.code}
                              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                            >
                              <span className="block truncate font-normal group-data-selected:font-semibold">
                                {c.symbol} {c.name} ({c.code})
                              </span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                <Check aria-hidden="true" className="size-5" />
                              </span>
                            </ComboboxOption>
                          ))}
                        </ComboboxOptions>
                      )}
                    </div>
                  </Combobox>
                </div>
              </div>

              {/* Attribution */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-gray-400">
                  Last updated: {rateLastUpdated ? new Date(rateLastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                </span>
                <a
                  href="https://www.exchangerate-api.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-500"
                >
                  Rates from ExchangeRate-API
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">Currency data not available.</p>
          )}
        </div>
      )}

      {/* ---- PAYING — description list (#51 striped, no card) ---- */}
      {paymentMethods && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Paying</h3>
          <div className="mt-3 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {paymentMethods.cash_vs_card && (
                <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium text-gray-900">Cash vs. Card</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{paymentMethods.cash_vs_card}</dd>
                </div>
              )}
              {paymentMethods.mobile_payment_apps && (
                <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium text-gray-900">Mobile Payments</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{paymentMethods.mobile_payment_apps}</dd>
                </div>
              )}
              {paymentMethods.atm_availability && (
                <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium text-gray-900">ATMs</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{paymentMethods.atm_availability}</dd>
                </div>
              )}
              {paymentMethods.foreign_card_fees && (
                <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium text-gray-900">Foreign Card Fees</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{paymentMethods.foreign_card_fees}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      )}

      {/* ---- LOCAL SPENDING subhead ---- */}
      {(tippingCustoms.length > 0 || averageCosts.length > 0) && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Local Spending</h3>
          <p className="mt-1 text-sm text-gray-600">
            Tipping customs and typical costs in {country.name}.
          </p>

          {/* Tipping Accordion */}
          {tippingCustoms.length > 0 && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setTippingOpen(!tippingOpen)}
                className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                aria-expanded={tippingOpen}
              >
                <span>Tipping</span>
                <ChevronDown
                  className={`size-5 text-gray-400 transition-transform duration-200 ${tippingOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: tippingOpen ? '2000px' : '0px' }}
              >
                <div className="mt-1">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                          Context
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Expected
                        </th>
                        <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                          Amount
                        </th>
                        <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                          Note
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {tippingCustoms.map((tip) => (
                        <tr key={tip.id}>
                          <td className="py-3 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-0">{tip.context}</td>
                          <td className="px-3 py-3 text-sm text-gray-500">{tip.expected}</td>
                          <td className="hidden px-3 py-3 text-sm text-gray-500 sm:table-cell">{tip.typical_amount ?? '—'}</td>
                          <td className="hidden px-3 py-3 text-sm text-gray-500 lg:table-cell">{tip.note ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Typical Costs Accordion */}
          {averageCosts.length > 0 && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setTypicalCostsOpen(!typicalCostsOpen)}
                className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                aria-expanded={typicalCostsOpen}
              >
                <span>Typical Costs</span>
                <ChevronDown
                  className={`size-5 text-gray-400 transition-transform duration-200 ${typicalCostsOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: typicalCostsOpen ? '2000px' : '0px' }}
              >
                <div className="-mx-4 mt-1 sm:-mx-0">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                          Item
                        </th>
                        <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                          Local Price
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          USD
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {averageCosts.map((cost) => (
                        <tr key={cost.id}>
                          <td className="w-full max-w-0 py-3 pr-3 pl-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                            {cost.item}
                            <dl className="font-normal sm:hidden">
                              <dt className="sr-only">Local Price</dt>
                              <dd className="mt-1 truncate text-gray-500">{cost.cost_local}</dd>
                            </dl>
                          </td>
                          <td className="hidden px-3 py-3 text-sm text-gray-500 sm:table-cell">{cost.cost_local}</td>
                          <td className="px-3 py-3 text-sm text-gray-500">{cost.cost_usd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---- TAX REFUND — description list (#50) ---- */}
      {taxRefund && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Tax Refund</h3>
          <div className="mt-3 overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {taxRefund.tax_rate && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Tax Rate</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.tax_rate}</dd>
                  </div>
                )}
                {taxRefund.eligible_purchases && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Eligible Purchases</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.eligible_purchases}</dd>
                  </div>
                )}
                {taxRefund.minimum_purchase && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Minimum Purchase</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.minimum_purchase}</dd>
                  </div>
                )}
                {taxRefund.how_to_claim && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">How to Claim</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.how_to_claim}</dd>
                  </div>
                )}
                {taxRefund.where_to_claim && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Where to Claim</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.where_to_claim}</dd>
                  </div>
                )}
                {taxRefund.refund_method && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Refund Method</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.refund_method}</dd>
                  </div>
                )}
                {taxRefund.time_limit && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Time Limit</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.time_limit}</dd>
                  </div>
                )}
                {taxRefund.refund_portal_url && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Official Portal</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                      <a
                        href={taxRefund.refund_portal_url}
                        className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {(() => { try { return new URL(taxRefund.refund_portal_url).hostname.replace('www.', '') } catch { return taxRefund.refund_portal_url } })()}
                        <ExternalLink className="size-3.5" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      )}

    </section>

    {/* ============================================================
        SECTION 3: COMMUNICATIONS
        ============================================================ */}
    <section id="communications" className="mt-10">

      {/* Section Divider — #355 */}
      <div className="flex items-center">
        <div className="relative flex justify-start">
          <span className="pr-3 text-base font-semibold whitespace-nowrap text-gray-900">
            Communications
          </span>
        </div>
        <div aria-hidden="true" className="w-full border-t border-gray-300" />
      </div>

      {/* ---- PHONE — hero stat + description list ---- */}
      {phoneInfo && (
        <div className="mt-6">

          {/* Hero dialing code — #57 Simple Stats In Cards (single card) */}
          {phoneInfo.dialing_code && (
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Country Dialing Code</dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{phoneInfo.dialing_code}</dd>
            </div>
          )}

          {/* Phone details — description list (#50 pattern, no card wrapper) */}
          {(phoneInfo.phone_number_format || phoneInfo.phone_number_length || phoneInfo.how_to_dial_local || phoneInfo.how_to_dial_international) && (
            <div className="mt-4 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {phoneInfo.phone_number_format && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Number Format</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{phoneInfo.phone_number_format}</dd>
                  </div>
                )}
                {phoneInfo.phone_number_length && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Number Length</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{phoneInfo.phone_number_length}</dd>
                  </div>
                )}
                {phoneInfo.how_to_dial_local && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Dial Locally</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{phoneInfo.how_to_dial_local}</dd>
                  </div>
                )}
                {phoneInfo.how_to_dial_international && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Dial Internationally</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{phoneInfo.how_to_dial_international}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>
      )}

      {/* ---- MOBILE DATA — striped description list (#51) ---- */}
      {mobileData && (mobileData.major_carriers || mobileData.esim_available || mobileData.sim_purchase_locations) && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Mobile Data</h3>
          <p className="mt-1 text-sm text-gray-600">
            Staying connected in {country.name}.
          </p>
          <div className="mt-3 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {mobileData.major_carriers && (
                <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium text-gray-900">Major Carriers</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.major_carriers}</dd>
                </div>
              )}
              {mobileData.esim_available && (
                <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium text-gray-900">eSIM Available</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.esim_available}</dd>
                </div>
              )}
              {mobileData.esim_providers && (
                <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium text-gray-900">eSIM Providers</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.esim_providers}</dd>
                </div>
              )}
              {mobileData.sim_purchase_locations && (
                <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium text-gray-900">SIM Purchase</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.sim_purchase_locations}</dd>
                </div>
              )}
              {mobileData.sim_requirements && (
                <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium text-gray-900">SIM Requirements</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.sim_requirements}</dd>
                </div>
              )}
              {mobileData.network_standards && (
                <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium text-gray-900">Network Standards</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.network_standards}</dd>
                </div>
              )}
              {mobileData.prepaid_plan_costs && (
                <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium text-gray-900">Prepaid Plans</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.prepaid_plan_costs}</dd>
                </div>
              )}
              {mobileData.wifi_rental && (
                <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                  <dt className="text-sm font-medium text-gray-900">Pocket WiFi</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.wifi_rental}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      )}

      {/* ---- APPS & ACCESS — description list (#50 pattern) ---- */}
      {appsAccess && (appsAccess.messaging_apps || appsAccess.vpn_needed || appsAccess.blocked_services) && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Apps & Access</h3>
          <div className="mt-3 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {appsAccess.messaging_apps && (
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium text-gray-900">Messaging Apps</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{appsAccess.messaging_apps}</dd>
                </div>
              )}
              {appsAccess.vpn_needed && (
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium text-gray-900">VPN Needed</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{appsAccess.vpn_needed}</dd>
                </div>
              )}
              {appsAccess.blocked_services && (
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium text-gray-900">Blocked Services</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{appsAccess.blocked_services}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      )}

    </section>

    {/* ============================================================
        SECTION 4: TIME
        ============================================================ */}
    <section id="time" className="mt-10">

      {/* Section Divider — #355 */}
      <div className="flex items-center">
        <div className="relative flex justify-start">
          <span className="pr-3 text-base font-semibold whitespace-nowrap text-gray-900">
            Time
          </span>
        </div>
        <div aria-hidden="true" className="w-full border-t border-gray-300" />
      </div>

      {countryTimezones.length > 0 ? (
        <div className="relative mt-6">
          <div
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            ref={(el) => {
              if (!el) return
              const handleScroll = () => {
                const scrollLeft = el.scrollLeft
                const cardWidth = 288 + 16
                const index = Math.round(scrollLeft / cardWidth)
                setActiveTimezoneIndex(index)
              }
              el.onscroll = handleScroll
            }}
          >
            <style>{`.timezone-carousel::-webkit-scrollbar { display: none; }`}</style>
            {countryTimezones.map((tz) => {
              const { time24, time12, dateStr } = formatTimeForZone(currentTime, tz.timezone_id)
              const utcOffset = getUtcOffset(currentTime, tz.timezone_id)
              return (
                <div
                  key={tz.id}
                  className="w-72 shrink-0 snap-start divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                >
                  {/* Card header */}
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">{tz.city}</h4>
                        <p className="text-sm text-gray-500">
                          {tz.timezone_name}
                          {tz.timezone_abbreviation && ` (${tz.timezone_abbreviation})`}
                        </p>
                      </div>
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="px-4 py-4 sm:px-6 sm:py-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold tracking-tight text-gray-900 tabular-nums">
                        {time24}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 tabular-nums">
                        {time12} · {dateStr}
                      </p>
                    </div>
                    <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                      <div>
                        <dt className="text-xs font-medium text-gray-500">UTC Offset</dt>
                        <dd className="mt-1 text-sm font-semibold text-gray-900">UTC {utcOffset}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-gray-500">DST Observed</dt>
                        <dd className="mt-1 text-sm font-semibold text-gray-900">{tz.dst_observed ? 'Yes' : 'No'}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Dot indicators — only if 2+ timezones */}
          {countryTimezones.length > 1 && (
            <div className="mt-3 flex justify-center gap-1.5">
              {countryTimezones.map((_, i) => (
                <span
                  key={i}
                  className={`block h-1.5 rounded-full transition-all duration-200 ${
                    i === activeTimezoneIndex ? 'w-4 bg-gray-800' : 'w-1.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">Timezone data not available.</p>
      )}

    </section>

    {/* ============================================================
        SECTION 5: TRANSPORTATION
        ============================================================ */}
    <section id="transport" className="mt-10">

      {/* Section Divider — #355 */}
      <div className="flex items-center">
        <div className="relative flex justify-start">
          <span className="pr-3 text-base font-semibold whitespace-nowrap text-gray-900">
            Transportation
          </span>
        </div>
        <div aria-hidden="true" className="w-full border-t border-gray-300" />
      </div>

      {/* ---- AIRPORTS — city selector + card grid ---- */}
      <div className="mt-6">
        {airports.length > 0 ? (
          <>
            <p className="text-sm text-gray-500">
              International airports in {country.name}.
            </p>

            {/* City selector — only if 2+ cities */}
            {airportCities.length > 1 && (
              <div className="mt-3 max-w-xs">
                <Combobox
                  value={activeAirportCity}
                  onChange={(val: string | null) => {
                    if (val) setSelectedAirportCity(val)
                  }}
                >
                  <div className="relative">
                    <ComboboxInput
                      className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(event) => setAirportCityQuery(event.target.value)}
                      onBlur={() => setAirportCityQuery('')}
                      displayValue={(city: string) => city || ''}
                      placeholder="Select a city"
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
                      <ChevronsUpDown className="size-5 text-gray-400" aria-hidden="true" />
                    </ComboboxButton>
                    {filteredAirportCities.length > 0 && (
                      <ComboboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                      >
                        {filteredAirportCities.map((city) => (
                          <ComboboxOption
                            key={city}
                            value={city}
                            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                          >
                            <span className="block truncate font-normal group-data-selected:font-semibold">
                              {city}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                              <Check aria-hidden="true" className="size-5" />
                            </span>
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    )}
                  </div>
                </Combobox>
              </div>
            )}

            {/* Airport cards — #328 pattern */}
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              {filteredAirports.map((airport) => (
                <div key={airport.id} className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
                  {/* Card header */}
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">{airport.airport_name}</h4>
                        {airport.website && (
                          <a
                            href={airport.website}
                            className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {(() => { try { return new URL(airport.website).hostname.replace('www.', '') } catch { return airport.website } })()}
                            <ExternalLink className="size-3.5" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                      <span className="text-lg font-semibold text-gray-400">{airport.iata_code}</span>
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="px-4 py-5 sm:p-6">
                    <p className="text-sm text-gray-500">{airport.distance_to_city}</p>
                    {airport.transport_options && (
                      <>
                        <h5 className="mt-4 text-sm font-medium text-gray-900">Getting to the city</h5>
                        <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
                          {airport.transport_options.split(' · ').map((option, i) => (
                            <li key={i}>• {option}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-2 text-sm text-gray-500">Airport data not available.</p>
        )}
      </div>

      {/* ---- GETTING AROUND subhead ---- */}
      {(taxisRidehailing || publicTransit) && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Getting Around</h3>

          {/* Taxis & Ride-Hailing — description list (#50 pattern) */}
          {taxisRidehailing && (taxisRidehailing.ride_hailing_apps || taxisRidehailing.taxi_info) && (
            <div className="mt-3 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {taxisRidehailing.ride_hailing_apps && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Ride-Hailing Apps</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{taxisRidehailing.ride_hailing_apps}</dd>
                  </div>
                )}
                {taxisRidehailing.taxi_info && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Taxis</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{taxisRidehailing.taxi_info}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Public Transit — striped description list (#51 pattern) */}
          {publicTransit && (publicTransit.transit_systems || publicTransit.transit_card_name || publicTransit.intercity_options) && (
            <div className="mt-4 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {publicTransit.transit_systems && (
                  <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium text-gray-900">Transit Systems</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{publicTransit.transit_systems}</dd>
                  </div>
                )}
                {publicTransit.transit_card_name && (
                  <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium text-gray-900">Transit Card</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{publicTransit.transit_card_name}</dd>
                  </div>
                )}
                {publicTransit.transit_card_where_to_buy && (
                  <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium text-gray-900">Where to Buy</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{publicTransit.transit_card_where_to_buy}</dd>
                  </div>
                )}
                {publicTransit.transit_contactless && (
                  <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium text-gray-900">Contactless Payment</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{publicTransit.transit_contactless}</dd>
                  </div>
                )}
                {publicTransit.intercity_options && (
                  <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                    <dt className="text-sm font-medium text-gray-900">Intercity Options</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{publicTransit.intercity_options}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>
      )}

      {/* ---- DRIVING — stat cards (#57) ---- */}
      {driving && (driving.driving_side || driving.idp_required || driving.road_conditions) && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Driving</h3>
          <dl className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {driving.driving_side && (
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Drives On</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{driving.driving_side}</dd>
              </div>
            )}
            {driving.idp_required && (
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="text-sm font-medium text-gray-500">International Driving Permit</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{driving.idp_required}</dd>
              </div>
            )}
            {driving.road_conditions && (() => {
              const firstDot = driving.road_conditions.indexOf('. ')
              const headline = firstDot !== -1 ? driving.road_conditions.substring(0, firstDot) : driving.road_conditions
              const description = firstDot !== -1 ? driving.road_conditions.substring(firstDot + 2) : null
              return (
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                  <dt className="text-sm font-medium text-gray-500">Road Conditions</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{headline}</dd>
                  {description && (
                    <p className="mt-2 text-sm text-gray-500">{description}</p>
                  )}
                </div>
              )
            })()}
          </dl>
        </div>
      )}

    </section>

    {/* ============================================================
        SECTION 6: ELECTRICAL
        ============================================================ */}
    {countryElectrical && (
    <section id="electrical" className="mt-10">

      {/* Section Divider — #355 */}
      <div className="flex items-center">
        <div className="relative flex justify-start">
          <span className="pr-3 text-base font-semibold whitespace-nowrap text-gray-900">
            Electrical
          </span>
        </div>
        <div aria-hidden="true" className="w-full border-t border-gray-300" />
      </div>

      {/* ---- PLUG TYPES — SVG grid (#107 pattern) ---- */}
      <ul role="list" className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
        {countryElectrical.plug_types.split(',').map((typeCode) => {
          const trimmed = typeCode.trim()
          const plugType = plugTypes.find((p) => p.type_letter.trim() === trimmed)
          if (!plugType) return null
          return (
            <li key={trimmed} className="relative">
              <div className="overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center p-3" style={{ aspectRatio: '1' }}>
                <img
                  alt={`Type ${plugType.type_letter.trim()} plug diagram`}
                  src={`/plugs/${plugType.svg_filename}`}
                  className="w-full h-full"
                />
              </div>
              <p className="mt-2 block truncate text-sm font-medium text-gray-900">
                Type {plugType.type_letter.trim()}
              </p>
              <p className="block text-sm font-medium text-gray-500">{plugType.description}</p>
            </li>
          )
        })}
      </ul>

      {/* ---- POWER — stat cards (#57) ---- */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Power</h3>
        <dl className="mt-3 grid grid-cols-2 gap-5 sm:grid-cols-4">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Voltage</dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{countryElectrical.voltage}</dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Frequency</dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{countryElectrical.frequency}</dd>
          </div>
        </dl>
      </div>

      {/* ---- WHAT YOU NEED — personalized verdict ---- */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">What You Need</h3>
        {selectedHomeElectrical ? (
          <>
            <p className="mt-1 text-sm text-gray-600">
              Comparing {selectedHomeElectrical.name} → {country.name}.
            </p>
            {electricalComparison && (
              <div className="mt-3 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  {electricalComparison.adapter && (
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium text-gray-900">Adapter Needed</dt>
                      <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="font-semibold">{electricalComparison.adapter.heading}</span>
                        <span> — </span>
                        {electricalComparison.adapter.description}
                      </dd>
                    </div>
                  )}
                  {electricalComparison.voltage && (
                    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium text-gray-900">Voltage Converter</dt>
                      <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                        <span className="font-semibold">{electricalComparison.voltage.heading}</span>
                        <span> — </span>
                        {electricalComparison.voltage.description}
                      </dd>
                    </div>
                  )}
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Tip</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                      Contact your hotel or accommodation in advance to ask about available adapters, voltage converters, and outlet types in your room. Many hotels provide adapters upon request or have universal outlets installed.
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </>
        ) : (
          <p className="mt-1 text-sm text-gray-500">
            Select your home country in the master selector above to see if you need an adapter or voltage converter.
          </p>
        )}
      </div>

    </section>
    )}

    </div>
  )
}
