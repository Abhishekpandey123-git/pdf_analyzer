import { useEffect, useRef } from 'react'
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function StreamingOutput({ text, isStreaming, placeholder }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [text])

  const isEmpty = !text

  return (
    <div className="flex h-full min-h-[320px] flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-700">Analysis Output</h3>
        {isStreaming && (
          <span className="inline-flex items-center gap-2 text-xs font-medium text-indigo-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
            </span>
            Streaming...
          </span>
        )}
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-sm leading-relaxed text-slate-100"
        aria-live="polite"
        aria-busy={isStreaming}
      >
        {isEmpty ? (
          <p className="text-slate-500">{placeholder}</p>
        ) : (
            <pre className="whitespace-pre-wrap break-words">
              {text}
            </pre>
        )}
      </div>
    </div>
  )
}
