'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getFarmByOwner } from '@/lib/farm'
import { createProduct } from '@/lib/products'
import { Category, PricingMode } from '../../../../generated/prisma'

export async function addProduct(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const farm = await getFarmByOwner(user!.id)

  await createProduct({
    farmId: farm!.id,
    name: formData.get('name') as string,
    category: formData.get('category') as Category,
    pricingMode: formData.get('pricingMode') as PricingMode,
    price: parseFloat(formData.get('price') as string),
    unit: formData.get('unit') as string,
  })

  redirect('/products')
}
