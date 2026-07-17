export default function ProgressBar({ value = 0, label = 'Progress' }) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="tabular-nums text-slate-500">{Math.round(clampedValue)}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clampedValue)}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-300 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}
