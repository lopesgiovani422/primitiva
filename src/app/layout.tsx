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

const playfairDisplay = localFont({
  src: [
    { path: "./fonts/playfair-display-normal-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/playfair-display-normal-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/playfair-display-italic-400.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-playfair-display",
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
}

export const metadata: Metadata = {
  metadataBase: new URL('https://primitiva.cc'),
  title: {
    default: "Primitiva — Estúdio Criativo",
    template: "%s | Primitiva"
  },
  description: "Estúdio de Design e Tecnologia. Especialistas em Identidade Visual, Branding Estratégico e Desenvolvimento Web de alta performance.",
  keywords: ["branding", "design", "identidade visual", "estratégia de marca", "web design", "desenvolvimento web", "juiz de fora", "estúdio criativo", "marketing digital", "UX/UI"],
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
    title: "Primitiva — Estúdio Criativo",
    description: "Estúdio de Design e Tecnologia. Especialistas em Identidade Visual, Branding e Desenvolvimento Web de alta performance.",
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
    title: "Primitiva — Estúdio Criativo",
    description: "Estúdio criativo especializado em branding, design e experiências digitais que fogem do óbvio.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`light ${spaceGrotesk.variable} ${playfairDisplay.variable} ${spaceMono.variable}`}>
      <body
        className="antialiased bg-background-light text-[#181010] font-display"
      >
        {children}
      </body>
    </html>
  );
}

