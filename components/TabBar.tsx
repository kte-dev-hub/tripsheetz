"use client";

import {
  Globe,
  Banknote,
  Sun,
  Zap,
  Bus,
  Smartphone,
  Ruler,
  ChevronDown,
} from "lucide-react";

const TABS = [
  { id: "basics", name: "Basics", icon: Globe, hash: "#basics" },
  { id: "money", name: "Money", icon: Banknote, hash: "#money" },
  { id: "weather", name: "Weather", icon: Sun, hash: "#weather" },
  { id: "electrical", name: "Electrical", icon: Zap, hash: "#electrical" },
  { id: "transport", name: "Transport", icon: Bus, hash: "#transport" },
  {
    id: "communications",
    name: "Comms",
    icon: Smartphone,
    hash: "#communications",
  },
  { id: "units", name: "Units", icon: Ruler, hash: "#units" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type TabBarProps = {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
};

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const currentTab = TABS.find((t) => t.id === activeTab);

  return (
    <div>
      <div className="grid grid-cols-1 sm:hidden">
        <select
          value={currentTab?.name ?? "Basics"}
          onChange={(e) => {
            const tab = TABS.find((t) => t.name === e.target.value);
            if (tab) {
              onTabChange(tab.id);
              if (typeof window !== "undefined") {
                window.history.replaceState(null, "", tab.hash);
              }
            }
          }}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        >
          {TABS.map((tab) => (
            <option key={tab.id} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {TABS.map((tab) => {
              const isCurrent = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    onTabChange(tab.id);
                    if (typeof window !== "undefined") {
                      window.history.replaceState(null, "", tab.hash);
                    }
                  }}
                  aria-current={isCurrent ? "page" : undefined}
                  className={classNames(
                    isCurrent
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium",
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className={classNames(
                      isCurrent ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
                      "mr-2 -ml-0.5 size-5",
                    )}
                  />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

export { TABS };
