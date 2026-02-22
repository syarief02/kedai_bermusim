import { useState, useEffect, useCallback } from 'react'
import { supabase, isDemoMode } from '../lib/supabase'

// Demo user for when Supabase isn't configured
const DEMO_USER = {
    id: 'demo-user-001',
    email: 'demo@kedaibermusim.my',
    user_metadata: { display_name: 'Ibu Demo' },
    is_admin: true // Make demo user an admin by default so owner can see demo admin page
}

export function useAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (isDemoMode) {
            // Auto-login in demo mode
            setUser(DEMO_USER)
            setLoading(false)
            return
        }

        const fetchProfile = async (sessionUser) => {
            if (!sessionUser) {
                setUser(null)
                setLoading(false)
                return
            }
            // Fetch profile to get is_admin flag
            const { data, error } = await supabase
                .from('profiles')
                .select('is_admin, display_name')
                .eq('id', sessionUser.id)
                .single()

            setUser({
                ...sessionUser,
                is_admin: data?.is_admin || false,
                display_name: data?.display_name || sessionUser.user_metadata?.display_name
            })
            setLoading(false)
        }

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            fetchProfile(session?.user)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            fetchProfile(session?.user)
        })

        return () => subscription.unsubscribe()
    }, [])

    const signUp = useCallback(async (email, password, displayName) => {
        if (isDemoMode) {
            setUser(DEMO_USER)
            return { error: null }
        }

        setError(null)
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { display_name: displayName },
            },
        })
        if (error) setError(error.message)
        return { error }
    }, [])

    const signIn = useCallback(async (email, password) => {
        if (isDemoMode) {
            setUser(DEMO_USER)
            return { error: null }
        }

        setError(null)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) setError(error.message)
        return { error }
    }, [])

    const signOut = useCallback(async () => {
        if (isDemoMode) {
            setUser(null)
            return
        }

        await supabase.auth.signOut()
        setUser(null)
    }, [])

    return { user, loading, error, signUp, signIn, signOut, isDemoMode }
}
