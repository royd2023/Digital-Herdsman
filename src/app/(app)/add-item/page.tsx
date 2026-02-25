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
    <main className="px-4 pt-8">
      <div className="mb-8">
        <p className="text-xs text-[#8a8470] uppercase tracking-widest mb-1">Inventory</p>
        <h1 className="font-serif text-3xl text-[#f0ead8]">Add item</h1>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[#8a8470] text-sm">No products yet.</p>
          <p className="text-[#4a4840] text-xs mt-1">Go to Products to add some first.</p>
        </div>
      ) : (
        <AddItemForm products={products} />
      )}
    </main>
  )
}
