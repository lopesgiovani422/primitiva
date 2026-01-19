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
