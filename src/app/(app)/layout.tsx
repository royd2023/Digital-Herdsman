import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getFarmByOwner } from '@/lib/farm'
import BottomNav from '@/components/BottomNav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const farm = await getFarmByOwner(user.id)
  if (!farm) redirect('/onboarding')

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {children}
      <BottomNav />
    </div>
  )
}
