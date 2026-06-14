import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import FloatingButtons from "@/components/FloatingButtons";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { LanguageProvider } from "@/lib/i18n/context";

export const metadata: Metadata = {
  title: "iBoTV Player Pro — Smart Streaming Media Player",
  description:
    "A cleaner media player workflow. Fast setup, simple controls, better playback on every device.",
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
