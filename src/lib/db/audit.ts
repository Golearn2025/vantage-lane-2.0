import { createClient } from '@supabase/supabase-js'

import { env } from '@/lib/env'
import { log } from '@/lib/logger'

// Server-only Supabase client for audit logs
const supabaseAdmin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  },
)

export type AuditAction =
  | 'user.login'
  | 'user.logout'
  | 'user.register'
  | 'booking.create'
  | 'booking.update'
  | 'booking.cancel'
  | 'payment.create'
  | 'payment.success'
  | 'payment.failed'
  | 'admin.action'

export interface AuditLogEntry {
  action: AuditAction
  user_id?: string
  user_email?: string
  resource_type?: string
  resource_id?: string
  ip_address?: string
  user_agent?: string
  metadata?: Record<string, unknown>
  created_at?: string
}

/**
 * Create an audit log entry
 */
export async function createAuditLog(entry: AuditLogEntry): Promise<void> {
  try {
    const { error } = await supabaseAdmin.from('audit_logs').insert({
      ...entry,
      created_at: entry.created_at || new Date().toISOString(),
    })

    if (error) {
      log.error('Failed to create audit log', error, { entry })
      return
    }

    log.debug('Audit log created', { action: entry.action, userId: entry.user_id })
  } catch (error) {
    log.error('Audit log creation failed', error, { entry })
  }
}

/**
 * Get audit logs for a user (admin only)
 */
export async function getUserAuditLogs(userId: string, limit = 50) {
  try {
    const { data, error } = await supabaseAdmin
      .from('audit_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      log.error('Failed to fetch user audit logs', error, { userId })
      return []
    }

    return data || []
  } catch (error) {
    log.error('User audit logs fetch failed', error, { userId })
    return []
  }
}

/**
 * Get recent audit logs (admin dashboard)
 */
export async function getRecentAuditLogs(limit = 100) {
  try {
    const { data, error } = await supabaseAdmin
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      log.error('Failed to fetch recent audit logs', error)
      return []
    }

    return data || []
  } catch (error) {
    log.error('Recent audit logs fetch failed', error)
    return []
  }
}
