'use client';
import { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Script from 'next/script';

export default function HomePage() {
  const [source, setSource] = useState('');
  const [dest, setDest] = useState('');
  const [taskId, setTaskId] = useState('');
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Ready to copy');
  const [isProcessing, setIsProcessing] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const login = useGoogleLogin({
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/drive',
    onSuccess: async (codeResponse) => {
      setStatusMessage('Authenticating and initializing...');
      setIsProcessing(true);
      try {
        const res = await axios.post(`${backendUrl}/api/copy`, {
          source_link: source,
          dest_link: dest,
          auth_code: codeResponse.code,
        });
        setTaskId(res.data.task_id);
      } catch (err: any) {
        setStatusMessage(err.response?.data?.detail || 'Connection error. Please try again.');
        setIsProcessing(false);
      }
    },
    onError: () => {
      setStatusMessage('Authentication canceled by user.');
      setIsProcessing(false);
    }
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (taskId) {
      interval = setInterval(async () => {
        try {
          const res = await axios.get(`${backendUrl}/api/status/${taskId}`);
          const { status, info } = res.data;

          if (status === 'PROGRESS') {
            setProgress(info.progress || 0);
            setStatusMessage(info.message || 'Processing task...');
          } else if (status === 'SUCCESS') {
            setProgress(100);
            setStatusMessage(info.message || 'Task completed successfully.');
            setIsProcessing(false);
            clearInterval(interval);
          } else if (status === 'FAILURE') {
            setStatusMessage(`Error: ${info.error || 'System failure'}`);
            setIsProcessing(false);
            clearInterval(interval);
          }
        } catch (error) {
          console.error("Failed to fetch task status.");
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [taskId, backendUrl]);

  // JSON-LD SEO/AEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        'name': 'FolderCopier',
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'Web',
        'description': 'A professional tool to duplicate Google Drive folder and copy files securely between accounts.',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How to copy a folder in Google Drive?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'To copy a folder in Google Drive, paste your source folder URL and destination URL into FolderCopier, authenticate with your Google account, and execute. The tool processes the duplication directly on the cloud.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How to make a copy of folder in Google Drive native app?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Google Drive does not offer a native button to duplicate entire folders containing nested subfolders. You must use an authorized API tool like FolderCopier to clone the directory structure automatically.'
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script id="schema-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Section */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
            Duplicate Google Drive Folders. <br className="hidden md:block" /> Made easy.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            The most efficient utility to copy a folder in Google Drive. Clone nested directories and transfer data seamlessly across accounts without consuming local bandwidth.
          </p>
        </header>

        {/* Core Tool Interface (Glassmorphism card) */}
        <section className="bg-white/5 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] shadow-2xl border border-white/10 relative overflow-hidden">
          {/* Subtle gradient glow inside the card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-purple-500/20 blur-[100px] pointer-events-none"></div>

          <div className="space-y-6 relative z-10">
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-slate-300 mb-2">
                Source Folder URL
              </label>
              <input 
                id="source"
                type="text"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 p-4 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-sm"
                placeholder="https://drive.google.com/drive/folders/..." 
                value={source}
                onChange={(e) => setSource(e.target.value)}
                disabled={isProcessing}
              />
            </div>

            <div>
              <label htmlFor="dest" className="block text-sm font-medium text-slate-300 mb-2">
                Destination Folder URL
              </label>
              <input 
                id="dest"
                type="text"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 p-4 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-sm"
                placeholder="https://drive.google.com/drive/folders/..." 
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                disabled={isProcessing}
              />
            </div>

            {/* Prominent White Button (matching "Get started") */}
            <button 
              onClick={() => login()}
              disabled={!source || !dest || isProcessing}
              className="w-full bg-white text-slate-900 hover:bg-slate-200 hover:scale-[1.01] font-bold text-lg py-4 px-6 rounded-xl transition-all disabled:bg-white/30 disabled:text-white/50 disabled:hover:scale-100 disabled:cursor-not-allowed mt-4 shadow-lg shadow-white/10"
            >
              {isProcessing ? 'Processing Request...' : 'Authenticate & Execute'}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400 font-medium pt-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Powered by Google Drive API
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">
              <span>Status: <span className="text-white font-bold">{statusMessage}</span></span>
              {isProcessing && <span>{progress}%</span>}
            </div>
            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-400 to-blue-400 h-full transition-all duration-300 ease-out rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* AEO / SEO Content Section */}
        <section className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            How to copy a folder in Google Drive
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold mb-4">1</div>
              <h3 className="text-lg font-semibold text-white">
                The Native Limitation
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Users frequently search for how to make a copy of folder in Google Drive, only to realize the native web interface does not support duplicating entire nested folders. You can only duplicate individual files.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold mb-4">2</div>
              <h3 className="text-lg font-semibold text-white">
                The Automated Solution
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                To perform a Google Drive folder copy efficiently, FolderCopier bridges this gap. By utilizing official API endpoints, our system recursively scans your source directory, replicates the exact structure, and copies all files server-side.
              </p>
            </div>
          </div>
        </section>
        
      </div>
    </>
  );
}
