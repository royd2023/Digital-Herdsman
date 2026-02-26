'use client'

import { useState } from 'react'
import { createInventoryItem } from './actions'
import { calculatePrice } from '@/lib/pricing'
import { generateQRDataUrl } from '@/lib/qr'
import type { ProductType } from '@/generated/prisma/client'

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
      <div className="px-6 pt-8 space-y-5">
        {/* Success — label artifact */}
        <div className="text-center border-b border-[#1e1e1a] pb-8">
          <p className="text-[10px] tracking-[0.3em] text-[#4a4840] uppercase mb-1">{selected.name}</p>
          <p
            className="font-serif text-[#c9a84c] leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 18vw, 5.5rem)' }}
          >
            ${preview.price.toFixed(2)}
          </p>
          {weight && (
            <p className="text-[#7a7464] text-xs mt-2 tracking-wide">{weight} lbs</p>
          )}

          <div className="flex justify-center mt-7">
            {/* QR price-tag card */}
            <div className="bg-white p-4 relative">
              <img src={preview.qrUrl} alt="QR code" className="w-40 h-40 block" />
              <div className="absolute top-0 left-0 w-3 h-3 bg-[#c9a84c]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#c9a84c]" />
            </div>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="w-full py-4 bg-[#c9a84c] text-[#0f0f0c] font-bold text-sm tracking-[0.15em] uppercase transition-colors hover:bg-[#e8c06a] active:bg-[#b8963e] rounded-none"
        >
          Share label
        </button>
        <button
          onClick={() => { setPreview(null); setWeight(''); setSelectedId('') }}
          className="w-full py-4 border border-[#2a2a24] text-[#7a7464] font-medium text-sm tracking-[0.1em] uppercase transition-colors hover:border-[#c9a84c] hover:text-[#ede7d3] rounded-none"
        >
          Add another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 pt-2">
      <div className="py-5 border-b border-[#1e1e1a]">
        <label htmlFor="product-select" className="block text-[10px] tracking-[0.25em] text-[#7a7464] uppercase mb-2">
          Product type
        </label>
        <select
          id="product-select"
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          required
          className="input-ledger appearance-none"
        >
          <option value="" className="bg-[#1a1a15]">Select a product…</option>
          {products.map(p => (
            <option key={p.id} value={p.id} className="bg-[#1a1a15]">{p.name}</option>
          ))}
        </select>
      </div>

      {selected?.pricingMode === 'per_weight' && (
        <div className="py-5 border-b border-[#1e1e1a]">
          <label htmlFor="weight-input" className="block text-[10px] tracking-[0.25em] text-[#7a7464] uppercase mb-2">
            Weight (lbs)
          </label>
          <input
            id="weight-input"
            type="number"
            step="0.001"
            min="0"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="0.000"
            required
            className="input-ledger text-lg"
          />
        </div>
      )}

      {livePrice !== null && (
        <div className="py-6 border-b border-[#1e1e1a] text-center">
          <p className="text-[10px] tracking-[0.3em] text-[#4a4840] uppercase mb-1">Price</p>
          <p className="font-serif text-[#c9a84c] leading-none" style={{ fontSize: 'clamp(2.5rem, 14vw, 4rem)' }}>
            ${livePrice.toFixed(2)}
          </p>
        </div>
      )}

      <div className="pt-8">
        <button
          type="submit"
          disabled={loading || !selected || (selected.pricingMode === 'per_weight' && !weight)}
          className="w-full py-4 bg-[#c9a84c] text-[#0f0f0c] font-bold text-sm tracking-[0.15em] uppercase transition-colors hover:bg-[#e8c06a] active:bg-[#b8963e] disabled:opacity-25 disabled:cursor-not-allowed rounded-none"
        >
          {loading ? 'Saving…' : 'Generate label'}
        </button>
      </div>
    </form>
  )
}
