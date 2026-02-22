import { getSupabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import CountrySheet from './CountrySheet'

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
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

  const { data: allCountries } = await getSupabase()
    .from('countries')
    .select('id, name, iso_alpha2')

  return (
    <CountrySheet
      country={country}
      allCountries={allCountries ?? []}
      visaRequirements={visaRequirements ?? []}
      entryRequirements={entryRequirements}
      embassies={embassies ?? []}
      governmentResources={governmentResources ?? []}
      currency={currency}
      paymentMethods={paymentMethods}
      tippingCustoms={tippingCustoms ?? []}
      averageCosts={averageCosts ?? []}
      taxRefund={taxRefund}
    />
  )
}
