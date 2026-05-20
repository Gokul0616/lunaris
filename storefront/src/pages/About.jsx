import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function About() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/storefront/about`)
      .then(res => res.json())
      .then(data => {
        setContent(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch about content:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex-grow w-full bg-[#151517] text-[#C8C8CC] flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-[#C8C8CC]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#C8C8CC]/60">Loading Lunaris Story...</span>
        </div>
      </div>
    )
  }

  const about = content || {
    title: "About LUNARIS",
    story: "Born in the pursuit of absolute athletic innovation, LUNARIS crafts premium, state-of-the-art performance footwear designed to push boundaries. We bridge the gap between high-level engineering and futuristic street aesthetics, creating a silhouette that is built for speed, responsiveness, and pure kinetic energy.",
    mission: "Our mission is simple: to empower athletes, creators, and daily runners with antigravity-class cushioning, responsive propulsion systems, and ultra-breathable materials. We believe every stride should feel like flying.",
    team: "Our team consists of industry-leading materials engineers, award-winning footwear designers, and visionary biomechanics experts dedicated to refining performance standards."
  }

  return (
    <div className="flex-grow w-full bg-[#151517] text-white animate-fadeIn pb-24">
      {/* Hero Banner with Sleek Gradients */}
      <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden border-b border-[#C8C8CC]/10">
        {about.heroImage ? (
          <img
            src={about.heroImage}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[0.35]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-slate-900 to-indigo-950 z-0"></div>
        )}
        
        {/* Anti-gravity animated background glow */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[150px] animate-pulse delay-75"></div>

        <div className="relative z-10 text-center px-6 max-w-[800px] select-none">
          <h1 className="text-3xl md:text-5xl font-black tracking-[0.15em] text-[#E6E6E8] uppercase drop-shadow-md mb-4 leading-tight">
            {about.title}
          </h1>
          <p className="text-xs uppercase tracking-[0.4em] font-black text-[#C8C8CC]">
            Pushing Athletic Potential
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-[1000px] mx-auto px-6 pt-16 flex flex-col gap-16">
        
        {/* Story Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 flex flex-col gap-4 text-left">
            <h2 className="text-[10px] font-black text-[#C8C8CC] uppercase tracking-[0.3em]">Our Story</h2>
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#E6E6E8]">Crafted For The Next Generation</h3>
            <p className="text-[#C8C8CC]/80 text-sm font-medium leading-relaxed">
              {about.story}
            </p>
          </div>
          <div className="md:col-span-5 relative group overflow-hidden rounded-2xl border border-[#C8C8CC]/10 shadow-lg bg-[#222224] min-h-[250px] flex items-center justify-center">
            {about.storyImage ? (
              <img
                src={about.storyImage}
                alt="Brand Story Visual"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <>
                {/* Visual aesthetic using abstract gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-600/15 group-hover:scale-105 transition-transform duration-700"></div>
                <span className="material-symbols-outlined text-[64px] text-[#C8C8CC] animate-bounce">footprint</span>
              </>
            )}
          </div>
        </section>

        {/* Mission and Team Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="p-8 bg-[#1e1e20] border border-[#C8C8CC]/10 rounded-2xl flex flex-col gap-4 text-left hover:border-[#C8C8CC]/30 transition-colors duration-300">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-indigo-400 text-[22px]">rocket_launch</span>
            </div>
            <h3 className="text-md font-black uppercase tracking-wider text-[#E6E6E8]">Our Mission</h3>
            <p className="text-[#C8C8CC]/70 text-xs leading-relaxed font-medium">
              {about.mission}
            </p>
          </div>

          {/* Team Card */}
          <div className="p-8 bg-[#1e1e20] border border-[#C8C8CC]/10 rounded-2xl flex flex-col gap-4 text-left hover:border-[#C8C8CC]/30 transition-colors duration-300">
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-violet-400 text-[22px]">group</span>
            </div>
            <h3 className="text-md font-black uppercase tracking-wider text-[#E6E6E8]">The Visionaries</h3>
            <p className="text-[#C8C8CC]/70 text-xs leading-relaxed font-medium">
              {about.team}
            </p>
          </div>
        </section>

      </main>
    </div>
  )
}
