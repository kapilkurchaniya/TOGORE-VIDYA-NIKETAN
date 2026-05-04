"use client";

import { useState } from "react";
import {
  BookOpen,
  FlaskConical,
  Monitor,
  Trophy,
  Palette,
  Dumbbell,
  Library,
  Bus,
} from "lucide-react";
import ScrollReveal from "./scroll-reveal";

const tabs = [
  {
    id: "curriculum",
    label: "Curriculum",
    icon: BookOpen,
    items: [
      "CBSE-aligned comprehensive syllabus",
      "Pre-Primary to Class XII education",
      "Science, Commerce & Arts streams (Senior Secondary)",
      "Hindi & English medium instruction",
      "Activity-based learning for primary classes",
      "Regular assessments and parent-teacher meetings",
    ],
  },
  {
    id: "facilities",
    label: "Facilities",
    icon: Monitor,
    items: [
      "Modern Computer Lab with 30+ computers",
      "Well-equipped Science Laboratories",
      "Extensive Library & Reading Room",
      "Spacious Playground & Sports Grounds",
      "Smart Classrooms with digital tools",
      "Safe and hygienic campus environment",
    ],
  },
  {
    id: "activities",
    label: "Activities",
    icon: Trophy,
    items: [
      "Annual sports competitions and athletics",
      "Cultural festivals and talent shows",
      "Science exhibitions and quiz competitions",
      "Debate and public speaking forums",
      "Art, music, and dance programs",
      "Community service and social awareness drives",
    ],
  },
];

const facilities = [
  {
    icon: FlaskConical,
    name: "Science Labs",
    description: "Physics, Chemistry, and Biology labs with modern equipment",
  },
  {
    icon: Monitor,
    name: "Computer Lab",
    description: "30+ computers with internet connectivity for digital learning",
  },
  {
    icon: Library,
    name: "Library",
    description: "Extensive collection of books, journals, and reference materials",
  },
  {
    icon: Dumbbell,
    name: "Sports",
    description: "Large playground for cricket, football, athletics, and more",
  },
  {
    icon: Palette,
    name: "Arts & Culture",
    description: "Dedicated spaces for art, music, and cultural activities",
  },
  {
    icon: Bus,
    name: "Transport",
    description: "Safe and reliable bus service covering major routes",
  },
];

export default function AcademicsSection() {
  const [activeTab, setActiveTab] = useState("curriculum");

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="academics" className="relative py-24 bg-muted overflow-hidden" aria-label="Academics and curriculum at Tagore Vidya Niketan Gadarwara">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full translate-x-1/3 -translate-y-1/3" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Academics & Facilities
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Where Learning Comes Alive
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Our comprehensive academic program and world-class facilities
              create the perfect environment for students to thrive and excel.
            </p>
          </div>
        </ScrollReveal>

        {/* Tabbed Content */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-20">
            {/* Tab buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                {currentTab.items.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors duration-200"
                    style={{
                      animation: `fadeSlideIn 0.4s ease-out ${index * 80}ms both`,
                    }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                    </div>
                    <span className="text-foreground text-sm leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Facilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <ScrollReveal key={facility.name} delay={index * 100}>
              <div className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <facility.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {facility.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
