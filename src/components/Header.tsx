import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, PhoneCall, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onBookingOpen: () => void;
}

export default function Header({ cartCount, onCartOpen, onBookingOpen }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Programación", href: "#hero" },
    { label: "Contrataciones", href: "#contrataciones" },
    { label: "Merch SH", href: "#merch" },
    { label: "Galería", href: "#galeria" },
    { label: "Reservas", href: "#reservas" },
    { label: "Contacto", href: "#contacto" },
  ];

  const cartLabel =
    cartCount > 0 ? `Carrito, ${cartCount} productos` : "Carrito de compras vacío";

  return (
    <header
      className={`fixed top-0 w-full z-[100] h-24 flex justify-between items-center px-6 md:px-16 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-on-surface/95 backdrop-blur-xl border-surface-variant/10 shadow-lg h-20"
          : "bg-on-surface/85 backdrop-blur-md border-surface-variant/5"
      }`}
    >
      <div className="flex items-center">
        <a href="#hero" className="flex items-center gap-2">
          <img
            referrerPolicy="no-referrer"
            alt="Son Havana - Club de Salsa en Medellín"
            width={190}
            height={76}
            className="h-16 md:h-[4.75rem] w-auto object-contain hover:scale-105 transition-transform"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRfQV7yUllvA6D6RQZT6dyuC4m9QlcwUIvEOXY-2lWg5PazGwwe11PZz-Uj2nhZFOKTSsP3B57SNkA4H3SCfSCClc9FG_p4g9ersLDB-mPep8QAI3aVzq-eijrpgaysow-PZIohF5UbeKwptnzM8OjLIJhzcBC_e1enQrQ9v0dVL-xlJx9v4Fjk7aB7EH1Ye5E9Q7zfyBCJlSC_wcn7kKX-SxYQV6rLKh_syFT4x9zBZvL1TwbRjWFMr-bPYXbtSHNMg"
          />
        </a>
      </div>

      <nav className="hidden lg:flex lg:gap-4 xl:gap-8 items-center" aria-label="Principal">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-anybody font-black lg:text-xs xl:text-sm uppercase tracking-wider text-surface-variant hover:text-primary transition-colors whitespace-nowrap"
          >
            {link.label}
          </a>
        ))}

        <button
          type="button"
          onClick={onCartOpen}
          className="relative size-11 rounded-full bg-black/40 border border-white/5 hover:border-primary-container/30 text-surface-variant hover:text-white transition-all flex items-center justify-center cursor-pointer group"
          aria-label={cartLabel}
        >
          <ShoppingBag
            className="w-5 h-5 group-hover:scale-105 transition-transform text-primary-container"
            aria-hidden="true"
          />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 bg-secondary-container text-on-secondary-container text-[10px] font-black items-center justify-center rounded-full border border-on-surface motion-safe:animate-bounce shadow">
              {cartCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onBookingOpen}
          className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-anybody font-black text-sm uppercase hover:bg-primary-container/90 transition-all shadow-lg cursor-pointer"
        >
          Reservar Mesa
        </button>
      </nav>

      <div className="lg:hidden flex items-center gap-4">
        <button
          type="button"
          onClick={onCartOpen}
          className="relative size-11 rounded-full bg-black/40 text-surface-variant flex items-center justify-center cursor-pointer"
          aria-label={cartLabel}
        >
          <ShoppingBag className="w-5 h-5 text-primary-container" aria-hidden="true" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 bg-secondary-container text-on-secondary-container text-[8px] font-black items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="size-11 text-surface-variant hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-24 left-0 w-full bg-on-surface/95 border-b border-surface-variant/10 flex flex-col p-6 space-y-4 lg:hidden backdrop-blur-xl shadow-xl z-[90]"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-anybody font-black text-lg uppercase tracking-wide text-surface-variant hover:text-white py-2 border-b border-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookingOpen();
                }}
                className="w-full bg-primary-container text-on-primary-container py-3.5 px-6 rounded-full font-anybody font-black text-sm uppercase tracking-wider text-center shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarDays className="w-4 h-4" aria-hidden="true" /> Reservar Mesa En Línea
              </button>
              <a
                href="https://wa.me/573105156550"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-success text-on-surface py-3.5 px-6 rounded-full font-anybody font-black text-sm uppercase tracking-wider text-center shadow-lg flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" aria-hidden="true" /> Consultar por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
