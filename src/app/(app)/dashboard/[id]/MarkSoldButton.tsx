'use client'

import { markAsSold } from './actions'

export default function MarkSoldButton({ itemId }: { itemId: string }) {
  return (
    <button
      onClick={() => markAsSold(itemId)}
      className="w-full py-3 border border-stone-300 text-stone-700 font-medium rounded-lg hover:bg-stone-100 transition-colors"
    >
      Mark as sold
    </button>
  )
}
