'use client'

import { useState } from 'react'
import { createInventoryItem } from './actions'
import { calculatePrice } from '@/lib/pricing'
import { generateQRDataUrl } from '@/lib/qr'
import type { ProductType } from '../../../generated/prisma'

type Props = { products: ProductType[] }

export default function AddItemForm({ products }: Props) {
  const [selectedId, setSelectedId] = useState('')
  const [weight, setWeight] = useState('')
  const [preview, setPreview] = useState<{ price: number; qrUrl: string; itemId: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const selected = products.find(p => p.id === selectedId)

  const livePrice = selected
    ? (() => {
        try {
          return calculatePrice({
            pricingMode: selected.pricingMode as 'per_weight' | 'fixed',
            pricePerUnit: Number(selected.price),
            weight: weight ? parseFloat(weight) : null,
          })
        } catch { return null }
      })()
    : null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selected) return
    setLoading(true)
    const fd = new FormData()
    fd.append('productTypeId', selectedId)
    if (weight) fd.append('weight', weight)
    const result = await createInventoryItem(fd)
    const qrUrl = await generateQRDataUrl(result.itemId, window.location.origin)
    setPreview({ price: result.price, qrUrl, itemId: result.itemId })
    setLoading(false)
  }

  async function handleShare() {
    if (!preview || !selected) return
    const response = await fetch(preview.qrUrl)
    const blob = await response.blob()
    const file = new File([blob], 'label.png', { type: 'image/png' })
    if (navigator.share) {
      navigator.share({ files: [file], title: selected.name })
    } else {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'label.png'
      a.click()
    }
  }

  if (preview && selected) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <p className="text-sm text-stone-500 mb-1">{selected.name}</p>
          <p className="text-3xl font-bold text-stone-800 mb-1">${preview.price.toFixed(2)}</p>
          {weight && <p className="text-sm text-stone-500 mb-4">{weight} lbs</p>}
          <img src={preview.qrUrl} alt="QR code" className="mx-auto w-40 h-40" />
        </div>
        <button onClick={handleShare}
          className="w-full py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors">
          Share label
        </button>
        <button onClick={() => { setPreview(null); setWeight(''); setSelectedId('') }}
          className="w-full py-3 border border-stone-300 text-stone-700 font-medium rounded-lg">
          Add another item
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Product type</label>
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          required
          className="w-full px-3 py-2.5 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">Select a product…</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {selected?.pricingMode === 'per_weight' && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Weight (lbs)</label>
          <input
            type="number" step="0.001" min="0"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="0.000"
            required
            className="w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
      )}

      {livePrice !== null && (
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-sm text-green-600">Price</p>
          <p className="text-2xl font-bold text-green-700">${livePrice.toFixed(2)}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !selected || (selected.pricingMode === 'per_weight' && !weight)}
        className="w-full py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 disabled:opacity-40 transition-colors"
      >
        {loading ? 'Saving…' : 'Generate label'}
      </button>
    </form>
  )
}
