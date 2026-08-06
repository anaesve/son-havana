import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar, Sparkles, Phone, Music, Pause, Play } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface HeroProps {
  onBookingOpen: () => void;
}

interface Slide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bgUrl: string; // This will hold the path/fallback url dynamically
  localPath: string; // The target local path for the user
  demoUrl: string; // The demo backup url
  price?: string;
  highlights: string[];
  ctaText: string;
  secondaryCtaText?: string;
  waText: string;
  /** Cartel ilustrado: sin copy encima, solo bloque inferior + CTAs */
  posterLayout?: boolean;
}

const SLIDES_TEMPLATE: Omit<Slide, "bgUrl">[] = [
  {
    id: "son-kmaron",
    badge: "",
    title: "",
    subtitle: "Son K'maron",
    description: "",
    localPath: "/images/hero/son-kmaron.jpg",
    demoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYTcqV6EBGI1xWvG689UvIm6Kjr-qxNUc3JPdVj2eD-4gMlhiGOR4AOKasnwA32UcKCOB15OTMxu01qW5Lh1y_OKEkRPvAMAo8CNfPj1G6hvVcQoP6H4EoRKa_MeUmoFScFONcbrulmuIvc2jZPhVNjeG9q5Pf15iOZ-D7JTWtojXiejaYw0-biW2RvT9iYg6u00QlYPnhdpmD-tvMWD33jspfWxSv5yBx-1WOk7kmjm7Ve0VAUU-_",
    price: "$25.000 COP",
    highlights: ["Música en vivo", "Feria de Flores"],
    ctaText: "Reserva Aquí",
    secondaryCtaText: "Quiero saber más",
    waText:
      "¡Hola! Quiero saber más sobre la presentación de Son K'maron este jueves 06 de agosto en Feria de Flores.",
    posterLayout: true,
  },
  {
    id: "niche",
    badge: "Gran Homenaje de la Casa",
    title: "SON HAVANA ALL STARS",
    subtitle: "HOMENAJE AL GRUPO NICHE",
    description: "La orquesta de la casa rinde homenaje al creador del himno salsero de Colombia, Jairo Varela. Canta y baila éxitos legendarios como 'Cali Pachanguero', 'Algo Que Se Quede', 'Buen Viento' y más.",
    localPath: "/images/hero/grupo-niche.jpg",
    demoUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1600",
    price: "$25.000 COP",
    highlights: ["Orgullo y sabor nacional", "Arreglos originales", "Show en vivo toda la noche"],
    ctaText: "Reservar Mesa para Niche",
    waText: "¡Hola! Quisiera reservar mi mesa para el Homenaje al Grupo Niche en Son Havana."
  },
  {
    id: "programacion",
    badge: "Cartelera Oficial de la Semana",
    title: "VIVE LA RUMBA, VIVE CUBA",
    subtitle: "PROGRAMACIÓN SEMANAL",
    description: "La rumba caribeña en el corazón de Medellín. Orquestas en vivo, clases gratuitas, la mejor selección de clásicos, rones seleccionados, mojitos frescos y la energía única donde el que baila siempre gana.",
    localPath: "/images/hero/programacion-semanal.jpg",
    demoUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1600",
    price: "La mejor energía",
    highlights: ["Cócteles y mojitos caribeños", "Pista de baile sin fin", "El mejor ambiente de la ciudad"],
    ctaText: "Reservar para esta Semana",
    waText: "¡Hola! Quisiera información y reservar mesa para la programación de esta semana en Son Havana."
  },
  {
    id: "miercoles",
    badge: "Miércoles Casino en Son Havana",
    title: "ESTE MIÉRCOLES EN MEDELLÍN",
    subtitle: "CLASE GRATIS DE BAILE • 8PM",
    description: "Aprende a bailar salsa y casino de la mano de instructores profesionales de forma 100% gratuita. Quédate disfrutando de timba cubana auténtica, promoción de cócteles 2x1 y no cover.",
    localPath: "/images/hero/clases-baile.jpg",
    demoUrl: "https://images.unsplash.com/photo-1524117074187-3575b7f39a91?auto=format&fit=crop&q=80&w=1600",
    price: "ENTRADA LIBRE (NO COVER)",
    highlights: ["Clases interactivas para todos", "Cócteles 2x1 seleccionados", "100% Timba, casino y son"],
    ctaText: "Anotarse en la Clase",
    waText: "¡Hola! Quisiera reservar cupos/mesa para la clase gratis de Salsa Casino de este miércoles."
  }
];

export default function Hero({ onBookingOpen }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!reduceMotion);
  const [slides, setSlides] = useState<Slide[]>(() =>
    SLIDES_TEMPLATE.map((s) => ({ ...s, bgUrl: s.localPath }))
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (reduceMotion) setIsPlaying(false);
  }, [reduceMotion]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPlaying && !reduceMotion) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 7000);
    }
  }, [isPlaying, slides.length, reduceMotion]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleImageError = (id: string) => {
    setSlides(prev => 
      prev.map(s => {
        if (s.id === id && s.bgUrl !== s.demoUrl) {
          console.log(`[Hero Slider] Imagen local no encontrada para "${s.id}". Usando demo de respaldo: ${s.demoUrl}`);
          return { ...s, bgUrl: s.demoUrl };
        }
        return s;
      })
    );
  };

  const currentSlide = slides[currentIndex];

  const handleWhatsApp = (text: string) => {
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/573105156550?text=${encodedText}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-on-surface pt-28 pb-0 md:pt-32 select-none scroll-mt-20"
      onMouseDown={() => setIsPlaying(false)}
      onMouseUp={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={() => setIsPlaying(false)}
      onTouchEnd={() => setIsPlaying(true)}
    >
      {/* Full Background Photographic Slider with High Opacity & Maximum Brightness */}
      <div className="absolute inset-0 z-0">
        {slides.map((s) =>
          s.id === currentSlide.id ? null : (
            <img
              key={`preload-${s.id}`}
              src={s.localPath}
              className="hidden"
              onError={() => handleImageError(s.id)}
              alt=""
              aria-hidden="true"
            />
          )
        )}

        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide.id}
            src={currentSlide.bgUrl}
            alt={
              currentSlide.posterLayout
                ? "Cartel Son K'maron — Salsa Clásica con Estilo, jueves 06 de agosto en Feria de Flores"
                : ""
            }
            aria-hidden={currentSlide.posterLayout ? undefined : true}
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => handleImageError(currentSlide.id)}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.98, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.8 }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Scrim: en las 3 primeras slides el velo se concentra en el centro
            (donde va el copy) y deja las esquinas más claras para que se vea
            la ilustración. El slide de clases mantiene el scrim fotográfico. */}
        {currentSlide.id === "son-kmaron" ? (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse 48% 42% at 0% 0%, color-mix(in srgb, var(--color-on-surface) 22%, transparent) 0%, transparent 72%),
                  radial-gradient(ellipse 48% 42% at 100% 0%, color-mix(in srgb, var(--color-on-surface) 22%, transparent) 0%, transparent 72%),
                  radial-gradient(ellipse 48% 42% at 0% 100%, color-mix(in srgb, var(--color-on-surface) 26%, transparent) 0%, transparent 72%),
                  radial-gradient(ellipse 48% 42% at 100% 100%, color-mix(in srgb, var(--color-on-surface) 26%, transparent) 0%, transparent 72%)
                `,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/35 via-transparent to-transparent pointer-events-none" />
          </>
        ) : currentIndex < 3 ? (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 72% 68% at 50% 48%, color-mix(in srgb, var(--color-on-surface) 82%, transparent) 0%, color-mix(in srgb, var(--color-on-surface) 55%, transparent) 42%, color-mix(in srgb, var(--color-on-surface) 18%, transparent) 68%, transparent 100%)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/55 via-transparent to-on-surface/20 pointer-events-none" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-on-surface/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface via-on-surface/50 to-on-surface/10" />
          </>
        )}
      </div>

      {/* Copy superior (solo banners con texto encima del fondo) */}
      {!currentSlide.posterLayout && (
        <div className="absolute inset-x-0 top-28 md:top-32 bottom-[20rem] md:bottom-[21rem] z-20 flex flex-col items-center justify-center px-6 md:px-12 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center w-full max-w-5xl space-y-5"
            >
              <div
                className="flex items-center gap-2 text-xs sm:text-sm font-black tracking-widest uppercase text-mango"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,1)" }}
              >
                <Sparkles className="w-4 h-4 text-mango animate-pulse" />
                <span>{currentSlide.badge}</span>
              </div>

              <div className="space-y-1.5 max-w-3xl">
                <h1
                  className="block text-sm sm:text-base font-black uppercase tracking-[0.2em] text-white/90 font-anybody"
                  style={{ textShadow: "0 2px 10px rgba(0,0,0,1)" }}
                >
                  Son Havana
                  <span className="sr-only"> — Salsa y son cubano en Medellín</span>
                </h1>
                <p
                  className="font-anybody text-[2rem] leading-[1.15] sm:text-4xl sm:leading-[1.12] md:text-[44px] lg:text-[48px] font-black tracking-tight uppercase text-white text-balance"
                  style={{ textShadow: "0 3px 15px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,1)" }}
                  aria-live="polite"
                >
                  {currentSlide.subtitle}
                </p>
                <p
                  className="block text-xs sm:text-sm font-black uppercase tracking-[0.15em] text-white/80 font-anybody"
                  style={{ textShadow: "0 2px 10px rgba(0,0,0,1)" }}
                >
                  {currentSlide.title}
                </p>
              </div>

              <p
                className="font-geist text-sm sm:text-base md:text-lg text-white font-medium leading-relaxed max-w-2xl"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,1), 0 1px 2px rgba(0,0,0,0.9)" }}
              >
                {currentSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {currentSlide.posterLayout && (
        <h1 className="sr-only">
          Son K&apos;maron — Salsa Clásica con Estilo. Jueves 06 de agosto en Feria de Flores.
        </h1>
      )}

      {/* Bloque inferior fijo: misma altura en todos los slides */}
      <div className="absolute inset-x-0 bottom-[11rem] md:bottom-[12rem] z-20 px-6 md:px-12 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="max-w-5xl mx-auto flex flex-col items-center space-y-4"
          >
            <div
              className="flex flex-wrap justify-center items-center gap-y-2 text-xs sm:text-sm font-black text-white font-archivo max-w-3xl min-h-[1.25rem]"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,1)" }}
            >
              {currentSlide.highlights.map((h, i) => (
                <span key={i} className="inline-flex items-center">
                  {i > 0 && <span className="text-mango mx-3 select-none text-base">•</span>}
                  <span>{h}</span>
                </span>
              ))}
            </div>

            {currentSlide.price && (
              <div
                className="text-xs sm:text-sm font-black text-mango tracking-wider font-anybody uppercase flex items-center gap-2 min-h-[1.25rem]"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,1)" }}
              >
                <Music className="w-4 h-4 text-mango" />
                <span>Aporte Cultural: {currentSlide.price}</span>
              </div>
            )}

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none"
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <button
                onClick={onBookingOpen}
                className="w-full sm:w-auto bg-primary-container hover:bg-primary text-on-primary-container font-black uppercase tracking-wider text-xs sm:text-sm px-10 py-5 rounded-full sombra-dura-cta hover:scale-[1.03] transition-all cursor-pointer flex items-center justify-center gap-2.5 font-anybody"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>{currentSlide.ctaText}</span>
              </button>
              <button
                onClick={() => handleWhatsApp(currentSlide.waText)}
                className="w-full sm:w-auto border border-surface/30 hover:border-success/60 bg-on-surface/50 hover:bg-success/20 text-surface font-bold text-xs sm:text-sm px-10 py-5 rounded-full backdrop-blur-sm transition-all cursor-pointer flex items-center justify-center gap-2.5 font-anybody"
              >
                <Phone className="w-4.5 h-4.5 text-success" />
                <span>{currentSlide.secondaryCtaText ?? "Escríbenos por WhatsApp"}</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation controls */}
      <div
        className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-lg"
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handlePrev}
          className="size-11 rounded-full text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="flex gap-1">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => handleDotClick(index)}
              className="size-11 flex items-center justify-center cursor-pointer"
              aria-label={`Ir al banner ${index + 1}: ${slide.subtitle}`}
              aria-current={currentIndex === index ? "true" : undefined}
            >
              <span
                className={`block w-2.5 h-2.5 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-primary-container scale-110 shadow-md shadow-primary-container/50"
                    : "bg-white/35"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={togglePlay}
          className="size-11 rounded-full text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
          aria-label={isPlaying ? "Pausar carrusel" : "Reproducir carrusel"}
          aria-pressed={isPlaying}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Play className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="size-11 rounded-full text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

    </section>
  );
}
