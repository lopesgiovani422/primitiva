'use client';

import { useEffect } from 'react';

export default function LottieInitializer() {
    useEffect(() => {
        // Import the lottie player component once on the client
        import('@dotlottie/player-component').catch(err => {
            console.error('Failed to load Lottie player:', err);
        });
    }, []);

    return null;
}
