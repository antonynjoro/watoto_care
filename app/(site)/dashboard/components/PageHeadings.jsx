
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/20/solid";

export function PageHeadingWithAction({
  pages,
  title,
  primaryAction,
  secondaryAction,
}) {
  const router = useRouter();
  return (
    <div className="pb-6">
      <div>
        <nav className="sm:hidden" aria-label="Back">
          <Link
            href="#"
            onClick={() => router.back()}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ChevronLeftIcon
              className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            Back
          </Link>
        </nav>
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            {pages.map((page) => (
              <li key={page.name} className="group ">
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400 group-first:hidden"
                    aria-hidden="true"
                  />
                  <Link
                    href={page.current ? "" : page.href}
                    className="ml-4 group-first:ml-0 text-sm font-medium text-gray-500 hover:text-gray-700"
                    aria-current={page.current ? "page" : undefined}
                  >
                    {page.name}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
        </div>
        <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
          {secondaryAction && (
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={secondaryAction.handleSecondaryAction}
            >
              {secondaryAction.name}
            </button>
          )}
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-irleeblack shadow-sm hover:bg-gray-700 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal-600 "
            onClick={primaryAction.handlePrimaryAction}
          >
            {primaryAction.name}
          </button>
        </div>
      </div>
    </div>
  );
}

PageHeadingWithAction.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      current: PropTypes.bool.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  primaryAction: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handlePrimaryAction: PropTypes.func.isRequired,
  }).isRequired,
  secondaryAction: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handleSecondaryAction: PropTypes.func.isRequired,
  }),
};

export function PageHeading({
  pages,
  title,
  primaryAction,
  secondaryAction,
}) {
  const router = useRouter();
  return (
    <div className="pb-6">
      <div>
        <nav className="sm:hidden" aria-label="Back">
          <Link
            href="#"
            onClick={() => router.back()}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ChevronLeftIcon
              className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            Back
          </Link>
        </nav>
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            {pages.map((page) => (
              <li key={page.name} className="group ">
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400 group-first:hidden"
                    aria-hidden="true"
                  />
                  <Link
                    href={page.current ? "" : page.href}
                    className="ml-4 group-first:ml-0 text-sm font-medium text-gray-500 hover:text-gray-700"
                    aria-current={page.current ? "page" : undefined}
                  >
                    {page.name}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
        </div>
        
      </div>
    </div>
  );
}

PageHeading.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      current: PropTypes.bool.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

