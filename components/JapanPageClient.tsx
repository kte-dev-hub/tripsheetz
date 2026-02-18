"use client";

import { useEffect, useState } from "react";
import { TabBar, type TabId } from "@/components/TabBar";
import { BasicsTab } from "@/components/tabs/BasicsTab";
import { MoneyTab } from "@/components/tabs/MoneyTab";
import { WeatherTab } from "@/components/tabs/WeatherTab";
import { ElectricalTab } from "@/components/tabs/ElectricalTab";
import { TransportTab } from "@/components/tabs/TransportTab";
import { CommunicationsTab } from "@/components/tabs/CommunicationsTab";
import { UnitsSizesTab } from "@/components/tabs/UnitsSizesTab";

const TAB_MAP: Record<TabId, React.ReactNode> = {
  basics: <BasicsTab />,
  money: <MoneyTab />,
  weather: <WeatherTab />,
  electrical: <ElectricalTab />,
  transport: <TransportTab />,
  communications: <CommunicationsTab />,
  units: <UnitsSizesTab />,
};

const TAB_IDS: TabId[] = [
  "basics",
  "money",
  "weather",
  "electrical",
  "transport",
  "communications",
  "units",
];

function hashToTabId(hash: string): TabId {
  const id = hash.replace(/^#/, "") as TabId;
  return TAB_IDS.includes(id) ? id : "basics";
}

export function JapanPageClient() {
  const [activeTab, setActiveTab] = useState<TabId>("basics");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const fromHash = hashToTabId(window.location.hash);
    setActiveTab(fromHash);
    const onHashChange = () => setActiveTab(hashToTabId(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [mounted]);

  return (
    <>
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
      <div id="tab-content">{TAB_MAP[activeTab]}</div>
    </>
  );
}
