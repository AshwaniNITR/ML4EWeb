import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <a href="/" className="font-semibold text-lg">ML4E</a>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6">
          <a className="hover:text-blue-100" href="#">Home</a>
          <a className="hover:text-blue-100" href="#">About</a>
          <a className="hover:text-blue-100" href="#">Achievements</a>
          <a className="hover:text-blue-100" href="#">Contact</a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden z-50 relative"
          onClick={() => setOpen(v => !v)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Side drawer menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-700 p-6 z-50 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <a href="#" className="block py-2 hover:text-blue-200">Home</a>
        <a href="#" className="block py-2 hover:text-blue-200">About</a>
        <a href="#" className="block py-2 hover:text-blue-200">Achievments</a>
        <a href="#" className="block py-2 hover:text-blue-200">Contact</a>
      </div>
    </nav>
  );
}
