'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/dashboard', label: 'Inventory', icon: '📦' },
  { href: '/add-item', label: 'Add Item', icon: '➕' },
  { href: '/products', label: 'Products', icon: '🗂️' },
]

export default function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 flex">
      {tabs.map(tab => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`flex-1 flex flex-col items-center py-3 text-xs gap-1 ${
            pathname === tab.href ? 'text-green-700 font-medium' : 'text-stone-500'
          }`}
        >
          <span className="text-xl">{tab.icon}</span>
          {tab.label}
        </Link>
      ))}
    </nav>
  )
}
