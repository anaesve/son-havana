# Skill: auditar contraste WCAG AA

Cuándo usarla: después de **cualquier** cambio de paleta, de tokens del `@theme` o de colores de texto. Revisar a ojo no sirve — en este proyecto dejó pasar 20 fallos reales repartidos en tres paletas.

## Por qué hace falta un script y no una extensión

Tres cosas rompen las herramientas ingenuas en este proyecto:

1. **Tailwind v4 emite `oklab()`**, no `rgb()`. Un regex de números lee `oklab(0.83 0.0009 0.053)` como si fuera rgb, calcula ratios de 1.0 y produce falsos positivos que tapan los fallos de verdad. Hay que convertir oklab→sRGB.
2. **Casi todo el texto usa alfa** (`text-surface-variant/70`). Hay que componer el color contra el fondo *heredado* real, subiendo por los ancestros hasta encontrar uno opaco.
3. **Las cuatro utilidades `fondo-*` llevan `background-image`** (las tramas de serigrafía). Si el recorrido aborta al ver `background-image`, salta las cuatro secciones principales y reporta la página limpia cuando no lo está. Solo hay que abortar con `url(...)`, que sí es una imagen real e impredecible.

## Cómo correrla

Con el sitio en `http://localhost:3000/`, ejecutar el script de `skills/auditar-contraste.js` en la consola del navegador (o vía Chrome DevTools MCP con `evaluate_script`).

Devuelve `{ totalFallos, pagina, modalReserva, modalCotizacion, carrito }`. **La meta es `totalFallos: 0`.** El script abre solo los tres flujos, así que no hay que hacer clics a mano.

Repetir a ancho móvil (`resize_page` a ≤500 px): los tamaños de fuente cambian por breakpoint y con ellos el umbral exigido.

## Cómo leer los resultados

Cada fallo trae `{ t: texto, r: ratio real, need: ratio exigido }`. El umbral es 4.5:1, o 3:1 si el texto es ≥24 px o bien negrita y ≥18.66 px.

Arreglos típicos en este proyecto, por orden de frecuencia:

| Síntoma | Causa | Arreglo |
| --- | --- | --- |
| Microcopy en 2–3.5:1 | alfa por debajo de `/70` sobre fondo oscuro | subir a `/70`–`/85` |
| Texto claro sobre tinta de color | tinta clara con `text-white` | `text-on-surface` / `text-on-primary-container` |
| Texto oscuro sobre `fondo-acento` en ~3.9:1 | la tarjeta **oscurece** el fondo (`bg-on-surface/10`) y acerca fondo y texto | que la tarjeta **aclare**: `bg-surface/20` |
| Enlace pequeño en bermellón sobre azul (4.3:1) | `primary-container` es tinta media | usar `primary` (bermellón claro, 6.0:1) |

## Antes de dar por buena una paleta

Correr también esto, que el audit de contraste **no** detecta (un color fuera de paleta puede tener contraste perfecto):

```bash
rg -o '(bg|text|border|from|via|to)-(amber|orange|yellow|emerald|green|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|red|slate|gray|zinc|neutral|stone)-[0-9]+' src
```

Lo único aceptado hoy son los `red-*` de estados de error/borrado. Todo lo demás debe ser un token.
