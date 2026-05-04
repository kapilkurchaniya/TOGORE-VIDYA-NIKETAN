"use client";

import { ArrowUp } from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0f2744] overflow-hidden">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#d4a843]/20 overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Tagore Vidya Niketan logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold" style={{ color: "white" }}>
                  Tagore Vidya Niketan
                </span>
                <span className="block text-xs tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                  MPEB Colony, Aamgaon Naka, Gadarwara, M.P.
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
              A premier educational institution established in 1977, committed
              to academic excellence and holistic development of every student.
            </p>
            <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              <span>UDISE: 23400511801</span>
              <span>|</span>
              <span>Narsinghpur, Madhya Pradesh</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-5" style={{ color: "white" }}>
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-[#d4a843]"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* School Info */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-5" style={{ color: "white" }}>
              School Information
            </h4>
            <ul className="flex flex-col gap-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <li>Private Higher Secondary School</li>
              <li>Affiliation: State Board</li>
              <li>Medium: Hindi & English</li>
              <li>Classes: Pre-Primary to XII</li>
              <li>Co-Educational</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            2025 Tagore Vidya Niketan, Gadarwara. All rights reserved.
          </p>
          <a
            href="#home"
            className="flex items-center gap-2 text-xs transition-colors hover:text-[#d4a843]"
            style={{ color: "rgba(255,255,255,0.4)" }}
            aria-label="Back to top"
          >
            Back to Top
            <ArrowUp className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
