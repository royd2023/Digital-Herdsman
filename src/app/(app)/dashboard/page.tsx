import { createClient } from '@/lib/supabase/server'
import { getFarmByOwner } from '@/lib/farm'
import { getInventoryByFarm } from '@/lib/inventory'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const farm = await getFarmByOwner(user!.id)
  const items = await getInventoryByFarm(farm!.id)

  const available = items.filter(i => i.status === 'available')
  const sold = items.filter(i => i.status === 'sold')

  return (
    <main className="px-4 pt-8 pb-4">
      <div className="mb-6">
        <p className="text-xs text-[#8a8470] uppercase tracking-widest mb-1">Your farm</p>
        <h1 className="font-serif text-3xl text-[#f0ead8] leading-tight">{farm!.name}</h1>
        <div className="mt-2 h-px w-10 bg-[#c9a84c]" />
      </div>

      <div className="flex gap-3 mb-8">
        <div className="flex-1 bg-[#1c1c17] border border-[#2e2e26] rounded-2xl p-4">
          <p className="text-2xl font-bold text-[#c9a84c]">{available.length}</p>
          <p className="text-xs text-[#8a8470] mt-0.5 uppercase tracking-wide">Available</p>
        </div>
        <div className="flex-1 bg-[#1c1c17] border border-[#2e2e26] rounded-2xl p-4">
          <p className="text-2xl font-bold text-[#f0ead8]">{sold.length}</p>
          <p className="text-xs text-[#8a8470] mt-0.5 uppercase tracking-wide">Sold</p>
        </div>
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <Link
            key={item.id}
            href={`/dashboard/${item.id}`}
            className="flex items-center justify-between bg-[#1c1c17] border border-[#2e2e26] rounded-2xl px-4 py-3.5 active:bg-[#252520] transition-colors"
          >
            <div>
              <p className="font-medium text-[#f0ead8] text-sm">{item.productType.name}</p>
              <p className="text-xs text-[#8a8470] mt-0.5">
                {item.weight ? `${Number(item.weight).toFixed(2)} lbs · ` : ''}${Number(item.price).toFixed(2)}
              </p>
            </div>
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide ${
              item.status === 'available'
                ? 'bg-[#1e3a2a] text-[#7dbf94]'
                : 'bg-[#252520] text-[#8a8470]'
            }`}>
              {item.status}
            </span>
          </Link>
        ))}
        {items.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#8a8470] text-sm">No items yet.</p>
            <p className="text-[#4a4840] text-xs mt-1">Tap Add Item to get started.</p>
          </div>
        )}
      </div>
    </main>
  )
}
