import { REMINDER_TYPES, isActiveReminder, formatDateMY, getRelativeTime } from '../utils/reminderData'
import { Clock, CalendarDays } from 'lucide-react'

const BADGE_MAP = {
  magenta: 'kb-badge-magenta',
  cyan: 'kb-badge-cyan',
  success: 'kb-badge-success',
  warning: 'kb-badge-warning',
  danger: 'kb-badge-danger',
}

export default function ReminderCard({ reminder }) {
  const type = REMINDER_TYPES[reminder.type]
  const active = isActiveReminder(reminder)
  const badgeClass = BADGE_MAP[type.color] || 'kb-badge-magenta'

  return (
    <div className={`kb-card ${active ? 'kb-card-magenta' : ''}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{
          background: active
            ? 'rgba(255,0,255,0.15)'
            : 'rgba(255,255,255,0.05)',
          border: active
            ? '1px solid rgba(255,0,255,0.3)'
            : '1px solid var(--color-kb-border)',
        }}>
          {type.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`kb-badge ${badgeClass}`}>{type.label}</span>
            {active && (
              <span className="kb-badge kb-badge-success">AKTIF</span>
            )}
            {reminder.priority === 'high' && (
              <span className="kb-badge kb-badge-danger">PENTING</span>
            )}
          </div>

          <h3 className="font-semibold text-sm text-[var(--color-kb-text)] mb-1">
            {reminder.title}
          </h3>
          <p className="text-xs text-[var(--color-kb-text-muted)] mb-2">
            {reminder.description}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 text-xs text-[var(--color-kb-text-muted)]">
              <CalendarDays className="w-3 h-3" />
              {formatDateMY(reminder.date)}
              {reminder.endDate && ` — ${formatDateMY(reminder.endDate)}`}
            </div>
            <div className="flex items-center gap-1 text-xs font-medium" style={{
              color: active ? 'var(--color-kb-success)' : 'var(--color-kb-magenta)',
            }}>
              <Clock className="w-3 h-3" />
              {getRelativeTime(reminder.date)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
