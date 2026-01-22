'use client';

import { useEffect, useState } from 'react';

const GTM_ID = 'GTM-N5PSJC3D';

export default function LazyGTM() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Wait for the page to be fully loaded before loading GTM
        const loadGTM = () => {
            if (loaded) return;

            // Initialize dataLayer
            const w = window as any;
            w.dataLayer = w.dataLayer || [];
            w.dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });

            // Create and inject GTM script
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
            script.async = true;
            document.head.appendChild(script);

            setLoaded(true);
        };

        // Load GTM after a short delay to prioritize main content
        // Using requestIdleCallback for browsers that support it
        if ('requestIdleCallback' in window) {
            (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadGTM);
        } else {
            // Fallback: load after 2 seconds
            setTimeout(loadGTM, 2000);
        }
    }, [loaded]);

    // GTM noscript fallback
    return loaded ? (
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
            />
        </noscript>
    ) : null;
}


