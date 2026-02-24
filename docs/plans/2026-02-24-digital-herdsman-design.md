# Digital Herdsman — Farmer-Side MVP Design

**Date:** 2026-02-24
**Scope:** Farmer-side inventory management (v1). Customer-facing store is v2.

---

## Problem Statement

Ordering products from a local farm is difficult. Farmers managing orders via manual SMS suffer from communication fatigue. This takes time away from actual farming.

Digital Herdsman eliminates that friction with a "Scan-to-Shelf" system — farmers label each physical item with a QR code at the point of creation, creating a "digital twin" with exact weight and price baked in.

---

## MVP Scope

**In scope (v1 — farmer-side):**
- Multi-farm authentication (email/password)
- Product type management (the farm's "menu")
- Add inventory items with manual weight input and auto price calculation
- QR label generation, shareable as image via native phone share sheet
- Inventory dashboard (available / sold status)

**Out of scope (v1):**
- Customer-facing store
- Bluetooth scale integration
- Direct thermal printer integration
- Reporting / analytics
- Customer management
- Notifications

**Future (v2):**
- Customer-facing store with QR-linked purchase pages
- Stripe payments with exact-amount charging
- React Native (Expo) mobile app

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Frontend | Next.js 14+ (App Router) | Mobile-first web, fast DX |
| Styling | Tailwind CSS | Rapid mobile-first UI |
| Backend/DB | Supabase (Postgres + Auth + Storage) | Relational model, realtime, auth built-in |
| ORM | Prisma | Type-safe DB access |
| Hosting | Vercel | Zero-config deploys |
| QR Generation | `qrcode` npm package | In-browser, no server needed |

**Architecture note:** Business logic lives in a `/lib` layer (pricing calculations, QR generation, label assembly) as pure TypeScript with no Next.js dependencies. This ensures clean migration to React Native (Expo) in v2.

---

## Architecture

```
FARMER'S PHONE (Browser)
├── Next.js App (mobile-first PWA)
│   ├── /login
│   ├── /dashboard      ← inventory overview
│   ├── /products       ← manage product types
│   └── /add-item       ← core workflow
│
└── /lib (pure TypeScript — portable to React Native)
    ├── pricing.ts
    ├── qr.ts
    └── label.ts

SUPABASE
├── Auth (email/password per farm)
├── Postgres DB
└── Storage (QR label images)
```

---

## Data Model

```sql
farms
  id          uuid PK
  name        text          -- e.g. "Johnson Family Farm"
  owner_id    uuid FK → auth.users
  created_at  timestamptz

product_types
  id            uuid PK
  farm_id       uuid FK → farms
  name          text          -- e.g. "Ribeye Steak", "Dozen Eggs"
  category      enum          -- beef | pork | chicken | lamb | fish |
                              -- eggs | dairy | honey | preserves |
                              -- vegetables | fruit | other
  pricing_mode  enum          -- per_weight | fixed
  price         numeric       -- $/lb if per_weight, flat $ if fixed
  unit          text          -- lbs | dozen | jar | etc.

inventory_items
  id               uuid PK
  farm_id          uuid FK → farms
  product_type_id  uuid FK → product_types
  weight           numeric       -- null if fixed-price item
  price            numeric       -- calculated at creation, stored for exact charging
  status           enum          -- available | sold | reserved
  qr_code_url      text          -- Supabase Storage URL
  created_at       timestamptz
```

**Key decision:** Price is stored at creation time on `inventory_items`. This enables exact charging in v2 with no estimates or partial refunds.

---

## Core Workflow — Add Item

```
1. Open /add-item
   └── Select product type

2. Enter details
   ├── per_weight: enter weight (lbs) → price auto-calculates
   └── fixed: price pre-set, just confirm

3. Generate label
   └── QR code + label card showing:
       ├── Farm name
       ├── Product name
       ├── Weight (if applicable)
       ├── Price
       └── QR code (links to this inventory_item id)

4. Share label
   └── Native phone share sheet:
       ├── Save to photos → print later
       ├── Send via WhatsApp/iMessage directly to customer
       └── (future: AirPrint / thermal printer)

5. Item saved
   └── inventory_item created with status: available
       Dashboard updates
```

---

## Screens

### /dashboard
- Summary counts: available / sold
- List of inventory items (name, weight, price, status)
- Tap item → view QR label / mark as sold manually
- Quick-add button → /add-item

### /products
- List of farm's product types
- Add: name, category, pricing mode, price, unit
- Edit / archive existing types

### /add-item
- Select product type
- Enter weight (if per_weight)
- Preview calculated price
- Generate and share QR label

### /login
- Email + password
- Links to farm account (multi-farm)

---

## Product Categories (Fixed List for MVP)

Beef, Pork, Chicken, Lamb, Fish, Eggs, Dairy, Honey, Preserves, Vegetables, Fruit, Other

---

## Future Considerations (v2)

- QR code on label links to `/item/[id]` on the customer-facing store
- Customer-facing store is a public page per farm (farmer keeps their brand)
- Stripe charges the exact `price` stored on `inventory_items` at purchase time
- React Native (Expo) wraps the same Supabase backend — `/lib` layer ports cleanly
