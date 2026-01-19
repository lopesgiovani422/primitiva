import type { Metadata } from 'next';
import ContactPageContent from '@/components/ContactPageContent';

export const metadata: Metadata = {
    title: "Contato | Primitiva",
    description: "Vamos construir algo único juntos? Entre em contato com a Primitiva e inicie seu projeto de branding e design.",
    openGraph: {
        title: "Fale com a Primitiva",
        description: "Vamos tirar suas ideias do papel. Agende uma conversa e descubra como podemos transformar sua marca.",
        url: "https://primitiva.cc/contato",
        type: "website",
    },
    alternates: {
        canonical: "https://primitiva.cc/contato"
    }
};

export default function Contato() {
    return <ContactPageContent />;
}
