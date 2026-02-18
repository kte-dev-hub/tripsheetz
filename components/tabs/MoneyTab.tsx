import { DescriptionListCard } from "@/components/ui/DescriptionListCard";
import { DataTable } from "@/components/ui/DataTable";
import { StatSimple } from "@/components/ui/StatSimple";

export function MoneyTab() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <DescriptionListCard
        title="Currency"
        items={[
          { label: "Currency", value: "Japanese Yen" },
          { label: "Symbol", value: "¥" },
          { label: "Code", value: "JPY" },
          { label: "Banknotes", value: "¥1,000 / ¥5,000 / ¥10,000" },
          { label: "Coins", value: "¥1 / ¥5 / ¥10 / ¥50 / ¥100 / ¥500" },
        ]}
      />

      <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold text-gray-900">Exchange</h3>
        <p className="mt-1 text-sm text-gray-500">Currency converter coming soon</p>
        <input
          type="text"
          placeholder="Amount"
          className="mt-3 w-full max-w-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
          readOnly
          aria-label="Amount (placeholder)"
        />
      </div>

      <DataTable
        title="Tipping Customs"
        description="Tipping is generally not practiced in Japan"
        headers={["Context", "Expected?", "Amount", "Note"]}
        rows={[
          ["Restaurants", "No", "Not expected", "Can be considered rude"],
          ["Taxis", "No", "Not expected", "Round up not necessary"],
          ["Hotel Bellhop", "No", "Not expected", "May politely decline"],
          ["Hotel Housekeeping", "No", "Not expected", "—"],
          ["Bars", "No", "Not expected", "—"],
          ["Tour Guides", "No", "Not expected", "Small gift acceptable"],
          ["Salons", "No", "Not expected", "—"],
        ]}
        hideColumnsOnMobile={[3]}
      />

      <DescriptionListCard
        title="Paying"
        items={[
          {
            label: "Cash vs. Card",
            value:
              "Cash is still king, but card acceptance growing rapidly",
          },
          {
            label: "Mobile Payments",
            value: "Suica, PASMO, PayPay, LINE Pay",
          },
          {
            label: "ATM Availability",
            value: "7-Eleven ATMs accept foreign cards nationwide",
          },
          {
            label: "Foreign Card Fees",
            value:
              "Visa/Mastercard widely accepted at chains; small shops often cash only",
          },
          { label: "Legal Drinking Age", value: "20" },
        ]}
      />

      <StatSimple
        stats={[
          { name: "Budget Meal", value: "¥800", unit: "~$5" },
          { name: "Mid-Range Meal", value: "¥2,000", unit: "~$13" },
          { name: "Coffee", value: "¥450", unit: "~$3" },
          { name: "Beer", value: "¥500", unit: "~$3.50" },
          { name: "Water", value: "¥110", unit: "~$0.75" },
          { name: "Transit Ride", value: "¥180", unit: "~$1.20" },
        ]}
      />
    </div>
  );
}
