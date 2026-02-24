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
    <main className="px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-stone-800">Products</h1>
        <Link href="/products/new"
          className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg">
          + New
        </Link>
      </div>
      <div className="space-y-2">
        {products.map(p => (
          <div key={p.id} className="bg-white rounded-xl p-4 shadow-sm">
            <p className="font-medium text-stone-800">{p.name}</p>
            <p className="text-sm text-stone-500">
              {p.category} · {p.pricingMode === 'per_weight' ? `$${Number(p.price).toFixed(2)}/lb` : `$${Number(p.price).toFixed(2)} fixed`}
            </p>
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-center text-stone-400 py-12">No products yet. Tap + New to add one.</p>
        )}
      </div>
    </main>
  )
}
