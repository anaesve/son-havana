# Carpeta para imágenes del Hero Slider

## Medidas por dispositivo
El slider elige el arte según el viewport (ver `resolveSlidePath` en Hero.tsx):

| Slot    | Cuándo se usa                  | Lienzo      | Proporción |
|---------|--------------------------------|-------------|------------|
| desktop | horizontal (landscape)         | 2560 × 1440 | 16:9       |
| tablet  | vertical y ancho ≥ 768px       | 1536 × 2048 | 3:4        |
| mobile  | vertical y ancho ≤ 767px       | 1080 × 2340 | 9:19.5     |

Zona segura (el resto lo tapan header, CTAs y el reproductor):
- tablet: dejar libre el 8% superior y el 21% inferior.
- mobile: dejar libre el 15% superior y el 45% inferior.

## Slides vigentes (orden mié → sáb)
- Miercoles18.webp / -tablet / -mobile (Timba Cubana, mié 18 ago)
- Jueves19.webp / -tablet / -mobile (La Sonora, jue 19 ago)
- LuismiYanes.webp / -tablet / -mobile (vie 21 ago)
- Tromboricua.webp / -tablet / -mobile (sáb 22 ago)

IMPORTANTE: los archivos *-mobile son ARTE DISTINTO (texto más pequeño para
sobrevivir el recorte de object-cover en vertical), NO versiones reducidas del
cartel de desktop. Nunca regenerarlos desde el arte de desktop: los títulos
quedan cortados.

Exportar en WebP SIN PÉRDIDA (`cwebp -lossless -z 9`) y a la resolución de
origen: los carteles no se recomprimen ni se reescalan hacia abajo. Si un cartel
llega ya en WebP sin pérdida, copiarlo tal cual — no re-exportar.
