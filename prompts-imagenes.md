# Prompts de imágenes — Son Havana (cartelismo cubano, «Serigrafía ICAIC»)

Prompts en **inglés** para un modelo texto-a-imagen. Objetivo: regenerar las 16 imágenes
del home con **unidad de serie** en lenguaje de cartel cubano serigrafiado (ICAIC / OSPAAAL),
armonizando con la paleta viva del sitio.

## Cómo usar
1. **Antepón el `PROMPT BASE`** a cada prompt individual (define estilo + paleta = unidad de serie).
2. Genera con la **relación de aspecto** indicada por set.
3. Guarda cada salida en la **ruta destino** rotulada sobre su bloque (son las rutas `localPath`
   que ya esperan los componentes). **No** cambies esas rutas ni toques los `demoUrl` de respaldo.
4. Optimiza a JPG (~1600px de lado mayor en hero; ~800px en galería/merch/retratos) antes de copiar.

## Paleta (fuente de verdad: tokens `@theme` de `src/index.css`)
Si los tokens cambian, ajusta los hex del `PROMPT BASE` para que sigan coincidiendo con el sitio.

| Nombre | Hex | Rol en el cartel |
| --- | --- | --- |
| Tinta Noche (indigo) | `#0e1b4d` | fondo/base, sombras, tinta oscura |
| Papel Crema | `#fdf0d5` | papel, luces, negativo |
| Bermellón | `#ff3b30` | acento principal, áreas planas de rojo |
| Oxblood | `#7b2d26` | rojo profundo, sobreimpresión |
| Salmón | `#ff6f61` | medio tono cálido, pieles reducidas |
| Mango | `#ffb703` | amarillo sol, luz, detalle |
| Menta Palma | `#06d6a0` | verde caribe, acento frío |
| Arena | `#d8c9a3` | medio tono neutro de papel |

---

## PROMPT BASE (anteponer a todos)

```
Cuban silkscreen poster art in the tradition of ICAIC and OSPAAAL film posters of the 1960s–70s
(in the spirit of Eduardo Muñoz Bachs, René Azcuy, Alfredo Rostgaard, Raúl Martínez). Hand-printed
serigraph aesthetic: large areas of FLAT saturated ink, NO photographic gradients, a strictly limited
palette of 3–4 colors per composition, visible coarse halftone dots, intentional registration
misalignment (color plates slightly offset), overprint where two inks cross to make a third color,
grainy recycled-paper texture with a subtle fiber and worn edges. High-contrast cut-out silhouettes,
figures reduced to 2–3 tones, bold diagonal composition, confident negative space. Author-poster
sophistication — NOT tourist cliché, NO generic palm trees, NO vintage cars, NO flags.
Strict palette: deep indigo #0e1b4d, cream paper #fdf0d5, vermilion #ff3b30, oxblood #7b2d26,
warm salmon #ff6f61, mango yellow #ffb703, mint green #06d6a0, sand #d8c9a3.
No legible lettering or typography baked into the image (the site overlays its own Spanish text);
leave clean flat negative space where noted for that overlay.
```

---

## HERO — 4 slides · relación **16:9** horizontal
Deja espacio plano/limpio (papel crema o indigo) hacia la **parte inferior e izquierda** para el titular superpuesto.

### `/images/hero/hector-lavoe.jpg`
```
Homage to Héctor Lavoe, "El Cantante de los Cantantes". Left-facing high-contrast cut-out silhouette
of a slim 1970s salsa singer in a wide-lapel suit, head tilted back mid-song, one hand raising a
microphone. Face reduced to two tones of salmon and indigo. Behind him, a huge flat vermilion sun-disc
in coarse halftone, radiating mango-yellow rays. Bold diagonal band of oxblood across the lower third.
Empty cream negative space lower-left for the overlaid headline. Registration offset on the sun-disc.
16:9.
```

### `/images/hero/grupo-niche.jpg`
```
Homage to Grupo Niche and Colombian–Cuban salsa brava. Cut-out silhouettes of a horn section
(three trumpets and a trombone) fanned in a rising diagonal, players reduced to flat indigo and oxblood
against a mango-yellow flat field. A single vermilion clave shape and mint-green sound-arc as graphic
accents. Coarse halftone in the yellow field, visible paper grain, overprint where indigo meets
vermilion. Clean cream band along the bottom for overlaid text. 16:9.
```

### `/images/hero/programacion-semanal.jpg`
```
Weekly Caribbean rumba program. A flat, bold composition of stacked congas and a pair of maracas
as cut-out shapes in vermilion, mango and indigo, arranged as a rising diagonal rhythm. Concentric
halftone rings suggesting sound radiate from the drum heads. Cream paper ground with sand-tone
halftone texture; oxblood registration ghost offset behind the drums. Generous flat negative space
lower-left. Author-poster look, 3-color feel. 16:9.
```

### `/images/hero/clases-baile.jpg`
```
Free Wednesday salsa-casino dance class. Two dancers as high-contrast cut-out silhouettes mid-turn,
hands joined, bodies reduced to flat indigo and salmon on a large flat vermilion field. A mint-green
directional arrow and mango-yellow dotted footwork path trace the casino turn as a graphic device.
Coarse halftone, registration misalignment on the salmon plate, worn paper edges. Keep the lower band
in flat cream for overlaid text. 16:9.
```

---

## GALERÍA — 6 imágenes · relación **4:3** horizontal

### `/images/galeria/galeria1.jpg`
```
A packed dance floor at full swing. Dense crowd of dancers reduced to overlapping flat cut-out
silhouettes in indigo, oxblood and salmon, arms raised, on a vermilion-and-mango halftone field.
Sense of heat and motion through diagonal composition and overprinted layers. Serigraph grain. 4:3.
```

### `/images/galeria/galeria2.jpg`
```
A live salsa orchestra in mid-descarga. Row of musicians behind congas and brass, flat cut-out
shapes in indigo and oxblood, brass instruments as mango-yellow silhouettes catching a vermilion
stage glow. Coarse halftone spotlight, registration offset, cream negative space at the edges. 4:3.
```

### `/images/galeria/galeria3.jpg`
```
A magisterial trumpet solo. Single trumpeter as a bold cut-out silhouette leaning back, trumpet
raised, reduced to two tones of indigo and salmon. A huge flat vermilion halftone spotlight-cone
from upper corner; mango-yellow sound bursts at the bell. Deep negative space, screenprint texture. 4:3.
```

### `/images/galeria/galeria4.jpg`
```
Trombones resting on a piano between sets. Two trombones as flat mango-yellow and oxblood cut-out
shapes lying across the dark indigo curve of a grand piano lid, cream highlights. Quiet, graphic
still-life composition, coarse halftone on the flat fields, subtle registration ghost. 4:3.
```

### `/images/galeria/galeria5.jpg`
```
A brass section rehearsing. Trumpets and trombones held by cut-out silhouetted players aligned in
a tight diagonal row, reduced to indigo and salmon on a flat mango field, music-stand shapes in
vermilion. Repetition and rhythm in the composition, halftone dots, worn paper grain. 4:3.
```

### `/images/galeria/galeria6.jpg`
```
Traditional son musicians in the round. A conga player, a trumpeter and an upright bassist as flat
cut-out silhouettes forming a triangular grouping, indigo and oxblood figures on cream paper with a
vermilion clave motif and mint-green accents. Warm, rootsy, author-poster feel. Serigraph texture. 4:3.
```

---

## CONTRATACIONES — 2 retratos de orquesta · relación **4:5** vertical
Retrato-cartel de banda, con aire de afiche de concierto. Sin texto legible.

### `/images/contrataciones/sonk'maron.jpg`
```
Band poster portrait for the salsa orchestra "Son K'Marón". A tight cluster of five musician
cut-out silhouettes (singer, trumpet, trombone, conga, bass) rising in a bold vertical diagonal,
figures reduced to flat indigo and oxblood on a large flat vermilion field, brass in mango-yellow.
Coarse halftone, strong registration offset, cream negative space top and bottom. Heroic,
high-energy author-poster composition. 4:5.
```

### `/images/contrataciones/elsondepablo.jpg`
```
Band poster portrait for the son orchestra "El Son de Pablo". Warmer, more traditional grouping:
a lead singer cut-out silhouette in salmon and indigo foregrounded, tres guitar and conga players
behind in oxblood, on a cream-and-mango halftone ground with a mint-green sound-arc. Flat inks,
overprint, worn edges. Dignified, rootsy author-poster look. 4:5.
```

---

## MERCH — 4 productos sobre fondo gráfico · relación **1:1** cuadrada
Producto **centrado** como objeto recortado sobre un campo serigráfico plano; deja el objeto nítido para recorte/ficha.

### `/images/merch/campana.jpg`
```
An engraved salsa cowbell (campana/cencerro) with its beater, shown as a clean centered product on a
flat serigraph field. The bell rendered in flat mango-yellow and indigo cut-out tones with a vermilion
overprint edge; background a single flat vermilion field with coarse halftone and a subtle registration
ring behind the object. Cream negative space margin. 1:1.
```

### `/images/merch/guiro.jpg`
```
A traditional Cuban güiro (gourd scraper) with its pua/stick, centered as a clean product on a flat
serigraph field. Güiro reduced to flat oxblood and salmon tones with mango highlights; background a flat
indigo field with cream halftone dots and a soft registration offset. Author-poster product shot. 1:1.
```

### `/images/merch/maracas.jpg`
```
A pair of professional maracas crossed at the handles, centered as a clean product on a flat serigraph
field. Maracas in flat mango-yellow and vermilion cut-out tones, handles in indigo; background a flat
cream field with sand-tone halftone and a mint-green registration ghost. Crisp graphic silhouette. 1:1.
```

### `/images/merch/tote.jpg`
```
A canvas tote bag ("SH" monogram implied only as an abstract flat mark, not legible text) shown flat
and centered as a product on a serigraph field. Tote in flat cream and indigo with a bold vermilion
printed shape; background a flat mango field with coarse halftone and registration offset. Clean edges
for cut-out. 1:1.
```

---

## Nota de consistencia
Todas las piezas comparten: **inks planos**, halftone grueso, **error de registro** intencional,
grano de papel y la misma paleta de 8 tintas. Varía la **tinta dominante por set** para dar ritmo
sin romper la serie: hero → vermilion/mango; galería → indigo/oxblood; contrataciones → vermilion;
merch → un campo plano por producto. Ninguna imagen lleva texto legible: el copy en español lo pone la app.
