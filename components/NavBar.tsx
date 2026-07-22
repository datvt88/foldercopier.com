import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 bg-[#170934]/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center flex-wrap">
          <Link href="/" className="flex items-center gap-2">
            {/* Logo mô phỏng icon trong ảnh */}
            <div className="w-8 h-8 bg-white text-[#170934] rounded flex items-center justify-center font-black text-xl leading-none">
              F
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">FolderCopier</span>
          </Link>
          <div className="flex items-center space-x-4 md:space-x-8 text-sm font-medium text-slate-300 mt-2 md:mt-0 overflow-x-auto">
            <Link href="/" className="hover:text-white transition-colors whitespace-nowrap">Drive Tool</Link>
            <Link href="/duplicate-google-photos" className="hover:text-white transition-colors whitespace-nowrap">Photos Guide</Link>
            
            {/* Nút giả lập style "Ask AI" (Viền gradient) */}
            <Link href="/about" className="relative inline-flex items-center justify-center p-[1px] rounded-full overflow-hidden group">
              <span className="absolute w-full h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 group-hover:rotate-180 transition-transform duration-700 ease-linear"></span>
              <span className="relative px-6 py-2 transition-all ease-in duration-75 bg-[#170934] rounded-full group-hover:bg-opacity-0 text-white font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg>
                About Us
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
