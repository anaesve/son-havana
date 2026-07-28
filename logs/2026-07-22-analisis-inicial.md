# Log · 2026-07-22 · Análisis inicial + instauración de memoria

## Objetivo de la sesión
Aplicar buenas prácticas de gestión de contexto/memoria: analizar el repo y crear estructura de memoria persistente (AGENTS.md + carpetas).

## Qué se hizo
- Análisis completo del proyecto: stack, arquitectura, datos, design system, flujos de conversión, gotchas.
- Creado `AGENTS.md` (control central) y carpetas `decisions/`, `state/`, `skills/`, `gotchas/`, `logs/`.

## Hallazgos clave
- Landing SPA (React 19 + Vite 6 + Tailwind v4 + motion) para club de salsa Son Havana (Medellín). Origen: Google AI Studio.
- Conversión 100% por WhatsApp `573105156550`; sin backend (deps `express`/`dotenv`/`@google/genai` muertas).
- Estado global en `App.tsx` por props. Datos como arrays const por componente. Tokens en `@theme` de `index.css`.
- Patrón de imágenes `localPath` + `demoUrl` (onError). HMR/watch no se debe tocar (AI Studio). Grammarly oculto por CSS.
- No es repo git aún.

## Pendientes que quedan (ver state/)
- Assets locales reales, validar streams de radio, limpiar deps muertas, `git init`, confirmar sedes.

## Notas para próxima sesión
- Empezar leyendo `AGENTS.md` → `state/estado-actual.md`. Cargar solo el componente de la tarea.
