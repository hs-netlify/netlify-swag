import Link from "next/link";

export default function NoResults() {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-medium text-gray-900">No matches</h3>
      <p className="mt-1 text-sm text-gray-500">
        Sorry, we couldn’t find any matching results for this search.
      </p>
      <div className="mt-6">
        <Link href="/">
          <a className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Go back home →
          </a>
        </Link>
      </div>
    </div>
  );
}
