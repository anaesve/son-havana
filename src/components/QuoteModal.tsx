import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, Mail, User, Phone, CheckCircle2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDialogA11y } from "../hooks/useDialogA11y";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedArtist?: string;
}

const normalizeArtist = (value: string) => {
  if (value === "EVENTOS CORPORATIVOS") return "Combo Completo Son Havana Corporativo";
  return value;
};

export default function QuoteModal({
  isOpen,
  onClose,
  selectedArtist = "SON K'MARON",
}: QuoteModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("Boda / Matrimonio");
  const [duration, setDuration] = useState("2");
  const [artist, setArtist] = useState(normalizeArtist(selectedArtist));
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const handleClose = useCallback(() => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    onClose();
  }, [onClose]);

  useDialogA11y(isOpen, handleClose, panelRef);

  useEffect(() => {
    if (isOpen) {
      setArtist(normalizeArtist(selectedArtist));
      setSubmitted(false);
    }
  }, [isOpen, selectedArtist]);

  const getEstimate = () => {
    let baseHourRate = 1_800_000;
    if (artist === "SON K'MARON") baseHourRate = 6_000_000;
    else if (artist === "EL SON DE PABLO") baseHourRate = 3_200_000;
    else if (artist === "Combo Completo Son Havana Corporativo") baseHourRate = 4_800_000;
    else if (artist === "Reserva de Bodas") baseHourRate = 10_000_000;
    return baseHourRate * parseInt(duration, 10);
  };

  const formatCop = (amount: number) => `$${amount.toLocaleString("es-CO")} COP`;

  const getWhatsAppLink = () => {
    const text = [
      "¡Hola Son Havana! Solicito cotización de contratación:",
      `*Formato/artista:* ${artist}`,
      `*Tipo de evento:* ${eventType}`,
      `*Duración:* ${duration} hora(s)`,
      `*Presupuesto ref:* ${formatCop(getEstimate())}`,
      `*Nombre:* ${name}`,
      `*Tel:* ${phone}`,
      `*Email:* ${email}`,
      notes ? `*Notas:* ${notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    return `https://wa.me/573105156550?text=${encodeURIComponent(text)}`;
  };

  const fieldClass =
    "ui-pill w-full px-4 py-3.5 bg-black/40 border border-surface-variant/20 text-white text-sm focus:outline-none focus:border-primary-container focus-visible:ring-2 focus-visible:ring-primary-container/50 transition-colors";
  const fieldClassIcon =
    "ui-pill w-full pl-11 pr-4 py-3.5 bg-black/40 border border-surface-variant/20 text-white text-sm focus:outline-none focus:border-primary-container focus-visible:ring-2 focus-visible:ring-primary-container/50 transition-colors";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    window.open(getWhatsAppLink(), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain bg-on-surface border border-primary-container/30 rounded-3xl shadow-2xl z-10 outline-none"
          >
            <div className="relative h-32 flex items-end p-6 bg-gradient-to-t from-on-surface to-secondary-container/20">
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
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-anybody font-black text-primary">
                  Contratación Directa
                </span>
                <h2
                  id="quote-modal-title"
                  className="text-2xl md:text-3xl font-anybody font-black text-white uppercase leading-tight"
                >
                  {submitted ? "¡LISTO PARA WHATSAPP!" : "COTIZA TU EVENTO"}
                </h2>
              </div>
            </div>

            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="quote-artist"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Formato Musical / Artista
                      </label>
                      <select
                        id="quote-artist"
                        name="artist"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        className={fieldClass}
                      >
                        <option value="SON K'MARON">Orquesta Son K'maron (Salsa en Vivo)</option>
                        <option value="EL SON DE PABLO">El Son de Pablo (Son Cubano Tradicional)</option>
                        <option value="Combo Completo Son Havana Corporativo">
                          Eventos Corporativos Son Havana
                        </option>
                        <option value="Reserva de Bodas">Reserva de Bodas Son Havana</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="quote-name"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Nombre Solicitante
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="quote-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ej: Daniel Restrepo…"
                          className={fieldClassIcon}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="quote-phone"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Teléfono Móvil
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="quote-phone"
                          name="tel"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ej: +57 301 445 1234…"
                          className={fieldClassIcon}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="quote-email"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="quote-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          spellCheck={false}
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Ej: daniel@empresa.com…"
                          className={fieldClassIcon}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="quote-event-type"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Tipo de Evento
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

                    <div>
                      <label
                        htmlFor="quote-duration"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Duración (Horas)
                      </label>
                      <select
                        id="quote-duration"
                        name="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className={fieldClass}
                      >
                        <option value="1">1 Hora de show</option>
                        <option value="2">2 Horas de show</option>
                        <option value="3">3 Horas de show</option>
                        <option value="4">4+ Horas (Show extendido)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="quote-notes"
                      className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                    >
                      Mensaje / Requerimientos especiales
                    </label>
                    <textarea
                      id="quote-notes"
                      name="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Ej: Sonido profesional incluido, tarima, etc.…"
                      className="ui-pill-soft w-full px-4 py-3.5 bg-black/40 border border-surface-variant/20 text-white text-sm focus:outline-none focus:border-primary-container focus-visible:ring-2 focus-visible:ring-primary-container/50 resize-none transition-colors"
                    />
                  </div>

                  <div className="ui-pill p-4 bg-black/50 border border-primary-container/30 flex items-center justify-between gap-3">
                    <div className="min-w-0 pl-2">
                      <div className="text-[10px] uppercase font-anybody font-bold text-surface-variant/80">
                        Presupuesto Estimado
                      </div>
                      <div className="text-lg font-anybody font-black text-primary">
                        {formatCop(getEstimate())}
                      </div>
                    </div>
                    <div className="text-[10px] text-right max-w-[140px] text-surface-variant/80 leading-tight pr-2">
                      *Estimado Medellín. Sujeto a viáticos.
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="ui-pill w-full bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container py-4 px-8 font-anybody font-black text-sm sm:text-base uppercase tracking-wider transition-transform shadow-lg flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                  >
                    <Send className="w-4 h-4 shrink-0" aria-hidden="true" /> Enviar por WhatsApp
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-success/15 text-success rounded-full flex items-center justify-center mx-auto border border-success/30">
                    <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-anybody font-black text-white uppercase">
                      Cotización lista
                    </p>
                    <p className="text-sm text-surface-variant/80 max-w-sm mx-auto leading-relaxed">
                      Gracias, <strong className="text-white">{name}</strong>. Abrimos WhatsApp con tu
                      solicitud para <strong className="text-white">{artist}</strong> (
                      {eventType}). Si no se abrió, usa el botón de abajo.
                    </p>
                  </div>

                  <div className="bg-black/40 p-4 rounded-xl border border-surface-variant/10 max-w-sm mx-auto text-left space-y-1 text-xs text-surface-variant/80">
                    <div>
                      <strong>Cliente:</strong> {name}
                    </div>
                    <div>
                      <strong>Artista:</strong> {artist}
                    </div>
                    <div>
                      <strong>Presupuesto ref:</strong> {formatCop(getEstimate())}
                    </div>
                    <div>
                      <strong>Contacto:</strong> {email} | {phone}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-xs mx-auto bg-[#25D366] hover:bg-[#20ba5a] text-on-surface py-3.5 px-6 rounded-full font-anybody font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.03] active:scale-[0.98]"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" aria-hidden="true" /> Abrir
                      WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-8 py-3 bg-surface text-on-surface rounded-full font-anybody font-black text-xs uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer"
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
