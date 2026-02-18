import { CountryHeader } from "@/components/CountryHeader";
import { JapanPageClient } from "@/components/JapanPageClient";

export default function JapanPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CountryHeader
        name="Japan"
        officialName="State of Japan"
        countryCode="jp"
      />
      <JapanPageClient />
    </div>
  );
}
