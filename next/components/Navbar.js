import Link from "next/link";
import LocalePicker from "./LocalePicker";

export default function Navbar({ navLinks }) {
  return (
    <header className="text-gray-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b-2 border-green-500 sm:border-none">
          <div className="flex items-center">
            <Link href="/">
              <a>
                <span className="sr-only">Netlify</span>
                <img
                  className="h-6 w-auto"
                  src="/netlify_logo.svg"
                  alt="Netlify Logo"
                />
              </a>
            </Link>
            <div className="hidden ml-10 space-x-8 sm:block">
              {navLinks?.map((link) => (
                <Link href={link.href} key={link.name}>
                  <a className="text-base font-medium hover:text-green-500">
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center ml-10 space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <LocalePicker />
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 sm:hidden">
          {navLinks?.map((link) => (
            <Link key={link.name} href={link.href}>
              <a className="text-base font-medium  hover:text-green-500">
                {link.name}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
