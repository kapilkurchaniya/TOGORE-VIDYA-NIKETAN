"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const tagline = "We Seek the Highest";

function AnimatedTagline({ isScrolled }: { isScrolled: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center overflow-hidden"
      aria-label={tagline}
    >
      {tagline.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={`inline-block font-serif text-xs tracking-[0.2em] uppercase transition-all ${
            isScrolled
              ? "text-secondary"
              : "text-secondary"
          }`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateY(0) scale(1)"
              : "translateY(12px) scale(0.3)",
            filter: isVisible
              ? "none"
              : "blur(2px)",
            transition: `opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${
              i * 0.04 + 0.1
            }s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${
              i * 0.04 + 0.1
            }s, filter 0.4s ease ${i * 0.04 + 0.1}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Logo + Tagline */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-110">
            <div
              className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                isScrolled ? "opacity-0" : "opacity-60"
              }`}
              style={{
                background: "radial-gradient(circle, rgba(212,168,67,0.25) 0%, transparent 70%)",
                filter: "blur(6px)",
                animation: "tagline-glow 3s ease-in-out infinite",
              }}
            />
            <Image
              src="/images/logo.png"
              alt="Tagore Vidya Niketan school logo"
              width={48}
              height={48}
              className="relative object-contain drop-shadow-lg"
              style={{ width: "auto", height: "auto" }}
              priority
            />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif text-lg font-bold leading-tight transition-colors duration-300 ${
                isScrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              Tagore Vidya Niketan
            </span>
            <AnimatedTagline isScrolled={isScrolled} />
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group/link ${
                isScrolled
                  ? "text-foreground hover:bg-muted hover:text-primary"
                  : "text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-secondary rounded-full transition-all duration-300 w-0 group-hover/link:w-3/5`}
              />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isScrolled
              ? "text-foreground hover:bg-muted"
              : "text-primary-foreground hover:bg-primary-foreground/10"
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-md border-b border-border shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-foreground hover:bg-muted hover:text-primary transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes tagline-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }
      `}</style>
    </nav>
  );
}
