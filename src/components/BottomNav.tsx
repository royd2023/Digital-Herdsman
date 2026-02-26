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
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0f0f0c] border-t border-[#1e1e1a] flex">
      {tabs.map(({ href, label, Icon }) => {
        const active = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={href}
            href={href}
            className="flex-1 flex flex-col items-center pt-1 pb-4 gap-1.5 relative transition-colors"
          >
            {/* Amber top indicator bar */}
            <span
              className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-200"
              style={{
                width: active ? '32px' : '0px',
                background: '#c9a84c',
              }}
            />
            <Icon
              size={20}
              strokeWidth={active ? 2 : 1.5}
              color={active ? '#c9a84c' : '#4a4840'}
              className="mt-2"
            />
            <span
              className="text-[9px] tracking-[0.15em] uppercase font-medium"
              style={{ color: active ? '#c9a84c' : '#4a4840' }}
            >
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
