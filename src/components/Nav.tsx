'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/learn', label: 'Learn' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/device', label: 'Device' },
  { href: '/projects', label: 'Projects' },
  { href: '/redeem', label: 'Redeem' },
  { href: '/admin/review', label: 'Admin' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[--color-muted] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[--color-red] text-sm font-black text-white">
            ML
          </span>
          <span className="font-semibold text-slate-900">WorldOfML v2.0</span>
        </Link>

        <nav className="hidden gap-1 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[--color-red] text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="https://hackclub.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-[--color-red] px-2.5 py-1 text-xs font-semibold text-[--color-red] hover:bg-[--color-red] hover:text-white"
        >
          Hack Club
        </Link>
      </div>
    </header>
  );
}
