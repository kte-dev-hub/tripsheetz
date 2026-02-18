import { Ruler } from "lucide-react";
import { StatWithIcon } from "@/components/ui/StatWithIcon";
import { DataTable } from "@/components/ui/DataTable";
import { DescriptionListStriped } from "@/components/ui/DescriptionListStriped";

const WOMENS_TOPS = [
  ["XS (2)", "34", "6", "7"],
  ["S (4-6)", "36-38", "8-10", "9-11"],
  ["M (8-10)", "40-42", "12-14", "13-15"],
  ["L (12-14)", "44-46", "16-18", "17-19"],
];

const MENS_TOPS = [
  ["S (34-36)", "44-46", "34-36", "S"],
  ["M (38-40)", "48-50", "38-40", "M"],
  ["L (42-44)", "52-54", "42-44", "L"],
  ["XL (46)", "56", "46", "LL/XL"],
];

const SHOES_MENS = [
  ["7", "40", "6.5", "25"],
  ["8", "41", "7.5", "26"],
  ["9", "42", "8.5", "27"],
  ["10", "43", "9.5", "28"],
  ["11", "44.5", "10.5", "29"],
];

export function UnitsSizesTab() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <StatWithIcon
        title="Measurement System"
        stats={[{ name: "System", stat: "Metric", icon: Ruler }]}
      />

      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold text-gray-900">Converters</h3>
        <p className="mt-1 text-sm text-gray-500">Unit converters coming soon</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {["Temperature", "Distance", "Weight", "Volume", "Height"].map(
            (label) => (
              <div
                key={label}
                className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3"
              >
                <span className="text-sm font-medium text-gray-500">
                  {label}
                </span>
                <div className="mt-2 h-9 rounded border border-gray-200 bg-white" />
              </div>
            )
          )}
        </div>
      </div>

      <DataTable
        title="Women's Tops"
        headers={["US", "EU", "UK", "JP"]}
        rows={WOMENS_TOPS}
        hideColumnsOnMobile={[2]}
      />
      <DataTable
        title="Men's Tops"
        headers={["US", "EU", "UK", "JP"]}
        rows={MENS_TOPS}
        hideColumnsOnMobile={[2]}
      />
      <DataTable
        title="Shoes (Men's)"
        headers={["US", "EU", "UK", "JP (cm)"]}
        rows={SHOES_MENS}
        hideColumnsOnMobile={[2]}
      />

      <DescriptionListStriped
        title="Formatting"
        items={[
          { label: "Date Format", value: "YYYY/MM/DD" },
          {
            label: "Number Format",
            value:
              "1,000.00 (comma for thousands, period for decimal)",
          },
          {
            label: "Time Format",
            value: "24-hour (common) and 12-hour (also used)",
          },
          {
            label: "Paper Size",
            value: "A4 (JIS B sizes also used)",
          },
        ]}
      />
    </div>
  );
}
