import { createClient } from '@/lib/supabase/server'
import { getFarmByOwner } from '@/lib/farm'
import { getProductsByFarm } from '@/lib/products'
import AddItemForm from './AddItemForm'

export default async function AddItemPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const farm = await getFarmByOwner(user!.id)
  const products = await getProductsByFarm(farm!.id)

  return (
    <main className="pb-8">
      {/* Header */}
      <div className="px-6 pt-10 pb-6 border-b border-[#1e1e1a]">
        <p className="text-[10px] tracking-[0.3em] text-[#4a4840] uppercase mb-2">Inventory</p>
        <h1
          className="font-serif italic text-[#ede7d3] leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 12vw, 4rem)' }}
        >
          Add item
        </h1>
        <span className="rule-amber mt-4 w-10" />
      </div>

      {products.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="text-[#7a7464] text-sm">No products yet.</p>
          <p className="text-[#4a4840] text-xs mt-1">Go to Products to add some first.</p>
        </div>
      ) : (
        <AddItemForm products={products} />
      )}
    </main>
  )
}
