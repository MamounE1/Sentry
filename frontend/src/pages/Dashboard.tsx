import { useState } from 'react'
import type { Asset, NewAsset } from '../types/asset'
import type { Theme } from '../hooks/useTheme'
import { StatCard } from '../components/dashboard/StatCard'
import { AssetBarChart } from '../components/dashboard/AssetBarChart'
import { AddStockModal } from '../components/AddStockModal'

interface DashboardProps {
  assets: Asset[]
  loading: boolean
  theme: Theme
  onAddAsset: (asset: NewAsset) => Promise<void>
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function Dashboard({ assets, loading, theme, onAddAsset }: DashboardProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const totalValue = assets.reduce((sum, a) => sum + a.quantity * a.purchasePrice, 0)
  const totalShares = assets.reduce((sum, a) => sum + a.quantity, 0)

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-400 dark:text-gray-950 dark:hover:bg-blue-300"
        >
          Add Stock
        </button>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Loading your portfolio…
        </p>
      ) : assets.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No holdings yet — add your first stock to get started.
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-400 dark:text-gray-950 dark:hover:bg-blue-300"
          >
            Add Stock
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Total Portfolio Value" value={currencyFormatter.format(totalValue)} />
            <StatCard label="Number of Holdings" value={String(assets.length)} />
            <StatCard label="Total Shares" value={totalShares.toLocaleString()} />
          </div>

          <div className="mt-6">
            <AssetBarChart data={assets} theme={theme} />
          </div>
        </>
      )}

      <AddStockModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={onAddAsset}
      />
    </div>
  )
}
