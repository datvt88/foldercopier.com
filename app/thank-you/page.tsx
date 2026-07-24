'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ThankYouPage() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Hiệu ứng delay nhẹ để tạo cảm giác bất ngờ khi trang vừa load xong
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="relative max-w-2xl w-full">
        {/* Vầng hào quang phía sau (Glow effect) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-pink-500/20 blur-[100px] pointer-events-none"></div>

        <section className={`relative z-10 bg-white/5 backdrop-blur-2xl p-8 md:p-14 rounded-[2.5rem] shadow-2xl border border-white/10 text-center transition-all duration-1000 transform ${showConfetti ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Icon trái tim nhịp đập */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500 rounded-full blur animate-ping opacity-50"></div>
              <div className="relative bg-gradient-to-tr from-pink-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg transform hover:scale-110 transition-transform cursor-default">
                💖
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Thank you for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">fueling our journey!</span>
          </h1>

          <div className="space-y-6 text-base md:text-lg text-slate-300 leading-relaxed font-medium">
            <p>
              Hi there, it truly warms my heart to receive your incredible support. 
            </p>
            <p>
              FolderCopier was built with a simple goal: to help people save time and effort. However, keeping the servers running smoothly every single day comes with a significant cost.
            </p>
            <p>
              It is exactly because of these coffees and your generous contributions that this project can stay alive, get faster, and most importantly: <strong className="text-white">Keep this tool 100% free for everyone.</strong>
            </p>
            <p className="pt-4 border-t border-white/10">
              Your kindness is my greatest motivation to stay up late fixing bugs and polishing the system. Wishing you a wonderful, productive, and joyful day ahead! 🫶
            </p>
          </div>

          <div className="mt-10">
            <Link href="/">
              <button className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-lg py-4 px-8 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to homepage
              </button>
            </Link>
          </div>
          
        </section>
      </div>
    </div>
  );
}
