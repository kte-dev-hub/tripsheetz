const FLAG_CDN = "https://hatscripts.github.io/circle-flags/flags";

type CountryHeaderProps = {
  name: string;
  officialName: string;
  countryCode: string;
};

export function CountryHeader({
  name,
  officialName,
  countryCode,
}: CountryHeaderProps) {
  const flagSrc = `${FLAG_CDN}/${countryCode}.svg`;
  return (
    <header className="border-b border-gray-200 bg-white px-4 pb-6 pt-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-6">
          <img
            src={flagSrc}
            alt={`${name} flag`}
            className="h-20 w-20 shrink-0 object-cover sm:h-24 sm:w-28"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
            <p className="mt-1 text-sm text-gray-500">{officialName}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
