#!/usr/bin/env python3
"""
Busca fotos candidatas en Wikimedia Commons para los huecos que dejaron los
hotlinks caducados. Commons se prefiere a Unsplash porque no borra archivos:
las cinco fotos que se perdieron eran 404/403 de Unsplash y Google.

Uso: python3 scripts/buscar-fotos-commons.py "salsa dancing" [n]
"""

import json
import subprocess
import sys
import urllib.parse

UA = "SonHavanaBot/1.0 (proyecto academico; contacto local)"
API = "https://commons.wikimedia.org/w/api.php"


def api(params):
    url = API + "?" + urllib.parse.urlencode({**params, "format": "json"})
    r = subprocess.run(
        ["curl", "-sL", "-A", UA, "--max-time", "30", url],
        capture_output=True, text=True,
    )
    return json.loads(r.stdout)


def buscar(termino, limite=12):
    d = api({
        "action": "query",
        "generator": "search",
        "gsrsearch": f"{termino} filetype:bitmap",
        "gsrnamespace": 6,
        "gsrlimit": limite,
        "prop": "imageinfo",
        "iiprop": "url|size|extmetadata",
        "iiurlwidth": 1200,
    })
    paginas = d.get("query", {}).get("pages", {})
    salida = []
    for p in paginas.values():
        ii = (p.get("imageinfo") or [{}])[0]
        if not ii.get("url"):
            continue
        ancho, alto = ii.get("width", 0), ii.get("height", 0)
        # Descarta miniaturas y verticales extremas: el hero es apaisado.
        if ancho < 900:
            continue
        meta = ii.get("extmetadata", {})
        salida.append({
            "titulo": p["title"].replace("File:", ""),
            "url": ii.get("thumburl") or ii["url"],
            "dim": f"{ancho}x{alto}",
            "ratio": round(ancho / alto, 2) if alto else 0,
            "licencia": meta.get("LicenseShortName", {}).get("value", "?"),
        })
    return sorted(salida, key=lambda x: -x["ratio"])


if __name__ == "__main__":
    termino = sys.argv[1] if len(sys.argv) > 1 else "salsa dance"
    limite = int(sys.argv[2]) if len(sys.argv) > 2 else 12
    for r in buscar(termino, limite):
        print(f"{r['ratio']:>5}  {r['dim']:>12}  {r['licencia']:<18} {r['titulo'][:60]}")
        print(f"       {r['url']}")
