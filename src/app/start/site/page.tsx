import type { Metadata } from 'next';
import SiteForm from './SiteForm';

export const metadata: Metadata = {
    title: "Briefing de Site",
    description: "Planeje a arquitetura, funcionalidades e objetivos do seu novo site. Tecnologia e design alinhados ao seu negócio.",
    openGraph: {
        title: "Briefing de Site | Primitiva",
        description: "Planeje a arquitetura, funcionalidades e objetivos do seu novo site. Tecnologia e design alinhados ao seu negócio.",
        url: "https://primitiva.cc/start/site",
        type: "website",
        images: ["/assets/primitiva/thumb.jpg"]
    },
    alternates: {
        canonical: "https://primitiva.cc/start/site"
    },
    robots: {
        index: false,
        follow: false,
    }
};

export default function SiteBriefingPage() {
    return <SiteForm />;
}
