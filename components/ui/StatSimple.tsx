type Stat = { name: string; value: string; unit?: string };
type StatSimpleProps = {
  stats: Stat[];
  twoCol?: boolean;
};

export function StatSimple({ stats, twoCol }: StatSimpleProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm sm:rounded-lg">
      <div className="mx-auto max-w-7xl">
        <div
          className={`grid grid-cols-1 divide-y divide-gray-100 ${twoCol ? "sm:grid-cols-2 sm:divide-y-0 sm:divide-x" : "sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-3"}`}
        >
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="px-4 py-6 sm:px-6"
            >
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </span>
                {stat.unit ? (
                  <span className="text-sm text-gray-500">{stat.unit}</span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
