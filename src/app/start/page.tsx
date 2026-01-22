import type { Metadata } from 'next';
import StartHub from './StartHub';

export const metadata: Metadata = {
    title: "Portal de Briefings",
    description: "Selecione o ritual de descoberta adequado para o seu momento atual. Inicie seu projeto de Marca ou Site com a Primitiva.",
    openGraph: {
        title: "Portal de Briefings | Primitiva",
        description: "Selecione o ritual de descoberta adequado para o seu momento atual. Inicie seu projeto de Marca ou Site com a Primitiva.",
        url: "https://primitiva.cc/start",
        type: "website",
        images: ["/assets/primitiva/thumb.jpg"]
    },
    alternates: {
        canonical: "https://primitiva.cc/start"
    },
    robots: {
        index: false,
        follow: false,
    }
};

export default function StartPage() {
    return <StartHub />;
}
