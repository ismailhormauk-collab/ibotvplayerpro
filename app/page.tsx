import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME, BRAND_NAME, SITE_OG_IMAGE } from "@/lib/site";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const title = "ibo player pro — Smart IPTV & Streaming Media Player";
const description =
  "ibo player pro is a smart, easy-to-use media player for streaming live TV, movies, and series on Android TV, Fire Stick, Samsung, LG, and more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SITE_OG_IMAGE.url],
  },
};

// Above-the-fold sections load immediately.
// Everything below is dynamically imported so Next.js splits them into
// separate chunks — they are fetched only when the browser is ready.
const AppPreviewSection  = dynamic(() => import("@/components/sections/AppPreviewSection"));
const CoreFeaturesSection = dynamic(() => import("@/components/sections/CoreFeaturesSection"));
const HowItWorksSection  = dynamic(() => import("@/components/sections/HowItWorksSection"));
const PricingSection     = dynamic(() => import("@/components/sections/PricingSection"));
const AboutSection       = dynamic(() => import("@/components/sections/AboutSection"));
const PlatformsSection   = dynamic(() => import("@/components/sections/PlatformsSection"));
const FaqSection         = dynamic(() => import("@/components/sections/FaqSection"));

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+${WHATSAPP_NUMBER}`,
        email: "contact@ibotvplayerpro.com",
        availableLanguage: ["English", "French", "German", "Spanish"],
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: SITE_URL,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HeroSection />
      <AppPreviewSection />
      <CoreFeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <AboutSection />
      <PlatformsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
