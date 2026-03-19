import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FixedCTA from "@/components/layout/FixedCTA";
import {
  JsonLd,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
} from "@/lib/schema/jsonld";
import "./globals.css";
import { LenisProvider } from "@/components/motion/LenisProvider";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "遺骨.com｜粉骨・洗骨の専門機関",
  description:
    "粉骨・洗骨の専門機関 遺骨.com。写真報告書付き・料金透明・全国対応。散骨・改葬・保存のための遺骨前処理を専門機関品質で提供します。",
  metadataBase: new URL("https://ikotsu.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "遺骨.com｜粉骨・洗骨の専門機関",
    images: [
      {
        url: "/og?title=遺骨.com｜粉骨・洗骨の専門機関",
        width: 1200,
        height: 630,
        alt: "遺骨.com｜粉骨・洗骨の専門機関",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?title=遺骨.com｜粉骨・洗骨の専門機関"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '3PkayZf9g0-EFWdG-1hOMAnJ2vu9_dvaQTmBxlkRc5E',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body>
        <LenisProvider>
        {/* GA4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity */}
        {CLARITY_ID && (
          <Script id="clarity-init" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `}
          </Script>
        )}

        <a href="#main-content" className="skip-link">
          メインコンテンツへスキップ
        </a>

        <Header />

        <main id="main-content">{children}</main>

        <Footer />
        <FixedCTA />

        {/* Global Schema */}
        <JsonLd data={generateOrganizationSchema()} />
        <JsonLd data={generateLocalBusinessSchema()} />
              </LenisProvider>
      </body>
    </html>
  );
}
