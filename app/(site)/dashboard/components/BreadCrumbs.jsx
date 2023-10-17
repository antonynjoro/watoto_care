import PropTypes from 'prop-types';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

/**
 * @typedef {Object} page
 * @property {string} name - The name of the page.
 * @property {string} href - The URL of the page.
 * @property {boolean} current - Whether the page is the current page.
 */

/**
 * BreadCrumbs component
 * @param {{pages: page[]}} props
 */

export default function BreadCrumbs({pages}) {
  return (
    <nav className="flex pb-4" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <Link
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

BreadCrumbs.propTypes = {
    Pages: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        current: PropTypes.bool.isRequired,
      })
    ).isRequired,
  };