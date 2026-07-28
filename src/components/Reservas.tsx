import React from "react";
import { Users, Cake, MapPin, MessageCircle, Phone, Navigation } from "lucide-react";

interface ReservasProps {
  onBookingOpen: (sede?: string) => void;
}

export default function Reservas({ onBookingOpen }: ReservasProps) {
  return (
    <section id="reservas" className="min-h-[calc(100vh-5rem)] w-full flex flex-col justify-start pt-16 pb-16 md:pt-20 md:pb-20 px-6 md:px-16 fondo-acento text-on-primary-container scroll-mt-20">
      <div className="max-w-7xl mx-auto w-full space-y-10 md:space-y-12">
        {/* Section Header */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-anybody font-black text-on-primary-container">
            Atención Preferencial
          </span>
          <h5
            className="font-anybody font-black leading-none mt-1 text-lg sm:text-xl md:text-[28px] lg:text-[32px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            ASEGURA TU PUESTO
          </h5>
          <p className="font-geist text-base md:text-lg text-on-primary-container max-w-2xl mt-3">
            Atención personalizada inmediata y pre-reservas en línea para que no te quedes fuera de la mejor rumba salsera de Medellín.
          </p>
        </div>

        {/* 
          Cards container:
          - Spaced generously between cards using gap-6 md:gap-8.
          - Responsive grid-fluid layout (1 col on mobile, 3 equal cols on desktop) allowing them to scale 
            automatically and fluidly depending on screen resolution.
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full items-stretch">
          
          {/* Card 1: Reservas Grupales */}
          <div className="bg-card bg-gradient-to-br from-card via-card to-surface p-8 rounded-2xl flex flex-col justify-between group shadow-[0_8px_24px_-12px_color-mix(in_srgb,var(--color-on-surface)_35%,transparent)] hover:shadow-[0_16px_32px_-12px_color-mix(in_srgb,var(--color-on-surface)_40%,transparent)] transition-all duration-300 hover:-translate-y-0.5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-container/15 flex items-center justify-center text-secondary-container">
                <Users className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h4 className="font-anybody font-black text-2xl text-on-surface uppercase tracking-tight">
                  Reservas Grupales
                </h4>
                <p className="text-sm text-on-surface/80 font-geist mt-1.5 leading-relaxed">
                  Mesas exclusivas y zonas reservadas para grupos de 6 o más personas. Celebra a lo grande con tus amigos.
                </p>
              </div>
            </div>
            
            <div className="pt-8">
              <button
                onClick={() => onBookingOpen("Medellín")}
                className="text-xs font-anybody font-black uppercase tracking-wider text-secondary-container underline group-hover:no-underline hover:text-on-surface transition-all text-left cursor-pointer"
              >
                Reservar con Anticipo →
              </button>
            </div>
          </div>

          {/* Card 2: Cumpleaños SH */}
          <div className="bg-card bg-gradient-to-br from-card via-card to-surface p-8 rounded-2xl flex flex-col justify-between group shadow-[0_8px_24px_-12px_color-mix(in_srgb,var(--color-on-surface)_35%,transparent)] hover:shadow-[0_16px_32px_-12px_color-mix(in_srgb,var(--color-on-surface)_40%,transparent)] transition-all duration-300 hover:-translate-y-0.5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-container/15 flex items-center justify-center text-secondary-container">
                <Cake className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h4 className="font-anybody font-black text-2xl text-on-surface uppercase tracking-tight">
                  CUMPLEAÑOS SH
                </h4>
                <p className="text-sm text-on-surface/80 font-geist mt-1.5 leading-relaxed">
                  ¿Cumples años esta semana? ¡Recibe trato especial! Mesa decorada y una cortesía especial de la casa.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onBookingOpen("Laureles")}
                className="text-xs font-anybody font-black uppercase tracking-wider text-secondary-container underline group-hover:no-underline hover:text-on-surface transition-all text-left cursor-pointer"
              >
                Reserva Especial →
              </button>
            </div>
          </div>

          {/* Card 3: Centro de Ayuda */}
          <div className="bg-on-surface p-8 rounded-2xl flex flex-col justify-between group shadow-[0_8px_24px_-12px_color-mix(in_srgb,var(--color-on-surface)_45%,transparent)] hover:shadow-[0_16px_32px_-12px_color-mix(in_srgb,var(--color-on-surface)_50%,transparent)] transition-all duration-300 hover:-translate-y-0.5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container">
                <MapPin className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h4 className="font-anybody font-black text-2xl text-surface uppercase tracking-tight">
                  CENTRO DE AYUDA
                </h4>
                <p className="text-sm text-surface-variant/80 font-geist mt-1.5 leading-relaxed">
                  Aquí podemos resolver todas tus dudas sobre Son Havana: dónde estamos ubicados, código de vestimenta, métodos de pago y más. Solo comunícate y, al instante, nuestro personal de atención al cliente te atenderá.
                </p>
              </div>

              {/* Action Buttons inside Card 3 */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2 pt-2">
                <a
                  href="https://wa.me/573105156550?text=%C2%A1Hola!%20Quisiera%20reservar%20mi%20puesto%20para%20la%20salsa%20brava."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-success text-on-surface px-5 py-2.5 rounded-lg font-anybody font-black text-xs uppercase flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform text-center"
                >
                  <MessageCircle className="w-4 h-4 fill-current" /> Mensaje a WhatsApp
                </a>
                <a
                  href="tel:+573105156550"
                  className="bg-surface/10 text-surface border border-surface/25 px-5 py-2.5 rounded-lg font-anybody font-black text-xs uppercase flex items-center justify-center gap-2 hover:bg-surface/20 transition-all text-center"
                >
                  <Phone className="w-4 h-4" /> Llámanos
                </a>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-anybody font-black uppercase tracking-wider text-primary group-hover:text-primary/80 underline group-hover:no-underline transition-all flex items-center gap-1 cursor-pointer"
              >
                <Navigation className="w-3 h-3" /> Ver Ubicación Medellín
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
