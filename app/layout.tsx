import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Thytus Ben Resume',
  description: 'My professional resume website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
