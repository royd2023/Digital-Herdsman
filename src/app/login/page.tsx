import { login } from './actions'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0f0f0c] px-7">
      {/* Top branding — takes up generous top portion */}
      <div className="flex-1 flex flex-col justify-center pt-20 pb-10">
        <p className="text-[10px] tracking-[0.3em] text-[#4a4840] uppercase mb-6">
          Digital Herdsman
        </p>
        <h1
          className="font-serif italic text-[#ede7d3] leading-[0.88] tracking-tight"
          style={{ fontSize: 'clamp(3.5rem, 16vw, 5.5rem)' }}
        >
          Farm<br />
          <span className="text-[#c9a84c]">Inventory</span>
        </h1>
        <span className="rule-amber mt-6 w-16" />
      </div>

      {/* Form — anchored to bottom */}
      <div className="pb-12">
        <form className="space-y-0">
          <div className="pb-6 border-b border-[#1e1e1a]">
            <label className="block text-[10px] tracking-[0.25em] text-[#7a7464] uppercase mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@farm.com"
              className="input-ledger"
            />
          </div>
          <div className="pt-5 pb-8">
            <label className="block text-[10px] tracking-[0.25em] text-[#7a7464] uppercase mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="input-ledger"
            />
          </div>
          <button
            formAction={login}
            className="w-full py-4 bg-[#c9a84c] text-[#0f0f0c] font-bold rounded-none text-sm tracking-[0.15em] uppercase transition-colors hover:bg-[#e8c06a] active:bg-[#b8963e]"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  )
}
