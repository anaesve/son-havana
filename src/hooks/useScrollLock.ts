import { useEffect } from "react";

/**
 * Bloquea el scroll del documento (html + body) y restaura la posición al cerrar.
 * Evita el “salto” de fondo en móvil/tablet cuando hay overlay o menú abierto.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const { style: htmlStyle } = document.documentElement;
    const { style: bodyStyle } = document.body;

    const prev = {
      htmlOverflow: htmlStyle.overflow,
      bodyOverflow: bodyStyle.overflow,
      bodyPosition: bodyStyle.position,
      bodyTop: bodyStyle.top,
      bodyWidth: bodyStyle.width,
      bodyPaddingRight: bodyStyle.paddingRight,
    };

    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;

    htmlStyle.overflow = "hidden";
    bodyStyle.overflow = "hidden";
    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";
    if (scrollbarGap > 0) {
      bodyStyle.paddingRight = `${scrollbarGap}px`;
    }

    return () => {
      htmlStyle.overflow = prev.htmlOverflow;
      bodyStyle.overflow = prev.bodyOverflow;
      bodyStyle.position = prev.bodyPosition;
      bodyStyle.top = prev.bodyTop;
      bodyStyle.width = prev.bodyWidth;
      bodyStyle.paddingRight = prev.bodyPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
