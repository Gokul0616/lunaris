import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function StorefrontSettings() {
  const [formData, setFormData] = useState({
    title: '',
    story: '',
    mission: '',
    team: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Fetch current live about settings on mount
  useEffect(() => {
    fetch(`${API_URL}/api/storefront/about`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          title: data.title || '',
          story: data.story || '',
          mission: data.mission || '',
          team: data.team || ''
        })
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load storefront details:', err)
        setMessage({ type: 'error', text: 'Failed to retrieve storefront settings from server.' })
        setLoading(false)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const res = await fetch(`${API_URL}/api/storefront/about`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (res.ok) {
        setMessage({ type: 'success', text: 'Storefront About Us settings published successfully!' })
      } else {
        setMessage({ type: 'error', text: data.detail || 'Failed to save modifications.' })
      }
    } catch (err) {
      console.error('Failed to save settings:', err)
      setMessage({ type: 'error', text: 'Network connection failure. Try again.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant">Syncing Storefront Schema...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn max-w-[800px] mx-auto text-left">
      {/* Title Header */}
      <div className="mb-6">
        <h1 className="text-xl font-black uppercase tracking-wider text-primary">Storefront Settings</h1>
        <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold opacity-75 mt-1">
          Manage public marketing components and dynamic static pages.
        </p>
      </div>

      {/* Editor Panel */}
      <form onSubmit={handleSubmit} className="bg-surface-container border border-outline/20 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-md">
        <div className="flex items-center gap-3 border-b border-outline/15 pb-4">
          <span className="material-symbols-outlined text-primary text-[24px]">chrome_reader_mode</span>
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-primary">About Us Page Content</h2>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Updates are reflected instantly on the main website.</p>
          </div>
        </div>

        {/* Message Indicator */}
        {message.text && (
          <div className={`p-4 rounded-xl text-xs font-bold ${
            message.type === 'success' 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {message.type === 'success' ? '✓ ' : '✗ '} {message.text}
          </div>
        )}

        {/* Inputs */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-black tracking-widest text-primary">Page Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. About LUNARIS"
            className="w-full bg-surface-container-high border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-xs text-primary font-semibold placeholder:text-on-surface-variant/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-black tracking-widest text-primary">Brand Story</label>
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Tell your brand's story..."
            className="w-full bg-surface-container-high border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-xs text-primary font-medium leading-relaxed placeholder:text-on-surface-variant/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-black tracking-widest text-primary">Our Mission</label>
          <textarea
            name="mission"
            value={formData.mission}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Define your main mission statement..."
            className="w-full bg-surface-container-high border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-xs text-primary font-medium leading-relaxed placeholder:text-on-surface-variant/40"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-black tracking-widest text-primary">visionaries & Team</label>
          <textarea
            name="team"
            value={formData.team}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Describe your design and engineering teams..."
            className="w-full bg-surface-container-high border border-outline/35 focus:border-primary focus:outline-none rounded-xl px-4 py-3 text-xs text-primary font-medium leading-relaxed placeholder:text-on-surface-variant/40"
          />
        </div>

        {/* Form CTA */}
        <div className="border-t border-outline/15 pt-5 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-on-primary font-black uppercase tracking-widest text-xs px-6 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center gap-2 select-none shadow-md disabled:opacity-50"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4 text-on-primary" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">publish</span>
                <span>Save & Publish Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
