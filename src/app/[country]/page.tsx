import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { InformationCircleIcon, BanknotesIcon, SunIcon, BoltIcon, TruckIcon, DevicePhoneMobileIcon, SwatchIcon } from '@heroicons/react/20/solid'

const tabs = [
  { name: 'Basics', href: '#', icon: InformationCircleIcon, current: true },
  { name: 'Money', href: '#money', icon: BanknotesIcon, current: false },
  { name: 'Weather', href: '#weather', icon: SunIcon, current: false },
  { name: 'Electrical', href: '#electrical', icon: BoltIcon, current: false },
  { name: 'Transport', href: '#transport', icon: TruckIcon, current: false },
  { name: 'Communications', href: '#communications', icon: DevicePhoneMobileIcon, current: false },
  { name: 'Units & Sizes', href: '#units', icon: SwatchIcon, current: false },
]

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CountryPage() {
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
            defaultValue="Basics"
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
                <a
                  key={tab.name}
                  href={tab.href}
                  aria-current={tab.current ? 'page' : undefined}
                  className={classNames(
                    tab.current
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                  )}
                >
                  <tab.icon
                    aria-hidden="true"
                    className={classNames(
                      tab.current
                        ? 'text-indigo-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-2 -ml-0.5 size-5',
                    )}
                  />
                  <span>{tab.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* ============================================================
          BASICS TAB CONTENT
          ============================================================ */}
      <div className="mt-8 space-y-10">

        {/* --------------------------------------------------------
            IDENTITY — based on 57-simple-in-cards
            -------------------------------------------------------- */}
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

        {/* --------------------------------------------------------
            LANGUAGE — based on 50-left-aligned-in-card
            -------------------------------------------------------- */}
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div className="px-4 py-6 sm:px-6">
            <h3 className="text-base/7 font-semibold text-gray-900">Language</h3>
          </div>
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

        {/* --------------------------------------------------------
            RELIGION — based on 84-simple-in-card
            -------------------------------------------------------- */}
        <div>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold text-gray-900">Religion</h1>
              <p className="mt-2 text-sm text-gray-700">Religious affiliation breakdown by percentage.</p>
            </div>
          </div>
          <div className="mt-8 flow-root">
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

        {/* --------------------------------------------------------
            EMERGENCY — based on 57-simple-in-cards
            -------------------------------------------------------- */}
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

        {/* --------------------------------------------------------
            QUICK REFERENCE — based on 57-simple-in-cards
            -------------------------------------------------------- */}
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

        {/* --------------------------------------------------------
            TIME — based on 50-left-aligned-in-card
            -------------------------------------------------------- */}
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div className="px-4 py-6 sm:px-6">
            <h3 className="text-base/7 font-semibold text-gray-900">Time</h3>
          </div>
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

        {/* --------------------------------------------------------
            TRAVEL — based on 50-left-aligned-in-card
            -------------------------------------------------------- */}
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div className="px-4 py-6 sm:px-6">
            <h3 className="text-base/7 font-semibold text-gray-900">Travel</h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Entry requirements and advisories.</p>
          </div>
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
  )
}
