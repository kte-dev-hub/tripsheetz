import { StatSimple } from "@/components/ui/StatSimple";
import { DescriptionListCard } from "@/components/ui/DescriptionListCard";

export function ElectricalTab() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
        <div className="px-4 py-6 sm:px-6">
          <h3 className="text-base font-semibold text-gray-900">Plug Types</h3>
        </div>
        <div className="border-t border-gray-100 px-4 py-6 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="text-2xl font-bold text-gray-900">Type A</p>
              <p className="mt-1 text-sm text-gray-500">
                Two flat parallel pins
              </p>
              <div className="mt-3 flex h-16 items-center justify-center rounded bg-gray-200 text-xs text-gray-500">
                Plug diagram
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="text-2xl font-bold text-gray-900">Type B</p>
              <p className="mt-1 text-sm text-gray-500">
                Two flat parallel pins + grounding pin
              </p>
              <div className="mt-3 flex h-16 items-center justify-center rounded bg-gray-200 text-xs text-gray-500">
                Plug diagram
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
        <div className="px-4 py-6 sm:px-6">
          <h3 className="text-base font-semibold text-gray-900">Power</h3>
        </div>
        <StatSimple
          stats={[
            { name: "Voltage", value: "100V" },
            { name: "Frequency", value: "50/60 Hz" },
          ]}
          twoCol
        />
      </div>

      <DescriptionListCard
        title="What You Need"
        items={[
          {
            label: "Adapter Needed",
            value: "Yes — if your home country doesn't use Type A/B",
          },
          {
            label: "Voltage Converter",
            value:
              "Check your device — Japan's 100V is lower than most countries (many modern devices are dual voltage 100–240V)",
          },
          {
            label: "USB Charging",
            value:
              "Widespread — USB outlets common in hotels, airports, trains, and cafes",
          },
        ]}
      />
    </div>
  );
}
