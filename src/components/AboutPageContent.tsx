'use client';

import { useEffect, useRef } from 'react';

import AboutPageHero from '@/components/AboutPageHero';
import AboutOrigin from '@/components/AboutOrigin';
import AboutSectionImage from '@/components/AboutSectionImage';
import AboutTeam from '@/components/AboutTeam';
import AboutValues from '@/components/AboutValues';
import MinimalFooter from '@/components/MinimalFooter';

export default function AboutPageContent() {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observerRef.current = observer;

        // Force an initial check
        const animatedElements = document.querySelectorAll('.reveal-up, .fade-in, .reveal-text');
        animatedElements.forEach(el => observer.observe(el));

        // Activate hero elements immediately
        const heroElements = document.querySelectorAll('header .reveal-up, header .reveal-text, header .fade-in');
        heroElements.forEach(el => {
            el.classList.add('active');
            observer.unobserve(el);
        });

        // Second pass after a small delay to catch everything else
        setTimeout(() => {
            const allAnimated = document.querySelectorAll('.reveal-up, .fade-in, .reveal-text');
            allAnimated.forEach(el => observer.observe(el));
        }, 100);

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    return (
        <main className="bg-background-light font-display antialiased text-[#181010]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [{
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://primitiva.cc"
                        }, {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Sobre",
                            "item": "https://primitiva.cc/sobre"
                        }]
                    })
                }}
            />
            <AboutPageHero />
            <AboutOrigin />
            <AboutSectionImage
                src="/assets/primitiva/about_us.webp"
                alt="Primitiva Coletivo"
                location="Juiz de Fora — MG"
                established="2022"
            />
            <AboutTeam />
            <AboutValues />
            <MinimalFooter />
        </main>
    );
}
