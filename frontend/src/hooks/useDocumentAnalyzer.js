import React from 'react'



export function useDocumentAnalyzer() {
  const [file, setFile] = React.useState(null)
  const [status, setStatus] = React.useState('idle')
  const [progress, setProgress] = React.useState(0)
  const [streamedText, setStreamedText] = React.useState('')
  const [alert, setAlert] = React.useState(null)

  const streamRef = React.useRef(null)
  const progressRef = React.useRef(null)

  const clearTimers = React.useCallback(() => {
    if (streamRef.current) {
      clearInterval(streamRef.current)
      streamRef.current = null
    }
    if (progressRef.current) {
      clearInterval(progressRef.current)
      progressRef.current = null
    }
  }, [])

  React.useEffect(() => () => clearTimers(), [clearTimers])

  const dismissAlert = React.useCallback(() => setAlert(null), [])

  const selectFile = React.useCallback((selectedFile) => {
    clearTimers()
    setStreamedText('')
    setProgress(0)
    setStatus('idle')

    if (!selectedFile) {
      setFile(null)
      return
    }

    setFile(selectedFile)
    setStatus('ready')
    setAlert({
      type: 'success',
      message: `"${selectedFile.name}" is ready to analyze.`,
    })
  }, [clearTimers])

  const clearFile = React.useCallback(() => {
    clearTimers()
    setFile(null)
    setStatus('idle')
    setProgress(0)
    setStreamedText('')
    setAlert({
      type: 'success',
      message: 'File removed. Upload a new PDF to continue.',
    })
  }, [clearTimers])

  const rejectFile = React.useCallback((message) => {
    clearTimers()
    setFile(null)
    setStatus('idle')
    setProgress(0)
    setStreamedText('')
    setAlert({ type: 'error', message })
  }, [clearTimers])

  const analyze = React.useCallback(async () => {
    if (!file) {
      setAlert({
        type: 'error',
        message: 'Please upload a PDF before analyzing.',
      })
      return
    }

    clearTimers()
    setAlert(null)
    setStreamedText('')
    setProgress(0)
    setStatus('analyzing')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://127.0.0.1:8000/api/upload/stream', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to analyze document.')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        const chunk = decoder.decode(value)

        setStreamedText((previous) => previous + chunk)
      }

      setProgress(100)
      setStatus("complete")

      setStatus('complete')

      setAlert({
        type: 'success',
        message: 'Document analyzed successfully.',
      })
    } catch (error) {
      console.error(error)

      setStatus('idle')

      setAlert({
        type: 'error',
        message: 'Something went wrong while analyzing the document.',
      })
    }
  }, [file, clearTimers])

  const isAnalyzing = status === 'analyzing'
  const canAnalyze = Boolean(file) && !isAnalyzing

  return {
    file,
    status,
    progress,
    streamedText,
    alert,
    isAnalyzing,
    canAnalyze,
    selectFile,
    clearFile,
    rejectFile,
    analyze,
    dismissAlert,
  }
}
