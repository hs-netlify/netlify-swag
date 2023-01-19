import Link from "next/link";
import { ShoppingCartIcon, SearchIcon } from "@heroicons/react/outline";
import { useCart } from "../context/cart-context";

export default function Navbar({ navLinks, openCart }) {
  const { totalItems } = useCart();
  return (
    <header className="text-gray-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-2 flex items-center justify-between border-b border-gray-300 sm:border-none">
          <div className="flex items-center">
            <Link href="/">
              <a>
                <span className="sr-only">Netlify!</span>
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
            <Link href="/search">
              <a>
                <SearchIcon className="h-6 w-6" />
              </a>
            </Link>
            <button
              onClick={() => openCart()}
              className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <ShoppingCartIcon className="h-6 w-6" />
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
