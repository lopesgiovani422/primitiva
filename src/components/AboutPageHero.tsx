import Link from 'next/link';

export default function AboutPageHero() {
    return (
        <header className="relative bg-black text-white min-h-[50vh] flex flex-col p-6 md:p-12 border-b border-white/10">
            <nav className="flex items-center justify-between py-2 reveal-up">
                <Link href="/">
                    <img
                        src="/assets/primitiva/primitiva_logo.svg"
                        alt="Logo Primitiva"
                        className="h-6 w-auto"
                        fetchPriority="high"
                        width="120"
                        height="24"
                    />
                </Link>
                <div className="flex gap-4">
                    <span className="text-xs font-bold tracking-wider uppercase text-white underline underline-offset-4">
                        Sobre
                    </span>
                    <Link
                        href="/contato"
                        className="text-xs font-bold tracking-wider uppercase cursor-pointer hover:opacity-60 transition-opacity"
                    >
                        Contato
                    </Link>
                </div>
            </nav>

            <div className="flex-1 flex flex-col justify-end items-start mt-10">
                <div className="relative overflow-hidden w-full">
                    <div className="flex items-center gap-3 mb-4 opacity-80 reveal-up delay-100">
                        <span className="size-2 bg-white rounded-full animate-pulse"></span>
                        <span className="font-mono text-xs tracking-[0.2em] uppercase">A Origem</span>
                    </div>
                    <h1 className="font-display font-black text-[10vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase text-white reveal-up delay-200">
                        Primitiva
                    </h1>
                </div>
            </div>
        </header>
    );
}
