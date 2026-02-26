'use client'

import { markAsSold } from './actions'

export default function MarkSoldButton({ itemId }: { itemId: string }) {
  return (
    <button
      onClick={() => markAsSold(itemId)}
      className="w-full py-4 border border-[#c9a84c] text-[#c9a84c] font-bold text-sm tracking-[0.15em] uppercase transition-colors hover:bg-[#c9a84c] hover:text-[#0f0f0c] active:bg-[#e8c06a] rounded-none"
    >
      Mark as sold
    </button>
  )
}
