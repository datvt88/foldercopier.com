import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">About FolderCopier</h1>
      <div className="text-slate-600 space-y-4 text-sm md:text-base leading-relaxed">
        <p>
          FolderCopier provides a streamlined web interface addressing a fundamental limitation in the default cloud storage ecosystem: the inability to directly clone nested directory structures.
        </p>
        <p>
          Engineered for professionals, our utility executes data transfers directly at the server level, preserving local bandwidth and ensuring data integrity during migration processes.
        </p>
      </div>
    </div>
  );
}
