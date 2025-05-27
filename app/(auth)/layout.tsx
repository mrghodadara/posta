import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Posta - Share Your Thoughts',
  description:
    'A platform for sharing your thoughts, stories, and ideas with the world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
