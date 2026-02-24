import { login } from './actions'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-stone-800 mb-2">Digital Herdsman</h1>
        <p className="text-stone-500 mb-8 text-sm">Farm inventory management</p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2.5 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2.5 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <button
            formAction={login}
            className="w-full py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 active:bg-green-900 transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  )
}
