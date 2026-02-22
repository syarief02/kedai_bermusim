import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useChildren } from './hooks/useChildren'
import { useChecklist } from './hooks/useChecklist'
import AuthForm from './components/AuthForm'
import BottomNav from './components/BottomNav'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'
import DashboardPage from './pages/DashboardPage'
import ChecklistPage from './pages/ChecklistPage'
import RemindersPage from './pages/RemindersPage'
import CatalogPage from './pages/CatalogPage'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  const { user, loading: authLoading, error: authError, signIn, signUp, signOut, isDemoMode } = useAuth()
  const { children, loading: childrenLoading, addChild, removeChild } = useChildren()
  const { checkedItems, loading: checklistLoading, toggleItem, getProgress, isItemChecked } = useChecklist()
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedChild, setSelectedChild] = useState(null)

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        background: 'linear-gradient(135deg, #000 0%, #1a0020 50%, #000 100%)'
      }}>
        <div className="text-center">
          <div className="text-5xl mb-4">🏪</div>
          <h1 className="kb-title text-2xl mb-4 kb-magenta-text-glow">KEDAI BERMUSIM</h1>
          <LoadingSpinner text="Sedang memuatkan..." />
        </div>
      </div>
    )
  }

  // Show auth form if not logged in
  if (!user) {
    return (
      <AuthForm
        onSignIn={signIn}
        onSignUp={signUp}
        error={authError}
        loading={authLoading}
      />
    )
  }

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage
            user={user}
            children={children}
            getProgress={getProgress}
            onNavigate={setCurrentPage}
            isDemoMode={isDemoMode}
          />
        )
      case 'checklist':
        return (
          <ChecklistPage
            children={children}
            selectedChild={selectedChild}
            onSelectChild={setSelectedChild}
            toggleItem={toggleItem}
            getProgress={getProgress}
            isItemChecked={isItemChecked}
            onAddChild={addChild}
            onNavigate={setCurrentPage}
          />
        )
      case 'reminders':
        return <RemindersPage />
      case 'catalog':
        return (
          <CatalogPage
            children={children}
            selectedChild={selectedChild}
          />
        )
      case 'profile':
        return (
          <ProfilePage
            user={user}
            children={children}
            onAddChild={addChild}
            onRemoveChild={removeChild}
            onSignOut={signOut}
            getProgress={getProgress}
            isDemoMode={isDemoMode}
          />
        )
      default:
        return null
    }
  }

  return (
    <ErrorBoundary>
      <div className="kb-page">
        {renderPage()}
        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>
    </ErrorBoundary>
  )
}
