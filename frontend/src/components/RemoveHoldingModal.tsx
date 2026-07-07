import { useEffect, useState } from 'react'
import type { Asset } from '../types/asset'

interface RemoveHoldingModalProps {
  open: boolean
  assets: Asset[]
  onClose: () => void
  onSubmit: (assetId: number, sharesToRemove: number) => Promise<void>
}

const inputClasses =
  'mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-navy-600 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-navy-300'

export function RemoveHoldingModal({ open, assets, onClose, onSubmit }: RemoveHoldingModalProps) {
  const [selectedId, setSelectedId] = useState<number | null>(assets[0]?.id ?? null)
  const [sharesToRemove, setSharesToRemove] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedAsset = assets.find((a) => a.id === selectedId) ?? null

  // Re-sync the selection and default quantity whenever the modal opens or the holding list shifts.
  useEffect(() => {
    if (!open) return
    const stillExists = assets.some((a) => a.id === selectedId)
    const next = stillExists ? selectedId : (assets[0]?.id ?? null)
    setSelectedId(next)
    const nextAsset = assets.find((a) => a.id === next)
    setSharesToRemove(nextAsset ? String(nextAsset.quantity) : '')
    setError(null)
    // Only re-sync on open/close transitions, not on every assets/selectedId change.
  }, [open])

  if (!open) return null

  const shares = Number(sharesToRemove)
  const isValid =
    selectedAsset !== null &&
    sharesToRemove.trim().length > 0 &&
    Number.isFinite(shares) &&
    shares > 0

  const willDeleteEntirely = selectedAsset !== null && shares >= selectedAsset.quantity

  function handleClose() {
    setError(null)
    onClose()
  }

  function handleSelectAsset(id: number) {
    setSelectedId(id)
    const asset = assets.find((a) => a.id === id)
    setSharesToRemove(asset ? String(asset.quantity) : '')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || selectedAsset === null) return

    setIsSubmitting(true)
    setError(null)
    try {
      await onSubmit(selectedAsset.id, shares)
      handleClose()
    } catch {
      setError('Something went wrong removing this holding. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Remove Holding
        </h2>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Holding
            </label>
            <select
              value={selectedId ?? ''}
              onChange={(e) => handleSelectAsset(Number(e.target.value))}
              className={inputClasses}
            >
              {assets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.symbol} — {asset.name} ({asset.quantity} shares)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Shares to remove
            </label>
            <input
              type="number"
              min="0"
              step="any"
              max={selectedAsset?.quantity}
              value={sharesToRemove}
              onChange={(e) => setSharesToRemove(e.target.value)}
              className={inputClasses}
            />
            <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
              {willDeleteEntirely
                ? 'This removes the entire holding.'
                : `Leaves ${selectedAsset ? (selectedAsset.quantity - (Number.isFinite(shares) ? shares : 0)).toString() : ''} shares.`}
            </p>
          </div>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-500 dark:hover:bg-red-400"
            >
              {isSubmitting ? 'Removing…' : willDeleteEntirely ? 'Remove Holding' : 'Remove Shares'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
