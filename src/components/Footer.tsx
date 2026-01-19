import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative bg-black text-white py-24 px-6 overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
                <img src="/assets/primitiva/primitiva_logo.svg" alt="Logo Primitiva"
                    className="h-6 w-auto mb-12 reveal-up" />
                <h2
                    className="text-5xl md:text-6xl font-black leading-none uppercase tracking-tighter mb-6 reveal-up delay-100">
                    Pront@<br />pra fugir<br />do óbvio?
                </h2>
            </div>

            <Link href="/briefing"
                className="w-full bg-white text-black h-16 text-lg font-black uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 max-w-sm mx-auto reveal-up delay-300">
                <span>Iniciar Ritual</span>
                <span className="material-symbols-outlined text-xl">east</span>
            </Link>

            <div
                className="mt-24 pt-8 border-t border-white/20 w-full flex flex-col md:flex-row justify-between items-center gap-4 fade-in">
                <div className="flex gap-6 text-xs font-mono uppercase text-gray-500">
                    <a className="hover:text-white transition-colors"
                        href="https://www.instagram.com/primitiva.cc" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a className="hover:text-white transition-colors"
                        href="https://www.behance.net/primitiva.cc" target="_blank" rel="noopener noreferrer">Behance</a>
                    <a className="hover:text-white transition-colors" href="mailto:oi@primitiva.cc">Email</a>
                </div>
                <span className="text-[10px] text-gray-600 font-mono mt-4 md:mt-0">© 2026 Primitiva. Todos os direitos
                    reservados.</span>
            </div>
        </footer>
    );
}
