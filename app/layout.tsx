import type { Metadata } from 'next';
import GoogleProvider from '../components/GoogleProvider';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'FolderCopier - Duplicate Google Drive Folders',
  description: 'A professional tool to duplicate Google Drive folders between accounts securely.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <GoogleProvider>
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </GoogleProvider>
      </body>
    </html>
  );
}
