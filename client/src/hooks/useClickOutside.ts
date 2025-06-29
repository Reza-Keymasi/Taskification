import { useEffect, type RefObject } from "react";

type EventTypes = "mousedown" | "click";

export function useClickOutside(
  refs: RefObject<HTMLElement | null>[],
  onClickOutside: () => void,
  eventType: EventTypes = "mousedown"
) {
  function handleClickOutside(event: globalThis.MouseEvent) {
    const target = event.target as Node;

    refs.every((ref) => {
      if (ref.current && !ref.current.contains(target)) {
        onClickOutside();
      }
    });
  }

  useEffect(() => {
    document.addEventListener(eventType, handleClickOutside);

    return () => removeEventListener(eventType, handleClickOutside);
  }, []);
}
