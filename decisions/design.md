# Design system — Son Havana

Fuente de verdad: `src/index.css` (bloque `@theme` de Tailwind v4). No hay `tailwind.config.js`. No hardcodear hex nuevos; añade tokens aquí primero.

## Tokens de color (@theme) — paleta "Serigrafía ICAIC" + naranja SH (2026-07-27)
Lenguaje: cartelismo cubano (ICAIC) con acento **naranja Son Havana** (papaya), no bermellón. Base azul tinta + papel crudo.

| Token / clase | Hex | Uso |
| --- | --- | --- |
| `primary-container` | `#ff6b35` | Naranja SH. CTAs y fondo de Reservas. **Tinta CLARA**: texto oscuro (5.77:1 con `on-primary-container`). |
| `on-primary-container` | `#0e1b4d` | Azul tinta. Texto sobre naranja. |
| `primary` | `#ff8a5b` | Naranja claro. Hover y **enlaces sobre fondo azul** (7.05:1). |
| `secondary-container` | `#9a3412` | Terracota naranja. Acento de texto en sección clara (6.47:1 con `surface`). |
| `on-secondary-container` | `#fdf0d5` | Papel crudo. Texto sobre terracota. |
| `on-surface` | `#0e1b4d` | Azul tinta. Fondo base, footer, player. 14.6:1 con `surface` ✓ |
| `surface` | `#fdf0d5` | Papel crudo. Texto claro y fondo Merch. |
| `surface-variant` | `#d8c9a3` | Arena. Microcopy sobre oscuro (mínimo `/70`). |
| `coral` | `#ff6b35` | Alias del naranja (sombras, sobreimpresión). |
| `mango` | `#ffb703` | Mostaza sol. Destacados cálidos. |
| `palma` | `#06d6a0` | Verde agua. |
| `success` | `#06d6a0` | Éxito. Texto `on-surface`. |

Excepciones: verde WhatsApp `#25D366` (texto `on-surface`, nunca blanco) e Instagram.

### Reglas críticas de esta paleta
1. **Tintas claras** (naranja, verde agua, mostaza): nunca texto blanco encima → `on-primary-container` / `on-surface`.
2. **El naranja no sirve como texto sobre `surface`** (2.51:1). En Merch los acentos de texto van en `secondary-container`.
3. Enlaces pequeños sobre azul: preferir `primary` (7.05:1) a `primary-container` (5.77:1).
4. Tarjetas de Reservas (mesa/cumpleaños): `bg-card` sólido con gradiente suave a `surface`; Centro de Ayuda sigue en `bg-on-surface`. No oscurecer el fondo de las cards claras.
5. Alfas de microcopy: piso `/70`.

## Tipografía (@theme fonts, cargadas desde Google Fonts en `index.css`)
- `font-anybody` (**Anybody** 400/700/900): títulos, CTAs, todo en MAYÚSCULAS, `font-black`, tracking negativo/ancho según caso. Es la voz de la marca.
- `font-geist` (**Geist** 400/600): texto de párrafo y UI general (body por defecto en `App`).
- `font-archivo` (**Archivo Narrow**): disponible; uso puntual.

## Utilidades custom (definidas en `@layer utilities`)
Todas en CSS puro: color plano + trama de semitono + franjas de sobreimpresión. **Ninguna tiene hex hardcodeado**: derivan de los tokens con `color-mix()`, así que cambiar de paleta se hace editando solo el `@theme`.

Fondos de sección — nombrados por **rol**, no por color:
- `fondo-papel` (arena al mediodía: lavados mango/palma/coral) → **Merch**. Texto `on-surface`, acentos `secondary-container`.
- `fondo-tinta` (azul tinta + lavado de mar) → **Contrataciones**. Texto claro.
- `fondo-profundo` (noche de club: focos mango/coral/palma) → **Galería**. Texto claro.
- `fondo-acento` (sol de tarde: bermellón + lavados mango/terracota) → **Reservas**. Texto **oscuro**.

**2026-07-27 (noche):** las texturas dejaron de ser serigrafía (semitono + franjas) porque pelean con las fotos reales. Ahora son **lavados atmosféricos caribeños** (elipses suaves de mango, coral y verde agua). Sin franjas, sin puntos de cartel.

Otras:
- `trama-punto`: trama de semitono reutilizable.
- `sombra-dura`, `sombra-dura-acento`, `sombra-dura-chica`: sombras de serigrafía sin blur (tarjetas y botones de Merch).
- `registro-desplazado`: franja tricolor desplazada (error de registro) para bordes de sección.
- `vinyl-grooves`: surcos de vinilo (RadioPlayer).
- `animate-spin-slow` (10s) + `pause-animation`: disco girando en el player.

**Deuda técnica consciente:** `neon-orange`, `neon-gold`, `glow-orange` y `glow-gold` conservan sus nombres pero ya NO hacen neón: ahora son sombras duras desplazadas (sobreimpresión serigráfica). Se mantuvo el nombre para no editar ~14 usos en 7 componentes. Renombrar en una pasada futura.

## Ritmo de secciones
Alternancia tipo cartel: azul tinta (hero/base) → `fondo-tinta` (Contrataciones) → `fondo-papel` (Merch) → `fondo-profundo` (Galería) → `fondo-acento` naranja (Reservas) → azul tinta (Footer). Reservas es el pico cromático: tinta brillante con tipografía oscura.

### Hero — scrim y marco (2026-07-27 noche++)
- **Slides 1–3** (Lavoe, Niche, Programación): degradado **radial centrado** (velo fuerte donde va el copy; esquinas más claras para que se lea la ilustración) + leve gradiente arriba/abajo.
- **Slide 4** (Clases): scrim fotográfico plano `on-surface/35` + `from-on-surface via-on-surface/50 to-on-surface/10`.
- **Sin marco** de línea blanca (`border` inset); se eliminó porque no aportaba y ensuciaba la composición.
- Dots del slider: `bottom-20 md:bottom-24` (por encima del RadioPlayer).

## Patrones de layout
- Página de scroll único; cada sección `min-h` cercano al viewport, `id` para anclas del `Header` (`#hero`, `#merch`, etc.) con `scroll-mt-20`.
- Contenedor: `max-w-7xl mx-auto`, padding `px-6 md:px-16`.
- Grids responsive: merch `grid-cols-1 sm:2 lg:4`; galería con slider + lightbox.
- `RadioPlayer` fijo abajo (`fixed bottom-0 z-[150]`); por eso `App` tiene `pb-28 md:pb-20`.
- Feedback inmediato: añadir al carrito abre el `CartDrawer` automáticamente.

## Patrón de imágenes (importante)
Cada item define `localPath` (en `/public/images/...`) y `demoUrl` (respaldo remoto). El estado inicializa con `localPath` y, en `onError`, cae a `demoUrl`. Ver `skills/reemplazar-imagenes.md`. En `<img>` de hotlink usar `referrerPolicy="no-referrer"`.

Excepción: **Merch** no usa el patrón dual, solo un campo `image`. Desde 2026-07-27 apunta a `/images/merch/*.jpg` (locales, sin fallback).

## Arte de las imágenes (2026-07-27 → noche++)
- Base: fotos / assets locales en `public/images/{hero,galeria,contrataciones,merch}/`.
- **Hero (noche++):** ilustraciones de cartelismo sustituyen slides Lavoe, Niche y Programación semanal (JPGs ~1024×576 en `public/images/hero/`). Clases de baile mantiene su asset previo.
- Galería / Merch / artistas: fotos restauradas (script `scripts/restaurar-fotos-originales.py`).
- Patrón `localPath` + `demoUrl` se mantiene.

**Peso:** galería reencodada a ≤1400 px / q76. Hero ilustrado ~280–330 KB c/u.

## Iconografía
- UI general: `lucide-react` (import puntual).
- **Footer redes (2026-07-27):** Lucide para Instagram / Facebook / YouTube; SVGs de marca para **Spotify** y **WhatsApp** (Lucide no trae Spotify). Links oficiales en `Footer.tsx`.
- Reservas: `Users`, `Cake`, `MapPin` con `animate-bounce` en las tres cards.
- Contrataciones: cards Corporativos / Bodas solo con icono pequeño izquierdo (sin decoración gigante a la derecha).

## Motion
`motion/react` con `AnimatePresence` para modales, transiciones de slide del hero (7s auto-advance) y el player (minimizado/expandido).
