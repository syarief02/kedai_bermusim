import { useState, useEffect } from 'react'
import { Users, Baby, CheckCircle, ShieldAlert, BarChart3, AlertCircle } from 'lucide-react'
import { supabase, isDemoMode } from '../lib/supabase'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'

export default function AdminPage({ user }) {
  const [stats, setStats] = useState({ users: 0, children: 0, checklistItems: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isDemoMode) {
      setStats({
        users: 1,
        children: JSON.parse(localStorage.getItem('kedai_bermusim_children') || '[]').length,
        checklistItems: Object.keys(JSON.parse(localStorage.getItem('kedai_bermusim_checklist') || '{}')).length
      })
      setLoading(false)
      return
    }

    if (!user?.is_admin) {
      setError("Unauthorized. You shouldn't be here.")
      setLoading(false)
      return
    }

    const fetchStats = async () => {
      try {
        setLoading(true)
        
        // Count users (profiles)
        const { count: usersCount, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
        if (usersError) throw usersError

        // Count children
        const { count: childrenCount, error: childrenError } = await supabase
          .from('children')
          .select('*', { count: 'exact', head: true })
        if (childrenError) throw childrenError

        // Count checklist items
        const { count: checklistCount, error: checklistError } = await supabase
          .from('checklist_items')
          .select('*', { count: 'exact', head: true })
        if (checklistError) throw checklistError

        setStats({
          users: usersCount || 0,
          children: childrenCount || 0,
          checklistItems: checklistCount || 0
        })
      } catch (err) {
        console.error("Admin fetch error:", err)
        setError("Gagal memuatkan data pentadbir.")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user])

  if (loading) {
    return (
      <div className="kb-container py-12 flex justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !user?.is_admin) {
    return (
      <div className="kb-container py-6">
        <EmptyState
          icon={AlertCircle}
          title="Akses Ditolak"
          description={error || "Hanya pentadbir yang sah dibenarkan masuk ke halaman ini."}
        />
      </div>
    )
  }

  return (
    <div className="kb-container py-6 kb-animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 text-[var(--color-kb-magenta)]">
        <ShieldAlert className="w-6 h-6" />
        <h1 className="kb-title text-xl">DASHBOARD PENTADBIR</h1>
      </div>

      <p className="kb-text-muted text-sm mb-6">
        Gambaran keseluruhan data platform Kedai Bermusim.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="kb-card">
          <div className="flex items-center gap-2 mb-3 text-[var(--color-kb-text-muted)]">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold">Pengguna</span>
          </div>
          <div className="text-3xl font-black font-['Impact'] kb-text-glow">
            {stats.users}
          </div>
        </div>

        <div className="kb-card">
          <div className="flex items-center gap-2 mb-3 text-[var(--color-kb-text-muted)]">
            <Baby className="w-5 h-5 text-pink-400" />
            <span className="text-sm font-semibold">Anak Daftar</span>
          </div>
          <div className="text-3xl font-black font-['Impact'] kb-magenta-text-glow">
            {stats.children}
          </div>
        </div>

        <div className="kb-card col-span-2">
          <div className="flex items-center gap-2 mb-3 text-[var(--color-kb-text-muted)]">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold">Interaksi Senarai</span>
          </div>
          <div className="text-3xl font-black font-['Impact'] kb-text-glow">
            {stats.checklistItems}
          </div>
        </div>
      </div>

      {/* Info Notice */}
      <div className="kb-card kb-card-magenta flex flex-col items-center text-center">
        <BarChart3 className="w-8 h-8 mb-3 text-[var(--color-kb-magenta)]" />
        <h3 className="font-semibold text-sm mb-2">Platform Sihat & Aktif</h3>
        <p className="text-xs text-[var(--color-kb-text-muted)]">
          Pastikan anda sentiasa memantau pangkalan data di Supabase untuk memastikan Row Level Security (RLS) dikuatkuasakan dengan betul.
        </p>
      </div>
    </div>
  )
}
