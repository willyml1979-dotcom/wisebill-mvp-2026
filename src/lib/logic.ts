/**
 * WiseBill Core Logic - Deterministic Tier Ranking
 * 
 * Mapping for Canadian Data Tiers:
 * 1: Under 15GB
 * 2: 15GB to 40GB
 * 3: 40GB to 75GB
 * 4: 75GB to 150GB
 * 5: Over 150GB
 */

export type DataRank = 1 | 2 | 3 | 4 | 5;

export type UsageStepDown = 'Much less' | 'Half' | 'Most/Over';

/**
 * Mappings for usage profiles to rank reduction
 */
const STEP_DOWN_MAP: Record<UsageStepDown, number> = {
    'Much less': 2,
    'Half': 1,
    'Most/Over': 0,
};

/**
 * Calculates the effective tier rank based on current tier and usage profile.
 * Formula: Math.max(1, current_rank - reduction)
 * 
 * @param currentRank The rank of the user's current plan (1-5)
 * @param usageProfile The user's reported usage profile
 * @returns The target rank to search for (1-5)
 */
export function calculateEffectiveRank(
    currentRank: DataRank,
    usageProfile: UsageStepDown
  ): DataRank {
    const reduction = STEP_DOWN_MAP[usageProfile];
    const effectiveRank = Math.max(1, currentRank - reduction);
    return effectiveRank as DataRank;
}

/**
 * Helper to get Rank from GB value (useful for seeding or input mapping)
 */
export function getRankFromData(gb: number): DataRank {
    if (gb < 15) return 1;
    if (gb < 40) return 2;
    if (gb < 75) return 3;
    if (gb < 150) return 4;
    return 5;
}

/**
 * Logic for Savings Calculation
 * (Precio_Usuario - Precio_Referencia) * 12
 */
export function calculateAnnualSavings(
    userMonthlyPrice: number,
    bestDealMonthlyPrice: number
  ): number {
    return (userMonthlyPrice - bestDealMonthlyPrice) * 12;
}
