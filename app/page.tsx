"use client";

import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import AcademicsSection from "@/components/academics-section";
import GallerySection from "@/components/gallery-section";
import AdmissionsSection from "@/components/admissions-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ThemeProvider from "@/components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AcademicsSection />
      <GallerySection />
      <AdmissionsSection />
      <ContactSection />
      <Footer />
    </ThemeProvider>
  );
}
