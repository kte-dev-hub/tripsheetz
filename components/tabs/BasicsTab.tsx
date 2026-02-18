import { Shield, Heart, Flame } from "lucide-react";
import { StatCards } from "@/components/ui/StatCards";
import { DescriptionListCard } from "@/components/ui/DescriptionListCard";
import { DescriptionListStriped } from "@/components/ui/DescriptionListStriped";
import { DescriptionListTwoCol } from "@/components/ui/DescriptionListTwoCol";
import { StatWithIcon } from "@/components/ui/StatWithIcon";
import { JSTClock } from "./JSTClock";

export function BasicsTab() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <StatCards
        title="Identity"
        stats={[
          { name: "Capital", stat: "Tokyo" },
          { name: "Population", stat: "125,700,000" },
          { name: "Government", stat: "Constitutional Monarchy" },
        ]}
      />

      <DescriptionListCard
        title="Language"
        items={[
          { label: "Official Languages", value: "Japanese" },
          {
            label: "Common Languages",
            value: "Japanese, English (limited in rural areas)",
          },
        ]}
      />

      <DescriptionListStriped
        title="Religion"
        description="Percentages exceed 100% because many Japanese practice both Shinto and Buddhism"
        items={[
          { label: "Shinto", value: "70%" },
          { label: "Buddhist", value: "67%" },
          { label: "Christian", value: "1.5%" },
          { label: "Other/None", value: "26%" },
        ]}
      />

      <DescriptionListTwoCol
        title="Time"
        items={[
          { label: "Time Zone", value: "JST (Japan Standard Time)" },
          { label: "UTC Offset", value: "UTC+9" },
          { label: "DST Observed", value: "No" },
          { label: "Current Local Time", value: <JSTClock /> },
        ]}
      />

      <StatWithIcon
        title="Emergency Numbers"
        stats={[
          { name: "Police", stat: "110", icon: Shield },
          { name: "Ambulance", stat: "119", icon: Heart },
          { name: "Fire", stat: "119", icon: Flame },
        ]}
      />

      <DescriptionListTwoCol
        title="Quick Reference"
        items={[
          { label: "Dialing Code", value: "+81" },
          { label: "Driving Side", value: "Left" },
          { label: "Currency", value: "Japanese Yen (¥ JPY)" },
        ]}
      />

      <DescriptionListCard
        title="Travel"
        items={[
          {
            label: "Required Vaccinations",
            value: "None for most travelers",
          },
          {
            label: "Health Insurance Required",
            value: "No (but strongly recommended)",
          },
          {
            label: "US Travel Advisory",
            value: "Level 1 — Exercise Normal Precautions",
          },
          {
            label: "UK FCDO Advisory",
            value: "See current advice",
          },
        ]}
      />
    </div>
  );
}
