export default function Example({
  heading,
  subheading,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonLink,
  secondaryButtonLink,
}) {
  return (
    <div className="relative isolate my-6 overflow-hidden bg-floral_white-50 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16 text-gray-900">
      <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight  sm:text-4xl">
        {heading}
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-800">
        {subheading}
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href={primaryButtonLink}
          className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          {primaryButtonText}
        </a>
        {secondaryButtonLink && secondaryButtonText && (
          <a
            href={secondaryButtonLink}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {secondaryButtonText} <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left- top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
            <stop stopColor="#ed4a09" />
            <stop offset={1} stopColor="#ed4a09" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
