"use client";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Globe,
} from "lucide-react";
import ScrollReveal from "./scroll-reveal";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "MPEB Colony, Aamgaon Naka, Gadarwara, Madhya Pradesh 487551",
    href: "https://maps.app.goo.gl/RhcCyQgQ1wqv35kA6",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-XXXXX-XXXXX",
    href: "tel:+91XXXXXXXXXX",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@tagorevidyaniketan.edu.in",
    href: "mailto:info@tagorevidyaniketan.edu.in",
  },
  {
    icon: Clock,
    label: "School Hours",
    value: "Monday - Saturday: 8:00 AM - 2:30 PM",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 bg-background overflow-hidden" aria-label="Contact Tagore Vidya Niketan Gadarwara">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/3 -translate-y-1/3" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Contact Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              We would love to hear from you. Visit us or reach out through any
              of the channels below.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Map */}
          <ScrollReveal direction="left">
            <div className="rounded-2xl overflow-hidden border border-border shadow-sm h-full min-h-[400px]">
              <iframe
                title="Tagore Vidya Niketan location on map"
                src="https://maps.google.com/maps?q=MPEB+Colony,+Aamgaon+Naka,+Gadarwara,+Madhya+Pradesh+487551&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal direction="right">
            <div className="flex flex-col gap-6">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      {info.label}
                    </h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-foreground hover:text-primary transition-colors text-sm leading-relaxed"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-foreground text-sm leading-relaxed">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className="p-5 rounded-xl bg-card border border-border">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">
                  Follow Us
                </h4>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/p/Tagore-Vidya-Niketan-100084325765475/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    aria-label="Visit our Facebook page"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://schools.org.in/narsimhapur/23400511801/privt-hss-tagore-vidya-niketan-gadarwara.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    aria-label="Visit school profile"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
