import { useState, useEffect, useCallback } from 'react'

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

export function useChildren() {
    const [children, setChildren] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setChildren(loadChildren())
        setLoading(false)
    }, [])

    const addChild = useCallback((child) => {
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
    }, [])

    const updateChild = useCallback((id, updates) => {
        setChildren(prev => {
            const updated = prev.map(c => c.id === id ? { ...c, ...updates } : c)
            saveChildren(updated)
            return updated
        })
    }, [])

    const removeChild = useCallback((id) => {
        setChildren(prev => {
            const updated = prev.filter(c => c.id !== id)
            saveChildren(updated)
            return updated
        })
    }, [])

    return { children, loading, addChild, updateChild, removeChild }
}
