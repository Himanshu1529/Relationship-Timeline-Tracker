import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="pb-6 bg-black bg-opacity-50 backdrop-blur-lg lg:pb-0">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex">
              <img className="w-auto h-8 lg:h-10" src="./logo.svg" alt="Logo" />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center font-semibold lg:ml-auto lg:space-x-10">
            {[
              { name: "Home", path: "/" },
              { name: "Add Moment", path: "/add-moment" },
              { name: "View Timeline", path: "/relationship-timeline" },
              // { name: "Resources", path: "/resources" },
              // { name: "Pricing", path: "/pricing" },
            ].map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "text-pink-600"
                      : "text-white hover:text-pink-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <div className="text-white bg-transparent">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 rounded-md hover:bg-gray-100 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✖" : "☰"}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="mt-4 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
            <div className="flex flex-col px-6 py-4 space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Add Moment", path: "/add-moment" },
                { name: "View Timeline", path: "/relationship-timeline" },
              ].map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `py-2 text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "text-blue-600"
                        : "text-black hover:text-blue-600"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="mt-4 bg-transparent text-black">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
