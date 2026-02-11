import type { Metadata } from 'next';
import './globals.css';
import ConditionalNav from '@/components/ConditionalNav';
import ConditionalFooter from '@/components/ConditionalFooter';
import ConditionalBackground from '@/components/ConditionalBackground';

export const metadata: Metadata = {
  title: 'WorldOfML v2.0 | Hack Club YSWS',
  description:
    'A Hack Club YSWS where you learn ML end-to-end and deploy a custom model on low-cost physical hardware.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConditionalBackground />
        <ConditionalNav />
        <main>{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
