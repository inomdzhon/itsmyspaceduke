import * as React from 'react';

export default function useScrollTo(): (event: React.MouseEvent<HTMLAnchorElement>) => void {
  return React.useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    if (href) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
}
