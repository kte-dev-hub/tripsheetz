'use client'

import { useState, useEffect } from 'react'
import {
  Info,
  IdCard,
  Banknote,
  Sun,
  Zap,
  Car,
  Smartphone,
  Ruler,
  Check,
  TriangleAlert,
  MapPin,
  ChevronDown,
  ChevronsUpDown,
  ExternalLink,
  CloudRain,
  Cloud,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  CloudSun,
  Clock,
  Phone,
} from 'lucide-react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Label } from '@headlessui/react'

interface Country {
  id: number
  name: string
  official_name: string
  native_name: string
  iso_alpha2: string
  iso_alpha3: string
  slug: string
  region: string
  subregion: string
  capital_city: string
  capital_lat: number | null
  capital_lon: number | null
  measurement_system: string | null
  population: string | null
  government_type: string | null
  languages_official: string | null
  languages_common: string | null
  dialing_code: string | null
  driving_side: string | null
  currency_name: string | null
  currency_code: string | null
  emergency_police: string | null
  emergency_ambulance: string | null
  emergency_fire: string | null
}

interface Religion {
  id: number
  country_code: string
  religion_name: string
  percentage: number
  display_order: number
}

interface CountryTimezone {
  id: number
  country_code: string
  city: string
  timezone_id: string
  timezone_name: string
  timezone_abbreviation: string | null
  utc_offset: string
  dst_observed: boolean
  display_order: number
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

interface CountrySheetProps {
  country: Country
  allCountries: { id: number; name: string; iso_alpha2: string; currency_code: string | null }[]
  visaRequirements: VisaRequirement[]
  entryRequirements: EntryRequirement | null
  embassies: Embassy[]
  governmentResources: GovernmentResource[]
  currency: Currency | null
  paymentMethods: PaymentMethod | null
  tippingCustoms: TippingCustom[]
  averageCosts: AverageCost[]
  taxRefund: TaxRefund | null
  countryElectrical: CountryElectrical | null
  plugTypes: PlugType[]
  electricalTemplates: ElectricalTemplate[]
  allCountryElectrical: CountryElectricalSummary[]
  currencyReference: {
    currency_code: string
    currency_name: string
    currency_symbol: string
  }[]
  airports: Airport[]
  taxisRidehailing: TaxisRidehailing | null
  publicTransit: PublicTransit | null
  driving: Driving | null
  phoneInfo: PhoneInfo | null
  mobileData: MobileData | null
  appsAccess: AppsAccess | null
  religions: Religion[]
  countryTimezones: CountryTimezone[]
  emergencyNumbers: EmergencyNumbers | null
  travelAdvisory: TravelAdvisory | null
  healthSafety: HealthSafety | null
}

const tabs = [
  { name: 'Overview', id: 'basics', icon: Info },
  { name: 'Visa & Entry', id: 'visa', icon: IdCard },
  { name: 'Money', id: 'money', icon: Banknote },
  { name: 'Weather', id: 'weather', icon: Sun },
  { name: 'Electrical', id: 'electrical', icon: Zap },
  { name: 'Transportation', id: 'transport', icon: Car },
  { name: 'Communications', id: 'communications', icon: Smartphone },
  { name: 'Emergency', id: 'emergency', icon: TriangleAlert },
]

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
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

export default function CountrySheet({
  country,
  allCountries,
  visaRequirements,
  entryRequirements,
  embassies,
  governmentResources,
  currency,
  paymentMethods,
  tippingCustoms,
  averageCosts,
  taxRefund,
  countryElectrical,
  plugTypes,
  electricalTemplates,
  allCountryElectrical,
  currencyReference,
  airports,
  taxisRidehailing,
  publicTransit,
  driving,
  phoneInfo,
  mobileData,
  appsAccess,
  religions,
  countryTimezones,
  emergencyNumbers,
  travelAdvisory,
  healthSafety,
}: CountrySheetProps) {
  const [activeTab, setActiveTab] = useState('basics')
  // Master selector state
  const [masterTravelingFrom, setMasterTravelingFrom] = useState<string | null>(null)
  const [masterNationality, setMasterNationality] = useState<string | null>(null)
  const [travelingFromQuery, setTravelingFromQuery] = useState('')
  const [masterNationalityQuery, setMasterNationalityQuery] = useState('')
  // Master selector country list — all countries except the destination being viewed
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
  // When "Traveling from" is selected, auto-fill Nationality to the same value
  const handleTravelingFromChange = (countryCode: string | null) => {
    setMasterTravelingFrom(countryCode)
    if (countryCode && (!masterNationality || masterNationality === masterTravelingFrom)) {
      setMasterNationality(countryCode)
    }
  }
  const [currentTime, setCurrentTime] = useState(new Date())

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

  const [selectedHomeCountry, setSelectedHomeCountry] = useState<typeof homeCountries[0] | null>(
    null
  )
  const [homeCountryQuery, setHomeCountryQuery] = useState('')

  const filteredHomeCountries = homeCountryQuery === ''
    ? homeCountries
    : homeCountries.filter((c) =>
        c.name.toLowerCase().includes(homeCountryQuery.toLowerCase())
      )

  const [selectedAirportCity, setSelectedAirportCity] = useState<string | null>(null)
  const [airportCityQuery, setAirportCityQuery] = useState('')

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

  const nationalities = allCountries
    .map((c) => ({
      id: c.iso_alpha2.trim(),
      name: c.name,
      code: c.iso_alpha2.trim(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const [selectedNationality, setSelectedNationality] = useState<typeof nationalities[0] | null>(null)
  const [nationalityQuery, setNationalityQuery] = useState('')

  const filteredNationalities = nationalityQuery === ''
    ? nationalities
    : nationalities.filter((n) =>
        n.name.toLowerCase().includes(nationalityQuery.toLowerCase())
      )

  // Sync master "Nationality" to Visa & Entry tab's selectedNationality
  useEffect(() => {
    if (masterNationality) {
      const match = nationalities.find((n) => n.code === masterNationality)
      if (match) {
        setSelectedNationality(match)
      }
    }
  }, [masterNationality])

  // Sync master "Traveling from" to Electrical tab's selectedHomeCountry
  useEffect(() => {
    if (masterTravelingFrom) {
      const match = homeCountries.find((c) => c.code === masterTravelingFrom)
      if (match) {
        setSelectedHomeCountry(match)
      }
    }
  }, [masterTravelingFrom])

  const selectedVisa = visaRequirements.find(
    (vr) => vr.passport_code.trim() === selectedNationality?.code
  )
  const selectedEmbassies = embassies.filter(
    (e) => e.nationality_code.trim() === selectedNationality?.code
  )
  const mainEmbassy = selectedEmbassies.find((e) => e.type === 'embassy')
  const selectedConsulates = selectedEmbassies.filter((e) => e.type === 'consulate')

  // Unit converter state
  const [tempC, setTempC] = useState('')
  const [tempF, setTempF] = useState('')
  const [distKm, setDistKm] = useState('')
  const [distMi, setDistMi] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [weightLbs, setWeightLbs] = useState('')
  const [volL, setVolL] = useState('')
  const [volGal, setVolGal] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [heightFt, setHeightFt] = useState('')
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

  // Currency converter state
  const [localAmount, setLocalAmount] = useState<string>('1')
  const [foreignAmount, setForeignAmount] = useState<string>('')
  const [selectedCurrency, setSelectedCurrency] = useState<string>('')
  const [exchangeRates, setExchangeRates] = useState<Record<string, number> | null>(null)
  const [rateLastUpdated, setRateLastUpdated] = useState<string>('')
  const [rateLoading, setRateLoading] = useState<boolean>(false)
  const [rateError, setRateError] = useState<string>('')
  const [currencyQuery, setCurrencyQuery] = useState('')

  // Converter handlers
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
  const onHeightCmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cm = e.target.value
    setHeightCm(cm)
    const n = parseFloat(cm)
    if (isNaN(n)) {
      setHeightFt('')
      setHeightIn('')
    } else {
      const totalIn = n / 2.54
      const ft = Math.floor(totalIn / 12)
      const inVal = Math.round((totalIn - ft * 12) * 10) / 10
      setHeightFt(String(ft))
      setHeightIn(String(inVal))
    }
  }
  const onHeightFtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ft = e.target.value
    setHeightFt(ft)
    const f = parseFloat(ft)
    const i = parseFloat(heightIn)
    if (isNaN(f) && isNaN(i)) {
      setHeightCm('')
    } else {
      const totalIn = (isNaN(f) ? 0 : f) * 12 + (isNaN(i) ? 0 : i)
      setHeightCm(String(Math.round(totalIn * 2.54 * 10) / 10))
    }
  }
  const onHeightInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inVal = e.target.value
    setHeightIn(inVal)
    const f = parseFloat(heightFt)
    const i = parseFloat(inVal)
    if (isNaN(f) && isNaN(i)) {
      setHeightCm('')
    } else {
      const totalIn = (isNaN(f) ? 0 : f) * 12 + (isNaN(i) ? 0 : i)
      setHeightCm(String(Math.round(totalIn * 2.54 * 10) / 10))
    }
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: timezoneId,
    }).format(date)

    return { time24, time12, dateStr }
  }

  // Exchange rates fetch when Money tab is active
  useEffect(() => {
    if (activeTab === 'money' && currency?.currency_code && !exchangeRates) {
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
  }, [activeTab, currency?.currency_code])

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

  useEffect(() => {
    if (activeTab !== 'weather') return
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

    const lat = weatherCity.lat
    const lon = weatherCity.lon

    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&include=current,days&key=${apiKey}&contentType=json`
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
  }, [activeTab, weatherCity])

  useEffect(() => {
    if (activeTab !== 'weather') return
    if (!weatherCity.lat || !weatherCity.lon) return
    const apiKey = process.env.NEXT_PUBLIC_VISUALCROSSING_API_KEY
    if (!apiKey) return

    setClimateLoading(true)
    setClimateAverages([])

    const lat = weatherCity.lat
    const lon = weatherCity.lon
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    let cancelled = false

    async function fetchClimateData() {
      const averages: ClimateAverage[] = []

      for (let i = 0; i < 12; i++) {
        if (cancelled) return
        const month = String(i + 1).padStart(2, '0')
        try {
          const res = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/2027-${month}-15/2027-${month}-15?unitGroup=metric&include=days&key=${apiKey}&contentType=json&elements=tempmax,tempmin,precip,humidity`
          )
          if (!res.ok) {
            console.error(`Climate data error for month ${i + 1}: ${res.status}`)
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
        } catch (err) {
          console.error(`Climate data error for month ${i + 1}:`, err)
          averages.push({ month: monthNames[i], high: 0, low: 0, precip: 0, humidity: 0 })
        }
      }

      if (!cancelled) {
        setClimateAverages(averages)
        setClimateLoading(false)
      }
    }

    fetchClimateData()

    return () => {
      cancelled = true
    }
  }, [activeTab, weatherCity])

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

  // Sync master "Traveling from" to Money tab's currency converter default
  useEffect(() => {
    if (masterTravelingFrom && exchangeRates) {
      const travelingFromCountry = allCountries.find(
        (c) => c.iso_alpha2.trim() === masterTravelingFrom
      )
      if (travelingFromCountry?.currency_code && exchangeRates[travelingFromCountry.currency_code]) {
        // Only set default if user hasn't manually selected a currency yet
        if (!selectedCurrency) {
          handleCurrencyChange(travelingFromCountry.currency_code)
        }
      }
    }
  }, [masterTravelingFrom, exchangeRates])

  function getElectricalComparison() {
    if (!countryElectrical || !selectedHomeCountry) return null

    const destTypes = countryElectrical.plug_types.split(',').map((t) => t.trim())
    const homeTypes = selectedHomeCountry.plug_types.split(',').map((t) => t.trim())

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
    const homeV = parseInt(selectedHomeCountry.voltage)
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
        .replace(/{home_country}/g, selectedHomeCountry.name)
        .replace(/{destination_country}/g, country.name)
        .replace(/{home_plug_types}/g, homePlugTypeNames)
        .replace(/{destination_plug_types}/g, destPlugTypeNames)
        .replace(/{matching_types}/g, matchingTypeNames)
        .replace(/{non_matching_types}/g, nonMatchingTypeNames)
        .replace(/{home_voltage}/g, selectedHomeCountry.voltage)
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

  return (
    <div className="min-h-screen bg-gray-50">
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      {/* ============================================================
          PAGE HEADER — based on 28-with-avatar-and-actions
          ============================================================ */}
      <div className="md:flex md:items-center md:justify-between md:space-x-5">
        <div className="flex items-start space-x-5">
          <div className="shrink-0">
            <div className="relative">
              <img
                alt={`Flag of ${country.name}`}
                src={`https://flagcdn.com/w160/${country.iso_alpha2.trim().toLowerCase()}.png`}
                className="h-16 w-auto rounded-lg"
              />
            </div>
          </div>
          <div className="pt-1.5">
            <h1 className="text-2xl font-bold text-gray-900">{country.name}</h1>
            <p className="text-sm font-medium text-gray-500">
              {country.native_name && `${country.native_name} · `}{country.official_name}
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================
          MASTER COUNTRY SELECTOR — persistent, controls tab-level dropdowns
          ============================================================ */}
      <div className="mt-6 rounded-lg bg-gray-100 px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
          {/* Traveling From */}
          <div className="flex-1 max-w-xs">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
              Traveling from
              <span className="group relative">
                <Info className="size-4 text-gray-400 cursor-help" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  The country you currently live in. Determines electrical comparisons and currency defaults.
                </span>
              </span>
            </label>
            <Combobox
              value={masterTravelingFrom}
              onChange={handleTravelingFromChange}
            >
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
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
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
          </div>

          {/* Nationality */}
          <div className="flex-1 max-w-xs">
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
              Nationality
              <span className="group relative">
                <Info className="size-4 text-gray-400 cursor-help" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  The country that issued your passport. Determines visa requirements and embassy information.
                </span>
              </span>
            </label>
            <Combobox
              value={masterNationality}
              onChange={setMasterNationality}
            >
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
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
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
        </div>

        {/* Meta text */}
        <p className="mt-3 text-xs text-gray-500">
          {masterTravelingFrom || masterNationality
            ? 'Your selections personalize visa requirements, embassy info, electrical comparisons, and currency defaults across all tabs.'
            : 'Select your country to personalize visa requirements, embassy info, electrical comparisons, and currency defaults across all tabs.'}
        </p>
      </div>

      {/* ============================================================
          TAB NAVIGATION — based on 213-tabs-with-underline-and-icons
          ============================================================ */}
      <div className="mt-8">
        <div className="grid grid-cols-1 sm:hidden">
          <select
            value={tabs.find((tab) => tab.id === activeTab)?.name}
            onChange={(e) => {
              const selected = tabs.find((tab) => tab.name === e.target.value)
              if (selected) setActiveTab(selected.id)
            }}
            aria-label="Select a tab"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500"
          />
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.id)}
                  className={classNames(
                    tab.id === activeTab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                  )}
                >
                  <tab.icon
                    aria-hidden="true"
                    className={classNames(
                      tab.id === activeTab
                        ? 'text-indigo-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-2 -ml-0.5 size-5',
                    )}
                  />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* ============================================================
          TAB CONTENT
          ============================================================ */}

      {/* ============================================================
          BASICS TAB
          ============================================================ */}
      {activeTab === 'basics' && (
        <div className="mt-8 space-y-10">

          {/* IDENTITY — based on #59 with-shared-borders */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Identity</h3>
            <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Capital</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{country.capital_city ?? '—'}</dd>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Population</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{country.population ?? '—'}</dd>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Government</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{country.government_type ?? '—'}</dd>
              </div>
            </dl>
          </div>

          {/* LANGUAGE — based on #50 left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Language</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Official Languages</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900 sm:col-span-2 sm:mt-0">{country.languages_official ?? '—'}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Common Languages</dt>
                    <dd className="mt-1 text-sm/6 text-gray-900 sm:col-span-2 sm:mt-0">{country.languages_common ?? '—'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* TIME — #328 card-with-header per timezone, live clocks */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Time</h3>
            {countryTimezones.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                {countryTimezones.map((tz: CountryTimezone) => {
                  const { time24, time12, dateStr } = formatTimeForZone(currentTime, tz.timezone_id)
                  return (
                    <div
                      key={tz.id}
                      className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm"
                    >
                      {/* Header */}
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
                      {/* Body */}
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
                            <dd className="mt-1 text-sm font-semibold text-gray-900">UTC {tz.utc_offset}</dd>
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
            ) : (
              <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-900">Time Zone</dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">—</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>

          {/* MEASUREMENTS — System card + unit converter using #57 stat + #138 Listbox + #125 inline add-on inputs */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Measurements</h3>
            <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 rounded-lg bg-white shadow-sm md:grid-cols-3 md:divide-x md:divide-y-0">
              {/* Left: System stat — 1/3 width */}
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">System</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{country.measurement_system ?? '—'}</dd>
              </div>

              {/* Right: Unit converter — 2/3 width */}
              <div className="md:col-span-2 px-4 py-5 sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Unit Converter</dt>
                {/* Single row: dropdown + left input + = + right input */}
                <div className="mt-3 flex items-center gap-3">
                  {/* Converter type dropdown — #138 Simple Custom Listbox */}
                  <Listbox value={activeConverterOption} onChange={(option) => setActiveConverter(option.id)}>
                    <div className="relative inline-block">
                      <ListboxButton className="inline-flex items-center gap-x-2 rounded-md bg-white py-1.5 pr-3 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                        <span className="truncate">{activeConverterOption.name}</span>
                        <ChevronsUpDown
                          aria-hidden="true"
                          className="size-4 shrink-0 text-gray-500"
                        />
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

                  {/* Left input — unit label on right (#125 inline add-on, reversed) */}
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

                  {/* Equals sign */}
                  <span className="text-lg font-semibold text-gray-400">=</span>

                  {/* Right input — unit label on right (#125 inline add-on, reversed) */}
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
          </div>

          {/* RELIGION — horizontal bar chart in #326 basic card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Religion</h3>
            <div className="mt-5 overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
              {religions.length > 0 ? (
                <div className="space-y-3">
                  {religions.map((religion: Religion, index: number) => (
                    <div key={religion.id}>
                      <div className="flex items-center justify-between text-sm">
                        <span className={`${index === 0 ? 'font-semibold text-gray-900' : 'font-medium text-gray-500'}`}>{religion.religion_name}</span>
                        <span className={`font-semibold ${index === 0 ? 'text-2xl text-gray-900' : 'text-gray-500'}`}>{religion.percentage}%</span>
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
              ) : (
                <p className="text-sm text-gray-500">No religion data available.</p>
              )}
            </div>
          </div>

          {/* QUICK REFERENCE — based on #57 simple-in-cards */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Quick Reference</h3>
            <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Dialing Code</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{country.dialing_code ?? '—'}</dd>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Driving Side</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{country.driving_side ?? '—'}</dd>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Currency</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{country.currency_code ?? '—'}</dd>
              </div>
            </dl>
          </div>

          {/* EMERGENCY — based on #59 with-shared-borders */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Emergency Numbers</h3>
            <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Police</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                  {country.emergency_police ? (
                    <a href={`tel:${country.emergency_police}`} className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500">
                      {country.emergency_police}
                      <Phone className="size-4" />
                    </a>
                  ) : '—'}
                </dd>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Ambulance</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                  {country.emergency_ambulance ? (
                    <a href={`tel:${country.emergency_ambulance}`} className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500">
                      {country.emergency_ambulance}
                      <Phone className="size-4" />
                    </a>
                  ) : '—'}
                </dd>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500">Fire</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                  {country.emergency_fire ? (
                    <a href={`tel:${country.emergency_fire}`} className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500">
                      {country.emergency_fire}
                      <Phone className="size-4" />
                    </a>
                  ) : '—'}
                </dd>
              </div>
            </dl>
          </div>

        </div>
      )}

      {/* ============================================================
          VISA & ENTRY TAB
          ============================================================ */}
      {activeTab === 'visa' && (
        <div className="mt-8 space-y-10">

          {/* NATIONALITY SELECTOR — standalone, controls Visa Requirements and Embassy sections */}
          {nationalities.length > 0 && (
          <div>
            <p className="text-sm text-gray-700">Select your nationality to see visa requirements for {country.name}.{selectedNationality && masterNationality && selectedNationality.code !== masterNationality && (
              <span className="ml-1 text-xs text-amber-600">(Different from your master setting)</span>
            )}</p>
            <div className="mt-3 max-w-xs">
              <Combobox value={selectedNationality} onChange={setSelectedNationality}>
                <div className="relative mt-2">
                  <ComboboxInput
                    className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(event) => setNationalityQuery(event.target.value)}
                    onBlur={() => setNationalityQuery('')}
                    displayValue={(item: typeof nationalities[0]) => item?.name ?? ''}
                    placeholder="Select a country"
                  />
                  <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
                    <ChevronsUpDown className="size-5 text-gray-400" aria-hidden="true" />
                  </ComboboxButton>
                  <ComboboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                  >
                    {filteredNationalities.map((nationality) => (
                      <ComboboxOption
                        key={nationality.id}
                        value={nationality}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                      >
                        <span className="block truncate font-normal group-data-selected:font-semibold">{nationality.name}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                          <Check aria-hidden="true" className="size-5" />
                        </span>
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </div>
              </Combobox>
            </div>
          </div>
          )}

          {/* VISA REQUIREMENTS — based on 50-left-aligned-in-card */}
          {selectedNationality && (
          <div>
            <h3 className="text-base font-semibold text-gray-900">Visa Requirements</h3>

            {/* Visa details for selected nationality — based on 50-left-aligned-in-card */}
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Nationality</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedNationality?.name ?? '—'}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Visa Status</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedVisa?.visa_status ?? '—'}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Duration</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedVisa?.visa_duration ?? '—'}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Passport Validity</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedVisa?.passport_validity ?? '—'}</dd>
                  </div>
                  {selectedVisa?.secondary_rule_name && (
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">{selectedVisa.secondary_rule_name}</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedVisa.secondary_rule_duration ?? '—'}
                      {selectedVisa.secondary_rule_link && (
                        <>{' · '}<a href={selectedVisa.secondary_rule_link} className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">More info</a></>
                      )}
                    </dd>
                  </div>
                  )}
                  {selectedVisa?.mandatory_registration_name && (
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">{selectedVisa.mandatory_registration_name}</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      Required
                      {selectedVisa.mandatory_registration_link && (
                        <>{' · '}<a href={selectedVisa.mandatory_registration_link} className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">More info</a></>
                      )}
                    </dd>
                  </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
          )}

          {/* ENTRY REQUIREMENTS — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Entry Requirements</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Return Ticket Required</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{entryRequirements?.return_ticket_required == null ? '—' : entryRequirements.return_ticket_required ? 'Yes' : 'No'}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Proof of Funds</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{entryRequirements?.proof_of_funds_required == null ? '—' : entryRequirements.proof_of_funds_required ? 'May be requested' : 'No'}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Customs Declaration</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{entryRequirements?.customs_declaration_required == null ? '—' : entryRequirements.customs_declaration_required ? 'Required' : 'Not required'}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Arrival Card</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{entryRequirements?.arrival_card_required == null ? '—' : entryRequirements.arrival_card_required ? 'Yes' : 'No'}</dd>
                  </div>
                  {entryRequirements?.entry_portal_name && (
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">{entryRequirements.entry_portal_name}</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {entryRequirements.entry_portal_url && (
                        <a href={entryRequirements.entry_portal_url} className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                          {(() => { try { return new URL(entryRequirements.entry_portal_url).hostname.replace('www.', '') } catch { return entryRequirements.entry_portal_url } })()}
                          <ExternalLink className="size-3.5" aria-hidden="true" />
                        </a>
                      )}
                      {entryRequirements.entry_portal_description && (
                        <p className={entryRequirements.entry_portal_url ? "mt-1 text-gray-700" : ""}>{entryRequirements.entry_portal_description}</p>
                      )}
                    </dd>
                  </div>
                  )}
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Duty-Free Allowances</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {(entryRequirements?.dutyfree_alcohol || entryRequirements?.dutyfree_tobacco || entryRequirements?.dutyfree_perfume || entryRequirements?.dutyfree_cash_limit || entryRequirements?.dutyfree_other || entryRequirements?.dutyfree_penalties) ? (
                        <div className="space-y-4">
                          {entryRequirements?.dutyfree_alcohol && (
                            <div>
                              <span className="font-semibold text-gray-900">Alcohol</span>
                              <p className="mt-1">{entryRequirements.dutyfree_alcohol}</p>
                            </div>
                          )}
                          {entryRequirements?.dutyfree_tobacco && (
                            <div>
                              <span className="font-semibold text-gray-900">Tobacco</span>
                              <p className="mt-1">{entryRequirements.dutyfree_tobacco}</p>
                            </div>
                          )}
                          {entryRequirements?.dutyfree_perfume && (
                            <div>
                              <span className="font-semibold text-gray-900">Perfume</span>
                              <p className="mt-1">{entryRequirements.dutyfree_perfume}</p>
                            </div>
                          )}
                          {entryRequirements?.dutyfree_cash_limit && (
                            <div>
                              <span className="font-semibold text-gray-900">Cash Declaration</span>
                              <p className="mt-1">{entryRequirements.dutyfree_cash_limit}</p>
                            </div>
                          )}
                          {entryRequirements?.dutyfree_other && (
                            <div>
                              <span className="font-semibold text-gray-900">Other</span>
                              <p className="mt-1">{entryRequirements.dutyfree_other}</p>
                            </div>
                          )}
                          {entryRequirements?.dutyfree_penalties && (
                            <div>
                              <span className="font-semibold text-gray-900">Penalties</span>
                              <p className="mt-1">{entryRequirements.dutyfree_penalties}</p>
                            </div>
                          )}
                        </div>
                      ) : '—'}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Restricted Items</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {entryRequirements?.restricted_items ? (
                        entryRequirements.restricted_items.includes('||') ? (
                          <div className="space-y-4">
                            {entryRequirements.restricted_items.split('||').map((item, index) => {
                              const colonIndex = item.indexOf(':')
                              if (colonIndex > -1) {
                                const label = item.substring(0, colonIndex).trim()
                                const description = item.substring(colonIndex + 1).trim()
                                return (
                                  <div key={index}>
                                    <span className="font-semibold text-gray-900">{label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}</span>
                                    <p className="mt-1">{description}</p>
                                  </div>
                                )
                              }
                              return <p key={index}>{item.trim()}</p>
                            })}
                          </div>
                        ) : (
                          entryRequirements.restricted_items
                        )
                      ) : '—'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* GOVERNMENT RESOURCES — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Government Resources</h3>
            <p className="mt-2 text-sm text-gray-700">Visa requirements change frequently. Always verify with official sources before travel.</p>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  {governmentResources
                    .filter((gr) => ['immigration', 'customs', 'entry_portal', 'tourism'].includes(gr.category))
                    .map((resource) => (
                    <div key={resource.id} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-900">{resource.name ?? resource.category}</dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {resource.url ? (
                          <a href={resource.url} className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                            {(() => { try { return new URL(resource.url).hostname.replace('www.', '') } catch { return resource.url } })()}
                            <ExternalLink className="size-3.5" aria-hidden="true" />
                          </a>
                        ) : null}
                        {resource.description && (
                          <p className="mt-1 text-gray-700">{resource.description}</p>
                        )}
                      </dd>
                    </div>
                  ))}
                  {governmentResources.filter((gr) => ['immigration', 'customs', 'entry_portal', 'tourism'].includes(gr.category)).length === 0 && (
                    <div className="px-4 py-6 sm:px-6">
                      <p className="text-sm text-gray-500">No government resources available yet.</p>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>

          {/* CONSULATES & EMBASSIES — based on 50-left-aligned-in-card, driven by nationality selector */}
          {selectedNationality && (
          <div>
            <h3 className="text-base font-semibold text-gray-900">Embassy & Consulates</h3>
            <p className="mt-2 text-sm text-gray-700">Showing embassy and consulate information for {selectedNationality?.name} citizens in {country.name}.</p>
            <div className="mt-5 space-y-6">
              <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    {mainEmbassy ? (
                      <>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-900">Embassy{mainEmbassy.city ? ` — ${mainEmbassy.city}` : ''}</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mainEmbassy.official_name ?? `${selectedNationality?.name} Embassy in ${mainEmbassy.city ?? '—'}`}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-900">Address</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <div>{mainEmbassy.address ?? '—'}</div>
                            {mainEmbassy.local_address && (
                              <div className="mt-1 text-gray-500">{mainEmbassy.local_address}</div>
                            )}
                            {mainEmbassy.google_maps_url && (
                              <div className="mt-1">
                                <a
                                  href={mainEmbassy.google_maps_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Google Maps
                                  <MapPin className="size-4" aria-hidden="true" />
                                </a>
                              </div>
                            )}
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-900">Phone</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mainEmbassy.phone ? <a href={`tel:${mainEmbassy.phone.replace(/\s/g, '')}`} className="text-indigo-600 hover:text-indigo-500">{mainEmbassy.phone}</a> : '—'}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-900">Emergency After-Hours</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mainEmbassy.emergency_phone ? <a href={`tel:${mainEmbassy.emergency_phone.replace(/\s/g, '')}`} className="text-indigo-600 hover:text-indigo-500">{mainEmbassy.emergency_phone}</a> : '—'}</dd>
                        </div>
                        {mainEmbassy.email && (
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-900">Email</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <a href={`mailto:${mainEmbassy.email}`} className="text-indigo-600 hover:text-indigo-500">{mainEmbassy.email}</a>
                          </dd>
                        </div>
                        )}
                        {mainEmbassy.website && (
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-900">Website</dt>
                          <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <a href={mainEmbassy.website.startsWith('http') ? mainEmbassy.website : `https://${mainEmbassy.website}`} className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                              {(() => { try { return new URL(mainEmbassy.website.startsWith('http') ? mainEmbassy.website : `https://${mainEmbassy.website}`).hostname.replace('www.', '') } catch { return mainEmbassy.website } })()}
                            </a>
                          </dd>
                        </div>
                        )}
                      </>
                    ) : (
                      <div className="px-4 py-6 sm:px-6">
                        <p className="text-sm text-gray-500">No embassy data available for this nationality.</p>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
              {selectedConsulates.length > 0 && (
              <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    {selectedConsulates.map((consulate) => (
                      <div key={consulate.id} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Consulate — {consulate.city ?? '—'}</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {consulate.official_name && (
                            <div className="font-medium text-gray-900">{consulate.official_name}</div>
                          )}
                          <div className={consulate.official_name ? 'mt-1' : ''}>{consulate.address ?? '—'}</div>
                          {consulate.local_address && (
                            <div className="mt-1 text-gray-500">{consulate.local_address}</div>
                          )}
                          {consulate.google_maps_url && (
                            <div className="mt-1">
                              <a
                                href={consulate.google_maps_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Google Maps
                                <MapPin className="size-4" aria-hidden="true" />
                              </a>
                            </div>
                          )}
                          {consulate.phone && (
                            <div className="mt-1"><a href={`tel:${consulate.phone.replace(/\s/g, '')}`} className="text-indigo-600 hover:text-indigo-500">{consulate.phone}</a></div>
                          )}
                          {consulate.emergency_phone && (
                            <div className="mt-1"><a href={`tel:${consulate.emergency_phone.replace(/\s/g, '')}`} className="text-indigo-600 hover:text-indigo-500">{consulate.emergency_phone}</a> <span className="text-gray-500">(emergency)</span></div>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              )}
            </div>
          </div>
          )}

        </div>
      )}

      {/* ============================================================
          MONEY TAB
          ============================================================ */}
      {activeTab === 'money' && (
        <div className="mt-8 space-y-10">

          {/* CURRENCY — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Currency</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Currency Name</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{currency?.currency_name ?? '—'}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Symbol</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{currency?.currency_symbol ?? '—'}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Currency Code</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{currency?.currency_code ?? '—'}</dd>
                  </div>
                  {currency?.banknotes && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-900">Banknotes</dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{currency.banknotes}</dd>
                    </div>
                  )}
                  {currency?.coins && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-900">Coins</dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{currency.coins}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>

          {/* EXCHANGE — live currency converter */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Exchange Rate</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <div className="px-4 py-5 sm:p-6">
              {!currency ? (
                <p className="text-sm text-gray-500">Currency data not available.</p>
              ) : rateLoading ? (
                <p className="text-sm text-gray-500">Loading exchange rates...</p>
              ) : rateError ? (
                <p className="text-sm text-gray-500">{rateError}</p>
              ) : exchangeRates ? (
                <>
                  {selectedCurrency && localAmount && foreignAmount ? (
                    <div className="mb-5">
                      <p className="text-sm text-gray-500">
                        {localAmount} {currency.currency_name} equals
                      </p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {foreignAmount} {getCurrencyName(selectedCurrency)}
                      </p>
                    </div>
                  ) : (
                    <div className="mb-5">
                      <p className="text-sm text-gray-500">Convert {currency.currency_name} to another currency</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="1"
                        value={localAmount}
                        onChange={(e) => handleLocalAmountChange(e.target.value)}
                        className="block w-full rounded-md bg-white py-2 px-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex h-full items-center rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-1 -outline-offset-1 outline-gray-300">
                        <span className="mr-2 text-base">{currency.currency_symbol}</span>
                        <span className="truncate">{currency.currency_name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="0.00"
                        value={foreignAmount}
                        onChange={(e) => handleForeignAmountChange(e.target.value)}
                        className="block w-full rounded-md bg-white py-2 px-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                    <div className="flex-1">
                      <Combobox
                        value={selectedCurrency}
                        onChange={(val: string | null) => {
                          if (val) handleCurrencyChange(val)
                        }}
                      >
                        <div className="relative">
                          <ComboboxInput
                            className="block w-full rounded-md bg-white py-2 pr-10 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            onChange={(event) => setCurrencyQuery(event.target.value)}
                            onBlur={() => setCurrencyQuery('')}
                            displayValue={(code: string) =>
                              code ? `${getCurrencySymbol(code)} ${getCurrencyName(code)}` : ''
                            }
                            placeholder="Select currency"
                          />
                          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
                            <ChevronDown className="size-5 text-gray-400" aria-hidden="true" />
                          </ComboboxButton>
                          {filteredCurrencies.length > 0 && (
                            <ComboboxOptions
                              transition
                              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
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

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-gray-400">
                      Last updated: {rateLastUpdated ? new Date(rateLastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                    </span>
                    <a
                      href="https://www.exchangerate-api.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:text-indigo-500"
                    >
                      Rates from ExchangeRate-API
                    </a>
                  </div>
                </>
              ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* PAYING — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Paying</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  {paymentMethods?.cash_vs_card && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-900">Cash vs. Card</dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{paymentMethods.cash_vs_card}</dd>
                    </div>
                  )}
                  {paymentMethods?.mobile_payment_apps && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-900">Mobile Payment Apps</dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{paymentMethods.mobile_payment_apps}</dd>
                    </div>
                  )}
                  {paymentMethods?.atm_availability && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-900">ATM Availability</dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{paymentMethods.atm_availability}</dd>
                    </div>
                  )}
                  {paymentMethods?.foreign_card_fees && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-900">Foreign Card Fees</dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{paymentMethods.foreign_card_fees}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>

          {/* TIPPING — based on 84-simple-in-card */}
          {tippingCustoms.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-gray-900">Tipping</h3>
              <p className="mt-2 text-sm text-gray-700">Tipping customs and expectations by context.</p>
              <div className="mt-5 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                      <table className="relative min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                              Context
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Expected
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Amount
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Note
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {tippingCustoms.map((tip) => (
                            <tr key={tip.id}>
                              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">{tip.context}</td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{tip.expected}</td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{tip.typical_amount ?? '—'}</td>
                              <td className="px-3 py-4 text-sm text-gray-500">{tip.note ?? '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TYPICAL COSTS — based on 84-simple-in-card */}
          {averageCosts.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-gray-900">Typical Costs</h3>
              <p className="mt-2 text-sm text-gray-700">Average prices for common items in local currency and USD.</p>
              <div className="mt-5 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                      <table className="relative min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                              Item
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Local Price
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              USD
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {averageCosts.map((cost) => (
                            <tr key={cost.id}>
                              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">{cost.item}</td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{cost.cost_local}</td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{cost.cost_usd}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAX REFUND — based on 50-left-aligned-in-card */}
          {taxRefund && (
            <div>
              <h3 className="text-base font-semibold text-gray-900">Tax Refund</h3>
              <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    {taxRefund.tax_rate && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Tax Rate</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.tax_rate}</dd>
                      </div>
                    )}
                    {taxRefund.eligible_purchases && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Eligible Purchases</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.eligible_purchases}</dd>
                      </div>
                    )}
                    {taxRefund.minimum_purchase && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Minimum Purchase</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.minimum_purchase}</dd>
                      </div>
                    )}
                    {taxRefund.how_to_claim && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">How to Claim</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.how_to_claim}</dd>
                      </div>
                    )}
                    {taxRefund.where_to_claim && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Where to Claim</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.where_to_claim}</dd>
                      </div>
                    )}
                    {taxRefund.refund_method && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Refund Method</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.refund_method}</dd>
                      </div>
                    )}
                    {taxRefund.time_limit && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Time Limit</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{taxRefund.time_limit}</dd>
                      </div>
                    )}
                    {taxRefund.refund_portal_url && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Official Portal</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
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

        </div>
      )}

      {/* ============================================================
          PLACEHOLDER TABS
          ============================================================ */}
      {activeTab === 'weather' && (
        <div className="mt-8 space-y-10">

          {/* CITY SELECTOR — based on 185-with-secondary-text */}
          <div>
            <Combobox
              as="div"
              value={weatherCity}
              onChange={(city: CityResult | null) => {
                setCityQuery('')
                if (city) setWeatherCity(city)
              }}
            >
              <Label className="text-base font-semibold text-gray-900">City</Label>
              <p className="mt-1 text-sm text-gray-500">Search for a city to see its weather data.</p>
              <div className="relative mt-3">
                <ComboboxInput
                  className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  onChange={(event) => setCityQuery(event.target.value)}
                  onBlur={() => setCityQuery('')}
                  displayValue={(city: CityResult) => city?.name ?? ''}
                  placeholder={`Search cities in ${country.name}...`}
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
                  <ChevronDown className="size-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>

                {(cityResults.length > 0 || cityLoading) && (
                  <ComboboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
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

          {/* CURRENT CONDITIONS — based on 328-card-with-header + 59-with-shared-borders */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Current Conditions</h3>
            <p className="mt-2 text-sm text-gray-700">Live weather data for {weatherCity.name}.</p>

            {weatherLoading && !currentWeather && (
              <div className="mt-5 overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <p className="text-sm text-gray-500">Loading weather data...</p>
              </div>
            )}

            {weatherError && (
              <div className="mt-5 overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <p className="text-sm text-red-600">{weatherError}</p>
              </div>
            )}

            {currentWeather && (
              <div className="mt-5 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
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
                <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
                  <p className="text-sm text-gray-500">
                    Sunrise {currentWeather.sunrise} · Sunset {currentWeather.sunset}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 15-DAY FORECAST — based on 84-simple-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">15-Day Forecast</h3>

            {weatherLoading && forecast.length === 0 && (
              <div className="mt-5 overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <p className="text-sm text-gray-500">Loading forecast...</p>
              </div>
            )}

            {forecast.length > 0 && (
              <div className="mt-5 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                      <table className="relative min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                              Day
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              High
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Low
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Conditions
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Precip %
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Humidity
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              UV
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {forecast.map((day, index) => (
                            <tr key={index}>
                              <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">{day.date}</td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{day.high}°C</td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{day.low}°C</td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{day.description}</td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{day.precipChance}%</td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{day.humidity}%</td>
                              <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{day.uvindex}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CLIMATE AVERAGES — based on 84-simple-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Climate Averages</h3>
            <p className="mt-2 text-sm text-gray-700">Monthly averages for {weatherCity.name}.</p>
            <div className="mt-5 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                    <table className="relative min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Month
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            High
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Low
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Rain (mm)
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Humidity
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
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

          <div className="mt-4">
            <p className="text-xs text-gray-400">
              Weather data provided by{' '}
              <a href="https://www.visualcrossing.com/" className="text-indigo-500 hover:text-indigo-400" target="_blank" rel="noopener noreferrer">
                Visual Crossing
              </a>
            </p>
          </div>

        </div>
      )}
      {activeTab === 'electrical' && (
        <div className="mt-8 space-y-10">

          {/* PLUG TYPES — based on 107-images-with-details */}
          {countryElectrical && (
          <div>
            <h3 className="text-base font-semibold text-gray-900">Plug Types</h3>
            <ul role="list" className="mt-5 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
              {countryElectrical.plug_types.split(',').map((typeCode) => {
                const trimmed = typeCode.trim()
                const plugType = plugTypes.find((p) => p.type_letter.trim() === trimmed)
                if (!plugType) return null
                return (
                  <li key={trimmed} className="relative">
                    <div className="group overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center p-3" style={{ aspectRatio: '1' }}>
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
          </div>
          )}

          {/* POWER — based on 57-simple-in-cards */}
          {countryElectrical && (
          <div>
            <h3 className="text-base font-semibold text-gray-900">Power</h3>
            <dl className="mt-5 grid grid-cols-4 gap-5">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Voltage</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{countryElectrical.voltage}</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Frequency</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{countryElectrical.frequency}</dd>
              </div>
            </dl>
          </div>
          )}

          {/* WHAT YOU NEED — based on 50-left-aligned-in-card */}
          {countryElectrical && homeCountries.length > 0 && (
          <div>
            <h3 className="text-base font-semibold text-gray-900">What You Need</h3>
            <p className="mt-2 text-sm text-gray-700">Select your home country to see if you need an adapter or voltage converter for {country.name}.{selectedHomeCountry && masterTravelingFrom && selectedHomeCountry.code !== masterTravelingFrom && (
              <span className="ml-1 text-xs text-amber-600">(Different from your master setting)</span>
            )}</p>
            <div className="mt-3 mb-5 max-w-xs">
              <Combobox value={selectedHomeCountry} onChange={setSelectedHomeCountry}>
                <div className="relative mt-2">
                  <ComboboxInput
                    className="block w-full rounded-md bg-white py-1.5 pr-12 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    onChange={(event) => setHomeCountryQuery(event.target.value)}
                    onBlur={() => setHomeCountryQuery('')}
                    displayValue={(item: typeof homeCountries[0]) => item?.name ?? ''}
                    placeholder="Select a country"
                  />
                  <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden">
                    <ChevronsUpDown className="size-5 text-gray-400" aria-hidden="true" />
                  </ComboboxButton>
                  <ComboboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                  >
                    {filteredHomeCountries.map((hc) => (
                      <ComboboxOption
                        key={hc.code}
                        value={hc}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                      >
                        <span className="block truncate font-normal group-data-selected:font-semibold">{hc.name}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                          <Check aria-hidden="true" className="size-5" />
                        </span>
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </div>
              </Combobox>
            </div>
            {electricalComparison && (
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  {electricalComparison.adapter && (
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Adapter Needed</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <span className="font-semibold">{electricalComparison.adapter.heading}</span>
                      <span> — </span>
                      {electricalComparison.adapter.description}
                    </dd>
                  </div>
                  )}
                  {electricalComparison.voltage && (
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Voltage Converter Needed</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <span className="font-semibold">{electricalComparison.voltage.heading}</span>
                      <span> — </span>
                      {electricalComparison.voltage.description}
                    </dd>
                  </div>
                  )}
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Tip</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Contact your hotel or accommodation in advance to ask about available adapters, voltage converters, and outlet types in your room. Many hotels provide adapters upon request or have universal outlets installed.</dd>
                  </div>
                </dl>
              </div>
            </div>
            )}
          </div>
          )}

        </div>
      )}
      {activeTab === 'transport' && (
        <div className="mt-8 space-y-10">

          {/* AIRPORTS */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Airports</h3>

            {airports.length > 0 ? (
              <>
                <p className="mt-1 text-sm text-gray-500">
                  Select a city to see international airports for {country.name}.
                </p>
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
                          <ChevronDown className="size-5 text-gray-400" aria-hidden="true" />
                        </ComboboxButton>
                        {filteredAirportCities.length > 0 && (
                          <ComboboxOptions
                            transition
                            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
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

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {filteredAirports.map((airport) => (
                    <div key={airport.id} className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
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
                                {new URL(airport.website).hostname.replace('www.', '')}
                                <ExternalLink className="size-3.5" aria-hidden="true" />
                              </a>
                            )}
                          </div>
                          <span className="text-lg font-semibold text-gray-400">{airport.iata_code}</span>
                        </div>
                      </div>
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

          {/* TAXIS & RIDE-HAILING — based on 50-left-aligned-in-card */}
          {taxisRidehailing && (taxisRidehailing.ride_hailing_apps || taxisRidehailing.taxi_info) && (
            <div>
              <h3 className="text-base font-semibold text-gray-900">Taxis & Ride-Hailing</h3>
              <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    {taxisRidehailing.ride_hailing_apps && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Ride-Hailing Apps</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{taxisRidehailing.ride_hailing_apps}</dd>
                      </div>
                    )}
                    {taxisRidehailing.taxi_info && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Taxi Availability</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{taxisRidehailing.taxi_info}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          )}

          {/* PUBLIC TRANSPORTATION — based on 50-left-aligned-in-card */}
          {publicTransit && (publicTransit.transit_systems || publicTransit.transit_card_name || publicTransit.intercity_options) && (
            <div>
              <h3 className="text-base font-semibold text-gray-900">Public Transportation</h3>
              <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    {publicTransit.transit_systems && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Transit Systems</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{publicTransit.transit_systems}</dd>
                      </div>
                    )}
                    {publicTransit.transit_card_name && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Transit Card</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{publicTransit.transit_card_name}</dd>
                      </div>
                    )}
                    {publicTransit.transit_card_where_to_buy && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Where to Buy</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{publicTransit.transit_card_where_to_buy}</dd>
                      </div>
                    )}
                    {publicTransit.transit_contactless && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Contactless Payment</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{publicTransit.transit_contactless}</dd>
                      </div>
                    )}
                    {publicTransit.intercity_options && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Intercity Options</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{publicTransit.intercity_options}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          )}

          {/* DRIVING — based on 57-simple-in-cards */}
          {driving && (driving.driving_side || driving.idp_required || driving.road_conditions) && (
            <div>
              <h3 className="text-base font-semibold text-gray-900">Driving</h3>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {driving.driving_side && (
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Drives On</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{driving.driving_side}</dd>
                  </div>
                )}
                {driving.idp_required && (
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                    <dt className="text-sm font-medium text-gray-500">International Driving Permit (IDP) Required</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{driving.idp_required}</dd>
                  </div>
                )}
                {driving.road_conditions && (() => {
                  const firstDot = driving.road_conditions.indexOf('. ')
                  const headline = firstDot !== -1 ? driving.road_conditions.substring(0, firstDot) : driving.road_conditions
                  const description = firstDot !== -1 ? driving.road_conditions.substring(firstDot + 2) : null
                  return (
                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                      <dt className="text-sm font-medium text-gray-500">Road Conditions</dt>
                      <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{headline}</dd>
                      {description && (
                        <p className="mt-2 text-sm text-gray-500">{description}</p>
                      )}
                    </div>
                  )
                })()}
              </dl>
            </div>
          )}

        </div>
      )}
      {activeTab === 'communications' && (
        <div className="mt-8 space-y-10">

          {/* PHONE — based on 50-left-aligned-in-card */}
          {phoneInfo && (phoneInfo.dialing_code || phoneInfo.phone_number_format || phoneInfo.how_to_dial_local) && (
            <div>
              <h3 className="text-base font-semibold text-gray-900">Phone</h3>
              <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    {phoneInfo.dialing_code && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Country Dialing Code</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{phoneInfo.dialing_code}</dd>
                      </div>
                    )}
                    {phoneInfo.phone_number_format && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Phone Number Format</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{phoneInfo.phone_number_format}</dd>
                      </div>
                    )}
                    {phoneInfo.phone_number_length && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Phone Number Length</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{phoneInfo.phone_number_length}</dd>
                      </div>
                    )}
                    {phoneInfo.how_to_dial_local && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">How to Dial Locally</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{phoneInfo.how_to_dial_local}</dd>
                      </div>
                    )}
                    {phoneInfo.how_to_dial_international && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">How to Dial Internationally</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{phoneInfo.how_to_dial_international}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          )}

          {/* MOBILE DATA — based on 50-left-aligned-in-card */}
          {mobileData && (mobileData.major_carriers || mobileData.esim_available || mobileData.sim_purchase_locations) && (
            <div>
              <h3 className="text-base font-semibold text-gray-900">Mobile Data</h3>
              <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    {mobileData.major_carriers && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Major Carriers</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.major_carriers}</dd>
                      </div>
                    )}
                    {mobileData.esim_available && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">eSIM Available</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.esim_available}</dd>
                      </div>
                    )}
                    {mobileData.esim_providers && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">eSIM Providers</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.esim_providers}</dd>
                      </div>
                    )}
                    {mobileData.sim_purchase_locations && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">SIM Card Purchase</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.sim_purchase_locations}</dd>
                      </div>
                    )}
                    {mobileData.sim_requirements && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">SIM Requirements</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.sim_requirements}</dd>
                      </div>
                    )}
                    {mobileData.network_standards && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Network Standards</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.network_standards}</dd>
                      </div>
                    )}
                    {mobileData.prepaid_plan_costs && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Prepaid Plan Cost</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.prepaid_plan_costs}</dd>
                      </div>
                    )}
                    {mobileData.wifi_rental && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Pocket WiFi Rental</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mobileData.wifi_rental}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          )}

          {/* APPS & ACCESS — based on 50-left-aligned-in-card */}
          {appsAccess && (appsAccess.messaging_apps || appsAccess.vpn_needed || appsAccess.blocked_services) && (
            <div>
              <h3 className="text-base font-semibold text-gray-900">Apps & Access</h3>
              <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    {appsAccess.messaging_apps && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Popular Messaging Apps</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{appsAccess.messaging_apps}</dd>
                      </div>
                    )}
                    {appsAccess.vpn_needed && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">VPN Needed</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{appsAccess.vpn_needed}</dd>
                      </div>
                    )}
                    {appsAccess.blocked_services && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Blocked Services</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{appsAccess.blocked_services}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {activeTab === 'emergency' && (
        <div className="mt-8 space-y-10">

          {/* EMERGENCY NUMBERS — primary from countries table + supplementary from emergency_numbers table */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Emergency Numbers</h3>

            {/* Primary numbers — always 3 cards in a row */}
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Police</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {country.emergency_police ? (
                    <a href={`tel:${country.emergency_police.replace(/\s/g, '')}`} className="text-indigo-600 hover:text-indigo-500">{country.emergency_police}</a>
                  ) : '—'}
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Ambulance</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {country.emergency_ambulance ? (
                    <a href={`tel:${country.emergency_ambulance.replace(/\s/g, '')}`} className="text-indigo-600 hover:text-indigo-500">{country.emergency_ambulance}</a>
                  ) : '—'}
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Fire</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {country.emergency_fire ? (
                    <a href={`tel:${country.emergency_fire.replace(/\s/g, '')}`} className="text-indigo-600 hover:text-indigo-500">{country.emergency_fire}</a>
                  ) : '—'}
                </dd>
              </div>
            </dl>

            {/* Supplementary numbers — only render cards that have data */}
            {emergencyNumbers && (emergencyNumbers.tourist_police || emergencyNumbers.roadside_assistance || emergencyNumbers.coast_guard) && (
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {emergencyNumbers.tourist_police && (
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Tourist Police</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                      <a href={`tel:${emergencyNumbers.tourist_police.replace(/\s/g, '')}`} className="text-indigo-600 hover:text-indigo-500">{emergencyNumbers.tourist_police}</a>
                    </dd>
                  </div>
                )}
                {emergencyNumbers.roadside_assistance && (
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">
                      Roadside Assistance{emergencyNumbers.roadside_assistance_name ? ` (${emergencyNumbers.roadside_assistance_name})` : ''}
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                      <a href={`tel:${emergencyNumbers.roadside_assistance.replace(/[#\s]/g, (m: string) => m === '#' ? '%23' : '')}`} className="text-indigo-600 hover:text-indigo-500">{emergencyNumbers.roadside_assistance}</a>
                    </dd>
                  </div>
                )}
                {emergencyNumbers.coast_guard && (
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Coast Guard</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                      <a href={`tel:${emergencyNumbers.coast_guard.replace(/\s/g, '')}`} className="text-indigo-600 hover:text-indigo-500">{emergencyNumbers.coast_guard}</a>
                    </dd>
                  </div>
                )}
              </dl>
            )}

            {/* Other emergency numbers — description list for additional services */}
            {emergencyNumbers && (emergencyNumbers.other_emergency_name_1 || emergencyNumbers.other_emergency_name_2 || emergencyNumbers.other_emergency_name_3) && (
              <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    {emergencyNumbers.other_emergency_name_1 && emergencyNumbers.other_emergency_number_1 && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">{emergencyNumbers.other_emergency_name_1}</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <a href={`tel:${emergencyNumbers.other_emergency_number_1.replace(/[#\s]/g, (m: string) => m === '#' ? '%23' : '')}`} className="text-indigo-600 hover:text-indigo-500">{emergencyNumbers.other_emergency_number_1}</a>
                        </dd>
                      </div>
                    )}
                    {emergencyNumbers.other_emergency_name_2 && emergencyNumbers.other_emergency_number_2 && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">{emergencyNumbers.other_emergency_name_2}</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <a href={`tel:${emergencyNumbers.other_emergency_number_2.replace(/[#\s]/g, (m: string) => m === '#' ? '%23' : '')}`} className="text-indigo-600 hover:text-indigo-500">{emergencyNumbers.other_emergency_number_2}</a>
                        </dd>
                      </div>
                    )}
                    {emergencyNumbers.other_emergency_name_3 && emergencyNumbers.other_emergency_number_3 && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">{emergencyNumbers.other_emergency_name_3}</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <a href={`tel:${emergencyNumbers.other_emergency_number_3.replace(/[#\s]/g, (m: string) => m === '#' ? '%23' : '')}`} className="text-indigo-600 hover:text-indigo-500">{emergencyNumbers.other_emergency_number_3}</a>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            )}
          </div>

          {/* YOUR EMBASSY — driven by selectedNationality from master selector or Visa & Entry tab */}
          {selectedNationality && (
          <div>
            <h3 className="text-base font-semibold text-gray-900">Your Embassy</h3>
            <p className="mt-2 text-sm text-gray-700">Showing embassy information for {selectedNationality.name} citizens in {country.name}.</p>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  {mainEmbassy ? (
                    <>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Embassy{mainEmbassy.city ? ` — ${mainEmbassy.city}` : ''}</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mainEmbassy.official_name ?? `${selectedNationality?.name} Embassy in ${mainEmbassy.city ?? '—'}`}</dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Address</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <div>{mainEmbassy.address ?? '—'}</div>
                          {mainEmbassy.local_address && (
                            <div className="mt-1 text-gray-500">{mainEmbassy.local_address}</div>
                          )}
                          {mainEmbassy.google_maps_url && (
                            <div className="mt-1">
                              <a
                                href={mainEmbassy.google_maps_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Google Maps
                                <MapPin className="size-4" aria-hidden="true" />
                              </a>
                            </div>
                          )}
                        </dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Phone</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mainEmbassy.phone ? <a href={`tel:${mainEmbassy.phone.replace(/\s/g, '')}`} className="text-indigo-600 hover:text-indigo-500">{mainEmbassy.phone}</a> : '—'}</dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Emergency After-Hours</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{mainEmbassy.emergency_phone ? <a href={`tel:${mainEmbassy.emergency_phone.replace(/\s/g, '')}`} className="text-indigo-600 hover:text-indigo-500">{mainEmbassy.emergency_phone}</a> : '—'}</dd>
                      </div>
                      {mainEmbassy.website && (
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Website</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <a href={mainEmbassy.website.startsWith('http') ? mainEmbassy.website : `https://${mainEmbassy.website}`} className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                            {(() => { try { return new URL(mainEmbassy.website.startsWith('http') ? mainEmbassy.website : `https://${mainEmbassy.website}`).hostname.replace('www.', '') } catch { return mainEmbassy.website } })()}
                          </a>
                        </dd>
                      </div>
                      )}
                    </>
                  ) : (
                    <div className="px-4 py-6 sm:px-6">
                      <p className="text-sm text-gray-500">No embassy data available for this nationality.</p>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
          )}

          {/* HEALTH — from health_safety table */}
          {healthSafety && (
          <div>
            <h3 className="text-base font-semibold text-gray-900">Health</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  {healthSafety.required_vaccinations && (
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Required Vaccinations</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{healthSafety.required_vaccinations}</dd>
                  </div>
                  )}
                  {healthSafety.health_insurance_required && (
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Health Insurance</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{healthSafety.health_insurance_required}</dd>
                  </div>
                  )}
                  {healthSafety.tap_water_safe && (
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Tap Water</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{healthSafety.tap_water_safe}</dd>
                  </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
          )}

          {/* TRAVEL ADVISORIES — from travel_advisories table */}
          {travelAdvisory && (
          <div>
            <h3 className="text-base font-semibold text-gray-900">Travel Advisories</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  {travelAdvisory.advisory_us && (
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">US Travel Advisory</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
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
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">UK Travel Advisory</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
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
          </div>
          )}

          {/* DISCLAIMER */}
          <div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
              <p className="text-sm text-gray-500">This information is for reference only and may not reflect the most current data. In any emergency, contact local emergency services immediately. Always verify embassy details before travel. Travel advisories are subject to change — check official government sources for the latest information.</p>
            </div>
          </div>

        </div>
      )}

    </div>
    </div>
  )
}
