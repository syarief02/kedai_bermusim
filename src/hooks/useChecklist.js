import { useState, useEffect, useCallback } from 'react'
import { supabase, isDemoMode } from '../lib/supabase'

const STORAGE_KEY = 'kedai_bermusim_checklist'

function loadChecklist() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : {}
    } catch {
        return {}
    }
}

function saveChecklist(checklist) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist))
}

/**
 * Manages checked state of checklist items per child
 * Structure: { [childId]: { [itemId]: boolean } }
 */
export function useChecklist(user) {
    const [checkedItems, setCheckedItems] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isDemoMode) {
            setCheckedItems(loadChecklist())
            setLoading(false)
            return
        }

        if (!user) {
            setCheckedItems({})
            setLoading(false)
            return
        }

        const fetchChecklist = async () => {
            const { data, error } = await supabase
                .from('checklist_items')
                .select('*')
                .eq('user_id', user.id)

            if (!error && data) {
                // Transform into { childId: { itemId: isChecked } } format
                const formatted = {}
                data.forEach(row => {
                    if (!formatted[row.child_id]) {
                        formatted[row.child_id] = {}
                    }
                    formatted[row.child_id][row.item_id] = row.is_checked
                })
                setCheckedItems(formatted)
            }
            setLoading(false)
        }

        fetchChecklist()
    }, [user])

    const toggleItem = useCallback(async (childId, itemId) => {
        setCheckedItems(prev => {
            const childChecks = prev[childId] || {}
            const isCurrentlyChecked = childChecks[itemId] || false
            const updated = {
                ...prev,
                [childId]: {
                    ...childChecks,
                    [itemId]: !isCurrentlyChecked,
                },
            }

            if (isDemoMode) {
                saveChecklist(updated)
            }

            return updated
        })

        if (!isDemoMode && user) {
            // Get current state to negate
            const childChecks = checkedItems[childId] || {}
            const isCurrentlyChecked = childChecks[itemId] || false

            // Upsert the checked state
            const { error: upsertError } = await supabase
                .from('checklist_items')
                .upsert(
                    { user_id: user.id, child_id: childId, item_id: itemId, is_checked: !isCurrentlyChecked },
                    { onConflict: 'child_id,item_id' }
                )

            if (upsertError) {
                console.error("Failed to sync checklist item:", upsertError)
            }
        }
    }, [user, checkedItems])

    const getProgress = useCallback((childId, totalItems) => {
        const childChecks = checkedItems[childId] || {}
        const checked = Object.values(childChecks).filter(Boolean).length
        return {
            checked,
            total: totalItems,
            percentage: totalItems > 0 ? Math.round((checked / totalItems) * 100) : 0,
        }
    }, [checkedItems])

    const isItemChecked = useCallback((childId, itemId) => {
        return !!checkedItems[childId]?.[itemId]
    }, [checkedItems])

    return { checkedItems, loading, toggleItem, getProgress, isItemChecked }
}
