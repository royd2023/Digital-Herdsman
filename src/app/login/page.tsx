import { login } from './actions'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#141410] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <h1 className="font-serif text-4xl text-[#f0ead8] leading-tight tracking-tight">
            Digital<br />Herdsman
          </h1>
          <div className="mt-3 h-px w-12 bg-[#c9a84c]" />
          <p className="mt-3 text-sm text-[#8a8470] tracking-wide uppercase">Farm inventory</p>
        </div>

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
