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
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#A2DFF7] bg-white p-0.5 shrink-0 shadow-sm transition-transform group-hover:scale-105">
            <Image
              src={logo}
              alt="ORTHO MAX MULTI SPECIALITY HOSPITAL Logo"
              width={44}
              height={44}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div>
            <span className="font-[family-name:var(--font-display)] font-bold text-lg sm:text-xl text-[#005F6B] leading-none block">
              ORTHO MAX <span className="text-[#3A9AD9]">MULTI SPECIALITY HOSPITAL</span>
            </span>
            <span className="text-[11px] text-[#0A3A40]/80 font-semibold tracking-wide block mt-0.5">
              Dr. Kumar Anshuman | Orthopaedic surgeon | Dehri
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#0A3A40] hover:text-[#007B8A] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Call CTA */}
        <a
          href={`tel:${phone}`}
          className="hidden lg:flex items-center gap-2 bg-[#007B8A] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#005F6B] transition-colors shadow-sm"
        >
          <Phone size={16} /> Call {phone}
        </a>

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
