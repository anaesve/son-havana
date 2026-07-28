# Skill: prompt de rediseño visual (cartelismo cubano)

Prompt listo para pegar en Claude (chat/artifacts o Claude Code). Objetivo: renovar SOLO la capa visual del home (paleta, imágenes, texturas, fondos) conservando información, logo, flujo, tipografía y secciones.

Uso: copiar el bloque completo de abajo. Si se usa en Claude Code dentro del repo, se puede omitir el bloque `<sistema_actual>` porque puede leer `src/index.css` directamente.

---

```
Eres director de arte y diseñador de sistemas visuales, especializado en cartelismo cubano (ICAIC / OSPAAAL) y en su traducción a interfaces web modernas. Tu tarea: rediseñar la capa visual del home de "Son Havana" para que se sienta profundamente caribeño y cubano-cartelista, SIN alterar su contenido, estructura ni tipografía.

<contexto_producto>
Son Havana es un club de salsa en Medellín, Colombia. Su web es una landing de una sola pantalla (scroll único) construida en React 19 + TypeScript + Vite 6 + Tailwind CSS v4. Toda conversión ocurre por WhatsApp (reservar mesa, reservar cumpleaños, contratar orquesta, comprar merch). Copy en español caribeño.

Secciones en orden: Header → Hero (slider de 4 slides) → Contrataciones → Merch → Galería → Reservas → Footer. Overlay persistente: RadioPlayer fijo abajo. Modales: reserva, cotización, carrito.
</contexto_producto>

<invariantes_no_tocar>
Estos elementos NO se modifican. Si tu propuesta los toca, está mal:
1. Toda la información y el copy en español (títulos, descripciones, precios, mensajes de WhatsApp).
2. El logo actual de Son Havana (header y footer). Se conserva tal cual.
3. El flujo de usuario y todos los CTAs: cada acción sigue terminando en WhatsApp al +57 310 515 6550.
4. La tipografía: Anybody (titulares en MAYÚSCULAS, font-black), Geist (cuerpo), Archivo Narrow (puntual). No proponer fuentes nuevas.
5. El orden, cantidad y jerarquía de las secciones, y el RadioPlayer fijo al fondo.
6. La estructura de componentes y el comportamiento de los modales.
</invariantes_no_tocar>

<sistema_actual>
Tokens de color actuales, definidos en el bloque @theme de src/index.css (Tailwind v4, sin tailwind.config.js):

--color-primary-container: #ff6b35  (naranja marca, CTAs y neón)
--color-on-primary-container: #5f1900
--color-primary: #ab3500            (naranja oscuro, gradientes/hover)
--color-on-surface: #261814         (fondo oscuro base, café casi negro)
--color-surface: #fff8f6            (claro)
--color-surface-variant: #f7ddd5    (texto secundario, se usa con /60 /70)
--color-secondary-container: #da3433 (rojo)
--color-on-secondary-container: #fffbff
--color-success: #4CAF50
Amber de Tailwind para "en vivo" y dorados.

Utilidades visuales actuales en @layer utilities:
- neon-orange / neon-gold: text-shadow de neón para títulos.
- glow-orange / glow-gold: box-shadow de resplandor.
- wood-pattern / wood-mahogany / wood-caribbean / wood-slats / wood-light: fondos oscuros tipo madera, algunos con foto de Unsplash embebida. Uno por sección.
- vinyl-grooves: gradiente radial que simula surcos de vinilo (RadioPlayer).

Imágenes actuales: fotografías genéricas de stock (Unsplash) y URLs de Google, sin unidad visual. Cada imagen usa el patrón localPath (archivo propio en /public/images/...) con fallback a demoUrl remoto vía onError.

Diagnóstico: el resultado actual es un "club nocturno oscuro genérico" — madera oscura, neón naranja, fotos de stock. Le falta identidad cubana y calor caribeño.
</sistema_actual>

<direccion_creativa>
Objetivo: que la página se lea como un cartel cubano de los años 60-70 traducido a web, no como un club oscuro con neón.

Lenguaje del cartelismo cubano a aplicar:
- Color plano y saturado, sin degradados fotográficos. Áreas grandes de color puro.
- Paleta limitada por composición (3-4 colores por pieza), típica de la serigrafía.
- Sobreimpresión: colores que se superponen y generan un tercer color donde se cruzan.
- Error de registro intencional: leve desplazamiento de capas de color, como impresión artesanal.
- Tramas de semitono (halftone) y puntos gruesos visibles.
- Siluetas y formas recortadas de alto contraste; retratos reducidos a 2-3 tonos.
- Textura de papel: grano, fibra, tinta ligeramente irregular, bordes desgastados.
- Composición audaz, diagonales, tipografía integrada como elemento gráfico.

Referentes: carteles del ICAIC y OSPAAAL; Eduardo Muñoz Bachs, René Azcuy, Alfredo Rostgaard, Raúl Martínez (pop art cubano), Antonio Pérez "Ñiko". También: rótulos pintados a mano de La Habana, carteles de son y mambo de los 50.

Caribe, no oscuridad: la paleta debe incorporar turquesa de mar, coral, mango, papaya, verde palma, amarillo sol, terracota, y un azul noche profundo como base en lugar del café negruzco actual. El calor debe venir del color, no del neón.

Riesgo a evitar: caer en cliché turístico (palmeras genéricas, carro viejo, banderas). Buscar la sofisticación gráfica del cartel de autor, no el souvenir.
</direccion_creativa>

<entregables>
Entrega estos cuatro bloques, en este orden:

1. TRES DIRECCIONES DE PALETA
   Antes de escribir código, propón 3 direcciones distintas (ej: "Serigrafía ICAIC", "Mediodía Caribeño", "Noche de Malecón"). Para cada una: concepto en 2 líneas, 6-8 colores con hex y nombre, y qué sensación produce. Indica cuál recomiendas y por qué. Detente aquí y espera confirmación antes de continuar con el resto.

2. TOKENS PARA @theme
   Ya elegida la dirección, entrega el bloque @theme completo listo para reemplazar en src/index.css, respetando los nombres de token existentes (primary-container, on-surface, surface, etc.) para no romper las clases ya usadas en los componentes. Si necesitas colores nuevos, añádelos como tokens adicionales, nunca como hex sueltos. Incluye una tabla de contraste indicando que cada par texto/fondo cumple WCAG AA (4.5:1 en texto normal, 3:1 en texto grande).

3. TEXTURAS Y FONDOS
   Reescribe las utilidades de @layer utilities para sustituir la estética "madera oscura + neón" por texturas de cartel serigrafiado: papel con grano, tramas de halftone, franjas de color plano, error de registro, sobreimpresión. Prioriza CSS puro (gradientes, repeating-linear-gradient, radial, blend modes, SVG inline en data-uri) sobre imágenes de fondo, por rendimiento. Propón nombres nuevos coherentes y di qué utilidad reemplaza a cuál. Conserva la función de vinyl-grooves en el RadioPlayer aunque cambies su estética.

4. ARTE PARA LAS IMÁGENES
   Todas las imágenes se regeneran en estilo cartelismo cubano, con unidad entre sí. Entrega un prompt de generación de imagen por cada una, en inglés, listo para un modelo texto-a-imagen, especificando estilo, paleta (usando los hex elegidos), composición y relación de aspecto. Las imágenes son:
   - Hero, 4 slides horizontales: homenaje a Héctor Lavoe; homenaje al Grupo Niche; programación semanal (rumba caribeña); clase gratis de salsa casino los miércoles.
   - Galería, 6 imágenes: pista de baile encendida; orquesta en vivo; solo de trompeta; trombones sobre el piano; sección de vientos ensayando; músicos de son con conga y bajo.
   - Contrataciones, 2 retratos de orquesta: "Son K'Marón" y "El Son de Pablo".
   - Merch, 4 productos sobre fondo gráfico: campana grabada, güiro tradicional, maracas profesionales, tote bag.
   Añade un prompt base común (estilo + paleta) que se antepone a todos, para garantizar consistencia de serie.
</entregables>

<restricciones_tecnicas>
- Tailwind CSS v4: los tokens van en el bloque @theme de src/index.css. No existe tailwind.config.js y no debe crearse.
- No introducir hex sueltos en los componentes; todo pasa por tokens.
- Mantener el patrón de imágenes localPath + demoUrl con fallback onError. No eliminar el fallback.
- Legibilidad primero: el color plano saturado no puede comprometer el contraste del texto ni de los CTAs. El botón de reservar debe seguir siendo el elemento más llamativo de su sección.
- Rendimiento: preferir CSS a imágenes pesadas para texturas; las imágenes de contenido deben poder servirse optimizadas.
- Accesibilidad: contraste AA mínimo; no depender solo del color para comunicar estado.
</restricciones_tecnicas>

<formato_salida>
Markdown con un encabezado por entregable. Los bloques de código CSS deben ser copiables y completos, sin fragmentos con puntos suspensivos. Los prompts de imagen van en bloques de código separados, uno por imagen, etiquetados con el nombre de archivo destino (por ejemplo /images/hero/hector-lavoe.jpg). Explicaciones breves: máximo 3 líneas por decisión. Sin relleno.
</formato_salida>

Recuerda el encargo: rediseñar únicamente paleta, imágenes, texturas y fondos del home de Son Havana hacia un lenguaje de cartelismo cubano y caribeño, conservando intactos la información, el logo, el flujo de conversión por WhatsApp, la tipografía (Anybody / Geist / Archivo Narrow) y las secciones. Empieza por el entregable 1: las tres direcciones de paleta, y detente ahí para que elija.
```

---

## Notas de uso
- El prompt fuerza una **parada tras el entregable 1** para que elijas paleta antes de generar código. Si prefieres todo de una, borra las dos frases que piden detenerse.
- Al aplicar el resultado: los tokens van en `@theme` de `src/index.css`; las imágenes generadas se guardan en `public/images/...` con los nombres exactos que ya esperan los componentes (ver `skills/reemplazar-imagenes.md`).
- Tras aplicar, correr `npm run lint` y el checklist QA de `state/estado-actual.md`.

---

## Variante para Claude Code (dentro del repo)

Usar esta versión cuando Claude Code corre en la carpeta del proyecto: puede leer y editar archivos, así que no hay que pegarle el sistema actual ni pedirle CSS para copiar a mano.

Requisito previo: tener el dev server corriendo (`npm run dev`) para ver los cambios en vivo.

```
Lee primero AGENTS.md, luego decisions/design.md y skills/prompt-rediseno-visual.md. Vas a ejecutar el rediseño visual descrito en ese último archivo, pero aplicándolo directamente al código en vez de entregar CSS para copiar.

Actúa como director de arte especializado en cartelismo cubano (ICAIC / OSPAAAL) traducido a interfaces web.

Encargo: rediseñar SOLO la capa visual del home de Son Havana — paleta, texturas, fondos y arte de las imágenes — hacia un lenguaje caribeño y cubano-cartelista.

Respeta los invariantes definidos en skills/prompt-rediseno-visual.md y en AGENTS.md §4. En resumen, NO se tocan: el copy en español, el logo, el flujo de conversión por WhatsApp al +57 310 515 6550, la tipografía (Anybody / Geist / Archivo Narrow), el orden y jerarquía de las secciones, el RadioPlayer fijo con sus 5 canales, ni la lógica de los componentes y modales.

Trabaja en este orden, deteniéndote donde se indica:

FASE 1 — Diagnóstico y propuesta
Lee src/index.css y recorre los componentes de src/components/ solo lo necesario para inventariar dónde se usan las utilidades wood-*, neon-*, glow-* y vinyl-grooves. Luego propón 3 direcciones de paleta (concepto en 2 líneas + 6-8 hex con nombre + sensación). Recomienda una y explica por qué. DETENTE y espera mi elección.

FASE 2 — Tokens
Reescribe el bloque @theme de src/index.css con la paleta elegida, conservando los nombres de token existentes para no romper las clases ya usadas (primary-container, on-surface, surface, surface-variant, etc.). Colores nuevos se añaden como tokens, nunca como hex sueltos en componentes. Verifica contraste WCAG AA en cada par texto/fondo y muéstrame la tabla.

FASE 3 — Texturas
Reemplaza las utilidades de @layer utilities: sustituye la estética madera-oscura-con-neón por serigrafía cubana (papel con grano, tramas de halftone, franjas de color plano, error de registro, sobreimpresión). Prioriza CSS puro (repeating-linear-gradient, radial-gradient, blend modes, SVG en data-uri) sobre imágenes de fondo. Si renombras una utilidad, actualiza TODOS sus usos en los componentes en el mismo paso; no dejes clases huérfanas. Conserva la función de vinyl-grooves en el RadioPlayer aunque cambies su aspecto.

FASE 4 — Verificación
Corre `npm run lint` y arregla lo que rompas. Revisa que el botón de reservar siga siendo el elemento más llamativo de su sección y que ningún texto pierda legibilidad. Reporta qué archivos tocaste.

FASE 5 — Arte de imágenes
Genera un archivo nuevo `prompts-imagenes.md` en la raíz con los prompts de generación (en inglés) para las 16 imágenes: 4 slides del hero, 6 de galería, 2 retratos de orquesta (Son K'Marón, El Son de Pablo) y 4 productos de merch. Incluye un prompt base común con estilo y paleta (usando los hex ya elegidos) para garantizar unidad de serie, y etiqueta cada prompt con su ruta destino en public/images/. No modifiques las rutas localPath ni elimines los fallback demoUrl.

FASE 6 — Memoria
Actualiza decisions/design.md con la paleta y utilidades nuevas, registra la decisión con fecha en decisions/decisiones.md, y deja un log en logs/.

Empieza por la FASE 1 y detente al terminarla.
```
