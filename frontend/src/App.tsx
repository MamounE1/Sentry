import { useEffect, useState } from 'react'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './pages/Dashboard'
import { useTheme } from './hooks/useTheme'
import { fetchAssets, createAsset } from './api/assets'
import type { Asset, NewAsset } from './types/asset'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAssets()
      .then(setAssets)
      .finally(() => setLoading(false))
  }, [])

  async function handleAddAsset(newAsset: NewAsset) {
    const created = await createAsset(newAsset)
    setAssets((prev) => [...prev, created])
  }

  return (
    <Layout theme={theme} onToggleTheme={toggleTheme}>
      <Dashboard assets={assets} loading={loading} theme={theme} onAddAsset={handleAddAsset} />
    </Layout>
  )
}

export default App
