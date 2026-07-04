import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

type SystemInfo = {
  torch_version: string
  cuda_available: boolean
  cuda_device_count: number
  cuda_device_name: string | null
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

function App() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadSystemInfo = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get<SystemInfo>(`${apiBaseUrl}/api/system`)
      setSystemInfo(response.data)
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : 'Failed to connect to backend'
      setSystemInfo(null)
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadSystemInfo()
  }, [loadSystemInfo])

  const statusLabel = error
    ? 'Disconnected'
    : isLoading
      ? 'Checking'
      : 'Connected'

  return (
    <main className="app-shell">
      <section className="status-panel">
        <div className="app-heading">
          <p className="eyebrow">LocalModelBuilder</p>
          <h1>Development Console</h1>
        </div>

        <div className={`connection connection-${statusLabel.toLowerCase()}`}>
          <span className="status-dot" aria-hidden="true" />
          <span>{statusLabel}</span>
        </div>

        <div className="summary-grid">
          <div className="metric">
            <span className="metric-label">Backend</span>
            <strong>{apiBaseUrl}</strong>
          </div>
          <div className="metric">
            <span className="metric-label">PyTorch</span>
            <strong>{systemInfo?.torch_version ?? '-'}</strong>
          </div>
          <div className="metric">
            <span className="metric-label">CUDA</span>
            <strong>{systemInfo?.cuda_available ? 'Available' : '-'}</strong>
          </div>
          <div className="metric">
            <span className="metric-label">GPU</span>
            <strong>{systemInfo?.cuda_device_name ?? '-'}</strong>
          </div>
        </div>

        {error ? <p className="message error-message">{error}</p> : null}
        {isLoading ? <p className="message">Checking backend status...</p> : null}

        <button type="button" onClick={loadSystemInfo} disabled={isLoading}>
          Refresh
        </button>
      </section>

      <section className="workspace-preview">
        <div>
          <h2>Model Workspace</h2>
          <p>
            Backend connectivity is ready for the visual model builder workflow.
          </p>
        </div>
        <div className="node-map" aria-hidden="true">
          <span className="node input-node">Input</span>
          <span className="node hidden-node">Linear</span>
          <span className="node output-node">Output</span>
        </div>
      </section>
    </main>
  )
}

export default App
