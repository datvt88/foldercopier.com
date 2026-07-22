import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using the FolderCopier tool.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-10">Terms of Service</h1>
        
        <div className="space-y-10 text-slate-300 text-base leading-relaxed">
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-sm">1</span>
              Acceptance of Terms
            </h2>
            <p className="pl-11">By utilizing FolderCopier, you agree to these terms. The service is provided "as is" without warranty of any kind.</p>
          </section>
          
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-sm">2</span>
              Service Limitations
            </h2>
            <p className="pl-11">We are bound by Google's API rate limits and infrastructure availability. We do not guarantee uninterrupted service for extensively large data transfers.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-sm">3</span>
              Acceptable Use
            </h2>
            <p className="pl-11">Users maintain full responsibility for the data transferred using this utility. The tool must not be used to bypass copyright protections or distribute malicious payloads.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
