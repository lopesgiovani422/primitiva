import LazyGTM from '@/components/LazyGTM';
import { GoogleAnalytics } from '@next/third-parties/google';
import MetaPixel from '@/components/analytics/MetaPixel';
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = localFont({
  src: [
    { path: "./fonts/space-grotesk-normal-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/space-grotesk-normal-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-grotesk-normal-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/space-grotesk-normal-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/space-grotesk-normal-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    { path: "./fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const spaceMono = localFont({
  src: [
    { path: "./fonts/space-mono-normal-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-mono-normal-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/space-mono-italic-400.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-space-mono",
  display: "swap",
});

import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  interactiveWidget: 'resizes-content',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://primitiva.cc'),
  title: {
    default: "Primitiva — Coletivo Criativo",
    template: "%s | Primitiva"
  },
  description: "Coletivo de Design e Tecnologia. Especialistas em Identidade Visual, Branding Estratégico e Desenvolvimento Web de alta performance.",
  keywords: ["branding", "design", "identidade visual", "estratégia de marca", "web design", "desenvolvimento web", "juiz de fora", "coletivo criativo", "marketing digital", "UX/UI"],
  authors: [{ name: "Primitiva Studio" }, { name: "Giovani Lopes" }, { name: "Gustavo Tempone" }],
  creator: "Primitiva Studio",
  publisher: "Primitiva Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Primitiva — Coletivo Criativo",
    description: "Coletivo de Design e Tecnologia. Especialistas em Identidade Visual, Branding e Desenvolvimento Web de alta performance.",
    url: "https://primitiva.cc",
    siteName: "Primitiva",
    images: [
      {
        url: "/assets/primitiva/thumb.jpg",
        width: 1200,
        height: 630,
        alt: "Primitiva Studio - Branding & Design",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Primitiva — Coletivo Criativo",
    description: "Coletivo criativo especializado em branding, design e experiências digitais que fogem do óbvio.",
    images: ["/assets/primitiva/thumb.jpg"],
    creator: "@primitiva", // Replace if there is a real handle
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-32x32.png", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

import { PHProvider } from '@/providers/PostHogProvider';
import LottieInitializer from "@/components/LottieInitializer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`light ${spaceGrotesk.variable} ${instrumentSerif.variable} ${spaceMono.variable}`}>
      <body
        className="antialiased bg-background-light text-[#181010] font-display"
      >
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
        <MetaPixel />
        <LazyGTM />
        <LottieInitializer />
        <PHProvider>
          {children}
        </PHProvider>
      </body>
    </html>
  );
}

