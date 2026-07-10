import { useEffect, useState } from 'react'
import { Layout } from './components/layout/Layout'
import { AuthPage } from './pages/AuthPage'
import { Dashboard } from './pages/Dashboard'
import { useTheme } from './hooks/useTheme'
import { useAuth } from './hooks/useAuth'
import { fetchAssets, createAsset, updateAsset, deleteAsset } from './api/assets'
import type { Asset, NewAsset } from './types/asset'

function App() {
  const { theme, toggleTheme } = useTheme()
  const { email, isAuthenticated, login, signup, logout } = useAuth()
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      setAssets([])
      setLoading(false)
      return
    }
    setLoading(true)
    fetchAssets()
      .then(setAssets)
      .catch(() => setAssets([]))
      .finally(() => setLoading(false))
  }, [isAuthenticated])

  async function handleAddAsset(newAsset: NewAsset) {
    const created = await createAsset(newAsset)
    setAssets((prev) => [...prev, created])
  }

  async function handleRemoveShares(assetId: number, sharesToRemove: number) {
    const asset = assets.find((a) => a.id === assetId)
    if (!asset) return

    if (sharesToRemove >= asset.quantity) {
      await deleteAsset(assetId)
      setAssets((prev) => prev.filter((a) => a.id !== assetId))
    } else {
      const updated = await updateAsset(assetId, {
        ...asset,
        quantity: asset.quantity - sharesToRemove,
      })
      setAssets((prev) => prev.map((a) => (a.id === assetId ? updated : a)))
    }
  }

  if (!isAuthenticated) {
    return <AuthPage onLogin={login} onSignup={signup} />
  }

  return (
    <Layout
      theme={theme}
      onToggleTheme={toggleTheme}
      title="Dashboard"
      userEmail={email}
      onSignOut={logout}
    >
      <Dashboard
        assets={assets}
        loading={loading}
        theme={theme}
        onAddAsset={handleAddAsset}
        onRemoveShares={handleRemoveShares}
      />
    </Layout>
  )
}

export default App
