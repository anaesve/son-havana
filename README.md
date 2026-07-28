# Son Havana Digital

Landing page de una sola pantalla (SPA) para **Son Havana**, club de salsa en Medellín, Colombia.

**Conversión:** toda reserva, cotización o compra cierra por WhatsApp (`wa.me/573105156550`). No hay checkout ni backend.

Proyecto académico — Interface School · Renovación de Página Son Havana · Ana Escovar.  
Origen: plantilla Google AI Studio (ver `metadata.json`).

## Stack

- React 19 + TypeScript + Vite 6
- Tailwind CSS v4 (`@tailwindcss/vite`; tokens en `src/index.css` `@theme`)
- `motion/react` · `lucide-react`
- Dev: `npm run dev` → [http://localhost:3000](http://localhost:3000)

## Cómo correr

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # tsc --noEmit
npm run build    # → dist/
```

> `GEMINI_API_KEY` / `express` / `@google/genai` son herencia de AI Studio y **no se usan** en `src/`.

## Estructura útil

| Ruta | Qué es |
| --- | --- |
| `src/App.tsx` | Estado global (carrito + modales) |
| `src/components/` | Secciones: Header, Hero, Contrataciones, Merch, Galeria, Reservas, Footer, RadioPlayer |
| `public/images/` | Assets locales (hero, galería, merch, contrataciones) |
| `AGENTS.md` | Memoria / reglas del proyecto para agentes |
| `decisions/design.md` | Design system y paleta vigente |
| `state/estado-actual.md` | Hecho / pendiente / blockers |

## Paleta vigente (Serigrafía ICAIC + naranja SH)

| Token | Hex |
| --- | --- |
| `primary-container` / `coral` | `#ff6b35` |
| `primary` | `#ff8a5b` |
| `secondary-container` | `#9a3412` |
| `on-surface` | `#0e1b4d` |
| `surface` | `#fdf0d5` |
| `mango` | `#ffb703` |
| `palma` / `success` | `#06d6a0` |

Detalle y reglas de contraste → `decisions/design.md`.

## Redes (footer)

- Instagram: [instagram.com/sonhavana](https://www.instagram.com/sonhavana)
- Facebook: [facebook.com/sonhavana](https://www.facebook.com/sonhavana/)
- YouTube: [youtube.com/@juliosonhavana](https://www.youtube.com/@juliosonhavana)
- Spotify: [perfil Julio Restrepo Molina](https://open.spotify.com/user/31jw5jzeoqa2f5kttbqt55ei3kqi?si=4f3a46ca591a435f)
- WhatsApp: `+57 310 515 6550`

## Subir a GitHub

La carpeta del proyecto (aún sin `git init`):

```text
/Users/anaescovar/Downloads/son-havana
```

Ejemplo:

```bash
cd /Users/anaescovar/Downloads/son-havana
git init
git add .
git commit -m "Landing Son Havana — SPA React + Vite"
gh repo create son-havana --public --source=. --remote=origin --push
```
