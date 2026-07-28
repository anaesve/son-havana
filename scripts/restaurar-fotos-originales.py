#!/usr/bin/env python3
"""
Descarga a public/images/ las fotos originales del proyecto.

Las URLs se leen del propio código (los `demoUrl` / constantes DEMO_ que
sobrevivieron al rediseño) y, para Merch, de la copia pre-rediseño que quedó
en la papelera. Bajarlas a local elimina el riesgo de hotlink: los enlaces
`aida-public` de Google expiran, que es un gotcha ya documentado.

Uso: python3 scripts/restaurar-fotos-originales.py
"""

import pathlib
import re
import subprocess
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
COMPONENTES = RAIZ / "src" / "components"
MERCH_ORIGINAL = pathlib.Path.home() / ".Trash" / "son-havana" / "src" / "components" / "Merch.tsx"


def leer(p: pathlib.Path) -> str:
    return p.read_text(encoding="utf-8")


def pares_local_demo(texto: str):
    """Extrae los pares (localPath, demoUrl) declarados de forma contigua."""
    patron = re.compile(
        r'localPath:\s*"([^"]+)"\s*,\s*\n\s*demoUrl:\s*"([^"]+)"', re.MULTILINE
    )
    return patron.findall(texto)


def construir_manifiesto():
    tareas = []

    for archivo in ("Hero.tsx", "Galeria.tsx"):
        for local, url in pares_local_demo(leer(COMPONENTES / archivo)):
            tareas.append((local, url))

    contrataciones = leer(COMPONENTES / "Contrataciones.tsx")
    for constante, destino in (
        ("DEMO_SON_KMARON", "/images/contrataciones/sonk'maron.jpg"),
        ("DEMO_EL_SON_DE_PABLO", "/images/contrataciones/elsondepablo.jpg"),
    ):
        m = re.search(rf'{constante}\s*=\s*"([^"]+)"', contrataciones)
        if not m:
            sys.exit(f"No encontré la constante {constante} en Contrataciones.tsx")
        tareas.append((destino, m.group(1)))

    if not MERCH_ORIGINAL.exists():
        sys.exit(f"No encontré el Merch original en {MERCH_ORIGINAL}")
    urls_merch = re.findall(r'image:\s*"(https://[^"]+)"', leer(MERCH_ORIGINAL))
    destinos_merch = [
        "/images/merch/campana.jpg",
        "/images/merch/guiro.jpg",
        "/images/merch/maracas.jpg",
        "/images/merch/tote.jpg",
    ]
    if len(urls_merch) != len(destinos_merch):
        sys.exit(f"Esperaba 4 imágenes de merch, encontré {len(urls_merch)}")
    tareas.extend(zip(destinos_merch, urls_merch))

    return tareas


def main():
    tareas = construir_manifiesto()
    print(f"{len(tareas)} imágenes por restaurar\n")

    fallos = []
    for local, url in tareas:
        destino = RAIZ / "public" / local.lstrip("/")
        destino.parent.mkdir(parents=True, exist_ok=True)
        tmp = destino.with_suffix(".descarga")

        r = subprocess.run(
            ["curl", "-sSL", "--max-time", "45", "-o", str(tmp), url],
            capture_output=True,
            text=True,
        )
        tam = tmp.stat().st_size if tmp.exists() else 0

        # Un hotlink caducado suele responder 200 con un cuerpo diminuto.
        if r.returncode != 0 or tam < 5000:
            fallos.append((local, url, r.stderr.strip() or f"{tam} bytes"))
            tmp.unlink(missing_ok=True)
            print(f"  FALLO   {local}  ({tam} bytes)")
            continue

        # Normaliza a JPEG: algunas fuentes sirven PNG o WebP.
        subprocess.run(
            ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "82",
             str(tmp), "--out", str(destino)],
            capture_output=True,
        )
        tmp.unlink(missing_ok=True)
        print(f"  ok      {local}  ({destino.stat().st_size // 1024} KB)")

    print()
    if fallos:
        print(f"{len(fallos)} fallaron (probablemente hotlinks caducados):")
        for local, url, motivo in fallos:
            print(f"  - {local}: {motivo}\n    {url[:100]}")
        sys.exit(1)
    print("Todas restauradas.")


if __name__ == "__main__":
    main()
