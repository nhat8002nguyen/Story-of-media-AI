import '@/app/ui/global.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: "%s | Story of Media",
    default: "Story of Media"
  },
  description: "The official Next.js Course Dashboard, built with App Router.",
  metadataBase: new URL('https://nextjs-dashboard-practice-kappa.vercel.app')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
