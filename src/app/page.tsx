'use client';

import Link from 'next/link';

export default function Home() {
    return (
          <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <div className="max-w-md w-full p-8 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl text-center">
                        <h1 className="text-4xl font-extrabold text-white mb-6 tracking-tight">
                                  WiseBill: Find your ideal mobile plan
                        </h1>h1>
                        <p className="text-white/80 mb-8 text-lg">
                                  Start saving on your mobile bill today with our smart analysis tool.
                        </p>p>
                        <Link 
                                    href="/analysis"
                                    className="inline-block w-full py-4 px-8 bg-white text-purple-600 font-bold rounded-xl shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105 active:scale-95"
                                  >
                                  Start Saving Now
                        </Link>Link>
                </div>div>
          </main>main>
        );
}
</main>
