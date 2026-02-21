import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import CountrySheet from './CountrySheet'

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country: slug } = await params

  const { data: country } = await supabase
    .from('countries')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!country) {
    notFound()
  }

  const countryCode = country.iso_alpha2

  const { data: visaRequirements } = await supabase
    .from('visa_requirements')
    .select('*')
    .eq('destination_code', countryCode)

  const { data: entryRequirements } = await supabase
    .from('entry_requirements')
    .select('*')
    .eq('country_code', countryCode)
    .single()

  const { data: embassies } = await supabase
    .from('embassies')
    .select('*')
    .eq('country_code', countryCode)

  const { data: governmentResources } = await supabase
    .from('government_resources')
    .select('*')
    .eq('country_code', countryCode)

  const { data: allCountries } = await supabase
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
    />
  )
}
