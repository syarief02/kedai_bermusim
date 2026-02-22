import { useState, useMemo } from 'react'
import { ShoppingBag, ExternalLink, ChevronDown } from 'lucide-react'
import { getChecklistForDarjah, SUPPLY_CATEGORIES, getTotalEstimate } from '../utils/checklistData'
import { formatPrice } from '../utils/productData'
import EmptyState from '../components/EmptyState'

export default function ChecklistPage({
  children,
  selectedChild,
  onSelectChild,
  toggleItem,
  getProgress,
  isItemChecked,
  onAddChild,
  onNavigate,
}) {
  const [expandedCategory, setExpandedCategory] = useState(null)

  // Auto-select first child if none selected
  const activeChild = selectedChild || children[0] || null

  // Get checklist items for the active child's darjah
  const items = useMemo(() => {
    if (!activeChild) return []
    return getChecklistForDarjah(activeChild.darjah)
  }, [activeChild])

  // Group items by category
  const grouped = useMemo(() => {
    const groups = {}
    items.forEach(item => {
      if (!groups[item.category]) groups[item.category] = []
      groups[item.category].push(item)
    })
    return groups
  }, [items])

  const progress = activeChild ? getProgress(activeChild.id, items.length) : null
  const totalEstimate = getTotalEstimate(items)

  // No children — show empty state
  if (children.length === 0) {
    return (
      <div className="kb-container py-6">
        <h1 className="kb-title text-xl mb-6">★ SENARAI BELANJA</h1>
        <EmptyState
          icon={ShoppingBag}
          title="Tambah anak dahulu"
          description="Daftarkan anak anda untuk melihat senarai belanja mengikut darjah."
          action={() => onNavigate('profile')}
          actionLabel="★ Tambah Anak"
        />
      </div>
    )
  }

  return (
    <div className="kb-container py-6 kb-animate-fade-in">
      <h1 className="kb-title text-xl mb-4">★ SENARAI BELANJA</h1>

      {/* Child Selector */}
      {children.length > 1 && (
        <div className="mb-4">
          <select
            className="kb-select"
            value={activeChild?.id || ''}
            onChange={(e) => {
              const child = children.find(c => c.id === e.target.value)
              onSelectChild(child)
            }}
          >
            {children.map(child => (
              <option key={child.id} value={child.id}>
                {child.name} — Darjah {child.darjah}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Active child info */}
      {activeChild && (
        <div className="kb-card kb-card-magenta mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{
              background: 'linear-gradient(135deg, rgba(255,0,255,0.15), rgba(0,255,255,0.1))',
              border: '1px solid rgba(255,0,255,0.25)',
            }}>
              🧒
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">{activeChild.name}</h2>
              <p className="text-xs text-[var(--color-kb-text-muted)]">
                Darjah {activeChild.darjah} {activeChild.school ? `· ${activeChild.school}` : ''}
              </p>
            </div>
          </div>

          {/* Progress */}
          {progress && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-[var(--color-kb-text-muted)]">
                  {progress.checked}/{progress.total} item dibeli
                </span>
                <span className="text-sm font-bold" style={{
                  color: progress.percentage === 100 ? 'var(--color-kb-success)' : 'var(--color-kb-magenta)',
                }}>
                  {progress.percentage}%
                </span>
              </div>
              <div className="kb-progress">
                <div className="kb-progress-bar" style={{ width: `${progress.percentage}%` }} />
              </div>
            </div>
          )}

          {/* Estimated total */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-[var(--color-kb-text-muted)]">Anggaran jumlah:</span>
            <span className="text-sm font-bold text-[var(--color-kb-cyan)]">
              ~{formatPrice(totalEstimate)}
            </span>
          </div>
        </div>
      )}

      {/* Checklist grouped by category */}
      <div className="flex flex-col gap-2">
        {Object.entries(SUPPLY_CATEGORIES).map(([catId, catLabel]) => {
          const catItems = grouped[catId]
          if (!catItems || catItems.length === 0) return null

          const isExpanded = expandedCategory === catId || expandedCategory === null
          const catChecked = catItems.filter(item => isItemChecked(activeChild.id, item.id)).length

          return (
            <div key={catId} className="kb-card">
              {/* Category header */}
              <button
                className="w-full flex items-center justify-between"
                onClick={() => setExpandedCategory(expandedCategory === catId ? null : catId)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{catLabel}</span>
                  <span className="kb-badge kb-badge-magenta">
                    {catChecked}/{catItems.length}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[var(--color-kb-text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {/* Category items */}
              {isExpanded && (
                <div className="mt-3 flex flex-col gap-2">
                  {catItems.map(item => {
                    const checked = isItemChecked(activeChild.id, item.id)
                    return (
                      <div
                        key={item.id}
                        className={`flex items-start gap-3 p-2 rounded-lg transition-all ${checked ? 'opacity-60' : ''}`}
                        style={{
                          background: checked ? 'rgba(0,255,136,0.05)' : 'transparent',
                        }}
                      >
                        <input
                          type="checkbox"
                          className="kb-checkbox mt-0.5"
                          checked={checked}
                          onChange={() => toggleItem(activeChild.id, item.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${checked ? 'line-through text-[var(--color-kb-text-muted)]' : 'text-[var(--color-kb-text)]'}`}>
                            {item.name}
                          </p>
                          {item.note && (
                            <p className="text-xs text-[var(--color-kb-text-muted)] mt-0.5 italic">
                              {item.note}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            {item.price > 0 && (
                              <span className="text-xs font-medium text-[var(--color-kb-cyan)]">
                                ~{formatPrice(item.price)}
                              </span>
                            )}
                            {item.price === 0 && (
                              <span className="kb-badge kb-badge-success text-[0.6rem]">Percuma</span>
                            )}
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-[var(--color-kb-magenta)] hover:underline"
                              onClick={e => e.stopPropagation()}
                            >
                              <ExternalLink className="w-3 h-3" />
                              Beli
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
