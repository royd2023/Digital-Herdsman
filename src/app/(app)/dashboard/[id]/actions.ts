'use server'

import { revalidatePath } from 'next/cache'
import { updateItemStatus } from '@/lib/inventory'

export async function markAsSold(itemId: string) {
  await updateItemStatus(itemId, 'sold')
  revalidatePath('/dashboard')
}
