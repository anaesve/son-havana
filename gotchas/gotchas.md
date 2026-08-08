# Gotchas (trampas conocidas + solución)

## Vite / AI Studio
- **No tocar `hmr`/`watch` en `vite.config.ts`.** Comentario explícito en el archivo: file-watching se desactiva con `DISABLE_HMR=true` para evitar parpadeo durante ediciones de agente. Modificarlo rompe el entorno AI Studio.

## Dependencias muertas
- `express`, `dotenv`, `@google/genai` están en `package.json` pero **no se usan** en `src/`. No hay `server.js` (aunque `npm run clean` lo borraría). `GEMINI_API_KEY` no se lee en ningún lado. Herencia de la plantilla AI Studio. No asumir que hay backend.

## Imágenes
- Muchas imágenes son hotlink a `lh3.googleusercontent.com` (aida-public) / Unsplash / Wikimedia → pueden expirar. Mitigación: patrón `localPath` + `demoUrl` con `onError`. Usar `referrerPolicy="no-referrer"` en `<img>` remotas.

## RadioPlayer (`src/components/RadioPlayer.tsx`)
- Un solo elemento `Audio` compartido; usa `stateRef` para evitar *stale closures* en los listeners registrados una sola vez al montar. Si editas listeners, mantén ese patrón.
- Autoplay: navegadores bloquean `play()` sin gesto del usuario → se captura `NotAllowedError` y se hace `setIsPlaying(false)`. No forzar autoplay.
- Streams de terceros se caen → hay auto-skip al siguiente canal tras 4s de error (`hasError`). Si un canal falla siempre, actualizar su `audioUrl` en `PLAYLIST`.
- **Zeno:** curl sin `Referer: https://zeno.fm/` → **401**. Con Referer → 302 a `stream-*.surfernetwork.com/...?zt=<JWT>` (JWT corto). En el playlist guardar solo la canónica `https://stream.zeno.fm/{id}`, no la URL con `zt=`.
- **2026-08-07:** `https://icecast.teveo.cu/XjfW7qWN` (Radio Progreso) → 404 HTML. Reemplazado por Habana Son Cuba `https://stream.zeno.fm/2ieszeso9istv` (mp3). Validar con GET de bytes + Content-Type `audio/mpeg`, no solo HEAD.
- **2026-07-27:** varias estaciones laut.fm antiguas → 404. Validar con GET de bytes (`curl -r 0-2k`), no con HEAD.
- Al sincronizar el canal, comparar la URL pedida (ref), no `audio.src`: varios streams redirigen y el src resuelto ya no coincide con el del playlist.
- Al pausar se limpia `audio.src` para cerrar la conexión HTTP y ahorrar ancho de banda; hay guardas para no disparar errores con src vacío/igual a la URL del documento.

## CSS
- Se **oculta Grammarly** vía CSS (`[data-grammarly-part]`, etc.) para que no interfiera con el prototipo. No borrar ese bloque en `index.css`.
- El indicador del date-picker (`input[type=date]::-webkit-calendar-picker-indicator`) se reposiciona y recolorea con `filter` para que combine con el naranja de marca. Fue un ajuste pedido explícitamente (ver bitácora D3). No revertir sin razón.

## Estado / layout
- `RadioPlayer` es `fixed bottom-0 z-[150]`; `App` compensa con `pb-28 md:pb-20`. Si cambias la altura del player, ajusta ese padding o el contenido queda tapado.
- Añadir al carrito abre el `CartDrawer` automáticamente (feedback intencional), no es bug.

## Cambios de paleta
- **Los colores por defecto de Tailwind son el enemigo del `@theme`.** Sobrevivieron dos cambios de paleta ~20 usos de `amber-400/500`, más `rose-*`, `pink-500`, `emerald-500` y un `rgba(255,107,53,.4)` en una `shadow-[...]`. No se notaron porque las tres paletas tenían un amarillo cálido parecido al ámbar. Antes de dar por buena una paleta, correr:
  `rg -o '(bg|text|border|from|via|to)-(amber|orange|yellow|emerald|green|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|red|slate|gray|zinc|neutral|stone)-[0-9]+' src`
- **Auditar contraste con script: Tailwind v4 emite `oklab()`, no `rgb()`.** Un regex ingenuo de `[\d.]+` lee `oklab(0.83 0.0009 0.053)` como si fuera rgb y devuelve ratios de 1.0 (falsos positivos que tapan los fallos reales). Hay que convertir oklab→sRGB. Ojo también con `color(srgb ...)`, que viene en rango 0–1.
- **Al recorrer ancestros buscando el fondo, no abortar por `background-image`.** Las cuatro utilidades `fondo-*` llevan gradientes de textura; si el script corta ahí, salta las cuatro secciones principales y reporta una página falsamente limpia. Cortar solo con `url(...)`.
- **Sobreimprimir rojo sobre azul da violeta.** Ver `decisions/design.md` § Regla de sobreimpresión. Aplica igual a los degradados decorativos: el header del `ReservationModal` tenía `to-primary/20` y teñía el modal de morado.

## Fechas
- `ReservationModal` tenía la fecha por defecto **hardcodeada** (`useState("2026-07-17")`), que quedó en el pasado. Ahora usa `new Date().toLocaleDateString("en-CA")` (formato `YYYY-MM-DD` en hora local, no UTC como `toISOString()`, que se corre un día según la zona) y pasa ese mismo valor como `min` para bloquear fechas pasadas.
