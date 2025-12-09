"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../globals.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // toggle a global class so other components can react (apply blur, etc.)
    const root =
      typeof document !== "undefined" ? document.documentElement : null;
    if (!root) return;
    if (isMenuOpen) {
      root.classList.add("overlay-open");
    } else {
      root.classList.remove("overlay-open");
    }
    return () => root.classList.remove("overlay-open");
  }, [isMenuOpen]);

  return (
    <header className="w-full h-25 md:h-35 p-5">
      <nav className="flex justify-between items-start">
        <h3 className="w-1/2 leading-none">
          thomas gaudin <br /> interactive media designer <br />
          switzerland
        </h3>

        <div className="hidden md:flex w-1/2 justify-between">
          <Link
            href="/"
            className="text-h3 hover:opacity-70 transition-opacity cursor-pointer"
          >
            projects
          </Link>
          <Link
            href="/contact"
            className="text-h3 hover:opacity-70 transition-opacity cursor-pointer"
          >
            contact
          </Link>
          <Link
            href="/about"
            className="text-h3 hover:opacity-70 transition-opacity cursor-pointer"
          >
            about
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 z-50 relative"
          aria-label="Menu"
        >
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        style={{
          // apply a semi-transparent background and a backdrop blur over the whole screen
          background: isMenuOpen ? "rgba(255,255,255,0.18)" : "transparent",
          backdropFilter: isMenuOpen ? "blur(12px)" : "none",
          WebkitBackdropFilter: isMenuOpen ? "blur(12px)" : "none",
          transition: "background 200ms, backdrop-filter 200ms",
          zIndex: 40,
        }}
      >
        {/* Menu mobile */}

        <div
          className={`absolute top-0 right-0 h-full w-full transition-all duration-300 flex flex-col justify-center items-center z-50 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href="/"
            className="text-h3 hover:opacity-70 transition-opacity cursor-pointer"
            onClick={closeMenu}
          >
            projects
          </Link>
          <Link
            href="/contact"
            className="text-h3 hover:opacity-70 transition-opacity cursor-pointer"
            onClick={closeMenu}
          >
            contact
          </Link>
          <Link
            href="/about"
            className="text-h3 hover:opacity-70 transition-opacity cursor-pointer"
            onClick={closeMenu}
          >
            about
          </Link>
        </div>
      </div>
    </header>
  );
}
