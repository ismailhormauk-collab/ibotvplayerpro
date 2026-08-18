import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/site";

const title = "Terms of Service — ibo player pro";
const description = "The terms and conditions governing your use of ibo player pro.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: {
    title,
    description,
    url: "/terms",
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
      { "@type": "ListItem", position: 2, name: "Terms of Service", item: `${SITE_URL}/terms` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PolicyPage pageKey="terms" />
    </>
  );
}
