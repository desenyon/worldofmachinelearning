'use client';

import Link from 'next/link';

export default function ConditionalFooter() {
  return (
    <footer className="border-t border-[--color-muted] bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          WorldOfML v2.0 · A Hack Club YSWS program for building and shipping local ML.
        </p>
        <div className="flex items-center gap-4">
          <Link href="https://hackclub.com/slack" className="hover:text-slate-900" target="_blank" rel="noopener noreferrer">
            Slack
          </Link>
          <Link href="https://hackclub.com/brand/" className="hover:text-slate-900" target="_blank" rel="noopener noreferrer">
            Brand
          </Link>
          <Link href="https://theme.hackclub.com/" className="hover:text-slate-900" target="_blank" rel="noopener noreferrer">
            Theme
          </Link>
        </div>
      </div>
    </footer>
  );
}
