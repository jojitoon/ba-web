import type { Metadata } from 'next';
import { Playfair_Display, Inter, Lora } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Built Ancestry - Preserving Legacies in Construction & Business',
  description:
    'Capture, document, and showcase every stage of your construction projects and business stories with immersive visuals, 3D models, virtual tours, and team interviews.',
  keywords:
    'construction documentation, business stories, 3D models, virtual tours, project timeline, legacy preservation',
  authors: [{ name: 'Built Ancestry' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Built Ancestry - Preserving Legacies in Construction & Business',
    description:
      'Capture, document, and showcase every stage of your construction projects and business stories with immersive visuals, 3D models, virtual tours, and team interviews.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${playfair.variable} ${inter.variable} ${lora.variable} antialiased font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
