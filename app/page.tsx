'use client';
import { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function HomePage() {
  const [source, setSource] = useState('');
  const [dest, setDest] = useState('');
  const [taskId, setTaskId] = useState('');
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Idle');
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
          },
          {
            '@type': 'Question',
            'name': 'Can I duplicate a Google Drive folder across different accounts?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes. Share the source folder with Viewer permissions to the destination account. Then, paste the folder link into our tool and authenticate with the destination account to transfer the data.'
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 space-y-12 md:space-y-16">
        
        <header className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Duplicate Google Drive Folders
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            The most efficient utility to copy a folder in Google Drive. Clone nested directories and transfer data seamlessly across accounts without consuming local bandwidth.
          </p>
        </header>

        <section className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-slate-200">
          <div className="space-y-6">
            <div>
              <label htmlFor="source" className="block text-sm font-semibold text-slate-900 mb-1.5">
                Source Folder URL
              </label>
              <input 
                id="source"
                type="text"
                className="w-full border border-slate-300 p-3.5 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-shadow text-sm"
                placeholder="https://drive.google.com/drive/folders/..." 
                value={source}
                onChange={(e) => setSource(e.target.value)}
                disabled={isProcessing}
              />
            </div>

            <div>
              <label htmlFor="dest" className="block text-sm font-semibold text-slate-900 mb-1.5">
                Destination Folder URL
              </label>
              <input 
                id="dest"
                type="text"
                className="w-full border border-slate-300 p-3.5 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-shadow text-sm"
                placeholder="https://drive.google.com/drive/folders/..." 
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                disabled={isProcessing}
              />
            </div>

            <button 
              onClick={() => login()}
              disabled={!source || !dest || isProcessing}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-4 rounded-md transition-colors disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed mt-4"
            >
              {isProcessing ? 'Processing Request...' : 'Authenticate & Execute'}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
              <span>Status: {statusMessage}</span>
              {isProcessing && <span>{progress}%</span>}
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-slate-800 h-full transition-all duration-300 ease-out rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </section>

        <section className="bg-slate-100 rounded-xl p-6 md:p-8 border border-slate-200">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
            How to copy a folder in Google Drive
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                1. The Native Limitation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Users frequently search for how to make a copy of folder in Google Drive, only to realize the native web interface does not support duplicating entire nested folders. You can only duplicate individual files.
              </p>
            </div>
            
            <div>
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                2. The Automated Solution
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To perform a Google Drive folder copy efficiently, FolderCopier bridges this gap. By utilizing official API endpoints, our system recursively scans your source directory, replicates the exact structure in the destination, and copies all files server-side.
              </p>
            </div>

            <div>
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">
                3. How to copy folder to Google Drive across accounts?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                If you need to duplicate a folder between two different workspace or personal accounts: share the original folder with the destination account, copy the shared link, and use this utility to clone the data permanently into the new account.
              </p>
            </div>
          </div>
        </section>
        
      </div>
    </>
  );
}
