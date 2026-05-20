import { useNavigate, Link } from 'react-router-dom'
import heroBg from '../assets/image.png'

const PILlARS = [
  {
    icon: 'workspace_premium',
    title: 'Premium Materials',
    desc: 'Finest quality leather and materials.'
  },
  {
    icon: 'architecture',
    title: 'Expert Craftsmanship',
    desc: 'Precision stitching and attention to detail.'
  },
  {
    icon: 'auto_awesome',
    title: 'Timeless Design',
    desc: 'Styles that never go out of trend.'
  },
  {
    icon: 'favorite',
    title: 'Comfort First',
    desc: 'Engineered for all-day comfort and support.'
  }
]

const FEATURED_COLLECTION = [
  {
    id: 'velocity-phantom',
    title: 'Classic Elegance',
    desc: 'Black leather Oxford style shoe',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYg75Wd1HojwIw4KUhFBwjhq83FNyXYxUNNqvzDwXjvI3u7cx4nzicRzTY8duDSrhvxYpilIWYFTrrc0Hm3VA3iZDcMcQtNabNgpU57kQYjAHQ5jVbVJVlELH5ZyYw-lcnW2NOd3EwGTLk4zU9nTgg7Q335tNUNL-7IkbVUwaj9urlkldt8RtdB8dc9gnw3rms4QW2hRIZYISgcGKgnmmnmhljab2xieT4bU-ZoovS95DqyP8K6cxba-jTjz_aa6jTfjBAQ3CLXUC2'
  },
  {
    id: 'summit-peak',
    title: 'Modern Edge',
    desc: 'Black premium mid-ankle boot',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS7iN4cI2LM2MRNfNPsELNWnpxvgBFbd4I8P3bXtNwj-DqzP1j1BjLMF2sQmcSBVytI7PhX_up4n09JRs_3JSSB3PIZgJe9rDcN6QCCWeNJYsyOiu8L8BHS3KSu-xigH39BiqQ4b6-y81XA518Z2BB7tHGvapNy1IRKtXtDyxPGHZMWXgBXh4JkwVEGycSWfHRp2v0nGU2KtEKGRGwU_e7kqfAnpwEZ09a9QwHpjMhmBObQ1lfKXiDNNT60Ae8x5W3CZ2SH0eJGnYL'
  },
  {
    id: 'nexus-slip',
    title: 'Casual Comfort',
    desc: 'Black leather casual shoe',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1_wuyDCapxZvH_Td7iOtj0RqJb6wfWC88fbdPMlwNRi-sSxKJYzzLwFgYyrOKN6FIIerFYxntWxJXszXAEeTdK_IpHdh8aHMbQhaYRD14uXnTEhEDee6pXbuTfZnKCgulqCHrv4iTqz9TE_-7bvzcPc6y0KbhWLms0Q_HDGMa3VdaJ6XEoa3WJ3CqZD4vnKs4zk4KXoDNAU7awgsZzsqtZSyBKe3M-u_CUiKlUf9R04SgtmLKaMQp1PqzGPDs6J_Zg0yQ8Lu52qoj'
  }
]

export default function Home() {
  const navigate = useNavigate()

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert('Thank you for subscribing! Welcome to LUNARIS Footwear.')
  }

  return (
    <div className="flex flex-col w-full bg-background text-[#E6E6E8] animate-fadeIn font-body-md select-none">

      {/* Luxury Split Hero Section */}
      <section className="relative w-full min-h-[580px] md:min-h-[750px] flex flex-col justify-center overflow-hidden px-margin-mobile md:px-margin-desktop py-12 border-b border-[#44444A]/10">
        {/* Full Bleed Background Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 select-none pointer-events-none"
          src={heroBg}
          alt="LUNARIS Background"
        />
        {/* Soft contrast layer and fade overlay */}
        <div className="absolute inset-0 bg-[#000000]/20 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1D] via-transparent to-[#151517]/30 z-0"></div>

        <div className="w-full z-10 max-w-[1440px] mx-auto px-5 md:px-0">
          <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full max-w-full sm:max-w-xl md:max-w-2xl">

            <img
              src="/image copy-Photoroom.png"
              className="h-12 sm:h-14 md:h-16 object-contain mb-6 select-none opacity-95"
              alt="LUNARIS"
            />

            <h1 className="font-headline break-words text-3xl sm:text-5xl md:text-7xl font-black text-[#E6E6E8] tracking-tight leading-tight md:leading-[1.05] uppercase mb-6 drop-shadow-sm">
              MADE TO<br />ELEVATE
            </h1>

            <p className="font-body-lg break-words text-sm sm:text-base text-[#C8C8CC] mb-8 w-full max-w-full sm:max-w-lg md:max-w-2xl leading-7 font-medium">
              Premium footwear crafted for performance and timeless style. Engineered to precision.
            </p>

            <button
              onClick={() => navigate('/shop')}
              className="bg-[#C8C8CC] text-[#1B1B1D] font-bold px-9 py-4 rounded-lg shadow-2xl uppercase tracking-widest hover:bg-transparent hover:text-[#E6E6E8] hover:border-[#E6E6E8] border-2 border-transparent active:scale-95 transition-all text-xs cursor-pointer shadow-[#000000]/40"
            >
              Shop Collection
            </button>

          </div>
        </div>
      </section>

      {/* Brand Feature Pillars Section */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-[#151517] border-b border-[#44444A]/10 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-gutter">
          {PILlARS.map((pillar, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4 group hover:translate-y-[-4px] transition-transform duration-300">
              <span className="material-symbols-outlined text-[#C8C8CC] mb-4 text-3xl font-light tracking-wide group-hover:scale-110 transition-transform duration-300">
                {pillar.icon}
              </span>
              <h4 className="font-headline text-xs font-bold uppercase tracking-wider text-[#E6E6E8] mb-2">
                {pillar.title}
              </h4>
              <p className="font-body-sm text-[11px] text-[#C8C8CC] leading-relaxed max-w-[200px]">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Collection Showcase Section */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto w-full border-b border-[#44444A]/10 bg-[#1B1B1D]">
        <div className="text-center mb-16">
          <span className="font-label-lg text-xs uppercase tracking-[0.3em] text-[#C8C8CC] font-bold">
            Curated Showcase
          </span>
          <h3 className="font-headline text-3xl md:text-4xl text-[#E6E6E8] uppercase font-black mt-2">
            Our Collection
          </h3>
          <div className="w-12 h-[1.5px] bg-[#C8C8CC] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FEATURED_COLLECTION.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/aeromax-elite`)}
              className="group cursor-pointer flex flex-col items-center text-center rounded-2xl bg-[#151517] p-8 border border-[#44444A]/10 hover:border-[#C8C8CC]/20 hover:shadow-2xl transition-all duration-300"
            >
              {/* Product Pedestal Frame */}
              <div className="relative w-full aspect-square flex flex-col items-center justify-center mb-6 overflow-hidden">
                <div className="absolute w-[70%] aspect-square bg-[#44444A]/5 rounded-full pointer-events-none blur-xl z-0" />
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-[85%] h-[85%] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500 z-10 select-none pointer-events-none"
                />
                <div className="w-[60%] h-4 bg-[#000000]/60 blur-sm rounded-full mt-[-8px] z-0 transform scale-y-[0.3] opacity-80" />
              </div>

              {/* Text Meta */}
              <div className="border-t border-[#44444A]/10 pt-4 w-full flex flex-col items-center">
                <h4 className="font-headline text-sm font-bold uppercase tracking-wider text-[#E6E6E8] truncate max-w-full">
                  {item.title}
                </h4>
                <p className="font-body-sm text-xs text-[#C8C8CC] mt-1.5 min-h-[32px] max-w-[200px]">
                  {item.desc}
                </p>
                <span className="font-headline text-[10px] text-[#C8C8CC] uppercase tracking-[0.2em] font-black mt-4 flex items-center gap-1 group-hover:text-[#E6E6E8] transition-colors">
                  Shop Now <span className="material-symbols-outlined text-[10px] transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-[#151517] border-b border-[#44444A]/10 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left Column: Visual close-up shoe showcase */}
          <div className="relative flex flex-col items-center justify-center min-h-[280px]">
            <div className="absolute w-[200px] md:w-[350px] aspect-square bg-[#44444A]/10 rounded-full blur-3xl" />
            <img
              className="w-4/5 max-w-[420px] object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.8)] z-10 select-none pointer-events-none"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYg75Wd1HojwIw4KUhFBwjhq83FNyXYxUNNqvzDwXjvI3u7cx4nzicRzTY8duDSrhvxYpilIWYFTrrc0Hm3VA3iZDcMcQtNabNgpU57kQYjAHQ5jVbVJVlELH5ZyYw-lcnW2NOd3EwGTLk4zU9nTgg7Q335tNUNL-7IkbVUwaj9urlkldt8RtdB8dc9gnw3rms4QW2hRIZYISgcGKgnmmnmhljab2xieT4bU-ZoovS95DqyP8K6cxba-jTjz_aa6jTfjBAQ3CLXUC2"
              alt="LUNARIS Artisan Close Up"
            />
            <div className="w-[50%] h-4 bg-[#000000]/60 blur-md rounded-full mt-2 transform scale-y-[0.3]" />
          </div>

          {/* Right Column: The Copy */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full max-w-full">

            <span className="font-label-lg text-xs uppercase tracking-[0.15em] text-[#C8C8CC] font-bold mb-4">
              Our Legacy
            </span>

            <h3 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-[#E6E6E8] uppercase leading-tight mb-6">
              About Lunaris
            </h3>

            <p className="font-body-lg text-sm sm:text-base text-[#C8C8CC] leading-7 mb-8 w-full max-w-[600px] font-medium">
              At Lunaris Footwear, we believe that true luxury lies in the details. Each pair is a blend of timeless design, premium materials, and expert craftsmanship.
            </p>

            <button
              onClick={() => navigate('/shop')}
              className="border-2 border-[#C8C8CC] text-[#E6E6E8] font-bold px-8 py-3.5 rounded-lg uppercase tracking-widest hover:bg-[#C8C8CC] hover:text-[#1B1B1D] hover:border-transparent active:scale-95 transition-all text-xs cursor-pointer shadow-lg"
            >
              Learn More
            </button>

          </div>

        </div>
      </section>

      {/* Elegant Stay In Step Newsletter Section */}
      <section className="py-20 px-5 md:px-10 bg-[#1B1B1D] border-b border-[#44444A]/10 max-w-[1440px] mx-auto w-full text-center">

        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">

          <span className="font-label-lg text-xs uppercase tracking-[0.15em] text-[#C8C8CC] font-bold mb-3">
            Newsletter
          </span>

          <h3 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-[#E6E6E8] uppercase leading-tight mb-4">
            Stay In Step
          </h3>

          <p className="font-body-sm text-sm sm:text-base text-[#C8C8CC] mb-8 w-full max-w-[650px] leading-7 font-medium">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="w-full flex flex-col sm:flex-row gap-4"
          >

            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full flex-grow bg-[#151517] border border-[#44444A] rounded-lg px-5 py-4 text-sm text-[#E6E6E8] placeholder-[#C8C8CC]/40 focus:outline-none focus:border-[#C8C8CC] transition-colors"
            />

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#C8C8CC] text-[#1B1B1D] font-bold px-8 py-4 rounded-lg uppercase tracking-[0.15em] text-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Subscribe
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>

          </form>

        </div>

      </section>

// We removed the local Footer render in favor of centralized global rendering in App.jsx.

    </div>
  )
}
