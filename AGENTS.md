# AGENTS.md — Son Havana Digital

Archivo central de control. Léelo primero en cada sesión. Denso a propósito: no lo infles.

## 1. Identidad y propósito
- **Producto:** landing page de una sola pantalla (SPA) para **Son Havana**, club de salsa en Medellín, Colombia.
- **Objetivo de negocio:** que el visitante complete una acción sin fricción → reservar mesa, reservar cumpleaños, contratar orquesta, o comprar merch. **La conversión final ocurre por WhatsApp** (`wa.me/573105156550`), no hay checkout ni backend real.
- **Origen:** app generada en Google AI Studio (ver `metadata.json`, `README.md`). Contexto académico: proyecto "Renovación de Página Son Havana", Interface School, estudiante Ana (ver `contexto/`).
- **Idioma del producto y de la memoria:** español (Colombia). Escribe copy y docs en español.

## 2. Stack y hechos duros (no re-descubrir)
- React 19 + TypeScript + Vite 6. Tailwind CSS **v4** vía `@tailwindcss/vite` (config en `@theme` dentro de `src/index.css`, **no** hay `tailwind.config.js`).
- Animación: `motion` (antes framer-motion), import `from "motion/react"`. Iconos: `lucide-react`.
- Gestor: `bun` (existe `bun.lock`) pero los scripts usan `npm`/`vite`. Dev: `npm run dev` → puerto 3000. Lint/typecheck: `npm run lint` (= `tsc --noEmit`). Build: `npm run build`.
- **No hay servidor:** `express` y `dotenv` están en `package.json` pero no hay `server.js`. `@google/genai` y `GEMINI_API_KEY` **no se usan en `src/`** (dependencia muerta / herencia de AI Studio).
- **No es repo git** todavía (`git init` no ejecutado).

## 3. Arquitectura (mapa mental, no leer todo el código)
- Todo el estado vive en `src/App.tsx`: carrito (`cartItems`) + flags de modales, pasado por props (prop-drilling, sin Context/Redux).
- Secciones (orden en la página): `Header` → `Hero` → `Contrataciones` → `Merch` → `Galeria` → `Reservas` → `Footer`. Overlay persistente: `RadioPlayer`. Modales: `ReservationModal`, `QuoteModal`, `CartDrawer`.
- Los **datos son arrays const dentro de cada componente** (no hay CMS ni `data/`). Para cambiar contenido, edita el array del componente correspondiente (ver `skills/editar-contenido.md`).
- Tipos compartidos en `src/types.ts` (`Product`, `CartItem`, `Artist`, `Track`).

## 4. Reglas duras e invariantes (NO romper)
1. Teléfono de conversión único: **+57 310 515 6550** (`573105156550`). Reusar en TODO CTA de WhatsApp.
2. Toda acción de negocio (reserva, cotización, compra) termina en un deep-link `wa.me` con mensaje pre-llenado en español. No inventar backend/checkout salvo que se pida.
3. Design tokens SOLO en `@theme` de `src/index.css`. No hardcodear hex nuevos **ni usar la escala de color por defecto de Tailwind** (`amber-400`, `rose-500`, …): usar clases de token (`text-primary-container`, `text-mango`, …). Ver `decisions/design.md`.
4. Imágenes: patrón `localPath` (en `/public/images/...`) con fallback a `demoUrl` vía `onError`. No borrar el fallback.
5. No tocar la config de `hmr`/`watch` en `vite.config.ts` (comentario explícito: rompe AI Studio).
6. Mantener el CSS que oculta Grammarly y el que estiliza el date-picker (ver `gotchas/`).
7. Copy en español, tono salsa/caribeño, mayúsculas en títulos con fuente `Anybody`.

## 5. Reglas de oro de contexto y memoria (comportamiento del agente)
- El *context window* es caro y volátil. **La memoria real vive en estos archivos, no en el historial de chat.**
- **Nunca** cargues todo el historial ni todos los archivos. Carga solo lo estrictamente necesario para la tarea.
- **Referencia** archivos por ruta en vez de pegar bloques largos en el prompt.
- Convierte procedimientos repetitivos en `skills/`. Si repites algo 2+ veces, vuélvelo skill.
- Al **cerrar una sesión importante**: actualiza `state/estado-actual.md`, registra decisiones nuevas en `decisions/decisiones.md`, anota problemas nuevos en `gotchas/`, y deja un resumen comprimido en `logs/AAAA-MM-DD-titulo.md`.
- Mantén este AGENTS.md conciso (máx ~250-300 líneas). Si crece, mueve detalle a las carpetas y deja aquí solo el puntero.

## 6. Orden de lectura preferido
1. `AGENTS.md` (este archivo) — siempre.
2. `state/estado-actual.md` — qué está hecho/pendiente/bloqueado AHORA.
3. Según la tarea, UNA de:
   - Diseño/estilos → `decisions/design.md`
   - Cambiar textos/precios/imágenes → `skills/editar-contenido.md`
   - Bug/comportamiento raro → `gotchas/gotchas.md`
   - "¿por qué está así?" → `decisions/decisiones.md`
4. El componente `src/components/<X>.tsx` concreto. Evita abrir toda `src/` de golpe.
5. `logs/` solo si necesitas historia de una sesión pasada específica.

## 7. Routing de skills (qué skill/archivo usar según la tarea)
| Tarea | Ir a |
| --- | --- |
| Cambiar copy, precios, productos, canales de radio, slides, artistas, galería | `skills/editar-contenido.md` |
| Reemplazar o añadir imágenes | `skills/reemplazar-imagenes.md` |
| Correr, buildear, revisar tipos, desplegar | `skills/ejecutar-y-deploy.md` |
| Ajustar colores/fuentes/utilidades visuales | `decisions/design.md` |
| Cambiar de paleta o tocar colores de texto | `decisions/design.md` + **correr `skills/auditar-contraste.md` al terminar** |
| Rediseñar la capa visual (paleta, texturas, imágenes) con IA | `skills/prompt-rediseno-visual.md` |
| Añadir/editar un CTA de WhatsApp | Regla dura #1 y #2 + `skills/editar-contenido.md` |

## 8. Definition of Done (heredada del brief D3/D4, ver `contexto/`)
Una tarea de feature está "hecha" cuando:
- La persona completa **cualquier** reserva (mesa, cumpleaños, orquesta) o la compra de instrumentos **sin fricción al primer intento**.
- **Cada CTA del hero funciona** y abre el flujo correcto (WhatsApp con mensaje correcto / modal correcto).
- El selector de fecha del modal de reservas responde a clic/tacto.
- `npm run lint` pasa sin errores de tipos.
- Copy en español, sin texto genérico de relleno.
- Antes de demo/deploy: correr checklist QA (ver `state/`), desplegar a URL pública, probar en móvil real.

## 9. Protocolo de fin de sesión (checklist rápido)
- [ ] `state/estado-actual.md` refleja la realidad (mover ítems entre Hecho/Pendiente/Blockers).
- [ ] Decisiones no triviales → `decisions/decisiones.md` (con fecha + razón).
- [ ] Problemas nuevos + su fix → `gotchas/gotchas.md`.
- [ ] Resumen comprimido de la sesión → `logs/`.
- [ ] Este archivo sigue < 300 líneas y sin duplicar lo que ya vive en las carpetas.

## 10. Punteros de memoria
- `decisions/` — por qué las cosas son como son (diseño + arquitectura, con fecha).
- `state/` — foto actual: hecho / pendiente / blockers + checklist QA.
- `skills/` — cómo hacer tareas repetibles paso a paso.
- `gotchas/` — trampas conocidas y sus soluciones.
- `logs/` — resúmenes comprimidos de sesiones pasadas.
- `contexto/` — material fuente original (bitácora académica, brief 4D). Solo lectura de referencia.
