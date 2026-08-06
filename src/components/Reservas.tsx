import React from "react";
import { Users, Cake, MapPin, MessageCircle, Phone, Navigation } from "lucide-react";

interface ReservasProps {
  onBookingOpen: (sede?: string, type?: "mesa" | "grupal" | "cumpleanos") => void;
}

const waGrupal =
  "https://wa.me/573105156550?text=" +
  encodeURIComponent(
    "¡Hola! Quiero una reserva grupal en Son Havana (6 o más personas). ¿Me ayudan con mesas y zonas reservadas?"
  );

const waCumple =
  "https://wa.me/573105156550?text=" +
  encodeURIComponent(
    "¡Hola! Cumplo años esta semana y quiero la reserva especial de cumpleaños SH en Son Havana."
  );

export default function Reservas({ onBookingOpen: _onBookingOpen }: ReservasProps) {
  return (
    <section
      id="reservas"
      className="w-full flex flex-col justify-start pt-16 pb-16 md:pt-20 md:pb-20 px-6 md:px-16 fondo-acento text-on-primary-container scroll-mt-20 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto w-full space-y-10 md:space-y-12">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-anybody font-black text-on-primary-container">
            Atención Preferencial
          </span>
          <h2
            className="font-anybody font-black leading-none mt-1 text-lg sm:text-xl md:text-[28px] lg:text-[32px] text-balance"
            style={{ letterSpacing: "-0.02em" }}
          >
            ASEGURA TU PUESTO
          </h2>
          <p className="font-geist text-base md:text-lg text-on-primary-container max-w-2xl mt-3">
            Atención personalizada inmediata y pre-reservas en línea para que no te quedes fuera de
            la mejor rumba salsera de Medellín.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full items-stretch">
          <article className="bg-card bg-gradient-to-br from-card via-card to-surface p-6 md:p-8 rounded-2xl flex flex-col justify-between group shadow-[0_8px_24px_-12px_color-mix(in_srgb,var(--color-on-surface)_35%,transparent)] hover:shadow-[0_16px_32px_-12px_color-mix(in_srgb,var(--color-on-surface)_40%,transparent)] transition-all duration-300 hover:-translate-y-0.5 min-h-0">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-container/15 flex items-center justify-center text-secondary-container">
                <Users className="w-6 h-6 motion-safe:animate-bounce" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-anybody font-black text-2xl text-on-surface uppercase tracking-tight">
                  Reservas Grupales
                </h3>
                <p className="text-sm text-on-surface/80 font-geist mt-1.5 leading-relaxed">
                  Mesas exclusivas y zonas reservadas para grupos de 6 o más personas. Celebra a lo
                  grande con tus amigos: ubicaciones con buena vista a la pista, atención
                  prioritaria del staff y la opción de armar un plan con botellas o menú para que
                  nadie se quede sin puesto cuando la rumba prende.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <a
                href={waGrupal}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[3.375rem] bg-primary-container text-on-primary-container px-8 py-[1.125rem] rounded-full font-anybody font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all text-center shadow-md"
              >
                Reservar con Anticipo →
              </a>
            </div>
          </article>

          <article className="bg-card bg-gradient-to-br from-card via-card to-surface p-6 md:p-8 rounded-2xl flex flex-col justify-between group shadow-[0_8px_24px_-12px_color-mix(in_srgb,var(--color-on-surface)_35%,transparent)] hover:shadow-[0_16px_32px_-12px_color-mix(in_srgb,var(--color-on-surface)_40%,transparent)] transition-all duration-300 hover:-translate-y-0.5 min-h-0">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-container/15 flex items-center justify-center text-secondary-container">
                <Cake className="w-6 h-6 motion-safe:animate-bounce" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-anybody font-black text-2xl text-on-surface uppercase tracking-tight">
                  CUMPLEAÑOS SH
                </h3>
                <p className="text-sm text-on-surface/80 font-geist mt-1.5 leading-relaxed">
                  ¿Cumples años esta semana? ¡Recibe trato especial! Mesa decorada, una cortesía de
                  la casa y detalle de cumpleaños para que tu noche tenga sabor Son Havana. Avisa
                  con anticipación, llega con tu combo y déjanos encargarnos de que el brindis y la
                  salsa queden inolvidables.
                </p>
              </div>
            </div>
            <div className="pt-8">
              <a
                href={waCumple}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[3.375rem] bg-primary-container text-on-primary-container px-8 py-[1.125rem] rounded-full font-anybody font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all text-center shadow-md"
              >
                Reserva Especial →
              </a>
            </div>
          </article>

          <article className="bg-on-surface p-6 md:p-8 rounded-2xl flex flex-col justify-between group shadow-[0_8px_24px_-12px_color-mix(in_srgb,var(--color-on-surface)_45%,transparent)] hover:shadow-[0_16px_32px_-12px_color-mix(in_srgb,var(--color-on-surface)_50%,transparent)] transition-all duration-300 hover:-translate-y-0.5 min-h-0 md:col-span-2 lg:col-span-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container">
                <MapPin className="w-6 h-6 motion-safe:animate-bounce" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-anybody font-black text-2xl text-surface uppercase tracking-tight">
                  CENTRO DE AYUDA
                </h3>
                <p className="text-sm text-surface-variant/80 font-geist mt-1.5 leading-relaxed">
                  Aquí podemos resolver todas tus dudas sobre Son Havana: dónde estamos ubicados,
                  código de vestimenta, métodos de pago y más. Solo comunícate y, al instante,
                  nuestro personal de atención al cliente te atenderá.
                </p>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="https://wa.me/573105156550?text=%C2%A1Hola!%20Quisiera%20reservar%20mi%20puesto%20para%20la%20salsa%20brava."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-success text-on-surface px-8 py-3 rounded-full font-anybody font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all text-center min-h-[3rem]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" aria-hidden="true" /> Mensaje a
                  WhatsApp
                </a>
                <a
                  href="tel:+573105156550"
                  className="bg-surface/10 text-surface border border-surface/25 px-8 py-3 rounded-full font-anybody font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-surface/20 hover:scale-[1.03] active:scale-[0.98] transition-all text-center backdrop-blur-sm min-h-[3rem]"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" /> Llámanos
                </a>
              </div>
            </div>
            <div className="pt-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Son+Havana+Carrera+73+%2344-56+Medell%C3%ADn+Colombia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-anybody font-black uppercase tracking-wider text-primary group-hover:text-primary/80 underline group-hover:no-underline transition-all flex items-center gap-1 cursor-pointer"
              >
                <Navigation className="w-3 h-3" aria-hidden="true" /> Ver Ubicación Medellín
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
