import Link from "next/link";
import { useCart } from "../context/cart-context";

export default function Navbar({ navLinks, openCart }) {
  const { totalItems } = useCart();
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
            <button
              onClick={() => openCart()}
              className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              {totalItems > 0 && (
                <span className="absolute inset-0 object-right-top -mr-6">
                  <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-green-500 text-white">
                    {totalItems}
                  </div>
                </span>
              )}
            </button>
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
