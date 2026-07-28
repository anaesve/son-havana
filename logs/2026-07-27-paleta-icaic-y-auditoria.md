# 2026-07-27 · Paleta "Serigrafía ICAIC" (paleta 1) y auditoría de contraste

Tercera y última vuelta de paleta de la sesión. Ana pidió ver la paleta 1 después de haber probado la 2 ("Mediodía Caribeño") y la 3 ("Noche de Malecón").

## Resultado

Paleta definitiva: azul tinta `#0e1b4d`, bermellón `#ff3b30`, mostaza `#ffb703`, verde agua `#06d6a0`, papel crudo `#fdf0d5`, terracota `#7b2d26`. Las 16 imágenes regeneradas en esas tintas. `npm run lint` limpio y 0 fallos de contraste en los 129 nodos de texto medibles de la página y de los tres flujos.

## Qué se hizo

1. **Cambio de paleta:** editar el bloque `@theme` de `src/index.css`. Nada más. La refactorización de la vuelta anterior (utilidades con `color-mix()`, fondos nombrados por rol) cumplió lo prometido.
2. **Limpieza de colores fuera de paleta:** ~25 clases de la escala por defecto de Tailwind migradas a tokens, más un `rgba()` hardcodeado dentro de una `shadow-[...]`.
3. **Auditoría de contraste automatizada:** script nuevo, 20 fallos reales corregidos.
4. **Bug de fecha:** el modal de reserva abría en una fecha ya pasada.
5. **Ajustes cromáticos:** velo del hero, tinta de sobreimpresión de la galería, degradado del modal.
6. **Peso de imágenes:** 10.5 MB → 4.8 MB reencodando.

## Lo que costó y por qué

### La refactorización anterior se validó solo a medias

El cambio de paleta fue efectivamente editar el `@theme`. Pero aparecieron **~25 usos de colores por defecto de Tailwind** (`amber-400/500`, `rose-*`, `pink-500`, `emerald-500`) escondidos en los componentes, que habían sobrevivido invisibles a **dos** cambios de paleta previos: las tres paletas tenían un amarillo cálido parecido al ámbar, así que nunca se vieron mal.

Lección: "las utilidades no tienen hex" no alcanza. Hay que verificar que los componentes tampoco usen la escala por defecto. Comando en `skills/auditar-contraste.md`.

### Revisar contraste a ojo no funciona

Es la tercera paleta y en las dos anteriores se colaron errores. Esta vez se escribió un script que recorre el DOM y calcula el ratio real. Encontró 20 fallos, incluido **uno que no era de paleta y llevaba ahí desde el inicio**: el botón "Pedir por WhatsApp" con texto blanco sobre verde `#25D366`, a 1.98:1.

El script tuvo dos versiones equivocadas antes de servir, y ambos errores valen la pena recordarlos:

- **Primera versión:** leía `oklab()` con un regex de números como si fuera `rgb()`. Tailwind v4 serializa así todos los colores. Resultado: veinte ratios de 1.0 que eran falsos positivos, tapando los fallos de verdad.
- **Segunda versión:** abortaba al encontrar `background-image` en un ancestro. Las cuatro utilidades `fondo-*` llevan gradientes de textura, así que el script saltó las cuatro secciones principales y reportó "5 fallos, todo limpio". Falso: eran 14. Solo hay que abortar con `url(...)`.

Moraleja: una herramienta de verificación que no se verifica a sí misma es peor que no tenerla, porque da permiso para dejar de mirar.

### El bermellón es una tinta incómoda

Luminancia media: contra el azul da 4.64:1 y contra el papel 3.14:1. Pasa AA solo con texto oscuro y con margen escaso. De ahí dos reglas que quedaron en `decisions/design.md`:

- Los enlaces pequeños sobre azul usan `primary` (bermellón claro, 6.0:1), no `primary-container`.
- Las tarjetas sobre `fondo-acento` tienen que **aclarar** el fondo (`bg-surface/20`), no oscurecerlo. Con `bg-on-surface/10` el fondo se acercaba al color del texto y lo hundía a 3.9:1. Fue la causa de 6 de los 20 fallos.

### La tinta de sobreimpresión se elige por el matiz de la mezcla

La sección de galería se veía violeta. Medido: bermellón sobre azul oscuro cae en 316°. Se probó terracota (45%) y dio igual de violeta, porque cualquier rojo sobre azul deja el azul alto respecto al verde. Se probó mostaza al 18% y cayó en gris neutro (r≈b), que desaturaba la sección. Quedó mostaza al 32%: ocre, 39°, 48% de saturación.

Regla general: verificar el matiz de la **mezcla**, no el de la tinta suelta. Aplica también a degradados decorativos — el header del `ReservationModal` tenía `to-primary/20` y teñía el modal de morado.

### Un bug que no era de color

Revisando el modal de reservas apareció que la fecha por defecto estaba hardcodeada en `2026-07-17`, o sea en el pasado. Rompe la Definition of Done ("reservar sin fricción al primer intento"). Ahora arranca en hoy con `toLocaleDateString("en-CA")` — no `toISOString()`, que da UTC y se corre un día según la zona horaria — y bloquea fechas pasadas con `min`.

### El grano de serigrafía pesa

La trama de semitono es ruido de alta frecuencia y el JPEG la comprime muy mal: 16 imágenes a calidad 82 daban 10.5 MB para una landing. Reencodadas a 1500/1100/700 px según uso bajan a 4.8 MB sin diferencia visible.

## Queda pendiente

- Renombrar `neon-*` / `glow-*`: ya son sombras duras, no neón (deuda consciente, ~14 usos).
- Sacar los `red-*` que quedan en estados de error y borrado.
- Revisar en móvil real, sobre todo el bermellón de Reservas bajo luz solar (4.64:1 cumple, pero sin margen).
- El logo sigue siendo hotlink remoto y además es naranja, fuera de paleta.
- `<title>` de `index.html` sigue en "My Google AI Studio App".
