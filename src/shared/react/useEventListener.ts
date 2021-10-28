import { useRef, useEffect } from 'react';

export default function useEventListener<
  TName extends keyof (HTMLElementEventMap & DocumentEventMap & WindowEventMap),
  TEvent = (HTMLElementEventMap & DocumentEventMap & WindowEventMap)[TName],
>(
  eventName: TName,
  handler: (event: TEvent) => void,
  element: HTMLElement | Document | Window = document,
  options?: boolean | AddEventListenerOptions,
): void {
  const savedHandler = useRef<(event: TEvent) => void>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;

    if (!isSupported) {
      return;
    }

    const eventListener = (event: TEvent): void => savedHandler.current?.(event);

    element.addEventListener(eventName, eventListener as () => void, options);

    return () => {
      element.removeEventListener(eventName, eventListener as () => void, options);
    };
  }, [eventName, element, options]);
}
