'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  if (isHomepage) {
    // Dark footer for homepage
    return (
      <footer className="bg-[#060a12] border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="24" height="24" rx="4" fill="#ec3750" />
                  <path d="M8 10h4v8H8v-8zm8 0h4v8h-4v-8zm-4 4h4v4h-4v-4z" fill="white" />
                </svg>
                <span className="text-sm text-white/60">
                  A <a href="https://hackclub.com" className="hover:underline text-[#ec3750]" target="_blank" rel="noopener noreferrer">Hack Club</a> project
                </span>
              </div>
              <span className="text-xs text-white/40">
                Made with <span className="text-[#ec3750]">&#10084;</span> by Naitik Gupta
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span className="font-mono">World of ML v1.0</span>
              <span className="text-white/20">|</span>
              <a href="https://github.com/hackclub" className="hover:text-white/70 transition-colors" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <span className="text-white/20">|</span>
              <a href="https://hackclub.com/slack" className="hover:text-white/70 transition-colors" target="_blank" rel="noopener noreferrer">
                Slack
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Light footer for other pages
  return (
    <footer 
      className="border-t py-6"
      style={{ 
        borderColor: 'var(--color-lab-border)',
        backgroundColor: 'var(--color-lab-surface)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="24" height="24" rx="4" fill="#ec3750" />
                <path d="M8 10h4v8H8v-8zm8 0h4v8h-4v-8zm-4 4h4v4h-4v-4z" fill="white" />
              </svg>
              <span className="text-sm text-slate-600">
                A <a href="https://hackclub.com" className="hover:underline" style={{ color: '#ec3750' }} target="_blank" rel="noopener noreferrer">Hack Club</a> project
              </span>
            </div>
            <span className="text-xs text-slate-500">
              Made with <span style={{ color: '#ec3750' }}>&#10084;</span> by Naitik Gupta
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="font-mono">World of ML v1.0</span>
            <span>|</span>
            <a href="https://github.com/hackclub" className="hover:text-slate-700 transition-colors" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <span>|</span>
            <a href="https://hackclub.com/slack" className="hover:text-slate-700 transition-colors" target="_blank" rel="noopener noreferrer">
              Slack
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
