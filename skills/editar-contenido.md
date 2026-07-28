# Skill: editar contenido (textos, precios, datos)

Los datos NO están en un CMS: son arrays `const` dentro de cada componente. Edita el array correcto y listo.

## Dónde vive cada dato
| Contenido | Archivo | Array / const |
| --- | --- | --- |
| Slides del hero (evento, precio, highlights, CTA, mensaje WA) | `src/components/Hero.tsx` | `SLIDES_TEMPLATE` |
| Productos de merch (nombre, precio USD, imagen, descripción) | `src/components/Merch.tsx` | `PRODUCTS` |
| Artistas contratables | `src/components/Contrataciones.tsx` | `DEMO_*` + JSX de tarjetas |
| Canales de radio (título, artista, tag, `audioUrl`) | `src/components/RadioPlayer.tsx` | `PLAYLIST` |
| Fotos de galería + captions | `src/components/Galeria.tsx` | `IMAGES_TEMPLATE` |
| Sedes del selector de reserva | `src/components/ReservationModal.tsx` | `<option>` (Medellín/Laureles/Bogotá) |
| Enlaces sociales / WhatsApp | `Footer.tsx`, `Header.tsx`, `Reservas.tsx` | `href` directos |

## Reglas
- Teléfono WhatsApp SIEMPRE `573105156550` (regla dura #1 de AGENTS.md).
- Mensajes de WhatsApp: español, pre-llenados, pasar por `encodeURIComponent`.
- Precios: merch en **USD** (`$XX.00 USD`), eventos/hero en **COP** (`$25.000 COP`). Mantener consistencia por sección.
- Copy: español caribeño, títulos en MAYÚSCULAS (`font-anybody`).
- Tras editar: `npm run lint`.

## Ejemplo (añadir producto)
En `PRODUCTS` de `Merch.tsx` agrega un objeto `{ id, name, price, image, description }`. `id` único (`prod-N`). `image` puede ser `localPath` o URL remota (con `referrerPolicy="no-referrer"` ya presente en el `<img>`).
