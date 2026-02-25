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
    <main className="px-4 pt-6">
      <h1 className="text-xl font-bold text-stone-800 mb-6">Add item</h1>
      {products.length === 0 ? (
        <p className="text-stone-400 text-center py-12">
          No products yet. Go to Products to add some first.
        </p>
      ) : (
        <AddItemForm products={products} />
      )}
    </main>
  )
}
