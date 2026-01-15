'use client';

import { usePathname } from 'next/navigation';
import Nav from '@/components/Nav';

export default function ConditionalNav() {
  const pathname = usePathname();
  
  // Hide nav on homepage - it has its own immersive design
  if (pathname === '/') {
    return null;
  }
  
  return <Nav />;
}
