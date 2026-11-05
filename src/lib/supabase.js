import { createClient } from '@supabase/supabase-js';

const CREDENTIALS_KEY = 'vishmi_supabase_credentials';

// Default Supabase project credentials pre-configured
export const DEFAULT_SUPABASE_URL = 'https://tpezbxwwylkaheuxefkd.supabase.co';
export const DEFAULT_SUPABASE_KEY = 'sb_publishable_p-iJk0NSEaKBH8ifpZslBQ_-jwuCfhM';

export const SUPABASE_SQL_SCRIPT = `-- Run this in your Supabase Project -> SQL Editor
create table if not exists portfolio_data (
  id text primary key,
  content jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table portfolio_data enable row level security;

-- Policy 1: Anyone can read portfolio data
drop policy if exists "Public read access" on portfolio_data;
create policy "Public read access"
  on portfolio_data for select
  using (true);

-- Policy 2: Allow insert/update with public anon key
drop policy if exists "Public upsert access" on portfolio_data;
create policy "Public upsert access"
  on portfolio_data for all
  using (true)
  with check (true);
`;

export function getStoredCredentials() {
  try {
    const raw = localStorage.getItem(CREDENTIALS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed reading Supabase credentials from storage', e);
  }

  // Check Vite env variables if set
  const envUrl = import.meta.env?.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';
  if (envUrl && envKey) {
    return { url: envUrl, anonKey: envKey };
  }

  // Fallback to pre-configured defaults
  return {
    url: DEFAULT_SUPABASE_URL,
    anonKey: DEFAULT_SUPABASE_KEY
  };
}

export function saveStoredCredentials(url, anonKey) {
  try {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() }));
  } catch (e) {
    console.error('Failed saving Supabase credentials', e);
  }
}

export function clearStoredCredentials() {
  localStorage.removeItem(CREDENTIALS_KEY);
}

let cachedClient = null;
let lastUrl = '';
let lastKey = '';

export function getSupabaseClient() {
  const { url, anonKey } = getStoredCredentials();
  if (!url || !anonKey) {
    return null;
  }

  if (cachedClient && lastUrl === url && lastKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey);
    lastUrl = url;
    lastKey = anonKey;
    return cachedClient;
  } catch (e) {
    console.error('Failed creating Supabase client', e);
    return null;
  }
}

// Test connection and table existence
export async function testSupabaseConnection(url, anonKey) {
  try {
    const client = createClient(url.trim(), anonKey.trim());
    const { data, error } = await client
      .from('portfolio_data')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === '42P01') {
        return {
          success: false,
          error: 'Connection reached Supabase, but table "portfolio_data" does not exist yet. Please run the SQL script in your Supabase SQL Editor.'
        };
      }
      return { success: false, error: error.message };
    }

    return { success: true, message: 'Connected successfully to Supabase database!' };
  } catch (e) {
    return { success: false, error: e.message || 'Network error connecting to Supabase.' };
  }
}

// Fetch single portfolio record with id = 'default'
export async function fetchPortfolioFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('portfolio_data')
      .select('content, updated_at')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetch error:', error.message);
      return null;
    }

    if (data && data.content) {
      return {
        content: data.content,
        updatedAt: data.updated_at
      };
    }
    return null;
  } catch (e) {
    console.warn('Supabase fetch failed:', e);
    return null;
  }
}

// Upsert portfolio data to Supabase
export async function savePortfolioToSupabase(content) {
  const client = getSupabaseClient();
  if (!client) return { success: false, error: 'Supabase client not configured.' };

  try {
    const { error } = await client
      .from('portfolio_data')
      .upsert({
        id: 'default',
        content,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) {
      console.error('Supabase save error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (e) {
    console.error('Supabase save exception:', e);
    return { success: false, error: e.message };
  }
}
