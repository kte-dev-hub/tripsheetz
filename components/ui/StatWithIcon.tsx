import type { LucideIcon } from "lucide-react";

type Stat = { name: string; stat: string; icon: LucideIcon };
type StatWithIconProps = {
  title?: string;
  stats: Stat[];
};

export function StatWithIcon({ title, stats }: StatWithIconProps) {
  return (
    <div>
      {title && (
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      )}
      <dl
        className={`mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ${title ? "" : "mt-0"}`}
      >
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <item.icon
                  aria-hidden="true"
                  className="size-6 text-white"
                />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
