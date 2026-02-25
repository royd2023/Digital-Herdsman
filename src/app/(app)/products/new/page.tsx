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
            <label htmlFor="prod-name" className={labelClass}>Name</label>
            <input id="prod-name" name="name" type="text" placeholder="e.g. Ribeye Steak" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="prod-category" className={labelClass}>Category</label>
            <select id="prod-category" name="category" required className={inputClass + ' appearance-none'}>
              {CATEGORIES.map(c => (
                <option key={c} value={c} className="bg-[#1c1c17]">
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="prod-pricing" className={labelClass}>Pricing</label>
            <select id="prod-pricing" name="pricingMode" required className={inputClass + ' appearance-none'}>
              <option value="per_weight" className="bg-[#1c1c17]">Per weight ($/lb)</option>
              <option value="fixed" className="bg-[#1c1c17]">Fixed price</option>
            </select>
          </div>
          <div>
            <label htmlFor="prod-price" className={labelClass}>Price ($)</label>
            <input id="prod-price" name="price" type="number" step="0.01" min="0" placeholder="0.00" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="prod-unit" className={labelClass}>Unit</label>
            <input id="prod-unit" name="unit" type="text" placeholder="e.g. lbs, dozen, jar" required className={inputClass} />
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
