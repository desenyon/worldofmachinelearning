'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';

// Use useLayoutEffect on client to prevent flash
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function ConditionalBackground() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useIsomorphicLayoutEffect(() => {
    const bgColor = isHomepage ? '#0a0e1a' : '#f8f9fa';
    
    // Set background color immediately on mount and route change
    document.documentElement.style.backgroundColor = bgColor;
    document.body.style.backgroundColor = bgColor;
    
    // Also set it as a CSS variable for other elements to use
    document.documentElement.style.setProperty('--page-bg', bgColor);
  }, [isHomepage]);

  return null;
}
