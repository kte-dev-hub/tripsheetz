'use client'

import { useState, useEffect } from 'react'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import {
  ChevronsUpDown, Check, ChevronDown, ExternalLink, Clock, Plane,
  Sun, Cloud, CloudRain, CloudDrizzle, CloudLightning, CloudSun, CloudFog, Snowflake, Wind,
  Phone, MapPin, Globe, Stamp, Wallet, Smartphone, Zap, Ruler, ShieldAlert
} from 'lucide-react'

interface Country {
  id: number
  name: string
  official_name: string
  native_name: string
  iso_alpha2: string
  slug: string
  capital_city: string | null
  capital_lat: number | null
  capital_lon: number | null
  population: string | null
  government_type: string | null
  languages_official: string | null
  languages_common: string | null
  measurement_system: string | null
  dialing_code: string | null
  driving_side: string | null
  currency_code: string | null
  emergency_police: string | null
  emergency_ambulance: string | null
  emergency_fire: string | null
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
  immigration_authority_name: string | null
  customs_website: string | null
  customs_authority_name: string | null
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

interface CityResult {
  name: string
  state?: string
  country: string
  lat: number
  lon: number
}

interface CurrentWeather {
  temp: number
  feels_like: number
  humidity: number
  wind_speed: number
  description: string
  icon: string
  precipitation: number
  uvindex: number
  cloudcover: number
  visibility: number
  sunrise: string
  sunset: string
}

interface DayForecast {
  date: string
  high: number
  low: number
  description: string
  icon: string
  precipChance: number
  humidity: number
  uvindex: number
}

interface ClimateAverage {
  month: string
  high: number
  low: number
  precip: number
  humidity: number
}

interface Religion {
  id: number
  country_code: string
  religion_name: string
  percentage: number
  display_order: number
}

interface Embassy {
  id: number
  country_code: string
  nationality_code: string
  type: string
  official_name: string | null
  city: string | null
  address: string | null
  local_address: string | null
  google_maps_url: string | null
  phone: string | null
  emergency_phone: string | null
  email: string | null
  website: string | null
  verified: boolean | null
  last_verified: string | null
}

interface EmergencyNumbers {
  id: number
  country_code: string
  tourist_police: string | null
  coast_guard: string | null
  roadside_assistance: string | null
  roadside_assistance_name: string | null
  other_emergency_name_1: string | null
  other_emergency_number_1: string | null
  other_emergency_name_2: string | null
  other_emergency_number_2: string | null
  other_emergency_name_3: string | null
  other_emergency_number_3: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface TravelAdvisory {
  id: number
  country_code: string
  advisory_us: string | null
  advisory_us_url: string | null
  advisory_uk: string | null
  advisory_uk_url: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
}

interface HealthSafety {
  id: number
  country_code: string
  required_vaccinations: string | null
  health_insurance_required: string | null
  tap_water_safe: string | null
  last_verified: string | null
  verified: boolean | null
  source_urls: string | null
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
  religions: Religion[]
  embassies: Embassy[]
  emergencyNumbers: EmergencyNumbers | null
  travelAdvisory: TravelAdvisory | null
  healthSafety: HealthSafety | null
}

function getWeatherIcon(iconName: string, size: string = 'size-8') {
  const className = `${size} text-gray-700`
  switch (iconName) {
    case 'clear-day':
    case 'clear-night':
      return <Sun className={className} />
    case 'partly-cloudy-day':
    case 'partly-cloudy-night':
      return <CloudSun className={className} />
    case 'cloudy':
      return <Cloud className={className} />
    case 'rain':
      return <CloudRain className={className} />
    case 'showers-day':
    case 'showers-night':
      return <CloudDrizzle className={className} />
    case 'thunder-rain':
    case 'thunder-showers-day':
    case 'thunder-showers-night':
      return <CloudLightning className={className} />
    case 'snow':
    case 'snow-showers-day':
    case 'snow-showers-night':
      return <Snowflake className={className} />
    case 'fog':
      return <CloudFog className={className} />
    case 'wind':
      return <Wind className={className} />
    default:
      return <Sun className={className} />
  }
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
  religions,
  embassies,
  emergencyNumbers,
  travelAdvisory,
  healthSafety,
}: CountryPageProps) {
  const masterTravelingFrom = 'US'
  const masterNationality = 'US'
  const [dutyFreeOpen, setDutyFreeOpen] = useState(false)
  const [restrictedItemsOpen, setRestrictedItemsOpen] = useState(false)

  // Money section state
  const [tippingOpen, setTippingOpen] = useState(false)
  const [typicalCostsOpen, setTypicalCostsOpen] = useState(false)

  // Tax Refund accordion state
  const [taxRateOpen, setTaxRateOpen] = useState(true)
  const [taxEligibleOpen, setTaxEligibleOpen] = useState(false)
  const [taxMinimumOpen, setTaxMinimumOpen] = useState(false)
  const [taxHowToClaimOpen, setTaxHowToClaimOpen] = useState(false)
  const [taxWhereToClaimOpen, setTaxWhereToClaimOpen] = useState(false)
  const [taxRefundMethodOpen, setTaxRefundMethodOpen] = useState(false)
  const [taxTimeLimitOpen, setTaxTimeLimitOpen] = useState(false)
  const [taxPortalOpen, setTaxPortalOpen] = useState(false)
  const [embassyOpen, setEmbassyOpen] = useState(true)
  const [consulatesOpen, setConsulatesOpen] = useState(false)
  const [otherEmergencyOpen, setOtherEmergencyOpen] = useState(false)

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
  const [activeAirportIndex, setActiveAirportIndex] = useState(0)

  // Airport city selector
  const [selectedAirportCity, setSelectedAirportCity] = useState<string | null>(null)
  const [airportCityQuery, setAirportCityQuery] = useState('')

  // Weather
  const [weatherCity, setWeatherCity] = useState<CityResult>({
    name: country.capital_city ?? country.name,
    country: country.iso_alpha2,
    lat: country.capital_lat ?? 0,
    lon: country.capital_lon ?? 0,
  })
  const [cityQuery, setCityQuery] = useState('')
  const [cityResults, setCityResults] = useState<CityResult[]>([])
  const [cityLoading, setCityLoading] = useState(false)
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<DayForecast[]>([])
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState('')
  const [climateAverages, setClimateAverages] = useState<ClimateAverage[]>([])
  const [climateLoading, setClimateLoading] = useState(false)
  const [forecastOpen, setForecastOpen] = useState(false)
  const [climateOpen, setClimateOpen] = useState(false)

  // Unit converter
  const [tempC, setTempC] = useState('')
  const [tempF, setTempF] = useState('')
  const [distKm, setDistKm] = useState('')
  const [distMi, setDistMi] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [weightLbs, setWeightLbs] = useState('')
  const [volL, setVolL] = useState('')
  const [volGal, setVolGal] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [speedKmh, setSpeedKmh] = useState('')
  const [speedMph, setSpeedMph] = useState('')
  const [areaSqm, setAreaSqm] = useState('')
  const [areaSqft, setAreaSqft] = useState('')
  const [activeConverter, setActiveConverter] = useState('temperature')
  const converterOptions = [
    { id: 'temperature', name: 'Temperature' },
    { id: 'distance', name: 'Distance' },
    { id: 'weight', name: 'Weight' },
    { id: 'volume', name: 'Volume' },
    { id: 'height', name: 'Height' },
    { id: 'speed', name: 'Speed' },
    { id: 'area', name: 'Area' },
  ]
  const activeConverterOption = converterOptions.find(c => c.id === activeConverter) || converterOptions[0]

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

  // Embassy — filter by master nationality
  const selectedEmbassies = masterNationality
    ? embassies.filter((e) => e.nationality_code.trim() === masterNationality)
    : []
  const mainEmbassy = selectedEmbassies.find((e) => e.type === 'embassy') ?? null
  const selectedConsulates = selectedEmbassies.filter((e) => e.type === 'consulate')

  // Nationality name for display
  const nationalityName = masterNationality
    ? (allCountries.find((c) => c.iso_alpha2.trim() === masterNationality)?.name ?? masterNationality)
    : null

  // Unit converter handlers
  const onTempCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const c = e.target.value
    setTempC(c)
    const n = parseFloat(c)
    setTempF(isNaN(n) ? '' : String(Math.round((n * 9 / 5 + 32) * 10) / 10))
  }
  const onTempFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.value
    setTempF(f)
    const n = parseFloat(f)
    setTempC(isNaN(n) ? '' : String(Math.round((n - 32) * 5 / 9 * 10) / 10))
  }
  const onDistKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const km = e.target.value
    setDistKm(km)
    const n = parseFloat(km)
    setDistMi(isNaN(n) ? '' : String(Math.round(n * 0.621371 * 100) / 100))
  }
  const onDistMiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mi = e.target.value
    setDistMi(mi)
    const n = parseFloat(mi)
    setDistKm(isNaN(n) ? '' : String(Math.round(n / 0.621371 * 100) / 100))
  }
  const onWeightKgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const kg = e.target.value
    setWeightKg(kg)
    const n = parseFloat(kg)
    setWeightLbs(isNaN(n) ? '' : String(Math.round(n * 2.20462 * 10) / 10))
  }
  const onWeightLbsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lbs = e.target.value
    setWeightLbs(lbs)
    const n = parseFloat(lbs)
    setWeightKg(isNaN(n) ? '' : String(Math.round(n / 2.20462 * 10) / 10))
  }
  const onVolLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const l = e.target.value
    setVolL(l)
    const n = parseFloat(l)
    setVolGal(isNaN(n) ? '' : String(Math.round(n * 0.264172 * 100) / 100))
  }
  const onVolGalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const gal = e.target.value
    setVolGal(gal)
    const n = parseFloat(gal)
    setVolL(isNaN(n) ? '' : String(Math.round(n / 0.264172 * 100) / 100))
  }
  const onHeightCmToInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cm = e.target.value
    setHeightCm(cm)
    const n = parseFloat(cm)
    setHeightIn(isNaN(n) ? '' : String(Math.round(n / 2.54 * 10) / 10))
  }
  const onHeightInToCmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inVal = e.target.value
    setHeightIn(inVal)
    const n = parseFloat(inVal)
    setHeightCm(isNaN(n) ? '' : String(Math.round(n * 2.54 * 10) / 10))
  }
  const onSpeedKmhChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setSpeedKmh(val)
    const n = parseFloat(val)
    setSpeedMph(isNaN(n) ? '' : String(Math.round(n * 0.621371 * 10) / 10))
  }
  const onSpeedMphChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setSpeedMph(val)
    const n = parseFloat(val)
    setSpeedKmh(isNaN(n) ? '' : String(Math.round(n * 1.60934 * 10) / 10))
  }
  const onAreaSqmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setAreaSqm(val)
    const n = parseFloat(val)
    setAreaSqft(isNaN(n) ? '' : String(Math.round(n * 10.7639 * 10) / 10))
  }
  const onAreaSqftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setAreaSqft(val)
    const n = parseFloat(val)
    setAreaSqm(isNaN(n) ? '' : String(Math.round(n * 0.092903 * 10) / 10))
  }

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

  // City search — Geoapify autocomplete
  useEffect(() => {
    if (cityQuery.length < 2) {
      setCityResults([])
      return
    }
    const debounceTimer = setTimeout(() => {
      setCityLoading(true)
      const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY
      if (!apiKey) {
        setCityLoading(false)
        return
      }
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(cityQuery)}&type=city&filter=countrycode:${country.iso_alpha2.toLowerCase()}&limit=5&format=json&apiKey=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.results && Array.isArray(data.results)) {
            setCityResults(
              data.results.map((item: any) => ({
                name: item.city || item.name || item.formatted,
                state: item.state,
                country: item.country_code?.toUpperCase() || country.iso_alpha2,
                lat: item.lat,
                lon: item.lon,
              }))
            )
          }
          setCityLoading(false)
        })
        .catch(() => {
          setCityLoading(false)
        })
    }, 300)
    return () => clearTimeout(debounceTimer)
  }, [cityQuery, country.iso_alpha2])

  // Fetch weather + forecast on mount and when city changes
  useEffect(() => {
    if (!weatherCity.lat || !weatherCity.lon) return
    const apiKey = process.env.NEXT_PUBLIC_VISUALCROSSING_API_KEY
    if (!apiKey) {
      setWeatherError('Weather API key not configured.')
      return
    }
    setWeatherLoading(true)
    setWeatherError('')
    setCurrentWeather(null)
    setForecast([])

    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherCity.lat},${weatherCity.lon}?unitGroup=metric&include=current,days&key=${apiKey}&contentType=json`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Weather API error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (data.currentConditions) {
          const cc = data.currentConditions
          setCurrentWeather({
            temp: Math.round(cc.temp),
            feels_like: Math.round(cc.feelslike),
            humidity: Math.round(cc.humidity),
            wind_speed: Math.round(cc.windspeed),
            description: cc.conditions || '',
            icon: cc.icon || 'clear-day',
            precipitation: cc.precip ?? 0,
            uvindex: cc.uvindex ?? 0,
            cloudcover: Math.round(cc.cloudcover ?? 0),
            visibility: Math.round(cc.visibility ?? 0),
            sunrise: cc.sunrise ? cc.sunrise.substring(0, 5) : '',
            sunset: cc.sunset ? cc.sunset.substring(0, 5) : '',
          })
        }

        if (data.days && Array.isArray(data.days)) {
          const days: DayForecast[] = data.days.slice(0, 15).map((day: any) => {
            const date = new Date(day.datetime + 'T12:00:00')
            return {
              date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
              high: Math.round(day.tempmax),
              low: Math.round(day.tempmin),
              description: day.conditions || '',
              icon: day.icon || 'clear-day',
              precipChance: Math.round(day.precipprob ?? 0),
              humidity: Math.round(day.humidity ?? 0),
              uvindex: Math.round(day.uvindex ?? 0),
            }
          })
          setForecast(days)
        }

        setWeatherLoading(false)
      })
      .catch((err) => {
        console.error('Weather fetch error:', err)
        setWeatherError('Unable to load weather data.')
        setWeatherLoading(false)
      })
  }, [weatherCity])

  // Fetch climate averages on mount and when city changes
  useEffect(() => {
    if (!weatherCity.lat || !weatherCity.lon) return
    const apiKey = process.env.NEXT_PUBLIC_VISUALCROSSING_API_KEY
    if (!apiKey) return

    setClimateLoading(true)
    setClimateAverages([])

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let cancelled = false

    async function fetchClimateData() {
      const averages: ClimateAverage[] = []
      for (let i = 0; i < 12; i++) {
        if (cancelled) return
        const month = String(i + 1).padStart(2, '0')
        try {
          const res = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${weatherCity.lat},${weatherCity.lon}/2027-${month}-15/2027-${month}-15?unitGroup=metric&include=days&key=${apiKey}&contentType=json&elements=tempmax,tempmin,precip,humidity`
          )
          if (!res.ok) {
            averages.push({ month: monthNames[i], high: 0, low: 0, precip: 0, humidity: 0 })
          } else {
            const data = await res.json()
            const day = data.days?.[0]
            averages.push({
              month: monthNames[i],
              high: day ? Math.round(day.tempmax) : 0,
              low: day ? Math.round(day.tempmin) : 0,
              precip: day ? Math.round(day.precip ?? 0) : 0,
              humidity: day ? Math.round(day.humidity ?? 0) : 0,
            })
          }
          if (i < 11) {
            await new Promise((resolve) => setTimeout(resolve, 200))
          }
        } catch {
          averages.push({ month: monthNames[i], high: 0, low: 0, precip: 0, humidity: 0 })
        }
      }
      if (!cancelled) {
        setClimateAverages(averages)
        setClimateLoading(false)
      }
    }

    fetchClimateData()
    return () => { cancelled = true }
  }, [weatherCity])

  return (
    <div>

      {/* Page Header + Master Selector — white band */}
      <div className="bg-white py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

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

        </div>
      </div>

    {/* ============================================================
        SECTION 1: OVERVIEW
        ============================================================ */}
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <section id="overview">

      <h2 className="flex items-center gap-2 text-lg font-semibold text-orange-600">
        <Globe className="size-5" aria-hidden="true" />
        Overview
      </h2>
      <p className="mt-1 text-sm text-gray-500">Key facts about {country.name}</p>

      {/* ---- IDENTITY — stat grid ---- */}
      <dl className="mt-6 grid grid-cols-2 divide-x divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500">Capital</dt>
          <dd className="mt-1 text-lg font-semibold text-gray-900">{country.capital_city ?? '—'}</dd>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500">Population</dt>
          <dd className="mt-1 text-lg font-semibold text-gray-900">{country.population ?? '—'}</dd>
        </div>
      </dl>

      <dl className="mt-3 grid grid-cols-1 overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500">Government</dt>
          <dd className="mt-1 text-lg font-semibold text-gray-900">{country.government_type ?? '—'}</dd>
        </div>
      </dl>

      {/* ---- LANGUAGE — description list (#50) ---- */}
      <div className="mt-12">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Language</h3>
        <div className="mt-3 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">Official Languages</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{country.languages_official ?? '—'}</dd>
            </div>
            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">Common Languages</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{country.languages_common ?? '—'}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* ---- RELIGION — horizontal bar chart ---- */}
      {religions.length > 0 && (
        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Religion</h3>
          <div className="mt-3 overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
            <div className="space-y-3">
              {religions.map((religion, index) => (
                <div key={religion.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${index === 0 ? 'font-semibold text-gray-900' : 'font-medium text-gray-500'}`}>
                      {religion.religion_name}
                    </span>
                    <span className={`font-semibold ${index === 0 ? 'text-lg text-gray-900' : 'text-gray-500'}`}>
                      {religion.percentage}%
                    </span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-indigo-600"
                      style={{ width: `${Math.min(religion.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
      </div>
    </div>

    {/* ============================================================
        SECTION 2: VISA & ENTRY
        ============================================================ */}
    <div className="bg-white py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <section id="visa">

      <h2 className="flex items-center gap-2 text-lg font-semibold text-orange-600">
        <Stamp className="size-5" aria-hidden="true" />
        Visa & Entry
      </h2>
      <p className="mt-1 text-sm text-gray-500">Entry requirements for U.S. passport holders visiting {country.name}</p>

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
                className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-500"
              >
                {entryRequirements.immigration_authority_name ?? 'Immigration authority'}
                <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
              </a>
            </p>
          )}
        </div>
      ) : null}

      {/* ---- P2: BEFORE YOU FLY (stat grid) ---- */}
      {entryRequirements && (
        <div className="mt-12">
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
                  className="mt-1 inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-500"
                >
                  Complete online
                  <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* ---- SECONDARY: CUSTOMS (accordions) ---- */}
      {entryRequirements && (
        <div className="mt-12">
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
                className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-500"
              >
                {entryRequirements.customs_authority_name ?? 'Customs authority'}
                <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
              </a>
            </p>
          )}
        </div>
      )}

      {/* ---- GOVERNMENT RESOURCES ---- */}
      {visaGovResources.length > 0 && (
        <div className="mt-12">
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
      </div>
    </div>

    {/* ============================================================
        SECTION 3: MONEY
        ============================================================ */}
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <section id="money">

      <h2 className="flex items-center gap-2 text-lg font-semibold text-orange-600">
        <Wallet className="size-5" aria-hidden="true" />
        Money
      </h2>
      <p className="mt-1 text-sm text-gray-500">Currency, payments, and costs in {country.name}</p>

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
        <div className="mt-12">
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
        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Paying</h3>
          <div className="mt-3 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {paymentMethods.cash_vs_card && (
                <div className="bg-gray-100 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
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
                <div className="bg-gray-100 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
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
        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Local Spending</h3>
          <p className="mt-1 text-sm text-gray-600">
            Tipping customs and typical costs in {country.name}.
          </p>

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
        </div>
      )}

      {/* ---- TAX REFUND — individually collapsible accordions ---- */}
      {taxRefund && (
        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Tax Refund</h3>

          {/* Tax Rate — open by default */}
          {taxRefund.tax_rate && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setTaxRateOpen(!taxRateOpen)}
                className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                aria-expanded={taxRateOpen}
              >
                <span>Tax Rate</span>
                <ChevronDown
                  className={`size-5 text-gray-400 transition-transform duration-200 ${taxRateOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: taxRateOpen ? '500px' : '0px' }}
              >
                <p className="px-4 py-3 text-sm text-gray-700 sm:px-0">{taxRefund.tax_rate}</p>
              </div>
            </div>
          )}

          {/* Eligible Purchases */}
          {taxRefund.eligible_purchases && (
            <div>
              <button
                type="button"
                onClick={() => setTaxEligibleOpen(!taxEligibleOpen)}
                className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                aria-expanded={taxEligibleOpen}
              >
                <span>Eligible Purchases</span>
                <ChevronDown
                  className={`size-5 text-gray-400 transition-transform duration-200 ${taxEligibleOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: taxEligibleOpen ? '500px' : '0px' }}
              >
                <p className="px-4 py-3 text-sm text-gray-700 sm:px-0">{taxRefund.eligible_purchases}</p>
              </div>
            </div>
          )}

          {/* Minimum Purchase */}
          {taxRefund.minimum_purchase && (
            <div>
              <button
                type="button"
                onClick={() => setTaxMinimumOpen(!taxMinimumOpen)}
                className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                aria-expanded={taxMinimumOpen}
              >
                <span>Minimum Purchase</span>
                <ChevronDown
                  className={`size-5 text-gray-400 transition-transform duration-200 ${taxMinimumOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: taxMinimumOpen ? '500px' : '0px' }}
              >
                <p className="px-4 py-3 text-sm text-gray-700 sm:px-0">{taxRefund.minimum_purchase}</p>
              </div>
            </div>
          )}

          {/* How to Claim */}
          {taxRefund.how_to_claim && (
            <div>
              <button
                type="button"
                onClick={() => setTaxHowToClaimOpen(!taxHowToClaimOpen)}
                className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                aria-expanded={taxHowToClaimOpen}
              >
                <span>How to Claim</span>
                <ChevronDown
                  className={`size-5 text-gray-400 transition-transform duration-200 ${taxHowToClaimOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: taxHowToClaimOpen ? '500px' : '0px' }}
              >
                <p className="px-4 py-3 text-sm text-gray-700 sm:px-0">{taxRefund.how_to_claim}</p>
              </div>
            </div>
          )}

          {/* Where to Claim */}
          {taxRefund.where_to_claim && (
            <div>
              <button
                type="button"
                onClick={() => setTaxWhereToClaimOpen(!taxWhereToClaimOpen)}
                className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                aria-expanded={taxWhereToClaimOpen}
              >
                <span>Where to Claim</span>
                <ChevronDown
                  className={`size-5 text-gray-400 transition-transform duration-200 ${taxWhereToClaimOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: taxWhereToClaimOpen ? '500px' : '0px' }}
              >
                <p className="px-4 py-3 text-sm text-gray-700 sm:px-0">{taxRefund.where_to_claim}</p>
              </div>
            </div>
          )}

          {/* Refund Method */}
          {taxRefund.refund_method && (
            <div>
              <button
                type="button"
                onClick={() => setTaxRefundMethodOpen(!taxRefundMethodOpen)}
                className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                aria-expanded={taxRefundMethodOpen}
              >
                <span>Refund Method</span>
                <ChevronDown
                  className={`size-5 text-gray-400 transition-transform duration-200 ${taxRefundMethodOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: taxRefundMethodOpen ? '500px' : '0px' }}
              >
                <p className="px-4 py-3 text-sm text-gray-700 sm:px-0">{taxRefund.refund_method}</p>
              </div>
            </div>
          )}

          {/* Time Limit */}
          {taxRefund.time_limit && (
            <div>
              <button
                type="button"
                onClick={() => setTaxTimeLimitOpen(!taxTimeLimitOpen)}
                className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                aria-expanded={taxTimeLimitOpen}
              >
                <span>Time Limit</span>
                <ChevronDown
                  className={`size-5 text-gray-400 transition-transform duration-200 ${taxTimeLimitOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: taxTimeLimitOpen ? '500px' : '0px' }}
              >
                <p className="px-4 py-3 text-sm text-gray-700 sm:px-0">{taxRefund.time_limit}</p>
              </div>
            </div>
          )}

          {/* Official Portal */}
          {taxRefund.refund_portal_url && (
            <div>
              <button
                type="button"
                onClick={() => setTaxPortalOpen(!taxPortalOpen)}
                className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                aria-expanded={taxPortalOpen}
              >
                <span>Official Portal</span>
                <ChevronDown
                  className={`size-5 text-gray-400 transition-transform duration-200 ${taxPortalOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: taxPortalOpen ? '500px' : '0px' }}
              >
                <div className="px-4 py-3 sm:px-0">
                  <a
                    href={taxRefund.refund_portal_url}
                    className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {(() => { try { return new URL(taxRefund.refund_portal_url).hostname.replace('www.', '') } catch { return taxRefund.refund_portal_url } })()}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </section>
      </div>
    </div>

    {/* ============================================================
        SECTION 4: COMMUNICATIONS
        ============================================================ */}
    <div className="bg-white py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <section id="communications">

      <h2 className="flex items-center gap-2 text-lg font-semibold text-orange-600">
        <Smartphone className="size-5" aria-hidden="true" />
        Communications
      </h2>
      <p className="mt-1 text-sm text-gray-500">Phone, SIM, and internet in {country.name}</p>

      {/* ---- PHONE — hero stat + description list ---- */}
      {phoneInfo && (
        <div className="mt-6">

          {/* Hero dialing code — #57 Simple Stats In Cards (single card) */}
          {phoneInfo.dialing_code && (
            <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow-sm sm:p-6">
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
        <div className="mt-12">
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
        <div className="mt-12">
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
      </div>
    </div>

    {/* ============================================================
        SECTION 5: TIME
        ============================================================ */}
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <section id="time">

      <h2 className="flex items-center gap-2 text-lg font-semibold text-orange-600">
        <Clock className="size-5" aria-hidden="true" />
        Time
      </h2>
      <p className="mt-1 text-sm text-gray-500">Local time in {country.name}</p>

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
      </div>
    </div>

    {/* ============================================================
        SECTION 6: TRANSPORTATION
        ============================================================ */}
    <div className="bg-white py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <section id="transport">

      <h2 className="flex items-center gap-2 text-lg font-semibold text-orange-600">
        <Plane className="size-5" aria-hidden="true" />
        Transportation
      </h2>
      <p className="mt-1 text-sm text-gray-500">Getting around {country.name}</p>

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
                    if (val) {
                      setSelectedAirportCity(val)
                      setActiveAirportIndex(0)
                    }
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

            {/* Airport cards */}
            {filteredAirports.length === 1 ? (
              /* Single airport — full width card */
              <div className="mt-5">
                {filteredAirports.map((airport) => (
                  <div key={airport.id} className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-50 shadow-sm">
                    {/* Card header */}
                    <div className="px-4 py-5 sm:px-6">
                      <p className="text-lg font-semibold text-gray-400">{airport.iata_code}</p>
                      <h4 className="mt-1 text-base font-semibold text-gray-900">{airport.airport_name}</h4>
                      {airport.website && (
                        <a
                          href={airport.website}
                          className="mt-1 inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-500"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {(() => { try { return new URL(airport.website).hostname.replace('www.', '') } catch { return airport.website } })()}
                          <ExternalLink className="size-3.5" aria-hidden="true" />
                        </a>
                      )}
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
            ) : filteredAirports.length > 1 ? (
              /* Multiple airports — carousel */
              <div className="relative mt-5">
                <div
                  className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                  ref={(el) => {
                    if (!el) return
                    const handleScroll = () => {
                      const scrollLeft = el.scrollLeft
                      const cardWidth = 288 + 16
                      const index = Math.round(scrollLeft / cardWidth)
                      setActiveAirportIndex(index)
                    }
                    el.onscroll = handleScroll
                  }}
                >
                  {filteredAirports.map((airport) => (
                    <div
                      key={airport.id}
                      className="w-72 shrink-0 snap-start divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm"
                    >
                      {/* Card header */}
                      <div className="px-4 py-5 sm:px-6">
                        <p className="text-lg font-semibold text-gray-400">{airport.iata_code}</p>
                        <h4 className="mt-1 text-sm font-semibold text-gray-900">{airport.airport_name}</h4>
                        {airport.website && (
                          <a
                            href={airport.website}
                            className="mt-1 inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-500"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {(() => { try { return new URL(airport.website).hostname.replace('www.', '') } catch { return airport.website } })()}
                            <ExternalLink className="size-3.5" aria-hidden="true" />
                          </a>
                        )}
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

                {/* Dot indicators */}
                <div className="mt-3 flex justify-center gap-1.5">
                  {filteredAirports.map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1.5 rounded-full transition-all duration-200 ${
                        i === activeAirportIndex ? 'w-4 bg-gray-800' : 'w-1.5 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <p className="mt-2 text-sm text-gray-500">Airport data not available.</p>
        )}
      </div>

      {/* ---- GETTING AROUND subhead ---- */}
      {(taxisRidehailing || publicTransit) && (
        <div className="mt-12">
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
        <div className="mt-12">
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
      </div>
    </div>

    {/* ============================================================
        SECTION 7: ELECTRICAL
        ============================================================ */}
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <section id="electrical">

      <h2 className="flex items-center gap-2 text-lg font-semibold text-orange-600">
        <Zap className="size-5" aria-hidden="true" />
        Electrical
      </h2>
      <p className="mt-1 text-sm text-gray-500">Plugs, voltage, and adapters in {country.name}</p>
      {countryElectrical && (
        <>

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
      <div className="mt-12">
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
      <div className="mt-12">
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

        </>
      )}
    </section>
      </div>
    </div>

    {/* ============================================================
        SECTION 8: WEATHER
        ============================================================ */}
    <div className="bg-white py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <section id="weather">

      <h2 className="flex items-center gap-2 text-lg font-semibold text-orange-600">
        <CloudSun className="size-5" aria-hidden="true" />
        Weather
      </h2>
      <p className="mt-1 text-sm text-gray-500">Current conditions and forecasts for {country.name}</p>

      {/* ---- CITY SELECTOR — Geoapify search ---- */}
      <div className="mt-6">
        <Combobox
          as="div"
          value={weatherCity}
          onChange={(city: CityResult | null) => {
            setCityQuery('')
            if (city) setWeatherCity(city)
          }}
        >
          <Label className="text-sm font-medium text-gray-900">City</Label>
          <p className="mt-1 text-sm text-gray-500">Search for a city to see its weather data.</p>
          <div className="relative mt-2 max-w-xs">
            <ComboboxInput
              className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              onChange={(event) => setCityQuery(event.target.value)}
              onBlur={() => setCityQuery('')}
              displayValue={(city: CityResult) => city?.name ?? ''}
              placeholder={`Search cities in ${country.name}...`}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
              <ChevronsUpDown className="size-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>
            {(cityResults.length > 0 || cityLoading) && (
              <ComboboxOptions
                transition
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
              >
                {cityLoading && cityResults.length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-500">Searching...</div>
                )}
                {cityResults.map((city, index) => (
                  <ComboboxOption
                    key={`${city.lat}-${city.lon}-${index}`}
                    value={city}
                    className="cursor-default px-3 py-2 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                  >
                    <div className="flex">
                      <span className="block truncate">{city.name}</span>
                      {city.state && (
                        <span className="ml-2 block truncate text-gray-500 in-data-focus:text-white">
                          {city.state}
                        </span>
                      )}
                    </div>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}
          </div>
        </Combobox>
      </div>

      {/* ---- CURRENT CONDITIONS ---- */}
      <div className="mt-6">
        {weatherLoading && !currentWeather && (
          <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow-sm sm:p-6">
            <p className="text-sm text-gray-500">Loading weather data...</p>
          </div>
        )}

        {weatherError && (
          <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5 shadow-sm sm:p-6">
            <p className="text-sm text-red-600">{weatherError}</p>
          </div>
        )}

        {currentWeather && (
          <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-50 shadow-sm">
            {/* Hero: icon + temp + description */}
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center gap-4">
                {getWeatherIcon(currentWeather.icon, 'size-12')}
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-semibold tracking-tight text-gray-900">
                      {currentWeather.temp}°C
                    </span>
                    <span className="text-sm text-gray-500">
                      Feels like {currentWeather.feels_like}°C
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700 capitalize">
                    {currentWeather.description}
                  </p>
                </div>
              </div>
            </div>
            {/* Stat grid */}
            <dl className="grid grid-cols-2 divide-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Humidity</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{currentWeather.humidity}%</dd>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Wind</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{currentWeather.wind_speed} km/h</dd>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Precipitation</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{currentWeather.precipitation} mm</dd>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">UV Index</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{currentWeather.uvindex}</dd>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Cloud Cover</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{currentWeather.cloudcover}%</dd>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Visibility</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{currentWeather.visibility} km</dd>
              </div>
            </dl>
            {/* Footer: sunrise/sunset */}
            <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
              <p className="text-sm text-gray-500">
                Sunrise {currentWeather.sunrise} · Sunset {currentWeather.sunset}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ---- 15-DAY FORECAST — SEO-safe accordion ---- */}
      {forecast.length > 0 && (
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setForecastOpen(!forecastOpen)}
            className="flex w-full items-center justify-between border-b border-gray-200 pb-3"
            aria-expanded={forecastOpen}
          >
            <span className="text-sm font-semibold text-gray-900">15-Day Forecast</span>
            <ChevronDown
              className={`size-5 text-gray-500 transition-transform duration-200 ${forecastOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: forecastOpen ? '2000px' : '0' }}
          >
            <div className="mt-3 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Day</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">High</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Low</th>
                          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Conditions</th>
                          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Precip %</th>
                          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">Humidity</th>
                          <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">UV</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-gray-50">
                        {forecast.map((day, index) => (
                          <tr key={index}>
                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">{day.date}</td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{day.high}°C</td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{day.low}°C</td>
                            <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell">{day.description}</td>
                            <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 sm:table-cell">{day.precipChance}%</td>
                            <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 md:table-cell">{day.humidity}%</td>
                            <td className="hidden px-3 py-4 text-sm whitespace-nowrap text-gray-500 md:table-cell">{day.uvindex}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- CLIMATE AVERAGES — SEO-safe accordion ---- */}
      <div className="mt-8">
        <button
          type="button"
          onClick={() => setClimateOpen(!climateOpen)}
          className="flex w-full items-center justify-between border-b border-gray-200 pb-3"
          aria-expanded={climateOpen}
        >
          <span className="text-sm font-semibold text-gray-900">Climate Averages</span>
          <ChevronDown
            className={`size-5 text-gray-500 transition-transform duration-200 ${climateOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: climateOpen ? '2000px' : '0' }}
        >
          <div className="mt-3 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Month</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">High</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Low</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rain (mm)</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Humidity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-gray-50">
                      {climateLoading && climateAverages.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-3 py-4 text-sm text-gray-500 text-center">Loading climate data...</td>
                        </tr>
                      )}
                      {climateAverages.map((avg, index) => (
                        <tr key={index}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">{avg.month}</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{avg.high}°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{avg.low}°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{avg.precip}</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{avg.humidity}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attribution */}
      <div className="mt-4">
        <p className="text-xs text-gray-400">
          Weather data provided by{' '}
          <a href="https://www.visualcrossing.com/" className="inline-flex items-center gap-1 text-indigo-500 hover:text-indigo-400" target="_blank" rel="noopener noreferrer">
            Visual Crossing
            <ExternalLink className="size-3" aria-hidden="true" />
          </a>
        </p>
      </div>

    </section>
      </div>
    </div>

    {/* ============================================================
        SECTION 9: MEASUREMENTS
        ============================================================ */}
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <section id="measurements">

      <h2 className="flex items-center gap-2 text-lg font-semibold text-orange-600">
        <Ruler className="size-5" aria-hidden="true" />
        Measurements
      </h2>
      <p className="mt-1 text-sm text-gray-500">Units and conversions for {country.name}</p>

      <dl className="mt-6 grid grid-cols-1 divide-y divide-gray-200 rounded-lg bg-white shadow-sm md:grid-cols-3 md:divide-x md:divide-y-0">
          {/* System stat — 1/3 */}
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500">System</dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{country.measurement_system ?? '—'}</dd>
          </div>
          {/* Unit converter — 2/3 */}
          <div className="md:col-span-2 px-4 py-5 sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">Unit Converter</dt>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Converter type dropdown — Listbox */}
              <Listbox value={activeConverterOption} onChange={(option) => setActiveConverter(option.id)}>
                <div className="relative inline-block">
                  <ListboxButton className="inline-flex items-center gap-x-2 rounded-md bg-white py-1.5 pr-3 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                    <span className="truncate">{activeConverterOption.name}</span>
                    <ChevronsUpDown aria-hidden="true" className="size-4 shrink-0 text-gray-500" />
                  </ListboxButton>
                  <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 min-w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                  >
                    {converterOptions.map((option) => (
                      <ListboxOption
                        key={option.id}
                        value={option}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                      >
                        <span className="block truncate font-normal group-data-selected:font-semibold">{option.name}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                          <Check aria-hidden="true" className="size-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>

              {/* Left input */}
              <div className="flex-1">
                <div className="flex items-center rounded-md bg-white pr-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={
                      activeConverter === 'temperature' ? tempC :
                      activeConverter === 'distance' ? distKm :
                      activeConverter === 'weight' ? weightKg :
                      activeConverter === 'volume' ? volL :
                      activeConverter === 'height' ? heightCm :
                      activeConverter === 'speed' ? speedKmh :
                      areaSqm
                    }
                    onChange={
                      activeConverter === 'temperature' ? onTempCChange :
                      activeConverter === 'distance' ? onDistKmChange :
                      activeConverter === 'weight' ? onWeightKgChange :
                      activeConverter === 'volume' ? onVolLChange :
                      activeConverter === 'height' ? onHeightCmToInChange :
                      activeConverter === 'speed' ? onSpeedKmhChange :
                      onAreaSqmChange
                    }
                    className="block min-w-0 grow py-1.5 pl-3 pr-2 text-base font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                  <div className="shrink-0 text-sm text-gray-500 select-none">
                    {activeConverter === 'temperature' ? '°C' :
                     activeConverter === 'distance' ? 'km' :
                     activeConverter === 'weight' ? 'kg' :
                     activeConverter === 'volume' ? 'L' :
                     activeConverter === 'height' ? 'cm' :
                     activeConverter === 'speed' ? 'km/h' :
                     'm²'}
                  </div>
                </div>
              </div>

              {/* Equals */}
              <span className="text-lg font-semibold text-gray-400 text-center">=</span>

              {/* Right input */}
              <div className="flex-1">
                <div className="flex items-center rounded-md bg-white pr-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={
                      activeConverter === 'temperature' ? tempF :
                      activeConverter === 'distance' ? distMi :
                      activeConverter === 'weight' ? weightLbs :
                      activeConverter === 'volume' ? volGal :
                      activeConverter === 'height' ? heightIn :
                      activeConverter === 'speed' ? speedMph :
                      areaSqft
                    }
                    onChange={
                      activeConverter === 'temperature' ? onTempFChange :
                      activeConverter === 'distance' ? onDistMiChange :
                      activeConverter === 'weight' ? onWeightLbsChange :
                      activeConverter === 'volume' ? onVolGalChange :
                      activeConverter === 'height' ? onHeightInToCmChange :
                      activeConverter === 'speed' ? onSpeedMphChange :
                      onAreaSqftChange
                    }
                    className="block min-w-0 grow py-1.5 pl-3 pr-2 text-base font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                  <div className="shrink-0 text-sm text-gray-500 select-none">
                    {activeConverter === 'temperature' ? '°F' :
                     activeConverter === 'distance' ? 'mi' :
                     activeConverter === 'weight' ? 'lbs' :
                     activeConverter === 'volume' ? 'gal' :
                     activeConverter === 'height' ? 'in' :
                     activeConverter === 'speed' ? 'mph' :
                     'ft²'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dl>

    </section>
      </div>
    </div>

    {/* ============================================================
        SECTION 10: EMERGENCY
        ============================================================ */}
    <div className="bg-white py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <section id="emergency">

      <h2 className="flex items-center gap-2 text-lg font-semibold text-orange-600">
        <ShieldAlert className="size-5" aria-hidden="true" />
        Emergency
      </h2>
      <p className="mt-1 text-sm text-gray-500">Emergency numbers and U.S. embassy in {country.name}</p>

      {/* ---- PRIMARY EMERGENCY NUMBERS — always visible ---- */}
      <dl className="mt-6 grid grid-cols-3 gap-3">
        <div className="overflow-hidden rounded-lg bg-gray-50 px-3 py-4 shadow-sm sm:px-4 sm:py-5">
          <dt className="text-sm font-medium text-gray-500">
            Police
          </dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
            {country.emergency_police ? (
              <a href={`tel:${country.emergency_police.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500">
                {country.emergency_police}
                <Phone className="size-3.5 shrink-0" aria-hidden="true" />
              </a>
            ) : '—'}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-gray-50 px-3 py-4 shadow-sm sm:px-4 sm:py-5">
          <dt className="text-sm font-medium text-gray-500">
            Ambulance
          </dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
            {country.emergency_ambulance ? (
              <a href={`tel:${country.emergency_ambulance.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500">
                {country.emergency_ambulance}
                <Phone className="size-3.5 shrink-0" aria-hidden="true" />
              </a>
            ) : '—'}
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-gray-50 px-3 py-4 shadow-sm sm:px-4 sm:py-5">
          <dt className="text-sm font-medium text-gray-500">
            Fire
          </dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
            {country.emergency_fire ? (
              <a href={`tel:${country.emergency_fire.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500">
                {country.emergency_fire}
                <Phone className="size-3.5 shrink-0" aria-hidden="true" />
              </a>
            ) : '—'}
          </dd>
        </div>
      </dl>

      {/* ---- OTHER EMERGENCY NUMBERS — accordion ---- */}
      {emergencyNumbers && (emergencyNumbers.tourist_police || emergencyNumbers.roadside_assistance || emergencyNumbers.coast_guard || emergencyNumbers.other_emergency_name_1 || emergencyNumbers.other_emergency_name_2 || emergencyNumbers.other_emergency_name_3) && (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setOtherEmergencyOpen(!otherEmergencyOpen)}
            className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
            aria-expanded={otherEmergencyOpen}
          >
            <span>Other Emergency Numbers</span>
            <ChevronDown
              className={`size-5 text-gray-400 transition-transform duration-200 ${otherEmergencyOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          <div
            className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
            style={{ maxHeight: otherEmergencyOpen ? '2000px' : '0px' }}
          >
            <div className="border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {emergencyNumbers.tourist_police && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Tourist Police</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href={`tel:${emergencyNumbers.tourist_police.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500">
                        {emergencyNumbers.tourist_police}
                        <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                )}
                {emergencyNumbers.coast_guard && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Coast Guard</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href={`tel:${emergencyNumbers.coast_guard.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500">
                        {emergencyNumbers.coast_guard}
                        <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                )}
                {emergencyNumbers.roadside_assistance && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">
                      Roadside{emergencyNumbers.roadside_assistance_name ? ` (${emergencyNumbers.roadside_assistance_name})` : ''}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href={`tel:${emergencyNumbers.roadside_assistance.replace(/[#\s]/g, (m: string) => m === '#' ? '%23' : '')}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500">
                        {emergencyNumbers.roadside_assistance}
                        <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                )}
                {emergencyNumbers.other_emergency_name_1 && emergencyNumbers.other_emergency_number_1 && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">{emergencyNumbers.other_emergency_name_1}</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href={`tel:${emergencyNumbers.other_emergency_number_1.replace(/[#\s]/g, (m: string) => m === '#' ? '%23' : '')}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500">
                        {emergencyNumbers.other_emergency_number_1}
                        <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                )}
                {emergencyNumbers.other_emergency_name_2 && emergencyNumbers.other_emergency_number_2 && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">{emergencyNumbers.other_emergency_name_2}</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href={`tel:${emergencyNumbers.other_emergency_number_2.replace(/[#\s]/g, (m: string) => m === '#' ? '%23' : '')}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500">
                        {emergencyNumbers.other_emergency_number_2}
                        <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                )}
                {emergencyNumbers.other_emergency_name_3 && emergencyNumbers.other_emergency_number_3 && (
                  <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">{emergencyNumbers.other_emergency_name_3}</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href={`tel:${emergencyNumbers.other_emergency_number_3.replace(/[#\s]/g, (m: string) => m === '#' ? '%23' : '')}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500">
                        {emergencyNumbers.other_emergency_number_3}
                        <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      )}

      {/* ---- YOUR EMBASSY & CONSULATES — driven by master Nationality ---- */}
      <div className="mt-12">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Your Embassy & Consulates</h3>
        {masterNationality && nationalityName ? (
          <>
            <p className="mt-1 text-sm text-gray-600">
              Showing diplomatic missions for {nationalityName} citizens in {country.name}.
            </p>

            {/* Embassy Accordion — open by default */}
            {mainEmbassy ? (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setEmbassyOpen(!embassyOpen)}
                  className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                  aria-expanded={embassyOpen}
                >
                  <span>Embassy{mainEmbassy.city ? ` — ${mainEmbassy.city}` : ''}</span>
                  <ChevronDown
                    className={`size-5 text-gray-400 transition-transform duration-200 ${embassyOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                  style={{ maxHeight: embassyOpen ? '2000px' : '0px' }}
                >
                  <div className="border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium text-gray-900">Official Name</dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{mainEmbassy.official_name ?? `${nationalityName} Embassy in ${mainEmbassy.city ?? '—'}`}</dd>
                      </div>
                      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium text-gray-900">Address</dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                          <div>{mainEmbassy.address ?? '—'}</div>
                          {mainEmbassy.local_address && (
                            <div className="mt-1 text-gray-500">{mainEmbassy.local_address}</div>
                          )}
                          {mainEmbassy.google_maps_url && (
                            <div className="mt-1">
                              <a href={mainEmbassy.google_maps_url} className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                                <MapPin className="size-3.5" aria-hidden="true" />
                                Google Maps
                              </a>
                            </div>
                          )}
                        </dd>
                      </div>
                      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium text-gray-900">Phone</dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                          {mainEmbassy.phone ? (
                            <a href={`tel:${mainEmbassy.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500">
                              {mainEmbassy.phone}
                              <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                            </a>
                          ) : '—'}
                        </dd>
                      </div>
                      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium text-gray-900">Emergency After-Hours</dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                          {mainEmbassy.emergency_phone ? (
                            <a href={`tel:${mainEmbassy.emergency_phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500">
                              {mainEmbassy.emergency_phone}
                              <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                            </a>
                          ) : '—'}
                        </dd>
                      </div>
                      {mainEmbassy.website && (
                        <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-medium text-gray-900">Website</dt>
                          <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            <a
                              href={mainEmbassy.website.startsWith('http') ? mainEmbassy.website : `https://${mainEmbassy.website}`}
                              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-500"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {(() => { try { return new URL(mainEmbassy.website.startsWith('http') ? mainEmbassy.website : `https://${mainEmbassy.website}`).hostname.replace('www.', '') } catch { return mainEmbassy.website } })()}
                              <ExternalLink className="size-3.5" aria-hidden="true" />
                            </a>
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-gray-500">No embassy data available for this nationality.</p>
            )}

            {/* Consulates Accordion — closed by default */}
            {selectedConsulates.length > 0 && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setConsulatesOpen(!consulatesOpen)}
                  className="flex w-full items-center justify-between border-b border-gray-200 py-3 text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                  aria-expanded={consulatesOpen}
                >
                  <span>Consulates ({selectedConsulates.length})</span>
                  <ChevronDown
                    className={`size-5 text-gray-400 transition-transform duration-200 ${consulatesOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                  style={{ maxHeight: consulatesOpen ? '10000px' : '0px' }}
                >
                  {selectedConsulates.map((consulate, index) => (
                    <div key={consulate.id}>
                      {index > 0 && (
                        <div className="my-4 border-t border-gray-300" />
                      )}
                      <h4 className="mt-4 text-sm font-semibold text-gray-900">{consulate.city ?? 'Consulate'}</h4>
                      <div className="mt-2 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                          {consulate.official_name && (
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium text-gray-900">Official Name</dt>
                              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{consulate.official_name}</dd>
                            </div>
                          )}
                          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium text-gray-900">Address</dt>
                            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                              <div>{consulate.address ?? '—'}</div>
                              {consulate.local_address && (
                                <div className="mt-1 text-gray-500">{consulate.local_address}</div>
                              )}
                              {consulate.google_maps_url && (
                                <div className="mt-1">
                                  <a href={consulate.google_maps_url} className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                                    <MapPin className="size-3.5" aria-hidden="true" />
                                    Google Maps
                                  </a>
                                </div>
                              )}
                            </dd>
                          </div>
                          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium text-gray-900">Phone</dt>
                            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                              {consulate.phone ? (
                                <a href={`tel:${consulate.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500">
                                  {consulate.phone}
                                  <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                                </a>
                              ) : '—'}
                            </dd>
                          </div>
                          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium text-gray-900">Emergency After-Hours</dt>
                            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                              {consulate.emergency_phone ? (
                                <a href={`tel:${consulate.emergency_phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-500">
                                  {consulate.emergency_phone}
                                  <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                                </a>
                              ) : '—'}
                            </dd>
                          </div>
                          {consulate.website && (
                            <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium text-gray-900">Website</dt>
                              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                                <a
                                  href={consulate.website.startsWith('http') ? consulate.website : `https://${consulate.website}`}
                                  className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-500"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {(() => { try { return new URL(consulate.website.startsWith('http') ? consulate.website : `https://${consulate.website}`).hostname.replace('www.', '') } catch { return consulate.website } })()}
                                  <ExternalLink className="size-3.5" aria-hidden="true" />
                                </a>
                              </dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>

      {/* ---- HEALTH ---- */}
      {healthSafety && (
        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Health</h3>
          <div className="mt-3 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {healthSafety.required_vaccinations && (
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium text-gray-900">Required Vaccinations</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{healthSafety.required_vaccinations}</dd>
                </div>
              )}
              {healthSafety.health_insurance_required && (
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium text-gray-900">Health Insurance</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{healthSafety.health_insurance_required}</dd>
                </div>
              )}
              {healthSafety.tap_water_safe && (
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium text-gray-900">Tap Water</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{healthSafety.tap_water_safe}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      )}

      {/* ---- TRAVEL ADVISORIES ---- */}
      {travelAdvisory && (
        <div className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Travel Advisories</h3>
          <div className="mt-3 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {travelAdvisory.advisory_us && (
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium text-gray-900">US Advisory</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                    {travelAdvisory.advisory_us}
                    {travelAdvisory.advisory_us_url && (
                      <>
                        {' · '}
                        <a href={travelAdvisory.advisory_us_url} className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                          Source <ExternalLink className="inline size-3.5" aria-hidden="true" />
                        </a>
                      </>
                    )}
                  </dd>
                </div>
              )}
              {travelAdvisory.advisory_uk && (
                <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium text-gray-900">UK Advisory</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                    {travelAdvisory.advisory_uk}
                    {travelAdvisory.advisory_uk_url && (
                      <>
                        {' · '}
                        <a href={travelAdvisory.advisory_uk_url} className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                          Source <ExternalLink className="inline size-3.5" aria-hidden="true" />
                        </a>
                      </>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      )}

      {/* ---- DISCLAIMER ---- */}
      <div className="mt-8 overflow-hidden rounded-lg bg-gray-100 px-4 py-5 sm:p-6">
        <p className="text-sm text-gray-500">This information is for reference only and may not reflect the most current data. In any emergency, contact local emergency services immediately. Always verify embassy details before travel. Travel advisories are subject to change — check official government sources for the latest information.</p>
      </div>

    </section>
      </div>
    </div>

    </div>
  )
}
