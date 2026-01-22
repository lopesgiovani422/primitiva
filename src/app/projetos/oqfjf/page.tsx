import type { Metadata } from 'next';
import OQfJFPageContent from '@/components/OQfJFPageContent';

export const metadata: Metadata = {
    title: "O Que Fazer em JF?",
    description: "Identidade visual e estratégia para o guia oficial de Juiz de Fora. Uma marca pulsante para a cidade em movimento.",
    openGraph: {
        title: "O Que Fazer em JF? — Identidade Visual por Primitiva",
        description: "Construímos uma marca urbana e dinâmica, elevando a percepção cultural de Juiz de Fora através de uma identidade visual vibrante.",
        images: ["/assets/cover/oqfjf.webp"],
        url: "https://primitiva.cc/projetos/oqfjf",
        type: "article",
    },
    alternates: {
        canonical: "https://primitiva.cc/projetos/oqfjf"
    }
};

export default function OqueFazerEmJF() {
    return <OQfJFPageContent />;
}
