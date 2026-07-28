# Log · 2026-07-27 · Rediseño visual a cartelismo cubano

## Objetivo
Renovar paleta, imágenes, texturas y fondos del home hacia un lenguaje caribeño y cubano-cartelista, conservando información, logo, flujo, tipografía y secciones.

## Proceso
1. Se escribió un prompt de dirección de arte con la skill de prompt engineering → `skills/prompt-rediseno-visual.md` (versión para chat + versión para Claude Code).
2. Se propusieron 3 direcciones de paleta con una imagen de muestra de cada una. Ana eligió **B · Mediodía Caribeño** (fondo claro).
3. Antes de tocar código se midió el alcance: ~194 clases dependientes del tema oscuro en 13 archivos, pero solo 3 secciones usaban las texturas `wood-*`. Eso permitió una estrategia de alternancia en vez de una inversión total.

## Qué se hizo
- `src/index.css`: nuevo `@theme` con la paleta; utilidades `papel-arena`, `tinta-turquesa`, `tinta-azul`, `tinta-coral`, `trama-punto`, `registro-desplazado`; `wood-*` eliminadas; `neon-*`/`glow-*` reimplementadas como sombra dura; scrollbar y date-picker recoloreados.
- Secciones: Contrataciones → turquesa, Galería → azul, Merch → papel crema (con su texto invertido a `on-surface` y tarjetas con sombra dura).
- Hero: scrim radial de `on-surface` en vez del gradiente negro, para que las tintas del cartel se vean.
- Se eliminaron los hex hardcodeados café (`#120705`, `#0a0201`) de Footer y RadioPlayer → `on-surface`; amber → `mango`.
- 16 imágenes generadas y convertidas a jpg: 4 hero, 6 galería, 2 orquestas, 4 merch. Merch pasó de URLs remotas de Google a `/images/merch/*.jpg`.
- `npm run lint` pasa. Verificado en navegador con screenshots de página completa.

## Segunda vuelta: cambio a "Noche de Malecón" (paleta C)
Ana pidió probar la tercera propuesta. Al ser el segundo cambio de paleta en la misma sesión, se invirtió el esfuerzo en que **no haya una tercera vez costosa**:
- Las utilidades de `index.css` dejaron de tener hex; ahora derivan de los tokens con `color-mix()`.
- Los fondos de sección se renombraron por **rol** en vez de por color: `papel-arena`→`fondo-papel`, `tinta-turquesa`→`fondo-tinta`, `tinta-azul`→`fondo-profundo`, y se añadió `fondo-acento`. Un cambio de paleta futuro se hace editando solo el `@theme`.
- Se añadieron `sombra-dura*` para reemplazar las sombras con rgba hardcodeado de Merch.
- Las 16 imágenes se regeneraron con las tintas nuevas.
- **Reservas** cambió de rojo con texto blanco a fucsia con texto azul medianoche, porque en esta paleta el color de CTA es una tinta clara. Quedó como el pico visual de la página.

## Aprendizajes
- **Nombrar por rol, no por color.** El disparador fue tener que renombrar `tinta-turquesa` cuando ya no había turquesa. Vale la pena pagar ese refactor la primera vez que cambia la paleta, no la segunda.
- **Verificar si un token de color se usa como fondo de sección completa antes de cambiarlo.** `primary-container` era a la vez color de CTA y fondo de Reservas; volverlo una tinta clara rompió 12 usos de `text-white` en ese archivo. Un `grep` de `bg-<token>` antes de editar el `@theme` lo anticipa.
- **El patrón de falla de una paleta con tintas claras es "texto blanco encima".** Buscar `(bg-primary-container|bg-success|bg-mango|bg-palma).*text-white` encontró los 5 casos restantes en segundos, en vez de revisarlos a ojo.
- Un color puede fallar en las dos direcciones: el fucsia sirve como fondo (6.5:1 con texto oscuro) pero **no** como color de texto sobre el papel claro (2.62:1, falla incluso para texto grande). En la sección clara los acentos van en rojo.
- El coral/fucsia brillante nunca alcanza AA con texto claro; el rojo profundo `#c1121f` sí (5.6-5.8:1). Es el token al que recurrir cuando hace falta un acento cálido *legible*.
- Los prompts de imagen necesitan prohibiciones explícitas: la primera muestra metió palmera, cúpula colonial y gafas de sol. Con la lista de vetos el resultado fue limpio. Pedir "no text" también es clave, porque los titulares los pone la app en Anybody.
- **Revisar que la imagen concuerde con el copy:** salió una orquesta con cantante femenina para "El Son de Pablo" y hubo que regenerarla. Leer el nombre en el array antes de generar.
- Con `scroll-behavior: smooth` en `html`, un `scrollIntoView()` seguido de screenshot captura el estado previo a la animación. Usar `scrollTo({behavior:'instant'})` al verificar en navegador.

## Pendiente que queda
Renombrar `neon-*`/`glow-*`, QA en móvil real, `<title>` genérico, logo aún en hotlink remoto.
