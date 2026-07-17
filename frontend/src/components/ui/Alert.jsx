const styles = {
  success: {
    container: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    icon: 'text-emerald-500',
  },
  error: {
    container: 'border-red-200 bg-red-50 text-red-900',
    icon: 'text-red-500',
  },
  info: {
    container: 'border-sky-200 bg-sky-50 text-sky-900',
    icon: 'text-sky-500',
  },
}

function AlertIcon({ type }) {
  if (type === 'error') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
          clipRule="evenodd"
        />
      </svg>
    )
  }

  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function Alert({ type = 'info', message, onDismiss }) {
  if (!message) return null

  const style = styles[type] ?? styles.info

  return (
    <div
      role="alert"
      className={`animate-fade-in flex items-start gap-3 rounded-xl border px-4 py-3 ${style.container}`}
    >
      <span className={style.icon}>
        <AlertIcon type={type} />
      </span>
      <p className="flex-1 text-sm leading-6">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-md p-1 text-current/70 transition hover:text-current"
          aria-label="Dismiss message"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </div>
  )
}
