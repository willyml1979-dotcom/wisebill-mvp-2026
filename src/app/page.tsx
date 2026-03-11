'use client';
import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
          return (
                        <div className="min-h-screen bg-slate-950 text-white font-geist flex flex-col selection:bg-emerald-500/30">
                                    <div className="fixed inset-0 overflow-hidden pointer-events-none">
                                                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
                                                    <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full bg-emerald-600/10 blur-[120px] animate-pulse delay-700" />
                                                    <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse delay-1000" />
                                    </div>div>
                                    <nav className="relative z-50 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
                                                    <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
                                                                        <div className="w-8 h-8 bg-emerald-500 rounded-lg rotate-12 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                                                                                <span className="text-black text-xl -rotate-12">W</span>span>
                                                                        </div>div>
                                                                        WiseBill
                                                    </div>div>
                                                    <div className="hidden md:flex gap-8 text-sm font-medium text-white/60">
                                                                        <a href="#" className="hover:text-white transition-colors">How it works</a>a>
                                                                        <a href="#" className="hover:text-white transition-colors">Carriers</a>a>
                                                                        <a href="#" className="hover:text-white transition-colors">Privacy</a>a>
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
                                                                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                                                                        <Link
                                                                                                      href="/analysis"
                                                                                                      className="relative flex items-center justify-center px-12 py-6 bg-white text-black text-xl font-bold rounded-2xl hover:bg-emerald-400 transition-all duration-300 transform active:scale-95 shadow-2xl"
                                                                                                  >
                                                                                                Start Saving Now
                                                                        </Link>Link>
                                                    </div>div>
                                    </main>main>
                        </div>div>
                    );
}
</div>
