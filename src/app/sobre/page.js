'use client';

import { useEffect, useRef } from 'react';

import AboutPageHero from '@/components/AboutPageHero';
import AboutOrigin from '@/components/AboutOrigin';
import AboutSectionImage from '@/components/AboutSectionImage';
import AboutTeam from '@/components/AboutTeam';
import AboutValues from '@/components/AboutValues';
import SimpleFooter from '@/components/SimpleFooter';

export default function Sobre() {
    const observerRef = useRef(null);

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

        // Activate nav immediately
        const nav = document.querySelector('nav');
        if (nav) nav.classList.add('active');

        // Second pass after a small delay to catch everything
        setTimeout(() => {
            animatedElements.forEach(el => observer.observe(el));
        }, 100);

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    return (
        <div className="bg-background-light font-display antialiased text-[#181010]">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">

                <AboutPageHero />

                <AboutOrigin />

                <AboutSectionImage
                    src="/assets/primitiva/primitiva1.jpg"
                    alt="Primitiva Studio"
                    location="Juiz de Fora — MG"
                    established="2025"
                />

                <AboutTeam />

                <AboutValues />

                <SimpleFooter />
            </div>
        </div>
    );
}
