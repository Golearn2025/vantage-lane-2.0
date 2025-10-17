import { createClient } from '@supabase/supabase-js';

import { log } from '@/lib/logger';

export interface HealthCheck {
  name: string;
  status: 'healthy' | 'unhealthy' | 'degraded';
  responseTime: number;
  error?: string;
  details?: Record<string, unknown>;
}

export interface HealthReport {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  uptime: number;
  version: string;
  checks: HealthCheck[];
}

/**
 * Check Supabase database connectivity
 */
async function checkDatabase(): Promise<HealthCheck> {
  const start = Date.now();

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_KEY || '',
      { auth: { autoRefreshToken: false, persistSession: false } },
    );

    // Simple query to test connectivity
    const { error } = await supabase.from('profiles').select('count').limit(1).single();

    const responseTime = Date.now() - start;

    if (error && !error.message.includes('No rows found')) {
      return {
        name: 'database',
        status: 'unhealthy',
        responseTime,
        error: error.message,
      };
    }

    return {
      name: 'database',
      status: responseTime < 1000 ? 'healthy' : 'degraded',
      responseTime,
      details: { connected: true },
    };
  } catch (error) {
    return {
      name: 'database',
      status: 'unhealthy',
      responseTime: Date.now() - start,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check Redis connectivity (if configured)
 */
async function checkRedis(): Promise<HealthCheck> {
  const start = Date.now();

  if (!process.env.UPSTASH_REDIS_REST_URL) {
    return {
      name: 'redis',
      status: 'degraded',
      responseTime: 0,
      details: { configured: false },
    };
  }

  try {
    const { Redis } = await import('@upstash/redis');
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    await redis.ping();
    const responseTime = Date.now() - start;

    return {
      name: 'redis',
      status: responseTime < 500 ? 'healthy' : 'degraded',
      responseTime,
    };
  } catch (error) {
    return {
      name: 'redis',
      status: 'unhealthy',
      responseTime: Date.now() - start,
      error: error instanceof Error ? error.message : 'Redis error',
    };
  }
}

/**
 * Check external services (Stripe & Google Maps)
 */
async function checkExternalServices(): Promise<HealthCheck[]> {
  const checks = await Promise.allSettled([
    fetch('https://api.stripe.com/v1/account', {
      headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY || ''}` },
    }),
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=London&key=${process.env.GOOGLE_MAPS_API_KEY || ''}`,
    ),
  ]);

  return [
    {
      name: 'stripe',
      status: checks[0].status === 'fulfilled' && checks[0].value.ok ? 'healthy' : 'unhealthy',
      responseTime: 0,
    },
    {
      name: 'googlemaps',
      status: checks[1].status === 'fulfilled' && checks[1].value.ok ? 'healthy' : 'unhealthy',
      responseTime: 0,
    },
  ];
}

/**
 * Perform comprehensive health check
 */
export async function performHealthCheck(): Promise<HealthReport> {
  const startTime = Date.now();

  log.info('Starting health check');

  // Run all checks in parallel
  const basicChecks = await Promise.all([checkDatabase(), checkRedis()]);

  const externalChecks = await checkExternalServices();
  const allChecks = [...basicChecks, ...externalChecks];

  // Determine overall status
  const hasUnhealthy = allChecks.some((check: HealthCheck) => check.status === 'unhealthy');
  const hasDegraded = allChecks.some((check: HealthCheck) => check.status === 'degraded');

  let overallStatus: 'healthy' | 'unhealthy' | 'degraded';
  if (hasUnhealthy) {
    overallStatus = 'unhealthy';
  } else if (hasDegraded) {
    overallStatus = 'degraded';
  } else {
    overallStatus = 'healthy';
  }

  const report: HealthReport = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.APP_VERSION || '1.0.0',
    checks: allChecks,
  };

  const duration = Date.now() - startTime;
  log.info('Health check completed', {
    status: overallStatus,
    duration,
    checksCount: allChecks.length,
  });

  return report;
}

/**
 * Quick liveness check (for load balancers)
 */
export async function livenessCheck(): Promise<{
  status: 'ok' | 'error';
  timestamp: string;
}> {
  try {
    // Basic checks - process is running, memory usage reasonable
    const memUsage = process.memoryUsage();
    const isHealthy = memUsage.heapUsed < 512 * 1024 * 1024; // Less than 512MB

    if (!isHealthy) {
      log.warn('Liveness check failed - high memory usage', { memUsage });
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
      };
    }

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    log.error('Liveness check failed', error);
    return {
      status: 'error',
      timestamp: new Date().toISOString(),
    };
  }
}
