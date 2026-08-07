/**
 * Bloqueo de scroll compartido (modales, menú, carrito).
 * Referencia contada para overlays anidados. Restaura posición sin animación.
 */

let lockCount = 0;
let savedScrollY = 0;

type SavedStyles = {
  htmlOverflow: string;
  bodyOverflow: string;
  bodyPosition: string;
  bodyTop: string;
  bodyWidth: string;
  bodyPaddingRight: string;
};

let savedStyles: SavedStyles | null = null;

function restoreScrollPosition(y: number) {
  const html = document.documentElement;
  html.style.scrollBehavior = "auto";
  window.scrollTo({ top: y, left: 0, behavior: "instant" });
}

/** Bloquea el scroll y devuelve función de desbloqueo. */
export function lockScroll(): () => void {
  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;

    savedStyles = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };

    const scrollbarGap = window.innerWidth - html.clientWidth;

    html.classList.add("scroll-locked");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.width = "100%";
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }
  }

  lockCount += 1;

  return () => {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount !== 0 || !savedStyles) return;

    const html = document.documentElement;
    const body = document.body;
    const y = savedScrollY;
    const prev = savedStyles;
    savedStyles = null;

    body.style.position = prev.bodyPosition;
    body.style.top = prev.bodyTop;
    body.style.width = prev.bodyWidth;
    body.style.paddingRight = prev.bodyPaddingRight;
    html.style.overflow = prev.htmlOverflow;
    body.style.overflow = prev.bodyOverflow;
    html.classList.remove("scroll-locked");

    restoreScrollPosition(y);
  };
}
