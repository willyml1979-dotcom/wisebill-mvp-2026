import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Standard Supabase client for frontend/shared use.
 * Ensure environment variables are set in .env.local
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Type definitions for the database schema
 */
export type MobilePlan = {
      id: string;
      provider_name: string;
      price: number;
      data_gb: number;
      tier_rank: 1 | 2 | 3 | 4 | 5;
      plan_type: string;
      is_active: boolean;
      created_at: string;
};

export type UserQuery = {
      id: string;
      current_provider?: string;
      current_price?: number;
      current_tier_rank?: number;
      usage_profile?: string;
      calculated_savings?: number;
      effective_tier_used?: number;
      created_at: string;
};
