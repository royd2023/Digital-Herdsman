'use client'

import { useState } from 'react'
import { createInventoryItem } from './actions'
import { calculatePrice } from '@/lib/pricing'
import { generateQRDataUrl } from '@/lib/qr'
import type { ProductType } from '@/generated/prisma/client'

type Props = { products: ProductType[] }

const inputClass = "w-full px-4 py-3 bg-[#141410] border border-[#2e2e26] rounded-xl text-[#f0ead8] placeholder-[#4a4840] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
const labelClass = "block text-xs font-medium text-[#8a8470] uppercase tracking-widest mb-1.5"

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
      <div className="space-y-3">
        <div className="bg-[#1c1c17] border border-[#2e2e26] rounded-2xl p-6 text-center">
          <p className="text-xs text-[#8a8470] uppercase tracking-widest mb-1">{selected.name}</p>
          <p className="font-serif text-4xl text-[#f0ead8] mb-1">${preview.price.toFixed(2)}</p>
          {weight && <p className="text-xs text-[#8a8470] mb-4">{weight} lbs</p>}
          <div className="inline-block p-3 bg-white rounded-xl mx-auto">
            <img src={preview.qrUrl} alt="QR code" className="w-36 h-36" />
          </div>
        </div>
        <button
          onClick={handleShare}
          className="w-full py-3.5 bg-[#c9a84c] text-[#141410] font-bold rounded-xl hover:bg-[#dbb95e] transition-colors text-sm tracking-wide uppercase"
        >
          Share label
        </button>
        <button
          onClick={() => { setPreview(null); setWeight(''); setSelectedId('') }}
          className="w-full py-3 border border-[#2e2e26] text-[#8a8470] font-medium rounded-xl hover:border-[#c9a84c] hover:text-[#f0ead8] transition-colors text-sm"
        >
          Add another item
        </button>
      </div>
    )
  }

  return (
    <div className="bg-[#1c1c17] border border-[#2e2e26] rounded-2xl p-5">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="product-select" className={labelClass}>Product type</label>
          <select
            id="product-select"
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            required
            className={inputClass + ' appearance-none'}
          >
            <option value="" className="bg-[#1c1c17]">Select a product…</option>
            {products.map(p => (
              <option key={p.id} value={p.id} className="bg-[#1c1c17]">{p.name}</option>
            ))}
          </select>
        </div>

        {selected?.pricingMode === 'per_weight' && (
          <div>
            <label htmlFor="weight-input" className={labelClass}>Weight (lbs)</label>
            <input
              id="weight-input"
              type="number" step="0.001" min="0"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="0.000"
              required
              className={inputClass}
            />
          </div>
        )}

        {livePrice !== null && (
          <div className="bg-[#141410] border border-[#2e2e26] rounded-xl p-4 text-center">
            <p className="text-xs text-[#8a8470] uppercase tracking-widest mb-0.5">Price</p>
            <p className="font-serif text-3xl text-[#c9a84c]">${livePrice.toFixed(2)}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !selected || (selected.pricingMode === 'per_weight' && !weight)}
          className="w-full py-3.5 bg-[#c9a84c] text-[#141410] font-bold rounded-xl hover:bg-[#dbb95e] disabled:opacity-30 transition-colors text-sm tracking-wide uppercase"
        >
          {loading ? 'Saving…' : 'Generate label'}
        </button>
      </form>
    </div>
  )
}
