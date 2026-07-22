import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Terms of Service</h1>
      
      <div className="space-y-8 text-slate-600 text-sm md:text-base leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>By utilizing FolderCopier, you agree to these terms. The service is provided "as is" without warranty of any kind.</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">2. Service Limitations</h2>
          <p>We are bound by Google's API rate limits and infrastructure availability. We do not guarantee uninterrupted service for extensively large data transfers.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">3. Acceptable Use</h2>
          <p>Users maintain full responsibility for the data transferred using this utility. The tool must not be used to bypass copyright protections or distribute malicious payloads.</p>
        </section>
      </div>
    </div>
  );
}
