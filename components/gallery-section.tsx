"use client";

import { useState, useRef, useCallback } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import ScrollReveal from "./scroll-reveal";

const instagramPosts = [
  "https://www.instagram.com/tagore_vidya_niketan/p/DBJER0kofB1/",
  "https://www.instagram.com/tagore_vidya_niketan/p/DA2_M-yv335/",
  "https://www.instagram.com/tagore_vidya_niketan/p/DA28yGpvLxq/",
  "https://www.instagram.com/tagore_vidya_niketan/p/DAqtIf4Tv61/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C_41lm6M0r5/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C_lJ-sMIXJn/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C_lJcwYISwN/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C_lI2ISIpUr/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C-8a9qehHNM/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C-8Z8aEhBwZ/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C-x7PDDBUe1/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C-uFUYEvpwc/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C-rrf8zvScq/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C-rrG-Svxdm/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C-pY_2fPcY0/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C-o3K1oPHTd/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C-o22rZPPmL/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C-U3h8EPMvx/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C9wkbQSMEC0/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C9ptbkCsTZl/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C9ptWBHM5Pu/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C9ptMhfMkrZ/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C9ps5nms71Y/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C9mbrAmvDYu/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C9j-c00MriA/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C9bu95Cvkbm/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C9NGei-sxqo/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C8eZr4IP9nZ/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C8ZAuSSMrtx/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C8ZAoixMGpT/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C8ZAYnsMxAP/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C8ZAOz8M_tI/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C7yuZQ9PxnH/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C6WHI1OMHGs/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C6QYXTbPLw2/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C6IjVJbPDFi/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C5pi9lQvZJd/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C5XvzecPIVP/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C5NvdJbvqXe/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C5NvSuwvkBN/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C4ztIMNP9RJ/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C4lCsvdPRTo/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C4avynRPQ-t/",
  "https://www.instagram.com/tagore_vidya_niketan/p/C4SjLgsxM52/",
];

function getPostId(url: string) {
  const match = url.match(/\/p\/([^/]+)/);
  return match ? match[1] : "";
}

const POSTS_PER_PAGE = 9;

function PostCard({
  url,
  index,
  globalIndex,
}: {
  url: string;
  index: number;
  globalIndex: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const postId = getPostId(url);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212,168,67,0.15) 0%, transparent 60%)`;
      glow.style.opacity = "1";
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    glow.style.opacity = "0";
  }, []);

  // Use Instagram embed URL
  const embedUrl = `https://www.instagram.com/p/${postId}/embed/captioned/`;

  return (
    <ScrollReveal delay={index * 60}>
      <a
        ref={cardRef}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative block aspect-square w-full rounded-2xl overflow-hidden bg-card border border-border hover:border-secondary/40 shadow-sm transition-all duration-300 cursor-pointer will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
        }}
      >
        {/* Instagram embed */}
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ border: "none", overflow: "hidden" }}
          loading="lazy"
          title={`Instagram post ${postId}`}
          scrolling="no"
        />

        {/* Mouse glow overlay */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{ opacity: 0 }}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />

        {/* Bottom label */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-30 pointer-events-none">
          <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: "white" }}>
            <ExternalLink className="w-4 h-4" />
            View on Instagram
          </span>
        </div>

        {/* Number badge */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-secondary/90 text-secondary-foreground flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
          {globalIndex + 1}
        </div>
      </a>
    </ScrollReveal>
  );
}

export default function GallerySection() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(instagramPosts.length / POSTS_PER_PAGE);

  const currentPosts = instagramPosts.slice(
    page * POSTS_PER_PAGE,
    (page + 1) * POSTS_PER_PAGE
  );

  return (
    <section id="gallery" className="relative py-24 bg-muted overflow-hidden" aria-label="Photo gallery of Tagore Vidya Niketan Gadarwara">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Instagram className="w-4 h-4" />
              Instagram Gallery
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Glimpses of School Life
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Follow us on Instagram{" "}
              <a
                href="https://www.instagram.com/tagore_vidya_niketan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                @tagore_vidya_niketan
              </a>{" "}
              for the latest updates from our campus.
            </p>
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((url, index) => (
            <PostCard
              key={url}
              url={url}
              index={index}
              globalIndex={page * POSTS_PER_PAGE + index}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === page
                    ? "bg-secondary w-8"
                    : "bg-border hover:bg-muted-foreground/40"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Post count */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          Showing {page * POSTS_PER_PAGE + 1}
          {" - "}
          {Math.min((page + 1) * POSTS_PER_PAGE, instagramPosts.length)} of{" "}
          {instagramPosts.length} posts
        </p>

        {/* Follow CTA */}
        <ScrollReveal delay={200}>
          <div className="text-center mt-12">
            <a
              href="https://www.instagram.com/tagore_vidya_niketan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              style={{ color: "white" }}
            >
              <Instagram className="w-5 h-5" />
              Follow @tagore_vidya_niketan on Instagram
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
