import { useState } from 'react'

export default function Login({ onLogin, error }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(email, password)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0d0f12] text-[#f7fafc] px-4 font-sans select-none relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#0060a8]/10 blur-[100px] top-[-10%] right-[-10%] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[#0060a8]/5 blur-[80px] bottom-[-20%] left-[-10%] pointer-events-none" />

      <div className="w-full max-w-[360px] z-10 animate-fadeIn">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#0060a8]/15 border border-[#0060a8]/30 mb-3 shadow-[0_4px_16px_rgba(0,96,168,0.2)]">
            <span className="material-symbols-outlined text-[#0060a8] text-2xl font-black">admin_panel_settings</span>
          </div>
          <h1 className="font-display font-black text-xl tracking-tight text-white uppercase">
            LUNARIS Admin
          </h1>
          <p className="text-[9px] text-[#44474c] tracking-widest uppercase font-bold mt-1">
            Secure Operations Console
          </p>
        </div>

        <div className="bg-[#16191f] border border-[#c4c6cc]/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
          <div className="text-center border-b border-[#c4c6cc]/5 pb-3">
            <h2 className="text-xs font-bold text-white uppercase tracking-widest">
              Security Authentication
            </h2>
            <p className="text-[10px] text-[#44474c] mt-1">
              Enter key credentials to access admin node.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 text-[11px] font-semibold flex items-start gap-2 animate-shake">
              <span className="material-symbols-outlined text-[14px] text-red-500 mt-0.5">warning</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#44474c]">
                Control Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#44474c] text-[16px]">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lunaris.com"
                  className="w-full bg-[#0d0f12] border border-[#c4c6cc]/15 rounded-lg py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:border-[#0060a8] focus:ring-1 focus:ring-[#0060a8] transition-all text-white placeholder:text-[#44474c]/40"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#44474c]">
                Security Code
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#44474c] text-[16px]">
                  lock
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0d0f12] border border-[#c4c6cc]/15 rounded-lg py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:border-[#0060a8] focus:ring-1 focus:ring-[#0060a8] transition-all text-white placeholder:text-[#44474c]/40"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0060a8] hover:bg-[#0060a8]/90 text-white font-black text-[10px] uppercase tracking-widest py-3 rounded-lg cursor-pointer shadow-lg active:scale-98 transition-all mt-1"
            >
              Authenticate
            </button>
          </form>
        </div>

        <div className="text-center mt-4 text-[8px] text-[#44474c]/60 font-semibold uppercase tracking-wider">
          Lunaris Athletics Ltd. Confidential.
        </div>
      </div>
    </div>
  )
}
