import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
    const config = useRuntimeConfig()

    const supabase = createClient(
        config.public.supabaseUrl,
        config.public.supabaseAnonKey
    )

    return supabase
}

export const useSupabaseAdmin = () => {
    const config = useRuntimeConfig()

    const supabase = createClient(
        config.public.supabaseUrl,
        config.supabaseServiceKey
    )

    return supabase
}
