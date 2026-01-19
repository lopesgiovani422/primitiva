'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Methodology from '@/components/Methodology';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';

export default function Home() {
  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Initial check for elements
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.reveal-up, .reveal-text, .reveal-img, .fade-in');
      animatedElements.forEach(el => observer.observe(el));
    }, 100);

    // Secondary check for slower loading content
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.reveal-up, .reveal-text, .reveal-img, .fade-in');
      animatedElements.forEach(el => observer.observe(el));
    }, 500);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="relative flex w-full flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Primitiva — Estúdio Criativo",
            "image": "https://primitiva.cc/assets/primitiva/primitiva1.jpg",
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
              "https://www.instagram.com/primitiva.estudio"
            ]
          })
        }}
      />
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
