import { useMemo, useState } from 'react'
import { Bell, CalendarDays, Filter } from 'lucide-react'
import { getRemindersForYear, getUpcomingReminders, isActiveReminder, REMINDER_TYPES } from '../utils/reminderData'
import ReminderCard from '../components/ReminderCard'

const FILTERS = [
  { id: 'all', label: '🌟 Semua' },
  { id: 'active', label: '🔴 Aktif' },
  { id: 'registration', label: '📝 Pendaftaran' },
  { id: 'shopping', label: '🛒 Belanja' },
  { id: 'exam', label: '📝 Peperiksaan' },
  { id: 'school', label: '🏫 Sekolah' },
]

export default function RemindersPage() {
  const currentYear = new Date().getFullYear()
  const [activeFilter, setActiveFilter] = useState('all')
  const [showPast, setShowPast] = useState(false)

  const allReminders = useMemo(() => getRemindersForYear(currentYear), [currentYear])
  const upcomingReminders = useMemo(() => getUpcomingReminders(allReminders), [allReminders])

  const pastReminders = useMemo(() => {
    const now = new Date().getTime()
    return allReminders
      .filter(r => {
        const endDate = r.endDate ? new Date(r.endDate) : new Date(r.date)
        return endDate.getTime() < now
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [allReminders])

  // Apply filter
  const filteredUpcoming = useMemo(() => {
    if (activeFilter === 'all') return upcomingReminders
    if (activeFilter === 'active') return upcomingReminders.filter(r => isActiveReminder(r))
    return upcomingReminders.filter(r => r.type === activeFilter)
  }, [upcomingReminders, activeFilter])

  const filteredPast = useMemo(() => {
    if (activeFilter === 'all') return pastReminders
    if (activeFilter === 'active') return [] // no active in past
    return pastReminders.filter(r => r.type === activeFilter)
  }, [pastReminders, activeFilter])

  const activeCount = useMemo(() => allReminders.filter(r => isActiveReminder(r)).length, [allReminders])

  return (
    <div className="kb-container py-6 kb-animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="kb-title text-xl">★ PERINGATAN</h1>
        {activeCount > 0 && (
          <span className="kb-badge kb-badge-success">
            {activeCount} aktif
          </span>
        )}
      </div>

      <p className="kb-text-muted text-sm mb-4">
        Takwim penting untuk ibu bapa — pendaftaran sekolah, musim belanja, dan peperiksaan.
      </p>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
        {FILTERS.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`kb-btn kb-btn-sm whitespace-nowrap ${
              activeFilter === filter.id
                ? 'kb-btn-primary'
                : 'kb-btn-ghost'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Timeline — Current Year */}
      <div className="flex items-center gap-2 mb-3">
        <CalendarDays className="w-4 h-4 text-[var(--color-kb-magenta)]" />
        <h2 className="font-semibold text-sm">Akan Datang — {currentYear}</h2>
        <span className="kb-badge kb-badge-magenta">{filteredUpcoming.length}</span>
      </div>

      {filteredUpcoming.length > 0 ? (
        <div className="flex flex-col gap-2 mb-6">
          {filteredUpcoming.map(reminder => (
            <ReminderCard key={reminder.id} reminder={reminder} />
          ))}
        </div>
      ) : (
        <div className="kb-card mb-6 text-center py-8">
          <Bell className="w-8 h-8 text-[var(--color-kb-text-muted)] mx-auto mb-2" />
          <p className="kb-text-muted text-sm">Tiada peringatan untuk filter ini</p>
        </div>
      )}

      {/* Past Reminders */}
      <button
        onClick={() => setShowPast(!showPast)}
        className="w-full kb-btn kb-btn-ghost kb-btn-sm mb-3"
      >
        {showPast ? 'Sembunyikan' : 'Papar'} peringatan lepas ({filteredPast.length})
      </button>

      {showPast && filteredPast.length > 0 && (
        <div className="flex flex-col gap-2 opacity-60">
          {filteredPast.map(reminder => (
            <ReminderCard key={reminder.id} reminder={reminder} />
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-6 px-3 py-3 rounded-lg text-center" style={{
        background: 'rgba(255,0,255,0.05)',
        border: '1px solid rgba(255,0,255,0.15)',
      }}>
        <p className="text-xs text-[var(--color-kb-text-muted)]">
          ★ Takwim berdasarkan kalendar sekolah KPM {currentYear}
        </p>
      </div>
    </div>
  )
}
