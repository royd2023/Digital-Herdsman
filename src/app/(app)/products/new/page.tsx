import { addProduct } from './actions'

const CATEGORIES = [
  'beef', 'pork', 'chicken', 'lamb', 'fish',
  'eggs', 'dairy', 'honey', 'preserves',
  'vegetables', 'fruit', 'other',
]

export default function NewProductPage() {
  return (
    <main className="pb-8">
      {/* Header */}
      <div className="px-6 pt-10 pb-6 border-b border-[#1e1e1a]">
        <p className="text-[10px] tracking-[0.3em] text-[#4a4840] uppercase mb-2">Catalogue</p>
        <h1
          className="font-serif italic text-[#ede7d3] leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(2.2rem, 11vw, 3.5rem)' }}
        >
          New product
        </h1>
        <span className="rule-amber mt-4 w-10" />
      </div>

      {/* Form */}
      <form className="px-6 pt-2">
        {[
          { id: 'name', label: 'Product name', type: 'text', name: 'name', placeholder: 'e.g. Ribeye Steak' },
        ].map(field => (
          <div key={field.id} className="py-5 border-b border-[#1e1e1a]">
            <label htmlFor={field.id} className="block text-[10px] tracking-[0.25em] text-[#7a7464] uppercase mb-2">
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required
              className="input-ledger"
            />
          </div>
        ))}

        <div className="py-5 border-b border-[#1e1e1a]">
          <label htmlFor="prod-category" className="block text-[10px] tracking-[0.25em] text-[#7a7464] uppercase mb-2">
            Category
          </label>
          <select
            id="prod-category"
            name="category"
            required
            className="input-ledger appearance-none"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c} className="bg-[#1a1a15]">
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="py-5 border-b border-[#1e1e1a]">
          <label htmlFor="prod-pricing" className="block text-[10px] tracking-[0.25em] text-[#7a7464] uppercase mb-2">
            Pricing mode
          </label>
          <select
            id="prod-pricing"
            name="pricingMode"
            required
            className="input-ledger appearance-none"
          >
            <option value="per_weight" className="bg-[#1a1a15]">Per weight ($/lb)</option>
            <option value="fixed" className="bg-[#1a1a15]">Fixed price</option>
          </select>
        </div>

        <div className="py-5 border-b border-[#1e1e1a]">
          <label htmlFor="prod-price" className="block text-[10px] tracking-[0.25em] text-[#7a7464] uppercase mb-2">
            Price ($)
          </label>
          <input
            id="prod-price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            required
            className="input-ledger text-lg"
          />
        </div>

        <div className="py-5 border-b border-[#1e1e1a]">
          <label htmlFor="prod-unit" className="block text-[10px] tracking-[0.25em] text-[#7a7464] uppercase mb-2">
            Unit
          </label>
          <input
            id="prod-unit"
            name="unit"
            type="text"
            placeholder="e.g. lbs, dozen, jar"
            required
            className="input-ledger"
          />
        </div>

        <div className="pt-8">
          <button
            formAction={addProduct}
            className="w-full py-4 bg-[#c9a84c] text-[#0f0f0c] font-bold text-sm tracking-[0.15em] uppercase transition-colors hover:bg-[#e8c06a] active:bg-[#b8963e] rounded-none"
          >
            Save product
          </button>
        </div>
      </form>
    </main>
  )
}
