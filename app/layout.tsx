import './globals.css';
import Navbar from '../components/Navbar';
import AppLoader from '../components/AppLoader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thytus Ben | Portfolio',
  description: 'My professional portfolio website',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700;800&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <AppLoader>
          <Navbar />
          <main>{children}</main>
        </AppLoader>
      </body>
    </html>
  );
}