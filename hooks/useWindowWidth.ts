import { useState, useEffect } from 'react';

/**
 * Custom hook to track window width with proper handling for mobile vs desktop
 * On mobile, uses clientWidth to exclude scrollbar for accurate centering
 * On desktop, uses innerWidth for full viewport width
 */
export function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      // On mobile, use clientWidth to exclude scrollbar for accurate centering
      // On desktop, use innerWidth for full viewport width
      const width = window.innerWidth <= 768 
        ? (document.documentElement.clientWidth || window.innerWidth)
        : window.innerWidth;
      setWindowWidth(width);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return windowWidth;
}

