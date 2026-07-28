# Skill: ejecutar, verificar y desplegar

## Comandos
```bash
npm install        # o: bun install (existe bun.lock)
npm run dev        # dev server en http://localhost:3000 (--host 0.0.0.0)
npm run lint       # tsc --noEmit  → verificación de tipos (usar antes de dar por hecho)
npm run build      # build de producción con Vite → dist/
npm run preview    # previsualizar el build
npm run clean      # rm -rf dist server.js
```

## Verificación (DoD, ver AGENTS.md §8)
1. `npm run lint` sin errores.
2. Probar cada CTA del hero, las reservas, la cotización y el carrito → todos abren WhatsApp / modal correcto.
3. Selector de fecha del modal responde a clic/tacto.
4. Radio reproduce y cambia de canal.
5. Probar en móvil real antes de la demo.

## Deploy
- Objetivo del brief: URL pública. La app es estática (SPA Vite) → sirve `dist/` en cualquier host estático (Vercel/Netlify/Cloud Run).
- `GEMINI_API_KEY`/`APP_URL` en `.env.example` son herencia de AI Studio; **no se usan** en el código actual. No bloquean el deploy.

## Entorno
- No modificar `hmr`/`watch` en `vite.config.ts` (rompe AI Studio). Ver `gotchas/`.
- `DISABLE_HMR=true` desactiva HMR y file-watching (para ediciones de agente sin parpadeo).
