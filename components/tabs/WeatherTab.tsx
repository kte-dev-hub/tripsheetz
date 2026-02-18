import { StatCards } from "@/components/ui/StatCards";
import { DescriptionListCard } from "@/components/ui/DescriptionListCard";
import { DataTable } from "@/components/ui/DataTable";

const CITIES = ["Tokyo", "Osaka", "Kyoto", "Sapporo", "Okinawa"];

const CLIMATE_ROWS = [
  ["Jan", "10", "1", "52", "53", "19"],
  ["Feb", "10", "2", "56", "53", "17"],
  ["Mar", "14", "5", "118", "58", "16"],
  ["Apr", "19", "10", "125", "62", "15"],
  ["May", "23", "15", "138", "66", "14"],
  ["Jun", "26", "19", "168", "74", "11"],
  ["Jul", "29", "23", "154", "77", "13"],
  ["Aug", "31", "24", "168", "74", "13"],
  ["Sep", "27", "21", "210", "73", "12"],
  ["Oct", "22", "15", "198", "66", "14"],
  ["Nov", "17", "9", "93", "61", "16"],
  ["Dec", "12", "4", "51", "55", "19"],
];

export function WeatherTab() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold text-gray-900">City</h3>
        <select
          className="mt-3 w-full max-w-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
          aria-label="Select city"
          defaultValue="Tokyo"
        >
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <StatCards
        title="Current Conditions"
        stats={[
          { name: "Temperature", stat: "12°C (54°F)" },
          { name: "Feels Like", stat: "9°C (48°F)" },
          { name: "Humidity", stat: "45%" },
          { name: "Wind", stat: "15 km/h" },
          { name: "UV Index", stat: "3 (Moderate)" },
          { name: "Air Quality", stat: "Good" },
        ]}
      />

      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold text-gray-900">7-Day Forecast</h3>
        <p className="mt-1 text-sm text-gray-500">7-day forecast coming soon</p>
      </div>

      <DataTable
        title="Climate Averages — Tokyo"
        headers={["Month", "High °C", "Low °C", "Rain mm", "Humidity %", "Sunny Days"]}
        rows={CLIMATE_ROWS}
        hideColumnsOnMobile={[3, 4, 5]}
      />

      <DescriptionListCard
        title="Seasons"
        items={[
          { label: "Rainy Season", value: "June–July (tsuyu)" },
          { label: "Typhoon Season", value: "August–October" },
          {
            label: "Snow Season",
            value: "December–March (northern regions)",
          },
          {
            label: "Best Months",
            value:
              "March–May (cherry blossom), October–November (autumn leaves)",
          },
          {
            label: "Worst Months",
            value: "Late June–August (hot, humid, rainy)",
          },
        ]}
      />

      <DescriptionListCard
        title="Packing Guidance"
        items={[
          {
            label: "Temperature",
            value:
              "Pack layers — mornings and evenings are cool, afternoons warm",
          },
          {
            label: "Rain",
            value:
              "Compact umbrella essential during rainy season (June–July)",
          },
          {
            label: "UV",
            value:
              "Moderate — sunscreen recommended for extended outdoor activities",
          },
          {
            label: "Humidity",
            value:
              "High in summer — lightweight, breathable fabrics recommended",
          },
        ]}
      />
    </div>
  );
}
