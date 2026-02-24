'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createFarm } from '@/lib/farm'

export async function setupFarm(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await createFarm(user.id, formData.get('name') as string)
  redirect('/dashboard')
}
