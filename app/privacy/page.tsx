import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read how FolderCopier handles your data securely according to Google API Services User Data Policy.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-purple-400 mb-10 font-medium">Effective Date: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-10 text-slate-300 text-base leading-relaxed">
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-sm">1</span>
              Data Collection & Usage
            </h2>
            <p className="pl-11">FolderCopier requests OAuth 2.0 access strictly to perform the user-initiated directory duplication. We do not index, store, or analyze the contents of your files.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-sm">2</span>
              API Services User Data Policy
            </h2>
            <p className="pl-11">Our application's use and transfer of information received from Google APIs adheres to the official Google API Services User Data Policy, specifically the Limited Use requirements.</p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-sm">3</span>
              Infrastructure Security
            </h2>
            <p className="pl-11">Authentication tokens required for background processing are temporarily stored in secured infrastructure and are purged upon task completion or token expiration.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
