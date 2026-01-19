import Link from 'next/link';

export default function Header() {
    return (
        <header className="relative bg-black text-white h-[100svh] flex flex-col p-6 md:p-12 border-b border-white/10 overflow-hidden">
            <nav className="flex items-center justify-between py-2 reveal-up active">
                <Link href="/">
                    <img src="/assets/primitiva/primitiva_logo.svg" alt="Logo Primitiva" className="h-6 w-auto"
                        fetchPriority="high" width="120" height="24" />
                </Link>
                <div className="flex gap-4">
                    <Link href="/sobre"
                        className="text-xs font-bold tracking-wider uppercase cursor-pointer hover:opacity-60 transition-opacity">Sobre</Link>
                    <Link href="/contato"
                        className="text-xs font-bold tracking-wider uppercase cursor-pointer hover:opacity-60 transition-opacity">Contato</Link>
                </div>
            </nav>

            <div className="flex-1 flex flex-col justify-center items-start mt-10 w-full">
                <div className="relative mb-8 overflow-hidden w-full">
                    <h1
                        className="font-display font-black text-[18vw] md:text-[10vw] lg:text-[9vw] leading-[0.8] tracking-tighter uppercase text-white mix-blend-difference reveal-up delay-100 w-full break-words">
                        SEJA<br />
                        DIFÍCIL<br />
                        DE<br />
                        IGNORAR
                    </h1>
                </div>

                <div className="w-full grid grid-cols-2 gap-4 mt-auto border-t border-white/20 pt-6 reveal-up delay-300">
                    <div>
                        <p className="text-sm md:text-base font-light italic opacity-80 max-w-[250px] md:max-w-md">
                            Construímos marcas sólidas <br />para negócios <br />que não aceitam <br />ser só mais um.
                        </p>
                    </div>
                    <div className="flex justify-end items-end">
                        <span className="material-symbols-outlined text-4xl animate-bounce">arrow_downward</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
