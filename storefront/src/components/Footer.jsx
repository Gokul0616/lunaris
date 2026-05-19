import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-surface-container-lowest text-primary font-body-sm text-body-sm tracking-wide w-full relative bottom-0 flat mt-auto border-t border-outline-variant/10 md:pb-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-xl max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-4">
          <div className="font-headline-md text-headline-md font-black text-primary">LUNARIS</div>
          <div className="text-on-surface-variant text-xs opacity-75">
            © 2026 LUNARIS FOOTWEAR. ALL RIGHTS RESERVED.
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-label-lg text-label-lg uppercase tracking-widest text-primary mb-1 font-bold">Products</h4>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-xs" href="#">Shop All Performance</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-xs" href="#">Pro Racing Series</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-xs" href="#">Sustainability Focus</a>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-label-lg text-label-lg uppercase tracking-widest text-primary mb-1 font-bold">Support</h4>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-xs" href="#">Help Center & Orders</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-xs" href="#">Returns & Exchanges</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors text-xs" href="#">Privacy & Terms</a>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-label-lg text-label-lg uppercase tracking-widest text-primary font-bold">Newsletter</span>
          {subscribed ? (
            <div className="text-emerald-400 text-xs font-bold py-2 animate-pulse">
              ✓ Subscribed successfully! Welcome to LUNARIS Club.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-b border-outline-variant focus:border-primary focus:outline-none py-2 text-primary placeholder:text-on-surface-variant/50 text-xs w-full"
                placeholder="Enter your email"
              />
              <button type="submit" className="text-primary hover:opacity-70 transition-opacity cursor-pointer">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </footer>
  )
}
