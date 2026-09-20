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
    <header className="sticky top-0 z-50 bg-[#F6FBFD]/95 backdrop-blur border-b border-[#A2DFF7]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 py-2 sm:py-2.5">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#A2DFF7] bg-white p-0.5 sm:p-1 shrink-0 shadow-sm transition-transform group-hover:scale-105">
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
            <span className="font-[family-name:var(--font-display)] font-bold text-sm sm:text-lg md:text-xl text-[#005F6B] leading-tight block">
              ORTHO MAX <span className="text-[#3A9AD9]">MULTI SPECIALITY</span>
            </span>
            <span className="text-[10px] sm:text-xs text-[#0A3A40]/80 font-semibold tracking-wide block mt-0.5">
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
                className="text-[#0A3A40] hover:text-[#007B8A] py-1 px-1.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Call CTA */}
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 bg-[#007B8A] text-white px-4 xl:px-5 py-2.5 rounded-full text-xs xl:text-sm font-semibold hover:bg-[#005F6B] transition-colors shadow-sm shrink-0 whitespace-nowrap"
          >
            <Phone size={15} /> Call {phone}
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="lg:hidden p-2 text-[#005F6B] hover:text-[#007B8A] hover:bg-[#A2DFF7]/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#007B8A]/40"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#F6FBFD] border-t border-[#A2DFF7]/60 shadow-lg px-5 py-4 transition-all animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-[#0A3A40] hover:text-[#005F6B] hover:bg-[#A2DFF7]/25 transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight size={16} className="text-[#3A9AD9]" />
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-3 border-t border-[#A2DFF7]/40">
            <a
              href={`tel:${phone}`}
              onClick={() => setIsOpen(false)}
              className="w-full bg-[#007B8A] hover:bg-[#005F6B] text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-md text-sm"
            >
              <Phone size={16} /> Call Hospital: {phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
