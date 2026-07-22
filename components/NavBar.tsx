import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center flex-wrap">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-slate-900">FolderCopier</span>
          </Link>
          <div className="flex space-x-4 md:space-x-6 text-sm font-medium text-slate-600 mt-2 md:mt-0 overflow-x-auto">
            <Link href="/" className="hover:text-slate-900 transition-colors whitespace-nowrap">Drive Tool</Link>
            <Link href="/duplicate-google-photos" className="hover:text-slate-900 transition-colors whitespace-nowrap">Photos Guide</Link>
            <Link href="/about" className="hover:text-slate-900 transition-colors whitespace-nowrap">About</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
