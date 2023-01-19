export default function CookieBanner({ handleAccept }) {
  return (
    <div id="cookie-banner" className="fixed inset-x-0 bottom-0">
      <div className="bg-green-500">
        <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between">
            <p className="ml-3 truncate font-medium text-white">
              We use our cookies on our website to enhance your experience.
              Select "Accept All" to allow them to be used.
            </p>
            <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
              <button
                onClick={handleAccept}
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-green-600 shadow-sm hover:bg-green-50"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
