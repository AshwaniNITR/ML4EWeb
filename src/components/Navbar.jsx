import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close drawer on Esc key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Framer variants for the drawer & links
  const drawer = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { type: "tween", duration: 0.28 } },
    exit: { x: "-100%", transition: { type: "tween", duration: 0.24 } },
  };

  const list = {
    hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const item = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.18 } },
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <a href="/" className="font-semibold text-lg">MyApp</a>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6">
          <a className="hover:text-blue-100" href="#">Home</a>
          <a className="hover:text-blue-100" href="#">About</a>
          <a className="hover:text-blue-100" href="#">Services</a>
          <a className="hover:text-blue-100" href="#">Contact</a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden z-50 relative"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Overlay + Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Fade overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Slide-in drawer */}
            <motion.aside
              className="fixed top-0 left-0 h-full w-64 bg-blue-700 z-50"
              role="dialog"
              aria-modal="true"
              variants={drawer}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6">
                <motion.nav
                  variants={list}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2"
                >
                  <motion.a variants={item} className="block py-2 hover:text-blue-200" href="#" onClick={() => setOpen(false)}>Home</motion.a>
                  <motion.a variants={item} className="block py-2 hover:text-blue-200" href="#" onClick={() => setOpen(false)}>About</motion.a>
                  <motion.a variants={item} className="block py-2 hover:text-blue-200" href="#" onClick={() => setOpen(false)}>Services</motion.a>
                  <motion.a variants={item} className="block py-2 hover:text-blue-200" href="#" onClick={() => setOpen(false)}>Contact</motion.a>
                </motion.nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
