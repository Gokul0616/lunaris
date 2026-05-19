import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function OrderConfirmed() {
  const navigate = useNavigate()
  const [confetti, setConfetti] = useState([])

  // Generate dynamic confetti shards
  useEffect(() => {
    const colors = ['#000000', '#0060a8', '#47a1ff', '#bac8dc']
    const shards = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      size: 6 + Math.random() * 6
    }))
    setConfetti(shards)

    // Re-trigger every 7 seconds for continuous celebration
    const interval = setInterval(() => {
      setConfetti(prev => prev.map(s => ({
        ...s,
        left: Math.random() * 100,
        delay: Math.random() * 1
      })))
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  // Calculate dynamic delivery date (5 days in the future)
  const deliveryDateStr = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  // Simulated order ID
  const orderId = '#ST-' + Math.floor(100000 + Math.random() * 900000)

  return (
    <main className="min-h-screen flex flex-col justify-between bg-surface font-body-md text-on-surface overflow-hidden relative select-none pb-24 md:pb-12">
      {/* Confetti Shards Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {confetti.map(s => (
          <div
            key={s.id}
            className="absolute rounded-xs opacity-75 animate-fall"
            style={{
              backgroundColor: s.color,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              top: '-20px',
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              animationIterationCount: 'infinite'
            }}
          />
        ))}
      </div>

      {/* Styled inline animation keyframes */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(105dvh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1.5deg); }
        }
        .animate-float {
          animation: float 4.5s ease-in-out infinite;
        }
      `}</style>

      {/* Header Bar */}
      <header className="h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop z-10 w-full shrink-0">
        <span
          onClick={() => navigate('/')}
          className="text-headline-sm font-headline-sm font-black tracking-[0.25em] text-primary cursor-pointer hover:opacity-85 uppercase"
        >
          LUNARIS
        </span>
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low border border-outline-variant hover:bg-surface-container-high transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-on-surface text-[18px]">close</span>
        </button>
      </header>

      {/* Hero Celebration Content */}
      <div className="flex-grow w-full max-w-[1000px] mx-auto px-margin-mobile md:px-margin-desktop py-6 md:py-12 flex flex-col justify-center z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">

          {/* Left Column: Confirmation & Actions */}
          <div className="w-full flex flex-col items-center md:items-start text-center md:text-left">
            {/* Animated Orbs */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-[#C8C8CC] opacity-10 blur-3xl rounded-full scale-150 animate-pulse"></div>
              <div className="relative w-24 h-24 md:w-28 md:h-28 bg-primary rounded-full flex items-center justify-center shadow-xl animate-float">
                <span className="material-symbols-outlined text-on-primary text-[48px] md:text-[56px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-4 mb-8 max-w-[560px]">
              <div className="space-y-1">
                <span className="text-[11px] md:text-xs uppercase tracking-[0.28em] font-black text-secondary">
                  Purchase Successful
                </span>

                <h1 className="text-[42px] md:text-[64px] leading-[0.9] font-black text-primary tracking-[-0.04em] uppercase">
                  Order
                  <br />
                  Confirmed
                </h1>
              </div>

              <p className="text-sm md:text-[16px] leading-relaxed text-on-surface-variant font-medium max-w-[520px]">
                Thank you for your purchase. Your performance gear is now being prepared for shipment and will be dispatched shortly.
              </p>
            </div>

            {/* Buttons cluster */}
            <div className="w-full space-y-4 max-w-[440px]">
              <button
                onClick={() => alert(`Tracking initialized for order ${orderId}. Push notifications activated.`)}
                className="group w-full h-16 bg-primary text-on-primary font-black uppercase tracking-[0.18em] text-[13px] rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.99] hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1">
                  local_shipping
                </span>

                Track Order
              </button>

              <button
                onClick={() => navigate('/shop')}
                className="group w-full h-16 bg-surface border-2 border-primary/15 text-primary font-black uppercase tracking-[0.18em] text-[13px] rounded-2xl flex items-center justify-center gap-3 hover:bg-primary hover:text-on-primary hover:border-primary hover:shadow-xl active:scale-[0.99] transition-all duration-300 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1">
                  storefront
                </span>

                Continue Shopping
              </button>
            </div>
            {/* Support Link */}
            <div className="mt-8 text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
              Need help? <a onClick={() => alert('Support request submitted. Our agents will email you shortly.')} className="text-secondary font-black underline cursor-pointer hover:opacity-85">Contact Support</a>
            </div>
          </div>

          {/* Right Column: Bento Summary Cards */}
          <div className="w-full flex flex-col gap-4">
            <h3 className="hidden md:block font-label-lg text-label-lg uppercase tracking-wider text-primary font-bold mb-1">
              Order Summary
            </h3>

            <div className="w-full grid grid-cols-2 gap-3">
              {/* Order ID */}
              <div className="col-span-1 bg-surface-container-low border border-outline-variant p-4 rounded-xl text-left shadow-2xs">
                <span className="text-[9px] font-black uppercase tracking-wider text-on-surface-variant block mb-1">
                  Order ID
                </span>
                <span className="text-xs md:text-sm font-black text-primary select-all">
                  {orderId}
                </span>
              </div>

              {/* Delivery Date */}
              <div className="col-span-1 bg-surface-container-low border border-outline-variant p-4 text-left rounded-xl shadow-2xs">
                <span className="text-[9px] font-black uppercase tracking-wider text-on-surface-variant block mb-1">
                  Est. Delivery
                </span>
                <span className="text-xs md:text-sm font-black text-primary">
                  {deliveryDateStr}
                </span>
              </div>

              {/* Combined variant stack */}
              <div className="col-span-2 bg-surface-container border border-outline-variant p-4 rounded-xl text-left flex items-center justify-between shadow-2xs">
                <div className="flex -space-x-3 select-none">
                  <img
                    alt="Product 1"
                    className="w-11 h-11 rounded-lg border-2 border-surface object-cover shadow-sm"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7xz9rdNWgFpZG_hdg5vHiBJlHL5KD3r8qavMoZEZz17ZVl9xaIfLnYfDo4X8H8yEXG402kmjrQXyn-DnBQ32zFHF6HT-XJ4qYOoKIXfNwE7kf2pft3JI7PAabftOl6AUURs2VKWYC7B28esLGjVmHvYK3qpFHl4hzwcNxwPpV2RlXCblxW8VU7qeCME3KkX6Fw6ODBjJxGuZ9cG0iMnUHN8FdNv5OpD4Yckru-fe6Oqc0Y2nR8TF4vmw-Vga50-xLFTKeTGa9sTLQ"
                  />
                  <img
                    alt="Product 2"
                    className="w-11 h-11 rounded-lg border-2 border-surface object-cover shadow-sm"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvxfoUm12HrDwCt-95bR1Lj1Je_09r4glWFj62v5JHtobndYL42aQCyOevxfl0asTeaSlN0ZG2MrdTwbN3mZHAEQC_e6sH9a9qUruNKvmcR5u9ncDlAtra7YHfwFrtZe3I0bUWDW9den2lcCT01p1IND3_eBH3Yx2bpi3LC-aJcqCnaKAiWb0LLp0nOYp4qlxPdi3SmKUMie-Osb4M0bLWtjL7L5hK4BQuym9-zkiuMvM1oQqre9A6m9_4VcEwmsMxgbSaI8ARmw-2"
                  />
                  <div className="w-11 h-11 rounded-lg border-2 border-surface bg-primary flex items-center justify-center text-on-primary text-[11px] font-black tracking-tighter shadow-sm select-none">
                    +1
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-black uppercase tracking-wider text-on-surface-variant block">Total Subtotal</span>
                  <span className="text-sm font-black text-primary">$348.00</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}
