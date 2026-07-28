# Estado actual

Última actualización: 2026-07-27 (noche++). Mantener corto y real. Mover ítems entre secciones al cerrar sesión.

## Hecho
- Landing SPA funcional: Header, Hero (4 slides), Contrataciones, Merch, Galería, Reservas, Footer, RadioPlayer, 3 modales.
- Conversión única por WhatsApp `573105156550` en Header, Hero, Reservas, ReservationModal, CartDrawer, Footer.
- Paleta **Serigrafía ICAIC + naranja SH** (`#ff6b35`) vigente; contraste AA auditado (0 fallos). Ver `decisions/design.md`.
- Texturas `fondo-*` atmosféricas (no serigrafía); Merch en cards blancas; Reservas en `bg-card` sólidas.
- **Hero ilustrado (noche++):** Lavoe, Niche y Programación semanal con ilustraciones cartelismo en `public/images/hero/`. Scrim radial centrado en slides 1–3; sin marco blanco.
- **Radio:** playlist con streams vivos (Latina Stereo, Colombia Salsa Dura, 100% Salsa, Salsa Latina, Campesina Cubana). Sync por URL pedida (ref), no `audio.src`.
- **Footer redes** linkeadas (IG, FB, YT, Spotify, WA) con iconos de marca en Spotify/WhatsApp.
- Pulidos UI: bounce en 3 iconos de Reservas; sin iconos gigantes en Corporativos/Bodas; dots del hero más arriba.

## Pendiente
- Renombrar utilidades `neon-*` / `glow-*` (deuda consciente).
- QA en móvil **real** + checklist DoD incompleta.
- `<title>` de `index.html` sigue siendo "My Google AI Studio App".
- Logo header/footer sigue hotlink remoto `lh3.googleusercontent.com`.
- Limpiar deps muertas (`express`, `dotenv`, `@google/genai`).
- **`git init` + primer push a GitHub** (aún no es repo).
- Validar textos de sedes con el negocio.
- Ideal: reexportar hero a 1920×1080+ (hoy ~1024×576).

## Blockers
- Ninguno. Riesgo externo: streams de radio de terceros y hotlinks del logo.

## Checklist QA antes de demo/deploy (DoD)
- [ ] Cada CTA del hero abre el flujo correcto.
- [ ] Reserva de mesa/cumpleaños/orquesta completable al primer intento.
- [ ] Compra de merch → carrito → WhatsApp con detalle correcto.
- [ ] Selector de fecha del modal responde a clic/tacto.
- [ ] Radio reproduce y salta de canal (CH1–CH5).
- [x] `npm run lint` sin errores (última verificación de sesión anterior).
- [x] Contraste AA (script; ver `logs/`).
- [ ] Ningún color por defecto de Tailwind fuera de paleta (queda `red-*` en error/borrado).
- [ ] Probado en móvil real.
- [ ] Deploy a URL pública.
