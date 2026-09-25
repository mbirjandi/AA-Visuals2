import type { Metadata, Viewport } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import { SiteNav } from "@/components/SiteNav";
import { Cursor } from "@/components/Cursor";
import { ReelProvider } from "@/components/reel/ReelProvider";
import { site } from "@/data/site";
import Script from "next/script";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.person}, videographer and editor in London`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f4f3ef",
  colorScheme: "light",
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.person,
  jobTitle: "Videographer and editor",
  worksFor: { "@type": "Organization", name: site.name },
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  url: site.url,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${interTight.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </head>
      <body>
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        <a
          href="#main"
          className="meta fixed top-3 left-3 z-[100] -translate-y-24 bg-ink px-3 py-2 text-paper focus:translate-y-0"
        >
          Skip to content
        </a>
        <ReelProvider>
          <SiteNav />
          <main id="main">{children}</main>
        </ReelProvider>
        <Cursor />
      </body>
    </html>
  );
}
