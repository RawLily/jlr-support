import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JLR Support Platform',
  description: 'AI-powered customer support automation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
