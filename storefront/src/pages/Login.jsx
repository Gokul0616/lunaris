import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Invalid email or password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex-grow w-full max-w-[450px] mx-auto px-margin-mobile py-12 sm:py-20 flex flex-col justify-center animate-fadeIn">

      {/* Distraction-Free Back to Home Navigation */}
      <Link
        to="/"
        className="flex items-center gap-2 text-on-surface-variant hover:text-primary text-[10px] font-bold uppercase tracking-widest mb-6 transition-all duration-150 self-start group cursor-pointer"
      >
        <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
        <span>Back to Home</span>
      </Link>

      <div className="bg-transparent sm:bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-transparent sm:border-outline-variant/30 shadow-none sm:shadow-2xl">

        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <img src="/logo.png" className="w-16 h-16 object-contain mt-5 animate-fadeIn" alt="LUNARIS Logo" />
          <img src="/image copy-Photoroom.png" className="h-7 object-contain mb-5 select-none" alt="LUNARIS" />
          <h1 className="font-headline-md text-2xl font-black text-primary">
            SIGN IN
          </h1>
          <p className="font-body-sm text-xs text-on-surface-variant mt-2">
            Access your performance dashboard and orders.
          </p>
        </div>

        {/* Error Callout */}
        {error && (
          <div className="bg-error-container/20 border border-error-container text-error rounded-xl p-4 text-xs font-bold mb-6 animate-shake">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-surface border border-outline-variant/60 focus:border-primary focus:outline-none py-3 px-4 rounded-lg text-primary text-sm w-full transition-all"
              placeholder="athlete@lunaris.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                Password
              </label>
              <a className="text-[10px] text-secondary hover:underline cursor-pointer">Forgot?</a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-surface border border-outline-variant/60 focus:border-primary focus:outline-none py-3 pl-4 pr-10 rounded-lg text-primary text-sm w-full transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center justify-center p-1 rounded-md"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary-container hover:bg-primary text-on-primary font-label-lg text-xs uppercase tracking-widest font-black py-4 rounded-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
          >
            {submitting ? 'Verifying...' : 'Sign In'}
            <span className="material-symbols-outlined text-[18px]">lock_open</span>
          </button>

        </form>

        {/* Toggle Onboarding link */}
        <div className="text-center mt-8 pt-6 border-t border-outline-variant/20">
          <span className="text-xs text-on-surface-variant">Don't have a LUNARIS account? </span>
          <Link to="/register" className="text-xs text-primary font-bold hover:underline">
            Register Now
          </Link>
        </div>

      </div>
    </div>
  )
}
