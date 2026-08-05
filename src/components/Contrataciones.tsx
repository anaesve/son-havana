import React, { useState } from "react";
import { ArrowRight, PartyPopper, Heart } from "lucide-react";

interface ContratacionesProps {
  onQuoteArtist: (artistName: string) => void;
}

export default function Contrataciones({ onQuoteArtist }: ContratacionesProps) {
  const [sonKmaronSrc, setSonKmaronSrc] = useState("/images/contrataciones/sonk'maron.jpg");
  const [elSonDePabloSrc, setElSonDePabloSrc] = useState("/images/contrataciones/elsondepablo.jpg");

  const DEMO_SON_KMARON = "https://lh3.googleusercontent.com/aida-public/AB6AXuDYTcqV6EBGI1xWvG689UvIm6Kjr-qxNUc3JPdVj2eD-4gMlhiGOR4AOKasnwA32UcKCOB15OTMxu01qW5Lh1y_OKEkRPvAMAo8CNfPj1G6hvVcQoP6H4EoRKa_MeUmoFScFONcbrulmuIvc2jZPhVNjeG9q5Pf15iOZ-D7JTWtojXiejaYw0-biW2RvT9iYg6u00QlYPnhdpmD-tvMWD33jspfWxSv5yBx-1WOk7kmjm7Ve0VAUU-_";
  const DEMO_EL_SON_DE_PABLO = "https://lh3.googleusercontent.com/aida-public/AB6AXuAk0zKiZVYQrchuUVQIpeXuJ85iGo-Yow9itPNPS3gs4kCIeAJWY0JTQGsd-wLsN6vgEzk--wcYbxSQTybtjNkzRQogMCq-WXVhnqSfyzWdlQX5u3sJgseG1tJjdcsrOiLQgVRPX96WBPoj3MeJLB5y47fb7PIY55XXDwTk2nyfGykb2oYPQfkUckMYYnMlavJ2h-MCVq82U7KUYOqgJ6qOTZuslWqRVKpKKqbhta5PYRe-Sb5rP14o";

  return (
    <section id="contrataciones" className="min-h-[calc(100vh-5rem)] w-full flex flex-col justify-start pt-16 pb-16 md:pt-20 md:pb-20 px-6 md:px-16 fondo-tinta relative overflow-hidden scroll-mt-20">
      {/* Decorative radial neon blur in the corner */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-container/5 blur-[120px] rounded-full -mr-64 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10 md:mb-12">
          <div className="lg:col-span-8">
            <span className="text-[10px] uppercase tracking-[0.25em] font-anybody font-black text-primary-container">
              Artistas Exclusivos SH
            </span>
            <h2
              className="font-anybody text-2.5xl sm:text-3.5xl md:text-[40px] lg:text-[44px] text-primary-container font-black leading-tight mt-1"
              style={{ letterSpacing: "-0.02em" }}
            >
              LLEVA LA RUMBA <br />
              <span className="text-white">A TU EVENTO</span>
            </h2>
            <p className="font-geist text-base md:text-lg text-surface-variant/80 max-w-2xl mt-3">
              Desde orquestas legendarias de salsa en vivo con vientos potentes, hasta agrupaciones de son cubano tradicional y ritmos afro-antillanos. El sello de calidad Son Havana en tu celebración.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              onClick={() => onQuoteArtist("Combo Completo Son Havana Corporativo")}
              style={{ borderRadius: 9999 }}
              className="inline-flex items-center justify-center gap-2 font-anybody font-black text-xs sm:text-sm uppercase tracking-wider text-on-primary-container bg-primary-container hover:bg-primary px-6 py-3.5 rounded-full shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] group"
            >
              Cotizar evento especial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Dynamic Booking Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Son K'maron */}
          <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-variant/5 border border-surface-variant/10 shadow-lg">
            <div className="absolute inset-0 z-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
            <img
              referrerPolicy="no-referrer"
              alt="Orquesta Son K'maron en vivo"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={sonKmaronSrc}
              onError={() => {
                if (sonKmaronSrc !== DEMO_SON_KMARON) {
                  console.log("[Contrataciones] Imagen local no encontrada para Son K'maron. Usando demo.");
                  setSonKmaronSrc(DEMO_SON_KMARON);
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end z-10">
              <span className="bg-secondary-container text-on-secondary-container font-anybody font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded self-start mb-2">
                Recomendado
              </span>
              <h3 className="font-anybody font-black text-2xl md:text-3xl text-white mb-0.5">
                SON K'MARON
              </h3>
              <p className="text-surface-variant/90 text-xs md:text-sm font-semibold mb-4">
                Orquesta en Vivo de Salsa & Sabor
              </p>
              <button
                onClick={() => onQuoteArtist("SON K'MARON")}
                style={{ borderRadius: 9999 }}
                className="bg-surface text-on-surface hover:bg-primary-container hover:text-on-primary-container px-6 py-3 rounded-full font-anybody font-black text-xs uppercase tracking-wider self-start transition-transform cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.98]"
              >
                Solicitar Cotización
              </button>
            </div>
          </div>

          {/* Card 2: El Son de Pablo */}
          <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-variant/5 border border-surface-variant/10 shadow-lg">
            <div className="absolute inset-0 z-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
            <img
              referrerPolicy="no-referrer"
              alt="El Son de Pablo en concierto"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={elSonDePabloSrc}
              onError={() => {
                if (elSonDePabloSrc !== DEMO_EL_SON_DE_PABLO) {
                  console.log("[Contrataciones] Imagen local no encontrada para El Son de Pablo. Usando demo.");
                  setElSonDePabloSrc(DEMO_EL_SON_DE_PABLO);
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end z-10">
              <span className="bg-mango text-on-surface font-anybody font-black text-[9px] uppercase tracking-widest px-2 py-0.5 rounded self-start mb-2">
                Son & Salsa Cubana
              </span>
              <h3 className="font-anybody font-black text-2xl md:text-3xl text-white mb-0.5">
                EL SON DE PABLO
              </h3>
              <p className="text-surface-variant/90 text-xs md:text-sm font-semibold mb-4">
                Son Cubano Tradicional & Sabor Auténtico
              </p>
              <button
                onClick={() => onQuoteArtist("EL SON DE PABLO")}
                style={{ borderRadius: 9999 }}
                className="bg-surface text-on-surface hover:bg-primary-container hover:text-on-primary-container px-6 py-3 rounded-full font-anybody font-black text-xs uppercase tracking-wider self-start transition-transform cursor-pointer shadow-lg hover:scale-[1.03] active:scale-[0.98]"
              >
                Reservar Fecha
              </button>
            </div>
          </div>

          {/* Column 3: Corporate and Wedding Mini-Cards */}
          <div className="grid grid-rows-2 gap-6 aspect-[4/5]">
            {/* Eventos Corporativos */}
            <div className="bg-primary-container/10 border border-primary-container/20 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden group hover:border-primary-container/40 transition-all">
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container mb-3 shadow-inner">
                <PartyPopper className="w-5 h-5" />
              </div>
              <h3 className="font-anybody font-black text-white text-lg md:text-xl uppercase">
                Eventos Corporativos
              </h3>
              <p className="text-surface-variant/80 text-xs md:text-sm mt-1 mb-3 leading-relaxed">
                Experiencias y talleres de baile temáticos para empresas que buscan ritmo, unión e identidad cultural.
              </p>
              <button
                onClick={() => onQuoteArtist("Combo Completo Son Havana Corporativo")}
                style={{ borderRadius: 9999 }}
                className="self-start inline-flex items-center gap-2 bg-primary-container text-on-primary-container hover:bg-primary px-5 py-2.5 rounded-full font-anybody font-black text-xs uppercase tracking-wider shadow-md transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Cotizar evento →
              </button>
            </div>

            {/* Reserva de Bodas */}
            <div className="bg-mango/10 border border-mango/20 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden group hover:border-mango/40 transition-all">
              <div className="w-10 h-10 rounded-full bg-mango/20 flex items-center justify-center text-mango mb-3 shadow-inner">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <h3 className="font-anybody font-black text-white text-lg md:text-xl uppercase">
                Reserva de Bodas
              </h3>
              <p className="text-surface-variant/80 text-xs md:text-sm mt-1 mb-3 leading-relaxed">
                Haz que tu gran día tenga el auténtico sabor y la alegría de Son Havana. Música en vivo, ambientación caribeña única y show de baile inolvidable.
              </p>
              <button
                onClick={() => onQuoteArtist("Reserva de Bodas")}
                style={{ borderRadius: 9999 }}
                className="self-start inline-flex items-center gap-2 bg-mango text-on-surface hover:bg-primary-container hover:text-on-primary-container px-5 py-2.5 rounded-full font-anybody font-black text-xs uppercase tracking-wider shadow-md transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Cotizar boda →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
