import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about FolderCopier and how we solve the Google Drive directory cloning limitation.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Ánh sáng mờ trang trí góc trên */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 blur-[80px] pointer-events-none"></div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">About FolderCopier</h1>
        
        <div className="text-slate-300 space-y-6 text-base md:text-lg leading-relaxed relative z-10">
          <p>
            FolderCopier provides a streamlined web interface addressing a fundamental limitation in the default cloud storage ecosystem: the inability to directly clone nested directory structures.
          </p>
          <p>
            Engineered for professionals, our utility executes data transfers directly at the server level, preserving local bandwidth and ensuring data integrity during migration processes.
          </p>
        </div>
      </div>
    </div>
  );
}
