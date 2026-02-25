'use client'

import { markAsSold } from './actions'

export default function MarkSoldButton({ itemId }: { itemId: string }) {
  return (
    <button
      onClick={() => markAsSold(itemId)}
      className="w-full py-3.5 border border-[#2e2e26] text-[#8a8470] font-medium rounded-xl hover:border-[#c9a84c] hover:text-[#f0ead8] active:bg-[#1c1c17] transition-colors text-sm tracking-wide"
    >
      Mark as sold
    </button>
  )
}
