"use client";

import {
  Calendar,
  Users,
  Monitor,
  BookOpen,
  Award,
  Heart,
} from "lucide-react";
import AnimatedCounter from "./animated-counter";
import ScrollReveal from "./scroll-reveal";

const stats = [
  {
    icon: Calendar,
    label: "Established",
    value: 1977,
    suffix: "",
    description: "Serving since",
  },
  {
    icon: BookOpen,
    label: "Classes",
    value: 12,
    suffix: "",
    prefix: "Pre-Primary to ",
    description: "Complete education",
  },
  {
    icon: Users,
    label: "Teachers",
    value: 38,
    suffix: "+",
    description: "Dedicated educators",
  },
  {
    icon: Monitor,
    label: "Computers",
    value: 30,
    suffix: "+",
    description: "Digital learning",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-background overflow-hidden" aria-label="About Tagore Vidya Niketan Gadarwara">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              About Our School
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              A Legacy of Educational Excellence
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              Founded in 1977, Tagore Vidya Niketan has been a beacon of
              knowledge in Gadarwara, Narsinghpur. We are dedicated to nurturing
              young minds through holistic education, modern facilities, and a
              value-based learning environment inspired by the ideals of
              Rabindranath Tagore.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 100}>
              <div className="group relative p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.label === "Classes" ? (
                    <span className="text-2xl md:text-3xl">
                      Pre-Primary - <AnimatedCounter target={stat.value} />
                    </span>
                  ) : (
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                <div className="text-sm font-medium text-primary mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Award,
              title: "Academic Excellence",
              description:
                "Consistently achieving outstanding results with a curriculum designed to inspire critical thinking and creativity in every student.",
            },
            {
              icon: Heart,
              title: "Value-Based Education",
              description:
                "Rooted in the philosophy of Rabindranath Tagore, we foster character, compassion, and a love for learning that lasts a lifetime.",
            },
            {
              icon: Users,
              title: "Holistic Development",
              description:
                "Beyond academics, we encourage sports, arts, cultural activities, and community service to develop well-rounded individuals.",
            },
          ].map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 150}>
              <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/15 text-secondary mb-5 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
