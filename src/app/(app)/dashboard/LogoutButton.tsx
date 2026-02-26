'use client'

import { logout } from './actions'

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="text-[10px] tracking-[0.2em] text-[#4a4840] uppercase transition-colors hover:text-[#c9a84c]"
    >
      Sign out
    </button>
  )
}
