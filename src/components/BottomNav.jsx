import { Home, ShoppingBag, Bell, Store, User } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Utama', icon: Home },
  { id: 'checklist', label: 'Senarai', icon: ShoppingBag },
  { id: 'reminders', label: 'Peringatan', icon: Bell },
  { id: 'catalog', label: 'Katalog', icon: Store },
  { id: 'profile', label: 'Profil', icon: User },
]

export default function BottomNav({ currentPage, onNavigate }) {
  return (
    <nav className="kb-nav">
      <div className="kb-nav-inner">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`kb-nav-item ${currentPage === item.id ? 'active' : ''}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
