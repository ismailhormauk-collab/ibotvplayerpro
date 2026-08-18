import type { Metadata } from "next";
import FaqPage from "@/components/FaqPage";
import { translations } from "@/lib/i18n/translations";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/site";

const title = "FAQ — ibo player pro";
const description =
  "Frequently asked questions about activating your IPTV service, supported devices, and contacting ibo player pro support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/faq" },
  openGraph: {
    title,
    description,
    url: "/faq",
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

export default function Page() {
  // FAQPage schema mirrors the English FAQ content actually rendered server-side
  // (the language switcher only changes content client-side after hydration).
  const faqs = translations.en.faqPage.faqs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/faq` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FaqPage />
    </>
  );
}
