import { useLayoutEffect } from "react";
import { lockScroll } from "./scrollLock";

/**
 * Bloquea el scroll del documento mientras `locked` es true.
 */
export function useScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;
    return lockScroll();
  }, [locked]);
}
