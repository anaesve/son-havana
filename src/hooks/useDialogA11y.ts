import { useLayoutEffect, type RefObject } from "react";
import { lockScroll } from "./scrollLock";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Escape, focus trap, scroll-lock y restauración de foco para overlays.
 * El scroll se restaura en el mismo punto, sin animación ni salto al inicio.
 */
export function useDialogA11y(
  isOpen: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement | null>
) {
  useLayoutEffect(() => {
    if (!isOpen) return;

    const unlockScroll = lockScroll();
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
      target?.focus({ preventScroll: true });
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
        last.focus({ preventScroll: true });
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      requestAnimationFrame(() => {
        previouslyFocused?.focus?.({ preventScroll: true });
      });
    };
  }, [isOpen, onClose, containerRef]);
}
