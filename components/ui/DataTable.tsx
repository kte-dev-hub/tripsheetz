type DataTableProps = {
  title: string;
  description?: string;
  headers: string[];
  rows: string[][];
  hideColumnsOnMobile?: number[];
};

export function DataTable({
  title,
  description,
  headers,
  rows,
  hideColumnsOnMobile = [],
}: DataTableProps) {
  return (
    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-gray-700">{description}</p>
        )}
      </div>

      <div className="border-t border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header, i) => (
                  <th
                    key={header}
                    scope="col"
                    className={`px-3 py-3.5 text-left text-sm font-semibold text-gray-900 first:pl-6 last:pr-6 ${hideColumnsOnMobile.includes(i) ? "hidden sm:table-cell" : ""}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={`px-3 py-4 text-sm whitespace-nowrap text-gray-500 first:pl-6 first:font-medium first:text-gray-900 last:pr-6 ${hideColumnsOnMobile.includes(cellIdx) ? "hidden sm:table-cell" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
