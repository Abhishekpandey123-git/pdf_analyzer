import { useRef, useState } from 'react'
import Button from './ui/Button'
import { isPdfFile } from '../utils/fileValidation'

export default function FileDropzone({ onFileSelect, onInvalidFile, disabled = false }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = (fileList) => {
    const selectedFile = fileList?.[0]
    if (!selectedFile) return

    if (!isPdfFile(selectedFile)) {
      onInvalidFile?.('Only PDF files are supported. Please choose a .pdf file.')
      return
    }

    onFileSelect(selectedFile)
  }

  const onDragOver = (event) => {
    event.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const onDragLeave = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const onDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    if (disabled) return
    handleFiles(event.dataTransfer.files)
  }

  const onInputChange = (event) => {
    handleFiles(event.target.files)
    event.target.value = ''
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={[
          'relative flex min-h-[220px] flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          isDragging
            ? 'border-indigo-400 bg-indigo-50'
            : 'border-slate-300 bg-slate-50/80 hover:border-indigo-300 hover:bg-indigo-50/40',
        ].join(' ')}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(event) => {
          if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
            event.preventDefault()
            inputRef.current?.click()
          }
        }}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload PDF by clicking or dragging a file here"
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
          <svg className="h-7 w-7 text-indigo-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 16V8m0 0l-3 3m3-3l3 3M4 16.5V18a2 2 0 002 2h12a2 2 0 002-2v-1.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="text-base font-medium text-slate-900">
          {isDragging ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
        </p>
        <p className="mt-1 text-sm text-slate-500">or click to browse from your device</p>
        <p className="mt-3 text-xs text-slate-400">PDF only · Max recommended size 10 MB</p>

        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={onInputChange}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="secondary"
          className="w-full sm:w-auto"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          Upload PDF
        </Button>
      </div>
    </div>
  )
}
