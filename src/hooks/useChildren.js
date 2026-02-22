import { useState, useEffect, useCallback } from 'react'
import { supabase, isDemoMode } from '../lib/supabase'

const STORAGE_KEY = 'kedai_bermusim_children'

// Local storage management for children (works in demo mode too)
function loadChildren() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

function saveChildren(children) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(children))
}

export function useChildren(user) {
    const [children, setChildren] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isDemoMode) {
            setChildren(loadChildren())
            setLoading(false)
            return
        }

        if (!user) {
            setChildren([])
            setLoading(false)
            return
        }

        const fetchChildren = async () => {
            const { data, error } = await supabase
                .from('children')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: true })

            if (!error && data) {
                setChildren(data)
            }
            setLoading(false)
        }

        fetchChildren()
    }, [user])

    const addChild = useCallback(async (child) => {
        if (isDemoMode) {
            const newChild = {
                ...child,
                id: `child-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                createdAt: new Date().toISOString(),
            }
            setChildren(prev => {
                const updated = [...prev, newChild]
                saveChildren(updated)
                return updated
            })
            return newChild
        }

        if (!user) return null

        const { data, error } = await supabase
            .from('children')
            .insert([{ ...child, user_id: user.id }])
            .select()
            .single()

        if (!error && data) {
            setChildren(prev => [...prev, data])
            return data
        }
        return null
    }, [user])

    const updateChild = useCallback(async (id, updates) => {
        if (isDemoMode) {
            setChildren(prev => {
                const updated = prev.map(c => c.id === id ? { ...c, ...updates } : c)
                saveChildren(updated)
                return updated
            })
            return
        }

        if (!user) return

        const { error } = await supabase
            .from('children')
            .update(updates)
            .eq('id', id)
            .eq('user_id', user.id)

        if (!error) {
            setChildren(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
        }
    }, [user])

    const removeChild = useCallback(async (id) => {
        if (isDemoMode) {
            setChildren(prev => {
                const updated = prev.filter(c => c.id !== id)
                saveChildren(updated)
                return updated
            })
            return
        }

        if (!user) return

        const { error } = await supabase
            .from('children')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id)

        if (!error) {
            setChildren(prev => prev.filter(c => c.id !== id))
        }
    }, [user])

    return { children, loading, addChild, updateChild, removeChild }
}
