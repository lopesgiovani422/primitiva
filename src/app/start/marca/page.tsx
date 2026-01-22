import type { Metadata } from 'next';
import BrandForm from './BrandForm';

export const metadata: Metadata = {
    title: "Briefing de Marca",
    description: "Defina a essência, personalidade e estratégia da sua marca. O primeiro passo para construir algo único.",
    openGraph: {
        title: "Briefing de Marca | Primitiva",
        description: "Defina a essência, personalidade e estratégia da sua marca. O primeiro passo para construir algo único.",
        url: "https://primitiva.cc/start/marca",
        type: "website",
        images: ["/assets/primitiva/thumb.jpg"] // Fallback to main thumb or specific if available
    },
    alternates: {
        canonical: "https://primitiva.cc/start/marca"
    },
    robots: {
        index: false,
        follow: false,
    }
};

export default function BrandBriefingPage() {
    return <BrandForm />;
}
