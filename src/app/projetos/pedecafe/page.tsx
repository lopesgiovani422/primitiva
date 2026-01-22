import type { Metadata } from 'next';
import PedeCafePageContent from '@/components/PedeCafePageContent';

export const metadata: Metadata = {
    title: "Pé de Café",
    description: "Identidade visual e branding para o Concurso Pé de Café. Unindo a nostalgia retro-pop com a mineiridade acolhedora.",
    openGraph: {
        title: "Pé de Café — Branding & Web por Primitiva",
        description: "Transformamos um concurso técnico em uma paixão popular através de uma identidade visual proprietária e mascotes cativantes.",
        images: ["/assets/cover/pedecafe.webp"],
        url: "https://primitiva.cc/projetos/pedecafe",
        type: "article",
    },
    alternates: {
        canonical: "https://primitiva.cc/projetos/pedecafe"
    }
};

export default function PedeCafe() {
    return <PedeCafePageContent />;
}
