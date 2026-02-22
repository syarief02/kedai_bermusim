import { Component } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 px-4 text-center min-h-[50vh]">
          <div className="w-16 h-16 rounded-full bg-[rgba(255,68,68,0.1)] border border-[rgba(255,68,68,0.3)] flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-[var(--color-kb-danger)]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-kb-text)] mb-1">
              Alamak! Ada masalah 😅
            </h3>
            <p className="kb-text-muted text-sm max-w-xs mx-auto">
              Sesuatu tidak kena. Sila cuba semula.
            </p>
          </div>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null })
              window.location.reload()
            }}
            className="kb-btn kb-btn-secondary kb-btn-sm mt-2"
          >
            <RefreshCw className="w-4 h-4" />
            Cuba Semula
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
