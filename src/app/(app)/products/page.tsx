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
    <main className="px-4 pt-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-xs text-[#8a8470] uppercase tracking-widest mb-1">Catalogue</p>
          <h1 className="font-serif text-3xl text-[#f0ead8]">Products</h1>
        </div>
        <Link
          href="/products/new"
          className="px-4 py-2 bg-[#c9a84c] text-[#141410] text-xs font-bold rounded-xl hover:bg-[#dbb95e] transition-colors uppercase tracking-wide"
        >
          + New
        </Link>
      </div>

      <div className="space-y-2">
        {products.map(p => (
          <div key={p.id} className="bg-[#1c1c17] border border-[#2e2e26] rounded-2xl px-4 py-3.5">
            <p className="font-medium text-[#f0ead8] text-sm">{p.name}</p>
            <p className="text-xs text-[#8a8470] mt-0.5 capitalize">
              {p.category} · {p.pricingMode === 'per_weight'
                ? `$${Number(p.price).toFixed(2)}/lb`
                : `$${Number(p.price).toFixed(2)} fixed`}
            </p>
          </div>
        ))}
        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#8a8470] text-sm">No products yet.</p>
            <p className="text-[#4a4840] text-xs mt-1">Tap + New to add your first product.</p>
          </div>
        )}
      </div>
    </main>
  )
}
