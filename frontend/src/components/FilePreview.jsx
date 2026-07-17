import { formatFileSize } from '../utils/fileValidation'
import Button from './ui/Button'

export default function FilePreview({ file, onRemove, disabled = false }) {
  if (!file) return null

  return (
    <div className="animate-fade-in rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
          <span className="text-xs font-bold">PDF</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-900">{file.name}</p>
          <p className="mt-0.5 text-xs text-slate-500">{formatFileSize(file.size)}</p>
        </div>

        <Button
          variant="danger"
          size="md"
          disabled={disabled}
          onClick={onRemove}
          aria-label={`Remove ${file.name}`}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}
