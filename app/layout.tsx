import type { Metadata } from 'next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://foldercopier.com'),
  title: {
    default: 'FolderCopier - Duplicate Google Drive Folders',
    template: '%s | FolderCopier'
  },
  description: 'A professional tool to duplicate Google Drive folders between accounts securely and instantly.',
  openGraph: {
    type: 'website',
    siteName: 'FolderCopier',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <GoogleOAuthProvider clientId={clientId}>
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
