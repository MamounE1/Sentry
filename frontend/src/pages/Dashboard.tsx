import { useState } from 'react'
import type { Asset, NewAsset } from '../types/asset'
import type { Theme } from '../hooks/useTheme'
import { StatCard } from '../components/dashboard/StatCard'
import { AssetBarChart } from '../components/dashboard/AssetBarChart'
import { AddStockModal } from '../components/AddStockModal'
import { RemoveHoldingModal } from '../components/RemoveHoldingModal'

interface DashboardProps {
  assets: Asset[]
  loading: boolean
  theme: Theme
  onAddAsset: (asset: NewAsset) => Promise<void>
  onRemoveShares: (assetId: number, sharesToRemove: number) => Promise<void>
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function Dashboard({ assets, loading, theme, onAddAsset, onRemoveShares }: DashboardProps) {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [removeModalOpen, setRemoveModalOpen] = useState(false)

  const totalValue = assets.reduce((sum, a) => sum + a.quantity * a.purchasePrice, 0)
  const totalShares = assets.reduce((sum, a) => sum + a.quantity, 0)

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Your Portfolio
          </h1>
          <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
            An overview of the stocks you've added.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {assets.length > 0 && (
            <button
              type="button"
              onClick={() => setRemoveModalOpen(true)}
              className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              Remove Holding
            </button>
          )}
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white hover:bg-navy-700 dark:bg-navy-300 dark:text-navy-900 dark:hover:bg-navy-100"
          >
            Add Stock
          </button>
        </div>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
          Loading your portfolio…
        </p>
      ) : assets.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-xl border border-dashed border-neutral-300 bg-white p-12 text-center dark:border-neutral-700 dark:bg-neutral-900">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No holdings yet — add your first stock to get started.
          </p>
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white hover:bg-navy-700 dark:bg-navy-300 dark:text-navy-900 dark:hover:bg-navy-100"
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
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={onAddAsset}
      />

      <RemoveHoldingModal
        open={removeModalOpen}
        assets={assets}
        onClose={() => setRemoveModalOpen(false)}
        onSubmit={onRemoveShares}
      />
    </div>
  )
}
