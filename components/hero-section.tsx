"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";

const ThreeHero = dynamic(() => import("./three-hero"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-[#0f3460] via-[#1a5276] to-[#1a6fc4]" />,
});

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sub1Ref = useRef<HTMLParagraphElement>(null);
  const sub2Ref = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Logo entrance — drop + bounce
      tl.fromTo(
        logoRef.current,
        { y: -60, opacity: 0, scale: 0.5, rotateY: 180 },
        { y: 0, opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: "back.out(1.8)" }
      );

      // Tagline letter-by-letter
      const tagLetters = tagRef.current?.querySelectorAll("span");
      if (tagLetters) {
        tl.fromTo(
          tagLetters,
          { y: 24, opacity: 0, scale: 0.4, filter: "blur(6px)" },
          { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, stagger: 0.03, ease: "back.out(2)" },
          "-=0.5"
        );
      }

      // Badge pill
      tl.fromTo(
        badgeRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" },
        "-=0.3"
      );

      // Title words
      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.3"
      );

      // Sub-lines
      tl.fromTo(
        [sub1Ref.current, sub2Ref.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.4"
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.3"
      );

      // Scroll indicator
      tl.fromTo(
        scrollRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.2"
      );

      // Continuous float on scroll indicator
      gsap.to(scrollRef.current, {
        y: 10,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // Logo continuous float
      gsap.to(logoRef.current, {
        y: -10,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  const motto = '"We Seek the Highest"';

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Tagore Vidya Niketan Gadarwara home hero"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f3d] via-[#0f3460] to-[#1a5276]" />

      {/* Three.js scene */}
      <ThreeHero />

      {/* Overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/55 pointer-events-none" />

      {/* Hero content */}
      <div ref={contentRef} className="relative z-10 mx-auto max-w-4xl px-4 text-center">

        {/* Logo */}
        <div ref={logoRef} className="mb-5 flex justify-center opacity-0" style={{ perspective: "600px" }}>
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: "radial-gradient(circle, rgba(212,168,67,0.35) 0%, transparent 70%)" }}
            />
            <Image
              src="/images/logo.png"
              alt="Tagore Vidya Niketan Gadarwara school crest"
              width={128}
              height={128}
              className="relative drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Tagline — letter by letter */}
        <div ref={tagRef} className="mb-4 overflow-hidden" aria-label="We Seek the Highest">
          <p className="font-serif text-secondary text-lg md:text-xl tracking-[0.18em] italic">
            {motto.split("").map((char, i) => (
              <span key={i} className="inline-block opacity-0">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>

        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-block mb-5 px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 backdrop-blur-sm opacity-0"
        >
          <span className="text-secondary text-xs font-semibold tracking-widest uppercase">
            Established 1977 &nbsp;·&nbsp; UDISE: 23400511801
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight text-balance mb-4 opacity-0"
        >
          Tagore Vidya Niketan
        </h1>

        {/* Sub lines */}
        <p ref={sub1Ref} className="text-lg md:text-xl text-white/80 mb-2 opacity-0">
          Gadarwara, Narsinghpur, Madhya Pradesh
        </p>
        <p ref={sub2Ref} className="text-sm md:text-base text-white/55 max-w-xl mx-auto mb-9 leading-relaxed opacity-0">
          Nurturing global minds and shaping futures through academic excellence
          since 1977. Pre-Primary to Class XII.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <a
            href="#admissions"
            className="px-8 py-3.5 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm tracking-wide hover:bg-secondary/90 transition-all duration-300 shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 hover:-translate-y-0.5"
          >
            Apply for Admission
          </a>
          <a
            href="#about"
            className="px-8 py-3.5 rounded-lg border border-white/30 text-white font-medium text-sm tracking-wide hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            Explore Our School
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0">
        <a href="#about" aria-label="Scroll to about section">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </a>
      </div>
    </section>
  );
}
