'use server'

import { createClient } from '@/lib/supabase/server'
import { getFarmByOwner } from '@/lib/farm'
import { prisma } from '@/lib/db'
import { calculatePrice } from '@/lib/pricing'

export async function createInventoryItem(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const farm = await getFarmByOwner(user!.id)

  const productTypeId = formData.get('productTypeId') as string
  const weightRaw = formData.get('weight') as string | null
  const weight = weightRaw ? parseFloat(weightRaw) : null

  const productType = await prisma.productType.findUnique({ where: { id: productTypeId } })
  if (!productType) throw new Error('Product type not found')

  const price = calculatePrice({
    pricingMode: productType.pricingMode as 'per_weight' | 'fixed',
    pricePerUnit: Number(productType.price),
    weight,
  })

  const item = await prisma.inventoryItem.create({
    data: {
      farmId: farm!.id,
      productTypeId,
      weight: weight ?? undefined,
      price,
      status: 'available',
    },
  })

  return { itemId: item.id, price, weight, productName: productType.name, farmName: farm!.name }
}
