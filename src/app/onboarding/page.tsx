import { setupFarm } from './actions'

export default function OnboardingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-bold text-stone-800 mb-2">Set up your farm</h1>
        <p className="text-stone-500 text-sm mb-6">What&apos;s your farm called?</p>
        <form className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="e.g. Johnson Family Farm"
            required
            className="w-full px-3 py-2.5 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            formAction={setupFarm}
            className="w-full py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition-colors"
          >
            Create farm
          </button>
        </form>
      </div>
    </main>
  )
}
