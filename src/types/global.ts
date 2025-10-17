// Global TypeScript types for Vantage Lane 2.0

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'elite';
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
