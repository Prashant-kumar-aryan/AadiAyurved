"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

type DropdownKey = "pain" | "services" | null;

const PAIN_MENU = [
  "Joint Pain",
  "Back Pain",
  "Rheumatoid Arthritis",
  "Sciatica",
];
const SERVICES_MENU = ["Consultation", "Panchakarma", "Home Remedies"];

function useOutsideClick<T extends HTMLElement>(handler: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        handler();
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") handler();
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, [handler]);

  return ref;
}

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePainOpen, setMobilePainOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const rootRef = useOutsideClick<HTMLDivElement>(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  });

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navBaseLink =
    "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200";
  const dropdownPanelBase =
    "absolute top-full left-0 mt-2 rounded-md border border-gray-200 bg-white shadow-lg transition-all duration-200 origin-top z-40";

  const desktopNavItems = useMemo(
    () => [
      { key: "home", label: "Home", dropdown: false },
      { key: "pain", label: "Pain Management", dropdown: true },
      { key: "products", label: "Products", dropdown: false },
      { key: "services", label: "Our Services", dropdown: true },
      { key: "contact", label: "Contact Us", dropdown: false },
      { key: "about", label: "About", dropdown: false },
    ],
    []
  );

  return (
    <header
      ref={rootRef}
      className="sticky top-0 z-50 bg-white shadow-md py-5"
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <img src="logo.png" alt="logo" className="size-14" />
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-gray-900"
              aria-label="AyurWellness Home"
            >
              AyurWellness
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Primary"
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link href="/" className={`${navBaseLink} text-xs`}>
              Home
            </Link>
            <Link href="/shop-by-disease" className={`${navBaseLink} text-xs`}>
              Shop by Disease
            </Link>

            {/* Pain Management small dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("pain")}
            >
              <button
                type="button"
                className={`${navBaseLink} flex items-center gap-1`}
                aria-haspopup="true"
                aria-expanded={openDropdown === "pain"}
                aria-controls="dropdown-pain"
              >
                <span>Pain Management</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              <div
                id="dropdown-pain"
                className={`${dropdownPanelBase} min-w-[220px] p-2 ${
                  openDropdown === "pain"
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                }`}
                onMouseEnter={() => setOpenDropdown("pain")}
              >
                <ul className="py-1">
                  {PAIN_MENU.map((label) => (
                    <li key={label}>
                      <Link
                        href="#"
                        className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Products */}
            <Link href="#" className={navBaseLink}>
              Products
            </Link>

            {/* Our Services small dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("services")}
            >
              <button
                type="button"
                className={`${navBaseLink} flex items-center gap-1`}
                aria-haspopup="true"
                aria-expanded={openDropdown === "services"}
                aria-controls="dropdown-services"
              >
                <span>Our Services</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              <div
                id="dropdown-services"
                className={`${dropdownPanelBase} min-w-[220px] p-2 ${
                  openDropdown === "services"
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                }`}
                onMouseEnter={() => setOpenDropdown("services")}
              >
                <ul className="py-1">
                  {SERVICES_MENU.map((label) => (
                    <li key={label}>
                      <Link
                        href="#"
                        className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact & About */}
            <Link href="#" className={navBaseLink}>
              Contact Us
            </Link>
            <Link href="#" className={navBaseLink}>
              About
            </Link>
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center gap-1">
            <Link
              href="#"
              className="relative rounded-md p-2 text-gray-700 hover:bg-gray-100 transition-all duration-200"
              aria-label="View cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 transition-all duration-200"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="ml-1 inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 md:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => {
                setMobileMenuOpen((v) => !v);
                setOpenDropdown(null);
              }}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto rounded-t-lg bg-white shadow-lg">
          <div className="px-4 py-4">
            <ul className="flex flex-col">
              <li>
                <Link
                  href="/"
                  className="block rounded-md px-3 py-3 text-xs font-medium text-gray-800 hover:bg-gray-100 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop-by-disease"
                  className="block rounded-md px-3 py-3 text-xs font-medium text-gray-800 hover:bg-gray-100 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop by Disease
                </Link>
              </li>

              {/* Pain Management accordion */}
              <li className="mt-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-100 transition-all duration-200"
                  aria-expanded={mobilePainOpen}
                  onClick={() => setMobilePainOpen((v) => !v)}
                >
                  <span>Pain Management</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      mobilePainOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    mobilePainOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <ul className="min-h-0 rounded-md border border-gray-200 py-1">
                    {PAIN_MENU.map((label) => (
                      <li key={label}>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Products */}
              <li className="mt-2">
                <Link
                  href="#"
                  className="block rounded-md px-3 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
              </li>

              {/* Our Services accordion */}
              <li className="mt-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-100 transition-all duration-200"
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((v) => !v)}
                >
                  <span>Our Services</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    mobileServicesOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <ul className="min-h-0 rounded-md border border-gray-200 py-1">
                    {SERVICES_MENU.map((label) => (
                      <li key={label}>
                        <Link
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Contact & About */}
              <li className="mt-2">
                <Link
                  href="#"
                  className="block rounded-md px-3 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  href="#"
                  className="block rounded-md px-3 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
            </ul>

            {/* Mobile bottom actions */}
            <div className="mt-4 flex items-center gap-2">
              <Link
                href="#"
                className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                Cart
              </Link>
              <Link
                href="#"
                className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
