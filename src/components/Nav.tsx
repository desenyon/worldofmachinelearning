'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useXP } from '@/context/XPContext';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/learn', label: 'Learn' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/submit', label: 'Submit' },
  { href: '/store', label: 'Store' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  const pathname = usePathname();
  const { totalXP } = useXP();

  return (
    <nav
      className="sticky top-0 z-50 bg-white border-b border-gray-200"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="World of ML Home"
          >
            <div className="relative">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Hack Club inspired logo mark */}
                <rect
                  x="2"
                  y="2"
                  width="24"
                  height="24"
                  rx="4"
                  fill="#ec3750"
                />
                <path
                  d="M8 10h4v8H8v-8zm8 0h4v8h-4v-8zm-4 4h4v4h-4v-4z"
                  fill="white"
                />
              </svg>
              <span 
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" 
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-slate-900 leading-tight">
                World of ML
              </span>
              <span className="text-xs text-slate-500 font-mono" style={{ fontSize: '0.625rem' }}>
                HACK CLUB
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-3 py-1.5 text-sm font-medium rounded transition-colors
                    ${
                      isActive
                        ? 'text-slate-900'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded -z-10 bg-[#ec3750]/10"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* XP Display */}
          <Link 
            href="/store"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#ec3750]/20 bg-[#ec3750]/5 transition-colors hover:bg-[#ec3750]/10"
          >
            <span className="text-sm font-mono font-bold text-[#ec3750]">
              {totalXP} XP
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
