import React, { useState } from "react";
import { X, Sparkles, Send, Mail, User, Phone, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedArtist?: string;
}

export default function QuoteModal({ isOpen, onClose, selectedArtist = "SON K'MARON" }: QuoteModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("Boda / Matrimonio");
  const [duration, setDuration] = useState("2");
  const [artist, setArtist] = useState(selectedArtist);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Simple pricing estimate for fun and fidelity!
  const getEstimate = () => {
    let baseHourRate = 450;
    if (artist === "SON K'MARON") baseHourRate = 1500;
    else if (artist === "EL SON DE PABLO") baseHourRate = 800;
    else if (artist === "Combo Completo Son Havana Corporativo") baseHourRate = 1200;
    else if (artist === "Reserva de Bodas") baseHourRate = 2500;
    return baseHourRate * parseInt(duration);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    onClose();
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
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-on-surface border border-primary-container/30 rounded-2xl overflow-hidden shadow-2xl z-10"
          >
            {/* Header */}
            <div className="relative h-32 flex items-end p-6 bg-gradient-to-t from-on-surface to-secondary-container/20">
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full bg-black/40 text-surface/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-anybody font-black text-primary-container neon-orange">
                  Contratación Directa
                </span>
                <h3 className="text-2xl md:text-3xl font-anybody font-black text-white uppercase leading-tight">
                  {submitted ? "¡SOLICITUD ENVIADA!" : "COTIZA TU EVENTO"}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Artist Choice */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                        Formato Musical / Artista
                      </label>
                      <select
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        className="w-full px-4 py-2 bg-black/40 border border-surface-variant/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-container transition-colors"
                      >
                        <option value="SON K'MARON">Orquesta Son K'maron (Salsa en Vivo)</option>
                        <option value="EL SON DE PABLO">El Son de Pablo (Son Cubano Tradicional)</option>
                        <option value="Combo Completo Son Havana Corporativo">Eventos Corporativos Son Havana</option>
                        <option value="Reserva de Bodas">Reserva de Bodas Son Havana</option>
                      </select>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                        Nombre Solicitante
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-primary-container/60" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ej: Daniel Restrepo"
                          className="w-full pl-10 pr-4 py-2 bg-black/40 border border-surface-variant/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-container transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                        Teléfono Móvil
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-primary-container/60" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ej: +57 301 445 1234"
                          className="w-full pl-10 pr-4 py-2 bg-black/40 border border-surface-variant/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-container transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-primary-container/60" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Ej: daniel@empresa.com"
                          className="w-full pl-10 pr-4 py-2 bg-black/40 border border-surface-variant/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-container transition-colors"
                        />
                      </div>
                    </div>

                    {/* Event Type */}
                    <div>
                      <label className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                        Tipo de Evento
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-4 py-2 bg-black/40 border border-surface-variant/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-container transition-colors"
                      >
                        <option value="Boda / Matrimonio">Boda / Matrimonio</option>
                        <option value="Corporativo / Empresa">Corporativo / Empresa</option>
                        <option value="Cumpleaños / Privado">Cumpleaños / Privado</option>
                        <option value="Concierto / Festival">Concierto / Festival</option>
                      </select>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                        Duración (Horas)
                      </label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-4 py-2 bg-black/40 border border-surface-variant/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-container transition-colors"
                      >
                        <option value="1">1 Hora de show</option>
                        <option value="2">2 Horas de show</option>
                        <option value="3">3 Horas de show</option>
                        <option value="4">4+ Horas (Show extendido)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-anybody font-bold text-surface-variant/80 uppercase mb-1">
                      Mensaje / Requerimientos especiales
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      placeholder="Ej: Sonido profesional incluido, tarima, etc."
                      className="w-full px-4 py-2 bg-black/40 border border-surface-variant/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary-container resize-none transition-colors"
                    />
                  </div>

                  {/* Pricing estimate display */}
                  <div className="p-3 bg-black/50 border border-primary-container/20 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-anybody font-bold text-surface-variant/80">
                        Presupuesto Estimado
                      </div>
                      <div className="text-lg font-anybody font-black text-primary-container neon-orange">
                        ${getEstimate().toLocaleString("es-CO")} USD
                      </div>
                    </div>
                    <div className="text-[10px] text-right max-w-[180px] text-surface-variant/60 leading-tight">
                      *Estimado básico para Medellín. Sujeto a viáticos e impuestos locales.
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container py-3 rounded-xl font-anybody font-black text-base uppercase transition-all glow-orange flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" /> Enviar Solicitud de Cotización
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-success/15 text-success rounded-full flex items-center justify-center mx-auto border border-success/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-anybody font-black text-white uppercase">
                      ¡Solicitud Recibida!
                    </h4>
                    <p className="text-sm text-surface-variant/70 max-w-sm mx-auto leading-relaxed">
                      Muchas gracias, <strong className="text-white">{name}</strong>. Hemos registrado tu solicitud para contratar a <strong className="text-white">{artist}</strong> para tu evento de <strong className="text-white">{eventType}</strong>.
                    </p>
                    <p className="text-xs text-primary-container font-anybody font-bold uppercase tracking-wider mt-1">
                      Un especialista comercial de Son Havana te contactará en menos de 24 horas.
                    </p>
                  </div>

                  <div className="bg-black/40 p-4 rounded-xl border border-surface-variant/10 max-w-sm mx-auto text-left space-y-1 text-xs text-surface-variant/80">
                    <div><strong>Cliente:</strong> {name}</div>
                    <div><strong>Artista:</strong> {artist}</div>
                    <div><strong>Presupuesto ref:</strong> ${getEstimate().toLocaleString("es-CO")} USD</div>
                    <div><strong>Contacto:</strong> {email} | {phone}</div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="px-6 py-2 bg-surface text-on-surface rounded-xl font-anybody font-black text-xs uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-all"
                  >
                    Entendido / Cerrar
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
