/**
 * Auditoría de contraste WCAG AA para Son Havana.
 * Uso: pegar en la consola del navegador con el sitio abierto, o correr vía
 * Chrome DevTools MCP (`evaluate_script`). Ver skills/auditar-contraste.md.
 *
 * Devuelve { totalFallos, pagina, modalReserva, modalCotizacion, carrito }.
 * La meta es totalFallos: 0.
 */
(() => {
  const gamma = (x) =>
    x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;

  // Tailwind v4 serializa los colores como oklab(): hay que convertirlos o
  // los ratios salen todos en 1.0 y tapan los fallos reales.
  const oklabToRgb = (L, a, b) => {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;
    const rgb = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
    return rgb.map((v) =>
      Math.max(0, Math.min(255, Math.round(gamma(Math.max(0, Math.min(1, v))) * 255)))
    );
  };

  const parse = (str) => {
    if (!str || str === "transparent" || str === "none") return null;
    const nums = str.match(/-?[\d.]+/g);
    if (!nums) return null;
    const v = nums.map(Number);
    const alpha = v[3] !== undefined ? v[3] : 1;
    if (str.startsWith("oklab")) return [...oklabToRgb(v[0], v[1], v[2]), alpha];
    if (str.startsWith("color(")) return [v[0] * 255, v[1] * 255, v[2] * 255, alpha];
    if (str.startsWith("rgb")) return [v[0], v[1], v[2], alpha];
    return null;
  };

  const toLinear = (c) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const luminance = ([r, g, b]) =>
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  const composite = (fg, bg) => {
    const a = fg[3];
    return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a));
  };

  // Sube por los ancestros componiendo fondos translúcidos. Solo aborta con
  // url(): los gradientes de las utilidades fondo-* no deben cortar el
  // recorrido o se saltaría las cuatro secciones principales.
  const resolveBackground = (el) => {
    let node = el;
    const stack = [];
    while (node && node.nodeType === 1) {
      const cs = getComputedStyle(node);
      if (cs.backgroundImage && cs.backgroundImage.includes("url(")) return null;
      const c = parse(cs.backgroundColor);
      if (c && c[3] > 0) {
        stack.push(c);
        if (c[3] >= 0.999) break;
      }
      node = node.parentElement;
    }
    let base = [14, 27, 77]; // on-surface: el fondo raíz de la app
    for (let i = stack.length - 1; i >= 0; i--) base = composite(stack[i], base);
    return base;
  };

  const scan = (root) => {
    const fallos = [];
    let nodos = 0;
    const sel = "a,button,p,span,h1,h2,h3,h4,label,div,strong,input,select,textarea";
    root.querySelectorAll(sel).forEach((el) => {
      const texto = Array.from(el.childNodes)
        .filter((n) => n.nodeType === 3)
        .map((n) => n.textContent.trim())
        .join(" ")
        .trim();
      if (!texto || texto.length < 2) return;

      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity < 0.15) return;
      const box = el.getBoundingClientRect();
      if (box.width < 2 || box.height < 2) return;

      const fg = parse(cs.color);
      if (!fg) return;
      const bg = resolveBackground(el);
      if (!bg) return;

      nodos++;
      const lf = luminance(composite(fg, bg));
      const lb = luminance(bg);
      const ratio = (Math.max(lf, lb) + 0.05) / (Math.min(lf, lb) + 0.05);

      const px = parseFloat(cs.fontSize);
      const bold = +cs.fontWeight >= 700;
      const need = px >= 24 || (bold && px >= 18.66) ? 3 : 4.5;
      if (ratio < need) {
        fallos.push({ t: texto.slice(0, 32), r: +ratio.toFixed(2), need, px: Math.round(px) });
      }
    });
    return { nodos, fallos: fallos.sort((a, b) => a.r - b.r) };
  };

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const clickPorTexto = (re) => {
    const el = Array.from(document.querySelectorAll("button,a")).find((x) =>
      re.test(x.textContent)
    );
    if (el) el.click();
    return !!el;
  };
  const cerrarModal = () =>
    document
      .querySelector("form")
      ?.closest("div[class*=rounded]")
      ?.parentElement?.querySelector("button")
      ?.click();
  const cajaModal = () => document.querySelector("form")?.closest("div[class*=rounded]");

  return (async () => {
    const rep = { pagina: scan(document.body) };

    clickPorTexto(/RESERVAR MESA/i);
    await wait(700);
    if (cajaModal()) rep.modalReserva = scan(cajaModal());
    cerrarModal();
    await wait(500);

    clickPorTexto(/cotiza/i);
    await wait(700);
    if (cajaModal()) rep.modalCotizacion = scan(cajaModal());
    cerrarModal();
    await wait(500);

    clickPorTexto(/añadir|agregar/i);
    await wait(400);
    document.querySelectorAll("header button")[1]?.click();
    await wait(700);
    const drawer = Array.from(document.querySelectorAll("div")).find((d) =>
      /carrito/i.test(d.querySelector("h2,h3")?.textContent || "")
    );
    if (drawer) rep.carrito = scan(drawer);

    const totalFallos = Object.values(rep).reduce((a, v) => a + v.fallos.length, 0);
    return { totalFallos, ...rep };
  })();
})();
