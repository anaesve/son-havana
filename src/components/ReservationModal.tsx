import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Users, MapPin, Phone, User, MessageCircle, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDialogA11y } from "../hooks/useDialogA11y";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSede?: string;
  reservationType?: "mesa" | "grupal" | "cumpleanos";
}

const TYPE_LABEL: Record<NonNullable<ReservationModalProps["reservationType"]>, string> = {
  mesa: "Reserva de mesa",
  grupal: "Reserva grupal (6+)",
  cumpleanos: "Cumpleaños SH",
};

export default function ReservationModal({
  isOpen,
  onClose,
  initialSede = "Medellín",
  reservationType = "mesa",
}: ReservationModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(reservationType === "grupal" ? "6" : "4");
  const hoy = new Date().toLocaleDateString("en-CA");
  const [date, setDate] = useState(hoy);
  const [time, setTime] = useState("21:00");
  const [sede, setSede] = useState(initialSede);
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setName("");
    setPhone("");
    onClose();
  }, [onClose]);

  useDialogA11y(isOpen, handleClose, panelRef);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setSede(initialSede || "Medellín");
      setGuests(reservationType === "grupal" ? "6" : reservationType === "cumpleanos" ? "4" : "4");
    }
  }, [isOpen, initialSede, reservationType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const tipo = TYPE_LABEL[reservationType];
    const text = `¡Hola Son Havana! Quisiera una *${tipo}* para el día *${date}* a las *${time}* para *${guests} personas* en la sede *${sede}*. A nombre de *${name}* (Tel: ${phone}).`;
    return `https://wa.me/573105156550?text=${encodeURIComponent(text)}`;
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain bg-on-surface border border-primary-container/30 rounded-3xl shadow-2xl z-10 outline-none"
          >
            <div className="relative h-32 flex items-end p-6 bg-gradient-to-t from-on-surface to-mango/25">
              <div className="absolute top-4 right-4 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Cerrar reserva"
                  className="size-11 rounded-full bg-black/40 text-surface/80 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-anybody font-black text-primary">
                  {TYPE_LABEL[reservationType]}
                </span>
                <h2
                  id="reservation-modal-title"
                  className="text-2xl md:text-3xl font-anybody font-black text-white uppercase leading-tight"
                >
                  {submitted ? "PRE-RESERVA LISTA" : "RESERVA TU RUMBA"}
                </h2>
              </div>
            </div>

            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="res-name"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Nombre completo
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="res-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ej: Ana Estévez…"
                          className="w-full pl-10 pr-4 py-3 bg-black/40 border border-surface-variant/10 rounded-full text-white text-sm focus:outline-none focus:border-primary-container focus-visible:ring-2 focus-visible:ring-primary-container/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="res-phone"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        WhatsApp de contacto
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="res-phone"
                          name="tel"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ej: +57 312 345 6789…"
                          className="w-full pl-10 pr-4 py-3 bg-black/40 border border-surface-variant/10 rounded-full text-white text-sm focus:outline-none focus:border-primary-container focus-visible:ring-2 focus-visible:ring-primary-container/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="min-w-0">
                      <label
                        htmlFor="res-sede"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Sede
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="res-sede"
                          name="sede"
                          type="text"
                          readOnly
                          value={sede}
                          onChange={(e) => setSede(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-black/40 border border-surface-variant/10 rounded-full text-white text-sm opacity-90"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="res-guests"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Personas
                      </label>
                      <div className="relative">
                        <Users
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <select
                          id="res-guests"
                          name="guests"
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-black/40 border border-surface-variant/10 rounded-full text-white text-sm focus:outline-none focus:border-primary-container focus-visible:ring-2 focus-visible:ring-primary-container/50 appearance-none transition-colors"
                        >
                          <option value="1">1 Persona</option>
                          <option value="2">2 Personas</option>
                          <option value="4">4 Personas</option>
                          <option value="6">6 Personas</option>
                          <option value="8">8 Personas</option>
                          <option value="10">10+ Grupal</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="res-date"
                        className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1"
                      >
                        Fecha
                      </label>
                      <div className="relative">
                        <input
                          id="res-date"
                          name="date"
                          type="date"
                          required
                          min={hoy}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-black/40 border border-surface-variant/10 rounded-full text-white text-sm focus:outline-none focus:border-primary-container focus-visible:ring-2 focus-visible:ring-primary-container/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <fieldset>
                    <legend className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                      Hora sugerida
                    </legend>
                    <div className="grid grid-cols-4 gap-2">
                      {["20:00", "21:00", "22:00", "23:00"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTime(t)}
                          aria-pressed={time === t}
                          className={`min-h-11 py-2.5 text-xs rounded-full font-anybody font-bold transition-all border cursor-pointer ${
                            time === t
                              ? "bg-primary-container text-on-primary-container border-primary-container shadow-md"
                              : "bg-black/30 text-surface-variant border-surface-variant/10 hover:border-surface-variant/35"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <p className="text-xs text-surface-variant/80 leading-relaxed text-center pt-2">
                    *Al continuar, confirma tu pre-reserva por WhatsApp. Tu mesa se guarda hasta las
                    10:30 PM.
                  </p>

                  <button
                    type="submit"
                    className="w-full bg-primary-container hover:bg-primary-container/90 text-on-primary-container py-4 px-8 rounded-full font-anybody font-black text-sm sm:text-base uppercase tracking-wider transition-transform shadow-lg flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                  >
                    Confirmar Pre-Reserva
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-success/15 text-success rounded-full flex items-center justify-center mx-auto border border-success/30">
                    <Check className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-anybody font-black text-white uppercase">
                      Pre-reserva lista
                    </p>
                    <p className="text-sm text-surface-variant/80 max-w-sm mx-auto leading-relaxed">
                      Hola <strong className="text-white">{name}</strong>. Para garantizar tu mesa
                      en <strong className="text-white">{sede}</strong>, envía los detalles por
                      WhatsApp oficial.
                    </p>
                  </div>

                  <div className="bg-black/40 p-4 rounded-xl border border-surface-variant/10 max-w-sm mx-auto text-left space-y-2 text-xs text-surface-variant/90">
                    <div>
                      <strong>Tipo:</strong> {TYPE_LABEL[reservationType]}
                    </div>
                    <div>
                      <strong>Invitado:</strong> {name}
                    </div>
                    <div>
                      <strong>Fecha/Hora:</strong> {date} @ {time}
                    </div>
                    <div>
                      <strong>Invitados:</strong> {guests} personas
                    </div>
                    <div>
                      <strong>Sede:</strong> {sede}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-xs mx-auto bg-[#25D366] hover:bg-[#20ba5a] text-on-surface py-3.5 px-6 rounded-full font-anybody font-black text-base uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 hover:scale-[1.03] active:scale-[0.98]"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" aria-hidden="true" /> Enviar
                      por WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="text-xs font-anybody font-bold text-surface-variant hover:text-white uppercase tracking-wider cursor-pointer"
                    >
                      Cerrar ventana
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
