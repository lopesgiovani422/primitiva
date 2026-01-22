import DesenvolvimentoPageContent from '@/components/DesenvolvimentoPageContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Desenvolvimento Web de Alta Performance | Next.js',
    description: 'Criamos sites ultrarrápidos e aplicações web com Next.js. Foco em UX, performance e conversão. Chega de WordPress lento.',
    openGraph: {
        title: 'Desenvolvimento Web de Alta Performance | Primitiva',
        description: 'Criamos sites ultrarrápidos e aplicações web com Next.js. Foco em UX, performance e conversão.',
        images: ['/assets/primitiva/thumb.webp'],
    },
};

export default function DesenvolvimentoPage() {
    return <DesenvolvimentoPageContent />;
}
