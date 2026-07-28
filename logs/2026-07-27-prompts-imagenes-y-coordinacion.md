# 2026-07-27 (noche) · Prompts de imágenes + coordinación con build paralelo

## Qué se hizo en esta sesión
- **FASE 5 entregada:** se creó `/prompts-imagenes.md` en la raíz — prompt base común (estilo cartel ICAIC + paleta) más **16 prompts en inglés**, uno por imagen, cada uno rotulado con su ruta destino en `public/images/` (hero ×4 16:9, galería ×6 4:3, contrataciones ×2 4:5, merch ×4 1:1). Los sujetos se mapearon contra los `caption`/`name` reales de los componentes; no se tocaron `localPath` ni `demoUrl`. La paleta del prompt base se tomó de los tokens `@theme` vivos (indigo `#0e1b4d`, papel `#fdf0d5`, bermellón `#ff3b30`, oxblood `#7b2d26`, salmón `#ff6f61`, mango `#ffb703`, menta `#06d6a0`, arena `#d8c9a3`).

## Coordinación (por qué no toqué el CSS)
- Durante FASES 2–4, `src/index.css` y los componentes se reescribieron **en paralelo** (otro agente ejecutando el mismo encargo, más avanzado): 3 reescrituras seguidas, terminando en "Serigrafía ICAIC" con utilidades `fondo-*`/`sombra-dura-*` derivadas por `color-mix()` y **cero clases huérfanas**.
- Decisión de Ana ante el conflicto: **"dejo el CSS, sigo con FASE 5/6"**. Así que no se tocó `index.css` ni componentes; FASE 6 (design.md, decisiones.md, logs) ya la había cubierto ese agente con una auditoría de contraste sobre el DOM real (0 fallos / 129 nodos).

## Corrección de registro (lección)
- Mi auditoría de tokens marcó **4 fallos AA** (botón success 1.89:1, badge 2.73:1, texto Reservas `/80` y `/60` sobre bermellón). **Estaban obsoletos:** los calculé contra los usos de componente que leí al **inicio**, pero el agente paralelo ya había reescrito esos componentes. Verificado contra el código actual, los 4 ya pasan (`Reservas:109` → `text-on-surface` 8.68:1; `Reservas:14/23` → sin opacidad, 4.62:1; `Contrataciones:101` → `bg-mango text-on-surface`; botones `#25D366` → `text-on-surface`).
- **Lección:** con un editor concurrente activo, un hallazgo de contraste calculado contra un `file:line` leído antes puede ser un falso positivo. Reverificar contra el código vivo **antes** de reportar.

## Estado
- `prompts-imagenes.md`: vigente, listo para generar los 16 assets.
- CSS/paleta/utilidades/memoria (design.md, decisiones.md, logs previos): propiedad del build paralelo, ya completos.
- Pendiente real (heredado): renombrar `neon-*`/`glow-*` (nombres ya no describen la función) — anotado como deuda en `design.md`.
