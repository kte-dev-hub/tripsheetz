import { DescriptionListTwoCol } from "@/components/ui/DescriptionListTwoCol";
import { DescriptionListCard } from "@/components/ui/DescriptionListCard";
import { DescriptionListStriped } from "@/components/ui/DescriptionListStriped";

export function CommunicationsTab() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <DescriptionListTwoCol
        title="Phone"
        items={[
          { label: "Country Code", value: "+81" },
          { label: "Number Length", value: "10–11 digits" },
          { label: "Dial Locally", value: "0 + area code + number" },
          {
            label: "Dial Internationally",
            value: "+81 + number (drop leading 0)",
          },
        ]}
      />

      <DescriptionListCard
        title="Mobile Data"
        items={[
          {
            label: "Major Carriers",
            value: "NTT Docomo, au (KDDI), SoftBank",
          },
          { label: "eSIM Available", value: "Yes" },
          { label: "eSIM Providers", value: "Airalo, Ubigi, Holafly" },
          {
            label: "SIM Purchase",
            value: "Airport kiosks, BIC Camera, Yodobashi Camera",
          },
          { label: "SIM Requirements", value: "Passport required" },
          {
            label: "Network",
            value: "4G/LTE widespread, 5G in major cities",
          },
          {
            label: "Prepaid Plan",
            value: "¥3,000–5,000 for 7 days (3–5 GB)",
          },
        ]}
      />

      <DescriptionListStriped
        title="Apps & Access"
        items={[
          {
            label: "Popular Messaging",
            value: "LINE (dominant — used by nearly everyone)",
          },
          { label: "VPN Needed", value: "No" },
          { label: "Blocked Services", value: "None" },
          {
            label: "Free WiFi",
            value:
              "Available at convenience stores, train stations, hotels — quality varies",
          },
        ]}
      />
    </div>
  );
}
