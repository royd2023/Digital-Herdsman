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
