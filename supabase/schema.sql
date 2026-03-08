-- WiseBill Mobile Plans Schema

-- 1. Create table for mobile plans
CREATE TABLE IF NOT EXISTS mobile_plans (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      provider_name TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      data_gb INTEGER NOT NULL,
      tier_rank INTEGER NOT NULL CHECK (tier_rank BETWEEN 1 AND 5),
      plan_type TEXT NOT NULL DEFAULT 'Postpaid', -- Prepaid/Postpaid
    is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
  );

-- 2. Create table for user queries (tracking analysis)
CREATE TABLE IF NOT EXISTS user_queries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      current_provider TEXT,
      current_price DECIMAL(10, 2),
      current_tier_rank INTEGER,
      usage_profile TEXT, -- 'Much less', 'Half', 'Most/Over'
    calculated_savings DECIMAL(10, 2),
      effective_tier_used INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
  );

-- 3. Seed Data: 10 Real Canadian Mobile Plans
-- Based on early 2025 values for Rogers, Bell, Telus, Public Mobile, etc.

INSERT INTO mobile_plans (provider_name, price, data_gb, tier_rank, plan_type)
VALUES 
    ('Public Mobile', 23.00, 4, 1, 'Prepaid'),
    ('Public Mobile', 34.00, 20, 2, 'Prepaid'),
    ('Koodo', 40.00, 60, 3, 'Postpaid'),
    ('Fido', 40.00, 60, 3, 'Postpaid'),
    ('Freedom Mobile', 39.00, 70, 3, 'Postpaid'),
    ('Telus', 55.00, 100, 4, 'Postpaid'),
    ('Rogers', 85.00, 100, 4, 'Postpaid'),
    ('Bell', 70.00, 100, 4, 'Postpaid'),
    ('Rogers', 95.00, 250, 5, 'Postpaid'),
    ('Freedom Mobile', 59.00, 150, 4, 'Postpaid');
