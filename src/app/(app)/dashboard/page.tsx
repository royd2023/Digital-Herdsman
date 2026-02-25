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
    <main className="px-4 pt-6">
      <h1 className="text-xl font-bold text-stone-800 mb-1">{farm!.name}</h1>
      <div className="flex gap-3 mb-6">
        <div className="flex-1 bg-green-50 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-green-700">{available.length}</p>
          <p className="text-xs text-green-600">Available</p>
        </div>
        <div className="flex-1 bg-stone-100 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-stone-600">{sold.length}</p>
          <p className="text-xs text-stone-500">Sold</p>
        </div>
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <Link
            key={item.id}
            href={`/dashboard/${item.id}`}
            className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm"
          >
            <div>
              <p className="font-medium text-stone-800">{item.productType.name}</p>
              <p className="text-sm text-stone-500">
                {item.weight ? `${item.weight} lbs · ` : ''} ${Number(item.price).toFixed(2)}
              </p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              item.status === 'available'
                ? 'bg-green-100 text-green-700'
                : 'bg-stone-100 text-stone-500'
            }`}>
              {item.status}
            </span>
          </Link>
        ))}
        {items.length === 0 && (
          <p className="text-center text-stone-400 py-12">No items yet. Tap + to add one.</p>
        )}
      </div>
    </main>
  )
}
