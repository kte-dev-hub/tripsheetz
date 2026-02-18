type Item = { label: string; value: string | React.ReactNode };
type DescriptionListStripedProps = {
  title?: string;
  description?: string;
  items: Item[];
};

export function DescriptionListStriped({
  title,
  description,
  items,
}: DescriptionListStripedProps) {
  return (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
      {(title || description) && (
        <div className="px-4 py-6 sm:px-6">
          {title && (
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
      <div className={title || description ? "border-t border-gray-100" : ""}>
        <dl className="divide-y divide-gray-100">
          {items.map(({ label, value }, index) => (
            <div
              key={label}
              className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
            >
              <dt className="text-sm font-medium text-gray-900">{label}</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
