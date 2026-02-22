import { useMemo } from 'react'
import { Plus, ShoppingBag, Bell, Store, ChevronRight, Sparkles } from 'lucide-react'
import { getRemindersForYear, getUpcomingReminders, isActiveReminder } from '../utils/reminderData'
import { getChecklistForDarjah } from '../utils/checklistData'
import ReminderCard from '../components/ReminderCard'
import EmptyState from '../components/EmptyState'

export default function DashboardPage({ user, children, getProgress, onNavigate, isDemoMode }) {
  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Pengguna'
  const currentYear = new Date().getFullYear()

  // Get upcoming reminders
  const upcomingReminders = useMemo(() => {
    const allReminders = getRemindersForYear(currentYear)
    return getUpcomingReminders(allReminders).slice(0, 3)
  }, [currentYear])

  // Aggregate shopping progress across all children
  const shoppingStats = useMemo(() => {
    if (children.length === 0) return null
    let totalItems = 0
    let totalChecked = 0
    children.forEach(child => {
      const items = getChecklistForDarjah(child.darjah)
      const progress = getProgress(child.id, items.length)
      totalItems += items.length
      totalChecked += progress.checked
    })
    return {
      totalItems,
      totalChecked,
      percentage: totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0,
    }
  }, [children, getProgress])

  return (
    <div className="kb-container py-6 kb-animate-fade-in">
      {/* Hero / Welcome */}
      <div className="mb-6">
        {isDemoMode && (
          <div className="mb-3 px-3 py-2 rounded-lg text-xs" style={{
            background: 'rgba(255,170,0,0.1)',
            border: '1px solid rgba(255,170,0,0.3)',
            color: 'var(--color-kb-warning)',
          }}>
            ★ Mod Demo — Data disimpan di browser sahaja
          </div>
        )}
        <p className="kb-text-muted text-sm mb-1">Selamat datang kembali,</p>
        <h1 className="kb-title text-2xl kb-magenta-text-glow">
          {displayName} 👋
        </h1>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => onNavigate('checklist')}
          className="kb-card flex items-center gap-3 text-left"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
            background: 'rgba(255,0,255,0.15)',
            border: '1px solid rgba(255,0,255,0.3)',
          }}>
            <ShoppingBag className="w-5 h-5 text-[var(--color-kb-magenta)]" />
          </div>
          <div>
            <p className="text-sm font-semibold">Senarai</p>
            <p className="text-xs text-[var(--color-kb-text-muted)]">Belanja</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('catalog')}
          className="kb-card flex items-center gap-3 text-left"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
            background: 'rgba(0,255,255,0.1)',
            border: '1px solid rgba(0,255,255,0.25)',
          }}>
            <Store className="w-5 h-5 text-[var(--color-kb-cyan)]" />
          </div>
          <div>
            <p className="text-sm font-semibold">Katalog</p>
            <p className="text-xs text-[var(--color-kb-text-muted)]">Produk</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('reminders')}
          className="kb-card flex items-center gap-3 text-left"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
            background: 'rgba(0,255,136,0.1)',
            border: '1px solid rgba(0,255,136,0.25)',
          }}>
            <Bell className="w-5 h-5 text-[var(--color-kb-success)]" />
          </div>
          <div>
            <p className="text-sm font-semibold">Peringatan</p>
            <p className="text-xs text-[var(--color-kb-text-muted)]">Musim</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className="kb-card flex items-center gap-3 text-left"
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
            background: 'rgba(255,255,0,0.1)',
            border: '1px solid rgba(255,255,0,0.25)',
          }}>
            <Plus className="w-5 h-5 text-[var(--color-kb-yellow)]" />
          </div>
          <div>
            <p className="text-sm font-semibold">Tambah</p>
            <p className="text-xs text-[var(--color-kb-text-muted)]">Anak</p>
          </div>
        </button>
      </div>

      {/* Shopping Progress */}
      {shoppingStats && (
        <div className="kb-card kb-card-magenta mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--color-kb-magenta)]" />
              <h2 className="font-semibold text-sm">Progres Belanja</h2>
            </div>
            <span className="kb-badge kb-badge-magenta">
              {children.length} anak
            </span>
          </div>
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-bold text-[var(--color-kb-magenta)]">
              {shoppingStats.percentage}%
            </span>
            <span className="text-xs text-[var(--color-kb-text-muted)]">
              {shoppingStats.totalChecked}/{shoppingStats.totalItems} item
            </span>
          </div>
          <div className="kb-progress">
            <div className="kb-progress-bar" style={{ width: `${shoppingStats.percentage}%` }} />
          </div>
          <button
            onClick={() => onNavigate('checklist')}
            className="flex items-center gap-1 text-xs text-[var(--color-kb-magenta)] font-medium mt-3 hover:underline"
          >
            Lihat senarai penuh <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Children Summary */}
      {children.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-sm text-[var(--color-kb-text)]">Anak-anak Anda</h2>
            <span className="kb-text-muted text-xs">{children.length} didaftarkan</span>
          </div>
          <div className="flex flex-col gap-2">
            {children.map(child => {
              const items = getChecklistForDarjah(child.darjah)
              const progress = getProgress(child.id, items.length)
              return (
                <button
                  key={child.id}
                  onClick={() => onNavigate('checklist')}
                  className="kb-card flex items-center gap-3 text-left"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{
                    background: 'linear-gradient(135deg, rgba(255,0,255,0.15), rgba(0,255,255,0.1))',
                    border: '1px solid rgba(255,0,255,0.25)',
                  }}>
                    🧒
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{child.name}</p>
                    <p className="text-xs text-[var(--color-kb-text-muted)]">Darjah {child.darjah}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold" style={{
                      color: progress.percentage === 100 ? 'var(--color-kb-success)' : 'var(--color-kb-magenta)',
                    }}>
                      {progress.percentage}%
                    </p>
                    <p className="text-xs text-[var(--color-kb-text-muted)]">{progress.checked}/{progress.total}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* No children prompt */}
      {children.length === 0 && (
        <div className="mb-6">
          <EmptyState
            title="Belum ada anak didaftarkan"
            description="Tambah profil anak untuk mula menggunakan senarai belanja."
            action={() => onNavigate('profile')}
            actionLabel="★ Tambah Anak"
          />
        </div>
      )}

      {/* Upcoming Reminders */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm text-[var(--color-kb-text)]">Peringatan Akan Datang</h2>
          <button
            onClick={() => onNavigate('reminders')}
            className="text-xs text-[var(--color-kb-magenta)] font-medium hover:underline flex items-center gap-1"
          >
            Semua <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {upcomingReminders.map(reminder => (
            <ReminderCard key={reminder.id} reminder={reminder} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-xs text-[var(--color-kb-text-muted)]">
          🏪 Kedai Bermusim © {currentYear} — Untuk ibu bapa Malaysia
        </p>
      </div>
    </div>
  )
}
