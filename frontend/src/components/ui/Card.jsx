export default function Card({ title, description, children, className = '' }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6 ${className}`}
    >
      {(title || description) && (
        <header className="mb-5">
          {title && <h2 className="text-lg font-semibold text-slate-900">{title}</h2>}
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </header>
      )}
      {children}
    </section>
  )
}
