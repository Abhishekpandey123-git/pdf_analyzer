const PDF_MIME_TYPE = 'application/pdf'
const PDF_EXTENSION = '.pdf'

export function isPdfFile(file) {
  if (!file) return false

  const hasPdfMime = file.type === PDF_MIME_TYPE
  const hasPdfExtension = file.name.toLowerCase().endsWith(PDF_EXTENSION)

  return hasPdfMime || hasPdfExtension
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'

  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const size = bytes / 1024 ** index

  return `${size.toFixed(index === 0 ? 0 : 1)} ${units[index]}`
}
