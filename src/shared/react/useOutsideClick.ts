// [libs]
import * as React from 'react';

const matchElem = (el: Element, selectors: string[]): boolean => {
  const matchSelector =
    el.matches ||
    // @ts-expect-error
    el.matchesSelector ||
    // @ts-expect-error
    el.msMatchesSelector ||
    // @ts-expect-error
    el.mozMatchesSelector ||
    el.webkitMatchesSelector ||
    // @ts-expect-error
    el.oMatchesSelector;

  for (const selector of selectors) {
    if (matchSelector.call(el, selector)) {
      return true;
    }
  }
  return false;
};

export const useOutsideClick = (
  ref: HTMLElement | null,
  callback: () => void,
  excludeSelectors: string[] = [],
): void => {
  const handleCallback = React.useCallback(
    (event: MouseEvent): void => {
      const el = event.target;
      if (!ref || ref.contains(el as Node)) {
        return;
      }
      if (el instanceof Element && !matchElem(el, excludeSelectors)) {
        callback();
      }
    },
    [ref, callback, excludeSelectors],
  );

  React.useEffect(() => {
    if (ref) {
      document.addEventListener('click', handleCallback, false);
    }
    return () => document.removeEventListener('click', handleCallback, false);
  }, [ref, handleCallback]);
};
