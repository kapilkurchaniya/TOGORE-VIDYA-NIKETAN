import type { Metadata, Viewport } from "next";
import { Roboto, Playfair_Display } from "next/font/google";

import Preloader from "@/components/preloader";
import "./globals.css";

const _roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const _playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL = "https://tagorevidyaniketan.edu.in";
const SITE_NAME = "Tagore Vidya Niketan Gadarwara";
const SITE_DESCRIPTION =
  "Tagore Vidya Niketan, MPEB Colony, Aamgaon Naka, Gadarwara, Madhya Pradesh 487551 - A premier English medium school established in 1977, offering Pre-Primary to Class 12 education. UDISE: 23400511801. Affiliated CBSE/MP Board school with modern computer labs, science labs, library, sports facilities and 38+ experienced teachers. Nurturing global minds since 1977.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tagore Vidya Niketan Gadarwara - Best School in Gadarwara | Est. 1977",
    template: "%s | Tagore Vidya Niketan Gadarwara",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Tagore Vidya Niketan",
    "Tagore Vidya Niketan Gadarwara",
    "best school in Gadarwara",
    "school in Gadarwara",
    "English medium school Gadarwara",
    "CBSE school Gadarwara",
    "school Gadarwara Madhya Pradesh",
    "top school Narsinghpur district",
    "Gadarwara school admission",
    "school near me Gadarwara",
    "Pre-Primary to Class 12 Gadarwara",
    "Narsinghpur school",
    "Madhya Pradesh school",
    "best school in Narsinghpur",
    "MPEB Colony Gadarwara school",
    "Aamgaon Naka school",
    "Tagore school",
    "UDISE 23400511801",
    "education Gadarwara",
    "school admission 2026 Gadarwara",
    "English medium school MP",
    "computer education Gadarwara",
    "science lab school Gadarwara",
    "sports school Gadarwara",
    "value based education Gadarwara",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Tagore Vidya Niketan Gadarwara - Best School in Gadarwara | Est. 1977",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Tagore Vidya Niketan Gadarwara - School Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tagore Vidya Niketan Gadarwara - Best School in Gadarwara | Est. 1977",
    description: SITE_DESCRIPTION,
    images: ["/images/logo.png"],
    creator: "@tagorevidyaniketan",
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-IN": SITE_URL,
    },
  },
  category: "Education",
  classification: "Educational Institution",
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-verification-code",
  },
  other: {
    "geo.region": "IN-MP",
    "geo.placename": "Gadarwara, Narsinghpur, Madhya Pradesh",
    "geo.position": "22.9227;78.7809",
    "ICBM": "22.9227, 78.7809",
    "DC.title": SITE_NAME,
    "DC.creator": SITE_NAME,
    "DC.subject": "Education, School, Academic Institution",
    "DC.description": SITE_DESCRIPTION,
    "DC.publisher": SITE_NAME,
    "DC.language": "en-IN",
    "revisit-after": "7 days",
    "rating": "General",
    "distribution": "global",
    "audience": "students, parents, educators",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a6fc4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// JSON-LD Structured Data for Google Rich Results
function SchoolJsonLd() {
  const schoolSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#school`,
    name: "Tagore Vidya Niketan",
    alternateName: [
      "Tagore Vidya Niketan Gadarwara",
      "TVN Gadarwara",
      "Privt HHS Tagore Vidya Niketan Gadarwara",
    ],
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/logo.png`,
    foundingDate: "1977",
    slogan: "We Seek the Highest",
    address: {
      "@type": "PostalAddress",
      streetAddress: "MPEB Colony, Aamgaon Naka",
      addressLocality: "Gadarwara",
      addressRegion: "Madhya Pradesh",
      postalCode: "487551",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.9227,
      longitude: 78.7809,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "admissions",
      email: "info@tagorevidyaniketan.edu.in",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/p/Tagore-Vidya-Niketan-100084325765475/",
      "https://schools.org.in/narsimhapur/23400511801/privt-hss-tagore-vidya-niketan-gadarwara.html",
      "https://www.instagram.com/tagorevidyaniketangadarwara/",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Academic Programs",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "EducationalOccupationalProgram",
            name: "Pre-Primary Education",
            educationalLevel: "Pre-Primary",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "EducationalOccupationalProgram",
            name: "Primary Education (Class 1-5)",
            educationalLevel: "Primary",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "EducationalOccupationalProgram",
            name: "Middle School (Class 6-8)",
            educationalLevel: "Middle School",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "EducationalOccupationalProgram",
            name: "Secondary Education (Class 9-10)",
            educationalLevel: "Secondary",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "EducationalOccupationalProgram",
            name: "Higher Secondary (Class 11-12)",
            educationalLevel: "Higher Secondary",
          },
        },
      ],
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 38,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 22.9227,
        longitude: 78.7809,
      },
      geoRadius: "50000",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "Tagore Vidya Niketan Gadarwara",
    image: `${SITE_URL}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "MPEB Colony, Aamgaon Naka",
      addressLocality: "Gadarwara",
      addressRegion: "Madhya Pradesh",
      postalCode: "487551",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.9227,
      longitude: 78.7809,
    },
    url: SITE_URL,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "14:30",
    },
    priceRange: "$$",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${SITE_URL}/#about`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Academics",
        item: `${SITE_URL}/#academics`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Admissions",
        item: `${SITE_URL}/#admissions`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Gallery",
        item: `${SITE_URL}/#gallery`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Contact",
        item: `${SITE_URL}/#contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <SchoolJsonLd />
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <meta charSet="utf-8" />
      </head>
      <body className={`${_roboto.variable} ${_playfair.variable} font-sans antialiased`}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
