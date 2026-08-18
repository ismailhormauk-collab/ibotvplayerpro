import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import FloatingButtons from "@/components/FloatingButtons";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { LanguageProvider } from "@/lib/i18n/context";
import { SITE_URL, SITE_NAME, SITE_OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "iBoTV Player Pro — Smart Streaming Media Player",
  description:
    "A cleaner media player workflow. Fast setup, simple controls, better playback on every device.",
  robots: { index: true, follow: true },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    images: [SITE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          <SiteHeader />
          {children}
          <FloatingButtons />
          <LanguageSwitcher />
        </LanguageProvider>
      </body>
    </html>
  );
}
