import { createClient } from '@/lib/supabase/server'
import { getFarmByOwner } from '@/lib/farm'
import { getInventoryByFarm } from '@/lib/inventory'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const farm = await getFarmByOwner(user!.id)
  const items = await getInventoryByFarm(farm!.id)

  const available = items.filter(i => i.status === 'available')
  const sold = items.filter(i => i.status === 'sold')

  return (
    <main className="pb-4">
      {/* Hero header */}
      <div className="px-6 pt-10 pb-8 border-b border-[#1e1e1a]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] tracking-[0.3em] text-[#4a4840] uppercase">Your farm</p>
          <LogoutButton />
        </div>
        <h1
          className="font-serif italic text-[#ede7d3] leading-[0.88] tracking-tight"
          style={{ fontSize: 'clamp(2.8rem, 13vw, 4.5rem)' }}
        >
          {farm!.name}
        </h1>
        <span className="rule-amber mt-5 w-12" />

        {/* Stats row */}
        <div className="flex gap-8 mt-7">
          <div>
            <p className="font-serif text-5xl text-[#c9a84c] leading-none">{available.length}</p>
            <p className="text-[10px] tracking-[0.2em] text-[#7a7464] uppercase mt-1.5">Available</p>
          </div>
          <div className="w-px bg-[#2a2a24] self-stretch" />
          <div>
            <p className="font-serif text-5xl text-[#ede7d3] leading-none">{sold.length}</p>
            <p className="text-[10px] tracking-[0.2em] text-[#7a7464] uppercase mt-1.5">Sold</p>
          </div>
        </div>
      </div>

      {/* Inventory — ledger rows */}
      <div>
        {items.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-[#7a7464] text-sm">No items yet.</p>
            <p className="text-[#4a4840] text-xs mt-1">Tap Add Item to get started.</p>
          </div>
        ) : (
          <div>
            {items.map((item, idx) => (
              <Link
                key={item.id}
                href={`/dashboard/${item.id}`}
                className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1a] transition-colors active:bg-[#1a1a15] group"
              >
                {/* Left amber accent on touch */}
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-[#2a2a24] font-serif text-sm tabular-nums select-none w-6 text-right shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[#ede7d3] text-sm font-medium truncate">{item.productType.name}</p>
                    <p className="text-[#7a7464] text-xs mt-0.5">
                      {item.weight ? `${Number(item.weight).toFixed(2)} lbs · ` : ''}
                      <span className="text-[#c9a84c]">${Number(item.price).toFixed(2)}</span>
                    </p>
                  </div>
                </div>
                <span className={`ml-4 shrink-0 text-[9px] px-2 py-0.5 font-bold uppercase tracking-[0.15em] ${
                  item.status === 'available'
                    ? 'text-[#6db88a] bg-[#182e20]'
                    : 'text-[#4a4840] bg-[#1e1e1a]'
                }`}>
                  {item.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
