import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, Volume2, VolumeX, Disc, ChevronDown, ChevronUp, Radio, Loader2, AlertCircle } from "lucide-react";
import { Track } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface LiveChannel extends Track {
  audioUrl: string;
  tag: string;
}

const PLAYLIST: LiveChannel[] = [
  {
    id: "1",
    title: "Zeta 93 (WZNT)",
    artist: "Puerto Rico • Salsa y sabor caribeño",
    duration: "LIVE",
    tag: "Salsa",
    audioUrl: "https://liveaudio.lamusica.com/PR_WZNT_icy",
  },
  {
    id: "2",
    title: "Salsoul (WPRM)",
    artist: "Puerto Rico • Salsa clásica 24/7",
    duration: "LIVE",
    tag: "Salsa Clásica",
    audioUrl: "https://server20.servistreaming.com:9023/stream",
  },
  {
    id: "3",
    title: "Mega 97.9 FM (WSKQ)",
    artist: "Nueva York • Tropical y salsa",
    duration: "LIVE",
    tag: "Tropical",
    audioUrl: "https://liveaudio.lamusica.com/NY_WSKQ_icy",
  },
  {
    id: "4",
    title: "Radio Progreso 90.3",
    artist: "Cuba • Noticias y música desde la Isla",
    duration: "LIVE",
    tag: "Cuba",
    audioUrl: "https://icecast.teveo.cu/XjfW7qWN",
  },
  {
    id: "5",
    title: "Timba Nation Radio",
    artist: "Timba, salsa y descarga en vivo",
    duration: "LIVE",
    tag: "Timba",
    audioUrl: "https://stream.zeno.fm/ss7gf0pypuhvv",
  },
];

export default function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const track = PLAYLIST[currentTrackIndex];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loadedUrlRef = useRef<string>("");
  const stateRef = useRef({ currentTrackIndex, isPlaying, volume, isMuted });

  // Update stateRef on every render to avoid stale closure issues in the single audio listeners
  useEffect(() => {
    stateRef.current = { currentTrackIndex, isPlaying, volume, isMuted };
  });

  // Initialize the single audio element and its events once on mount
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = isMuted ? 0 : volume;

    const handleCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handlePlaying = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const handleAudioError = (e: Event) => {
      // Only handle/show errors if the audio was actually supposed to be playing
      // and we have a valid source that isn't the document/empty.
      const audio = audioRef.current;
      if (!audio || !stateRef.current.isPlaying || !audio.src || audio.src === window.location.href || audio.src.endsWith("/")) {
        return;
      }
      console.error("Audio playback error on track index:", stateRef.current.currentTrackIndex, e);
      setIsLoading(false);
      setHasError(true);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("error", handleAudioError);

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      try {
        audio.load();
      } catch (err) {
        // ignore
      }
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("error", handleAudioError);
      audioRef.current = null;
    };
  }, []);

  // Synchronize playback and source changes.
  // Comparar contra loadedUrlRef (URL pedida), no contra audio.src: algunos
  // streams redirigen y el src resuelto ya no coincide con la URL del playlist.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const expectedSrc = PLAYLIST[currentTrackIndex].audioUrl;

      if (loadedUrlRef.current !== expectedSrc) {
        setIsLoading(true);
        setHasError(false);
        loadedUrlRef.current = expectedSrc;
        audio.src = expectedSrc;
        audio.load();
      }

      audio.play().catch((err) => {
        console.warn("Audio play blocked/failed:", err);
        if (err.name === "NotAllowedError") {
          setIsPlaying(false);
        } else {
          setHasError(true);
        }
        setIsLoading(false);
      });
    } else {
      audio.pause();
      // Instantly clear the source to close the HTTP stream connection & save bandwidth
      // but do it safely without triggering page-load errors
      if (audio.src && audio.src !== "" && audio.src !== window.location.href) {
        loadedUrlRef.current = "";
        audio.removeAttribute("src");
        try {
          audio.load();
        } catch (err) {
          // ignore
        }
      }
      setIsLoading(false);
    }
  }, [isPlaying, currentTrackIndex]);

  // Synchronize volume separately to prevent track reloading during volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Auto-advance on error
  useEffect(() => {
    let errorTimeout: NodeJS.Timeout;
    if (hasError && isPlaying) {
      errorTimeout = setTimeout(() => {
        handleNextTrack();
        setHasError(false);
      }, 4000); // Auto-skip to the next station after 4 seconds of error
    }
    return () => clearTimeout(errorTimeout);
  }, [hasError, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[150] w-full"
      role="region"
      aria-label="Radio Son Havana"
    >
      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* Minimized Compact Floating Tab on the Right */
          <motion.div
            key="minimized-sticky"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="absolute bottom-6 right-6 flex items-center"
          >
            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              className="flex items-center gap-3 bg-on-surface border-2 border-primary-container/40 p-3 rounded-full shadow-2xl text-white hover:border-primary-container hover:scale-105 transition-all group cursor-pointer"
              id="minimized-player"
              aria-label="Abrir emisora Son Havana"
            >
              <div className="relative">
                <Disc
                  className={`w-10 h-10 text-primary-container animate-spin-slow ${
                    !isPlaying ? "pause-animation" : ""
                  }`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Radio className="w-4 h-4 text-white" />
                </div>
                {isPlaying && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                )}
              </div>
              <div className="text-left pr-3 hidden sm:block">
                <div className="text-[9px] uppercase font-anybody font-black text-primary-container tracking-wider">
                  EMISORA SALSA
                </div>
                <div className="text-xs font-anybody font-black text-surface truncate max-w-[150px] uppercase">
                  {track.title}
                </div>
              </div>
              <ChevronUp className="w-4 h-4 text-surface-variant/70 mr-1" />
            </button>
          </motion.div>
        ) : (
          /* Full Sticky Bottom Bar */
          <motion.div
            key="expanded-sticky"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="w-full bg-on-surface/95 border-t border-primary-container/40 shadow-2xl backdrop-blur-xl"
            id="expanded-player"
          >
            {/* Top tiny progress line (animated live pulsating light) */}
            <div className="relative w-full h-1 bg-black/40 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-primary via-mango to-primary rounded-r-full transition-all duration-300 ${
                  isPlaying ? "w-full animate-pulse" : "w-1/12"
                }`}
              ></div>
            </div>

            {/*
              Móvil: columna (meta → controles centrados → canales + volumen).
              Desktop: play fijo al centro; Ocultar izq / cambiar der; LIVE junto al nombre.
            */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-col gap-3 lg:relative lg:min-h-[4.75rem]">
              <div className="flex items-center gap-3 min-w-0 lg:absolute lg:left-6 xl:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:max-w-[38%] xl:max-w-[40%]">
                <div className="relative w-11 h-11 bg-black rounded-full shrink-0 flex items-center justify-center shadow-md border border-white/5 overflow-hidden">
                  <div className="absolute inset-0 vinyl-grooves rounded-full" />
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center animate-spin-slow ${
                      !isPlaying || isLoading || hasError ? "pause-animation" : ""
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center relative">
                      <div className="w-1.5 h-1.5 rounded-full bg-on-surface" />
                    </div>
                  </div>
                </div>

                <div className="min-w-0 text-left flex-1">
                  <span className="text-[10px] font-anybody font-black text-surface tracking-widest uppercase block">
                    {hasError ? "• SEÑAL INACTIVA" : isLoading ? "• BUFFERING…" : "• SEÑAL EN VIVO"}
                  </span>
                  <div className="flex items-center gap-2 min-w-0 mt-0.5">
                    <p className="text-sm font-anybody font-black text-white truncate uppercase leading-tight">
                      {track.title}
                    </p>
                    <span className="inline-flex shrink-0 items-center justify-center px-2 py-0.5 text-[8px] font-anybody font-black text-mango bg-mango/15 rounded-full border border-mango/20 uppercase tracking-wider">
                      {track.duration}
                    </span>
                  </div>
                  {hasError ? (
                    <span className="text-[10px] text-danger font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-danger shrink-0" aria-hidden="true" />
                      Señal caída, saltando…
                    </span>
                  ) : (
                    <p className="text-[11px] text-surface-variant/80 truncate">
                      {isLoading ? "Conectando con la emisora…" : track.artist}
                    </p>
                  )}
                </div>
              </div>

              {/* Móvil: fila centrada Ocultar | Play | Cambiar */}
              <div className="flex items-center justify-center gap-3 lg:hidden">
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="flex items-center justify-center gap-1.5 size-11 rounded-full bg-primary-container/20 border-2 border-primary-container/50 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer shadow-md"
                  aria-label="Ocultar emisora"
                >
                  <ChevronDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className="size-11 rounded-full bg-gradient-to-br from-primary-container to-primary text-on-primary-container font-black hover:scale-105 active:scale-95 transition-all shadow-md flex items-center justify-center cursor-pointer"
                  aria-label={isPlaying ? "Pausar emisora" : "Sintonizar salsa en vivo"}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 text-on-primary-container animate-spin" aria-hidden="true" />
                  ) : isPlaying ? (
                    <Pause className="w-4 h-4 fill-current text-on-primary-container shrink-0" aria-hidden="true" />
                  ) : (
                    <Play className="w-4 h-4 fill-current text-on-primary-container motion-safe:animate-pulse shrink-0" aria-hidden="true" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleNextTrack}
                  className="size-11 rounded-full bg-black/40 hover:bg-black/60 text-primary-container hover:text-white transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Siguiente canal salsero"
                >
                  <SkipForward className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              {/* Desktop: play anclado al centro; Ocultar/cambiar con absolute */}
              <div className="hidden lg:flex lg:absolute lg:left-1/2 lg:top-1/2 lg:z-10 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:items-center">
                <div className="absolute right-full mr-2">
                  <button
                    type="button"
                    onClick={() => setIsMinimized(true)}
                    className="flex items-center gap-1.5 h-10 px-3 rounded-full bg-primary-container/20 border-2 border-primary-container/50 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer shadow-md whitespace-nowrap"
                    aria-label="Ocultar emisora"
                  >
                    <ChevronDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span className="text-[9px] font-anybody font-black uppercase tracking-wider">
                      Ocultar
                    </span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className="size-11 rounded-full bg-gradient-to-br from-primary-container to-primary text-on-primary-container font-black hover:scale-105 active:scale-95 transition-all shadow-md flex items-center justify-center cursor-pointer"
                  aria-label={isPlaying ? "Pausar emisora" : "Sintonizar salsa en vivo"}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 text-on-primary-container animate-spin" aria-hidden="true" />
                  ) : isPlaying ? (
                    <Pause className="w-4 h-4 fill-current text-on-primary-container shrink-0" aria-hidden="true" />
                  ) : (
                    <Play className="w-4 h-4 fill-current text-on-primary-container motion-safe:animate-pulse shrink-0" aria-hidden="true" />
                  )}
                </button>
                <div className="absolute left-full ml-2">
                  <button
                    type="button"
                    onClick={handleNextTrack}
                    className="size-10 rounded-full bg-black/40 hover:bg-black/60 text-primary-container hover:text-white transition-all flex items-center justify-center cursor-pointer"
                    aria-label="Siguiente canal salsero"
                  >
                    <SkipForward className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:absolute lg:right-6 xl:right-8 lg:top-1/2 lg:-translate-y-1/2 gap-3 min-w-0 border-t border-white/5 pt-3 lg:border-0 lg:pt-0 lg:max-w-[42%] xl:max-w-[45%]">
                <div className="flex items-center justify-center gap-1.5 flex-wrap max-w-full" role="group" aria-label="Canales">
                  {PLAYLIST.map((t, idx) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setCurrentTrackIndex(idx);
                        setIsPlaying(true);
                      }}
                      className={`size-11 lg:size-auto lg:h-8 lg:min-w-8 lg:px-2 px-2 text-[10px] font-anybody font-black rounded-full transition-all border cursor-pointer shrink-0 ${
                        currentTrackIndex === idx
                          ? "bg-primary-container text-on-primary-container border-primary-container shadow-md"
                          : "bg-black/45 text-surface-variant/80 border-white/5 hover:border-surface-variant/20 hover:text-white"
                      }`}
                      aria-label={`Canal ${idx + 1}: ${t.title}`}
                      aria-pressed={currentTrackIndex === idx}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="size-11 flex items-center justify-center text-surface-variant/80 hover:text-white transition-colors cursor-pointer shrink-0"
                    aria-label={isMuted || volume === 0 ? "Activar sonido" : "Silenciar"}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-danger" aria-hidden="true" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-primary-container" aria-hidden="true" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    aria-label="Volumen"
                    className="w-full max-w-[10rem] sm:w-20 h-2 sm:h-1 bg-black/60 rounded-lg appearance-none cursor-pointer accent-primary-container"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
