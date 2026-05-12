import { Link } from "react-router-dom";
import { checkUser } from "../utils/auth";
import { useState } from "react";

export default function Navbar() {
  const user = checkUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <header >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Link to="/">
                <h3
                  className="text-white text-2xl font-bold"
                >Trek Wiki</h3>
              </Link>
            </a>
          </div>

          {/* Mobile menu button */}
          {!mobileMenuOpen && (
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="size-6"
                >
                  <path
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-sm font-semibold text-white">
              Trending
            </a>
            <a href="#" className="text-sm font-semibold text-white">
              Help
            </a>
            <a href="#" className="text-sm font-semibold text-white">
              Contact
            </a>
            <a href="#" className="text-sm font-semibold text-white">
              GitHub
            </a>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {!user ? (
              <a href="/auth" className="text-sm font-semibold text-white">
                Log in →
              </a>
            ) : (
              <a href="/profile" className="text-sm font-semibold text-white">
                Profile
              </a>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50  p-6 bg-black/90">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <h1 className="text-xl"></h1>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-200 text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <a
                href="#"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
              >
                Trending
              </a>

              <a
                href="#"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
              >
                Features
              </a>

              <a
                href="#"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
              >
                Marketplace
              </a>

              <a
                href="#"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
              >
                Contact
              </a>
              {!user ? (
                <a
                  href="/auth"
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                >
                  Login
                </a>
              ) : (
                <a
                  href="/profile"
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                >
                  Profile
                </a>
              )}
            </div>
          </div>
        )}
      </header>
    </div >
  )
}
