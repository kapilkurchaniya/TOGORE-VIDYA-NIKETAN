"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false);
  const [pageFlip, setPageFlip] = useState(0);

  useEffect(() => {
    if (!isHovered) return;
    
    const interval = setInterval(() => {
      setPageFlip((prev) => (prev + 1) % 3);
    }, 1200);
    return () => clearInterval(interval);
  }, [isHovered]);

  const pageTexts = [
    "Excellence in Education",
    "Knowledge & Values",
    "We Seek the Highest",
  ];

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-secondary/40"
          style={{
            left: `${30 + i * 12}%`,
            top: "60%",
            animation: `floatParticle 3s ease-in-out ${i * 0.4}s infinite`,
          }}
        />
      ))}

      {/* Glowing shadow */}
      <div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-primary/40 via-secondary/30 to-accent/40 blur-3xl transition-all duration-700"
        style={{
          transform: isHovered ? "scale(1.3)" : "scale(1)",
          opacity: isHovered ? 0.7 : 0.35,
        }}
      />

      {/* Logo/Book Container */}
      <div
        className="relative w-40 h-40 md:w-52 md:h-52 cursor-pointer transition-transform duration-500 ease-out"
        style={{
          perspective: "1000px",
          transform: isHovered ? "scale(1.12)" : "scale(1)",
          animation: "logoFloat 4s ease-in-out infinite",
        }}
      >
        {/* Book Back Cover */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-secondary via-accent to-primary rounded-lg transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            boxShadow: "0 0 50px rgba(212, 168, 67, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Shine sweep */}
          <div
            className="absolute inset-0 overflow-hidden rounded-lg"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              style={{ animation: "shineSweep 2s linear infinite" }}
            />
          </div>
        </div>

        {/* Book Left Cover - Flips open */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary to-primary/80 rounded-l-lg transition-all duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "right center",
            transform: isHovered ? "rotateY(-120deg)" : "rotateY(0deg)",
            opacity: isHovered ? 1 : 0,
            boxShadow: "inset -10px 0 30px rgba(0, 0, 0, 0.3), 0 0 30px rgba(212, 168, 67, 0.4)",
          }}
        />

        {/* Logo - Hidden when hovering */}
        <div
          className="absolute inset-0 rounded-lg flex items-center justify-center transition-all duration-500"
          style={{
            opacity: isHovered ? 0 : 1,
            transform: isHovered ? "scale(0.5)" : "scale(1)",
          }}
        >
          <Image
            src="/images/logo.png"
            alt="Tagore Vidya Niketan School Logo"
            width={200}
            height={200}
            className="relative object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Book Inner Pages */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-r-lg flex items-center justify-center p-6 overflow-hidden transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            transitionDelay: isHovered ? "300ms" : "0ms",
            boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Page flip text */}
          <div className="relative w-full h-full flex items-center justify-center">
            {pageTexts.map((text, idx) => (
              <p
                key={idx}
                className={`absolute transition-all duration-500 text-center px-4 ${
                  idx === 2
                    ? "text-xl md:text-2xl font-serif text-secondary font-bold"
                    : "text-sm md:text-lg font-serif text-white/80"
                }`}
                style={{
                  opacity: pageFlip === idx && isHovered ? 1 : 0,
                  transform:
                    pageFlip === idx && isHovered
                      ? "rotateX(0deg)"
                      : "rotateX(90deg)",
                }}
              >
                {text}
              </p>
            ))}
          </div>

          {/* Decorative corners */}
          <div className="absolute top-2 right-2 w-8 h-8 border-2 border-white/20 rounded opacity-50" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border border-white/10 rounded opacity-30" />
        </div>

        {/* Shine effect */}
        <div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            animation: isHovered ? "shineSweepHorizontal 1.5s linear infinite" : "none",
          }}
        />
      </div>

      {/* Hover hint */}
      <div
        className="absolute bottom-0 text-center text-white/50 text-xs md:text-sm transition-opacity duration-300"
        style={{ opacity: isHovered ? 0 : 1 }}
      >
        <p>Hover to explore</p>
      </div>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120px) translateX(20px);
            opacity: 0;
          }
        }
        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0) scale(var(--scale, 1));
          }
          50% {
            transform: translateY(-12px) scale(var(--scale, 1));
          }
        }
        @keyframes shineSweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes shineSweepHorizontal {
          0% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(150%);
          }
        }
      `}</style>
    </div>
  );
}
