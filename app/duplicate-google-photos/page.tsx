import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Duplicate Google Photos Strategy',
  description: 'Technical methodology for transferring and duplicating Google Photos directories via Drive infrastructure.',
};

export default function GooglePhotosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Duplicating Google Photos</h1>
      <div className="text-slate-600 space-y-6">
        <p className="text-sm md:text-base leading-relaxed">
          The Google Photos API imposes strict read/write limitations preventing direct album duplication across accounts. To achieve data transfer, users must implement a bridge protocol utilizing Google Drive.
        </p>
        
        <h3 className="text-lg font-semibold text-slate-900 pt-4">Recommended Protocol</h3>
        <ol className="list-decimal list-inside space-y-3 text-sm md:text-base">
          <li><strong>Data Export:</strong> Utilize Google Takeout to generate an archive of the target albums.</li>
          <li><strong>Drive Staging:</strong> Extract and upload the resulting directories to a Google Drive account.</li>
          <li><strong>Execution:</strong> Apply the FolderCopier utility to replicate the staged data to the final destination account.</li>
        </ol>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 mt-8 shadow-sm">
          <h4 className="text-base font-semibold text-slate-900 pb-2">Proceed to Tool</h4>
          <p className="text-sm mb-4">Once data is staged in Google Drive, initialize the transfer process.</p>
          <Link href="/" className="inline-block bg-slate-900 text-white text-sm font-medium py-2.5 px-5 rounded-md hover:bg-slate-800 transition-colors">
            Access FolderCopier
          </Link>
        </div>
      </div>
    </div>
  );
}
