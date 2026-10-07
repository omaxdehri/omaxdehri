"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Menu, X, ChevronRight } from "lucide-react";

interface NavbarProps {
  phone: string;
  logo: string;
}

export default function Navbar({ phone, logo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Conditions", href: "#conditions" },
    { label: "Dr. Kumar Anshuman", href: "#doctor" },
    { label: "Facilities", href: "#facilities" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 py-2 sm:py-2.5">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-sky-200 bg-white p-0.5 sm:p-1 shrink-0 shadow-sm transition-transform group-hover:scale-105">
            <Image
              src={logo}
              alt="ORTHO MAX MULTI SPECIALITY HOSPITAL Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div>
            <span className="font-[family-name:var(--font-display)] font-bold text-sm sm:text-lg md:text-xl text-[#1E3A5F] leading-tight block">
              ORTHO MAX <span className="text-sky-500">MULTI SPECIALITY</span>
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 font-semibold tracking-wide block mt-0.5">
              Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links & CTA Container */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-6">
          <nav className="flex items-center gap-3 xl:gap-5 text-xs xl:text-sm font-semibold whitespace-nowrap">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-600 hover:text-sky-500 py-1 px-1.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 bg-[#FF6B6B] text-white px-4 xl:px-5 py-2.5 rounded-full text-xs xl:text-sm font-semibold hover:bg-[#e85d5d] transition-colors shadow-md shrink-0 whitespace-nowrap"
          >
            <Phone size={15} /> Book Appointment
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="lg:hidden p-2 text-[#1E3A5F] hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300/40"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-sky-100 shadow-lg px-5 py-4 transition-all">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-sky-500 hover:bg-sky-50 transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight size={16} className="text-sky-400" />
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-3 border-t border-sky-100">
            <a
              href={`tel:${phone}`}
              onClick={() => setIsOpen(false)}
              className="w-full bg-[#FF6B6B] hover:bg-[#e85d5d] text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-md text-sm"
            >
              <Phone size={16} /> Book Appointment: {phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
