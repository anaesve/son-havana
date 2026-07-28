# Skill: reemplazar / añadir imágenes

Patrón dual: `localPath` (asset propio) + `demoUrl` (respaldo remoto). En runtime se intenta `localPath` y si falla (`onError`) cae a `demoUrl`.

## Carpetas de assets locales
- `public/images/hero/` → `hector-lavoe.jpg`, `grupo-niche.jpg`, `programacion-semanal.jpg`, `clases-baile.jpg`
- `public/images/galeria/` → `galeria1.jpg` … `galeria6.jpg`
- `public/images/contrataciones/` → `sonk'maron.jpg`, `elsondepablo.jpg`
- Cada carpeta tiene un `README.md` con los nombres esperados.

## Para usar imágenes reales (recomendado)
1. Copia el archivo a la carpeta correcta con el **nombre exacto** que espera el `localPath` del componente.
2. No cambies código: el `localPath` ya apunta ahí; al existir el archivo, deja de usar el `demoUrl`.

## Para cambiar la ruta o añadir una imagen nueva
1. Edita el objeto en el array del componente (`SLIDES_TEMPLATE`, `IMAGES_TEMPLATE`, etc.).
2. Ajusta `localPath` (ruta bajo `/images/...`, servida desde `public/`) y `demoUrl` (URL de respaldo válida).
3. Mantén SIEMPRE ambos campos; no borres el fallback (regla dura #4).

## Notas
- URLs remotas de `lh3.googleusercontent.com` / Unsplash pueden expirar → por eso el fallback y el objetivo de migrar a locales.
- En `<img>` de hotlink usa `referrerPolicy="no-referrer"`.
- Fondos tipo "madera" usan imágenes Unsplash embebidas en utilidades CSS de `src/index.css` (`wood-*`).
