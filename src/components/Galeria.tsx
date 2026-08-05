import React, { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Camera, X, ZoomIn, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDialogA11y } from "../hooks/useDialogA11y";

const IMAGES_TEMPLATE = [
  {
    id: "g1",
    localPath: "/images/galeria/galeria1.jpg",
    demoUrl: "https://lh3.googleusercontent.com/aida/AP1WRLs104Bm1xHiKKNaKjQxC_0eL1mMKKazkFho0vk-mIgBhNy1Z9O-knKTSUGMhBfXFKdjYNfsGV4-n4-vVv7FkENQWiYDqfPBP4I1xGna4UtJ82_2ZDoDTw4SZ9g7oKNQuF1qNL5sqVZhXmOOFZxc3aGLuSqHCkbW_WV4hpA3qPEYlu-Hym_KI6d8vqKhC9woQVkN_HvnfseWDEheYnvG-qQSG-JZzz8CuXyT4cMl68pKq8sZ_WJIeb9zfOc",
    caption: "La pista encendida: Bailadores entregados al sabor y la clave en una noche inolvidable en Son Havana."
  },
  {
    id: "g2",
    localPath: "/images/galeria/galeria2.jpg",
    demoUrl: "https://lh3.googleusercontent.com/aida/AP1WRLvUTPxlE5BqMzR3CdwvhHQCLRAAwG666Xtc9KfpQUFmNU1Q4LUCHeEcR7OEq5N7Hi_Hqgn3IqWBGJChtMZipEEwhDCXLEpGz2_GY-c67-yL6luWe98VcJglsEhGefOLqwUKH9iv7AV3MFm5CRNdiXpiwK8IeL7lkUkin3RwS_QjqvHOo_9LV8DrqD-2U2kuSrE0J3b7YPJr_xMxmKrTeA2cGF9UZC9NdujC68D1ZAuCh6X6kskP-2lwig",
    caption: "La descarga en vivo: Nuestra orquesta residente haciendo vibrar las congas y los metales con pura salsa brava."
  },
  {
    id: "g3",
    localPath: "/images/galeria/galeria3.jpg",
    demoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrbmrZs8PxdjWPpEHpm4-FEryiayBTlYya23BRW4iUKQ5m94lEObLkv9aCzveJDDkx0jfoxFrWPIQhoZamBQAtf3vzytUFg9mosYWfSN_rpzE_fK5RHm0TjxPIruV1Gq_o-6XHeX9-guoWpYsNRcmQJ_tM-JzaYhBvxkoHJmk5R1oc6xTVyWWrv8GCWkoz65Kv-gps8jBA9-Jlwk2USby16_OIiJ7zPcf1bxeRRqHCaPNNHl7Rv6Eg",
    caption: "Vientos de pasión: Un solo magistral de trompeta bajo las luces intensas de nuestro escenario."
  },
  {
    id: "g4",
    localPath: "/images/galeria/galeria4.jpg",
    demoUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800",
    caption: "El descanso de los metales: Trombones reposando sobre el piano, listos para la siguiente tanda de salsa brava."
  },
  {
    id: "g5",
    localPath: "/images/galeria/galeria5.jpg",
    demoUrl: "https://images.unsplash.com/photo-1484755560695-a4c748918c29?auto=format&fit=crop&q=80&w=800",
    caption: "Ensayando la clave: La sección de vientos (trompetas y trombones) ensamblando con precisión el próximo repertorio."
  },
  {
    id: "g6",
    localPath: "/images/galeria/galeria6.jpg",
    demoUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
    caption: "Esencia del son tradicional: Músicos interpretando ritmos caribeños en vivo con conga, trompeta y bajo."
  }
];

export default function Galeria() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [images, setImages] = useState(() =>
    IMAGES_TEMPLATE.map((img) => ({ ...img, url: img.localPath }))
  );
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeLightbox = useCallback(() => setLightboxImage(null), []);
  useDialogA11y(!!lightboxImage, closeLightbox, lightboxRef);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => {
          const next = (prev + 1) % images.length;
          setLightboxImage(images[next].url);
          return next;
        });
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => {
          const next = (prev - 1 + images.length) % images.length;
          setLightboxImage(images[next].url);
          return next;
        });
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxImage, images]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = (id: string) => {
    setImages(prev =>
      prev.map(img => {
        if (img.id === id && img.url !== img.demoUrl) {
          console.log(`[Galeria] Imagen local no encontrada para "${img.id}". Usando demo.`);
          return { ...img, url: img.demoUrl };
        }
        return img;
      })
    );
  };

  const activeImage = images[activeIndex];

  return (
    <section id="galeria" className="min-h-[calc(100vh-5rem)] w-full flex flex-col justify-start pt-16 pb-16 md:pt-20 md:pb-20 px-6 md:px-16 fondo-profundo relative overflow-hidden scroll-mt-20">
      {/* Hidden image detectors to check local files presence and trigger fallbacks immediately */}
      {images.map((img) => (
        <img
          key={`preload-${img.id}`}
          src={img.localPath}
          className="hidden"
          onError={() => handleImageError(img.id)}
          alt=""
          aria-hidden="true"
        />
      ))}

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Column 1: Descriptive text & premium Instagram engagement */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-anybody font-black text-primary-container">
                Galería de Fotos
              </span>
              <h2 className="font-anybody text-3xl sm:text-4xl md:text-[40px] text-white font-black leading-tight mt-2 text-balance">
                MOMENTOS <br />
                <span className="text-primary-container">LEGENDARIOS</span>
              </h2>
              <p className="font-geist text-sm md:text-base text-white/80 mt-4 leading-relaxed max-w-lg">
                Nuestra pista de baile cobra vida en cada disparo. Instantes cargados de salsa pesada, calor rumbero, mojitos helados y la descarga de la mejor orquesta en vivo de Medellín.
              </p>
            </div>

            {/* Premium, highly eye-catching Instagram button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-6 bg-black/25 p-6 rounded-2xl border border-white/5 shadow-inner">
              {/* Circular IG Button with rotating/pulsing ring */}
              <a
                href="https://www.instagram.com/sonhavana"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @sonhavana"
                className="group relative flex items-center justify-center cursor-pointer shrink-0"
              >
                {/* Pulsing outer glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                
                {/* Rotating/pulsing dotted ring */}
                <div className="absolute -inset-2 rounded-full border-2 border-dashed border-coral/40 group-hover:border-coral/80 group-hover:scale-105 transition-all duration-500 animate-[spin_10s_linear_infinite]" />
                
                {/* Core Button */}
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                  <Instagram className="w-8 h-8" />
                </div>
              </a>

              {/* Text label next to/below the circular button */}
              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs font-anybody font-bold text-mango tracking-wider block">
                  @SONHAVANA
                </span>
                <p className="text-white font-anybody font-black text-lg tracking-tight leading-tight">
                  ¡Agréganos a tus redes!
                </p>
                <p className="text-white/80 font-geist text-xs leading-snug">
                  Entérate de la programación diaria, promociones y fotos exclusivas.
                </p>
                <a
                  href="https://www.instagram.com/sonhavana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-mango hover:text-white transition-colors pt-1.5 font-mono font-bold"
                >
                  Seguir en Instagram <span>&rarr;</span>
                </a>
              </div>
            </div>

            {/* Small status showing slide index */}
            <div className="pt-2 flex items-center gap-3 text-xs text-surface/70 font-mono">
              <Camera className="w-4 h-4 text-mango/80" />
              <span>Momento {activeIndex + 1} de {images.length}</span>
            </div>
          </div>

          {/* Column 2: One big image slider with control arrows overlay */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-2xl group bg-black">
              {/* Vignette Overlay & Caption */}
              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                <span className="text-[10px] font-anybody font-black text-mango tracking-[0.2em] uppercase mb-1.5">
                  CAPTURA EN VIVO &bull; SON HAVANA
                </span>
                <p className="text-sm sm:text-base text-white font-geist leading-relaxed max-w-xl font-medium">
                  {activeImage.caption}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setLightboxImage(activeImage.url)}
                className="absolute top-4 right-4 z-30 size-11 rounded-full bg-black/60 text-white hover:bg-mango hover:text-on-surface hover:scale-110 transition-all cursor-pointer shadow-lg flex items-center justify-center"
                aria-label="Expandir foto"
              >
                <ZoomIn className="w-4.5 h-4.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-black/50 hover:bg-mango hover:text-on-surface border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer shadow-md opacity-90"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-black/50 hover:bg-mango hover:text-on-surface border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer shadow-md opacity-90"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  referrerPolicy="no-referrer"
                  alt={activeImage.caption}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover filter brightness-90 hover:brightness-105 transition-all duration-500 cursor-zoom-in"
                  onClick={() => setLightboxImage(activeImage.url)}
                  src={activeImage.url}
                />
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-1 mt-4">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="size-11 flex items-center justify-center cursor-pointer"
                  aria-label={`Ir a la imagen ${idx + 1}`}
                  aria-current={activeIndex === idx ? "true" : undefined}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx ? "w-6 bg-mango" : "w-1.5 bg-white/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 bg-black/95"
              aria-hidden="true"
            />
            <motion.div
              ref={lightboxRef}
              role="dialog"
              aria-modal="true"
              aria-label="Vista ampliada de la galería"
              tabIndex={-1}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[90vh] z-10 flex flex-col items-center outline-none"
            >
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute -top-12 right-0 size-11 text-white hover:text-primary-container transition-all flex items-center justify-center cursor-pointer"
                aria-label="Cerrar vista ampliada"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
              <img
                referrerPolicy="no-referrer"
                src={lightboxImage}
                alt={activeImage.caption}
                width={1600}
                height={1000}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg border border-white/10 shadow-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
