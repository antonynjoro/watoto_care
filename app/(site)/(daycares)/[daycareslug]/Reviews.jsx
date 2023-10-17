
import { StarIcon } from "@heroicons/react/20/solid";
import { format } from "path";



export default function Reviews({reviews}) {
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }


  return (
    <>
      {/* Reviews */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-bold tracking-tight text-charcoal-900">
              Customer Reviews
            </h2>

            <div className="mt-3 flex items-center">
              <div>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-yellow-400"
                          : "text-charcoal-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
              </div>
              <p className="ml-2 text-sm text-charcoal-900">
                Based on {reviews.totalCount} reviews
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Review data</h3>

              <dl className="space-y-3">
                {reviews.counts.map((count) => (
                  <div key={count.rating} className="flex items-center text-sm">
                    <dt className="flex flex-1 items-center">
                      <p className="w-3 font-medium text-charcoal-900">
                        {count.rating}
                        <span className="sr-only"> star reviews</span>
                      </p>
                      <div
                        aria-hidden="true"
                        className="ml-1 flex flex-1 items-center"
                      >
                        <StarIcon
                          className={classNames(
                            count.count > 0
                              ? "text-yellow-400"
                              : "text-charcoal-300",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />

                        <div className="relative ml-3 flex-1">
                          <div className="h-3 rounded-full border border-charcoal-200 bg-charcoal-100" />
                          {count.count > 0 ? (
                            <div
                              className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400 z-0"
                              style={{
                                width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                    </dt>
                    <dd className="ml-3 w-10 text-right text-sm tabular-nums text-charcoal-900">
                      {Math.round((count.count / reviews.totalCount) * 100)}%
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-medium text-charcoal-900">
                Share your thoughts
              </h3>
              <p className="mt-1 text-sm text-charcoal-600">
                If you’ve used this product, share your thoughts with other
                customers
              </p>

              <a
                href="#"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-charcoal-300 bg-white px-8 py-2 text-sm font-medium text-charcoal-900 hover:bg-charcoal-50 sm:w-auto lg:w-full"
              >
                Write a review
              </a>
            </div>
          </div>

          <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <h3 className="sr-only">Recent reviews</h3>

            <div className="flow-root">
              <div className="-my-12 divide-y divide-charcoal-200">
                {reviews.featured.map((review) => (
                  <div key={review.id} className="py-12">
                    <div className="flex items-center">
                      <img
                        src={review.avatarSrc}
                        alt={`${review.author}.`}
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="ml-4">
                        <h4 className="text-sm font-bold text-charcoal-900">
                          {review.author}
                        </h4>
                        <div className="mt-1 flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                review.rating > rating
                                  ? "text-yellow-400"
                                  : "text-charcoal-300",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {review.rating} out of 5 stars
                        </p>
                      </div>
                    </div>

                    <div
                      className="mt-4 space-y-6 text-base italic text-charcoal-600"
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
