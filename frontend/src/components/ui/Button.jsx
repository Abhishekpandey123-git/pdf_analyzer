const variants = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:ring-indigo-500 shadow-sm',
  secondary:
    'bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus-visible:ring-indigo-500',
  danger:
    'bg-white text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-50 focus-visible:ring-red-500',
}

const sizes = {
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-sm',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
