import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Detect placeholder / missing values → run in demo mode
const isPlaceholder =
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl.includes('your-project') ||
    supabaseAnonKey.includes('your_anon_key')

if (isPlaceholder) {
    console.warn(
        '⚠️ Supabase credentials not configured. Running in demo mode.\n' +
        'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
    )
}

export const supabase = !isPlaceholder
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export const isDemoMode = !supabase
