export default function AboutSectionImage({ src, alt, location, established }) {
    return (
        <section className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden border-b border-black/10 reveal-up">
            <img
                src={src}
                alt={alt}
                className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-125 hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white z-10">
                <span className="font-mono text-xs uppercase tracking-widest block mb-2">{location}</span>
                <span className="font-display font-bold text-3xl">EST. {established}</span>
            </div>
        </section>
    );
}
