import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Effective Date: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-8 text-slate-600 text-sm md:text-base leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">1. Data Collection & Usage</h2>
          <p>FolderCopier requests OAuth 2.0 access strictly to perform the user-initiated directory duplication. We do not index, store, or analyze the contents of your files.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">2. API Services User Data Policy</h2>
          <p>Our application's use and transfer of information received from Google APIs adheres to the official Google API Services User Data Policy, specifically the Limited Use requirements.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">3. Infrastructure Security</h2>
          <p>Authentication tokens required for background processing are temporarily stored in secured infrastructure and are purged upon task completion or token expiration.</p>
        </section>
      </div>
    </div>
  );
}
