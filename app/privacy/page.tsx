import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/site";

const title = "Privacy Policy — ibo player pro";
const description = "How ibo player pro collects, uses, and protects your personal information.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title,
    description,
    url: "/privacy",
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
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE_URL}/privacy` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PolicyPage pageKey="privacy" />
    </>
  );
}
