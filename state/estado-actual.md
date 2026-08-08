# Estado actual

Última actualización: 2026-08-08. Mantener corto y real. Mover ítems entre secciones al cerrar sesión.

## Hecho
- Landing SPA en producción: https://sonhavana.co (GitHub `anaesve/son-havana` → Vercel).
- Hero con 4 posters (Son K’maron, Tromboricua, La Central, La Dimensión); desktop + mobile distintos en `public/images/hero/`.
- Conversión WhatsApp `573105156550`; modales reserva/cotización/carrito.
- Logo local `/images/logo/son-havana-logo.webp` en Header/Footer.
- Fuentes self-hosted (Fontsource Anybody/Geist/Archivo Narrow).
- Merch + contrataciones en `.webp`; scroll-lock centralizado.
- **Radio (2026-08-07):** canal Cuba = **Radio Habana Son Cuba** (`https://stream.zeno.fm/2ieszeso9istv`, mp3). Reemplaza Icecast Progreso (404).
- **Merch (2026-08-08):** **MUY PRONTO...** en cards, carrito y WhatsApp (`MERCH_PRICE_LABEL`).

## Pendiente
- Renombrar utilidades `neon-*` / `glow-*` (deuda consciente).
- QA en móvil **real** + checklist DoD incompleta.
- Limpiar deps muertas (`express`, `dotenv`, `@google/genai`).
- Validar textos de sedes con el negocio.
- Limpiar basura local: JPG hero viejos borrados sin commit, `_to_delete/`, `sonhavana-logo.webp` suelto en raíz.

## Blockers
- Ninguno. Riesgo externo: streams de radio de terceros (Zeno pide Referer en algunos clientes; JWT de surfernetwork es efímero — usar URL canónica `stream.zeno.fm/{id}`).

## Checklist QA antes de demo/deploy (DoD)
- [ ] Cada CTA del hero abre el flujo correcto.
- [ ] Reserva de mesa/cumpleaños/orquesta completable al primer intento.
- [ ] Compra de merch → carrito → WhatsApp con detalle correcto.
- [ ] Selector de fecha del modal responde a clic/tacto.
- [ ] Radio reproduce y salta de canal (CH1–CH5), incl. Habana Son Cuba.
- [x] `npm run lint` sin errores.
- [x] Contraste AA (script; ver `logs/`).
- [ ] Ningún color por defecto de Tailwind fuera de paleta (queda `red-*` en error/borrado).
- [ ] Probado en móvil real.
- [x] Deploy a URL pública (https://sonhavana.co).
