import { DescriptionListCard } from "@/components/ui/DescriptionListCard";
import { DescriptionListTwoCol } from "@/components/ui/DescriptionListTwoCol";
import { DataTable } from "@/components/ui/DataTable";

export function TransportTab() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <DataTable
        title="Major Airports"
        headers={["Airport", "IATA", "Distance", "Getting There"]}
        rows={[
          [
            "Narita International",
            "NRT",
            "60 km",
            "Narita Express (¥3,250, 60 min), Limousine Bus (¥3,200, 85 min)",
          ],
          [
            "Haneda (Tokyo Int'l)",
            "HND",
            "15 km",
            "Tokyo Monorail (¥500, 18 min), Keikyu Line (¥300, 20 min)",
          ],
          [
            "Kansai International",
            "KIX",
            "50 km",
            "Haruka Express (¥2,910, 75 min to Kyoto)",
          ],
        ]}
        hideColumnsOnMobile={[3]}
      />

      <DescriptionListCard
        title="Taxis & Ride-Hailing"
        items={[
          {
            label: "Ride-Hailing Apps",
            value: "Uber (limited availability), GO Taxi, S.RIDE",
          },
          {
            label: "Taxi Availability",
            value: "Widely available in cities, metered, reliable",
          },
          {
            label: "Taxi Norms",
            value:
              "Doors open/close automatically, no tipping, pay by meter",
          },
        ]}
      />

      <DescriptionListCard
        title="Public Transportation"
        items={[
          {
            label: "Metro/Subway",
            value: "Tokyo Metro + Toei Subway, Osaka Metro",
          },
          {
            label: "Transit Card",
            value: "Suica, PASMO (interchangeable)",
          },
          {
            label: "Where to Buy",
            value: "Any station vending machine or ticket counter",
          },
          {
            label: "Contactless Payment",
            value: "Yes — tap-and-go at all stations",
          },
          {
            label: "Intercity Rail",
            value:
              "Japan Rail (JR) Shinkansen bullet train, JR Pass available for tourists",
          },
        ]}
      />

      <DescriptionListTwoCol
        title="Driving"
        items={[
          { label: "Drives On", value: "Left" },
          {
            label: "IDP Required",
            value: "Yes (Japan-specific JAF translation recommended)",
          },
          {
            label: "Road Conditions",
            value: "Excellent — well-maintained, well-signed",
          },
        ]}
      />
    </div>
  );
}
