import { createClient } from '@/lib/supabase/server'
import { getFarmByOwner } from '@/lib/farm'
import { getProductsByFarm } from '@/lib/products'
import Link from 'next/link'

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const farm = await getFarmByOwner(user!.id)
  const products = await getProductsByFarm(farm!.id)

  return (
    <main className="pb-4">
      {/* Header */}
      <div className="px-6 pt-10 pb-6 border-b border-[#1e1e1a] flex items-end justify-between">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-[#4a4840] uppercase mb-2">Catalogue</p>
          <h1
            className="font-serif italic text-[#ede7d3] leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 12vw, 4rem)' }}
          >
            Products
          </h1>
        </div>
        <Link
          href="/products/new"
          className="mb-1 px-4 py-2.5 bg-[#c9a84c] text-[#0f0f0c] text-[11px] font-bold tracking-[0.15em] uppercase transition-colors hover:bg-[#e8c06a] active:bg-[#b8963e] rounded-none"
        >
          + New
        </Link>
      </div>

      {/* Product list — ledger rows */}
      <div>
        {products.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-[#7a7464] text-sm">No products yet.</p>
            <p className="text-[#4a4840] text-xs mt-1">Tap + New to add your first product.</p>
          </div>
        ) : (
          products.map((p, idx) => (
            <div key={p.id} className="flex items-center gap-4 px-6 py-4 border-b border-[#1e1e1a]">
              <span className="text-[#2a2a24] font-serif text-sm tabular-nums select-none w-6 text-right shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[#ede7d3] text-sm font-medium truncate">{p.name}</p>
                <p className="text-[#7a7464] text-xs mt-0.5 capitalize">
                  {p.category} ·{' '}
                  <span className="text-[#c9a84c]">
                    {p.pricingMode === 'per_weight'
                      ? `$${Number(p.price).toFixed(2)}/lb`
                      : `$${Number(p.price).toFixed(2)} fixed`}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}
