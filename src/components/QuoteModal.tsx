import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, CalendarDays, MapPin, Clock, Music2, CheckCircle2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDialogA11y } from "../hooks/useDialogA11y";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedArtist?: string;
}

const ORQUESTAS = [
  { value: "SON K'MARON", label: "Orquesta Son K'maron (Salsa en Vivo)" },
  { value: "EL SON DE PABLO", label: "El Son de Pablo (Son Cubano Tradicional)" },
  { value: "Combo Completo Son Havana Corporativo", label: "Eventos Corporativos Son Havana" },
  { value: "Reserva de Bodas", label: "Reserva de Bodas Son Havana" },
];

const normalizeArtist = (value: string) => {
  if (value === "EVENTOS CORPORATIVOS") return "Combo Completo Son Havana Corporativo";
  return value;
};

export default function QuoteModal({
  isOpen,
  onClose,
  selectedArtist = "SON K'MARON",
}: QuoteModalProps) {
  const [eventType, setEventType] = useState("Boda / Matrimonio");
  const [dates, setDates] = useState("");
  const [artist, setArtist] = useState(normalizeArtist(selectedArtist));
  const [place, setPlace] = useState("");
  const [hours, setHours] = useState("2");
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setDates("");
    setPlace("");
    onClose();
  }, [onClose]);

  useDialogA11y(isOpen, handleClose, panelRef);

  useEffect(() => {
    if (isOpen) {
      setArtist(normalizeArtist(selectedArtist));
      setSubmitted(false);
    }
  }, [isOpen, selectedArtist]);

  const fieldClass =
    "ui-pill w-full px-4 py-3.5 bg-black/40 border border-surface-variant/20 text-white text-sm focus:outline-none focus:border-primary-container focus-visible:ring-2 focus-visible:ring-primary-container/50 transition-colors";
  const fieldClassIcon =
    "ui-pill w-full pl-11 pr-4 py-3.5 bg-black/40 border border-surface-variant/20 text-white text-sm focus:outline-none focus:border-primary-container focus-visible:ring-2 focus-visible:ring-primary-container/50 transition-colors";

  const getWhatsAppLink = () => {
    const text = [
      "¡Hola! Quiero cotizar una orquesta para un evento.",
      `Tipo de evento: ${eventType}.`,
      `Fecha(s): ${dates}.`,
      `Orquesta: ${artist}.`,
      `Lugar: ${place}.`,
      `Duración: ${hours} hora(s).`,
    ].join(" ");
    return `https://wa.me/573105156550?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dates.trim() || !place.trim()) return;
    window.open(getWhatsAppLink(), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm touch-none"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 24 }}
            className="relative w-full sm:max-w-lg max-h-[92vh] sm:max-h-[90vh] overflow-y-auto overscroll-contain bg-on-surface border border-primary-container/30 rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 outline-none"
          >
            <div className="relative min-h-[7.5rem] flex items-end p-6 bg-gradient-to-t from-on-surface to-secondary-container/20">
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Cerrar cotización"
                  className="size-11 rounded-full bg-black/40 text-surface/80 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="pr-12">
                <span className="text-[10px] uppercase tracking-[0.2em] font-anybody font-black text-primary">
                  Contratación Directa
                </span>
                <h2
                  id="quote-modal-title"
                  className="text-xl sm:text-2xl md:text-3xl font-anybody font-black text-white uppercase leading-tight text-balance"
                >
                  {submitted ? "¡LISTO PARA WHATSAPP!" : "COTIZA TU EVENTO"}
                </h2>
                {!submitted && (
                  <p className="text-xs text-surface-variant/80 mt-1.5 leading-relaxed max-w-md">
                    Sin tarifa fija: la cotización depende de tu evento. Completa el formulario y
                    te respondemos por WhatsApp.
                  </p>
                )}
              </div>
            </div>

            <div className="p-6 pb-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="lg:col-span-2">
                      <label
                        htmlFor="quote-event-type"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Tipo de evento
                      </label>
                      <select
                        id="quote-event-type"
                        name="eventType"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className={fieldClass}
                      >
                        <option value="Boda / Matrimonio">Boda / Matrimonio</option>
                        <option value="Corporativo / Empresa">Corporativo / Empresa</option>
                        <option value="Cumpleaños / Privado">Cumpleaños / Privado</option>
                        <option value="Concierto / Festival">Concierto / Festival</option>
                      </select>
                    </div>

                    <div className="lg:col-span-2">
                      <label
                        htmlFor="quote-dates"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Fecha(s) del evento
                      </label>
                      <div className="relative">
                        <CalendarDays
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="quote-dates"
                          name="dates"
                          type="text"
                          required
                          value={dates}
                          onChange={(e) => setDates(e.target.value)}
                          placeholder="Ej: 15 de agosto o 20–21 de septiembre…"
                          className={fieldClassIcon}
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <label
                        htmlFor="quote-artist"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Orquesta
                      </label>
                      <div className="relative">
                        <Music2
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <select
                          id="quote-artist"
                          name="artist"
                          value={artist}
                          onChange={(e) => setArtist(e.target.value)}
                          className={fieldClassIcon}
                        >
                          {ORQUESTAS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <label
                        htmlFor="quote-place"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Lugar del evento
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="quote-place"
                          name="place"
                          type="text"
                          required
                          value={place}
                          onChange={(e) => setPlace(e.target.value)}
                          placeholder="Ej: Finca El Retiro, Medellín…"
                          className={fieldClassIcon}
                        />
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <label
                        htmlFor="quote-hours"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Número de horas
                      </label>
                      <div className="relative">
                        <Clock
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <select
                          id="quote-hours"
                          name="hours"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          className={fieldClassIcon}
                        >
                          <option value="1">1 hora</option>
                          <option value="2">2 horas</option>
                          <option value="3">3 horas</option>
                          <option value="4">4 horas o más</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="ui-pill w-full bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container py-4 px-8 font-anybody font-black text-sm sm:text-base uppercase tracking-wider transition-transform shadow-lg flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] cursor-pointer min-h-[3.25rem]"
                  >
                    <Send className="w-4 h-4 shrink-0" aria-hidden="true" /> Solicitar cotización por
                    WhatsApp
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-success/15 text-success rounded-full flex items-center justify-center mx-auto border border-success/30">
                    <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-anybody font-black text-white uppercase">
                      Cotización lista
                    </p>
                    <p className="text-sm text-surface-variant/80 max-w-sm mx-auto leading-relaxed">
                      Abrimos WhatsApp con los datos de tu evento para{" "}
                      <strong className="text-white">{artist}</strong>. Si no se abrió, usa el botón
                      de abajo.
                    </p>
                  </div>

                  <div className="bg-black/40 p-4 rounded-xl border border-surface-variant/10 max-w-sm mx-auto text-left space-y-1 text-xs text-surface-variant/80">
                    <div>
                      <strong>Tipo:</strong> {eventType}
                    </div>
                    <div>
                      <strong>Fecha(s):</strong> {dates}
                    </div>
                    <div>
                      <strong>Orquesta:</strong> {artist}
                    </div>
                    <div>
                      <strong>Lugar:</strong> {place}
                    </div>
                    <div>
                      <strong>Duración:</strong> {hours} hora(s)
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-xs mx-auto bg-[#25D366] hover:bg-[#20ba5a] text-on-surface py-3.5 px-6 rounded-full font-anybody font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.03] active:scale-[0.98] min-h-[3.25rem]"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" aria-hidden="true" /> Abrir
                      WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-8 py-3 bg-surface text-on-surface rounded-full font-anybody font-black text-xs uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer min-h-11"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
