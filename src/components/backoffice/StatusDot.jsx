const COLORS = {
  active: '#43a77c',
  warning: '#f59e0b',
  error: '#ef4444',
  offline: '#9ca3af',
  maintenance: '#f59e0b',
  synced: '#43a77c',
  pending: '#f59e0b',
  failed: '#ef4444',
}

export default function StatusDot({ status = 'active' }) {
  return (
    <span
      className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
      style={{ backgroundColor: COLORS[status] || COLORS.offline }}
    />
  )
}
