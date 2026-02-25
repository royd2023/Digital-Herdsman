'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, PlusCircle, LayoutGrid } from 'lucide-react'

const tabs = [
  { href: '/dashboard', label: 'Inventory', Icon: Package },
  { href: '/add-item', label: 'Add Item', Icon: PlusCircle },
  { href: '/products', label: 'Products', Icon: LayoutGrid },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#141410] border-t border-[#2e2e26] flex">
      {tabs.map(({ href, label, Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${
              active ? 'text-[#c9a84c]' : 'text-[#8a8470]'
            }`}
          >
            <Icon size={22} strokeWidth={active ? 2 : 1.5} />
            <span className={`text-[10px] tracking-wide ${active ? 'font-semibold' : 'font-normal'}`}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
