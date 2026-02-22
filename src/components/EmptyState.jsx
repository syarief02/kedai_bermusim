import { PackageOpen } from 'lucide-react'

export default function EmptyState({
  icon: Icon = PackageOpen,
  title = 'Tiada data',
  description = 'Belum ada maklumat di sini.',
  action,
  actionLabel,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-4 text-center kb-animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-[rgba(255,0,255,0.1)] border border-[rgba(255,0,255,0.2)] flex items-center justify-center">
        <Icon className="w-8 h-8 text-[var(--color-kb-magenta)]" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-kb-text)] mb-1">{title}</h3>
        <p className="kb-text-muted text-sm max-w-xs mx-auto">{description}</p>
      </div>
      {action && actionLabel && (
        <button onClick={action} className="kb-btn kb-btn-primary kb-btn-sm mt-2">
          {actionLabel}
        </button>
      )}
    </div>
  )
}
