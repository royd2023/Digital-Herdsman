import { addProduct } from './actions'

const CATEGORIES = [
  'beef','pork','chicken','lamb','fish',
  'eggs','dairy','honey','preserves',
  'vegetables','fruit','other'
]

export default function NewProductPage() {
  return (
    <main className="px-4 pt-6">
      <h1 className="text-xl font-bold text-stone-800 mb-6">New product type</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
          <input name="name" type="text" placeholder="e.g. Ribeye Steak" required
            className="w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
          <select name="category" required
            className="w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-white">
            {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Pricing</label>
          <select name="pricingMode" required
            className="w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-white">
            <option value="per_weight">Per weight ($/lb)</option>
            <option value="fixed">Fixed price</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Price ($)</label>
          <input name="price" type="number" step="0.01" min="0" placeholder="0.00" required
            className="w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Unit</label>
          <input name="unit" type="text" placeholder="e.g. lbs, dozen, jar" required
            className="w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" />
        </div>
        <button formAction={addProduct}
          className="w-full py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors">
          Save product type
        </button>
      </form>
    </main>
  )
}
