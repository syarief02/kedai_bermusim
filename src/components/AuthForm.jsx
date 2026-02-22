import { useState } from 'react'
import { Mail, Lock, User, LogIn, UserPlus, Star, Eye, EyeOff } from 'lucide-react'

export default function AuthForm({ onSignIn, onSignUp, error, loading }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      onSignIn(email, password)
    } else {
      onSignUp(email, password, displayName)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{
      background: 'linear-gradient(135deg, #000 0%, #1a0020 50%, #000 100%)'
    }}>
      <div className="w-full max-w-md">
        {/* Logo & Branding */}
        <div className="text-center mb-8 kb-animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 kb-magenta-glow" style={{
            background: 'linear-gradient(135deg, rgba(255,0,255,0.2), rgba(0,255,255,0.1))',
            border: '2px solid rgba(255,0,255,0.4)',
          }}>
            <span className="text-4xl">🏪</span>
          </div>
          <h1 className="kb-title text-3xl mb-2 kb-magenta-text-glow">
            KEDAI BERMUSIM
          </h1>
          <p className="kb-text-muted">
            ★ Senarai belanja sekolah anak anda ★
          </p>
        </div>

        {/* Auth Card */}
        <div className="kb-card kb-card-magenta kb-animate-fade-in">
          {/* Toggle */}
          <div className="flex mb-6 rounded-lg overflow-hidden" style={{
            background: 'var(--color-kb-dark)',
            border: '1px solid var(--color-kb-border)',
          }}>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                isLogin
                  ? 'bg-[var(--color-kb-magenta)] text-black'
                  : 'text-[var(--color-kb-text-muted)] hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Log Masuk
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                !isLogin
                  ? 'bg-[var(--color-kb-magenta)] text-black'
                  : 'text-[var(--color-kb-text-muted)] hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Daftar
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <div>
                <label className="kb-label">Nama Paparan</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-kb-text-muted)]" />
                  <input
                    type="text"
                    className="kb-input pl-10"
                    placeholder="Cth: Ibu Sarah"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="kb-label">Emel</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-kb-text-muted)]" />
                <input
                  type="email"
                  className="kb-input pl-10"
                  placeholder="ibu@contoh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="kb-label">Kata Laluan</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-kb-text-muted)]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="kb-input pl-10 pr-10"
                  placeholder="Minimum 6 aksara"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-kb-text-muted)] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-3 py-2 rounded-lg text-sm" style={{
                background: 'rgba(255,68,68,0.1)',
                border: '1px solid rgba(255,68,68,0.3)',
                color: 'var(--color-kb-danger)',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="kb-btn kb-btn-primary kb-btn-lg w-full mt-2"
            >
              {loading ? (
                <span className="animate-spin">⟳</span>
              ) : isLogin ? (
                <>
                  <LogIn className="w-4 h-4" />
                  Log Masuk
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Daftar Akaun
                </>
              )}
            </button>
          </form>

          {/* Features list */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--color-kb-border)' }}>
            <p className="kb-text-muted text-xs text-center mb-3">★ Apa yang anda dapat:</p>
            <ul className="kb-star-list flex flex-col gap-1">
              <li className="text-xs text-[var(--color-kb-text-muted)]">Senarai belanja ikut darjah anak</li>
              <li className="text-xs text-[var(--color-kb-text-muted)]">Peringatan musim pendaftaran sekolah</li>
              <li className="text-xs text-[var(--color-kb-text-muted)]">Katalog produk dengan harga terbaik</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-xs text-[var(--color-kb-text-muted)]">
          🏪 Kedai Bermusim © 2026 — Untuk ibu bapa Malaysia
        </p>
      </div>
    </div>
  )
}
