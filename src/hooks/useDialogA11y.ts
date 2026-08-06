import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function lockDocumentScroll() {
  const scrollY = window.scrollY;
  const { style: htmlStyle } = document.documentElement;
  const { style: bodyStyle } = document.body;
  const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;

  const prev = {
    scrollY,
    htmlOverflow: htmlStyle.overflow,
    bodyOverflow: bodyStyle.overflow,
    bodyPosition: bodyStyle.position,
    bodyTop: bodyStyle.top,
    bodyWidth: bodyStyle.width,
    bodyPaddingRight: bodyStyle.paddingRight,
  };

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
    window.scrollTo(0, prev.scrollY);
  };
}

/**
 * Escape, focus trap, scroll-lock y restauración de foco para overlays.
 */
export function useDialogA11y(
  isOpen: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!isOpen) return;

    const unlockScroll = lockDocumentScroll();
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = (): HTMLElement[] => {
      const root = containerRef.current;
      if (!root) return [];
      const result: HTMLElement[] = [];
      const nodes = root.querySelectorAll(FOCUSABLE);
      nodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.offsetParent !== null || node === document.activeElement) {
          result.push(node);
        }
      });
      return result;
    };

    const raf = requestAnimationFrame(() => {
      const list = getFocusable();
      const target = list[0] ?? containerRef.current;
      target?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const list = getFocusable();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      unlockScroll();
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose, containerRef]);
}
