import Link from 'next/link';

export default function ContactHero() {
    return (
        <header className="relative bg-black text-white min-h-[40vh] flex flex-col p-6 md:p-12 border-b border-white/10">
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
                    <Link
                        href="/sobre"
                        className="text-xs font-bold tracking-wider uppercase cursor-pointer hover:opacity-60 transition-opacity"
                    >
                        Sobre
                    </Link>
                    <span className="text-xs font-bold tracking-wider uppercase text-white underline underline-offset-4">
                        Contato
                    </span>
                </div>
            </nav>

            <div className="flex-1 flex flex-col justify-end items-start mt-10">
                <div className="relative overflow-hidden w-full">
                    <h1 className="font-display font-black text-[14vw] md:text-[10vw] leading-[0.8] tracking-tighter uppercase text-white mix-blend-difference reveal-up delay-100">
                        BORA<br />
                        CONVERSAR?
                    </h1>
                </div>
            </div>
        </header>
    );
}
