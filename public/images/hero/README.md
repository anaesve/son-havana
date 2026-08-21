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

Coloca aquí las imágenes:
- son-kmaron.webp
- son-kmaron-mobile.webp (móvil ≤767px)
- LuismiYanes.webp / LuismiYanes-tablet.webp / LuismiYanes-mobile.webp (slide 1, vie 21 ago)
- Tromboricua.webp / Tromboricua-tablet.webp / Tromboricua-mobile.webp (slide 2, sáb 22 ago)
- LaCentral.webp
- LaCentral-mobile.webp (móvil ≤767px)
- LaDimension.webp
- LaDimension-mobile.webp (móvil ≤767px, slide 4)
- LaDimension-jueves.webp / -tablet.webp / -mobile.webp (slide 1, jueves 13 ago)

IMPORTANTE: los archivos *-mobile son ARTE DISTINTO (texto más pequeño para
sobrevivir el recorte de object-cover en vertical), NO versiones reducidas del
cartel de desktop. Nunca regenerarlos desde el arte de desktop: los títulos
quedan cortados. Excepción: LaCentral, cuya composición compacta sí tolera el recorte.

Exportar en WebP SIN PÉRDIDA (`cwebp -lossless -z 9`) y a la resolución de
origen: los carteles no se recomprimen ni se reescalan hacia abajo. Decisión de
Ana (14 ago 2026): la nitidez del cartel manda sobre el peso del archivo.
Si un cartel llega ya en WebP sin pérdida, copiarlo tal cual — no re-exportar.
