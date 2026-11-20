"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, ChevronRight, Stethoscope, ShieldCheck } from "lucide-react";

interface NavbarProps {
  phone: string;
  logo: string;
}

export default function Navbar({ phone, logo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(false);

  useEffect(() => {
    // Quick check if doctor session is active
    fetch("/api/doctor/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsDoctorLoggedIn(true);
        }
      })
      .catch(() => {});
  }, []);

  const navLinks = [
    { label: "Services", href: "/#services" },
    { label: "Conditions", href: "/#conditions" },
    { label: "Dr. Kumar Anshuman", href: "/#doctor" },
    { label: "Facilities", href: "/#facilities" },
    { label: "Blog", href: "/blog", highlight: true },
    { label: "Reviews", href: "/#reviews" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 py-2 sm:py-2.5">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
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
        </Link>

        {/* Desktop Navigation Links & CTA Container */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-4">
          <nav className="flex items-center gap-2 xl:gap-4 text-xs xl:text-sm font-semibold whitespace-nowrap">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`py-1 px-1.5 transition-colors ${
                  link.highlight
                    ? "text-sky-600 font-bold hover:text-sky-700"
                    : "text-slate-600 hover:text-sky-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Doctor Login / Dashboard Button */}
          <Link
            href={isDoctorLoggedIn ? "/doctor/dashboard" : "/doctor/login"}
            className="flex items-center gap-1.5 bg-gradient-to-r from-sky-50 to-blue-50 text-[#1E3A5F] border border-sky-200 hover:border-sky-400 hover:bg-sky-100/70 px-3 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all shadow-sm shrink-0 whitespace-nowrap"
            title={isDoctorLoggedIn ? "Open Doctor Dashboard" : "Doctor Portal Login"}
          >
            {isDoctorLoggedIn ? (
              <>
                <ShieldCheck size={15} className="text-emerald-600" />
                <span>Doctor Dashboard</span>
              </>
            ) : (
              <>
                <Stethoscope size={15} className="text-sky-600" />
                <span>Doctor Login</span>
              </>
            )}
          </Link>

          {/* Desktop CTA */}
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 bg-[#FF6B6B] text-white px-4 xl:px-5 py-2.5 rounded-full text-xs xl:text-sm font-semibold hover:bg-[#e85d5d] transition-colors shadow-md shrink-0 whitespace-nowrap"
          >
            <Phone size={15} /> Book Appointment
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href={isDoctorLoggedIn ? "/doctor/dashboard" : "/doctor/login"}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#1E3A5F] bg-sky-50 border border-sky-200 px-2.5 py-1.5 rounded-lg"
          >
            <Stethoscope size={14} className="text-sky-600" />
            <span>Doctor Login</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="p-2 text-[#1E3A5F] hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300/40"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-sky-100 shadow-lg px-5 py-4 transition-all">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                  link.highlight
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-700 hover:text-sky-500 hover:bg-sky-50"
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight size={16} className="text-sky-400" />
              </Link>
            ))}

            <Link
              href={isDoctorLoggedIn ? "/doctor/dashboard" : "/doctor/login"}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-[#1E3A5F] bg-sky-50/70 border border-sky-200 hover:bg-sky-100 transition-colors mt-2"
            >
              <div className="flex items-center gap-2">
                <Stethoscope size={16} className="text-sky-600" />
                <span>{isDoctorLoggedIn ? "Doctor Dashboard (Blog Writer)" : "Doctor Portal Login"}</span>
              </div>
              <ChevronRight size={16} className="text-sky-600" />
            </Link>
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
