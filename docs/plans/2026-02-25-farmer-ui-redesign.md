# Farmer UI Redesign — Dark Canvas

**Date:** 2026-02-25
**Scope:** All farmer-side pages (login, onboarding, dashboard, products, add-item, item detail, bottom nav)

## Design Direction

**Vibe:** Premium / artisan — high-end butcher shop, artisan market
**Approach:** Dark Canvas — deep dark background throughout, warm cream text, amber/gold accents

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#141410` | Page backgrounds |
| Surface | `#1e1e18` | Cards, inputs |
| Surface elevated | `#252520` | Modals, elevated cards |
| Text primary | `#f5f0e8` | Headings, body text |
| Text secondary | `#9c9585` | Subtext, labels |
| Accent | `#d4a853` | CTAs, active states, badges |
| Accent hover | `#e8c06a` | Hover states on accent |
| Green | `#4a7c59` | "Available" status badge bg |
| Green text | `#a3c9b0` | "Available" badge text |
| Border | `#2e2e28` | Card/input borders |

## Typography

- **Headings:** Playfair Display (Google Fonts via `next/font`) — farm name, page titles
- **Body/UI:** Inter (Google Fonts via `next/font`) — labels, descriptions, nav

## Pages

### `/login`
- Full dark background
- Centered card (`#1e1e18`), subtle border
- "Digital Herdsman" in Playfair Display, large
- Tagline in secondary text
- Inputs: dark bg, cream text, amber focus ring
- CTA: amber button, dark text

### `/onboarding`
- Same card layout as login
- "Set up your farm" in Playfair
- Single name input, amber CTA

### `/dashboard`
- Farm name as Playfair Display heading
- Stat row: Available (amber chip) + Sold (muted chip)
- Inventory list: dark surface cards, product name in cream, price/weight in secondary
- Status badge: green pill for available, muted for sold
- Empty state: centered secondary text

### `/products`
- Page heading in Playfair
- "+ New" as amber pill button top-right
- Product cards: dark surface, name in cream, category + pricing in secondary
- Empty state consistent with dashboard

### `/products/new`
- "New product type" in Playfair
- All form fields: dark surface, cream text, amber focus rings
- Category/pricing selects styled dark
- Submit: full-width amber button

### `/add-item`
- "Add item" in Playfair
- `AddItemForm` client component: same dark field styling
- Submit: amber button

### `/dashboard/[id]` (Item Detail)
- Product name in Playfair, farm name secondary
- QR code card: dark surface, white QR on dark bg
- Price: large Playfair number in cream
- Weight: secondary text
- Status badge
- "Mark as sold" button: amber (available) / hidden (sold)

### `BottomNav`
- Dark background (`#141410`), top border `#2e2e28`
- SVG icons (Lucide: Package, Plus, Grid) — replace emoji
- Active: amber icon + label
- Inactive: secondary text/icon color

## Fonts Setup

```ts
// src/app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
```

Add CSS variables to `tailwind.config` for `font-serif` (Playfair) and `font-sans` (Inter).

## Dependencies to Add

- `lucide-react` — SVG icons for bottom nav and UI
