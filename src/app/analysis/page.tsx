'use client';

import React, { useState } from 'react';
import { calculateEffectiveRank, DataRank, UsageStepDown } from '@/lib/logic';
import { supabase } from '@/lib/supabase';
import { SavingsCard } from '@/components/SavingsCard';

export default function MobileAnalysisPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        provider: '',
        currentPrice: '',
        currentGB: '',
        usageProfile: 'Most/Over' as UsageStepDown,
        timeWithProvider: '',
        satisfaction: 'Neutral',
    });
    const [isCalculating, setIsCalculating] = useState(false);
    const [result, setResult] = useState<{ savings: number; bestPlan: any } | null>(null);

    const handleNext = () => setStep((s) => s + 1);

    const performAnalysis = async () => {
        setIsCalculating(true);

        // 1. Mapear GB a Rank
        const gbValue = parseInt(formData.currentGB);
        let currentRank: DataRank = 1;
        if (gbValue >= 150) currentRank = 5;
        else if (gbValue >= 75) currentRank = 4;
        else if (gbValue >= 40) currentRank = 3;
        else if (gbValue >= 15) currentRank = 2;

        // 2. Calcular Effective Rank (Step-down logic)
        const effectiveRank = calculateEffectiveRank(currentRank, formData.usageProfile);

        // 3. Consultar Supabase por el mejor plan en ese Rank
        const { data: plans } = await supabase
            .from('mobile_plans')
            .select('*')
            .eq('tier_rank', effectiveRank)
            .eq('is_active', true)
            .order('price', { ascending: true })
            .limit(1);

        if (plans && plans.length > 0) {
            const bestPlan = plans[0];
            const annualSavings = (parseFloat(formData.currentPrice) - parseFloat(bestPlan.price)) * 12;

            setResult({
                savings: Math.round(annualSavings),
                bestPlan: {
                    provider: bestPlan.provider_name,
                    price: bestPlan.price,
                    data_gb: bestPlan.data_gb,
                }
            });

            // 4. Guardar consulta (Opcional - Silencioso)
            await supabase.from('user_queries').insert({
                current_provider: formData.provider,
                current_price: parseFloat(formData.currentPrice),
                current_tier_rank: currentRank,
                usage_profile: formData.usageProfile,
                calculated_savings: annualSavings,
                effective_tier_used: effectiveRank,
            });
        }

        setIsCalculating(false);
        handleNext();
    };

    if (result) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white font-geist">
                <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    Your Savings Roadmap is Ready
                </h2>
                <div className="max-w-2xl w-full">
                    <SavingsCard annualSavings={result.savings} bestPlan={result.bestPlan} />
                    <div className="mt-8 text-center text-white/40 text-sm italic">
                        "Expert advice you can trust. No strings attached."
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white font-geist">
            <div className="w-full max-w-xl">
                {/* Progress Bar */}
                <div className="h-1 w-full bg-white/10 rounded-full mb-12 overflow-hidden">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${(step / 6) * 100}%` }}
                    />
                </div>

                {/* Form Steps */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl transition-all duration-300">
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Which provider are you with currently?</h2>
                            <input
                                type="text"
                                placeholder="e.g. Rogers, Bell, Telus..."
                                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                                value={formData.provider}
                                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                            />
                            <button
                                onClick={handleNext}
                                disabled={!formData.provider}
                                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-50"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">What is your monthly price? (Before tax)</h2>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">$</span>
                                <input
                                    type="number"
                                    className="w-full bg-white/5 border border-white/20 rounded-xl px-10 py-3 focus:outline-none focus:border-emerald-500"
                                    value={formData.currentPrice}
                                    onChange={(e) => setFormData({ ...formData, currentPrice: e.target.value })}
                                />
                            </div>
                            <button onClick={handleNext} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-emerald-400">Continue</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">How much data do you have in your plan?</h2>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="GB"
                                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                                    value={formData.currentGB}
                                    onChange={(e) => setFormData({ ...formData, currentGB: e.target.value })}
                                />
                            </div>
                            <button onClick={handleNext} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-emerald-400">Continue</button>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Based on your usage, do you use:</h2>
                            <div className="grid gap-3">
                                {['Much less', 'Half', 'Most/Over'].map((profile) => (
                                    <button
                                        key={profile}
                                        onClick={() => setFormData({ ...formData, usageProfile: profile as UsageStepDown })}
                                        className={`text-left p-4 rounded-xl border transition-all ${formData.usageProfile === profile
                                                ? 'border-emerald-500 bg-emerald-500/10'
                                                : 'border-white/10 bg-white/5 hover:border-white/30'
                                            }`}
                                    >
                                        {profile} the data you pay for
                                    </button>
                                ))}
                            </div>
                            <button onClick={handleNext} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-emerald-400 mt-4">Continue</button>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">How long have you been with them?</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {['< 1 year', '1-3 years', '3-5 years', '5+ years'].map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setFormData({ ...formData, timeWithProvider: time })}
                                        className={`p-4 rounded-xl border transition-all ${formData.timeWithProvider === time
                                                ? 'border-emerald-500 bg-emerald-500/10'
                                                : 'border-white/10 bg-white/5'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                            <button onClick={handleNext} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-emerald-400 mt-4">Almost there</button>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Are you satisfied with your service?</h2>
                            <div className="flex justify-between gap-2">
                                {['😞', '😐', '😊'].map((emoji, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setFormData({ ...formData, satisfaction: emoji })}
                                        className={`flex-1 p-6 rounded-2xl border text-3xl transition-all ${formData.satisfaction === emoji
                                                ? 'border-emerald-500 bg-emerald-500/10'
                                                : 'border-white/10 bg-white/5'
                                            }`}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={performAnalysis}
                                disabled={isCalculating}
                                className="w-full bg-emerald-500 text-slate-950 font-black py-5 rounded-2xl hover:bg-emerald-400 text-lg shadow-lg shadow-emerald-500/20"
                            >
                                {isCalculating ? 'Processing Strategy...' : 'Reveal My Savings'}
                            </button>
                        </div>
                    )}
                </div>

                <p className="mt-8 text-center text-white/30 text-xs">
                    Willy WiseBill &copy; 2026 • Not affiliated with any service provider.
                </p>
            </div>
        </div>
    );
}

