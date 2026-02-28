import { getSupabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import CountryPage from './CountryPage'
import CountrySheet from './CountrySheet'

export default async function Page({ params }: { params: Promise<{ country: string }> }) {
  const { country: slug } = await params

  const { data: country } = await getSupabase()
    .from('countries')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!country) {
    notFound()
  }

  const countryCode = country.iso_alpha2

  const { data: visaRequirements } = await getSupabase()
    .from('visa_requirements')
    .select('*')
    .eq('destination_code', countryCode)

  const { data: entryRequirements } = await getSupabase()
    .from('entry_requirements')
    .select('*')
    .eq('country_code', countryCode)
    .single()

  const { data: embassies } = await getSupabase()
    .from('embassies')
    .select('*')
    .eq('country_code', countryCode)

  const { data: governmentResources } = await getSupabase()
    .from('government_resources')
    .select('*')
    .eq('country_code', countryCode)

  const { data: currency } = await getSupabase()
    .from('currencies')
    .select('*')
    .eq('country_code', countryCode)
    .single()

  const { data: paymentMethods } = await getSupabase()
    .from('payment_methods')
    .select('*')
    .eq('country_code', countryCode)
    .single()

  const { data: tippingCustoms } = await getSupabase()
    .from('tipping_customs')
    .select('*')
    .eq('country_code', countryCode)

  const { data: averageCosts } = await getSupabase()
    .from('average_costs')
    .select('*')
    .eq('country_code', countryCode)

  const { data: taxRefund } = await getSupabase()
    .from('tax_refund')
    .select('*')
    .eq('country_code', countryCode)
    .single()

  const { data: countryElectrical } = await getSupabase()
    .from('country_electrical')
    .select('*')
    .eq('country_code', countryCode)
    .single()

  const { data: plugTypes } = await getSupabase()
    .from('plug_types')
    .select('*')

  const { data: electricalTemplates } = await getSupabase()
    .from('electrical_templates')
    .select('*')

  const { data: allCountryElectrical } = await getSupabase()
    .from('country_electrical')
    .select('country_code, plug_types, voltage, frequency')

  const { data: currencyReferenceData } = await getSupabase()
    .from('currency_reference')
    .select('currency_code, currency_name, currency_symbol')

  const { data: allCountries } = await getSupabase()
    .from('countries')
    .select('id, name, iso_alpha2, currency_code')

  const { data: airportsData } = await getSupabase()
    .from('airports')
    .select('*')
    .eq('country_code', country.iso_alpha2)
    .order('display_order', { ascending: true })

  const { data: taxisRidehailingData } = await getSupabase()
    .from('taxis_ridehailing')
    .select('*')
    .eq('country_code', country.iso_alpha2)
    .single()

  const { data: publicTransitData } = await getSupabase()
    .from('public_transit')
    .select('*')
    .eq('country_code', country.iso_alpha2)
    .single()

  const { data: drivingData } = await getSupabase()
    .from('driving')
    .select('*')
    .eq('country_code', country.iso_alpha2)
    .single()

  const { data: phoneInfoData } = await getSupabase()
    .from('phone_info')
    .select('*')
    .eq('country_code', country.iso_alpha2)
    .single()

  const { data: mobileDataData } = await getSupabase()
    .from('mobile_data')
    .select('*')
    .eq('country_code', country.iso_alpha2)
    .single()

  const { data: appsAccessData } = await getSupabase()
    .from('apps_access')
    .select('*')
    .eq('country_code', country.iso_alpha2)
    .single()

  const { data: religionsData } = await getSupabase()
    .from('religions')
    .select('*')
    .eq('country_code', country.iso_alpha2)
    .order('display_order', { ascending: true })

  const { data: countryTimezonesData } = await getSupabase()
    .from('country_timezones')
    .select('*')
    .eq('country_code', country.iso_alpha2)
    .order('display_order', { ascending: true })

  const { data: emergencyNumbersData } = await getSupabase()
    .from('emergency_numbers')
    .select('*')
    .eq('country_code', country.iso_alpha2)
    .single()

  const { data: travelAdvisoryData } = await getSupabase()
    .from('travel_advisories')
    .select('*')
    .eq('country_code', country.iso_alpha2)
    .single()

  const { data: healthSafetyData } = await getSupabase()
    .from('health_safety')
    .select('*')
    .eq('country_code', country.iso_alpha2)
    .single()

  return (
    <>
    <CountryPage
      country={country}
      allCountries={allCountries ?? []}
      visaRequirements={visaRequirements ?? []}
      entryRequirements={entryRequirements ?? null}
      governmentResources={governmentResources ?? []}
      currency={currency ?? null}
      paymentMethods={paymentMethods ?? null}
      tippingCustoms={tippingCustoms ?? []}
      averageCosts={averageCosts ?? []}
      taxRefund={taxRefund ?? null}
      currencyReference={currencyReferenceData ?? []}
      phoneInfo={phoneInfoData ?? null}
      mobileData={mobileDataData ?? null}
      appsAccess={appsAccessData ?? null}
      countryTimezones={countryTimezonesData ?? []}
      airports={airportsData ?? []}
      taxisRidehailing={taxisRidehailingData ?? null}
      publicTransit={publicTransitData ?? null}
      driving={drivingData ?? null}
      countryElectrical={countryElectrical ?? null}
      plugTypes={plugTypes ?? []}
      electricalTemplates={electricalTemplates ?? []}
      allCountryElectrical={allCountryElectrical ?? []}
      religions={religionsData ?? []}
    />
    </>
  )
}
