import { useState } from 'react'
import { User, LogOut, Plus, Shield, Smartphone, Heart } from 'lucide-react'
import { getChecklistForDarjah } from '../utils/checklistData'
import ChildCard from '../components/ChildCard'
import AddChildForm from '../components/AddChildForm'
import EmptyState from '../components/EmptyState'

export default function ProfilePage({
  user,
  children,
  onAddChild,
  onRemoveChild,
  onSignOut,
  getProgress,
  isDemoMode,
}) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [confirmSignOut, setConfirmSignOut] = useState(false)

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Pengguna'
  const email = user?.email || 'demo@kedaibermusim.my'

  const handleRemoveChild = (childId) => {
    if (window.confirm('Padam profil anak ini? Data senarai belanja juga akan dipadam.')) {
      onRemoveChild(childId)
    }
  }

  return (
    <div className="kb-container py-6 kb-animate-fade-in">
      <h1 className="kb-title text-xl mb-6">★ PROFIL</h1>

      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="mb-4 px-3 py-2 rounded-lg text-xs" style={{
          background: 'rgba(255,170,0,0.1)',
          border: '1px solid rgba(255,170,0,0.3)',
          color: 'var(--color-kb-warning)',
        }}>
          ★ Mod Demo — Tambah Supabase credentials di <code className="font-mono">.env.local</code> untuk simpan data ke cloud
        </div>
      )}

      {/* User Card */}
      <div className="kb-card kb-card-magenta mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{
            background: 'linear-gradient(135deg, rgba(255,0,255,0.2), rgba(0,255,255,0.1))',
            border: '2px solid rgba(255,0,255,0.4)',
          }}>
            <User className="w-8 h-8 text-[var(--color-kb-magenta)]" />
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-lg truncate">{displayName}</h2>
            <p className="text-sm text-[var(--color-kb-text-muted)] truncate">{email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="kb-badge kb-badge-success">
                <Shield className="w-3 h-3" />
                Aktif
              </span>
              {children.length > 0 && (
                <span className="kb-badge kb-badge-magenta">
                  {children.length} anak
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Children Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm">Anak-anak</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="kb-btn kb-btn-primary kb-btn-sm"
          >
            <Plus className="w-4 h-4" />
            Tambah Anak
          </button>
        </div>

        {children.length > 0 ? (
          <div className="flex flex-col gap-2">
            {children.map(child => {
              const items = getChecklistForDarjah(child.darjah)
              const progress = getProgress(child.id, items.length)
              return (
                <ChildCard
                  key={child.id}
                  child={child}
                  onRemove={handleRemoveChild}
                  progress={progress}
                />
              )
            })}
          </div>
        ) : (
          <EmptyState
            title="Belum ada anak didaftarkan"
            description="Tambah profil anak untuk mula menggunakan senarai belanja mengikut darjah."
            action={() => setShowAddForm(true)}
            actionLabel="★ Tambah Anak"
          />
        )}
      </div>

      {/* App Info */}
      <div className="kb-card mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Smartphone className="w-4 h-4 text-[var(--color-kb-magenta)]" />
          <h3 className="font-semibold text-sm">Tentang App</h3>
        </div>
        <ul className="kb-star-list flex flex-col gap-2">
          <li className="text-xs text-[var(--color-kb-text-muted)]">Senarai belanja sekolah mengikut darjah</li>
          <li className="text-xs text-[var(--color-kb-text-muted)]">Peringatan pendaftaran & musim belanja</li>
          <li className="text-xs text-[var(--color-kb-text-muted)]">Katalog produk sekolah harga terbaik</li>
          <li className="text-xs text-[var(--color-kb-text-muted)]">Data disimpan selamat — RLS enabled</li>
        </ul>
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--color-kb-border)' }}>
          <div className="flex items-center gap-1 text-xs text-[var(--color-kb-text-muted)]">
            <Heart className="w-3 h-3 text-[var(--color-kb-magenta)]" />
            Dibina dengan ❤️ untuk ibu bapa Malaysia
          </div>
          <p className="text-xs text-[var(--color-kb-text-muted)] mt-1">Versi 1.0.0 — © 2026</p>
        </div>
      </div>

      {/* Sign Out */}
      <div className="mt-4">
        {!confirmSignOut ? (
          <button
            onClick={() => setConfirmSignOut(true)}
            className="kb-btn kb-btn-ghost w-full"
          >
            <LogOut className="w-4 h-4" />
            Log Keluar
          </button>
        ) : (
          <div className="kb-card text-center">
            <p className="text-sm mb-3">Pasti mahu log keluar?</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setConfirmSignOut(false)}
                className="kb-btn kb-btn-ghost kb-btn-sm"
              >
                Batal
              </button>
              <button
                onClick={onSignOut}
                className="kb-btn kb-btn-danger kb-btn-sm"
              >
                <LogOut className="w-4 h-4" />
                Ya, Log Keluar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Child Modal */}
      {showAddForm && (
        <AddChildForm
          onAdd={onAddChild}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  )
}
