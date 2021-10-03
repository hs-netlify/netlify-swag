import { getNavigation } from "../lib/prismic";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex-grow py-16 flex flex-col items-center justify-center">
      <div className="text-center">
        <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">
          404 error
        </p>
        <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Page not found.
        </h1>
        <p className="mt-2 text-base text-gray-500">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-6">
          <Link href="/">
            <a className="text-base font-medium text-green-600 hover:text-green-500">
              Go back home<span aria-hidden="true"> &rarr;</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const navLinks = await getNavigation();
  return {
    props: {
      navLinks,
    },
  };
}
