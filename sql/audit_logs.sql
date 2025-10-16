-- ====================================
-- AUDIT LOGS TABLE FOR VANTAGE LANE 2.0
-- ====================================
-- This table stores all user actions and system events for monitoring and compliance
-- Run this SQL in your Supabase SQL editor

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Action details
  action TEXT NOT NULL, -- e.g. 'user.login', 'booking.create', 'payment.success'
  
  -- User context
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  
  -- Resource context (optional)
  resource_type TEXT, -- e.g. 'booking', 'payment', 'user'
  resource_id TEXT,   -- ID of the affected resource
  
  -- Request context
  ip_address INET,
  user_agent TEXT,
  
  -- Additional metadata (JSON)
  metadata JSONB,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

-- Create composite index for user activity queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_activity 
  ON audit_logs(user_id, created_at DESC) 
  WHERE user_id IS NOT NULL;

-- Enable Row Level Security (RLS)
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Only service role can insert audit logs
CREATE POLICY "Service role can insert audit logs" 
  ON audit_logs FOR INSERT 
  WITH CHECK (auth.role() = 'service_role');

-- RLS Policy: Admins can read all audit logs
CREATE POLICY "Admins can read all audit logs" 
  ON audit_logs FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policy: Users can read their own audit logs
CREATE POLICY "Users can read own audit logs" 
  ON audit_logs FOR SELECT 
  USING (auth.uid() = user_id);

-- Optional: Create a function to clean old audit logs (older than 1 year)
CREATE OR REPLACE FUNCTION cleanup_old_audit_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM audit_logs 
  WHERE created_at < NOW() - INTERVAL '1 year';
END;
$$;

-- Optional: Create a scheduled job to run cleanup monthly
-- (You can set this up in Supabase Dashboard > Database > Cron Jobs)
-- SELECT cron.schedule('cleanup-audit-logs', '0 0 1 * *', 'SELECT cleanup_old_audit_logs();');

COMMENT ON TABLE audit_logs IS 'Stores all user actions and system events for monitoring and compliance';
COMMENT ON COLUMN audit_logs.action IS 'Action performed, e.g. user.login, booking.create, payment.success';
COMMENT ON COLUMN audit_logs.metadata IS 'Additional JSON data related to the action';
COMMENT ON COLUMN audit_logs.resource_type IS 'Type of resource affected (booking, payment, user, etc.)';
COMMENT ON COLUMN audit_logs.resource_id IS 'ID of the affected resource';

-- ====================================
-- END OF AUDIT LOGS SETUP
-- ====================================
