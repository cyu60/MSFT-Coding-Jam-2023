import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-indigo-700 p-6 text-white">
      {/* Navbar */}
      <div className="text-2xl font-bold">ChronoMate!</div>
      <div className="space-x-4">
        <Link className="hover:text-indigo-300" href="/">
          Home
        </Link>
        <Link className="hover:text-indigo-300" href="/about">
          About
        </Link>
        <Link className="hover:text-indigo-300" href="/contact">
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
