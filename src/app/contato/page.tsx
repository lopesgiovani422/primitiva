'use client';

import { useEffect, useRef } from 'react';

import ContactHero from '@/components/ContactHero';
import ContactOptions from '@/components/ContactOptions';
import ContactChannels from '@/components/ContactChannels';
import MinimalFooter from '@/components/MinimalFooter';

export default function Contato() {
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

        const animatedElements = document.querySelectorAll('.reveal-up, .fade-in');
        animatedElements.forEach(el => observer.observe(el));

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-[#181010] dark:text-[#f8f5f5]">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">

                <ContactHero />

                <div className="bg-black text-white min-h-[60vh] border-b border-white/10">
                    <div className="p-6 md:p-12 md:pr-24">
                        <div className="flex flex-col md:grid md:grid-cols-12 md:gap-12">

                            <ContactOptions />
                            <ContactChannels />

                        </div>
                    </div>
                </div>

                <MinimalFooter />
            </div>
        </div>
    );
}
