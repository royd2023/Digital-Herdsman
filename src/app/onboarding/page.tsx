import { setupFarm } from './actions'

export default function OnboardingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0f0f0c] px-7">
      <div className="flex-1 flex flex-col justify-center pt-20 pb-10">
        <p className="text-[10px] tracking-[0.3em] text-[#4a4840] uppercase mb-6">
          Getting started
        </p>
        <h1
          className="font-serif italic text-[#ede7d3] leading-[0.88] tracking-tight"
          style={{ fontSize: 'clamp(3rem, 14vw, 5rem)' }}
        >
          Name your<br />
          <span className="text-[#c9a84c]">farm.</span>
        </h1>
        <span className="rule-amber mt-6 w-16" />
        <p className="mt-5 text-sm text-[#7a7464]">
          This will appear on your product labels.
        </p>
      </div>

      <div className="pb-12">
        <form className="space-y-0">
          <div className="pt-5 pb-8">
            <label htmlFor="farm-name" className="block text-[10px] tracking-[0.25em] text-[#7a7464] uppercase mb-2">
              Farm name
            </label>
            <input
              id="farm-name"
              name="name"
              type="text"
              placeholder="e.g. Johnson Family Farm"
              required
              autoFocus
              className="input-ledger text-lg"
            />
          </div>
          <button
            formAction={setupFarm}
            className="w-full py-4 bg-[#c9a84c] text-[#0f0f0c] font-bold rounded-none text-sm tracking-[0.15em] uppercase transition-colors hover:bg-[#e8c06a] active:bg-[#b8963e]"
          >
            Create farm
          </button>
        </form>
      </div>
    </main>
  )
}
