# Farmer UI Redesign — Dark Canvas Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign all farmer-side pages to a premium dark-canvas aesthetic — deep charcoal background, warm cream text, amber/gold accents, Playfair Display headings, SVG icons.

**Architecture:** Pure Tailwind v4 with CSS custom properties (`@theme inline`) in `globals.css`. Fonts loaded via `next/font/google`. No new UI libraries except `lucide-react` for SVG icons. All existing server/client logic stays unchanged — only markup and classes are touched.

**Tech Stack:** Next.js 16 (App Router), Tailwind v4, `next/font/google` (Playfair Display + DM Sans), `lucide-react`

---

## Design Tokens (reference throughout)

| Name | Value | Usage |
|------|-------|-------|
| `--bg` | `#141410` | Page backgrounds |
| `--surface` | `#1c1c17` | Cards, inputs |
| `--surface-2` | `#252520` | Elevated surfaces |
| `--border` | `#2e2e26` | Card/input borders |
| `--text-primary` | `#f0ead8` | Headings, body |
| `--text-secondary` | `#8a8470` | Subtext, labels |
| `--accent` | `#c9a84c` | CTAs, active state, gold |
| `--accent-hover` | `#dbb95e` | Hover on accent |
| `--green-badge-bg` | `#1e3a2a` | Available badge bg |
| `--green-badge-text` | `#7dbf94` | Available badge text |

---

## Task 1: Install lucide-react and set up fonts + global tokens

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Step 1: Install lucide-react**

```bash
npm install lucide-react
```

Expected: `added N packages`

**Step 2: Update `src/app/globals.css`**

Replace entire file contents with:

```css
@import "tailwindcss";

@theme inline {
  --color-background: #141410;
  --color-surface: #1c1c17;
  --color-surface-2: #252520;
  --color-border: #2e2e26;
  --color-text-primary: #f0ead8;
  --color-text-secondary: #8a8470;
  --color-accent: #c9a84c;
  --color-accent-hover: #dbb95e;
  --color-green-badge-bg: #1e3a2a;
  --color-green-badge-text: #7dbf94;

  --font-serif: var(--font-playfair);
  --font-sans: var(--font-dm-sans);
}

* {
  -webkit-tap-highlight-color: transparent;
}

body {
  background-color: #141410;
  color: #f0ead8;
  font-family: var(--font-dm-sans), system-ui, sans-serif;
}
```

**Step 3: Update `src/app/layout.tsx`**

Replace entire file contents with:

```tsx
import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Digital Herdsman',
  description: 'Farm inventory management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
```

**Step 4: Verify dev server starts without errors**

```bash
npm run dev
```

Expected: `✓ Ready` with no compile errors.

**Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx package.json package-lock.json
git commit -m "feat: set up dark canvas tokens, Playfair Display + DM Sans fonts, lucide-react"
```

---

## Task 2: Redesign login page

**Files:**
- Modify: `src/app/login/page.tsx`

**Step 1: Replace `src/app/login/page.tsx`**

```tsx
import { login } from './actions'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#141410] px-6">
      {/* Subtle grain texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '128px' }} />

      <div className="w-full max-w-sm">
        {/* Wordmark */}
        <div className="mb-10">
          <h1 className="font-serif text-4xl text-[#f0ead8] leading-tight tracking-tight">
            Digital<br />Herdsman
          </h1>
          <div className="mt-3 h-px w-12 bg-[#c9a84c]" />
          <p className="mt-3 text-sm text-[#8a8470] tracking-wide uppercase">Farm inventory</p>
        </div>

        {/* Card */}
        <div className="bg-[#1c1c17] border border-[#2e2e26] rounded-2xl p-6 space-y-4">
          <form className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#8a8470] uppercase tracking-widest" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-[#141410] border border-[#2e2e26] rounded-xl text-[#f0ead8] placeholder-[#4a4840] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                placeholder="you@farm.com"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#8a8470] uppercase tracking-widest" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-[#141410] border border-[#2e2e26] rounded-xl text-[#f0ead8] placeholder-[#4a4840] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              formAction={login}
              className="w-full py-3.5 bg-[#c9a84c] text-[#141410] font-semibold rounded-xl hover:bg-[#dbb95e] active:bg-[#b8963e] transition-colors text-sm tracking-wide"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
```

**Step 2: Verify in browser**

Visit `http://localhost:3000/login`. Should show dark background, Playfair heading, amber sign-in button.

**Step 3: Commit**

```bash
git add src/app/login/page.tsx
git commit -m "feat: redesign login page — dark canvas with Playfair wordmark"
```

---

## Task 3: Redesign onboarding page

**Files:**
- Modify: `src/app/onboarding/page.tsx`

**Step 1: Replace `src/app/onboarding/page.tsx`**

```tsx
import { setupFarm } from './actions'

export default function OnboardingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#141410] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <h1 className="font-serif text-4xl text-[#f0ead8] leading-tight tracking-tight">
            Set up your<br />farm
          </h1>
          <div className="mt-3 h-px w-12 bg-[#c9a84c]" />
          <p className="mt-3 text-sm text-[#8a8470]">What&apos;s your farm called?</p>
        </div>

        <div className="bg-[#1c1c17] border border-[#2e2e26] rounded-2xl p-6">
          <form className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#8a8470] uppercase tracking-widest">
                Farm name
              </label>
              <input
                name="name"
                type="text"
                placeholder="e.g. Johnson Family Farm"
                required
                className="w-full px-4 py-3 bg-[#141410] border border-[#2e2e26] rounded-xl text-[#f0ead8] placeholder-[#4a4840] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
              />
            </div>
            <button
              formAction={setupFarm}
              className="w-full py-3.5 bg-[#c9a84c] text-[#141410] font-semibold rounded-xl hover:bg-[#dbb95e] active:bg-[#b8963e] transition-colors text-sm tracking-wide"
            >
              Create farm
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/onboarding/page.tsx
git commit -m "feat: redesign onboarding page — dark canvas"
```

---

## Task 4: Redesign BottomNav with SVG icons

**Files:**
- Modify: `src/components/BottomNav.tsx`

**Step 1: Replace `src/components/BottomNav.tsx`**

```tsx
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
    <nav className="fixed bottom-0 left-0 right-0 bg-[#141410] border-t border-[#2e2e26] flex safe-area-bottom">
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
```

**Step 2: Commit**

```bash
git add src/components/BottomNav.tsx
git commit -m "feat: redesign bottom nav — SVG icons, dark canvas, amber active state"
```

---

## Task 5: Redesign app layout

**Files:**
- Modify: `src/app/(app)/layout.tsx`

**Step 1: Replace `src/app/(app)/layout.tsx`**

```tsx
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
    <div className="min-h-screen bg-[#141410] pb-20">
      {children}
      <BottomNav />
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add "src/app/(app)/layout.tsx"
git commit -m "feat: update app layout background to dark canvas"
```

---

## Task 6: Redesign dashboard page

**Files:**
- Modify: `src/app/(app)/dashboard/page.tsx`

**Step 1: Replace `src/app/(app)/dashboard/page.tsx`**

```tsx
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
    <main className="px-4 pt-8 pb-4">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs text-[#8a8470] uppercase tracking-widest mb-1">Your farm</p>
        <h1 className="font-serif text-3xl text-[#f0ead8] leading-tight">{farm!.name}</h1>
        <div className="mt-2 h-px w-10 bg-[#c9a84c]" />
      </div>

      {/* Stats */}
      <div className="flex gap-3 mb-8">
        <div className="flex-1 bg-[#1c1c17] border border-[#2e2e26] rounded-2xl p-4">
          <p className="text-2xl font-bold text-[#c9a84c]">{available.length}</p>
          <p className="text-xs text-[#8a8470] mt-0.5 uppercase tracking-wide">Available</p>
        </div>
        <div className="flex-1 bg-[#1c1c17] border border-[#2e2e26] rounded-2xl p-4">
          <p className="text-2xl font-bold text-[#f0ead8]">{sold.length}</p>
          <p className="text-xs text-[#8a8470] mt-0.5 uppercase tracking-wide">Sold</p>
        </div>
      </div>

      {/* Inventory list */}
      <div className="space-y-2">
        {items.map(item => (
          <Link
            key={item.id}
            href={`/dashboard/${item.id}`}
            className="flex items-center justify-between bg-[#1c1c17] border border-[#2e2e26] rounded-2xl px-4 py-3.5 active:bg-[#252520] transition-colors"
          >
            <div>
              <p className="font-medium text-[#f0ead8] text-sm">{item.productType.name}</p>
              <p className="text-xs text-[#8a8470] mt-0.5">
                {item.weight ? `${Number(item.weight).toFixed(2)} lbs · ` : ''}${Number(item.price).toFixed(2)}
              </p>
            </div>
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide ${
              item.status === 'available'
                ? 'bg-[#1e3a2a] text-[#7dbf94]'
                : 'bg-[#252520] text-[#8a8470]'
            }`}>
              {item.status}
            </span>
          </Link>
        ))}
        {items.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#8a8470] text-sm">No items yet.</p>
            <p className="text-[#4a4840] text-xs mt-1">Tap Add Item to get started.</p>
          </div>
        )}
      </div>
    </main>
  )
}
```

**Step 2: Commit**

```bash
git add "src/app/(app)/dashboard/page.tsx"
git commit -m "feat: redesign dashboard — dark canvas, Playfair farm name, amber stats"
```

---

## Task 7: Redesign products page

**Files:**
- Modify: `src/app/(app)/products/page.tsx`

**Step 1: Replace `src/app/(app)/products/page.tsx`**

```tsx
import { createClient } from '@/lib/supabase/server'
import { getFarmByOwner } from '@/lib/farm'
import { getProductsByFarm } from '@/lib/products'
import Link from 'next/link'

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const farm = await getFarmByOwner(user!.id)
  const products = await getProductsByFarm(farm!.id)

  return (
    <main className="px-4 pt-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-xs text-[#8a8470] uppercase tracking-widest mb-1">Catalogue</p>
          <h1 className="font-serif text-3xl text-[#f0ead8]">Products</h1>
        </div>
        <Link
          href="/products/new"
          className="px-4 py-2 bg-[#c9a84c] text-[#141410] text-xs font-bold rounded-xl hover:bg-[#dbb95e] transition-colors uppercase tracking-wide"
        >
          + New
        </Link>
      </div>

      <div className="space-y-2">
        {products.map(p => (
          <div key={p.id} className="bg-[#1c1c17] border border-[#2e2e26] rounded-2xl px-4 py-3.5">
            <p className="font-medium text-[#f0ead8] text-sm">{p.name}</p>
            <p className="text-xs text-[#8a8470] mt-0.5 capitalize">
              {p.category} · {p.pricingMode === 'per_weight'
                ? `$${Number(p.price).toFixed(2)}/lb`
                : `$${Number(p.price).toFixed(2)} fixed`}
            </p>
          </div>
        ))}
        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#8a8470] text-sm">No products yet.</p>
            <p className="text-[#4a4840] text-xs mt-1">Tap + New to add your first product.</p>
          </div>
        )}
      </div>
    </main>
  )
}
```

**Step 2: Commit**

```bash
git add "src/app/(app)/products/page.tsx"
git commit -m "feat: redesign products page — dark canvas"
```

---

## Task 8: Redesign new product form

**Files:**
- Modify: `src/app/(app)/products/new/page.tsx`

**Step 1: Replace `src/app/(app)/products/new/page.tsx`**

```tsx
import { addProduct } from './actions'

const CATEGORIES = [
  'beef','pork','chicken','lamb','fish',
  'eggs','dairy','honey','preserves',
  'vegetables','fruit','other'
]

const inputClass = "w-full px-4 py-3 bg-[#141410] border border-[#2e2e26] rounded-xl text-[#f0ead8] placeholder-[#4a4840] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
const labelClass = "block text-xs font-medium text-[#8a8470] uppercase tracking-widest mb-1.5"

export default function NewProductPage() {
  return (
    <main className="px-4 pt-8">
      <div className="mb-8">
        <p className="text-xs text-[#8a8470] uppercase tracking-widest mb-1">Catalogue</p>
        <h1 className="font-serif text-3xl text-[#f0ead8]">New product</h1>
      </div>

      <div className="bg-[#1c1c17] border border-[#2e2e26] rounded-2xl p-5">
        <form className="space-y-5">
          <div>
            <label className={labelClass}>Name</label>
            <input name="name" type="text" placeholder="e.g. Ribeye Steak" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select name="category" required className={inputClass + ' appearance-none'}>
              {CATEGORIES.map(c => (
                <option key={c} value={c} className="bg-[#1c1c17]">
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Pricing</label>
            <select name="pricingMode" required className={inputClass + ' appearance-none'}>
              <option value="per_weight" className="bg-[#1c1c17]">Per weight ($/lb)</option>
              <option value="fixed" className="bg-[#1c1c17]">Fixed price</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Price ($)</label>
            <input name="price" type="number" step="0.01" min="0" placeholder="0.00" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Unit</label>
            <input name="unit" type="text" placeholder="e.g. lbs, dozen, jar" required className={inputClass} />
          </div>
          <button
            formAction={addProduct}
            className="w-full py-3.5 bg-[#c9a84c] text-[#141410] font-bold rounded-xl hover:bg-[#dbb95e] active:bg-[#b8963e] transition-colors text-sm tracking-wide uppercase"
          >
            Save product
          </button>
        </form>
      </div>
    </main>
  )
}
```

**Step 2: Commit**

```bash
git add "src/app/(app)/products/new/page.tsx"
git commit -m "feat: redesign new product form — dark canvas"
```

---

## Task 9: Redesign AddItemForm (client component)

**Files:**
- Modify: `src/app/(app)/add-item/page.tsx`
- Modify: `src/app/(app)/add-item/AddItemForm.tsx`

**Step 1: Replace `src/app/(app)/add-item/page.tsx`**

```tsx
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
    <main className="px-4 pt-8">
      <div className="mb-8">
        <p className="text-xs text-[#8a8470] uppercase tracking-widest mb-1">Inventory</p>
        <h1 className="font-serif text-3xl text-[#f0ead8]">Add item</h1>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[#8a8470] text-sm">No products yet.</p>
          <p className="text-[#4a4840] text-xs mt-1">Go to Products to add some first.</p>
        </div>
      ) : (
        <AddItemForm products={products} />
      )}
    </main>
  )
}
```

**Step 2: Replace `src/app/(app)/add-item/AddItemForm.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { createInventoryItem } from './actions'
import { calculatePrice } from '@/lib/pricing'
import { generateQRDataUrl } from '@/lib/qr'
import type { ProductType } from '@/generated/prisma/client'

type Props = { products: ProductType[] }

const inputClass = "w-full px-4 py-3 bg-[#141410] border border-[#2e2e26] rounded-xl text-[#f0ead8] placeholder-[#4a4840] text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
const labelClass = "block text-xs font-medium text-[#8a8470] uppercase tracking-widest mb-1.5"

export default function AddItemForm({ products }: Props) {
  const [selectedId, setSelectedId] = useState('')
  const [weight, setWeight] = useState('')
  const [preview, setPreview] = useState<{ price: number; qrUrl: string; itemId: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const selected = products.find(p => p.id === selectedId)

  const livePrice = selected
    ? (() => {
        try {
          return calculatePrice({
            pricingMode: selected.pricingMode as 'per_weight' | 'fixed',
            pricePerUnit: Number(selected.price),
            weight: weight ? parseFloat(weight) : null,
          })
        } catch { return null }
      })()
    : null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selected) return
    setLoading(true)
    const fd = new FormData()
    fd.append('productTypeId', selectedId)
    if (weight) fd.append('weight', weight)
    const result = await createInventoryItem(fd)
    const qrUrl = await generateQRDataUrl(result.itemId, window.location.origin)
    setPreview({ price: result.price, qrUrl, itemId: result.itemId })
    setLoading(false)
  }

  async function handleShare() {
    if (!preview || !selected) return
    const response = await fetch(preview.qrUrl)
    const blob = await response.blob()
    const file = new File([blob], 'label.png', { type: 'image/png' })
    if (navigator.share) {
      navigator.share({ files: [file], title: selected.name })
    } else {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'label.png'
      a.click()
    }
  }

  if (preview && selected) {
    return (
      <div className="space-y-3">
        <div className="bg-[#1c1c17] border border-[#2e2e26] rounded-2xl p-6 text-center">
          <p className="text-xs text-[#8a8470] uppercase tracking-widest mb-1">{selected.name}</p>
          <p className="font-serif text-4xl text-[#f0ead8] mb-1">${preview.price.toFixed(2)}</p>
          {weight && <p className="text-xs text-[#8a8470] mb-4">{weight} lbs</p>}
          {/* QR on white background so it scans */}
          <div className="inline-block p-3 bg-white rounded-xl mx-auto">
            <img src={preview.qrUrl} alt="QR code" className="w-36 h-36" />
          </div>
        </div>
        <button
          onClick={handleShare}
          className="w-full py-3.5 bg-[#c9a84c] text-[#141410] font-bold rounded-xl hover:bg-[#dbb95e] transition-colors text-sm tracking-wide uppercase"
        >
          Share label
        </button>
        <button
          onClick={() => { setPreview(null); setWeight(''); setSelectedId('') }}
          className="w-full py-3 border border-[#2e2e26] text-[#8a8470] font-medium rounded-xl hover:border-[#c9a84c] hover:text-[#f0ead8] transition-colors text-sm"
        >
          Add another item
        </button>
      </div>
    )
  }

  return (
    <div className="bg-[#1c1c17] border border-[#2e2e26] rounded-2xl p-5">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>Product type</label>
          <select
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            required
            className={inputClass + ' appearance-none'}
          >
            <option value="" className="bg-[#1c1c17]">Select a product…</option>
            {products.map(p => (
              <option key={p.id} value={p.id} className="bg-[#1c1c17]">{p.name}</option>
            ))}
          </select>
        </div>

        {selected?.pricingMode === 'per_weight' && (
          <div>
            <label className={labelClass}>Weight (lbs)</label>
            <input
              type="number" step="0.001" min="0"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="0.000"
              required
              className={inputClass}
            />
          </div>
        )}

        {livePrice !== null && (
          <div className="bg-[#141410] border border-[#2e2e26] rounded-xl p-4 text-center">
            <p className="text-xs text-[#8a8470] uppercase tracking-widest mb-0.5">Price</p>
            <p className="font-serif text-3xl text-[#c9a84c]">${livePrice.toFixed(2)}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !selected || (selected.pricingMode === 'per_weight' && !weight)}
          className="w-full py-3.5 bg-[#c9a84c] text-[#141410] font-bold rounded-xl hover:bg-[#dbb95e] disabled:opacity-30 transition-colors text-sm tracking-wide uppercase"
        >
          {loading ? 'Saving…' : 'Generate label'}
        </button>
      </form>
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add "src/app/(app)/add-item/page.tsx" "src/app/(app)/add-item/AddItemForm.tsx"
git commit -m "feat: redesign add-item page and form — dark canvas"
```

---

## Task 10: Redesign item detail page and MarkSoldButton

**Files:**
- Modify: `src/app/(app)/dashboard/[id]/page.tsx`
- Modify: `src/app/(app)/dashboard/[id]/MarkSoldButton.tsx`

**Step 1: Replace `src/app/(app)/dashboard/[id]/page.tsx`**

```tsx
import { prisma } from '@/lib/db'
import { generateQRDataUrl } from '@/lib/qr'
import { notFound } from 'next/navigation'
import MarkSoldButton from './MarkSoldButton'

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await prisma.inventoryItem.findUnique({
    where: { id },
    include: { productType: true, farm: true },
  })
  if (!item) notFound()

  const qrUrl = await generateQRDataUrl(item.id, process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')

  return (
    <main className="px-4 pt-8">
      <div className="mb-6">
        <p className="text-xs text-[#8a8470] uppercase tracking-widest mb-1">{item.farm.name}</p>
        <h1 className="font-serif text-3xl text-[#f0ead8] leading-tight">{item.productType.name}</h1>
        <div className="mt-2 h-px w-10 bg-[#c9a84c]" />
      </div>

      <div className="bg-[#1c1c17] border border-[#2e2e26] rounded-2xl p-6 text-center mb-3">
        {/* QR on white so it scans */}
        <div className="inline-block p-3 bg-white rounded-xl mb-4">
          <img src={qrUrl} alt="QR code" className="w-36 h-36" />
        </div>
        <p className="font-serif text-4xl text-[#f0ead8]">${Number(item.price).toFixed(2)}</p>
        {item.weight && (
          <p className="text-sm text-[#8a8470] mt-1">{Number(item.weight).toFixed(3)} lbs</p>
        )}
        <span className={`inline-block mt-3 text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wide ${
          item.status === 'available'
            ? 'bg-[#1e3a2a] text-[#7dbf94]'
            : 'bg-[#252520] text-[#8a8470]'
        }`}>
          {item.status}
        </span>
      </div>

      {item.status === 'available' && <MarkSoldButton itemId={item.id} />}
    </main>
  )
}
```

**Step 2: Replace `src/app/(app)/dashboard/[id]/MarkSoldButton.tsx`**

```tsx
'use client'

import { markAsSold } from './actions'

export default function MarkSoldButton({ itemId }: { itemId: string }) {
  return (
    <button
      onClick={() => markAsSold(itemId)}
      className="w-full py-3.5 border border-[#2e2e26] text-[#8a8470] font-medium rounded-xl hover:border-[#c9a84c] hover:text-[#f0ead8] active:bg-[#1c1c17] transition-colors text-sm tracking-wide"
    >
      Mark as sold
    </button>
  )
}
```

**Step 3: Commit**

```bash
git add "src/app/(app)/dashboard/[id]/page.tsx" "src/app/(app)/dashboard/[id]/MarkSoldButton.tsx"
git commit -m "feat: redesign item detail page — dark canvas, Playfair price"
```

---

## Task 11: Final check — run tests and verify all pages

**Step 1: Run tests**

```bash
npm test
```

Expected: 4/4 passing (pricing tests — logic unchanged)

**Step 2: Verify all pages visually in browser**

- `http://localhost:3000/login` — dark bg, Playfair wordmark, amber button
- `http://localhost:3000/onboarding` — same treatment
- `http://localhost:3000/dashboard` — farm name serif, amber stats, dark cards
- `http://localhost:3000/products` — amber + New button, dark cards
- `http://localhost:3000/products/new` — dark form
- `http://localhost:3000/add-item` — dark form, amber submit
- `http://localhost:3000/dashboard/[id]` — Playfair price, QR on white bg

**Step 3: Commit any final tweaks, then done**
