import { useState } from 'react'
import { UserPlus, X, GraduationCap } from 'lucide-react'
import { DARJAH_LEVELS } from '../utils/checklistData'

export default function AddChildForm({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const [darjah, setDarjah] = useState(1)
  const [school, setSchool] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      name: name.trim(),
      darjah: Number(darjah),
      school: school.trim(),
    })
    setName('')
    setDarjah(1)
    setSchool('')
    if (onClose) onClose()
  }

  return (
    <div className="kb-overlay" onClick={onClose}>
      <div className="kb-modal" onClick={e => e.stopPropagation()}>
        <div className="kb-modal-header">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[var(--color-kb-magenta)]" />
            <h2 className="font-semibold">Tambah Anak</h2>
          </div>
          <button onClick={onClose} className="text-[var(--color-kb-text-muted)] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="kb-modal-body flex flex-col gap-4">
          <div>
            <label className="kb-label">Nama Anak</label>
            <input
              type="text"
              className="kb-input"
              placeholder="Cth: Ahmad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label className="kb-label">Darjah</label>
            <select
              className="kb-select"
              value={darjah}
              onChange={(e) => setDarjah(e.target.value)}
            >
              {DARJAH_LEVELS.map(d => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="kb-label">Nama Sekolah (Pilihan)</label>
            <input
              type="text"
              className="kb-input"
              placeholder="Cth: SK Taman Melati"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
          </div>

          <div className="kb-modal-footer px-0 border-0">
            <button type="button" onClick={onClose} className="kb-btn kb-btn-ghost">
              Batal
            </button>
            <button type="submit" className="kb-btn kb-btn-primary">
              <UserPlus className="w-4 h-4" />
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
