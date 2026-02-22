import { useState, useEffect, useCallback } from 'react'

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
export function useChecklist() {
    const [checkedItems, setCheckedItems] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setCheckedItems(loadChecklist())
        setLoading(false)
    }, [])

    const toggleItem = useCallback((childId, itemId) => {
        setCheckedItems(prev => {
            const childChecks = prev[childId] || {}
            const updated = {
                ...prev,
                [childId]: {
                    ...childChecks,
                    [itemId]: !childChecks[itemId],
                },
            }
            saveChecklist(updated)
            return updated
        })
    }, [])

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
