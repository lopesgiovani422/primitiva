import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Methodology from '@/components/Methodology';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import ClientAnimations from '@/components/ClientAnimations';

export default function Home() {
  return (
    <main className="relative flex w-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Primitiva — Coletivo Criativo",
            "image": "https://primitiva.cc/assets/primitiva/thumb.webp",
            "@id": "https://primitiva.cc",
            "url": "https://primitiva.cc",
            "telephone": "",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "",
              "addressLocality": "Juiz de Fora",
              "addressRegion": "MG",
              "postalCode": "",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -21.7642,
              "longitude": -43.3503
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.instagram.com/primitiva.cc"
            ]
          })
        }}
      />
      <ClientAnimations />
      <Header />
      <Hero />
      <Services />
      <Methodology />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
