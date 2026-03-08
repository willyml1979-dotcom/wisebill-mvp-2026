'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
      return (
              <div className="min-h-screen bg-slate-950 text-white font-geist flex flex-col selection:bg-emerald-500/30">
                    <div className="fixed inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
                            <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full bg-emerald-600/10 blur-[120px] animate-pulse delay-700" />
                    </div>div>
              
                    <nav className="relative z-50 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
                            <div className="text-2xl font-black tracking-tighter flex items-center gap-2 text-white">
                                      <div className="w-8 h-8 bg-emerald-500 rounded-lg rotate-12 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                                  <span className="text-black text-xl -rotate-12">W</span>span>
                                      </div>div>
                                      WiseBill
                            </div>div>
                    </nav>nav>
              
                    <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium mb-8 backdrop-blur-sm">
                                      <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                                      Expert Savings Advisor for Canada
                            </div>div>
                            
                            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                                      WiseBill: Find your <br />
                                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-emerald-200">
                                                  ideal mobile plan
                                      </span>span>
                            </h1>h1>
                            
                            <p className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl balance mx-auto">
                                      Stop overpaying for data you don't use. Our smart analysis engine compares real Canadian plans to find your perfect match.
                            </p>p>
                    
                            <div className="relative group">
                                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                                      <Link 
                                                      href="/analysis"
                                                      className="relative flex items-center justify-center px-12 py-6 bg-white text-black text-xl font-bold rounded-2xl hover:bg-emerald-400 transition-all duration-300 transform active:scale-95 shadow-2xl"
                                                    >
                                                  Start Saving Now
                                                  <svg className="ml-2 w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                  </svg>svg>
                                      </Link>Link>
                            </div>div>
                    </main>main>
              
                    <footer className="relative z-10 px-8 py-12 border-t border-white/5 mt-20 text-center">
                            <div className="text-white/30 text-xs italic">
                                      "Find your ideal plan. We are not affiliated with any provider."
                            </div>div>
                    </footer>footer>
              </div>div>
            );
}
</div>
