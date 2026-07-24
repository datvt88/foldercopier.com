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

  // Gọi API để check tiến độ copy
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
            setStatusMessage(info.message || 'COMPLETED! SUCCESSFULLY DUPLICATED ITEMS.');
            setIsProcessing(false);
            clearInterval(interval);
          } else if (status === 'FAILURE') {
            setStatusMessage(`Error: ${info.error || 'System failure'}`);
            setIsProcessing(false);
            clearInterval(interval);
          }
        } catch (error) {
          console.error("Status check failed.");
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [taskId, backendUrl]);

  // Hook Render nút PayPal thông minh hơn (Đảm bảo script load xong mới render)
  useEffect(() => {
    if (progress === 100) {
      const checkAndRenderPayPal = () => {
        const paypalContainer = document.getElementById("paypal-container-T2Z2WJJWTCJHL");
        const windowAny = window as any; 
        
        // Kiểm tra thư viện SDK đã sẵn sàng và container rỗng
        if (windowAny.paypal && windowAny.paypal.HostedButtons && paypalContainer && paypalContainer.innerHTML === "") {
          windowAny.paypal.HostedButtons({
            hostedButtonId: "T2Z2WJJWTCJHL"
          }).render("#paypal-container-T2Z2WJJWTCJHL");
        } 
        // Nếu SDK chưa tải xong, thử lại sau 0.5s
        else if (!windowAny.paypal && paypalContainer) {
          setTimeout(checkAndRenderPayPal, 500);
        }
      };
      
      checkAndRenderPayPal();
    }
  }, [progress]);

  return (
    <>
      {/* Script chuẩn từ PayPal */}
      <Script
        src="https://www.paypal.com/sdk/js?client-id=BAAAX42APoWnZU-5uKAPxIylxLazAIleS0jia5znkMfgJStp5gPOlVKDa7ts9rTAImpb7E-qHIlMVOur9Q&components=hosted-buttons&disable-funding=venmo&currency=USD"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />

      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24 lg:px-8 space-y-16">
        <header className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Your Drive, Cloned. <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Made easy.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium">
            One platform, powered by our backend API, to clone entire nested directories seamlessly across your Google accounts.
          </p>
        </header>

        <section className="bg-white/5 backdrop-blur-2xl p-8 md:p-14 rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-purple-500/10 blur-[120px] pointer-events-none"></div>

          <div className="space-y-8 relative z-10">
            <div>
              <label className="block text-lg font-semibold text-slate-200 mb-3">Source Folder URL</label>
              <input 
                type="text"
                className="w-full bg-black/40 border border-white/20 text-white placeholder-slate-500 p-5 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-lg md:text-xl backdrop-blur-sm shadow-inner"
                placeholder="https://drive.google.com/drive/folders/..." 
                value={source}
                onChange={(e) => setSource(e.target.value)}
                disabled={isProcessing}
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-slate-200 mb-3">Destination Folder URL</label>
              <input 
                type="text"
                className="w-full bg-black/40 border border-white/20 text-white placeholder-slate-500 p-5 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-lg md:text-xl backdrop-blur-sm shadow-inner"
                placeholder="https://drive.google.com/drive/folders/..." 
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                disabled={isProcessing}
              />
            </div>

            <button 
              onClick={() => login()}
              disabled={!source || !dest || isProcessing}
              className="w-full bg-white text-slate-900 hover:bg-slate-200 hover:scale-[1.02] active:scale-[0.98] font-extrabold text-2xl py-5 px-6 rounded-2xl transition-all disabled:bg-white/20 disabled:text-white/40 disabled:hover:scale-100 disabled:cursor-not-allowed mt-8 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              {isProcessing ? 'Processing Request...' : 'Get started'}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-base text-slate-400 font-medium pt-4">
              <svg width="20" height="20" className="text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Secure OAuth 2.0 connection
            </div>

            <div className="mt-3 px-4 text-center">
              <p className="text-xs text-gray-400/80 leading-relaxed">
                <span className="font-semibold text-gray-300">Note:</span> Granting write permission to your Google Drive is required to copy files. We strictly do not store any of your personal data or files on our servers.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
            <div className="flex justify-between text-base font-bold text-slate-400 mb-4 uppercase tracking-wider">
              <span>Status: <span className="text-white">{statusMessage}</span></span>
              {isProcessing && <span>{progress}%</span>}
            </div>
            
            <div className="w-full bg-black/50 rounded-full h-4 overflow-hidden border border-white/5">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-300 ease-out rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* KHU VỰC NÚT DONATE CHUẨN PAYPAL */}
            {progress === 100 && (
              <div className="mt-10 flex flex-col items-center justify-center space-y-4 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] w-full">
                <p className="text-sm text-pink-300/90 font-medium text-center">
                  If this tool saved you time, consider fueling our journey! ☕
                </p>
                
                {/* 
                  SỬ DỤNG CSS CÁCH LY [&_input]:!text-slate-900 
                  Lệnh này can thiệp trực tiếp vào HTML của PayPal để bẻ gãy nền tối và hiển thị rõ số tiền màu đen. 
                */}
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md w-full max-w-[400px] mx-auto [&_input]:!text-slate-900 [&_input]:!bg-white [&_input]:!font-bold">
                  <div id="paypal-container-T2Z2WJJWTCJHL" className="w-full"></div>
                </div>
              </div>
            )}
            
          </div>
        </section>
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
