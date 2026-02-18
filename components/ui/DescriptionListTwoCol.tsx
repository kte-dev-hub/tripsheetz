type Item = { label: string; value: string | React.ReactNode };
type DescriptionListTwoColProps = {
  title?: string;
  description?: string;
  items: Item[];
};

export function DescriptionListTwoCol({
  title,
  description,
  items,
}: DescriptionListTwoColProps) {
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
        <dl className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2">
          {items.map(({ label, value }) => (
            <div
              key={label}
              className="px-4 py-6 sm:px-6"
            >
              <dt className="text-sm font-medium text-gray-900">{label}</dt>
              <dd className="mt-1 text-sm text-gray-700">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
