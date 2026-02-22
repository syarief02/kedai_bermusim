import { GraduationCap, Trash2, School } from 'lucide-react'

export default function ChildCard({ child, onRemove, onSelect, progress }) {
  return (
    <div
      className="kb-card cursor-pointer group"
      onClick={() => onSelect && onSelect(child)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{
            background: 'linear-gradient(135deg, rgba(255,0,255,0.15), rgba(0,255,255,0.1))',
            border: '1px solid rgba(255,0,255,0.25)',
          }}>
            🧒
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-kb-text)]">{child.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="kb-badge kb-badge-magenta">
                <GraduationCap className="w-3 h-3" />
                Darjah {child.darjah}
              </span>
              {child.school && (
                <span className="kb-badge kb-badge-cyan">
                  <School className="w-3 h-3" />
                  {child.school}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove(child.id)
          }}
          className="text-[var(--color-kb-text-muted)] hover:text-[var(--color-kb-danger)] transition-colors opacity-0 group-hover:opacity-100"
          title="Padam"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      {progress && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--color-kb-text-muted)]">
              Belanja: {progress.checked}/{progress.total} item
            </span>
            <span className="text-xs font-semibold" style={{
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
    </div>
  )
}
