import { useState } from 'react'
import type { NewAsset } from '../types/asset'

interface AddStockModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (asset: NewAsset) => Promise<void>
}

const emptyForm = { symbol: '', name: '', quantity: '', purchasePrice: '' }

const inputClasses =
  'mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-navy-600 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-navy-300'

export function AddStockModal({ open, onClose, onSubmit }: AddStockModalProps) {
  const [form, setForm] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  const quantity = Number(form.quantity)
  const purchasePrice = Number(form.purchasePrice)
  const isValid =
    form.symbol.trim().length > 0 &&
    form.name.trim().length > 0 &&
    form.quantity.trim().length > 0 &&
    Number.isFinite(quantity) &&
    quantity > 0 &&
    form.purchasePrice.trim().length > 0 &&
    Number.isFinite(purchasePrice) &&
    purchasePrice > 0

  function handleClose() {
    setForm(emptyForm)
    setError(null)
    onClose()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return

    setIsSubmitting(true)
    setError(null)
    try {
      await onSubmit({
        symbol: form.symbol.trim().toUpperCase(),
        name: form.name.trim(),
        quantity,
        purchasePrice,
      })
      handleClose()
    } catch {
      setError('Something went wrong saving this stock. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Add Stock</h2>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Symbol
            </label>
            <input
              type="text"
              value={form.symbol}
              onChange={(e) => setForm({ ...form, symbol: e.target.value })}
              placeholder="AAPL"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Apple Inc."
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Quantity
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              placeholder="10"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Purchase price
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={form.purchasePrice}
              onChange={(e) => setForm({ ...form, purchasePrice: e.target.value })}
              placeholder="150.00"
              className={inputClasses}
            />
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
              className="rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-navy-300 dark:text-navy-900 dark:hover:bg-navy-100"
            >
              {isSubmitting ? 'Saving…' : 'Add Stock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
