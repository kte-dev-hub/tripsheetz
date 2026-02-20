'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid'
import {
  InformationCircleIcon,
  IdentificationIcon,
  BanknotesIcon,
  SunIcon,
  BoltIcon,
  PaperAirplaneIcon,
  DevicePhoneMobileIcon,
  SwatchIcon,
  CheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/20/solid'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const tabs = [
  { name: 'Basics', id: 'basics', icon: InformationCircleIcon },
  { name: 'Visa & Entry', id: 'visa', icon: IdentificationIcon },
  { name: 'Money', id: 'money', icon: BanknotesIcon },
  { name: 'Weather', id: 'weather', icon: SunIcon },
  { name: 'Electrical', id: 'electrical', icon: BoltIcon },
  { name: 'Transportation', id: 'transport', icon: PaperAirplaneIcon },
  { name: 'Communications', id: 'communications', icon: DevicePhoneMobileIcon },
  { name: 'Units & Sizes', id: 'units', icon: SwatchIcon },
  { name: 'Emergency', id: 'emergency', icon: ExclamationTriangleIcon },
]

const nationalities = [
  { id: 1, name: 'United States' },
  { id: 2, name: 'United Kingdom' },
  { id: 3, name: 'Canada' },
  { id: 4, name: 'Australia' },
  { id: 5, name: 'EU Citizens' },
  { id: 6, name: 'South Korea' },
  { id: 7, name: 'China' },
  { id: 8, name: 'India' },
]

const visaData: Record<string, { visaRequired: string; duration: string; eVisa: string }> = {
  'United States': { visaRequired: 'No', duration: '90 days', eVisa: 'N/A' },
  'United Kingdom': { visaRequired: 'No', duration: '90 days', eVisa: 'N/A' },
  'Canada': { visaRequired: 'No', duration: '90 days', eVisa: 'N/A' },
  'Australia': { visaRequired: 'No', duration: '90 days', eVisa: 'N/A' },
  'EU Citizens': { visaRequired: 'No', duration: '90 days', eVisa: 'N/A' },
  'South Korea': { visaRequired: 'No', duration: '90 days', eVisa: 'N/A' },
  'China': { visaRequired: 'Yes', duration: '—', eVisa: 'No' },
  'India': { visaRequired: 'Yes', duration: '—', eVisa: 'No' },
}

const embassyData: Record<string, { embassy: string; address: string; phone: string; emergency: string; website: string; websiteUrl: string; consulates: { name: string; address: string }[] }> = {
  'United States': {
    embassy: 'US Embassy Tokyo',
    address: '1-10-5 Akasaka, Minato-ku, Tokyo 107-8420',
    phone: '03-3224-5000',
    emergency: '03-3224-5000 (same number, 24/7 operator)',
    website: 'jp.usembassy.gov',
    websiteUrl: 'https://jp.usembassy.gov/',
    consulates: [
      { name: 'US Consulate Osaka-Kobe', address: '2-11-5 Nishitenma, Kita-ku, Osaka 530-8543' },
      { name: 'US Consulate Naha (Okinawa)', address: '2-1-1 Toyama, Urasoe City, Okinawa 901-2104' },
      { name: 'US Consulate Sapporo', address: 'Kita 1-jo Nishi 28-chome, Chuo-ku, Sapporo 064-0821' },
      { name: 'US Consulate Fukuoka', address: '5-26 Ohori 2-chome, Chuo-ku, Fukuoka 810-0052' },
    ],
  },
  'United Kingdom': {
    embassy: 'British Embassy Tokyo',
    address: '1 Ichiban-cho, Chiyoda-ku, Tokyo 102-8381',
    phone: '03-5211-1100',
    emergency: '03-5211-1100 (24/7)',
    website: 'gov.uk/world/japan',
    websiteUrl: 'https://www.gov.uk/world/organisations/british-embassy-tokyo',
    consulates: [
      { name: 'British Consulate-General Osaka', address: '19F Epson Osaka Building, 3-5-1 Bakuromachi, Chuo-ku, Osaka 541-0059' },
    ],
  },
  'Canada': {
    embassy: 'Embassy of Canada Tokyo',
    address: '7-3-38 Akasaka, Minato-ku, Tokyo 107-8503',
    phone: '03-5412-6200',
    emergency: '+1-613-996-8885 (Ottawa, 24/7)',
    website: 'japan.gc.ca',
    websiteUrl: 'https://www.international.gc.ca/country-pays/japan-japon/',
    consulates: [],
  },
  'Australia': {
    embassy: 'Australian Embassy Tokyo',
    address: '2-1-14 Mita, Minato-ku, Tokyo 108-8361',
    phone: '03-5232-4111',
    emergency: '+61-2-6261-3305 (Canberra, 24/7)',
    website: 'japan.embassy.gov.au',
    websiteUrl: 'https://japan.embassy.gov.au/',
    consulates: [],
  },
  'EU Citizens': {
    embassy: 'Delegation of the European Union to Japan',
    address: 'Europa House, 4-6-28 Minami-Azabu, Minato-ku, Tokyo 106-0047',
    phone: '03-5422-6001',
    emergency: 'Contact your national embassy directly',
    website: 'eeas.europa.eu/japan',
    websiteUrl: 'https://www.eeas.europa.eu/japan/',
    consulates: [],
  },
  'South Korea': {
    embassy: 'Embassy of South Korea Tokyo',
    address: '1-2-5 Minami-Azabu, Minato-ku, Tokyo 106-0047',
    phone: '03-3452-7611',
    emergency: '03-3452-7611',
    website: 'overseas.mofa.go.kr/jp-ja',
    websiteUrl: 'https://overseas.mofa.go.kr/jp-ja/',
    consulates: [
      { name: 'Korean Consulate-General Osaka', address: '2-3-4 Nishi-Shinsaibashi, Chuo-ku, Osaka 542-0086' },
      { name: 'Korean Consulate-General Fukuoka', address: '1-1-3 Jigyohama, Chuo-ku, Fukuoka 810-0065' },
    ],
  },
  'China': {
    embassy: 'Embassy of China Tokyo',
    address: '3-4-33 Moto-Azabu, Minato-ku, Tokyo 106-0046',
    phone: '03-3403-3388',
    emergency: '03-3403-3065',
    website: 'jp.china-embassy.gov.cn',
    websiteUrl: 'http://jp.china-embassy.gov.cn/',
    consulates: [
      { name: 'Chinese Consulate-General Osaka', address: '3-9-2 Utsubo Honmachi, Nishi-ku, Osaka 550-0004' },
      { name: 'Chinese Consulate-General Fukuoka', address: '1-3-3 Jigyohama, Chuo-ku, Fukuoka 810-0065' },
      { name: 'Chinese Consulate-General Sapporo', address: 'Nishi 23-chome, Minami 13-jo, Chuo-ku, Sapporo 064-0913' },
      { name: 'Chinese Consulate-General Nagasaki', address: '10-35 Hashiguchi-machi, Nagasaki 852-8114' },
    ],
  },
  'India': {
    embassy: 'Embassy of India Tokyo',
    address: '2-2-11 Kudan-Minami, Chiyoda-ku, Tokyo 102-0074',
    phone: '03-3262-2391',
    emergency: '03-3262-2391',
    website: 'indembassy-tokyo.gov.in',
    websiteUrl: 'https://www.indembassy-tokyo.gov.in/',
    consulates: [
      { name: 'Indian Consulate-General Osaka-Kobe', address: '10F Semba IS Building, 1-9-26 Minamisemba, Chuo-ku, Osaka 542-0081' },
    ],
  },
}

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CountryPage() {
  const [activeTab, setActiveTab] = useState('basics')
  const [selectedNationality, setSelectedNationality] = useState(nationalities[0])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      {/* ============================================================
          PAGE HEADER — based on 28-with-avatar-and-actions
          ============================================================ */}
      <div className="md:flex md:items-center md:justify-between md:space-x-5">
        <div className="flex items-start space-x-5">
          <div className="shrink-0">
            <div className="relative">
              <img
                alt="Flag of Japan"
                src="https://flagcdn.com/w160/jp.png"
                className="h-16 w-auto rounded-lg"
              />
            </div>
          </div>
          <div className="pt-1.5">
            <h1 className="text-2xl font-bold text-gray-900">Japan</h1>
            <p className="text-sm font-medium text-gray-500">
              日本国 · State of Japan
            </p>
          </div>
        </div>
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
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
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

          {/* IDENTITY — based on 57-simple-in-cards */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Identity</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Capital</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Tokyo</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Population</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">125,700,000</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Government</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Constitutional Monarchy</dd>
              </div>
            </dl>
          </div>

          {/* LANGUAGE — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Language</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Official Languages</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Japanese</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Common Languages</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Japanese, English (limited)</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* RELIGION — based on 84-simple-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Religion</h3>
            <p className="mt-2 text-sm text-gray-700">Religious affiliation breakdown by percentage.</p>
            <div className="mt-5 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                    <table className="relative min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Religion
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Percentage
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Shinto</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">70.4%</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Buddhism</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">69.8%</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Christianity</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">1.5%</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Other</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">6.9%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMERGENCY — based on 57-simple-in-cards */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Emergency Numbers</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Police</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">110</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Ambulance</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">119</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Fire</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">119</dd>
              </div>
            </dl>
          </div>

          {/* QUICK REFERENCE — based on 57-simple-in-cards */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Quick Reference</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Dialing Code</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">+81</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Driving Side</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Left</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Currency</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">JPY (¥)</dd>
              </div>
            </dl>
          </div>

          {/* TIME — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Time</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Time Zone</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Japan Standard Time (JST)</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">UTC Offset</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">UTC +9:00</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">DST Observed</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">No</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Number of Time Zones</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">1</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* TRAVEL — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Travel</h3>
            <p className="mt-2 text-sm text-gray-700">Entry requirements and advisories.</p>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Required Vaccinations</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">None</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Health Insurance Required</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">No</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">US Travel Advisory</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      Level 1 — Exercise Normal Precautions ·{' '}
                      <a href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/japan-travel-advisory.html" className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">UK Travel Advisory</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      See our information and advice before you travel ·{' '}
                      <a href="https://www.gov.uk/foreign-travel-advice/japan" className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================
          VISA & ENTRY TAB
          ============================================================ */}
      {activeTab === 'visa' && (
        <div className="mt-8 space-y-10">

          {/* VISA REQUIREMENTS — based on 138-simple-custom + 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Visa Requirements</h3>
            <p className="mt-2 text-sm text-gray-700">Select your nationality to see visa requirements for Japan.</p>

            {/* Nationality selector — based on 138-simple-custom */}
            <div className="mt-5 max-w-xs">
              <Listbox value={selectedNationality} onChange={setSelectedNationality}>
                <div className="relative mt-2">
                  <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                    <span className="col-start-1 row-start-1 truncate pr-6">{selectedNationality.name}</span>
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </ListboxButton>
                  <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                  >
                    {nationalities.map((nationality) => (
                      <ListboxOption
                        key={nationality.id}
                        value={nationality}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                      >
                        <span className="block truncate font-normal group-data-selected:font-semibold">{nationality.name}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                          <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>

            {/* Visa details for selected nationality — based on 50-left-aligned-in-card */}
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Nationality</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedNationality.name}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Visa Required</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{visaData[selectedNationality.name]?.visaRequired}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Visa-Free Duration</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{visaData[selectedNationality.name]?.duration}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">eVisa Available</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{visaData[selectedNationality.name]?.eVisa}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* ENTRY REQUIREMENTS — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Entry Requirements</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Passport Validity</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Must be valid for the duration of your stay</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Return Ticket Required</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Yes — proof of onward or return travel may be requested</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Proof of Funds</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">May be requested at immigration</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Customs Declaration</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Required — form provided on arrival or via Visit Japan Web</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Arrival Card</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Yes — disembarkation card required, can be completed in advance via Visit Japan Web</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Duty-Free Allowances</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">3 bottles of alcohol (760ml each), 400 cigarettes, ¥200,000 in gifts/souvenirs</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Restricted Items</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Strict rules on medications (some OTC drugs banned), meat products, fruits, plants. Stimulant drugs including some cold medicines are prohibited.</dd>
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
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Official Immigration Website</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href="https://www.mofa.go.jp/j_info/visit/visa/index.html" className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                        Ministry of Foreign Affairs — Visa Information
                      </a>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Visit Japan Web</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href="https://www.vjw.digital.go.jp/" className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                        vjw.digital.go.jp
                      </a>
                      {' '}— Pre-register customs and immigration forms online
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Japan Customs</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href="https://www.customs.go.jp/english/" className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                        customs.go.jp
                      </a>
                      {' '}— Duty-free allowances and prohibited items
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* CONSULATES & EMBASSIES — based on 50-left-aligned-in-card, driven by nationality selector */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Consulates & Embassies</h3>
            <p className="mt-2 text-sm text-gray-700">Showing embassy information for {selectedNationality.name} citizens in Japan.</p>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Embassy</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{embassyData[selectedNationality.name]?.embassy}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Address</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{embassyData[selectedNationality.name]?.address}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Phone</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{embassyData[selectedNationality.name]?.phone}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Emergency After-Hours</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{embassyData[selectedNationality.name]?.emergency}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Website</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href={embassyData[selectedNationality.name]?.websiteUrl} className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                        {embassyData[selectedNationality.name]?.website}
                      </a>
                    </dd>
                  </div>
                  {(embassyData[selectedNationality.name]?.consulates ?? []).map((consulate, index) => (
                    <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-900">{consulate.name}</dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{consulate.address}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

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
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Japanese Yen</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Symbol</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">¥</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Currency Code</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">JPY</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Banknotes</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">¥1,000 · ¥5,000 · ¥10,000</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Coins</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">¥1 · ¥5 · ¥10 · ¥50 · ¥100 · ¥500</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* EXCHANGE — placeholder for live converter (Phase 4) */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Exchange Rate</h3>
            <div className="mt-5 overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
              <p className="text-sm text-gray-500">Live currency converter coming soon.</p>
            </div>
          </div>

          {/* TIPPING — based on 84-simple-in-card */}
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
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Restaurant</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Not expected</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">None</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Can be considered rude</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Taxi</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Not expected</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">None</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Round up is fine but not expected</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Hotel Bellhop</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Not expected</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">None</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Service is included</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Housekeeping</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Not expected</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">None</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Not customary</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Bar</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Not expected</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">None</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Not customary</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Tour Guide</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Not expected</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">None</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Not customary</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Salon</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Not expected</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">None</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Not customary</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Cash vs. Card</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Japan is still heavily cash-based, especially outside major cities. Always carry cash.</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Mobile Payment Apps</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">PayPay · Suica · Pasmo · Apple Pay (limited)</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">ATM Availability</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Widely available. 7-Eleven and Japan Post ATMs accept foreign cards.</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Foreign Card Fees</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Most ATMs charge a small fee. Many restaurants and shops are cash-only.</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* TYPICAL COSTS — based on 84-simple-in-card */}
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
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Budget Meal</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">¥800</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">~$5.50</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Mid-range Meal</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">¥2,000</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">~$13.50</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Coffee</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">¥400</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">~$2.75</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Beer (domestic)</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">¥500</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">~$3.50</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Bottle of Water</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">¥110</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">~$0.75</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Local Transit Ride</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">¥200</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">~$1.35</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LEGAL DRINKING AGE — based on 57-simple-in-cards */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Legal Drinking Age</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Minimum Age</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">20</dd>
              </div>
            </dl>
          </div>

        </div>
      )}

      {/* ============================================================
          PLACEHOLDER TABS
          ============================================================ */}
      {activeTab === 'weather' && (
        <div className="mt-8 space-y-10">

          {/* CITY SELECTOR — placeholder for Phase 5 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">City</h3>
            <div className="mt-5 overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
              <p className="text-sm text-gray-500">City selector coming soon. Showing data for Tokyo.</p>
            </div>
          </div>

          {/* CURRENT CONDITIONS — based on 57-simple-in-cards */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Current Conditions</h3>
            <p className="mt-2 text-sm text-gray-700">Live weather data for Tokyo. Updates via API.</p>
            <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Temperature</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">12°C</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Feels Like</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">9°C</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Humidity</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">55%</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Wind</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">12 km/h</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Precipitation</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0 mm</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">UV Index</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">3</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Air Quality</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Good</dd>
              </div>
            </dl>
          </div>

          {/* 7-DAY FORECAST — based on 84-simple-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">7-Day Forecast</h3>
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
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Monday</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">14°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">6°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Partly Cloudy</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">10%</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Tuesday</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">12°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">5°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Sunny</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">5%</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Wednesday</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">11°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">4°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Cloudy</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">20%</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Thursday</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">13°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">5°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Rain</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">70%</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Friday</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">15°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">7°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Sunny</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">5%</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Saturday</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">16°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">8°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Partly Cloudy</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">15%</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Sunday</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">14°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">6°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Sunny</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">5%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CLIMATE AVERAGES — based on 84-simple-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Climate Averages</h3>
            <p className="mt-2 text-sm text-gray-700">Monthly averages for Tokyo.</p>
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
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Sunny Days
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Note
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Jan</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">10°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">1°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">52</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">52%</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">19</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Dry and cold</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Feb</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">11°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">2°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">56</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">53%</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">17</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Dry and cold</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Mar</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">14°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">4°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">117</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">58%</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">16</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Cherry blossom season begins</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Apr</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">19°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">9°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">125</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">62%</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">15</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Peak cherry blossom</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">May</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">23°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">14°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">138</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">65%</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">15</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Warm and pleasant</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Jun</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">26°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">18°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">168</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">75%</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">11</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Rainy season (tsuyu)</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Jul</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">30°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">22°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">154</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">77%</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">13</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Hot and humid</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Aug</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">31°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">23°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">168</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">73%</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">14</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Peak typhoon season</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Sep</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">27°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">19°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">210</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">73%</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">12</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Typhoon season continues</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Oct</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">22°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">14°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">198</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">68%</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">14</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Autumn foliage begins</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Nov</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">17°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">8°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">93</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">63%</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">16</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Peak autumn foliage</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Dec</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">12°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">3°C</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">51</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">56%</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">18</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Dry and cold</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEASONS — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Seasons</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Rainy Season</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Early June to mid-July (tsuyu)</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Typhoon Season</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">August to October</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Snow Season</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">December to March (northern regions and mountains)</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Best Months to Visit</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">March–May (spring) and October–November (autumn)</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Worst Months to Visit</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Late June–August (hot, humid, rainy, typhoons)</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* PACKING GUIDANCE — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Packing Guidance</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Temperature</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Layers recommended. Cold winters, hot summers.</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Rain</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Compact umbrella essential, especially June–September.</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">UV Protection</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Sunscreen recommended May–September. UV index can reach 8+.</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Humidity</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">High humidity June–September. Expect to sweat outdoors. Light, breathable fabrics recommended.</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

        </div>
      )}
      {activeTab === 'electrical' && (
        <div className="mt-8 space-y-10">

          {/* PLUG TYPES — based on 107-images-with-details */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Plug Types</h3>
            <ul role="list" className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              <li className="relative">
                <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600">
                  <img
                    alt="Type A plug diagram"
                    src="https://www.worldstandards.eu/WordPress/wp-content/uploads/electricity-type-A-plug-300x300.jpg"
                    className="pointer-events-none aspect-10/7 rounded-lg object-cover outline -outline-offset-1 outline-black/5 group-hover:opacity-75"
                  />
                </div>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                  Type A
                </p>
                <p className="pointer-events-none block text-sm font-medium text-gray-500">Two flat parallel pins</p>
              </li>
              <li className="relative">
                <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600">
                  <img
                    alt="Type B plug diagram"
                    src="https://www.worldstandards.eu/WordPress/wp-content/uploads/electricity-type-B-plug-300x300.jpg"
                    className="pointer-events-none aspect-10/7 rounded-lg object-cover outline -outline-offset-1 outline-black/5 group-hover:opacity-75"
                  />
                </div>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                  Type B
                </p>
                <p className="pointer-events-none block text-sm font-medium text-gray-500">Two flat parallel pins + grounding pin</p>
              </li>
            </ul>
          </div>

          {/* POWER — based on 57-simple-in-cards */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Power</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Voltage</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">100V</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Frequency</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">50/60Hz</dd>
              </div>
            </dl>
          </div>

          {/* WHAT YOU NEED — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">What You Need</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Adapter Needed</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Depends on home country. US plugs fit without adapter. UK/EU plugs require adapter.</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Voltage Converter Needed</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Most modern electronics (phones, laptops) are dual-voltage (100–240V) and work fine. Check your device label. Hair dryers and curling irons may need a converter.</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Adapter Recommendation</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Universal travel adapter with Type A support</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">USB Charging</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Widespread. Hotels, cafes, trains, and airports commonly have USB ports.</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

        </div>
      )}
      {activeTab === 'transport' && (
        <div className="mt-8 space-y-10">

          {/* AIRPORTS — based on 84-simple-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Airports</h3>
            <div className="mt-5 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                    <table className="relative min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Airport
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            IATA
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Distance to City
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Transport Options
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Narita International</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">NRT</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">60 km to Tokyo</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Narita Express (¥3,070, 60 min) · Limousine Bus (¥3,200, 85 min) · Skyliner (¥2,520, 36 min to Ueno)</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Haneda International</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">HND</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">15 km to Tokyo</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Tokyo Monorail (¥500, 18 min) · Keikyu Line (¥300, 20 min) · Limousine Bus · Taxi (~¥6,000)</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Kansai International</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">KIX</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">50 km to Osaka</td>
                          <td className="px-3 py-4 text-sm text-gray-500">Haruka Express (¥2,910, 50 min) · Nankai Rapi:t (¥1,450, 38 min) · Limousine Bus</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TAXIS & RIDE-HAILING — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Taxis & Ride-Hailing</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Ride-Hailing Apps</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">GO Taxi · Uber (limited, mainly Tokyo) · DiDi · S.Ride</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Taxi Availability</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Widely available in cities. Flag down on the street or find at taxi stands. Doors open and close automatically.</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* PUBLIC TRANSPORTATION — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Public Transportation</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Transit Systems</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Subway/Metro · JR Lines · Private Railways · Bus · Tram (select cities) · Ferry</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Transit Card</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Suica · Pasmo · ICOCA</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Where to Buy</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Station ticket machines, staffed ticket counters, or add to Apple Wallet (Suica)</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Contactless Payment</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Yes. IC cards accepted on virtually all trains and buses.</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Intercity Options</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Shinkansen (bullet train) · Highway buses · Domestic flights (ANA, JAL, Peach, Jetstar Japan)</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* DRIVING — based on 57-simple-in-cards */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Driving</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Drives On</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Left</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">IDP Required</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Yes</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Road Conditions</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Excellent</dd>
              </div>
            </dl>
          </div>

        </div>
      )}
      {activeTab === 'communications' && (
        <div className="mt-8 space-y-10">

          {/* PHONE — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Phone</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Country Dialing Code</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">+81</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Phone Number Format</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">0X-XXXX-XXXX (landline) · 0X0-XXXX-XXXX (mobile)</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Phone Number Length</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">10–11 digits</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">How to Dial Locally</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Dial the full number including area code (e.g., 03-XXXX-XXXX for Tokyo)</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">How to Dial Internationally</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">+81 + area code (drop leading 0) + number (e.g., +81 3-XXXX-XXXX)</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* MOBILE DATA — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Mobile Data</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Major Carriers</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">NTT Docomo · au (KDDI) · SoftBank · Rakuten Mobile</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">eSIM Available</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Yes</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">eSIM Providers</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Airalo · Ubigi · Holafly · Mobal</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">SIM Card Purchase</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Airport kiosks (Narita, Haneda, Kansai) · Electronics stores (Bic Camera, Yodobashi) · Convenience stores</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">SIM Requirements</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Passport required for purchase</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Network Standards</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">4G LTE nationwide · 5G expanding in major cities</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Prepaid Plan Cost</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">~¥3,000–5,000 for 7–30 days with 3–10 GB data</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* APPS & ACCESS — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Apps & Access</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Popular Messaging Apps</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">LINE (dominant) · WhatsApp (used by foreigners) · iMessage</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">VPN Needed</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">No</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Blocked Services</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">None. All major services (Google, Facebook, Instagram, YouTube, etc.) are accessible.</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

        </div>
      )}
      {activeTab === 'units' && (
        <div className="mt-8 space-y-10">

          {/* MEASUREMENT SYSTEM — based on 57-simple-in-cards */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Measurement System</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">System</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Metric</dd>
              </div>
            </dl>
          </div>

          {/* CONVERTERS — placeholder for Phase 4 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Unit Converters</h3>
            <p className="mt-2 text-sm text-gray-700">Temperature, distance, weight, volume, and height converters.</p>
            <div className="mt-5 overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
              <p className="text-sm text-gray-500">Interactive unit converters coming soon.</p>
            </div>
          </div>

          {/* CLOTHING SIZES — WOMEN'S — based on 84-simple-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Women&apos;s Clothing Sizes</h3>
            <div className="mt-5 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                    <table className="relative min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">US</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">EU</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">UK</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Japan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">XS (0–2)</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">32–34</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">4–6</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">5–7 (SS)</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">S (4–6)</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">36–38</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">8–10</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">9–11 (S)</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">M (8–10)</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">40–42</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">12–14</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">13–15 (M)</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">L (12–14)</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">44–46</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">16–18</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">17–19 (L)</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">XL (16–18)</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">48–50</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">20–22</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">21–23 (LL)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CLOTHING SIZES — MEN'S — based on 84-simple-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Men&apos;s Clothing Sizes</h3>
            <div className="mt-5 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                    <table className="relative min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">US</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">EU</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">UK</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Japan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">XS (34)</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">44</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">34</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">SS</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">S (36)</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">46</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">36</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">S</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">M (38–40)</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">48–50</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">38–40</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">M</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">L (42–44)</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">52–54</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">42–44</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">L</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">XL (46)</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">56</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">46</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">LL</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SHOE SIZES — based on 84-simple-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Shoe Sizes</h3>
            <p className="mt-2 text-sm text-gray-700">Men&apos;s and women&apos;s shoe size conversions.</p>
            <div className="mt-5 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                    <table className="relative min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">US Men</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">US Women</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">EU</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">UK</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Japan (cm)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">7</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">8.5</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">40</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">6.5</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">25</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">8</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">9.5</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">41</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">7.5</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">26</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">9</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">10.5</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">42</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">8.5</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">27</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">10</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">11.5</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">43</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">9.5</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">28</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">11</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">12.5</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">44</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">10.5</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">29</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">12</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">13.5</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">45</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">11.5</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">30</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORMATTING — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Formatting</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Date Format</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">YYYY/MM/DD</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Number Format</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Comma for thousands, period for decimals (1,000.00)</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Time Format</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">24-hour (common) and 12-hour (also used)</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Paper Size</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">A4 (and B-series sizes unique to Japan)</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================
          EMERGENCY TAB
          ============================================================ */}
      {activeTab === 'emergency' && (
        <div className="mt-8 space-y-10">

          {/* EMERGENCY NUMBERS — based on 57-simple-in-cards */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Emergency Numbers</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Police</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">110</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Ambulance</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">119</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Fire</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">119</dd>
              </div>
            </dl>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Tourist Police</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">N/A</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Roadside Assistance (JAF)</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">#8139</dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">Coast Guard</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">118</dd>
              </div>
            </dl>
          </div>

          {/* CONSULATES & EMBASSIES — based on 50-left-aligned-in-card, driven by nationality selector */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Your Embassy</h3>
            <p className="mt-2 text-sm text-gray-700">Showing embassy information for {selectedNationality.name} citizens in Japan. Change nationality in the Visa & Entry tab.</p>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Embassy</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{embassyData[selectedNationality.name]?.embassy}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Address</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{embassyData[selectedNationality.name]?.address}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Phone</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{embassyData[selectedNationality.name]?.phone}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Emergency After-Hours</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{embassyData[selectedNationality.name]?.emergency}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Website</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <a href={embassyData[selectedNationality.name]?.websiteUrl} className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                        {embassyData[selectedNationality.name]?.website}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* MAJOR HOSPITALS — based on 84-simple-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Major Hospitals</h3>
            <p className="mt-2 text-sm text-gray-700">Hospitals in Tokyo recommended for foreign visitors.</p>
            <div className="mt-5 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                    <table className="relative min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Hospital</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">English Staff</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">24hr ER</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">St. Luke&apos;s International Hospital</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Yes</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Yes</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">03-3541-5151</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">Tokyo Medical and Surgical Clinic</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Yes</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">No</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">03-3436-3028</td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">National Center for Global Health and Medicine</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Yes</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">Yes</td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">03-3202-7181</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HEALTH — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Health</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Required Vaccinations</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">None</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Recommended Vaccinations</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Routine vaccinations (MMR, tetanus). Hepatitis A and B recommended for longer stays.</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Health Insurance Required for Entry</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">No</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Travel Insurance Recommended</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Yes — medical costs in Japan are high for uninsured visitors. Travel insurance with medical coverage is strongly recommended.</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Tap Water</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Safe to drink throughout Japan</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Common Health Risks</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Heat exhaustion in summer (June–September), cedar pollen allergies (February–April), earthquakes year-round</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* TRAVEL ADVISORIES — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">Travel Advisories</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">US Travel Advisory</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      Level 1 — Exercise Normal Precautions ·{' '}
                      <a href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/japan-travel-advisory.html" className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">UK Travel Advisory</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                      See our information and advice before you travel ·{' '}
                      <a href="https://www.gov.uk/foreign-travel-advice/japan" className="font-medium text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* WHAT TO DO IF... — based on 50-left-aligned-in-card */}
          <div>
            <h3 className="text-base font-semibold text-gray-900">What To Do If...</h3>
            <div className="mt-5 overflow-hidden bg-white shadow-sm sm:rounded-lg">
              <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Lost or Stolen Passport</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">File a police report at the nearest koban (police box). Contact your embassy for an emergency travel document. Bring a photocopy of your passport if available.</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Medical Emergency</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Call 119 for an ambulance. For non-emergency English medical assistance, call AMDA International Medical Information Center at 03-6233-9266.</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Crime Victim</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Call 110 for police. Visit the nearest koban (police box) to file a report. For English assistance, call Japan Helpline at 0570-000-911 (24/7).</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Natural Disaster</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">Japan has frequent earthquakes and typhoons. Download the Safety Tips app (multilingual disaster alerts). Follow NHK World for English-language updates. Register with your embassy for emergency notifications.</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* DISCLAIMER */}
          <div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
              <p className="text-sm text-gray-500">This information is for reference only. In any emergency, contact local emergency services immediately. Always verify embassy and hospital details before travel.</p>
            </div>
          </div>

        </div>
      )}

    </div>
  )
}
