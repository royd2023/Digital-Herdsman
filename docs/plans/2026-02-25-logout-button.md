# Logout Button Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a logout button to the dashboard header that signs the user out and redirects to `/login`.

**Architecture:** Server action handles the Supabase `signOut()` call and redirect. A thin `LogoutButton` client component wires the button click to the action. No new routes, no new nav items.

**Tech Stack:** Next.js 15 App Router, Supabase Auth (`@/lib/supabase/server`), `next/navigation` redirect

---

## Task 1: Create the dashboard server action

**Files:**
- Create: `src/app/(app)/dashboard/actions.ts`

**Step 1: Create `src/app/(app)/dashboard/actions.ts`**

```ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
```

**Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no errors.

**Step 3: Commit**

```bash
git add "src/app/(app)/dashboard/actions.ts"
git commit -m "feat: add logout server action"
```

---

## Task 2: Create the LogoutButton client component

**Files:**
- Create: `src/app/(app)/dashboard/LogoutButton.tsx`

**Step 1: Create `src/app/(app)/dashboard/LogoutButton.tsx`**

```tsx
'use client'

import { logout } from './actions'

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="text-[10px] tracking-[0.2em] text-[#4a4840] uppercase transition-colors hover:text-[#c9a84c]"
    >
      Sign out
    </button>
  )
}
```

**Step 2: Commit**

```bash
git add "src/app/(app)/dashboard/LogoutButton.tsx"
git commit -m "feat: add LogoutButton client component"
```

---

## Task 3: Add LogoutButton to the dashboard header

**Files:**
- Modify: `src/app/(app)/dashboard/page.tsx`

**Step 1: Import LogoutButton at the top of `src/app/(app)/dashboard/page.tsx`**

Add after the existing imports:

```tsx
import LogoutButton from './LogoutButton'
```

**Step 2: Add LogoutButton to the header**

The current header opens with:

```tsx
<div className="px-6 pt-10 pb-8 border-b border-[#1e1e1a]">
  <p className="text-[10px] tracking-[0.3em] text-[#4a4840] uppercase mb-3">Your farm</p>
```

Replace that outer div opening + "Your farm" line with a flex row that puts "Your farm" on the left and `<LogoutButton />` on the right:

```tsx
<div className="px-6 pt-10 pb-8 border-b border-[#1e1e1a]">
  <div className="flex items-center justify-between mb-3">
    <p className="text-[10px] tracking-[0.3em] text-[#4a4840] uppercase">Your farm</p>
    <LogoutButton />
  </div>
```

**Step 3: Verify in browser**

Visit `http://localhost:3000/dashboard`. A subtle "SIGN OUT" label should appear top-right. Tapping it should clear the session and redirect to `/login`.

**Step 4: Commit**

```bash
git add "src/app/(app)/dashboard/page.tsx"
git commit -m "feat: add logout button to dashboard header"
```
