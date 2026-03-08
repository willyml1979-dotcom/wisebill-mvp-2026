import React from 'react';

interface SavingsCardProps {
    annualSavings: number;
    bestPlan: {
        provider: string;
        price: number;
        data_gb: number;
    };
}

/**
 * Premium Glassmorphism Card for displaying savings.
 * Uses Tailwind CSS with backdrop-blur and subtle gradients.
 */
export const SavingsCard: React.FC<SavingsCardProps> = ({ annualSavings, bestPlan }) => {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl transition-all hover:scale-[1.02] hover:bg-white/15">
            {/* Subtle background glow */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px]" />

            <div className="relative z-10 flex flex-col gap-6">
                <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-white/60">
                        Estimated Impact
                    </h3>
                    <p className="mt-2 text-5xl font-bold tracking-tight text-white">
                        You could save <span className="text-emerald-400">${annualSavings}</span>
                    </p>
                    <p className="text-lg text-white/80">Every single year</p>
                </div>

                <div className="h-px w-full bg-white/10" />

                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase text-white/40">Best Alternative Found</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">{bestPlan.provider}</span>
                            <span className="text-white/60">|</span>
                            <span className="text-lg font-medium text-white/90">${bestPlan.price}/mo</span>
                        </div>
                        <span className="text-sm text-white/60">{bestPlan.data_gb}GB High Speed Data</span>
                    </div>

                    <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-emerald-400">
                        View Details
                    </button>
                </div>

                <p className="text-[10px] text-white/30 italic">
                    "Expert advisor. We are not affiliated with any provider."
                </p>
            </div>
        </div>
    );
};
