import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Duplicate Google Photos Strategy',
  description: 'Technical methodology for transferring and duplicating Google Photos directories via Drive infrastructure.',
};

export default function GooglePhotosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white">Duplicating Google Photos</h1>
      <div className="text-slate-300 space-y-6">
        <p className="text-base leading-relaxed">
          The Google Photos API imposes strict read/write limitations preventing direct album duplication across accounts. To achieve data transfer, users must implement a bridge protocol utilizing Google Drive.
        </p>
        
        <h3 className="text-xl font-semibold text-white pt-4">Recommended Protocol</h3>
        <ol className="list-decimal list-inside space-y-3 text-base marker:text-purple-400">
          <li><strong className="text-white">Data Export:</strong> Utilize Google Takeout to generate an archive of the target albums.</li>
          <li><strong className="text-white">Drive Staging:</strong> Extract and upload the resulting directories to a Google Drive account.</li>
          <li><strong className="text-white">Execution:</strong> Apply the FolderCopier utility to replicate the staged data to the final destination account.</li>
        </ol>
        
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 mt-10 shadow-xl">
          <h4 className="text-xl font-semibold text-white pb-2">Proceed to Tool</h4>
          <p className="text-sm mb-6 text-slate-400">Once data is staged in Google Drive, initialize the transfer process.</p>
          <Link href="/" className="inline-block bg-white text-slate-900 font-bold py-3 px-8 rounded-xl hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Access FolderCopier
          </Link>
        </div>
      </div>
    </div>
  );
}
