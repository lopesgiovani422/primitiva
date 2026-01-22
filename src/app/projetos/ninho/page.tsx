import type { Metadata } from 'next';
import NinhoPageContent from '@/components/NinhoPageContent';

export const metadata: Metadata = {
    title: "Ninho Tattoo Studio",
    description: "Identidade visual criada pela Primitiva para o Ninho Tattoo Studio. Um conceito visceral de abrigo e acolhimento.",
    openGraph: {
        title: "Ninho Tattoo — Identidade Visual por Primitiva",
        description: "Descubra como traduzimos a visceralidade da tatuagem em uma identidade visual que equilibra dor e acolhimento.",
        images: ["/assets/cover/ninho.webp"],
        url: "https://primitiva.cc/projetos/ninho",
        type: "article",
    },
    alternates: {
        canonical: "https://primitiva.cc/projetos/ninho"
    }
};

export default function Ninho() {
    return <NinhoPageContent />;
}
