'use client';

import { useEffect } from 'react';

export default function ClientAnimations() {
    useEffect(() => {
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

        const setupObserver = () => {
            const animatedElements = document.querySelectorAll('.reveal-up, .reveal-text, .reveal-img, .fade-in, .line-grow');
            animatedElements.forEach(el => observer.observe(el));
        };

        // Run setup at different intervals to ensure all dynamically loaded content is caught
        setupObserver();
        const timers = [100, 500, 1000, 2000].map(ms => setTimeout(setupObserver, ms));

        return () => {
            observer.disconnect();
            timers.forEach(t => clearTimeout(t));
        };
    }, []);

    return null;
}
