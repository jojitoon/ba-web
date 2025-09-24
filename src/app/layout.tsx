import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Built Ancestry - Preserving Legacies in Construction & Business',
  description:
    'Capture, document, and showcase every stage of your construction projects and business stories with immersive visuals, 3D models, virtual tours, and team interviews.',
  keywords:
    'construction documentation, business stories, 3D models, virtual tours, project timeline, legacy preservation',
  authors: [{ name: 'Built Ancestry' }],
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
    <html lang='en' className='dark'>
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
