'use client';

import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';

export default function ProjectNavigation() {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-40 bg-background-dark/80 backdrop-blur-sm border-b border-white/10">
            <div className="flex items-center justify-between p-4 h-16">
                <Link href="/"
                    aria-label="Voltar para a página inicial"
                    className="flex items-center justify-center size-10 text-white hover:bg-white/10 transition-colors rounded-sm">
                    <ArrowLeft className="w-7 h-7" />
                </Link>
                <div className="flex items-center gap-2">
                    <img src="/assets/primitiva/primitiva_logo.svg" alt="Logo Primitiva" className="h-5 w-auto" />
                </div>
                <button onClick={handleShare}
                    aria-label="Compartilhar projeto"
                    className="flex items-center justify-center size-10 text-white hover:bg-white/10 transition-colors rounded-sm cursor-pointer">
                    <Share2 className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
}
