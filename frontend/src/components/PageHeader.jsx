export default function PageHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            AI Document Analyzer
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Upload. Analyze. Understand.
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Drop a PDF, run analysis, and watch AI insights stream in real time.
          </p>
        </div>

        <div className="hidden rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 sm:block">
          Standalone module
        </div>
      </div>
    </header>
  )
}
