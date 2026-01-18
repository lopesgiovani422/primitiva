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

export const metadata = {
  metadataBase: new URL('https://chipper-tiramisu-c22958.netlify.app'),
  title: "Primitiva — Estúdio Criativo",
  description: "Estúdio criativo especializado em branding, design e experiências digitais que fogem do óbvio.",
  openGraph: {
    title: "Primitiva — Estúdio Criativo",
    description: "Estúdio criativo especializado em branding, design e experiências digitais que fogem do óbvio.",
    url: "https://chipper-tiramisu-c22958.netlify.app",
    siteName: "Primitiva",
    images: [
      {
        url: "/assets/primitiva/primitiva1.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
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

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`light scroll-smooth ${spaceGrotesk.variable} ${playfairDisplay.variable} ${spaceMono.variable}`}>
      <body
        className="antialiased bg-background-light text-[#181010] font-display"
      >
        {children}
      </body>
    </html>
  );
}
