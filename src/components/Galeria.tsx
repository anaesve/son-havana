import React, { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, Instagram, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDialogA11y } from "../hooks/useDialogA11y";

const IMAGES_TEMPLATE = [
  {
    id: "g1",
    localPath: "/images/galeria/galeria1.jpg",
    demoUrl:
      "https://lh3.googleusercontent.com/aida/AP1WRLs104Bm1xHiKKNaKjQxC_0eL1mMKKazkFho0vk-mIgBhNy1Z9O-knKTSUGMhBfXFKdjYNfsGV4-n4-vVv7FkENQWiYDqfPBP4I1xGna4UtJ82_2ZDoDTw4SZ9g7oKNQuF1qNL5sqVZhXmOOFZxc3aGLuSqHCkbW_WV4hpA3qPEYlu-Hym_KI6d8vqKhC9woQVkN_HvnfseWDEheYnvG-qQSG-JZzz8CuXyT4cMl68pKq8sZ_WJIeb9zfOc",
    title: "Pista encendida",
    caption:
      "Bailadores entregados al sabor y la clave en una noche inolvidable en Son Havana.",
    instagramUrl: "https://www.instagram.com/sonhavana/",
  },
  {
    id: "g2",
    localPath: "/images/galeria/galeria2.jpg",
    demoUrl:
      "https://lh3.googleusercontent.com/aida/AP1WRLvUTPxlE5BqMzR3CdwvhHQCLRAAwG666Xtc9KfpQUFmNU1Q4LUCHeEcR7OEq5N7Hi_Hqgn3IqWBGJChtMZipEEwhDCXLEpGz2_GY-c67-yL6luWe98VcJglsEhGefOLqwUKH9iv7AV3MFm5CRNdiXpiwK8IeL7lkUkin3RwS_QjqvHOo_9LV8DrqD-2U2kuSrE0J3b7YPJr_xMxmKrTeA2cGF9UZC9NdujC68D1ZAuCh6X6kskP-2lwig",
    title: "Descarga en vivo",
    caption:
      "Nuestra orquesta residente haciendo vibrar las congas y los metales con pura salsa brava.",
    instagramUrl: "https://www.instagram.com/sonhavana/",
  },
  {
    id: "g3",
    localPath: "/images/galeria/galeria3.jpg",
    demoUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrbmrZs8PxdjWPpEHpm4-FEryiayBTlYya23BRW4iUKQ5m94lEObLkv9aCzveJDDkx0jfoxFrWPIQhoZamBQAtf3vzytUFg9mosYWfSN_rpzE_fK5RHm0TjxPIruV1Gq_o-6XHeX9-guoWpYsNRcmQJ_tM-JzaYhBvxkoHJmk5R1oc6xTVyWWrv8GCWkoz65Kv-gps8jBA9-Jlwk2USby16_OIiJ7zPcf1bxeRRqHCaPNNHl7Rv6Eg",
    title: "Vientos de pasión",
    caption: "Un solo magistral de trompeta bajo las luces intensas de nuestro escenario.",
    instagramUrl: "https://www.instagram.com/sonhavana/",
  },
  {
    id: "g4",
    localPath: "/images/galeria/galeria4.jpg",
    demoUrl:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800",
    title: "Metales en pausa",
    caption:
      "Trombones reposando sobre el piano, listos para la siguiente tanda de salsa brava.",
    instagramUrl: "https://www.instagram.com/sonhavana/",
  },
  {
    id: "g5",
    localPath: "/images/galeria/galeria5.jpg",
    demoUrl:
      "https://images.unsplash.com/photo-1484755560695-a4c748918c29?auto=format&fit=crop&q=80&w=800",
    title: "Ensayando la clave",
    caption: "La sección de vientos ensamblando con precisión el próximo repertorio.",
    instagramUrl: "https://www.instagram.com/sonhavana/",
  },
  {
    id: "g6",
    localPath: "/images/galeria/galeria6.jpg",
    demoUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
    title: "Esencia del son",
    caption:
      "Músicos interpretando ritmos caribeños en vivo con conga, trompeta y bajo.",
    instagramUrl: "https://www.instagram.com/sonhavana/",
  },
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

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleImageError = (id: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id && img.url !== img.demoUrl ? { ...img, url: img.demoUrl } : img
      )
    );
  };

  const activeImage = images[activeIndex];

  const scrollControls = (
    <div className="flex items-center justify-center gap-2 bg-black/55 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-lg w-full max-w-sm mx-auto">
      <button
        type="button"
        onClick={handlePrev}
        className="size-11 rounded-full text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center shrink-0"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </button>
      <div className="flex gap-0.5 min-w-0">
        {images.map((img, index) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="size-10 sm:size-11 flex items-center justify-center cursor-pointer"
            aria-label={`Ir a la foto ${index + 1}: ${img.title}`}
            aria-current={activeIndex === index ? "true" : undefined}
          >
            <span
              className={`block w-2.5 h-2.5 rounded-full transition-all ${
                activeIndex === index
                  ? "bg-mango scale-110 shadow-md shadow-mango/50"
                  : "bg-white/35"
              }`}
            />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={handleNext}
        className="size-11 rounded-full text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center shrink-0"
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <section
      id="galeria"
      className="w-full flex flex-col justify-start pt-12 pb-12 md:pt-14 md:pb-14 px-6 md:px-16 fondo-profundo relative overflow-x-clip scroll-mt-20"
    >
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 lg:items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-anybody font-black text-primary-container">
                Galería de Fotos
              </span>
              <h2 className="font-anybody text-3xl sm:text-4xl md:text-[40px] text-white font-black leading-tight mt-2 text-balance">
                MOMENTOS <br />
                <span className="text-primary-container">LEGENDARIOS</span>
              </h2>
              <p className="font-geist text-sm md:text-base text-white/80 mt-3 leading-relaxed">
                Nuestra pista de baile cobra vida en cada disparo. Instantes cargados de salsa
                pesada, calor rumbero, mojitos helados y la descarga de la mejor orquesta en vivo de
                Medellín.
              </p>
            </div>

            <div className="flex flex-col gap-8 md:gap-10 bg-black/30 pt-10 md:pt-12 px-6 md:px-8 pb-6 md:pb-8 rounded-2xl border border-white/10 shadow-inner lg:flex-1">
              <a
                href="https://www.instagram.com/sonhavana"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @sonhavana"
                className="group relative self-center sm:self-start flex items-center justify-center cursor-pointer shrink-0"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] opacity-50 blur-lg group-hover:opacity-90 transition-opacity duration-500 motion-safe:animate-pulse" />
                <div className="absolute -inset-2 rounded-full border-2 border-dashed border-coral/40 group-hover:border-coral/80 transition-all duration-500 motion-safe:animate-[spin_12s_linear_infinite]" />
                <div className="relative w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-xl">
                  <Instagram className="w-8 h-8 md:w-9 md:h-9" aria-hidden="true" />
                </div>
              </a>

              <div className="space-y-2.5 text-center sm:text-left">
                <span className="text-xs font-anybody font-bold text-mango tracking-wider block">
                  @SONHAVANA
                </span>
                <p className="text-white font-anybody font-black text-xl md:text-2xl tracking-tight leading-tight">
                  ¡Únete a la rumba digital!
                </p>
                <p className="text-white/85 font-geist text-sm leading-relaxed">
                  Sigue la pista, las descargas en vivo y las noches donde la salsa brava llena el
                  club. Programación diaria, fotos exclusivas y el backstage de la mejor rumba de
                  Medellín.
                </p>
                <p className="text-white/75 font-geist text-sm leading-relaxed">
                  Aquí celebramos el legado de íconos como{" "}
                  <span className="text-mango font-semibold">Ismael Rivera</span>,{" "}
                  <span className="text-mango font-semibold">el Gran Combo de Puerto Rico</span>,{" "}
                  <span className="text-mango font-semibold">Oscar D&apos;León</span> y{" "}
                  <span className="text-mango font-semibold">Grupo Niche</span>: el mismo sabor que
                  vibra cada noche en Son Havana.
                </p>
                <a
                  href="https://www.instagram.com/sonhavana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-mango text-on-surface hover:bg-primary-container hover:text-on-primary-container px-6 py-3.5 rounded-full font-anybody font-black text-xs uppercase tracking-wider transition-transform shadow-md hover:scale-[1.03] active:scale-[0.98] mt-1"
                >
                  Seguir en Instagram →
                </a>
              </div>

              <div className="mt-auto border-t border-mango/35 pt-8 md:pt-10">{scrollControls}</div>
            </div>
          </div>

          <div className="lg:col-span-7 min-h-[16rem] sm:min-h-[20rem] lg:min-h-0 lg:self-stretch">
            <div className="relative h-full min-h-[16rem] sm:min-h-[20rem] lg:min-h-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black">
              <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/55 to-transparent p-5 sm:p-7 flex flex-col justify-end gap-2">
                <span className="text-[10px] font-anybody font-black text-mango tracking-[0.2em] uppercase">
                  CAPTURA EN VIVO • SON HAVANA
                </span>
                <p className="text-base sm:text-lg text-white font-anybody font-black leading-tight">
                  {activeImage.title}
                </p>
                <p className="text-sm text-white/85 font-geist leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {activeImage.caption}
                </p>
                <a
                  href={activeImage.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 self-start mt-1 text-xs font-anybody font-black uppercase tracking-wider text-mango hover:text-white transition-colors"
                >
                  Ver en Instagram
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => setLightboxImage(activeImage.url)}
                className="absolute top-4 right-4 z-30 size-11 rounded-full bg-black/60 text-white hover:bg-mango hover:text-on-surface transition-all cursor-pointer shadow-lg flex items-center justify-center"
                aria-label="Expandir foto"
              >
                <ZoomIn className="w-4.5 h-4.5" aria-hidden="true" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  referrerPolicy="no-referrer"
                  alt={`${activeImage.title}: ${activeImage.caption}`}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover brightness-90 hover:brightness-105 transition-all duration-500 cursor-zoom-in"
                  onClick={() => setLightboxImage(activeImage.url)}
                  src={activeImage.url}
                />
              </AnimatePresence>
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
              className="relative max-w-4xl max-h-[90vh] z-10 flex flex-col items-center outline-none gap-4"
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
                alt={`${activeImage.title}: ${activeImage.caption}`}
                width={1600}
                height={1000}
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg border border-white/10 shadow-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
