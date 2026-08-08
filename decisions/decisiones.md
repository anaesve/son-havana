# Decisiones (ADR compacto)

Registro de decisiones no triviales. Formato: fecha · decisión · razón · estado. Añadir arriba (más reciente primero).

---

### 2026-08-08 · Merch sin precio: "MUY PRONTO"
- **Decisión:** en las cards de Merch mostrar **MUY PRONTO** en lugar de `$XX.00 USD`.
- **Razón:** pedido de Ana; merch aún no a la venta con precio público.
- **Estado:** vigente en `Merch.tsx` (UI). Los `price` numéricos del array quedan por si se reactiva el carrito.

### 2026-08-07 · Canal Cuba: Radio Habana Son Cuba (Zeno)
- **Decisión:** sustituir Radio Progreso (`icecast.teveo.cu/XjfW7qWN`) por **Radio Habana Son Cuba** (`https://stream.zeno.fm/2ieszeso9istv`).
- **Razón:** Icecast devolvía 400/404 HTML; Zeno verificado en browser + bytes `audio/mpeg` (mp3). Alternativas OK descartadas por elección de Ana: OFA (`fzn68npxd5zuv`), SalSon (`qasz5cect7zuv`).
- **Estado:** vigente en `RadioPlayer` PLAYLIST id `"4"`; deploy `5501367` en producción.

### 2026-07-27 (noche++) · Hero ilustrado + scrim radial + radio viva + footer redes
- **Decisión:** (1) Slides Lavoe / Niche / Programación del hero pasan a ilustraciones de cartelismo aportadas por Ana. (2) Scrim de esos 3 slides = radial centrado (texto legible, esquinas claras); se elimina el marco blanco. (3) Sustituir streams muertos (Zeno 401, laut.fm 404) por URLs verificadas. (4) Footer con URLs reales de FB/YT/Spotify/WA e iconos de marca donde Lucide no alcanza.
- **Razón:** legibilidad sobre ilustraciones densas; conversión y presencia social correctas; radio usable.
- **Estado:** vigente. Detalle visual en `decisions/design.md`; streams en `gotchas/gotchas.md`.

### 2026-07-27 (noche++) · Acento naranja Son Havana (ex-bermellón)
- **Decisión:** reemplazar el bermellón `#ff3b30` por el naranja papaya **`#ff6b35`** (el acento histórico de Son Havana) en `primary-container` / `coral`; hover/enlaces en `#ff8a5b`; terracota de sección clara a `#9a3412`.
- **Razón:** Ana pidió naranja en vez de rojo. Criterio: contraste WCAG AA (naranja vs azul 5.77:1, mejor que el bermellón 4.64:1) + identidad de marca caribeña/calor, no el naranja genérico de la skill Anthropic (`#d97757`).
- **Estado:** vigente. Audit de contraste: 0 fallos en 129 nodos.

### 2026-07-27 (noche+) · Fotos originales + texturas atmosféricas caribeñas
- **Decisión:** conservar la paleta "Serigrafía ICAIC", pero **restaurar las fotografías originales** (Hero, artistas, merch, galería) y sustituir las texturas de semitono/franjas por lavados suaves de mango, coral y verde agua.
- **Razón:** Ana pidió dejar las fotos originales; las texturas de cartel pelean con la fotografía y no se leían como caribeñas.
- **Cómo:** `scripts/restaurar-fotos-originales.py` + copia desde backup en Trash para los 5 hotlinks caducados; utilidades `fondo-*` reescritas solo con radial-gradients atmosféricos; scrim del hero vuelto a gradiente fotográfico.
- **Estado:** vigente.

### 2026-07-27 (noche) · Paleta definitiva "Serigrafía ICAIC" (paleta 1) + auditoría de contraste por script
- **Decisión:** adoptar la primera dirección propuesta, **"Serigrafía ICAIC"**: azul tinta `#0e1b4d`, bermellón `#ff3b30`, mostaza `#ffb703`, verde agua `#06d6a0`, papel crudo `#fdf0d5`, terracota `#7b2d26`. Se probaron las tres direcciones en la página real antes de decidir.
- **Razón:** Ana pidió verla después de la 2 y la 3. Es la más fiel al referente (cartel de cine cubano de los 60) y la que mejor rinde: al ser una paleta de seis tintas con un azul base muy oscuro y un papel muy claro, los extremos dan 14.6:1 y sobra margen para casi todo.
- **La refactorización anterior se validó, pero solo a medias.** El cambio de paleta en sí fue editar el `@theme` y nada más — eso funcionó. Pero aparecieron **~25 clases de color por defecto de Tailwind** (`amber-400/500`, `rose-*`, `pink-500`, `emerald-500`) y un `rgba()` hardcodeado dentro de una `shadow-[...]`, que habían sobrevivido invisibles a los dos cambios de paleta anteriores porque las tres paletas tenían un amarillo cálido parecido al ámbar. Se migraron todas a tokens. **Lección:** "las utilidades no tienen hex" no basta; hay que verificar que los *componentes* tampoco usen la escala por defecto de Tailwind.
- **Auditoría de contraste automatizada.** En vez de revisar a ojo (que fue lo que dejó pasar errores en las dos paletas anteriores) se escribió un script que recorre el DOM, compone los alfas contra el fondo real heredado y calcula el ratio WCAG. Encontró 20 fallos reales, incluido uno que llevaba ahí desde el principio y no era de paleta: **"Pedir por WhatsApp", texto blanco sobre verde `#25D366`, 1.98:1**. Resultado final: 0 fallos sobre 129 nodos (página + los tres flujos), en desktop y a ancho móvil.
- **Consecuencia obligada del bermellón:** es una tinta de luminancia *media* (contra azul da 4.64:1, contra papel 3.14:1). Pasa AA solo con texto oscuro y con poco margen. Por eso: (a) los enlaces pequeños sobre azul usan `primary` (bermellón claro, 6.0:1) y no `primary-container`; (b) las tarjetas sobre `fondo-acento` **aclaran** el fondo (`bg-surface/20`) en vez de oscurecerlo, porque oscurecerlo hundía el texto azul a 3.9:1.
- **Hallazgo cromático:** la tinta de sobreimpresión no se puede elegir por gusto. Rojo sobre azul mezcla a violeta (316°) y un cálido a baja opacidad pasa por gris neutro. `fondo-profundo` terminó en mostaza al 32% (ocre, 39°) tras descartar bermellón y terracota.
- **Estado:** vigente. Pendiente: renombrar las utilidades `neon-*`/`glow-*` (los nombres ya no describen lo que hacen) y sacar los `red-*` que quedan en estados de error/borrado.

### 2026-07-27 (tarde) · Paleta "Noche de Malecón" + utilidades independientes de la paleta
- **Decisión:** cambiar de "Mediodía Caribeño" (fondo claro) a **"Noche de Malecón"**: base azul medianoche `#0a1128` con fucsia `#ff5d8f`, aguamarina `#00c2a8`, amarillo sol `#ffc857`, rojo son `#c1121f` y blanco lunar `#f2f7ff`. Se mantiene todo el copy, logo, flujo, tipografía y estructura.
- **Razón:** Ana pidió probar la tercera propuesta. Además encaja mejor con el producto: es un club de noche, y una base oscura deja las tintas brillantes trabajar como acentos, que es el uso serigráfico real.
- **Cambio estructural que se aprovechó para hacer:** las utilidades de `index.css` ya no tienen ningún hex; derivan de los tokens con `color-mix()`. Y los fondos de sección se renombraron por **rol** (`fondo-papel`, `fondo-tinta`, `fondo-profundo`, `fondo-acento`) en vez de por color (`papel-arena`, `tinta-turquesa`, `tinta-azul`). Resultado: **un futuro cambio de paleta se hace editando solo el bloque `@theme`**, sin tocar componentes. Este cambio se hizo justamente porque era el segundo cambio de paleta en una sesión.
- **Consecuencia obligada:** en esta paleta el color de CTA (fucsia) es una tinta *clara*, así que **Reservas** (que usa `bg-primary-container` como fondo de sección completa) tuvo que invertir su tipografía a azul medianoche. No es un parche: tinta brillante con tipografía casi negra es exactamente el registro del cartelismo, y es la sección que ahora ancla visualmente la página.
- **Correcciones de contraste aplicadas:** se eliminaron 5 combinaciones de texto blanco sobre tinta clara (fucsia 2.7:1, aguamarina 2.1:1) en `Contrataciones`, `Header`, `QuoteModal` y `RadioPlayer`; y en la sección clara los acentos de texto pasaron de fucsia (2.62:1 con el papel, falla incluso para texto grande) a `secondary-container` rojo (5.6:1).
- **Estado:** reemplazada por "Serigrafía ICAIC". Lo que sí quedó vigente y fue su aporte real: las utilidades derivadas con `color-mix()` y los fondos de sección nombrados por rol.

### 2026-07-27 · Rediseño visual a cartelismo cubano
- **Decisión:** sustituir la estética "club oscuro + neón naranja + fotos de stock" por serigrafía cubana (ICAIC/OSPAAAL), con 16 ilustraciones generadas como serie. Se conservaron intactos copy, logo, flujo de WhatsApp, tipografía y secciones.
- **Razón:** la versión anterior no tenía identidad cubana; se leía como cualquier club nocturno genérico.
- **Cómo se contuvo el costo:** en vez de invertir toda la página a fondo claro (~194 clases dependientes del tema oscuro en 13 archivos), se alternan tintas planas por sección y solo **Merch** quedó en papel claro. Así el refactor de texto se limitó a un componente.
- **Estado:** vigente (la paleta concreta la reemplazó la entrada de arriba).

### 2026-07-22 · Instaurar memoria persistente (AGENTS.md + carpetas)
- **Decisión:** crear `AGENTS.md` + `decisions/ state/ skills/ gotchas/ logs/` para gestión de contexto/memoria entre sesiones.
- **Razón:** el proyecto perdía contexto crítico entre chats (tokens caros, re-descubrir stack/reglas cada vez). Se centraliza en archivos.
- **Estado:** vigente.

### (heredada del brief) · Conversión vía WhatsApp, sin backend
- **Decisión:** toda reserva/cotización/compra se cierra por deep-link `wa.me/573105156550` con mensaje pre-llenado; el carrito no procesa pagos.
- **Razón:** negocio real opera por WhatsApp; demo debe funcionar de punta a punta sin infra. `express`/`dotenv`/`@google/genai` quedaron como dependencias muertas de la plantilla AI Studio.
- **Estado:** vigente. (Posible limpieza futura: quitar deps no usadas.)

### (heredada) · Estado global en App.tsx por props, sin librería
- **Decisión:** carrito y control de modales viven en `App.tsx`, se pasan por props.
- **Razón:** app pequeña de una pantalla; Context/Redux sería sobre-ingeniería.
- **Estado:** vigente. Reevaluar solo si crece el árbol de componentes.

### (heredada) · Tailwind v4 con `@theme`, sin config JS
- **Decisión:** tokens y fuentes en `@theme` de `src/index.css`.
- **Razón:** patrón nativo de Tailwind v4 (`@tailwindcss/vite`); menos superficie de config.
- **Estado:** vigente.

### (heredada) · Imágenes locales con fallback remoto
- **Decisión:** `localPath` + `demoUrl` con `onError`.
- **Razón:** la demo funciona aunque falten los assets locales; el cliente puede ir subiendo imágenes reales sin romper nada.
- **Estado:** vigente.

### (heredada) · Datos como arrays const en cada componente
- **Decisión:** productos, slides, artistas, canales de radio y galería viven como `const` dentro de su componente.
- **Razón:** simplicidad; no hay CMS ni volumen que justifique una capa de datos.
- **Estado:** vigente. Si el contenido crece, considerar `src/data/`.
