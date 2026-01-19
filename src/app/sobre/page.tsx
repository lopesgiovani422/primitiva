import type { Metadata } from 'next';
import AboutPageContent from '@/components/AboutPageContent';

export const metadata: Metadata = {
    title: "Sobre Nós",
    description: "Conheça a Primitiva, um estúdio de design e branding em Juiz de Fora. Estratégia, identidade e essência para marcas que querem fugir do óbvio.",
    openGraph: {
        title: "Sobre a Primitiva",
        description: "Conheça nossa história, metodologia e quem faz acontecer no nosso estúdio criativo em Juiz de Fora.",
        images: ["/assets/primitiva/about_us.webp"],
        url: "https://primitiva.cc/sobre",
        type: "profile",
    },
    alternates: {
        canonical: "https://primitiva.cc/sobre"
    }
};

export default function Sobre() {
    return <AboutPageContent />;
}
