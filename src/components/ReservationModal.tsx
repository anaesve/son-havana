import React, { useState, useEffect } from "react";
import { X, Users, MapPin, Phone, User, MessageCircle, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSede?: string;
}

export default function ReservationModal({ isOpen, onClose, initialSede = "Medellín" }: ReservationModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("4");
  const hoy = new Date().toLocaleDateString("en-CA");
  const [date, setDate] = useState(hoy);
  const [time, setTime] = useState("21:00");
  // Única sede habilitada por ahora
  const sede = "Medellín";
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
    }
  }, [isOpen, initialSede]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const text = `¡Hola Son Havana! Quisiera reservar una mesa para el día *${date}* a las *${time}* para *${guests} personas* en la sede *${sede}*. A nombre de *${name}* (Tel: ${phone}).`;
    return `https://wa.me/573105156550?text=${encodeURIComponent(text)}`;
  };

  const handleClose = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-on-surface border border-primary-container/30 rounded-2xl overflow-hidden shadow-2xl z-10"
          >
            {/* Header */}
            <div className="relative h-32 flex items-end p-6 bg-gradient-to-t from-on-surface to-mango/25">
              <div className="absolute top-4 right-4 flex items-center justify-center">
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full bg-black/40 text-surface/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-anybody font-black text-primary">
                  Asegura Tu Mesa
                </span>
                <h3 className="text-2xl md:text-3xl font-anybody font-black text-white uppercase leading-tight">
                  {submitted ? "¡RESERVA REGISTRADA!" : "RESERVA TU RUMBA"}
                </h3>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                        Nombre completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ej: Ana Estévez"
                          className="w-full pl-10 pr-4 py-3 bg-black/40 border border-surface-variant/10 rounded-full text-white text-sm focus:outline-none focus:border-primary-container focus-visible:ring-2 focus-visible:ring-primary-container/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                        WhatsApp de contacto
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ej: +57 312 345 6789"
                          className="w-full pl-10 pr-4 py-3 bg-black/40 border border-surface-variant/10 rounded-full text-white text-sm focus:outline-none focus:border-primary-container focus-visible:ring-2 focus-visible:ring-primary-container/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Sede — solo Medellín (campo fijo, sin select estrecho) */}
                    <div className="min-w-0">
                      <label className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                        Sede
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none" />
                        <div
                          aria-label="Sede Medellín"
                          className="w-full pl-10 pr-4 py-3 bg-black/40 border border-surface-variant/10 rounded-full text-white text-sm opacity-90"
                        >
                          Medellín
                        </div>
                      </div>
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                        Personas
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-container/60 pointer-events-none" />
                        <select
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

                    {/* Date */}
                    <div>
                      <label className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                        Fecha
                      </label>
                      <div className="relative">
                        <input
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

                  <div>
                    <label className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                      Hora sugerida
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["20:00", "21:00", "22:00", "23:00"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTime(t)}
                          className={`py-2.5 text-xs rounded-full font-anybody font-bold transition-all border ${
                            time === t
                              ? "bg-primary-container text-on-primary-container border-primary-container glow-orange"
                              : "bg-black/30 text-surface-variant border-surface-variant/10 hover:border-surface-variant/35"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-surface-variant/80 leading-relaxed text-center pt-2">
                    *Al reservar recibirás atención preferencial. Tu mesa se guardará hasta las 10:30 PM.
                  </p>

                  <button
                    type="submit"
                    className="w-full bg-primary-container hover:bg-primary-container/90 text-on-primary-container py-3.5 px-6 rounded-full font-anybody font-black text-base uppercase tracking-wider transition-all glow-orange flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    Confirmar Pre-Reserva
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-success/15 text-success rounded-full flex items-center justify-center mx-auto border border-success/30">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-anybody font-black text-white">
                      ¡MESA SEPARADA CON ÉXITO!
                    </h4>
                    <p className="text-sm text-surface-variant/70 max-w-sm mx-auto leading-relaxed">
                      Hola <strong className="text-white">{name}</strong>, para agilizar y garantizar tu mesa en la sede <strong className="text-white">{sede}</strong>, envía los detalles directamente a nuestro WhatsApp oficial.
                    </p>
                  </div>

                  <div className="bg-black/40 p-4 rounded-xl border border-surface-variant/10 max-w-sm mx-auto text-left space-y-2 text-xs text-surface-variant/90">
                    <div><strong>Invitado:</strong> {name}</div>
                    <div><strong>Fecha/Hora:</strong> {date} @ {time}</div>
                    <div><strong>Invitados:</strong> {guests} personas</div>
                    <div><strong>Sede:</strong> {sede}</div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-xs mx-auto bg-[#25D366] hover:bg-[#20ba5a] text-on-surface py-3.5 px-6 rounded-full font-anybody font-black text-base uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 hover:scale-[1.03] active:scale-[0.98]"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" /> Enviar por WhatsApp
                    </a>
                    <button
                      onClick={handleClose}
                      className="text-xs font-anybody font-bold text-surface-variant hover:text-white uppercase tracking-wider"
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
