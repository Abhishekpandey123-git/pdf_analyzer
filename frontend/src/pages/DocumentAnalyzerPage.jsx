import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import FileDropzone from '../components/FileDropzone'
import FilePreview from '../components/FilePreview'
import PageHeader from '../components/PageHeader'
import StreamingOutput from '../components/StreamingOutput'
import { useDocumentAnalyzer } from '../hooks/useDocumentAnalyzer'

export default function DocumentAnalyzerPage() {
  const {
    file,
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
  } = useDocumentAnalyzer()

  return (
    <div className="min-h-screen">
      <PageHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {alert && (
          <div className="mb-6">
            <Alert type={alert.type} message={alert.message} onDismiss={dismissAlert} />
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <Card
            title="Upload Document"
            description="Select a PDF file to prepare it for AI-powered analysis."
          >
            <div className="space-y-5">
              <FileDropzone
                onFileSelect={selectFile}
                onInvalidFile={rejectFile}
                disabled={isAnalyzing}
              />

              <FilePreview file={file} onRemove={clearFile} disabled={isAnalyzing} />

              {(isAnalyzing || progress > 0) && (
                <ProgressBar
                  value={progress}
                  label={isAnalyzing ? 'Analyzing document...' : 'Analysis progress'}
                />
              )}

              <Button
                size="lg"
                className="w-full"
                disabled={!canAnalyze}
                onClick={analyze}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Document'}
              </Button>
            </div>
          </Card>

          <Card
            title="Live Results"
            description="AI-generated insights will appear here as they stream in."
            className="lg:min-h-[520px]"
          >
            <StreamingOutput
              text={streamedText}
              isStreaming={isAnalyzing}
              placeholder="Your analysis will stream here after you click Analyze Document."
            />
          </Card>
        </div>
      </main>
    </div>
  )
}
